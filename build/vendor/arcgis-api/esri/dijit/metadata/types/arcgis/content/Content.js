//>>built
require({cache:{"url:esri/dijit/metadata/types/arcgis/content/templates/Content.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'contInfo\',minOccurs:0,maxOccurs:\'unbounded\',label:\'${i18nArcGIS.contInfo.caption}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/ElementChoice"\x3e\r\n      \r\n      \x3c!-- coverage --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/CoverageDescription"\r\n        data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.section.CovDesc}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- image --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/ImageDecsription"\r\n        data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.section.ImgDesc}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n      \x3c!-- feature catalogue --\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/types/arcgis/content/FeatureCatalogue"\r\n        data-dojo-props\x3d"label:\'${i18nArcGIS.contInfo.section.FetCatDesc}\'"\x3e\r\n      \x3c/div\x3e\r\n      \r\n    \x3c/div\x3e    \r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/arcgis/content/Content","dojo/_base/declare dojo/_base/lang dojo/has ../../../../../kernel ../../../base/Descriptor dojo/text!./templates/Content.html ./CoverageDescription ./ImageDecsription ./FeatureCatalogue".split(" "),function(a,b,c,d,e,f){a=a(e,{templateString:f});c("extend-esri")&&b.setObject("dijit.metadata.types.arcgis.content.Content",a,d);return a});