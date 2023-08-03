require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Basemap", "esri/layers/VectorTileLayer", "esri/layers/TileLayer", "esri/geometry/Point", "esri/layers/FeatureLayer", "esri/widgets/Locate", "esri/layers/ElevationLayer", "esri/widgets/ElevationProfile", "esri/widgets/BasemapGallery", "esri/widgets/LayerList", "esri/layers/ImageryTileLayer", "esri/widgets/Expand"], function(esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer, Point, FeatureLayer, Locate, ElevationLayer, ElevationProfile, BasemapGallery, LayerList, ImageryTileLayer, Expand) {

    esriConfig.apikey = "AAPKb9f33ae691024e1aaad4a7c7e6cc3121-bYon1yJoAQgQgn4bGbNV7pMdUE5bfXrYu3BT_suhy0CKoP3qJ2f68kJoN5_KygR"

    const topoLayer = new VectorTileLayer({
        portalItem: {
            id: "734c12e9904b4a8086d2dff8582a93a1" // NZ Topo Relief (Eagle)
        },
    })

    const hillShadeLayer = new TileLayer({
        portalItem: {
            id: "38c860f8dbd24820b2a59ccc9a3dabdb" // NZ Alpha Hillshade (Eagle)
        }
    })

    const topoBasemap = new Basemap({
        baseLayers: [
            topoLayer,
            hillShadeLayer
        ],
        title: "Vector Topographic",
        id: "vectortopographicbasemap"
    })

    const linzTopoLayer = new TileLayer({
        portalItem: {
            id: "85027f060e2b47249a508ada6f44403d" // NZ LINZ Topographic
        },
    });

    const linzBasemap = new Basemap({
        baseLayers: [
            linzTopoLayer
        ],
        title: "LINZ Topographic",
        id: "linzbasemap"
    });

    const imageryLayer = new TileLayer({
        portalItem: {
            id: "d284729222d04a3cb548cfe27716ea43" // NZ imagery
        }
    });

    const imageryBasemap = new Basemap({
        baseLayers: [
            imageryLayer
        ],
        title: "Imagery",
        id: "imagerybasemap"
    });

    // const trailHutsLayer = new FeatureLayer({
    //     url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Huts/FeatureServer/0"
    // })
    // map.add(trailHutsLayer)

    const popupHuts = {
        "content": "<img src={introductionThumbnail} /><br />" +
            "<h1>{name}</h1><i>{place}, {region}</i><br /><br />" +
            "<b>Facilities:</b> {facilities}<br />" +
            "<b>Status:</b> {status}<br />" +
            "<b>Bookable:</b> {bookable}<br />" +
            "<a href='{staticLink}'>More Info</a>"
    }

    const trailHutsRenderer = {
        "type": "simple",
        "symbol": {
          "type": "picture-marker",
          "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
          "width": "18px",
          "height": "18px"
        }
    }

    const labelHuts = {
        // autocasts as new LabelClass()
        symbol: {
            type: "text", // autocasts as new TextSymbol()
            color: [43, 43, 43, 255],
            font: {
                // autocast as new Font()
                weight: "bold"
            },
            haloSize: 1,
            haloColor: "white"
        },
        labelPlacement: "below-center",
        labelExpressionInfo: {
            expression: "$feature.name"
        }
    };

    const trailHuts = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Huts/FeatureServer/0",
        outFields: ["name","place","region","bookable","facilities"],
        popupTemplate: popupHuts,
        renderer: hutsRenderer,
        labelingInfo: [labelHuts]
    })

    const trailsLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Tracks/FeatureServer/0",
        renderer: trailsRenderer
    })
    // map.add(trailsLayer, 0)

    const elevationLayer = new ElevationLayer({
        portalItem: {
            id: "2ce4fe7d77024e719f8a04d2155b3fd2"
        }
    })

    const windForecast = new ImageryTileLayer({
        url: "https://tiledimageservices.arcgis.com/hLRlshaEMEYQG5A8/arcgis/rest/services/vector_field_layer/ImageServer",
        title: "Wind",
        renderer: {
          type: "flow", // autocasts to new AnimatedFlowRenderer
          lineWidth: "1px",
          lineColor: [50, 120, 240, 0.3],
          density: 0.5,
        },
        effect: "bloom(2, 0.25px, 0)",
      });

    const map = new Map({
        basemap: topoBasemap,
        layers: [trailsLayer, trailHuts, windForecast],
        ground: {
            layers: [elevationLayer]
        }
    })

    const view = new MapView({
        map: map,
        center: new Point({ x: 1795999, y: 5457405, spatialReference: { wkid: 2193 } }), // nztm coordinates
        zoom: 10,
        container: "viewDiv"
    })

    view.popup.defaultPopupTemplateEnabled = true

    

    // const trailHuts = new FeatureLayer({
    //     url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Huts/FeatureServer/0",
    //     outFields: ["name","place","region","bookable","facilities"],
    //     popupTemplate: popupHuts,
    //     renderer: hutsRenderer,
    //     labelingInfo: [labelHuts]
    // })
    map.add(trailHuts)

    const locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    })
    view.ui.add(locate, "top-left")

    const elevationProfile = new ElevationProfile({
        view: view,
        profiles: [{ type: "ground" }]
    })
    view.when(function () {
        const elevationProfileExpand = new Expand({
            view: view,
            content: elevationProfile
        })
        view.ui.add(elevationProfileExpand, "bottom-left")
    })

    const basemapGallery = new BasemapGallery({
        view: view,
        source: [topoBasemap, linzBasemap, imageryBasemap]
    })
    view.ui.add(basemapGallery, "top-right")

    view.when(() => {
        const layerList = new LayerList({
            view: view
        })

        view.ui.add(layerList, "top-right")
    })


    

})