/*
03 nov 2017
JS for demo page
Defines a custom object to handle demo
 */

var BasemapsDemo = {
    /////////////////////////////// Configuration variables /////////////////////////////////////////////////
    // URL_MAPSERVER: '/cgi-bin/mapserv?map=/Users/nicolas/bin/mapserver-basemaps/[MAPID]',
    // URL_MAPCACHE: 'http://localhost/mapcache/tms/1.0.0/[MAPID]@GoogleMapsCompatible/{z}/{x}/{y}.png',
    // URL_MAPPROXY: 'http://localhost/mapproxy/service?',

    // raspeberry pi mapserver/mapcache
    URL_MAPSERVER: '/cgi-bin/mapserv?map=/home/pi/Public/mapserver-basemaps/[MAPID]',
    URL_MAPCACHE: 'http://konipi/mapcache/tms/1.0.0/[MAPID]@GoogleMapsCompatible/{z}/{x}/{y}.png',
    URL_MAPPROXY: 'http://konipi/mapproxy/service?',

    // URL_ORTHO: '/map/?map=/Users/nicolas/Projets/i3dat/demo/map/',
    // URL_TESTEFFI: 'http://preview.efficity.com:8101/cgi-bin/mapserv?map=/home/nicolas/labels_only_export/osm-google-labels-only.map',
    // URL_MAPCACHE: 'http://localhost/mapcache/tms/1.0.0/[LAYER]@GoogleMapsCompatible/{z}/{x}/{y}.png',
    // URL_MAPCACHE512: 'http://localhost/mapcache/tms/1.0.0/[LAYER]@GoogleMapsCompatible512/{z}/{x}/{y}.png',
    // URL_S3_EFFI: 'http://efficity-basemap.s3.amazonaws.com/mapcache/[LAYER]/GoogleMapsCompatible/{z}/{x}/{y}.png',
    // URL_S3_EFFI512: 'http://efficity-basemap.s3.amazonaws.com/mapcache/[LAYER]/GoogleMapsCompatible512/{z}/{x}/{y}.png',

    // if (os === "Darwin") {
    //     url =
    // //        url = 'http://localhost:8080/?map=/maps/';
    //     urlOrtho = '/cgi-bin/mapserv?map=/Users/nicolas/Projets/i3dat/demo/map/';
    //
    //     // nginx urls
    // //        url = '/map/map=/Users/nicolas/bin/mapserver-basemaps/';
    // //        urlOrtho = '/map/?map=/Users/nicolas/Projets/i3dat/demo/map/';
    // } else if (os === "Linux") {
    // //        url = 'http://localhost:8080/?map=/maps/';
    //     url = '/cgi-bin/mapserv?map=/home/ubuntu/apps/mapserver-basemaps/';
    //     urlOrtho = '/cgi-bin/mapserv?map=/Users/nicolas/Projets/i3dat/demo/map/';
    // }

/////////////////////////////// internal variables /////////////////////////////////////////////////
    // Leaflet objects
    map: null,
    osmLayer: null,
    emptyLayer: null,
    baseLayers: null,
    overlays: [],
    controlLayers: null,
    layerType: 'mapcache_tms', // 'mapserver_wms' (single tile), 'mapserver_wmts' (tiled), 'mapcache_tms' (tiled, TMS)
    // layerType: 'mapserver_wmts', // 'mapserver_wms' (single tile), 'mapserver_wmts' (tiled), 'mapcache_tms' (tiled, TMS)
    isGridMode: false, // manages tiles grid display on map
    mapIdMap: {
        "osm-default": {mapserver: 'osm-default.map', mapcache: 'osm_default_ts'},
        "osm-default-symbols": {mapserver: 'osm-default-symbols.map', mapcache: 'osm_default_symbols_ts'},
        "osm-bing": {mapserver: 'osm-bing.map', mapcache: 'osm_bing_ts'},
        "osm-bing-symbols": {mapserver: 'osm-bing-buildings-symbols.map', mapcache: 'osm_bing_symbols_ts'},
        "osm-michelin": {mapserver: 'osm-michelin.map', mapcache: 'osm_michelin_ts'},
        "osm-michelin-symbols": {mapserver: 'osm-michelin-buildings-symbols.map', mapcache: 'osm_michelin_symbols_ts'},
        "osm-google-symbols": {mapserver: 'osm-google-buildings-symbols.map', mapcache: 'osm_google_buildings_symbols_ts'},
        "osm-google-symbols-nosrc": {mapserver: 'osm-google-buildings-symbols.map', mapcache: 'osm_google_buildings_symbols_ts'},
        "osm-google-grayscale": {mapserver: 'osm-google-buildings-symbols-grayscale.map', mapcache: 'osm_google_grayscale_ts'},
        "osm-google-random": {mapserver: 'osm-google-random.map', mapcache: 'osm_google_random_ts'},
        "osm-google-invert": {mapserver: 'osm-google-invert.map', mapcache: 'osm_google_invert_ts'},
        "osm-google-lumi": {mapserver: 'osm-google-lumi.map', mapcache: 'osm_google_lumi_ts'},
        "osm-topographic": {mapserver: 'osm-topographic.map', mapcache: 'osm_topographic_ts'},
        "strasbourg": {mapserver: 'strasbourg.map', mapcache: 'strasbourg_ts'}
    },

    /////////////////////////////// Functions ////////////////////////////////////////////////////
    init: function () {
        this.map = L.map('mapid').setView(
//        [43.604, 1.40], 8
            [43.6447, 1.4557], 12
        );

        ////////////// OSM live TMS ////////////////////////////////////////////////////////////////////////////////////////
        this.osmLayer = L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            'errorTileUrl': 'image/tileerror.png',
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        // an empty layer
        this.emptyLayer = L.tileLayer('').addTo(this.map);
        this.baseLayers = {
            'empty': this.emptyLayer,
            "Official OSM": this.osmLayer
        };
        // this.overlays = this.getLayers(this.layerType, this.map);

        // var providers = this.getProviders('single');
        var providers = this.getProviders(this.layerType);
        for (var providerId in providers) {
            console.log("getting: " + providerId);
            this.overlays.push(providers[providerId]);
        }

        // this.overlays.push(this.osmLayer);

        //////////// Controls /////////////////
        L.control.iconLayers(this.overlays).addTo(this.map);

        // this.controlLayers = L.control.layers(this.baseLayers, this.overlays).addTo(this.map);

        // coordinates:
        L.control.coordinates().addTo(this.map);

        //custom button: tile grid on map
        var this_ = this;
        L.easyButton('<img id="imggrid" class="img-trans" width="18" height="18" src="image/grid.png">', function (btn, map) {
            this_.isGridMode = !this_.isGridMode;
            $('.leaflet-tile').toggleClass('leaflet-tile-border');
            $('#imggrid').toggleClass('img-trans');
        }).addTo(this.map);

        //custom button: tile grid on map
        L.easyButton('fa-undo', function (btn, map) {
            this_.swapLayers();
        }).addTo(this.map);

        // TODO: bookmarks
        // 21 juillet 2017: custom bookmarks to navigate to DROM
        var bookmarksControl = new L.Control.Bookmarks({
            localStorage: false // if you want to use local variable for storage
        }).addTo(this.map);
        this.addBookmarks(this.map);

        // reset view to default after bookmarks
        this.map.setView(
            [43.6447, 1.4557], 12
        );

        // to remove grid style on zoomend
        this.map.on('zoomend', function () {
            if (this_.isGridMode) {
                $('.leaflet-tile').addClass('leaflet-tile-border');
            } else {
                $('.leaflet-tile').removeClass('leaflet-tile-border');
            }

        });

    },
    getProviders: function() {
        var providers = {};
        var mapType = '';
        if (this.layerType === 'mapserver_wmts') {
            mapType = 'mapserver';
            providers['osm-default'] = {
                title: 'osm default',
                icon: 'image/osm-default.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-default-symbols'] = {
                title: 'osm default symbols',
                icon: 'image/osm-default-symbols.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing'] = {
                title: 'osm bing',
                icon: 'image/osm-bing.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing-symbols'] = {
                title: 'osm bing symbols',
                icon: 'image/osm-bing-symbols.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin'] = {
                title: 'osm michelin',
                icon: 'image/osm-michelin.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin-symbols'] = {
                title: 'osm michelin symbols',
                icon: 'image/osm-michelin-symbols.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols'] = {
                title: 'osm google symbols',
                icon: 'image/osm-google-symbols.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols-nosrc'] = {
                title: 'osm google symbols nosrc',
                icon: 'image/osm-google-symbols.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols-nosrc'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-grayscale'] = {
                title: 'osm google grayscale',
                icon: 'image/osm-google-grayscale.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-grayscale'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-random'] = {
                title: 'osm google random clr',
                icon: 'image/osm-google-random.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-random'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-invert'] = {
                title: 'osm google inverted clr',
                icon: 'image/osm-google-invert.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-invert'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-lumi'] = {
                title: 'osm google luminance',
                icon: 'image/osm-google-lumi.png',
                layer: L.tileLayer.wms(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-lumi'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
        } else if (this.layerType === 'mapserver_wms') {
            mapType = 'mapserver';
            providers['osm-default'] = {
                title: 'osm default',
                icon: 'image/osm-default.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-default-symbols'] = {
                title: 'osm default symbols',
                icon: 'image/osm-default-symbols.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing'] = {
                title: 'osm bing',
                icon: 'image/osm-bing.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing-symbols'] = {
                title: 'osm bing symbols',
                icon: 'image/osm-bing-symbols.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin'] = {
                title: 'osm michelin',
                icon: 'image/osm-michelin.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin-symbols'] = {
                title: 'osm michelin symbols',
                icon: 'image/osm-michelin-symbols.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols'] = {
                title: 'osm google symbols',
                icon: 'image/osm-google.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols-nosrc'] = {
                title: 'osm google symbols nosrc',
                icon: 'image/osm-google.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols-nosrc'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-grayscale'] = {
                title: 'osm google grayscale',
                icon: 'image/osm-google-grayscale.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-grayscale'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-random'] = {
                title: 'osm google random clr',
                icon: 'image/osm-google-random.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-random'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-invert'] = {
                title: 'osm google inverted clr',
                icon: 'image/osm-google-invert.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-invert'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-lumi'] = {
                title: 'osm google luminance',
                icon: 'image/osm-google-lumi.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-lumi'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-topographic'] = {
                title: 'osm topographic',
                icon: 'image/osm-topographic.png',
                layer: L.WMS.overlay(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-topographic'][mapType]), {
                    layers: 'default',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['strasbourg'] = {
                title: 'strasbourg PLU',
                icon: 'image/strasbourg.png',
                layer: L.WMS.overlay(this.URL_MAPPROXY, {
                    layers: 'gm_layer',
                    format: 'image/png',
                    transparent: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; Strasbourg data"
                })
            };
        } else {
            mapType = 'mapcache';
            this.URL_MAPSERVER = this.URL_MAPCACHE;
            providers['osm-default'] = {
                title: 'osm default',
                icon: 'image/osm-default.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default'][mapType]), {
                    'tms': true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-default-symbols'] = {
                title: 'osm default symbols',
                icon: 'image/osm-default-symbols.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-default-symbols'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing'] = {
                title: 'osm bing',
                icon: 'image/osm-bing.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-bing-symbols'] = {
                title: 'osm bing symbols',
                icon: 'image/osm-bing-symbols.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-bing-symbols'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin'] = {
                title: 'osm michelin',
                icon: 'image/osm-michelin.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-michelin-symbols'] = {
                title: 'osm michelin symbols',
                icon: 'image/osm-michelin-symbols.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-michelin-symbols'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols'] = {
                title: 'osm google symbols',
                icon: 'image/osm-google-symbols.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-symbols-nosrc'] = {
                title: 'osm google symbols nosrc',
                icon: 'image/osm-google-symbols.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-symbols-nosrc'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-grayscale'] = {
                title: 'osm google grayscale',
                icon: 'image/osm-google-grayscale.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-grayscale'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-random'] = {
                title: 'osm google random clr',
                icon: 'image/osm-google-random.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-random'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-invert'] = {
                title: 'osm google inverted clr',
                icon: 'image/osm-google-invert.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-invert'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-google-lumi'] = {
                title: 'osm google luminance',
                icon: 'image/osm-google-lumi.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-google-lumi'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
            providers['osm-topo'] = {
                title: 'osm topographic',
                icon: 'image/osm-topo.png',
                layer: new L.TileLayer(this.URL_MAPSERVER.replace('[MAPID]', this.mapIdMap['osm-topographic'][mapType]), {
                    tms: true,
                    'errorTileUrl': 'image/tileerror.png',
                    attribution: "&copy; OSM data"
                })
            };
        }

        return providers;
    },
            // "MC Google no labels grayscale": new L.TileLayer(this.URL_MAPCACHE512.replace('[LAYER]', 'osm_google_no_labels_grayscale_NEW_ts'), tmsOptions512),
    // gets WMS.layer, single tiled
    addBookmarks: function (map) {
        map.fire('bookmark:add', {
            data: {
                id: 'bm_guadeloupe',
                name: 'Guadeloupe',
                latlng: [16.26, -61.55],
                zoom: 10,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_martinique',
                name: 'Martinique',
                latlng: [14.6361, -61.0],
                zoom: 11,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_guyane',
                name: 'Guyane',
                latlng: [4.09, -53.13],
                zoom: 8,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_reunion',
                name: 'Réunion',
                latlng: [-21.11, 55.53],
                zoom: 10,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_mayotte',
                name: 'Mayotte',
                latlng: [-12.79, 45.16],
                zoom: 11,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_nouvellecaledonie',
                name: 'Nouvelle Calédonie',
                latlng: [-21.32, 165.5],
                zoom: 8,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_polynesie',
                name: 'Polynésie',
                latlng: [-16.96, -151.6],
                zoom: 7,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_wallisetfutuna',
                name: 'Wallis et Futuna',
                latlng: [-13.77345, -177.1532],
                zoom: 7,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_saintpierreetmiquelon',
                name: 'St Pierre et Miquelon',
                latlng: [47.03, -56.31],
                zoom: 11,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_saintmartin',
                name: 'St Martin',
                latlng: [18.0731, -63.0615],
                zoom: 11,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_saintbarthelemy',
                name: 'St Barthelemy',
                latlng: [17.90430, -62.8217],
                zoom: 11,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_toulouse',
                name: 'Toulouse',
                latlng: [43.6447, 1.4557],
                zoom: 12,
                removable: false,
                editable: false
            }
        });
        map.fire('bookmark:add', {
            data: {
                id: 'bm_strasbourg',
                name: 'Strasbourg',
                latlng: [48.58391, 7.73600],
                zoom: 12,
                removable: false,
                editable: false
            }
        });
    },
    swapLayers: function () {
        for (var i = this.controlLayers._layers.length - 1; i >= 0; i--) {
            var l = this.controlLayers._layers[i];
            if (l.overlay === true) {
                this.map.removeLayer(l.layer);
                this.controlLayers.removeLayer(l.layer);
            }
        }
        var layers = null;
        if (this.layerType === 'classic') {
            this.layerType = 'wms';
            layers = this.getWmsLayers(this.map);
        } else {
            this.layerType = 'classic';
            layers = this.getClassicLayers(this.map);
        }
        for (var l in layers) {
            this.controlLayers.addOverlay(layers[l], l);
        }

    }
    /////////////////////////////////////////////////////////////////////////////////////////
};