#!/usr/bin/env bash

sudo -u _www mapcache_seed -c "mapcache_test.xml" \
    -t drone_ts \
    -z 12,12 \
    -g GoogleMapsCompatible512 \
    -e "54769,6125668,510382,6367826" \
    -n 12 \
    -L /Volumes/GROSSD/tmp/mapcache/sup1256mb_white.log \
  -P 20


# translate raster with y axis inverted
#
-a_ullr ulx uly lrx lry

Upper Left  ( -626172.136,-5009377.086) (  5d37'30.00"W, 40d58'47.63"S)
Lower Left  ( -626172.136,-6887893.493) (  5d37'30.00"W, 52d28'58.01"S)
Upper Right ( 1565430.339,-5009377.086) ( 14d 3'45.00"E, 40d58'47.63"S)
Lower Right ( 1565430.339,-6887893.493) ( 14d 3'45.00"E, 52d28'58.01"S)

-a_ullr ulx -lly urx -ury
-a_ullr -626172.136 6887893.493 1565430.339 5009377.086

gdal_translate -a_ullr -626172.136 6887893.493 1565430.339 5009377.086 /Volumes/GROSSD/tmp/mapproxy/cache_data/drone.mbtiles drone.tif


# generates WMTS file for gdal:
gdal_translate "WMTS:http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities,layer=TRANSPORTS.DRONES.RESTRICTIONS" drone_wmts.xml -of WMTS

Nicokey: qm5lvt3ors89c8pueolq7ldg

# ducon, transfo directe gdal !!
gdal_translate "WMTS:http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities,layer=TRANSPORTS.DRONES.RESTRICTIONS,zoom_level=14" drone_wmts.tif

:))
PNG 8 bits pour les contours ?

gdalinfo WMTS: -oo URL="http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities" \
    -oo LAYER=TRANSPORTS.DRONES.RESTRICTIONS \
    -oo ZOOM_LEVEL=16

gdalinfo "WMTS:http://wxs.ign.fr/an7nvfzojv5wa96dsga5nk8w/geoportail/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities,layer=TRANSPORTS.DRONES.RESTRICTIONS,zoom_level=14"


# vectorize ?

# legende: 5 classes:
<Entry c1="251" c2="35" c3="93" c4="255"/>
<Entry c1="246" c2="138" c3="130" c4="255"/>
<Entry c1="253" c2="158" c3="62" c4="255"/>
<Entry c1="252" c2="208" c3="71" c4="255"/>
<Entry c1="249" c2="239" c3="84" c4="255"/>

# classify in 5 classes ?

<VRTDataset rasterXSize="226" rasterYSize="271">
  <VRTRasterBand dataType="Byte" band="1">
    <ColorInterp>Palette</ColorInterp>
    <ColorTable>
        <Entry c1="251" c2="35" c3="93" c4="255"/>
        <Entry c1="246" c2="138" c3="130" c4="255"/>
        <Entry c1="253" c2="158" c3="62" c4="255"/>
        <Entry c1="252" c2="208" c3="71" c4="255"/>
        <Entry c1="249" c2="239" c3="84" c4="255"/>
    </ColorTable>
  </VRTRasterBand>
</VRTDataset>

rgb2pct.py -pct palette.vrt drone_wmts.tif drone_pseudo.tif

gdal_contour -f "ESRI Shapefile" drone_wmts.tif contour.shp

# gdal contour marche super bien !
# trouver le bon intervale => isolation des zones => new datatype 1 band for raster ?
gdal_contour -b 1 -b 2 -b 3 -f "ESRI Shapefile" -i 50 -a ele drone_wmts.tif contour.shp
# marche pas en 3 bandes:

gdal_contour -b 1 -f "ESRI Shapefile" -i 50 -a ele drone_wmts.tif contourb1.shp
# => toutes les zones -1 trouvées

gdal_contour -b 2 -f "ESRI Shapefile" -i 50 -a ele drone_wmts.tif contourb2.shp
gdal_contour -b 3 -f "ESRI Shapefile" -i 50 -a ele drone_wmts.tif contourb3.shp

gdal_contour -f "ESRI Shapefile" -i 50 -a ele drone_pseudo.tif contour.shp
