require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    esriConfig.apikey = "AAPKb9f33ae691024e1aaad4a7c7e6cc3121-bYon1yJoAQgQgn4bGbNV7pMdUE5bfXrYu3BT_suhy0CKoP3qJ2f68kJoN5_KygR"

    const map = new Map({
        basemap: "arcgis-topographic"
    })

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13,
        container: "viewDiv"
    })

})