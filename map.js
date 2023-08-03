require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Basemap", "esri/layers/VectorTileLayer", "esri/layers/TileLayer", "esri/geometry/Point", "esri/layers/FeatureLayer"], function(esriConfig, Map, MapView, Basemap, VectorTileLayer, TileLayer, Point, FeatureLayer) {

    esriConfig.apikey = "AAPKb9f33ae691024e1aaad4a7c7e6cc3121-bYon1yJoAQgQgn4bGbNV7pMdUE5bfXrYu3BT_suhy0CKoP3qJ2f68kJoN5_KygR"

    const topoLayer = new VectorTileLayer({
        portalItem: {
            id: "734c12e9904b4a8086d2dff8582a93a1"
        },
    })

    const hillShadeLayer = new TileLayer({
        portalItem: {
            id: "38c860f8dbd24820b2a59ccc9a3dabdb",
        }
    })

    const basemap = new Basemap({
        baseLayers: [
            topoLayer,
            hillShadeLayer
        ]
    })

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

    const map = new Map({
        basemap: basemap,
        layers: [trailsLayer, trailHuts]
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



    


    

})