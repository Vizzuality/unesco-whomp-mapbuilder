//>>built
define("esri/layers/rasterFormats/Png",["./Zlib"],function(v){return function(){function f(a){var b,e,c,d;this.data=a;this.pos=8;this.palette=[];this.imgData=[];this.transparency={};this.animation=null;this.text={};for(c=null;;){b=this.readUInt32();d=a=void 0;d=[];for(a=0;4>a;++a)d.push(String.fromCharCode(this.data[this.pos++]));a=d.join("");switch(a){case "IHDR":this.width=this.readUInt32();this.height=this.readUInt32();this.bits=this.data[this.pos++];this.colorType=this.data[this.pos++];this.compressionMethod=
this.data[this.pos++];this.filterMethod=this.data[this.pos++];this.interlaceMethod=this.data[this.pos++];break;case "acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||Infinity,frames:[]};break;case "PLTE":this.palette=this.read(b);break;case "fcTL":c&&this.animation.frames.push(c);this.pos+=4;c={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()};a=this.readUInt16();b=this.readUInt16()||100;c.delay=1E3*a/b;c.disposeOp=this.data[this.pos++];
c.blendOp=this.data[this.pos++];c.data=[];break;case "IDAT":case "fdAT":"fdAT"===a&&(this.pos+=4,b-=4);a=(null!=c?c.data:void 0)||this.imgData;for(d=0;0<=b?d<b:d>b;0<=b?++d:--d)a.push(this.data[this.pos++]);break;case "tRNS":this.transparency={};switch(this.colorType){case 3:this.transparency.indexed=this.read(b);b=255-this.transparency.indexed.length;if(0<b)for(a=0;0<=b?a<b:a>b;0<=b?++a:--a)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(b)[0];break;case 2:this.transparency.rgb=
this.read(b)}break;case "tEXt":d=this.read(b);b=d.indexOf(0);a=String.fromCharCode.apply(String,d.slice(0,b));this.text[a]=String.fromCharCode.apply(String,d.slice(b+1));break;case "IEND":c&&this.animation.frames.push(c);a:{switch(this.colorType){case 0:case 3:case 4:c=1;break a;case 2:case 6:c=3;break a}c=void 0}this.colors=c;this.hasAlphaChannel=4===(e=this.colorType)||6===e;e=this.colors+(this.hasAlphaChannel?1:0);this.pixelBitlength=this.bits*e;a:{switch(this.colors){case 1:e="DeviceGray";break a;
case 3:e="DeviceRGB";break a}e=void 0}this.colorSpace=e;this.imgData=new Uint8Array(this.imgData);return;default:this.pos+=b}this.pos+=4;if(this.pos>this.data.length)throw Error("Incomplete or corrupt PNG file");}}var u,t,p;f.load=function(a,b,e){var c;"function"===typeof b&&(e=b);c=new XMLHttpRequest;c.open("GET",a,!0);c.responseType="arraybuffer";c.onload=function(){var a;a=new Uint8Array(c.response||c.mozResponseArrayBuffer);a=new f(a);"function"===typeof(null!=b?b.getContext:void 0)&&a.render(b);
return"function"===typeof e?e(a):void 0};return c.send(null)};f.prototype.read=function(a){var b,e;e=[];for(b=0;0<=a?b<a:b>a;0<=a?++b:--b)e.push(this.data[this.pos++]);return e};f.prototype.readUInt32=function(){var a,b,e,c;a=this.data[this.pos++]<<24;b=this.data[this.pos++]<<16;e=this.data[this.pos++]<<8;c=this.data[this.pos++];return a|b|e|c};f.prototype.readUInt16=function(){var a,b;a=this.data[this.pos++]<<8;b=this.data[this.pos++];return a|b};f.prototype.decodePixels=function(a){var b,e,c,d,
g,l,k,h,m,f,r,q,n,p,s;null==a&&(a=this.imgData);if(0===a.length)return new Uint8Array(0);a=new v(a);a=a.getBytes();h=this.pixelBitlength/8;q=h*this.width;m=new Uint8Array(q*this.height);l=a.length;for(e=f=r=0;f<l;){switch(a[f++]){case 0:for(b=0;b<q;b+=1)m[e++]=a[f++];break;case 1:for(d=n=0;n<q;d=n+=1)b=a[f++],g=d<h?0:m[e-h],m[e++]=(b+g)%256;break;case 2:for(d=g=0;g<q;d=g+=1)b=a[f++],c=(d-d%h)/h,n=r&&m[(r-1)*q+c*h+d%h],m[e++]=(n+b)%256;break;case 3:for(d=s=0;s<q;d=s+=1)b=a[f++],c=(d-d%h)/h,g=d<h?0:
m[e-h],n=r&&m[(r-1)*q+c*h+d%h],m[e++]=(b+Math.floor((g+n)/2))%256;break;case 4:for(d=s=0;s<q;d=s+=1)b=a[f++],c=(d-d%h)/h,g=d<h?0:m[e-h],0===r?n=p=0:(n=m[(r-1)*q+c*h+d%h],p=c&&m[(r-1)*q+(c-1)*h+d%h]),k=g+n-p,d=Math.abs(k-g),c=Math.abs(k-n),k=Math.abs(k-p),g=d<=c&&d<=k?g:c<=k?n:p,m[e++]=(b+g)%256;break;default:throw Error("Invalid filter algorithm: "+a[f-1]);}r++}return m};f.prototype.decodePalette=function(){var a,b,e,c,d,g,l,k,h;e=this.palette;g=this.transparency.indexed||[];d=new Uint8Array((g.length||
0)+e.length);b=l=a=c=0;for(k=e.length;l<k;b=l+=3)d[c++]=e[b],d[c++]=e[b+1],d[c++]=e[b+2],d[c++]=null!=(h=g[a++])?h:255;return d};f.prototype.copyToImageData=function(a,b){var e,c,d,g,l,k,h,f;c=this.colors;f=null;e=this.hasAlphaChannel;this.palette.length&&(f=null!=(d=this._decodedPalette)?d:this._decodedPalette=this.decodePalette(),c=4,e=!0);d=a.data||a;h=d.length;l=f||b;g=k=0;if(1===c)for(;g<h;)c=f?4*b[g/4]:k,k=l[c++],d[g++]=k,d[g++]=k,d[g++]=k,d[g++]=e?l[c++]:this.transparency.grayscale&&this.transparency.grayscale===
k?0:255,k=c;else for(;g<h;)c=f?4*b[g/4]:k,d[g++]=l[c++],d[g++]=l[c++],d[g++]=l[c++],d[g++]=e?l[c++]:this.transparency.rgb&&this.transparency.rgb[1]===l[c-3]&&this.transparency.rgb[3]===l[c-2]&&this.transparency.rgb[5]===l[c-1]?0:255,k=c};f.prototype.decode=function(){var a;a=new Uint8Array(4*this.width*this.height);this.copyToImageData(a,this.decodePixels());return a};t=document.createElement("canvas");p=t.getContext("2d");u=function(a){p.width=a.width;p.height=a.height;p.clearRect(0,0,a.width,a.height);
p.putImageData(a,0,0);a=new Image;a.src=t.toDataURL();return a};f.prototype.decodeFrames=function(a){var b,e,c,d,g,f,k;if(this.animation){f=this.animation.frames;k=[];b=d=0;for(g=f.length;d<g;b=++d)b=f[b],e=a.createImageData(b.width,b.height),c=this.decodePixels(new Uint8Array(b.data)),this.copyToImageData(e,c),b.imageData=e,k.push(b.image=u(e));return k}};f.prototype.renderFrame=function(a,b){var e,c;c=this.animation.frames;e=c[b];c=c[b-1];0===b&&a.clearRect(0,0,this.width,this.height);1===(null!=
c?c.disposeOp:void 0)?a.clearRect(c.xOffset,c.yOffset,c.width,c.height):2===(null!=c?c.disposeOp:void 0)&&a.putImageData(c.imageData,c.xOffset,c.yOffset);0===e.blendOp&&a.clearRect(e.xOffset,e.yOffset,e.width,e.height);return a.drawImage(e.image,e.xOffset,e.yOffset)};f.prototype.animate=function(a){var b,e,c,d,g,f,k=this;e=0;f=this.animation;d=f.numFrames;c=f.frames;g=f.numPlays;return(b=function(){var f,l;f=e++%d;l=c[f];k.renderFrame(a,f);if(1<d&&e/d<g)return k.animation._timeout=setTimeout(b,l.delay)})()};
f.prototype.stopAnimation=function(){var a;return clearTimeout(null!=(a=this.animation)?a._timeout:void 0)};f.prototype.render=function(a){var b;a._png&&a._png.stopAnimation();a._png=this;a.width=this.width;a.height=this.height;a=a.getContext("2d");if(this.animation)return this.decodeFrames(a),this.animate(a);b=a.createImageData(this.width,this.height);this.copyToImageData(b,this.decodePixels());return a.putImageData(b,0,0)};return f}()});