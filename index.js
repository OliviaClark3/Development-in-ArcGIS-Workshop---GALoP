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
            // hillShadeLayer
        ]
    })

    const trailHutsLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Huts/FeatureServer/0"
    })
    // map.add(trailHutsLayer)

    const trailsLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/3JjYDyG3oajxU6HO/ArcGIS/rest/services/DOC_Tracks/FeatureServer/0"
    })
    // map.add(trailsLayer, 0)

    const map = new Map({
        basemap: basemap,
        layers: [trailsLayer, trailHutsLayer]
    })

    const view = new MapView({
        map: map,
        center: new Point({ x: 1795999, y: 5457405, spatialReference: { wkid: 2193 } }), // nztm coordinates
        zoom: 10,
        container: "viewDiv"
    })

    

})