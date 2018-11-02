LAYER
INCLUDE 'postgis.inc'
name layer1
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CC5-C6-C7') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 197 198 199
WIDTH 2
END
LABEL
COLOR 197 198 199
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer2
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C00-00-00-BLACK') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 0 0 0
WIDTH 2
END
LABEL
COLOR 0 0 0
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer3
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CD9-DA-DB') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 217 218 219
WIDTH 2
END
LABEL
COLOR 217 218 219
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer4
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CB1-B1-B1') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 177 177 177
WIDTH 2
END
LABEL
COLOR 177 177 177
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer5
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C00-7D-FF') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 0 125 255
WIDTH 2
END
LABEL
COLOR 0 125 255
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer6
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C7E-3E-00') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 126 62 0
WIDTH 2
END
LABEL
COLOR 126 62 0
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer7
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C49-A0-63') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 73 160 99
WIDTH 2
END
LABEL
COLOR 73 160 99
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer8
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C00-BE-C7') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 0 190 199
WIDTH 2
END
LABEL
COLOR 0 190 199
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer9
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C49-8F-D0') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 73 143 208
WIDTH 2
END
LABEL
COLOR 73 143 208
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer10
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C43-73-B4') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 67 115 180
WIDTH 2
END
LABEL
COLOR 67 115 180
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer11
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C83-B5-E4') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 131 181 228
WIDTH 2
END
LABEL
COLOR 131 181 228
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer12
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CF8-A1-00') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 248 161 0
WIDTH 2
END
LABEL
COLOR 248 161 0
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer13
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C99-4B-5F') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 153 75 95
WIDTH 2
END
LABEL
COLOR 153 75 95
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer14
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CFF-00-00') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 255 0 0
WIDTH 2
END
LABEL
COLOR 255 0 0
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer15
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C00-7E-FF') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 0 126 255
WIDTH 2
END
LABEL
COLOR 0 126 255
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer16
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C64-36-14') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 100 54 20
WIDTH 2
END
LABEL
COLOR 100 54 20
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer17
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'CB0-B3-B4') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 176 179 180
WIDTH 2
END
LABEL
COLOR 176 179 180
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
LAYER
INCLUDE 'postgis.inc'
name layer18
DATA "geom from (select id, text::text, st_transform(geom, 3857) as geom from entities where layer = 'C9D-A0-63') as foo using unique id using srid=3857" 
LABELITEM "text"
CLASS
style
outlinecolor 157 160 99
WIDTH 2
END
LABEL
COLOR 157 160 99
OUTLINECOLOR 235 235 235
FONT DejaVuSansBook
TYPE truetype
SIZE 10
POSITION AUTO
PARTIALS FALSE
ANTIALIAS true
BUFFER 2
END
END
END
