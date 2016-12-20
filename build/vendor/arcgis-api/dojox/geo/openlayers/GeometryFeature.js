//>>built
define("dojox/geo/openlayers/GeometryFeature","dojo/_base/declare dojo/_base/array dojo/_base/lang dojox/gfx/matrix ./Point ./LineString ./Collection ./Feature".split(" "),function(l,k,e,m,h,f,g,n){return l("dojox.geo.openlayers.GeometryFeature",n,{constructor:function(a){this._geometry=a;this._shapeProperties={};this._stroke=this._fill=null},_createCollection:function(a){var b=this.getLayer(),c=b.getSurface();a=this.createShape(c,a);b.getViewport().add(a);return a},_getCollectionShape:function(a){var b=
a.shape;null==b&&(b=this._createCollection(a),a.shape=b);return b},renderCollection:function(a){void 0==a&&(a=this._geometry);s=this._getCollectionShape(a);var b=this.getShapeProperties();s.setShape(b);k.forEach(a.coordinates,function(a){if(a instanceof h)this.renderPoint(a);else if(a instanceof f)this.renderLineString(a);else if(a instanceof g)this.renderCollection(a);else throw Error();},this);this._applyStyle(a)},render:function(a){void 0==a&&(a=this._geometry);if(a instanceof h)this.renderPoint(a);
else if(a instanceof f)this.renderLineString(a);else if(a instanceof g)this.renderCollection(a);else throw Error();},getShapeProperties:function(){return this._shapeProperties},setShapeProperties:function(a){this._shapeProperties=a;return this},createShape:function(a,b){b||(b=this._geometry);var c=null;if(b instanceof h)c=a.createCircle();else if(b instanceof f)c=a.createPolyline();else if(b instanceof g){var d=a.createGroup();k.forEach(b.coordinates,function(b){b=this.createShape(a,b);d.add(b)},
this);c=d}else throw Error();return c},getShape:function(){var a=this._geometry;if(!a)return null;if(a.shape)return a.shape;this.render();return a.shape},_createPoint:function(a){var b=this.getLayer(),c=b.getSurface();a=this.createShape(c,a);b.getViewport().add(a);return a},_getPointShape:function(a){var b=a.shape;null==b&&(b=this._createPoint(a),a.shape=b);return b},renderPoint:function(a){void 0==a&&(a=this._geometry);var b=this.getLayer(),c=b.getDojoMap();s=this._getPointShape(a);var d=e.mixin({},
this._defaults.pointShape),d=e.mixin(d,this.getShapeProperties());s.setShape(d);d=this.getCoordinateSystem();c=c.transform(a.coordinates,d);d=this._getLocalXY(c);c=d[0];d=d[1];(b=b.getViewport().getTransform())&&s.setTransform(m.translate(c-b.dx,d-b.dy));this._applyStyle(a)},_createLineString:function(a){var b=this.getLayer(),c=this.createShape(b._surface,a);b.getViewport().add(c);return a.shape=c},_getLineStringShape:function(a){var b=a.shape;null==b&&(b=this._createLineString(a),a.shape=b);return b},
renderLineString:function(a){void 0==a&&(a=this._geometry);var b=this.getLayer(),c=b.getDojoMap(),d=this._getLineStringShape(a),g=this.getCoordinateSystem(),h=Array(a.coordinates.length),f=b.getViewport().getTransform();k.forEach(a.coordinates,function(a,b,d){a=c.transform(a,g);a=this._getLocalXY(a);f&&(a[0]-=f.dx,a[1]-=f.dy);h[b]={x:a[0],y:a[1]}},this);b=e.mixin({},this._defaults.lineStringShape);b=e.mixin(b,this.getShapeProperties());b=e.mixin(b,{points:h});d.setShape(b);this._applyStyle(a)},_applyStyle:function(a){if(a&&
a.shape){var b=this.getFill(),c;!b||e.isString(b)||e.isArray(b)?c=b:(c=e.mixin({},this._defaults.fill),c=e.mixin(c,b));var b=this.getStroke(),d;!b||e.isString(b)||e.isArray(b)?d=b:(d=e.mixin({},this._defaults.stroke),d=e.mixin(d,b));this._applyRecusiveStyle(a,d,c)}},_applyRecusiveStyle:function(a,b,c){var d=a.shape;d.setFill&&d.setFill(c);d.setStroke&&d.setStroke(b);a instanceof g&&k.forEach(a.coordinates,function(a){this._applyRecusiveStyle(a,b,c)},this)},setStroke:function(a){this._stroke=a;return this},
getStroke:function(){return this._stroke},setFill:function(a){this._fill=a;return this},getFill:function(){return this._fill},remove:function(){var a=this._geometry,b=a.shape;a.shape=null;b&&b.removeShape();a instanceof g&&k.forEach(a.coordinates,function(a){this.remove(a)},this)},_defaults:{fill:null,stroke:null,pointShape:{r:30},lineStringShape:null}})});