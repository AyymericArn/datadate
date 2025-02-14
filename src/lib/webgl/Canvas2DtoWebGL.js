//replaces the Canvas2D functions by WebGL functions, the behaviour is not 100% the same but it kind of works in many cases
//not all functions have been implemented

'use strict';

const { vec3 } = require('gl-matrix')

(function(r){function G(g,f,a,b){this.gl=b=b||r.gl;this._context_id=b.context_id;if(g&&g.constructor!==Array)throw"FBO textures must be an Array";this.handler=null;this.height=this.width=-1;this.color_textures=[];this.depth_texture=null;this.stencil=!!a;this._stencil_enabled=!1;this._num_binded_textures=0;(g&&g.length||f)&&this.setTextures(g,f);this._old_fbo=null;this._old_viewport=new Float32Array(4)}var k=r.GL={};r.requestAnimationFrame=r.requestAnimationFrame||r.mozRequestAnimationFrame||
	r.webkitRequestAnimationFrame||function(g){setTimeout(g,1E3/60)};k.blockable_keys={Up:!0,Down:!0,Left:!0,Right:!0};k.LEFT_MOUSE_BUTTON=1;k.MIDDLE_MOUSE_BUTTON=2;k.RIGHT_MOUSE_BUTTON=3;k.last_context_id=0;k.TEXTURE_2D=3553;k.TEXTURE_CUBE_MAP=34067;k.BYTE=5120;k.UNSIGNED_BYTE=5121;k.SHORT=5122;k.UNSIGNED_SHORT=5123;k.INT=5124;k.UNSIGNED_INT=5125;k.FLOAT=5126;k.HALF_FLOAT_OES=36193;k.DEPTH_COMPONENT16=33189;k.FLOAT_VEC2=35664;k.FLOAT_VEC3=35665;k.FLOAT_VEC4=35666;k.INT_VEC2=35667;k.INT_VEC3=35668;k.INT_VEC4=
	35669;k.BOOL=35670;k.BOOL_VEC2=35671;k.BOOL_VEC3=35672;k.BOOL_VEC4=35673;k.FLOAT_MAT2=35674;k.FLOAT_MAT3=35675;k.FLOAT_MAT4=35676;k.DEPTH_COMPONENT=6402;k.ALPHA=6406;k.RGB=6407;k.RGBA=6408;k.LUMINANCE=6409;k.LUMINANCE_ALPHA=6410;k.NEAREST=9728;k.LINEAR=9729;k.NEAREST_MIPMAP_NEAREST=9984;k.LINEAR_MIPMAP_NEAREST=9985;k.NEAREST_MIPMAP_LINEAR=9986;k.LINEAR_MIPMAP_LINEAR=9987;k.REPEAT=10497;k.CLAMP_TO_EDGE=33071;k.MIRRORED_REPEAT=33648;k.ZERO=0;k.ONE=1;k.SRC_COLOR=768;k.ONE_MINUS_SRC_COLOR=769;k.SRC_ALPHA=
	770;k.ONE_MINUS_SRC_ALPHA=771;k.DST_ALPHA=772;k.ONE_MINUS_DST_ALPHA=773;k.DST_COLOR=774;k.ONE_MINUS_DST_COLOR=775;k.SRC_ALPHA_SATURATE=776;k.CONSTANT_COLOR=32769;k.ONE_MINUS_CONSTANT_COLOR=32770;k.CONSTANT_ALPHA=32771;k.ONE_MINUS_CONSTANT_ALPHA=32772;k.VERTEX_SHADER=35633;k.FRAGMENT_SHADER=35632;k.CW=2304;k.CCW=2305;k.FRONT=1028;k.BACK=1029;k.FRONT_AND_BACK=1032;k.NEVER=512;k.LESS=513;k.EQUAL=514;k.LEQUAL=515;k.GREATER=516;k.NOTEQUAL=517;k.GEQUAL=518;k.ALWAYS=519;k.temp_vec3=vec3.create();k.temp2_vec3=
	vec3.create();k.temp_vec4=vec4.create();k.temp_quat=quat.create();k.temp_mat3=mat3.create();k.temp_mat4=mat4.create();r.DEG2RAD=0.0174532925;r.RAD2DEG=57.295779578552306;r.EPSILON=1E-6;r.isPowerOfTwo=k.isPowerOfTwo=function(g){return 0==Math.log(g)/Math.log(2)%1};r.getTime="undefined"!=typeof performance?performance.now.bind(performance):Date.now.bind(Date);k.getTime=r.getTime;r.isFunction=function(g){return!!(g&&g.constructor&&g.call&&g.apply)};r.isArray=function(g){return g&&g.constructor===Array};
	r.isNumber=function(g){return null!=g&&g.constructor===Number};r.cloneObject=k.cloneObject=function(g,f){if(g.constructor!==Object)throw"cloneObject only can clone pure javascript objects, not classes";f=f||{};for(var a in g){var b=g[a];if(null===b)f[a]=null;else switch(b.constructor){case Int8Array:case Uint8Array:case Int16Array:case Uint16Array:case Int32Array:case Uint32Array:case Float32Array:case Float64Array:f[a]=new b.constructor(b);break;case Boolean:case Number:case String:f[a]=b;break;
		case Array:f[a]=b.concat();break;case Object:f[a]=k.cloneObject(b)}}return f};r.regexMap=function(g,f,a){for(var b;null!=(b=g.exec(f));)a(b)};r.createCanvas=k.createCanvas=function(g,f){var a=document.createElement("canvas");a.width=g;a.height=f;return a};r.cloneCanvas=k.cloneCanvas=function(g){var f=document.createElement("canvas");f.width=g.width;f.height=g.height;f.getContext("2d").drawImage(g,0,0);return f};"undefined"!=typeof Image&&(Image.prototype.getPixels=function(){var g=document.createElement("canvas");
		g.width=this.width;g.height=this.height;g=g.getContext("2d");g.drawImage(this,0,0);return g.getImageData(0,0,this.width,this.height).data});String.prototype.hasOwnProperty("replaceAll")||Object.defineProperty(String.prototype,"replaceAll",{value:function(g){var f=this,a;for(a in g)f=f.split(a).join(g[a]);return f},enumerable:!1});String.prototype.hasOwnProperty("hashCode")||Object.defineProperty(String.prototype,"hashCode",{value:function(){var g=0,f,a,b;if(0==this.length)return g;f=0;for(b=this.length;f<
		b;++f)a=this.charCodeAt(f),g=(g<<5)-g+a,g|=0;return g},enumerable:!1});Array.prototype.hasOwnProperty("subarray")||Object.defineProperty(Array.prototype,"subarray",{value:Array.prototype.slice,enumerable:!1});r.wipeObject=function(g){for(var f in g)g.hasOwnProperty(f)&&delete g[f]};r.extendClass=k.extendClass=function(g,f){for(var a in f)g.hasOwnProperty(a)||(g[a]=f[a]);if(f.prototype){var b=Object.getOwnPropertyNames(f.prototype);for(a=0;a<b.length;++a){var c=b[a];g.prototype.hasOwnProperty(c)||
	(f.prototype.__lookupGetter__(c)?g.prototype.__defineGetter__(c,f.prototype.__lookupGetter__(c)):g.prototype[c]=f.prototype[c],f.prototype.__lookupSetter__(c)&&g.prototype.__defineSetter__(c,f.prototype.__lookupSetter__(c)))}}g.hasOwnProperty("superclass")||Object.defineProperty(g,"superclass",{get:function(){return f},enumerable:!1})};r.HttpRequest=k.request=function(g,f,a,b,c){var d=!0;c&&void 0!==c.async&&(d=c.async);if(f){var e=null,e=[],h;for(h in f)e.push(h+"="+f[h]);e=e.join("&");g=g+"?"+e}var m=
		new XMLHttpRequest;m.open("GET",g,d);m.onload=function(c){this.getResponseHeader("Content-Type");200!=this.status?(z.trigger(m,"fail",this.status),b&&b(this.status)):(z.trigger(m,"done",this.response),a&&a(this.response))};m.onerror=function(a){z.trigger(m,"fail",a)};if(c){for(h in c)m[h]=c[h];c.binary&&(m.responseType="arraybuffer")}m.send();return m};XMLHttpRequest.prototype.hasOwnProperty("done")||Object.defineProperty(XMLHttpRequest.prototype,"done",{enumerable:!1,value:function(g){z.bind(this,
			"done",function(f,a){g(a)});return this}});XMLHttpRequest.prototype.hasOwnProperty("fail")||Object.defineProperty(XMLHttpRequest.prototype,"fail",{enumerable:!1,value:function(g){z.bind(this,"fail",function(f,a){g(a)});return this}});r.getFileExtension=function(g){var f=g.indexOf("?");-1!=f&&(g=g.substr(0,f));f=g.lastIndexOf(".");return-1==f?"":g.substr(f+1).toLowerCase()};r.loadFileAtlas=k.loadFileAtlas=function(g,f,a){var b=null;HttpRequest(g,null,function(a){a=k.processFileAtlas(a);f&&f(a);b&&
	b(a)},alert,a);return{done:function(a){b=a}}};r.processFileAtlas=k.processFileAtlas=function(g,f){for(var a=g.split("\n"),b={},c=[],d="",e=0,h=a.length;e<h;e++){var m=f?a[e]:a[e].trim();m.length&&("\\"!=m[0]?c.push(m):(c.length&&(b[d]=c.join("\n")),c.length=0,d=m.substr(1)))}c.length&&(b[d]=c.join("\n"));return b};r.hexColorToRGBA=function(){function g(a,c,d){0>d&&(d+=1);1<d&&(d-=1);return d<1/6?a+6*(c-a)*d:0.5>d?c:d<2/3?a+(c-a)*(2/3-d)*6:a}function f(a,c,d,e){e=e||vec3.create();if(0==c)d=c=a=d;else{var f=
		0.5>d?d*(1+c):d+c-d*c,m=2*d-f;d=g(m,f,a+1/3);c=g(m,f,a);a=g(m,f,a-1/3)}e[0]=d;e[1]=c;e[2]=a;return e}var a={white:[1,1,1],black:[0,0,0],gray:[0.501960813999176,0.501960813999176,0.501960813999176],red:[1,0,0],orange:[1,0.6470588445663452,0],pink:[1,0.7529411911964417,0.7960784435272217],green:[0,0.501960813999176,0],lime:[0,1,0],blue:[0,0,1],violet:[0.9333333373069763,0.5098039507865906,0.9333333373069763],magenta:[1,0,1],cyan:[0,1,1],yellow:[1,1,0],brown:[0.6470588445663452,0.16470588743686676,0.16470588743686676],
		silver:[0.7529411911964417,0.7529411911964417,0.7529411911964417],gold:[1,0.843137264251709,0],transparent:[0,0,0,0]};return function(b,c,d){d=void 0===d?1:d;c=c||new Float32Array(4);c[3]=d;if("string"!=typeof b)return c;var e=a[b];if(void 0!==e)return c.set(e),c[3]=3==c.length?d:c[3]*d,c;e=b.indexOf("rgba(");if(-1!=e)return b=b.substr(5),b=b.split(","),c[0]=parseInt(b[0])/255,c[1]=parseInt(b[1])/255,c[2]=parseInt(b[2])/255,c[3]=parseFloat(b[3])*d,c;e=b.indexOf("hsla(");if(-1!=e)return b=b.substr(5),
		b=b.split(","),f(parseInt(b[0])/360,parseInt(b[1])/100,parseInt(b[2])/100,c),c[3]=parseFloat(b[3])*d,c;c[3]=d;e=b.indexOf("rgb(");if(-1!=e)return b=b.substr(3),b=b.split(","),c[0]=parseInt(b[0])/255,c[1]=parseInt(b[1])/255,c[2]=parseInt(b[2])/255,c;e=b.indexOf("hsl(");if(-1!=e)return b=b.substr(5),b=b.split(","),f(parseInt(b[0])/360,parseInt(b[1])/100,parseInt(b[2])/100,c),c;b=b.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b);
		if(!d)return c;c[0]=parseInt(d[1],16)/255;c[1]=parseInt(d[2],16)/255;c[2]=parseInt(d[3],16)/255;return c}}();var O=function(){function g(a){return a.charCodeAt(0)+(a.charCodeAt(1)<<8)+(a.charCodeAt(2)<<16)+(a.charCodeAt(3)<<24)}function f(a,b,c,d){var e=new Uint16Array(4),f=new Uint16Array(c*d),g=0,h=0,l=0,m=h=g=0,n=0,k=0,v=0,p=c/4;d/=4;for(var s=0;s<d;s++)for(var q=0;q<p;q++)l=b+4*(s*p+q),e[0]=a[l],e[1]=a[l+1],g=e[0]&31,h=e[0]&2016,m=e[0]&63488,n=e[1]&31,k=e[1]&2016,v=e[1]&63488,e[2]=5*g+3*n>>3|
		5*h+3*k>>3&2016|5*m+3*v>>3&63488,e[3]=5*n+3*g>>3|5*k+3*h>>3&2016|5*v+3*m>>3&63488,g=a[l+2],h=4*s*c+4*q,f[h]=e[g&3],f[h+1]=e[g>>2&3],f[h+2]=e[g>>4&3],f[h+3]=e[g>>6&3],h+=c,f[h]=e[g>>8&3],f[h+1]=e[g>>10&3],f[h+2]=e[g>>12&3],f[h+3]=e[g>>14],g=a[l+3],h+=c,f[h]=e[g&3],f[h+1]=e[g>>2&3],f[h+2]=e[g>>4&3],f[h+3]=e[g>>6&3],h+=c,f[h]=e[g>>8&3],f[h+1]=e[g>>10&3],f[h+2]=e[g>>12&3],f[h+3]=e[g>>14];return f}function a(a){for(var b=0,c=a.length,d=0;b<c;b+=4)d=a[b],a[b]=a[b+2],a[b+2]=d}function b(b,c,d,g){var H=new Int32Array(d,
		0,p),I,A,D,B,E,K,z,J,C;if(H[v]!=e)return console.error("Invalid magic number in DDS header"),0;if(!H[x]&l)return console.error("Unsupported format, must contain a FourCC code"),0;I=H[r];switch(I){case n:A=8;D=c?c.COMPRESSED_RGB_S3TC_DXT1_EXT:null;break;case k:A=16;D=c?c.COMPRESSED_RGBA_S3TC_DXT3_EXT:null;break;case t:A=16;D=c?c.COMPRESSED_RGBA_S3TC_DXT5_EXT:null;break;default:A=4,I=null,D=b.RGBA}z=1;H[s]&h&&!1!==g&&(z=Math.max(1,H[F]));B=H[y];E=H[w];K=H[u]+4;if(H[R+1]&m)for(C=0;6>C;++C)for(B=H[y],
																																																																																																																														   E=H[w],J=0;J<z;++J)I?(g=Math.max(4,B)/4*Math.max(4,E)/4*A,c=new Uint8Array(d,K,g),b.compressedTexImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X+C,J,D,B,E,0,c)):(b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!1),g=B*E*A,c=new Uint8Array(d,K,g),a(c),b.texImage2D(b.TEXTURE_CUBE_MAP_POSITIVE_X+C,J,D,B,E,0,b.RGBA,b.UNSIGNED_BYTE,c)),K+=g,B*=0.5,E*=0.5;else if(c)for(b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!0),J=0;J<z;++J)I?(g=Math.max(4,B)/4*Math.max(4,E)/4*A,c=new Uint8Array(d,K,g),b.compressedTexImage2D(b.TEXTURE_2D,J,D,B,
		E,0,c)):(g=B*E*A,c=new Uint8Array(d,K,g),a(c),b.texImage2D(b.TEXTURE_2D,J,D,B,E,0,D,b.UNSIGNED_BYTE,c)),K+=g,B*=0.5,E*=0.5;else if(I==n)Math.max(4,B),Math.max(4,E),c=new Uint16Array(d),d=f(c,K/2,B,E),b.texImage2D(b.TEXTURE_2D,0,b.RGB,B,E,0,b.RGB,b.UNSIGNED_SHORT_5_6_5,d),g&&b.generateMipmap(b.TEXTURE_2D);else return console.error("No manual decoder for",String.fromCharCode(I&255,I>>8&255,I>>16&255,I>>24&255),"and no native support"),0;return z}function c(b,c){var d=new Int32Array(b,0,p),g,H,I,A,D,
		B,E,z,C,J,G;if(d[v]!=e)return console.error("Invalid magic number in DDS header"),0;if(!d[x]&l)return console.error("Unsupported format, must contain a FourCC code"),0;g=d[r];switch(g){case n:H=8;I="COMPRESSED_RGB_S3TC_DXT1_EXT";break;case k:H=16;I="COMPRESSED_RGBA_S3TC_DXT3_EXT";break;case t:H=16;I="COMPRESSED_RGBA_S3TC_DXT5_EXT";break;default:H=4,I="RGBA"}C=1;d[s]&h&&!1!==loadMipmaps&&(C=Math.max(1,d[F]));A=d[y];D=d[w];E=d[u]+4;var Q=[];if(d[R+1]&m)for(G=0;6>G;++G)for(A=d[y],D=d[w],J=0;J<C;++J)g?
		(B=Math.max(4,A)/4*Math.max(4,D)/4*H,new Uint8Array(b,E,B),Q.push({tex:"TEXTURE_CUBE_MAP",face:G,mipmap:J,internalFormat:I,width:A,height:D,offset:0,dataOffset:E,dataLength:B})):(B=A*D*H,z=new Uint8Array(b,E,B),a(z),Q.push({tex:"TEXTURE_CUBE_MAP",face:G,mipmap:J,internalFormat:I,width:A,height:D,offset:0,type:"UNSIGNED_BYTE",dataOffset:E,dataLength:B})),E+=B,A*=0.5,D*=0.5;else if(c)if(g==n)Math.max(4,A),Math.max(4,D),z=new Uint16Array(b),d=f(z,E/2,A,D),Q.push({tex:"TEXTURE_2D",mipmap:0,internalFormat:"RGB",
		width:A,height:D,offset:0,format:"RGB",type:"UNSIGNED_SHORT_5_6_5",data:d});else return console.error("No manual decoder for",String.fromCharCode(g&255,g>>8&255,g>>16&255,g>>24&255),"and no native support"),0;else for(J=0;J<C;++J)B=Math.max(4,A)/4*Math.max(4,D)/4*H,new Uint8Array(b,E,B),Q.push({tex:"TEXTURE_2D",mipmap:J,internalFormat:I,width:A,height:D,offset:0,type:"UNSIGNED_BYTE",dataOffset:E,dataLength:B}),E+=B,A*=0.5,D*=0.5;return Q}function d(a,c,d,e,f,g){var h=new XMLHttpRequest;h.open("GET",
		d,!0);h.responseType="arraybuffer";h.onload=function(){if(200==this.status){var d=new Int32Array(this.response,0,p),h=d[R+1]&m?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D;a.bindTexture(h,e);var l=b(a,c,this.response,f);a.texParameteri(h,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(h,a.TEXTURE_MIN_FILTER,1<l?a.LINEAR_MIPMAP_LINEAR:a.LINEAR);a.bindTexture(h,null);e.texture_type=h;e.width=d[y];e.height=d[w]}g&&g(e)};h.send(null);return e}var e=542327876,h=131072,m=512,l=4,n=g("DXT1"),k=g("DXT3"),t=g("DXT5"),p=
		31,v=0,u=1,s=2,w=3,y=4,F=7,x=20,r=21,R=27;return{dxtToRgb565:f,uploadDDSLevels:b,loadDDSTextureEx:d,loadDDSTexture:function(a,b,c,e){var f=a.createTexture();b=a.getExtension("WEBGL_compressed_texture_s3tc");d(a,b,c,f,!0,e);return f},loadDDSTextureFromMemoryEx:function(a,c,d,e,f){var g=new Int32Array(d,0,p),h=!!(g[R+1]&m),l=h?a.TEXTURE_CUBE_MAP:a.TEXTURE_2D;a.bindTexture(l,e.handler);c=b(a,c,d,f);a.texParameteri(l,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(l,a.TEXTURE_MIN_FILTER,1<c?a.LINEAR_MIPMAP_LINEAR:
			a.LINEAR);h&&(a.texParameteri(l,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(l,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE));a.bindTexture(l,null);e.handler&&(e.texture_type=l,e.width=g[y],e.height=g[w]);return e},getDDSTextureFromMemoryEx:function(a){var b=new Int32Array(a,0,p),d=b[R+1]&m?"TEXTURE_CUBE_MAP":"TEXTURE_2D",e=c(a);return{type:d,buffers:e,data:a,width:b[y],height:b[w]}}}}();"undefined"!=typeof r&&(r.DDS=O);if("undefined"==typeof glMatrix)throw"You must include glMatrix on your project";Math.clamp=
		function(g,f,a){return f>g?f:a<g?a:g};vec3.ZERO=vec3.fromValues(0,0,0);vec3.FRONT=vec3.fromValues(0,0,-1);vec3.UP=vec3.fromValues(0,1,0);vec3.RIGHT=vec3.fromValues(1,0,0);vec2.rotate=function(g,f,a){var b=f[0];f=f[1];var c=Math.cos(a);a=Math.sin(a);g[0]=b*c-f*a;g[1]=b*a+f*c;return g};vec3.zero=function(g){g[0]=g[1]=0;return g};vec2.perpdot=function(g,f){return g[1]*f[0]+-g[0]*f[1]};vec2.computeSignedAngle=function(g,f){return Math.atan2(vec2.perpdot(g,f),vec2.dot(g,f))};vec2.random=function(g){g[0]=
		Math.random();g[1]=Math.random();return g};vec3.zero=function(g){g[0]=g[1]=g[2]=0;return g};vec3.minValue=function(g){return g[0]<g[1]&&g[0]<g[2]?g[0]:g[1]<g[2]?g[1]:g[2]};vec3.maxValue=function(g){return g[0]>g[1]&&g[0]>g[2]?g[0]:g[1]>g[2]?g[1]:g[2]};vec3.minValue=function(g){return g[0]<g[1]&&g[0]<g[2]?g[0]:g[1]<g[2]?g[1]:g[2]};vec3.addValue=function(g,f,a){g[0]=f[0]+a;g[1]=f[1]+a;g[2]=f[2]+a};vec3.subValue=function(g,f,a){g[0]=f[0]-a;g[1]=f[1]-a;g[2]=f[2]-a};vec3.toArray=function(g){return[g[0],
		g[1],g[2]]};vec3.rotateX=function(g,f,a){var b=f[1],c=f[2],d=Math.cos(a);a=Math.sin(a);g[0]=f[0];g[1]=b*d-c*a;g[2]=b*a+c*d;return g};vec3.rotateY=function(g,f,a){var b=f[0],c=f[2],d=Math.cos(a);a=Math.sin(a);g[0]=b*d-c*a;g[1]=f[1];g[2]=b*a+c*d;return g};vec3.rotateZ=function(g,f,a){var b=f[0],c=f[1],d=Math.cos(a);a=Math.sin(a);g[0]=b*d-c*a;g[1]=b*a+c*d;g[2]=f[2];return g};vec3.angle=function(g,f){return Math.acos(vec3.dot(g,f))};vec3.random=function(g){g[0]=Math.random();g[1]=Math.random();g[2]=Math.random();
		return g};vec3.polarToCartesian=function(g,f){var a=f[0],b=f[1],c=f[2];g[0]=a*Math.cos(b)*Math.sin(c);g[1]=a*Math.sin(b);g[2]=a*Math.cos(b)*Math.cos(c);return g};vec4.random=function(g){g[0]=Math.random();g[1]=Math.random();g[2]=Math.random();g[3]=Math.random();return g};vec4.toArray=function(g){return[g[0],g[1],g[2],g[3]]};mat3.IDENTITY=mat3.create();mat4.IDENTITY=mat4.create();mat4.toArray=function(g){return[g[0],g[1],g[2],g[3],g[4],g[5],g[6],g[7],g[8],g[9],g[10],g[11],g[12],g[13],g[14],g[15]]};
	mat4.setUpAndOrthonormalize=function(g,f,a){f!=g&&mat4.copy(g,f);f=g.subarray(0,3);vec3.normalize(g.subarray(4,7),a);g=g.subarray(8,11);vec3.cross(f,a,g);vec3.normalize(f,f);vec3.cross(g,f,a);vec3.normalize(g,g)};mat4.multiplyVec3=function(g,f,a){var b=a[0],c=a[1];a=a[2];g[0]=f[0]*b+f[4]*c+f[8]*a+f[12];g[1]=f[1]*b+f[5]*c+f[9]*a+f[13];g[2]=f[2]*b+f[6]*c+f[10]*a+f[14];return g};mat4.projectVec3=function(g,f,a){var b=a[0],c=a[1];a=a[2];var d=f[1]*b+f[5]*c+f[9]*a+f[13],e=f[2]*b+f[6]*c+f[10]*a+f[14],h=
		f[3]*b+f[7]*c+f[11]*a+f[15];g[0]=((f[0]*b+f[4]*c+f[8]*a+f[12])/h+1)/2;g[1]=(d/h+1)/2;g[2]=(e/h+1)/2;return g};vec3.project=function(g,f,a,b){b=b||gl.viewport_data;var c=f[0],d=f[1];f=f[2];var e=a[3]*c+a[7]*d+a[11]*f+a[15],h=1-((a[1]*c+a[5]*d+a[9]*f+a[13])/e+1)/2;g[0]=((a[0]*c+a[4]*d+a[8]*f+a[12])/e+1)/2*b[2]+b[0];g[1]=h*b[3]+b[1];g[2]=e;return g};var S=mat4.create(),C=vec4.create();vec3.unproject=function(g,f,a,b){C[0]=2*(f[0]-b[0])/b[2]-1;C[1]=2*(f[1]-b[1])/b[3]-1;C[2]=2*f[2]-1;C[3]=1;if(!mat4.invert(S,
		a))return null;vec4.transformMat4(C,C,S);if(0===C[3])return null;g[0]=C[0]/C[3];g[1]=C[1]/C[3];g[2]=C[2]/C[3];return g};mat4.rotateVec3=function(g,f,a){var b=a[0],c=a[1];a=a[2];g[0]=f[0]*b+f[4]*c+f[8]*a;g[1]=f[1]*b+f[5]*c+f[9]*a;g[2]=f[2]*b+f[6]*c+f[10]*a;return g};mat4.fromTranslationFrontTop=function(g,f,a,b){vec3.cross(g.subarray(0,3),a,b);g.set(b,4);g.set(a,8);g.set(f,12);return g};mat4.translationMatrix=function(g){var f=mat4.create();f[12]=g[0];f[13]=g[1];f[14]=g[2];return f};mat4.setTranslation=
		function(g,f){g[12]=f[0];g[13]=f[1];g[14]=f[2];return g};mat4.getTranslation=function(g,f){g[0]=f[12];g[1]=f[13];g[2]=f[14];return g};mat4.toRotationMat4=function(g,f){mat4.copy(g,f);g[12]=g[13]=g[14]=0;return g};mat4.swapRows=function(g,f,a,b){if(g!=f)return mat4.copy(g,f),g[4*a]=f[4*b],g[4*a+1]=f[4*b+1],g[4*a+2]=f[4*b+2],g[4*a+3]=f[4*b+3],g[4*b]=f[4*a],g[4*b+1]=f[4*a+1],g[4*b+2]=f[4*a+2],g[4*b+3]=f[4*a+3],g;f=new Float32Array(matrix.subarray(4*a,5*a));matrix.set(matrix.subarray(4*b,5*b),4*a);matrix.set(f,
		4*b);return g};mat4.scaleAndAdd=function(g,f,a,b){g[0]=f[0]+a[0]*b;g[1]=f[1]+a[1]*b;g[2]=f[2]+a[2]*b;g[3]=f[3]+a[3]*b;g[4]=f[4]+a[4]*b;g[5]=f[5]+a[5]*b;g[6]=f[6]+a[6]*b;g[7]=f[7]+a[7]*b;g[8]=f[8]+a[8]*b;g[9]=f[9]+a[9]*b;g[10]=f[10]+a[10]*b;g[11]=f[11]+a[11]*b;g[12]=f[12]+a[12]*b;g[13]=f[13]+a[13]*b;g[14]=f[14]+a[14]*b;g[15]=f[15]+a[15]*b;return g};quat.fromAxisAngle=function(g,f){var a=quat.create();f*=0.5;var b=Math.sin(f);a[0]=b*g[0];a[1]=b*g[1];a[2]=b*g[2];a[3]=Math.cos(f);return a};quat.toEuler=
		function(g,f){var a=Math.atan2(2*f[1]*f[3]-2*f[0]*f[2],1-2*f[1]*f[1]-2*f[2]*f[2]),b=Math.asin(2*f[0]*f[1]+2*f[2]*f[3]),c=Math.atan2(2*f[0]*f[3]-2*f[1]*f[2],1-2*f[0]*f[0]-2*f[2]*f[2]);g||(g=vec3.create());vec3.set(g,a,b,c);return g};quat.fromEuler=function(g,f){var a=f[0],b=f[1],c=f[2],d=Math.cos(a),e=Math.cos(b),h=Math.cos(c),a=Math.sin(a),b=Math.sin(b),c=Math.sin(c),m=0.5*Math.sqrt(1+d*e+d*h-a*b*c+e*h);0==m&&(m=1E-6);quat.set(g,(e*c+d*c+a*b*h)/(4*m),(a*e+a*h+d*b*c)/(4*m),(-a*c+d*b*h+b)/(4*m),m);
		quat.normalize(g,g);return g};quat.fromMat4=function(g,f){var a=f[0]+f[5]+f[10];if(0<a){var b=Math.sqrt(a+1);g[3]=0.5*b;b=0.5/b;g[0]=(f[9]-f[6])*b;g[1]=(f[2]-f[8])*b;g[2]=(f[4]-f[1])*b}else{a=0;f[5]>f[0]&&(a=1);f[10]>f[4*a+a]&&(a=2);var c=(a+1)%3,d=(c+1)%3,b=Math.sqrt(f[4*a+a]-f[4*c+c]-f[4*d+d]+1);g[a]=0.5*b;b=0.5/b;g[3]=(f[4*d+c]-f[4*c+d])*b;g[c]=(f[4*c+a]+f[4*a+c])*b;g[d]=(f[4*d+a]+f[4*a+d])*b}quat.normalize(g,g)};quat.fromMat4.lookAt=function(){var g=vec3.create();return function(f,a,b){b=vec3.dot(vec3.FRONT,
		a);if(1E-6>Math.abs(b- -1))return f.set(vec3.UP),f[3]=Math.PI,f;if(1E-6>Math.abs(b-1))return quat.identity(f);b=Math.acos(b);vec3.cross(g,vec3.FRONT,a);vec3.normalize(g,g);quat.setAxisAngle(f,g,b);return f}}();k.Indexer=function(){this.unique=[];this.indices=[];this.map={}};k.Indexer.prototype={add:function(g){var f=JSON.stringify(g);f in this.map||(this.map[f]=this.unique.length,this.unique.push(g));return this.map[f]}};k.Buffer=function(g,f,a,b,c){k.debug&&console.log("GL.Buffer created");null!==
	c&&(c=c||r.gl);this.buffer=null;this.target=g;this.gl=c;this.data=f;this.spacing=a||3;this.data&&this.gl&&this.upload(b)};k.Buffer.prototype.forEach=function(g){for(var f=this.data,a=0,b=this.spacing,c=f.length;a<c;a+=b)g(f.subarray(a,a+b),a);return this};k.Buffer.prototype.applyTransform=function(g){for(var f=this.data,a=0,b=this.spacing,c=f.length;a<c;a+=b)b=f.subarray(a,a+b),vec3.transformMat4(b,b,g);return this};k.Buffer.prototype.upload=function(g){var f=this.spacing||3,a=this.gl;if(a){if(!this.data)throw"No data supplied";
		var b=this.data;if(!b.buffer)throw"Buffers must be typed arrays";if(this.buffer=this.buffer||a.createBuffer()){this.buffer.length=b.length;this.buffer.spacing=f;switch(b.constructor){case Int8Array:this.buffer.gl_type=a.BYTE;break;case Uint8ClampedArray:case Uint8Array:this.buffer.gl_type=a.UNSIGNED_BYTE;break;case Int16Array:this.buffer.gl_type=a.SHORT;break;case Uint16Array:this.buffer.gl_type=a.UNSIGNED_SHORT;break;case Int32Array:this.buffer.gl_type=a.INT;break;case Uint32Array:this.buffer.gl_type=
			a.UNSIGNED_INT;break;case Float32Array:this.buffer.gl_type=a.FLOAT;break;default:throw"unsupported buffer type";}a.bindBuffer(this.target,this.buffer);a.bufferData(this.target,b,g||this.stream_type||a.STATIC_DRAW)}}};k.Buffer.prototype.compile=k.Buffer.prototype.upload;k.Buffer.prototype.setData=function(g,f){if(!g.buffer)throw"Data must be typed array";f=f||0;if(this.data){if(this.data.length<g.length)throw"buffer is not big enough, you cannot set data to a smaller buffer";if(this.data!=g)if(this.data.length==
		g.length)this.data.set(g),this.upload();else{var a=new Uint8Array(g.buffer,g.buffer.byteOffset,g.buffer.byteLength);(new Uint8Array(this.data.buffer)).set(a,f);this.uploadRange(f,a.length)}}else this.data=g,this.upload()};k.Buffer.prototype.uploadRange=function(g,f){if(!this.data)throw"No data stored in this buffer";if(!this.data.buffer)throw"Buffers must be typed arrays";var a=new Uint8Array(this.data.buffer,g,f),b=this.gl;b.bindBuffer(this.target,this.buffer);b.bufferSubData(this.target,g,a)};k.Buffer.prototype.clone=
		function(g){var f=new k.Buffer;if(g)for(var a in this)f[a]=this[a];else this.target&&(f.target=this.target),this.gl&&(f.gl=this.gl),this.spacing&&(f.spacing=this.spacing),this.data&&(f.data=new r[this.data.constructor](this.data),f.upload());return f};r.Mesh=k.Mesh=function(g,f,a,b){k.debug&&console.log("GL.Mesh created");null!==b&&(this.gl=b=b||r.gl);this._context_id=b.context_id;this.vertexBuffers={};this.indexBuffers={};this.bounding=this.info=null;(g||f)&&this.addBuffers(g,f,a?a.stream_type:null);
		if(a)for(var c in a)this[c]=a[c]};Mesh.common_buffers={vertices:{spacing:3,attribute:"a_vertex"},vertices2D:{spacing:2,attribute:"a_vertex2D"},normals:{spacing:3,attribute:"a_normal"},coords:{spacing:2,attribute:"a_coord"},coords1:{spacing:2,attribute:"a_coord1"},coords2:{spacing:2,attribute:"a_coord2"},colors:{spacing:4,attribute:"a_color"},tangents:{spacing:3,attribute:"a_tangent"},bone_indices:{spacing:4,attribute:"a_bone_indices",type:Uint8Array},weights:{spacing:4,attribute:"a_weights"},extra:{spacing:1,
			attribute:"a_extra"},extra2:{spacing:2,attribute:"a_extra2"},extra3:{spacing:3,attribute:"a_extra3"},extra4:{spacing:4,attribute:"a_extra4"}};Mesh.default_datatype=Float32Array;Mesh.prototype.addBuffer=function(g,f){f.target==gl.ARRAY_BUFFER?this.vertexBuffers[g]=f:this.indexBuffers[g]=f;f.attribute||(f.attribute=k.Mesh.common_buffers[g].attribute)};Mesh.prototype.addBuffers=function(g,f,a){var b=0;this.vertexBuffers.vertices&&(b=this.vertexBuffers.vertices.data.length/3);for(var c in g){var d=g[c];
		if(d){if(d.constructor==k.Buffer)d=d.data;else if("number"!=typeof d[0]){for(var e=[],h=0,m=1E4;h<d.length;h+=m)e=Array.prototype.concat.apply(e,d.slice(h,h+m));d=e}e=k.Mesh.common_buffers[c];d.constructor===Array&&(h=k.Mesh.default_datatype,e&&e.type&&(h=e.type),d=new h(d));"vertices"==c&&(b=d.length/3);h=d.length/b;e&&e.spacing&&(h=e.spacing);m="a_"+c;e&&e.attribute&&(m=e.attribute);this.createVertexBuffer(c,m,h,d,a)}}if(f)for(c in f)if(d=f[c]){d.constructor==k.Buffer&&(d=d.data);if("number"!=typeof d[0]){e=
		[];c=0;for(m=1E4;c<d.length;c+=m)e=Array.prototype.concat.apply(e,d.slice(c,c+m));d=e}d.constructor===Array&&(h=Uint16Array,65536<b&&(h=Uint32Array),d=new h(d));this.createIndexBuffer(c,d)}};Mesh.prototype.createVertexBuffer=function(g,f,a,b,c){var d=k.Mesh.common_buffers[g];!f&&d&&(f=d.attribute);if(!f)throw"Buffer added to mesh without attribute name";!a&&d&&(a=d&&d.spacing?d.spacing:3);if(!b){b=this.getNumVertices();if(!b)throw"Cannot create an empty buffer in a mesh without vertices (vertices are needed to know the size)";
		b=new k.Mesh.default_datatype(b*a)}if(!b.buffer)throw"Buffer data MUST be typed array";a=this.vertexBuffers[g]=new k.Buffer(gl.ARRAY_BUFFER,b,a,c,this.gl);a.name=g;a.attribute=f;return a};Mesh.prototype.removeVertexBuffer=function(g){this.vertexBuffers[g]&&delete this.vertexBuffers[g]};Mesh.prototype.getVertexBuffer=function(g){return this.vertexBuffers[g]};Mesh.prototype.createIndexBuffer=function(g,f,a){if(f.constructor===Array){var b=Uint16Array,c=this.vertexBuffers.vertices;c&&(65536<c.data.length/
	3&&(b=Uint32Array),f=new b(f))}return this.indexBuffers[g]=new k.Buffer(gl.ELEMENT_ARRAY_BUFFER,f,0,a,this.gl)};Mesh.prototype.getBuffer=function(g){return this.vertexBuffers[g]};Mesh.prototype.getIndexBuffer=function(g){return this.indexBuffers[g]};Mesh.prototype.upload=function(g){for(var f in this.vertexBuffers){var a=this.vertexBuffers[f];a.upload(g)}for(var b in this.indexBuffers)a=this.indexBuffers[b],a.upload()};Mesh.prototype.compile=Mesh.prototype.upload;Mesh.prototype.deleteBuffers=function(){for(var g in this.vertexBuffers){var f=
		this.vertexBuffers[g];this.gl.deleteBuffer(f.buffer)}this.vertexBuffers={};for(g in this.indexBuffers)f=this.indexBuffers[g],this.gl.deleteBuffer(f.buffer);this.indexBuffers[g]={}};Mesh.prototype.bindBuffers=function(g){for(var f in this.vertexBuffers){var a=this.vertexBuffers[f],b=g.attributes[a.attribute||f];null!=b&&a.buffer&&(gl.bindBuffer(gl.ARRAY_BUFFER,a.buffer),gl.enableVertexAttribArray(b),gl.vertexAttribPointer(b,a.buffer.spacing,a.buffer.gl_type,!1,0,0))}};Mesh.prototype.unbindBuffers=
		function(g){for(var f in this.vertexBuffers){var a=this.vertexBuffers[f],b=a.attribute||f;null!=g.attributes[b]&&a.buffer&&gl.disableVertexAttribArray(g.attributes[b])}};Mesh.prototype.clone=function(g){g=g||r.gl;var f={},a={},b;for(b in this.vertexBuffers){var c=this.vertexBuffers[b];f[b]=new c.data.constructor(c.data)}for(b in this.indexBuffers)c=this.indexBuffers[b],a[b]=new c.data.constructor(c.data);return new k.Mesh(f,a,void 0,g)};Mesh.prototype.cloneShared=function(g){g=g||r.gl;return new k.Mesh(this.vertexBuffers,
		this.indexBuffers,void 0,g)};Mesh.prototype.toObject=function(){var g={},f={},a;for(a in this.vertexBuffers){var b=this.vertexBuffers[a];g[a]={spacing:b.spacing,data:new b.data.constructor(b.data)}}for(a in this.indexBuffers)b=this.indexBuffers[a],f[a]={data:new b.data.constructor(b.data)};return{vertexBuffers:g,indexBuffers:f}};Mesh.prototype.generateMetadata=function(){var g={},f=this.vertexBuffers.vertices.data,a=this.indexBuffers.triangles.data;g.vertices=f.length/3;g.faces=a?a.length/3:f.length/
		9;g.indexed=!!this.metadata.faces;this.metadata=g};Mesh.prototype.toJSON=function(){return""};Mesh.prototype.computeWireframe=function(){var g=this.indexBuffers.triangles,f=this.vertexBuffers.vertices.data.length/3;if(g){for(var a=g.data,b=new k.Indexer,g=0;g<a.length;g+=3)for(var c=a.subarray(g,g+3),d=0;d<c.length;d++){var e=c[d],h=c[(d+1)%c.length];b.add([Math.min(e,h),Math.max(e,h)])}a=b.unique;b=65536<f?new Uint32Array(2*a.length):new Uint16Array(2*a.length);g=0;for(f=a.length;g<f;++g)b.set(a[g],
		2*g)}else for(g=f/3,b=65536<f?new Uint32Array(6*g):new Uint16Array(6*g),g=0;g<f;g+=3)b[2*g]=g,b[2*g+1]=g+1,b[2*g+2]=g+1,b[2*g+3]=g+2,b[2*g+4]=g+2,b[2*g+5]=g;this.createIndexBuffer("wireframe",b);return this};Mesh.prototype.flipNormals=function(g){var f=this.vertexBuffers.normals;if(f){for(var a=f.data,b=a.length,c=0;c<b;++c)a[c]*=-1;f.upload(g);this.indexBuffers.triangles&&this.computeIndices();f=this.indexBuffers.triangles;a=f.data;b=a.length;for(c=0;c<b;c+=3){var d=a[c];a[c]=a[c+1];a[c+1]=d}f.upload(g)}};
	Mesh.prototype.computeIndices=function(){var g=[],f=[],a=[],b=[],c=this.vertexBuffers.normals,d=this.vertexBuffers.coords,e=this.vertexBuffers.vertices.data,h=null;c&&(h=c.data);c=null;d&&(c=d.data);for(var d={},m=e.length/3,l=0;l<m;++l){var n=e.subarray(3*l,3*(l+1)),q=1E3*n[0]|0,t=0,p=d[q];if(p)for(var v=p.length;t<v;t++)if(0.01>vec3.sqrDist(n,g[p[t]])){b.push(t);break}p&&t!=v||(g.push(n),d[q]?d[q].push(t):d[q]=[t],h&&f.push(h.subarray(3*l,3*(l+1))),c&&a.push(c.subarray(2*l,2*(l+1))),b.push(t))}this.vertexBuffers=
		{};this.createVertexBuffer("vertices",k.Mesh.common_buffers.vertices.attribute,3,linearizeArray(g));h&&this.createVertexBuffer("normals",k.Mesh.common_buffers.normals.attribute,3,linearizeArray(f));c&&this.createVertexBuffer("coords",k.Mesh.common_buffers.coords.attribute,2,linearizeArray(a));this.createIndexBuffer("triangles",b)};Mesh.prototype.computeNormals=function(g){var f=this.vertexBuffers.vertices.data,a=new Float32Array(f.length),b=null;this.indexBuffers.triangles&&(b=this.indexBuffers.triangles.data);
		for(var c=k.temp_vec3,d=k.temp2_vec3,e,h,m,l,n,q,t=b?b.length:f.length,p=0;p<t;p+=3)b?(e=b[p],h=b[p+1],m=b[p+2],l=f.subarray(3*e,3*e+3),n=f.subarray(3*h,3*h+3),q=f.subarray(3*m,3*m+3),e=a.subarray(3*e,3*e+3),h=a.subarray(3*h,3*h+3),m=a.subarray(3*m,3*m+3)):(l=f.subarray(3*p,3*p+3),n=f.subarray(3*p+3,3*p+6),q=f.subarray(3*p+6,3*p+9),e=a.subarray(3*p,3*p+3),h=a.subarray(3*p+3,3*p+6),m=a.subarray(3*p+6,3*p+9)),vec3.sub(c,n,l),vec3.sub(d,q,l),vec3.cross(c,c,d),vec3.normalize(c,c),vec3.add(e,e,c),vec3.add(h,
			h,c),vec3.add(m,m,c);if(b)for(p=0,t=a.length;p<t;p+=3)f=a.subarray(p,p+3),vec3.normalize(f,f);if(t=this.vertexBuffers.normals)t.data=a,t.upload(g);else return this.createVertexBuffer("normals",k.Mesh.common_buffers.normals.attribute,3,a);return t};Mesh.prototype.computeTangents=function(){var g=this.vertexBuffers.vertices.data,f=this.vertexBuffers.normals.data,a=this.vertexBuffers.coords.data,b=this.indexBuffers.triangles.data;if(g&&f&&a){var c=g.length/3,d=new Float32Array(4*c),e=new Float32Array(6*
		c),c=e.subarray(3*c),h,m,l=vec3.create(),n=vec3.create(),k=vec3.create(),t=vec3.create();h=0;for(m=b.length;h<m;h+=3){var p=b[h],v=b[h+1],u=b[h+2],s=g.subarray(3*p,3*p+3),w=g.subarray(3*v,3*v+3),y=g.subarray(3*u,3*u+3),F=a.subarray(2*p,2*p+2),x=a.subarray(2*v,2*v+2),r=a.subarray(2*u,2*u+2),z=w[0]-s[0],C=y[0]-s[0],N=w[1]-s[1],G=y[1]-s[1],w=w[2]-s[2],s=y[2]-s[2],y=x[0]-F[0],L=r[0]-F[0],x=x[1]-F[1],F=r[1]-F[1],r=y*F-L*x,r=1E-9>Math.abs(r)?0:1/r;vec3.copy(l,[(F*z-x*C)*r,(F*N-x*G)*r,(F*w-x*s)*r]);vec3.copy(n,
		[(y*C-L*z)*r,(y*G-L*N)*r,(y*s-L*w)*r]);vec3.add(e.subarray(3*p,3*p+3),e.subarray(3*p,3*p+3),l);vec3.add(e.subarray(3*v,3*v+3),e.subarray(3*v,3*v+3),l);vec3.add(e.subarray(3*u,3*u+3),e.subarray(3*u,3*u+3),l);vec3.add(c.subarray(3*p,3*p+3),c.subarray(3*p,3*p+3),n);vec3.add(c.subarray(3*v,3*v+3),c.subarray(3*v,3*v+3),n);vec3.add(c.subarray(3*u,3*u+3),c.subarray(3*u,3*u+3),n)}h=0;for(m=g.length;h<m;h+=3)g=f.subarray(h,h+3),a=e.subarray(h,h+3),vec3.subtract(k,a,vec3.scale(k,g,vec3.dot(g,a))),vec3.normalize(k,
		k),g=0>vec3.dot(vec3.cross(t,g,a),c.subarray(h,h+3))?-1:1,d.set([k[0],k[1],k[2],g],h/3*4);this.createVertexBuffer("tangents",Mesh.common_buffers.tangents.attribute,4,d)}};Mesh.prototype.getNumVertices=function(){var g=this.vertexBuffers.vertices;return g?g.data.length/g.spacing:0};Mesh.computeBounding=function(g,f){if(g){for(var a=vec3.clone(g.subarray(0,3)),b=vec3.clone(g.subarray(0,3)),c,d=3;d<g.length;d+=3)c=g.subarray(d,d+3),vec3.min(a,c,a),vec3.max(b,c,b);if(isNaN(a[0])||isNaN(a[1])||isNaN(a[2])||
		isNaN(b[0])||isNaN(b[1])||isNaN(b[2]))a[0]=a[1]=a[2]=0,b[0]=b[1]=b[2]=0,console.warn("Warning: GL.Mesh has NaN values in vertices");a=vec3.add(vec3.create(),a,b);vec3.scale(a,a,0.5);b=vec3.subtract(vec3.create(),b,a);return BBox.setCenterHalfsize(f||BBox.create(),a,b)}};Mesh.prototype.getBoundingBox=function(){this.bounding||this.updateBounding();return this.bounding};Mesh.prototype.updateBounding=function(){var g=this.vertexBuffers.vertices.data;g&&(this.bounding=k.Mesh.computeBounding(g,this.bounding))};
	Mesh.prototype.setBounding=function(g,f){this.bounding=BBox.setCenterHalfsize(this.bounding||BBox.create(),g,f)};Mesh.prototype.freeData=function(){for(var g in this.vertexBuffers)this.vertexBuffers[g].data=null,delete this[this.vertexBuffers[g].name];for(var f in this.indexBuffers)this.indexBuffers[f].data=null,delete this[this.indexBuffers[f].name]};Mesh.prototype.configure=function(g,f){var a={},b={};f=f||{};for(var c in g)g[c]&&("indices"==c||"lines"==c||"wireframe"==c||"triangles"==c?b[c]=g[c]:
		k.Mesh.common_buffers[c]?a[c]=g[c]:f[c]=g[c]);this.addBuffers(a,b,f.stream_type);for(b in f)this[b]=f[b]};Mesh.prototype.totalMemory=function(){var g=0,f;for(f in this.vertexBuffers)g+=this.vertexBuffers[f].data.buffer.byteLength;for(f in this.indexBuffers)g+=this.indexBuffers[f].data.buffer.byteLength;return g};Mesh.prototype.simplify=function(){var g=this.getBoundingBox(),f=BBox.getMin(g),g=BBox.getHalfsize(g),g=vec3.scale(vec3.create(),g,2),a=new k.Mesh,b=vec3.create(),c;for(c in this.vertexBuffers){var d=
		this.vertexBuffers[c].data,e=new Float32Array(d.length);if("vertices"==c)for(var h=0,m=d.length;h<m;h+=3){var l=d.subarray(h,h+3);vec3.sub(b,l,f);vec3.div(b,b,g);b[0]=Math.round(256*b[0])/256;b[1]=Math.round(256*b[1])/256;b[2]=Math.round(256*b[2])/256;vec3.mul(b,b,g);vec3.add(b,b,f);e.set(b,h)}a.addBuffer()}};Mesh.load=function(g,f,a,b){f=f||{};f.no_gl&&(b=null);a=a||new k.Mesh(null,null,null,b);a.configure(g,f);return a};Mesh.mergeMeshes=function(g,f){function a(a,b,c,d){for(c=b+c;b<c;b+=3){var e=
		a.subarray(b,b+3);vec3.transformMat4(e,e,d)}}function b(a,b,c,d){for(c=b+c;b<c;b+=2){var e=a.subarray(b,b+2);vec2.transformMat3(e,e,d)}}function c(a,b,c,d){for(c=b+c;b<c;++b)a[b]+=d}f=f||{};for(var d={},e={},h={},m=[],l=0,n=[],q=0;q<g.length;++q){var t=g[q],p=t.mesh,v=l;m.push(v);var u=p.vertexBuffers.vertices.data.length/3,l=l+u,s;for(s in p.vertexBuffers)d[s]=d[s]?d[s]+p.vertexBuffers[s].data.length:p.vertexBuffers[s].data.length;for(s in p.indexBuffers)e[s]=e[s]?e[s]+p.indexBuffers[s].data.length:
		p.indexBuffers[s].data.length;n.push({name:"mesh_"+q,start:v,length:u,material:""})}for(s in d)q=f[s],null===q?delete d[s]:(q||(q=Float32Array),d[s]=new q(d[s]),h[s]=0);for(s in e)e[s]=new Uint32Array(e[s]),h[s]=0;for(q=0;q<g.length;++q){t=g[q];p=t.mesh;u=v=0;for(s in p.vertexBuffers)d[s]&&("vertices"==s&&(u=p.vertexBuffers[s].data.length/3),d[s].set(p.vertexBuffers[s].data,h[s]),t[s+"_matrix"]&&(l=t[s+"_matrix"],16==l.length?a(d[s],h[s],p.vertexBuffers[s].data.length,l):9==l.length&&b(d[s],h[s],
		p.vertexBuffers[s].data.length,l)),h[s]+=p.vertexBuffers[s].data.length);for(s in p.indexBuffers)e[s].set(p.indexBuffers[s].data,h[s]),c(e[s],h[s],p.indexBuffers[s].data.length,m[q]),h[s]+=p.indexBuffers[s].data.length}h={info:{groups:n}};return"undefined"!=typeof gl?new k.Mesh(d,e,h):{vertexBuffers:d,indexBuffers:e,info:{groups:n}}};Mesh.parsers={};Mesh.encoders={};Mesh.fromURL=function(g,f,a,b){b=b||{};a=a||r.gl;var c=new k.Mesh(void 0,void 0,void 0,a);c.ready=!1;HttpRequest(g,null,function(a){var b=
		g.lastIndexOf("."),b=g.substr(b+1);c.parse(a,b);delete c.ready;f&&f.call(c,c,g)},function(a){f&&f(null)},b);return c};Mesh.prototype.parse=function(g,f){f=f.toLowerCase();var a=k.Mesh.parsers[f];if(a)return a.call(null,g,{mesh:this});throw"GL.Mesh.parse: no parser found for format "+f;};Mesh.prototype.encode=function(g,f){g=g.toLowerCase();var a=k.Mesh.encoders[g];if(a)return a.call(null,this,f);throw"GL.Mesh.encode: no encoder found for format "+g;};Mesh.getScreenQuad=function(g){g=g||r.gl;var f=
		g.meshes[":screen_quad"];if(f)return f;var f=new Float32Array([0,0,0,1,1,0,0,1,0,0,0,0,1,0,0,1,1,0]),a=new Float32Array([0,0,1,1,0,1,0,0,1,0,1,1]),f=new k.Mesh({vertices:f,coords:a},void 0,void 0,g);return g.meshes[":screen_quad"]=f};Mesh.plane=function(g,f){g=g||{};g.triangles=[];var a=g.detailX||g.detail||1,b=g.detailY||g.detail||1,c=g.width||g.size||1,d=g.height||g.size||1,e=g.xz,c=0.5*c,d=0.5*d,h=[],m=[],l=[],n=[],q=vec3.fromValues(0,0,1);e&&q.set([0,1,0]);for(var t=0;t<=b;t++)for(var p=t/b,v=
		0;v<=a;v++){var u=v/a;e?m.push((2*u-1)*c,0,-(2*p-1)*d):m.push((2*u-1)*c,(2*p-1)*d,0);l&&l.push(u,p);n&&n.push(q[0],q[1],q[2]);v<a&&t<b&&(u=v+t*(a+1),e?(h.push(u+1,u+a+1,u),h.push(u+1,u+a+2,u+a+1)):(h.push(u,u+1,u+a+1),h.push(u+a+1,u+1,u+a+2)))}a=BBox.fromCenterHalfsize([0,0,0],e?[c,0,d]:[c,d,0]);return k.Mesh.load({vertices:m,normals:n,coords:l,triangles:h},{bounding:a},f)};Mesh.plane2D=function(g,f){var a=new Float32Array([-1,1,1,-1,1,1,-1,1,-1,-1,1,-1]),b=new Float32Array([0,1,1,0,1,1,0,1,0,0,1,
		0]);if(g&&g.size)for(var c=0.5*g.size,d=0;d<a.length;++d)a[d]*=c;return new k.Mesh({vertices2D:a,coords:b},null,f)};Mesh.point=function(g){return new k.Mesh({vertices:[0,0,0]})};Mesh.cube=function(g,f){g=g||{};var a=0.5*(g.size||1),b={};b.vertices=new Float32Array([-1,1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,1,1,1,-1,1,1,1,1,-1,1,1,1,-1,1,-1,1,1,-1,-1,-1,1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,-1,-1,1,-1,-1,1,1,1,1,1,-1,-1,-1,1,-1,
		-1,1,-1,1,-1,-1,-1,1,-1,1,-1,-1,1]);for(var c=0,d=b.vertices.length;c<d;++c)b.vertices[c]*=a;b.normals=new Float32Array([-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0]);b.coords=new Float32Array([0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,
		0,1,1,0,1,0,0,1,1,0,0,1,0]);g.wireframe&&(b.wireframe=new Uint16Array([0,2,2,5,5,4,4,0,6,7,7,10,10,11,11,6,0,6,2,7,5,10,4,11]));g.bounding=BBox.fromCenterHalfsize([0,0,0],[a,a,a]);return k.Mesh.load(b,g,f)};Mesh.box=function(g,f){g=g||{};var a=g.sizex||1,b=g.sizey||1,c=g.sizez||1,a=0.5*a,b=0.5*b,c=0.5*c,d={};d.vertices=new Float32Array([-1,1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,1,1,1,-1,1,1,1,1,-1,1,1,1,-1,1,-1,1,1,-1,-1,-1,1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,
		1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,-1,-1,1,-1,-1,1,1,1,1,1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,-1,1,-1,1,-1,-1,1]);for(var e=0,h=d.vertices.length;e<h;e+=3)d.vertices[e]*=a,d.vertices[e+1]*=b,d.vertices[e+2]*=c;d.normals=new Float32Array([-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0]);d.coords=new Float32Array([0,1,1,
		0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,1,0,0,1,0]);g.wireframe&&(d.wireframe=new Uint16Array([0,2,2,5,5,4,4,0,6,7,7,10,10,11,11,6,0,6,2,7,5,10,4,11]));g.bounding=BBox.fromCenterHalfsize([0,0,0],[a,b,c]);return k.Mesh.load(d,g,f)};Mesh.circle=function(g,f){g=g||{};var a=g.size||g.radius||1,b=Math.ceil(g.slices||24),c=g.xz||!1,d=g.empty||!1;3>b&&(b=3);var e=2*Math.PI/b,h=vec3.create(),m=vec3.create(),l=vec3.fromValues(0,
		0,1),n=vec2.fromValues(0.5,0.5),q=vec2.create();c&&l.set([0,1,0]);var t=c?2:1,p=new Float32Array(3*(b+1)),v=new Float32Array(3*(b+1)),u=new Float32Array(2*(b+1)),s=null;p.set(h,0);v.set(l,0);u.set(n,0);for(h=n=s=0;h<b;++h)s=Math.sin(e*h),n=Math.cos(e*h),m[0]=s*a,m[t]=n*a,q[0]=0.5*s+0.5,q[1]=0.5*n+0.5,p.set(m,3*h+3),v.set(l,3*h+3),u.set(q,2*h+2);if(d)p=p.subarray(3),v=p.subarray(3),u=p.subarray(2),s=null;else{s=new Uint16Array(3*b);d=2;e=1;c&&(d=1,e=2);for(h=0;h<b-1;++h)s[3*h]=0,s[3*h+1]=h+d,s[3*h+
	2]=h+e;s[3*h]=0;c?(s[3*h+1]=h+1,s[3*h+2]=1):(s[3*h+1]=1,s[3*h+2]=h+1)}g.bounding=BBox.fromCenterHalfsize([0,0,0],c?[a,0,a]:[a,a,0]);a={vertices:p,normals:v,coords:u,triangles:s};if(g.wireframe){c=new Uint16Array(2*b);for(h=0;h<b;h++)c[2*h]=h,c[2*h+1]=h+1;c[0]=b;a.wireframe=c}return k.Mesh.load(a,g,f)};Mesh.cylinder=function(g,f){g=g||{};for(var a=g.radius||g.size||1,b=g.height||g.size||2,c=g.subdivisions||64,d=new Float32Array(36*c),e=new Float32Array(36*c),h=new Float32Array(24*c),m=2*Math.PI/c,
																																																																																							   l=null,n=0;n<c;++n){var k=n*m,l=[Math.sin(k),0,Math.cos(k)];d.set([l[0]*a,0.5*b,l[2]*a],18*n);e.set(l,18*n);h.set([n/c,1],12*n);l=[Math.sin(k),0,Math.cos(k)];d.set([l[0]*a,-0.5*b,l[2]*a],18*n+3);e.set(l,18*n+3);h.set([n/c,0],12*n+2);l=[Math.sin(k+m),0,Math.cos(k+m)];d.set([l[0]*a,-0.5*b,l[2]*a],18*n+6);e.set(l,18*n+6);h.set([(n+1)/c,0],12*n+4);l=[Math.sin(k+m),0,Math.cos(k+m)];d.set([l[0]*a,0.5*b,l[2]*a],18*n+9);e.set(l,18*n+9);h.set([(n+1)/c,1],12*n+6);l=[Math.sin(k),0,Math.cos(k)];d.set([l[0]*a,
		0.5*b,l[2]*a],18*n+12);e.set(l,18*n+12);h.set([n/c,1],12*n+8);l=[Math.sin(k+m),0,Math.cos(k+m)];d.set([l[0]*a,-0.5*b,l[2]*a],18*n+15);e.set(l,18*n+15);h.set([(n+1)/c,0],12*n+10)}var l=18*n,t=12*n;if(!1===g.caps)d=d.subarray(0,l),e=e.subarray(0,l),h=h.subarray(0,t);else for(var p=vec3.fromValues(0,0.5*b,0),v=vec3.fromValues(0,-0.5*b,0),u=vec3.fromValues(0,1,0),s=vec3.fromValues(0,-1,0),n=0;n<c;++n){var k=n*m,w=vec3.fromValues(Math.sin(k),0,Math.cos(k)),k=vec3.fromValues(Math.sin(k+m),0,Math.cos(k+
		m));d.set([w[0]*a,0.5*b,w[2]*a],l+18*n);e.set(u,l+18*n);h.set([0.5*-w[0]+0.5,0.5*w[2]+0.5],t+12*n);d.set([k[0]*a,0.5*b,k[2]*a],l+18*n+3);e.set(u,l+18*n+3);h.set([0.5*-k[0]+0.5,0.5*k[2]+0.5],t+12*n+2);d.set(p,l+18*n+6);e.set(u,l+18*n+6);h.set([0.5,0.5],t+12*n+4);d.set([k[0]*a,-0.5*b,k[2]*a],l+18*n+9);e.set(s,l+18*n+9);h.set([0.5*k[0]+0.5,0.5*k[2]+0.5],t+12*n+6);d.set([w[0]*a,-0.5*b,w[2]*a],l+18*n+12);e.set(s,l+18*n+12);h.set([0.5*w[0]+0.5,0.5*w[2]+0.5],t+12*n+8);d.set(v,l+18*n+15);e.set(s,l+18*n+15);
		h.set([0.5,0.5],t+12*n+10)}c={vertices:d,normals:e,coords:h};g.bounding=BBox.fromCenterHalfsize([0,0,0],[a,0.5*b,a]);return Mesh.load(c,g,f)};Mesh.sphere=function(g,f){g=g||{};for(var a=g.radius||g.size||1,b=g.lat||g.subdivisions||16,c=g["long"]||g.subdivisions||16,d=new Float32Array((b+1)*(c+1)*3),e=new Float32Array((b+1)*(c+1)*3),h=new Float32Array((b+1)*(c+1)*2),m=new Uint16Array(b*c*6),l=g.hemi?0.5*Math.PI:Math.PI,n=0,q=0,t=0;t<=b;t++)for(var p=t*l/b,v=Math.sin(p),u=Math.cos(p),p=0;p<=c;p++){var s=
		2*p*Math.PI/c,w=Math.sin(s),s=Math.cos(s)*v,y=u,w=w*v,F=1-p/c,x=1-t/b;d.set([a*s,a*y,a*w],n);e.set([s,y,w],n);h.set([F,x],q);n+=3;q+=2}for(t=n=0;t<b;t++)for(p=0;p<c;p++)l=t*(c+1)+p,q=l+c+1,m.set([q,l,l+1],n),m.set([q+1,q,l+1],n+3),n+=6;d={vertices:d,normals:e,coords:h,triangles:m};if(g.wireframe){e=new Uint16Array(c*b*4);for(n=h=0;n<b;n++){for(m=0;m<c;m++)e[h]=n*(c+1)+m,e[h+1]=n*(c+1)+m+1,h+=2;e[h-2*c]=n*(c+1)+m}for(n=0;n<c;n++)for(m=0;m<b;m++)e[h]=m*(c+1)+n,e[h+1]=(m+1)*(c+1)+n,h+=2;d.wireframe=
		e}g.bounding=g.hemi?BBox.fromCenterHalfsize([0,0.5*a,0],[a,0.5*a,a],a):BBox.fromCenterHalfsize([0,0,0],[a,a,a],a);return k.Mesh.load(d,g,f)};Mesh.grid=function(g,f){g=g||{};var a=g.lines||11;0>a&&(a=1);for(var b=g.size||10,c=new Float32Array(12*a),d=0.5*b,e=0,h=-d,b=b/(a-1),m=0;m<a;m++)c[e]=h,c[e+2]=-d,c[e+3]=h,c[e+5]=d,c[e+6]=d,c[e+8]=h,c[e+9]=-d,c[e+11]=h,h+=b,e+=12;return new k.Mesh({vertices:c},g,f)};Mesh.icosahedron=function(g,f){function a(a,c){var d=l[a]<l[c]?l[a]+":"+l[c]:l[c]+":"+l[a],f=
		u[d];if(f)return f;f=e.length/3;e.push(0.5*(e[3*l[a]]+e[3*l[c]]),0.5*(e[3*l[a]+1]+e[3*l[c]+1]),0.5*(e[3*l[a]+2]+e[3*l[c]+2]));var g=Math.sqrt(e[3*f]*e[3*f]+e[3*f+1]*e[3*f+1]+e[3*f+2]*e[3*f+2]),k=e[3*f]/g,n=e[3*f+1]/g,v=e[3*f+2]/g;h.push(k,n,v);m.push(Math.atan2(k,v)/Math.PI*0.5,Math.acos(n)/Math.PI);e[3*f]*=b/g;e[3*f+1]*=b/g;e[3*f+2]*=b/g;return u[d]=f}g=g||{};var b=g.radius||g.size||1,c=void 0===g.subdivisions?0:g.subdivisions;6<c&&(c=6);for(var d=(1+Math.sqrt(5))/2,e=[-1,d,0,1,d,0,-1,-d,0,1,-d,
		0,0,-1,d,0,1,d,0,-1,-d,0,1,-d,d,0,-1,d,0,1,-d,0,-1,-d,0,1],h=[],m=[],l=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],d=e.length,n=0;n<d;n+=3){var q=Math.sqrt(e[n]*e[n]+e[n+1]*e[n+1]+e[n+2]*e[n+2]),t=e[n]/q,p=e[n+1]/q,v=e[n+2]/q;h.push(t,p,v);m.push(Math.atan2(t,v),Math.acos(p));e[n]*=b/q;e[n+1]*=b/q;e[n+2]*=b/q}for(var u={},q=0;q<c;++q){t=[];d=l.length;for(n=0;n<d;n+=3){var p=a(n,n+1),v=a(n+1,n+2),s=a(n+2,n);t.push(l[n],
		p,s);t.push(l[n+1],v,p);t.push(l[n+2],s,v);t.push(p,v,s)}l=t}g.bounding=BBox.fromCenterHalfsize([0,0,0],[b,b,b],b);return new k.Mesh.load({vertices:e,coords:m,normals:h,triangles:l},g,f)};r.Texture=k.Texture=function f(a,b,c,d){c=c||{};this.gl=d=d||r.gl;this._context_id=d.context_id;a=parseInt(a);b=parseInt(b);k.debug&&console.log("GL.Texture created: ",a,b);this.handler=d.createTexture();this.width=a;this.height=b;this.texture_type=c.texture_type||d.TEXTURE_2D;this.format=c.format||f.DEFAULT_FORMAT;
		this.type=c.type||f.DEFAULT_TYPE;this.magFilter=c.magFilter||c.filter||f.DEFAULT_MAG_FILTER;this.minFilter=c.minFilter||c.filter||f.DEFAULT_MIN_FILTER;this.wrapS=c.wrap||c.wrapS||f.DEFAULT_WRAP_S;this.wrapT=c.wrap||c.wrapT||f.DEFAULT_WRAP_T;this.data=null;f.MAX_TEXTURE_IMAGE_UNITS||(f.MAX_TEXTURE_IMAGE_UNITS=d.getParameter(d.MAX_TEXTURE_IMAGE_UNITS));this.has_mipmaps=!1;if(this.format==d.DEPTH_COMPONENT&&!d.extensions.WEBGL_depth_texture)throw"Depth Texture not supported";if(this.type==d.FLOAT&&!d.extensions.OES_texture_float)throw"Float Texture not supported";
		if(this.type==d.HALF_FLOAT_OES&&!d.extensions.OES_texture_half_float)throw"Half Float Texture not supported";if(!(isPowerOfTwo(this.width)&&isPowerOfTwo(this.height)||(this.minFilter==d.NEAREST||this.minFilter==d.LINEAR)&&this.wrapS==d.CLAMP_TO_EDGE&&this.wrapT==d.CLAMP_TO_EDGE))if(c.ignore_pot)this.minFilter=this.magFilter=d.LINEAR,this.wrapS=this.wrapT=d.CLAMP_TO_EDGE;else throw"Cannot use texture-wrap or mipmaps in Non-Power-of-Two textures";if(a&&b){d.activeTexture(d.TEXTURE0+f.MAX_TEXTURE_IMAGE_UNITS-
			1);d.bindTexture(this.texture_type,this.handler);d.texParameteri(this.texture_type,d.TEXTURE_MAG_FILTER,this.magFilter);d.texParameteri(this.texture_type,d.TEXTURE_MIN_FILTER,this.minFilter);d.texParameteri(this.texture_type,d.TEXTURE_WRAP_S,this.wrapS);d.texParameteri(this.texture_type,d.TEXTURE_WRAP_T,this.wrapT);c.anisotropic&&d.extensions.EXT_texture_filter_anisotropic&&d.texParameterf(d.TEXTURE_2D,d.extensions.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,c.anisotropic);var e=c.pixel_data;
			e&&!e.buffer&&(this.data=e=new (this.type==d.FLOAT?Float32Array:Uint8Array)(e));this.texture_type==d.TEXTURE_2D?(d.texImage2D(d.TEXTURE_2D,0,this.format,a,b,0,this.format,this.type,e||null),k.isPowerOfTwo(a)&&k.isPowerOfTwo(b)&&c.minFilter&&c.minFilter!=d.NEAREST&&c.minFilter!=d.LINEAR&&(d.generateMipmap(this.texture_type),this.has_mipmaps=!0)):this.texture_type==d.TEXTURE_CUBE_MAP&&(d.texImage2D(d.TEXTURE_CUBE_MAP_POSITIVE_X,0,this.format,this.width,this.height,0,this.format,this.type,e||null),d.texImage2D(d.TEXTURE_CUBE_MAP_POSITIVE_Y,
				0,this.format,this.width,this.height,0,this.format,this.type,e||null),d.texImage2D(d.TEXTURE_CUBE_MAP_POSITIVE_Z,0,this.format,this.width,this.height,0,this.format,this.type,e||null),d.texImage2D(d.TEXTURE_CUBE_MAP_NEGATIVE_X,0,this.format,this.width,this.height,0,this.format,this.type,e||null),d.texImage2D(d.TEXTURE_CUBE_MAP_NEGATIVE_Y,0,this.format,this.width,this.height,0,this.format,this.type,e||null),d.texImage2D(d.TEXTURE_CUBE_MAP_NEGATIVE_Z,0,this.format,this.width,this.height,0,this.format,
				this.type,e||null));d.bindTexture(this.texture_type,null);d.activeTexture(d.TEXTURE0)}};Texture.DEFAULT_TYPE=k.UNSIGNED_BYTE;Texture.DEFAULT_FORMAT=k.RGBA;Texture.DEFAULT_MAG_FILTER=k.LINEAR;Texture.DEFAULT_MIN_FILTER=k.LINEAR;Texture.DEFAULT_WRAP_S=k.CLAMP_TO_EDGE;Texture.DEFAULT_WRAP_T=k.CLAMP_TO_EDGE;Texture.framebuffer=null;Texture.renderbuffer=null;Texture.loading_color=new Uint8Array([0,0,0,0]);Texture.use_renderbuffer_pool=!0;Texture.prototype.delete=function(){gl.deleteBuffer(this.handler);
		this.handler=null};Texture.prototype.getProperties=function(){return{width:this.width,height:this.height,type:this.type,format:this.format,texture_type:this.texture_type,magFilter:this.magFilter,minFilter:this.minFilter,wrapS:this.wrapS,wrapT:this.wrapT}};Texture.prototype.toJSON=function(){return""};Texture.isDepthSupported=function(){return null!=gl.extensions.WEBGL_depth_texture};Texture.prototype.bind=function(f){void 0==f&&(f=0);var a=this.gl;a.activeTexture(a.TEXTURE0+f);a.bindTexture(this.texture_type,
		this.handler);return f};Texture.prototype.unbind=function(f){void 0===f&&(f=0);var a=this.gl;a.activeTexture(a.TEXTURE0+f);a.bindTexture(this.texture_type,null)};Texture.prototype.setParameter=function(f,a){this.bind(0);this.gl.texParameteri(this.texture_type,f,a);switch(f){case this.gl.TEXTURE_MAG_FILTER:this.magFilter=a;break;case this.gl.TEXTURE_MIN_FILTER:this.minFilter=a;break;case this.gl.TEXTURE_WRAP_S:this.wrapS=a;break;case this.gl.TEXTURE_WRAP_T:this.wrapT=a}};Texture.setUploadOptions=function(f,
																																																																																																																																	 a){a=a||r.gl;f?(a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!!f.premultiply_alpha),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!f.no_flip)):(a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!0));a.pixelStorei(a.UNPACK_ALIGNMENT,1)};Texture.prototype.uploadImage=function(f,a){this.bind();var b=this.gl;Texture.setUploadOptions(a,b);try{b.texImage2D(b.TEXTURE_2D,0,this.format,this.format,this.type,f),this.width=f.videoWidth||f.width,this.height=f.videoHeight||f.height,
		this.data=f}catch(c){if("file:"==location.protocol)throw'image not loaded for security reasons (serve this page over "http://" instead)';throw"image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)";}this.minFilter&&this.minFilter!=b.NEAREST&&this.minFilter!=b.LINEAR&&(b.generateMipmap(this.texture_type),this.has_mipmaps=!0);b.bindTexture(this.texture_type,null)};Texture.prototype.uploadData=function(f,a){var b=this.gl;this.bind();
		Texture.setUploadOptions(a,b);b.texImage2D(this.texture_type,0,this.format,this.width,this.height,0,this.format,this.type,f);this.data=f;this.minFilter&&this.minFilter!=b.NEAREST&&this.minFilter!=b.LINEAR&&(b.generateMipmap(texture.texture_type),this.has_mipmaps=!0);b.bindTexture(this.texture_type,null)};Texture.cubemap_camera_parameters=[{type:"posX",dir:vec3.fromValues(1,0,0),up:vec3.fromValues(0,1,0),right:vec3.fromValues(0,0,-1)},{type:"negX",dir:vec3.fromValues(-1,0,0),up:vec3.fromValues(0,1,
			0),right:vec3.fromValues(0,0,1)},{type:"posY",dir:vec3.fromValues(0,1,0),up:vec3.fromValues(0,0,-1),right:vec3.fromValues(1,0,0)},{type:"negY",dir:vec3.fromValues(0,-1,0),up:vec3.fromValues(0,0,1),right:vec3.fromValues(1,0,0)},{type:"posZ",dir:vec3.fromValues(0,0,1),up:vec3.fromValues(0,1,0),right:vec3.fromValues(1,0,0)},{type:"negZ",dir:vec3.fromValues(0,0,-1),up:vec3.fromValues(0,1,0),right:vec3.fromValues(-1,0,0)}];Texture.prototype.drawTo=function(f,a){function b(){6E4<=k.getTime()-this.time?
		(console.log("Buffer cleared"),c.deleteRenderbuffer(c._renderbuffers_pool[n]),delete c._renderbuffers_pool[n]):setTimeout(b.bind(this),6E4)}var c=this.gl,d=c.getViewport(),e=k.getTime(),h=c.getParameter(c.FRAMEBUFFER_BINDING),m=c._framebuffer=c._framebuffer||c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,m);var l=null;if(Texture.use_renderbuffer_pool){c._renderbuffers_pool||(c._renderbuffers_pool={});var n=this.width+":"+this.height;c._renderbuffers_pool[n]?(l=c._renderbuffers_pool[n],l.time=
		e,c.bindRenderbuffer(c.RENDERBUFFER,l)):(c._renderbuffers_pool[n]=l=c.createRenderbuffer(),l.time=e,l.width=this.width,l.height=this.height,c.bindRenderbuffer(c.RENDERBUFFER,l),setTimeout(b.bind(l),6E4))}else l=c._renderbuffer=c._renderbuffer||c.createRenderbuffer(),l.width=this.width,l.height=this.height,c.bindRenderbuffer(c.RENDERBUFFER,l);this.format===c.DEPTH_COMPONENT?c.renderbufferStorage(c.RENDERBUFFER,c.RGBA4,this.width,this.height):c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_COMPONENT16,
		this.width,this.height);c.viewport(0,0,this.width,this.height);c._current_texture_drawto=this;c._current_fbo_color=m;c._current_fbo_depth=l;if(this.texture_type==c.TEXTURE_2D)this.format!==c.DEPTH_COMPONENT?(c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,this.handler,0),c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.RENDERBUFFER,l)):(c.framebufferRenderbuffer(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.RENDERBUFFER,l),c.framebufferTexture2D(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,
		c.TEXTURE_2D,this.handler,0)),f(this,a);else if(this.texture_type==c.TEXTURE_CUBE_MAP)for(this.format!==c.DEPTH_COMPONENT?c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.RENDERBUFFER,l):c.framebufferRenderbuffer(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.RENDERBUFFER,l),e=0;6>e;e++)this.format!==c.DEPTH_COMPONENT?c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_CUBE_MAP_POSITIVE_X+e,this.handler,0):c.framebufferTexture2D(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.TEXTURE_CUBE_MAP_POSITIVE_X+
		e,this.handler,0),f(this,e,a);this.data=null;c._current_texture_drawto=null;c._current_fbo_color=null;c._current_fbo_depth=null;c.bindFramebuffer(c.FRAMEBUFFER,h);c.bindRenderbuffer(c.RENDERBUFFER,null);c.viewport(d[0],d[1],d[2],d[3]);return this};Texture.drawTo=function(f,a,b){var c=-1,d=-1,e=null;if(!f&&!b)throw"Textures missing in drawTo";if(f&&f.length)for(var h=0;h<f.length;h++){var m=f[h];if(-1==c)c=m.width;else if(c!=m.width)throw"Cannot use Texture.drawTo if textures have different dimensions";
		if(-1==d)d=m.height;else if(d!=m.height)throw"Cannot use Texture.drawTo if textures have different dimensions";if(null==e)e=m.type;else if(e!=m.type)throw"Cannot use Texture.drawTo if textures have different data type, all must have the same type";}else c=b.width,d=b.height;var l=gl.extensions.WEBGL_draw_buffers;if(!l&&f&&1<f.length)throw"Rendering to several textures not supported";e=gl.getViewport();gl._framebuffer=gl._framebuffer||gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,gl._framebuffer);
		gl.viewport(0,0,c,d);h=null;if(b&&b.format!==gl.DEPTH_COMPONENT||b.type!=gl.UNSIGNED_INT)throw"Depth texture must be of format: gl.DEPTH_COMPONENT and type: gl.UNSIGNED_INT";b?gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,b.handler,0):(h=gl._renderbuffer=gl._renderbuffer||gl.createRenderbuffer(),h.width=c,h.height=d,gl.bindRenderbuffer(gl.RENDERBUFFER,h),gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,c,d),gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,
			gl.RENDERBUFFER,h));if(f){c=[];for(h=0;h<f.length;h++)m=f[h],gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0+h,gl.TEXTURE_2D,m.handler,0),c.push(gl.COLOR_ATTACHMENT0+h);1<f.length&&l.drawBuffersWEBGL(c)}else b=this._color_renderbuffer=this._color_renderbuffer||gl.createRenderbuffer(),b.width=c,b.height=d,gl.bindRenderbuffer(gl.RENDERBUFFER,b),gl.renderbufferStorage(gl.RENDERBUFFER,gl.RGBA4,c,d),gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.RENDERBUFFER,b);c=gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if(c!==gl.FRAMEBUFFER_COMPLETE)throw"FBO not complete: "+c;a();if(f.length)for(h=0;h<f.length;++h)f[h].data=null;gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(e[0],e[1],e[2],e[3])};Texture.drawToColorAndDepth=function(f,a,b){var c=f.gl;if(a.width!=f.width||a.height!=f.height)throw"Different size between color texture and depth texture";var d=c.getViewport();c._framebuffer=c._framebuffer||c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,c._framebuffer);c.viewport(0,0,f.width,f.height);c.framebufferTexture2D(c.FRAMEBUFFER,
		c.COLOR_ATTACHMENT0,c.TEXTURE_2D,f.handler,0);c.framebufferTexture2D(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.TEXTURE_2D,a.handler,0);b();f.data=null;a.data=null;c.bindFramebuffer(c.FRAMEBUFFER,null);c.viewport(d[0],d[1],d[2],d[3])};Texture.prototype.copyTo=function(f,a,b){var c=this.gl,d=c.getParameter(c.FRAMEBUFFER_BINDING),e=c.getViewport();a||(a=this.texture_type==c.TEXTURE_2D?k.Shader.getScreenShader():k.Shader.getCubemapCopyShader());c.disable(c.BLEND);c.disable(c.DEPTH_TEST);a&&b&&a.uniforms(b);
		b=c.__copy_fbo;b||(b=c.__copy_fbo=c.createFramebuffer());c.bindFramebuffer(c.FRAMEBUFFER,b);c.viewport(0,0,f.width,f.height);if(this.texture_type==c.TEXTURE_2D)c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,f.handler,0),this.toViewport(a);else if(this.texture_type==c.TEXTURE_CUBE_MAP){a.uniforms({u_texture:0});b=k.temp_mat3;for(var h=0;6>h;h++){c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_CUBE_MAP_POSITIVE_X+h,f.handler,0);var m=k.Texture.cubemap_camera_parameters[h];
			mat3.identity(b);b.set(m.right,0);b.set(m.up,3);b.set(m.dir,6);this.toViewport(a,{u_rotation:b})}}c.setViewport(e);c.bindFramebuffer(c.FRAMEBUFFER,d);f.minFilter&&f.minFilter!=c.NEAREST&&f.minFilter!=c.LINEAR&&(f.bind(),c.generateMipmap(f.texture_type),f.has_mipmaps=!0);f.data=null;c.bindTexture(f.texture_type,null);return this};Texture.prototype.toViewport=function(f,a){f=f||Shader.getScreenShader();var b=Mesh.getScreenQuad();this.bind(0);a&&f.uniforms(a);f.draw(b,gl.TRIANGLES)};Texture.prototype.fill=
		function(f){var a=gl.getParameter(gl.COLOR_CLEAR_VALUE);gl.clearColor(f[0],f[1],f[2],f[3]);this.drawTo(function(){gl.clear(gl.COLOR_BUFFER_BIT)});gl.clearColor(a[0],a[1],a[2],a[3])};Texture.prototype.renderQuad=function(){var f=mat3.create(),a=vec2.create(),b=vec2.create(),c=vec4.fromValues(1,1,1,1);return function(d,e,h,m,l,k){a[0]=d;a[1]=e;b[0]=h;b[1]=m;l=l||Shader.getQuadShader(this.gl);d=Mesh.getScreenQuad(this.gl);this.bind(0);l.uniforms({u_texture:0,u_position:a,u_color:c,u_size:b,u_viewport:gl.viewport_data.subarray(2,
			4),u_transform:f});k&&l.uniforms(k);l.draw(d,gl.TRIANGLES)}}();Texture.prototype.applyBlur=function(f,a,b,c,d){var e=this.gl;void 0===f&&(f=1);void 0===a&&(a=1);f/=this.width;a/=this.height;e.disable(e.DEPTH_TEST);e.disable(e.BLEND);if(this===d&&this.texture_type===e.TEXTURE_CUBE_MAP)throw"cannot use applyBlur in a texture with itself when blurring a CUBE_MAP";if(d&&this.texture_type!==d.texture_type)throw"cannot use applyBlur with textures of different texture_type";var h=null,m=e.getParameter(e.FRAMEBUFFER_BINDING),
		l=e.getViewport(),n=e.__copy_fbo;n||(n=e.__copy_fbo=e.createFramebuffer());e.bindFramebuffer(e.FRAMEBUFFER,n);e.viewport(0,0,this.width,this.height);if(this.texture_type===e.TEXTURE_2D)h=k.Shader.getBlurShader(),c||(c=new k.Texture(this.width,this.height,this.getProperties())),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c.handler,0),this.toViewport(h,{u_texture:0,u_intensity:b,u_offset:[0,a]}),d=d||this,e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,
		d.handler,0),c.toViewport(h,{u_intensity:b,u_offset:[f,0]}),h=c;else if(this.texture_type===e.TEXTURE_CUBE_MAP){h=k.Shader.getCubemapBlurShader();h.uniforms({u_texture:0,u_intensity:b,u_offset:[f,a]});this.bind(0);f=Mesh.getScreenQuad();f.bindBuffers(h);h.bind();d||(d=new k.Texture(this.width,this.height,this.getProperties()));a=k.temp_mat3;for(b=0;6>b;++b)e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+b,d.handler,0),c=k.Texture.cubemap_camera_parameters[b],
		mat3.identity(a),a.set(c.right,0),a.set(c.up,3),a.set(c.dir,6),h._setUniform("u_rotation",a),e.drawArrays(e.TRIANGLES,0,6);f.unbindBuffers(h);h=d}e.setViewport(l);e.bindFramebuffer(e.FRAMEBUFFER,m);d.data=null;d.minFilter&&d.minFilter!=e.NEAREST&&d.minFilter!=e.LINEAR&&(d.bind(),e.generateMipmap(d.texture_type),d.has_mipmaps=!0);e.bindTexture(d.texture_type,null);return h};Texture.fromURL=function(f,a,b,c){c=c||r.gl;a=a||{};a=Object.create(a);var d=a.texture||new k.Texture(1,1,a,c);64>f.length&&(d.url=
		f);d.bind();var e=a.temp_color||Texture.loading_color;c.pixelStorei(c.UNPACK_ALIGNMENT,4);e=a.type==c.FLOAT?new Float32Array(e):new Uint8Array(e);c.texImage2D(c.TEXTURE_2D,0,d.format,d.width,d.height,0,d.format,d.type,e);c.bindTexture(d.texture_type,null);d.ready=!1;if(-1!=f.toLowerCase().indexOf(".dds")){var e=c.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")||c.getExtension("WEBGL_compressed_texture_s3tc"),h=new k.Texture(0,0,a,c);O.loadDDSTextureEx(c,e,f,h.handler,!0,function(a){d.texture_type=
		a.texture_type;d.handler=a;delete d.ready;b&&b(d,f)})}else c=new Image,c.src=f,c.onload=function(){a.texture=d;k.Texture.fromImage(this,a);delete d.ready;b&&b(d,f)},c.onerror=function(){b&&b(null)};return d};Texture.fromImage=function(f,a){a=a||{};var b=a.texture||new k.Texture(f.width,f.height,a);b.uploadImage(f,a);b.bind();gl.texParameteri(b.texture_type,gl.TEXTURE_MAG_FILTER,b.magFilter);gl.texParameteri(b.texture_type,gl.TEXTURE_MIN_FILTER,b.minFilter);gl.texParameteri(b.texture_type,gl.TEXTURE_WRAP_S,
		b.wrapS);gl.texParameteri(b.texture_type,gl.TEXTURE_WRAP_T,b.wrapT);k.isPowerOfTwo(b.width)&&k.isPowerOfTwo(b.height)&&a.minFilter&&a.minFilter!=gl.NEAREST&&a.minFilter!=gl.LINEAR&&(b.bind(),gl.generateMipmap(b.texture_type),b.has_mipmaps=!0);gl.bindTexture(b.texture_type,null);b.data=f;a.keep_image&&(b.img=f);return b};Texture.fromVideo=function(f,a){a=a||{};var b=a.texture||new k.Texture(f.videoWidth,f.videoHeight,a);b.bind();b.uploadImage(f,a);a.minFilter&&a.minFilter!=gl.NEAREST&&a.minFilter!=
	gl.LINEAR&&(b.bind(),gl.generateMipmap(b.texture_type),b.has_mipmaps=!0,b.data=f);gl.bindTexture(b.texture_type,null);return b};Texture.fromTexture=function(f,a){a=a||{};var b=new k.Texture(f.width,f.height,a);f.copyTo(b);return b};Texture.prototype.clone=function(f){var a=this.getProperties();if(f)for(var b in f)a[b]=f[b];return Texture.fromTexture(this,a)};Texture.fromMemory=function(f,a,b,c){c=c||{};var d=c.texture||new k.Texture(f,a,c);Texture.setUploadOptions(c);d.bind();try{gl.texImage2D(gl.TEXTURE_2D,
		0,d.format,f,a,0,d.format,d.type,b),d.data=b}catch(e){if("file:"==location.protocol)throw'image not loaded for security reasons (serve this page over "http://" instead)';throw"image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)";}c.minFilter&&c.minFilter!=gl.NEAREST&&c.minFilter!=gl.LINEAR&&(gl.generateMipmap(gl.TEXTURE_2D),d.has_mipmaps=!0);gl.bindTexture(d.texture_type,null);return d};Texture.fromDDSInMemory=function(f,
																																																																																																																															   a){a=a||{};var b=a.texture||new k.Texture(0,0,a);k.Texture.setUploadOptions(a);b.bind();var c=gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")||gl.getExtension("WEBGL_compressed_texture_s3tc");O.loadDDSTextureFromMemoryEx(gl,c,f,b,!0);gl.bindTexture(b.texture_type,null);return b};Texture.fromShader=function(f,a,b,c){c=c||{};f=new k.Texture(f,a,c);f.drawTo(function(){gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);var a=Mesh.getScreenQuad();b.draw(a)});return f};Texture.cubemapFromImages=
		function(f,a){a=a||{};if(6!=f.length)throw"missing images to create cubemap";var b=f[0].width,c=f[0].height;a.texture_type=gl.TEXTURE_CUBE_MAP;var d=null;a.texture?(d=a.texture,d.width=b,d.height=c):d=new k.Texture(b,c,a);Texture.setUploadOptions(a);d.bind();try{for(b=0;6>b;b++)gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+b,0,d.format,d.format,d.type,f[b]);d.data=f}catch(e){if("file:"==location.protocol)throw'image not loaded for security reasons (serve this page over "http://" instead)';throw"image not loaded for security reasons (image must originate from the same domain as this page or use Cross-Origin Resource Sharing)";
		}a.minFilter&&a.minFilter!=gl.NEAREST&&a.minFilter!=gl.LINEAR&&(gl.generateMipmap(gl.TEXTURE_CUBE_MAP),d.has_mipmaps=!0);d.unbind();return d};Texture.cubemapFromImage=function(f,a){a=a||{};if(f.width!=f.height/6&&0!=f.height%6&&!a.faces)return console.error("Cubemap image not valid, only 1x6 (vertical) or 6x3 (cross) formats. Check size:",f.width,f.height),null;var b=f.width,c=f.height;void 0!==a.is_cross?(a.faces=Texture.generateCubemapCrossFacesInfo(f.width,a.is_cross),b=c=f.width/4):a.faces?(b=
		a.width||a.faces[0].width,c=a.height||a.faces[0].height):c/=6;if(b!=c)return console.log("Texture not valid, width and height for every face must be square"),null;var d=b;a.no_flip=!0;for(var e=[],h=0;6>h;h++){var m=createCanvas(d,d),l=m.getContext("2d");a.faces?l.drawImage(f,a.faces[h].x,a.faces[h].y,a.faces[h].width||d,a.faces[h].height||d,0,0,d,d):l.drawImage(f,0,c*h,b,c,0,0,d,d);e.push(m)}b=Texture.cubemapFromImages(e,a);a.keep_image&&(b.img=f);return b};Texture.generateCubemapCrossFacesInfo=
		function(f,a){void 0===a&&(a=1);var b=f/4;return[{x:2*b,y:b,width:b,height:b},{x:0,y:b,width:b,height:b},{x:a*b,y:0,width:b,height:b},{x:a*b,y:2*b,width:b,height:b},{x:b,y:b,width:b,height:b},{x:3*b,y:b,width:b,height:b}]};Texture.cubemapFromURL=function(f,a,b){a=a||{};a.texture_type=gl.TEXTURE_CUBE_MAP;var c=a.texture||new k.Texture(1,1,a);a=Object.create(a);c.bind();Texture.setUploadOptions(a);for(var d=a.temp_color||[0,0,0,255],d=a.type==gl.FLOAT?new Float32Array(d):new Uint8Array(d),e=0;6>e;e++)gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X+
		e,0,c.format,1,1,0,c.format,c.type,d);gl.bindTexture(c.texture_type,null);c.ready=!1;d=new Image;d.src=f;d.onload=function(){a.texture=c;(c=k.Texture.cubemapFromImage(this,a))&&delete c.ready;b&&b(c)};return c};Texture.prototype.getPixels=function(f,a,b){a=this.gl;var c=a.getViewport(),d=a.getParameter(a.FRAMEBUFFER_BINDING);f=f||this.type;if(this.format==a.DEPTH_COMPONENT)throw"cannot use getPixels in depth textures";a.disable(a.DEPTH_TEST);var e=a.__copy_fbo;e||(e=a.__copy_fbo=a.createFramebuffer());
		a.bindFramebuffer(a.FRAMEBUFFER,e);e=null;a.viewport(0,0,this.width,this.height);this.texture_type==a.TEXTURE_2D?a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.handler,0):this.texture_type==a.TEXTURE_CUBE_MAP&&a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+(b||0),this.handler,0);b=this.format==a.RGB?3:4;b=4;e=f==a.UNSIGNED_BYTE?new Uint8Array(this.width*this.height*b):new Float32Array(this.width*this.height*b);a.readPixels(0,0,this.width,
			this.height,3==b?a.RGB:a.RGBA,f,e);a.bindFramebuffer(a.FRAMEBUFFER,d);a.viewport(c[0],c[1],c[2],c[3]);return e};Texture.prototype.toCanvas=function(f,a,b){b=b||8192;var c=this.gl,d=Math.min(this.width,b),e=Math.min(this.height,b);this.texture_type==c.TEXTURE_CUBE_MAP&&(d*=4,e*=3);f=f||createCanvas(d,e);f.width!=d&&(f.width=d);f.height!=e&&(f.height=e);var h=null;if(this.texture_type==c.TEXTURE_2D){this.width!=d||this.height!=e?(h=new k.Texture(d,e,{format:c.RGBA,filter:c.NEAREST}),this.copyTo(h),
		h=h.getPixels(c.UNSIGNED_BYTE,!0)):h=this.getPixels(c.UNSIGNED_BYTE,!0);b=f.getContext("2d");var m=b.getImageData(0,0,d,e);m.data.set(h);b.putImageData(m,0,0);a&&(h=createCanvas(d,e),a=h.getContext("2d"),a.translate(0,h.height),a.scale(1,-1),a.drawImage(f,0,0,h.width,h.height),b.drawImage(h,0,0))}else if(this.texture_type==c.TEXTURE_CUBE_MAP){d=createCanvas(this.width,this.height);a=d.getContext("2d");e=k.Texture.generateCubemapCrossFacesInfo(f.width,1);b=f.getContext("2d");b.fillStyle="black";b.fillRect(0,
		0,f.width,f.height);for(var l=0;6>l;l++)h=this.getPixels(c.UNSIGNED_BYTE,!0,l),m=a.getImageData(0,0,d.width,d.height),m.data.set(h),a.putImageData(m,0,0),b.drawImage(d,e[l].x,e[l].y,d.width,d.height)}return f};Texture.prototype.toBlob=function(f,a){for(var b=this.toCanvas(null,f).toDataURL(a),c=b.indexOf(","),b=b.substr(c+1),b=atob(b),c=b.length,d=new Uint8Array(c),e=0;e<c;++e)d[e]=b.charCodeAt(e);return new Blob([d],{type:a||"image/png"})};Texture.prototype.toBlobAsync=function(f,a,b){var c=this.toCanvas(null,
		f);c.toBlob?c.toBlob(b,a):(f=this.toBlob(f,a),b&&b(f))};Texture.prototype.toBase64=function(f){var a=this.width,b=this.height,c=this.getPixels(),d=createCanvas(a,b),e=d.getContext("2d"),h=e.getImageData(0,0,a,b);h.data.set(c);e.putImageData(h,0,0);f&&(f=createCanvas(a,b),a=f.getContext("2d"),a.translate(0,b),a.scale(1,-1),a.drawImage(d,0,0),d=f);return d.toDataURL("image/png")};Texture.prototype.generateMetadata=function(){var f={};f.width=this.width;f.height=this.height;this.metadata=f};Texture.compareFormats=
		function(f,a){return f&&a?f==a?!0:f.width!=a.width||f.height!=a.height||f.type!=a.type||f.format!=a.format||f.texture_type!=a.texture_type?!1:!0:!1};Texture.blend=function(f,a,b,c){if(!f||!a)return!1;if(f==a)return c?f.copyTo(c):f.toViewport(),!0;gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);var d=k.Shader.getBlendShader(),e=k.Mesh.getScreenQuad();a.bind(1);d.uniforms({u_texture:0,u_texture2:1,u_factor:b});if(c)return c.drawTo(function(){if(f==c||a==c)throw"Blend output cannot be the same as the input";
		f.bind(0);d.draw(e,gl.TRIANGLES)}),!0;f.bind(0);d.draw(e,gl.TRIANGLES);return!0};Texture.getWhiteTexture=function(f){f=f||r.gl;var a=f.textures[":white"];if(a)return a;a=new Uint8Array([255,255,255,255]);return f.textures[":white"]=new k.Texture(1,1,{pixel_data:a})};Texture.getBlackTexture=function(f){f=f||r.gl;var a=f.textures[":black"];if(a)return a;a=new Uint8Array([0,0,0,255]);return f.textures[":black"]=new k.Texture(1,1,{pixel_data:a})};Texture.getTemporary=function(f,a,b){Texture.temporary_pool||
	(Texture.temporary_pool=[]);var c=Texture.temporary_pool,d=k.TEXTURE_2D,e=Texture.DEFAULT_TYPE,h=Texture.DEFAULT_FORMAT;b&&(b.texture_type&&(d=b.texture_type),b.type&&(e=b.type),b.format&&(h=b.format));for(b=0;b<c.length;++b){var m=c[b];if(m.width==f&&m.height==a&&m.type==e&&m.texture_type==d&&m.format==h)return c.splice(b,1),m}return m=new k.Texture(f,a,{type:e,texture_type:d,format:h})};Texture.releaseTemporary=function(f){Texture.temporary_pool||(Texture.temporary_pool=[]);Texture.temporary_pool.push(f)};
	Texture.nextPOT=function(f){return Math.pow(2,Math.ceil(Math.log(f)/Math.log(2)))};k.FBO=G;G.prototype.setTextures=function(f,a,b){if(a&&(a.format!==gl.DEPTH_COMPONENT||a.type!=gl.UNSIGNED_INT))throw"FBO Depth texture must be of format: gl.DEPTH_COMPONENT and type: gl.UNSIGNED_INT";var c=this.depth_texture==a;if(c&&f)if(f.length==this.color_textures.length)for(var d=0;d<f.length;++d){if(f[d]!=this.color_textures[d]){c=!1;break}}else c=!1;this._stencil_enabled!==this.stencil&&(c=!1);if(!c){this.color_textures.length=
		f?f.length:0;if(f)for(d=0;d<f.length;++d)this.color_textures[d]=f[d];this.depth_texture=a;this.update(b)}};G.prototype.update=function(f){this._old_fbo=gl.getParameter(gl.FRAMEBUFFER_BINDING);this.handler||(this.handler=gl.createFramebuffer());var a=-1,b=-1,c=null,d=this.color_textures,e=this.depth_texture;if(d&&d.length)for(var h=0;h<d.length;h++){var m=d[h];if(-1==a)a=m.width;else if(a!=m.width)throw"Cannot bind textures with different dimensions";if(-1==b)b=m.height;else if(b!=m.height)throw"Cannot bind textures with different dimensions";
		if(null==c)c=m.type;else if(c!=m.type)throw"Cannot bind textures to a FBO with different pixel formats";if(m.texture_type!=gl.TEXTURE_2D)throw"Cannot bind a Cubemap to a FBO";}else a=e.width,b=e.height;this.width=a;this.height=b;gl.bindFramebuffer(gl.FRAMEBUFFER,this.handler);if(e&&!gl.extensions.WEBGL_depth_texture)throw"Rendering to depth texture not supported by your browser";c=gl.extensions.WEBGL_draw_buffers;if(!c&&d&&1<d.length)throw"Rendering to several textures not supported by your browser";
		e?gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,e.handler,0):(h=this._renderbuffer=this._renderbuffer||gl.createRenderbuffer(),h.width=a,h.height=b,gl.bindRenderbuffer(gl.RENDERBUFFER,h),gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,a,b),gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,h));if(d&&d.length)for(this.order=[],h=0;h<d.length;h++)m=d[h],gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0+h,gl.TEXTURE_2D,m.handler,
			0),this.order.push(gl.COLOR_ATTACHMENT0+h);else h=this._renderbuffer=this._renderbuffer||gl.createRenderbuffer(),h.width=a,h.height=b,gl.bindRenderbuffer(gl.RENDERBUFFER,h),gl.renderbufferStorage(gl.RENDERBUFFER,gl.RGBA4,a,b),gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.RENDERBUFFER,h);for(h=e=d?d.length:0;h<this._num_binded_textures;++h)gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0+h,gl.TEXTURE_2D,null,0);this._num_binded_textures=e;this.stencil?(h=this._stencil_buffer=
			this._stencil_buffer||gl.createRenderbuffer(),gl.bindRenderbuffer(gl.RENDERBUFFER,h),gl.renderbufferStorage(gl.RENDERBUFFER,gl.STENCIL_INDEX8,a,b),gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.STENCIL_ATTACHMENT,gl.RENDERBUFFER,h),this._stencil_enabled=!0):this._stencil_enabled=!1;d&&1<d.length&&c.drawBuffersWEBGL(this.order);a=gl.checkFramebufferStatus(gl.FRAMEBUFFER);if(a!==gl.FRAMEBUFFER_COMPLETE)throw"FBO not complete: "+a;gl.bindTexture(gl.TEXTURE_2D,null);gl.bindRenderbuffer(gl.RENDERBUFFER,
			null);f||gl.bindFramebuffer(gl.FRAMEBUFFER,this._old_fbo)};G.prototype.bind=function(f){if(!this.color_textures.length&&!this.depth_texture)throw"FBO: no textures attached to FBO";this._old_viewport.set(gl.viewport_data);this._old_fbo=f?gl.getParameter(gl.FRAMEBUFFER_BINDING):null;this._old_fbo!=this.handler&&gl.bindFramebuffer(gl.FRAMEBUFFER,this.handler);gl.viewport(0,0,this.width,this.height)};G.prototype.unbind=function(){gl.bindFramebuffer(gl.FRAMEBUFFER,this._old_fbo);this._old_fbo=null;gl.setViewport(this._old_viewport)};
	r.Shader=k.Shader=function a(b,c,d){k.debug&&console.log("GL.Shader created");this._context_id=r.gl.context_id;var e=this.gl=r.gl;d=a.expandMacros(d);this.program=e.createProgram();b=b.constructor===String?k.Shader.compileSource(e.VERTEX_SHADER,d+b):b;c=c.constructor===String?k.Shader.compileSource(e.FRAGMENT_SHADER,d+c):c;e.attachShader(this.program,b,e);e.attachShader(this.program,c,e);e.linkProgram(this.program);if(!e.getProgramParameter(this.program,e.LINK_STATUS))throw"link error: "+e.getProgramInfoLog(this.program);
		this.vs_shader=b;this.fs_shader=c;this.attributes={};this.uniformInfo={};this.samplers={};this.extractShaderInfo()};Shader.expandMacros=function(a){var b="";if(a)for(var c in a)b+="#define "+c+" "+(a[c]?a[c]:"")+"\n";return b};Shader.compileSource=function(a,b,c,d){c=c||r.gl;d=d||c.createShader(a);c.shaderSource(d,b);c.compileShader(d);if(!c.getShaderParameter(d,c.COMPILE_STATUS))throw(a==c.VERTEX_SHADER?"Vertex":"Fragment")+" shader compile error: "+c.getShaderInfoLog(d);return d};Shader.prototype.updateShader=
		function(a,b,c){var d=this.gl||r.gl;c=Shader.expandMacros(c);this.program&&(this.program=d.createProgram());a=a.constructor===String?k.Shader.compileSource(d.VERTEX_SHADER,c+a,d,this.vs_shader):a;b=b.constructor===String?k.Shader.compileSource(d.FRAGMENT_SHADER,c+b,d,this.fs_shader):b;d.attachShader(this.program,a,d);d.attachShader(this.program,b,d);d.linkProgram(this.program);if(!d.getProgramParameter(this.program,d.LINK_STATUS))throw"link error: "+d.getProgramInfoLog(this.program);this.vs_shader=
			a;this.fs_shader=b;this.attributes={};this.uniformInfo={};this.samplers={};this.extractShaderInfo()};Shader.prototype.extractShaderInfo=function(){for(var a=this.gl,b=a.getProgramParameter(this.program,a.ACTIVE_UNIFORMS),c=0;c<b;++c){var d=a.getActiveUniform(this.program,c);if(!d)break;var e=d.name,h=e.indexOf("[");-1!=h&&-1==e.indexOf("].")&&(e=e.substr(0,h));if(d.type==a.SAMPLER_2D||d.type==a.SAMPLER_CUBE)this.samplers[e]=d.type;var h=Shader.getUniformFunc(d),m=!1;if(d.type==a.FLOAT_MAT2||d.type==
		a.FLOAT_MAT3||d.type==a.FLOAT_MAT4)m=!0;this.uniformInfo[e]={type:d.type,func:h,size:d.size,is_matrix:m,loc:a.getUniformLocation(this.program,e)}}c=0;for(b=a.getProgramParameter(this.program,a.ACTIVE_ATTRIBUTES);c<b;++c){d=a.getActiveAttrib(this.program,c);if(!d)break;h=Shader.getUniformFunc(d);this.uniformInfo[d.name]={type:d.type,func:h,size:d.size,loc:null};this.attributes[d.name]=a.getAttribLocation(this.program,d.name)}};Shader.prototype.hasUniform=function(a){return this.uniformInfo[a]};Shader.prototype.hasAttribute=
		function(a){return this.attributes[a]};Shader.getUniformFunc=function(a){var b=null;switch(a.type){case gl.FLOAT:b=1==a.size?gl.uniform1f:gl.uniform1fv;break;case gl.FLOAT_MAT2:b=gl.uniformMatrix2fv;break;case gl.FLOAT_MAT3:b=gl.uniformMatrix3fv;break;case gl.FLOAT_MAT4:b=gl.uniformMatrix4fv;break;case gl.FLOAT_VEC2:b=gl.uniform2fv;break;case gl.FLOAT_VEC3:b=gl.uniform3fv;break;case gl.FLOAT_VEC4:b=gl.uniform4fv;break;case gl.UNSIGNED_INT:case gl.INT:b=1==a.size?gl.uniform1i:gl.uniform1iv;break;case gl.INT_VEC2:b=
		gl.uniform2iv;break;case gl.INT_VEC3:b=gl.uniform3iv;break;case gl.INT_VEC4:b=gl.uniform4iv;break;case gl.SAMPLER_2D:case gl.SAMPLER_CUBE:b=gl.uniform1i;break;default:b=gl.uniform1f}return b};Shader.fromURL=function(a,b,c){function d(){var a=new k.Shader(h,m),b;for(b in a)e[b]=a[b];e.ready=!0}var e=new k.Shader("\n\t\t\tprecision highp float;\n\t\t\tattribute vec3 a_vertex;\n\t\t\tattribute mat4 u_mvp;\n\t\t\tvoid main() { \n\t\t\t\tgl_Position = u_mvp * vec4(a_vertex,1.0); \n\t\t\t}\n\t\t","\n\t\t\tprecision highp float;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n\t\t\t}\n\t\t\t");
		e.ready=!1;var h=null,m=null;HttpRequest(a,null,function(a){h=a;m&&d()});HttpRequest(b,null,function(a){m=a;h&&d()});return e};Shader.prototype.bind=function(){var a=this.gl;a.useProgram(this.program);a._current_shader=this};Shader.prototype.getLocation=function(a){return this.uniformInfo[a]?this.uniformInfo[a].loc:null};Shader._temp_uniform=new Float32Array(16);Shader.prototype.uniforms=function(a){var b=this.gl;b.useProgram(this.program);b._current_shader=this;for(var c in a)this.uniformInfo[c]&&
	this._setUniform(c,a[c]);return this};Shader.prototype.uniformsArray=function(a){var b=this.gl;b.useProgram(this.program);b._current_shader=this;for(var b=0,c=a.length;b<c;++b){var d=a[b],e;for(e in d)this._setUniform(e,d[e])}return this};Shader.prototype.setUniform=function(a,b){this.gl._current_shader!=this&&this.bind();var c=this.uniformInfo[a];c&&null!==c.loc&&null!=b&&(b.constructor===Array&&(b=new Float32Array(b)),c.is_matrix?c.func.call(this.gl,c.loc,!1,b):c.func.call(this.gl,c.loc,b))};Shader.prototype._setUniform=
		function(a,b){var c=this.uniformInfo[a];c&&null!==c.loc&&null!=b&&(b.constructor===Array&&(b=new Float32Array(b)),c.is_matrix?c.func.call(this.gl,c.loc,!1,b):c.func.call(this.gl,c.loc,b))};Shader.prototype.draw=function(a,b,c){c=void 0===c?b==gl.LINES?"lines":"triangles":c;this.drawBuffers(a.vertexBuffers,c?a.indexBuffers[c]:null,2>arguments.length?gl.TRIANGLES:b)};Shader.prototype.drawRange=function(a,b,c,d,e){e=void 0===e?b==gl.LINES?"lines":"triangles":e;this.drawBuffers(a.vertexBuffers,e?a.indexBuffers[e]:
		null,b,c,d)};var M=new Uint8Array(16),T=new Uint8Array(16);Shader.prototype.drawBuffers=function(a,b,c,d,e){if(0!=e){var h=this.gl;h.useProgram(this.program);var m=0;M.set(T);for(var l in a){var k=a[l],q=k.attribute||l,t=this.attributes[q];null!=t&&k.buffer&&(M[t]=1,h.bindBuffer(h.ARRAY_BUFFER,k.buffer),h.enableVertexAttribArray(t),h.vertexAttribPointer(t,k.buffer.spacing,k.buffer.gl_type,!1,0,0),m=k.buffer.length/k.buffer.spacing)}a=0;0<d&&(a=d*(b&&b.data?b.data.constructor.BYTES_PER_ELEMENT:1));
		0<e?m=e:b&&(m=b.buffer.length-a);for(q in this.attributes)t=this.attributes[q],M[t]||h.disableVertexAttribArray(this.attributes[q]);!m||b&&!b.buffer||(b?(h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,b.buffer),h.drawElements(c,m,b.buffer.gl_type,a),h.bindBuffer(h.ELEMENT_ARRAY_BUFFER,null)):h.drawArrays(c,a,m));return this}};Shader.expandImports=function(a,b){b=b||Shader.files;var c={};if(!b)throw"Shader.files not initialized, assign files there";return a.replace(/#import\s+\"([a-zA-Z0-9_\.]+)\"\s*\n/g,function(a){a=
		a.split('"')[1];if(c[a])return"//already imported: "+a+"\n";var e=b[a];c[a]=!0;return e?e+"\n":"//import code not found: "+a+"\n"})};Shader.dumpErrorToConsole=function(a,b,c){console.error(a);var d=null,d=-1!=a.indexOf("Fragment")?c:b;a=d.split("\n");for(var e in a)a[e]=e+"| "+a[e];console.groupCollapsed("Shader code");console.log(a.join("\n"));console.groupEnd()};Shader.validateValue=function(a,b){if(null===a||void 0===a)return!1;switch(b.type){case k.INT:case k.FLOAT:case k.SAMPLER_2D:case k.SAMPLER_CUBE:return isNumber(a);
		case k.INT_VEC2:case k.FLOAT_VEC2:return 2===a.length;case k.INT_VEC3:case k.FLOAT_VEC3:return 3===a.length;case k.INT_VEC4:case k.FLOAT_VEC4:case k.FLOAT_MAT2:return 4===a.length;case k.FLOAT_MAT3:return 8===a.length;case k.FLOAT_MAT4:return 16===a.length}return!0};Shader.SCREEN_VERTEX_SHADER="\n\t\t\tprecision highp float;\n\t\t\tattribute vec3 a_vertex;\n\t\t\tattribute vec2 a_coord;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() { \n\t\t\t\tv_coord = a_coord; \n\t\t\t\tgl_Position = vec4(a_coord * 2.0 - 1.0, 0.0, 1.0); \n\t\t\t}\n\t\t\t";
	Shader.SCREEN_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D(u_texture, v_coord);\n\t\t\t}\n\t\t\t";Shader.SCREEN_FRAGMENT_FX="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tvarying vec2 v_coord;\n\t\t\t#ifdef FX_UNIFORMS\n\t\t\t\tFX_UNIFORMS\n\t\t\t#endif\n\t\t\tvoid main() {\n\t\t\t\tvec2 uv = v_coord;\n\t\t\t\tvec4 color = texture2D(u_texture, uv);\n\t\t\t\t#ifdef FX_CODE\n\t\t\t\t\tFX_CODE ;\n\t\t\t\t#endif\n\t\t\t\tgl_FragColor = color;\n\t\t\t}\n\t\t\t";
	Shader.SCREEN_COLORED_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec4 u_color;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = u_color * texture2D(u_texture, v_coord);\n\t\t\t}\n\t\t\t";Shader.BLEND_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform sampler2D u_texture2;\n\t\t\tuniform float u_factor;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = mix( texture2D(u_texture, v_coord), texture2D(u_texture2, v_coord), u_factor);\n\t\t\t}\n\t\t\t";
	Shader.SCREEN_FLAT_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform vec4 u_color;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = u_color;\n\t\t\t}\n\t\t\t";Shader.QUAD_VERTEX_SHADER="\n\t\t\tprecision highp float;\n\t\t\tattribute vec3 a_vertex;\n\t\t\tattribute vec2 a_coord;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform vec2 u_position;\n\t\t\tuniform vec2 u_size;\n\t\t\tuniform vec2 u_viewport;\n\t\t\tuniform mat3 u_transform;\n\t\t\tvoid main() { \n\t\t\t\tvec3 pos = vec3(u_position + vec2(a_coord.x,1.0 - a_coord.y)  * u_size, 1.0);\n\t\t\t\tv_coord = a_coord; \n\t\t\t\tpos = u_transform * pos;\n\t\t\t\tpos.z = 0.0;\n\t\t\t\t//normalize\n\t\t\t\tpos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\t\t\t\tpos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\t\t\t\tgl_Position = vec4(pos, 1.0); \n\t\t\t}\n\t\t\t";
	Shader.QUAD_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec4 u_color;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = u_color * texture2D(u_texture, v_coord);\n\t\t\t}\n\t\t\t";Shader.QUAD2_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec4 u_color;\n\t\t\tuniform vec4 u_texture_area;\n\t\t\tvarying vec2 v_coord;\n\t\t\tvoid main() {\n\t\t\t    vec2 uv = vec2( mix(u_texture_area.x, u_texture_area.z, v_coord.x), 1.0 - mix(u_texture_area.w, u_texture_area.y, v_coord.y) );\n\t\t\t\tgl_FragColor = u_color * texture2D(u_texture, uv);\n\t\t\t}\n\t\t\t";
	Shader.PRIMITIVE2D_VERTEX_SHADER="\n\t\t\tprecision highp float;\n\t\t\tattribute vec3 a_vertex;\n\t\t\tuniform vec2 u_viewport;\n\t\t\tuniform mat3 u_transform;\n\t\t\tvoid main() { \n\t\t\t\tvec3 pos = a_vertex;\n\t\t\t\tpos = u_transform * pos;\n\t\t\t\tpos.z = 0.0;\n\t\t\t\t//normalize\n\t\t\t\tpos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\t\t\t\tpos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\t\t\t\tgl_Position = vec4(pos, 1.0); \n\t\t\t}\n\t\t\t";Shader.FLAT_VERTEX_SHADER="\n\t\t\tprecision highp float;\n\t\t\tattribute vec3 a_vertex;\n\t\t\tuniform mat4 u_mvp;\n\t\t\tvoid main() { \n\t\t\t\tgl_Position = u_mvp * vec4(a_vertex,1.0); \n\t\t\t}\n\t\t\t";
	Shader.FLAT_FRAGMENT_SHADER="\n\t\t\tprecision highp float;\n\t\t\tuniform vec4 u_color;\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = u_color;\n\t\t\t}\n\t\t\t";Shader.createFX=function(a,b,c){a={FX_CODE:a,FX_UNIFORMS:b||""};if(!c)return new k.Shader(k.Shader.SCREEN_VERTEX_SHADER,k.Shader.SCREEN_FRAGMENT_FX,a);c.updateShader(k.Shader.SCREEN_VERTEX_SHADER,k.Shader.SCREEN_FRAGMENT_FX,a);return c};Shader.prototype.toViewport=function(a){var b=k.Mesh.getScreenQuad();a&&this.uniforms(a);this.draw(b)};
	Shader.getScreenShader=function(a){a=a||r.gl;var b=a.shaders[":screen"];if(b)return b;b=a.shaders[":screen"]=new k.Shader(Shader.SCREEN_VERTEX_SHADER,Shader.SCREEN_FRAGMENT_SHADER);return b.uniforms({u_texture:0})};Shader.getColoredScreenShader=function(a){a=a||r.gl;var b=a.shaders[":colored_screen"];if(b)return b;b=a.shaders[":colored_screen"]=new k.Shader(Shader.SCREEN_VERTEX_SHADER,Shader.SCREEN_COLORED_FRAGMENT_SHADER);return b.uniforms({u_texture:0,u_color:vec4.fromValues(1,1,1,1)})};Shader.getQuadShader=
		function(a){a=a||r.gl;var b=a.shaders[":quad"];return b?b:a.shaders[":quad"]=new k.Shader(Shader.QUAD_VERTEX_SHADER,Shader.QUAD_FRAGMENT_SHADER)};Shader.getPartialQuadShader=function(a){a=a||r.gl;var b=a.shaders[":quad2"];return b?b:a.shaders[":quad2"]=new k.Shader(Shader.QUAD_VERTEX_SHADER,Shader.QUAD2_FRAGMENT_SHADER)};Shader.getBlendShader=function(a){a=a||r.gl;var b=a.shaders[":blend"];return b?b:a.shaders[":blend"]=new k.Shader(Shader.SCREEN_VERTEX_SHADER,Shader.BLEND_FRAGMENT_SHADER)};Shader.getBlurShader=
		function(a){a=a||r.gl;var b=a.shaders[":blur"];if(b)return b;b=new k.Shader(Shader.SCREEN_VERTEX_SHADER,"\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\tuniform vec2 u_offset;\n\t\t\tuniform float u_intensity;\n\t\t\tvoid main() {\n\t\t\t   vec4 sum = vec4(0.0);\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * -4.0) * 0.05/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * -3.0) * 0.09/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * -2.0) * 0.12/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * -1.0) * 0.15/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord) * 0.16/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * 4.0) * 0.05/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * 3.0) * 0.09/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * 2.0) * 0.12/0.98;\n\t\t\t   sum += texture2D(u_texture, v_coord + u_offset * 1.0) * 0.15/0.98;\n\t\t\t   gl_FragColor = u_intensity * sum;\n\t\t\t}\n\t\t\t");
			return a.shaders[":blur"]=b};Shader.getCubemapCopyShader=function(a){a=a||r.gl;var b=a.shaders[":copy_cubemap"];if(b)return b;b=new k.Shader(Shader.SCREEN_VERTEX_SHADER,"\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform samplerCube u_texture;\n\t\t\tuniform mat3 u_rotation;\n\t\t\tvoid main() {\n\t\t\t\tvec2 uv = vec2( v_coord.x, 1.0 - v_coord.y );\n\t\t\t\tvec3 dir = vec3( uv - vec2(0.5), 0.5 );\n\t\t\t\tdir = u_rotation * dir;\n\t\t\t   gl_FragColor = textureCube( u_texture, dir );\n\t\t\t}\n\t\t\t");
		return a.shaders[":copy_cubemap"]=b};Shader.getCubemapBlurShader=function(a){a=a||r.gl;var b=a.shaders[":blur_cubemap"];if(b)return b;b=new k.Shader(Shader.SCREEN_VERTEX_SHADER,"\n\t\t\t#ifndef NUM_SAMPLES\n\t\t\t\t#define NUM_SAMPLES 4\n\t\t\t#endif\n\t\t\t\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform samplerCube u_texture;\n\t\t\tuniform mat3 u_rotation;\n\t\t\tuniform vec2 u_offset;\n\t\t\tuniform float u_intensity;\n\t\t\tvoid main() {\n\t\t\t\tvec4 sum = vec4(0.0);\n\t\t\t\tvec2 uv = vec2( v_coord.x, 1.0 - v_coord.y ) - vec2(0.5);\n\t\t\t\tvec3 dir = vec3(0.0);\n\t\t\t\tvec4 color = vec4(0.0);\n\t\t\t\tfor( int x = -2; x <= 2; x++ )\n\t\t\t\t{\n\t\t\t\t\tfor( int y = -2; y <= 2; y++ )\n\t\t\t\t\t{\n\t\t\t\t\t\tdir.xy = uv + vec2( u_offset.x * float(x), u_offset.y * float(y)) * 0.5;\n\t\t\t\t\t\tdir.z = 0.5;\n\t\t\t\t\t\tdir = u_rotation * dir;\n\t\t\t\t\t\tcolor = textureCube( u_texture, dir );\n\t\t\t\t\t\tcolor.xyz = color.xyz * color.xyz;/*linearize*/\n\t\t\t\t\t\tsum += color;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tsum /= 25.0;\n\t\t\t   gl_FragColor = vec4( sqrt( sum.xyz ), sum.w ) ;\n\t\t\t}\n\t\t\t");
		return a.shaders[":blur_cubemap"]=b};Shader.FXAA_FUNC="\n\tuniform vec2 u_viewportSize;\n\tuniform vec2 u_iViewportSize;\n\t#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n\t#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n\t#define FXAA_SPAN_MAX     8.0\n\t\n\t/* from mitsuhiko/webgl-meincraft based on the code on geeks3d.com */\n\tvec4 applyFXAA(sampler2D tex, vec2 fragCoord)\n\t{\n\t\tvec4 color = vec4(0.0);\n\t\t/*vec2 u_iViewportSize = vec2(1.0 / u_viewportSize.x, 1.0 / u_viewportSize.y);*/\n\t\tvec3 rgbNW = texture2D(tex, (fragCoord + vec2(-1.0, -1.0)) * u_iViewportSize).xyz;\n\t\tvec3 rgbNE = texture2D(tex, (fragCoord + vec2(1.0, -1.0)) * u_iViewportSize).xyz;\n\t\tvec3 rgbSW = texture2D(tex, (fragCoord + vec2(-1.0, 1.0)) * u_iViewportSize).xyz;\n\t\tvec3 rgbSE = texture2D(tex, (fragCoord + vec2(1.0, 1.0)) * u_iViewportSize).xyz;\n\t\tvec3 rgbM  = texture2D(tex, fragCoord  * u_iViewportSize).xyz;\n\t\tvec3 luma = vec3(0.299, 0.587, 0.114);\n\t\tfloat lumaNW = dot(rgbNW, luma);\n\t\tfloat lumaNE = dot(rgbNE, luma);\n\t\tfloat lumaSW = dot(rgbSW, luma);\n\t\tfloat lumaSE = dot(rgbSE, luma);\n\t\tfloat lumaM  = dot(rgbM,  luma);\n\t\tfloat lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n\t\tfloat lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\t\t\n\t\tvec2 dir;\n\t\tdir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n\t\tdir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\t\t\n\t\tfloat dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\t\t\n\t\tfloat rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n\t\tdir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), dir * rcpDirMin)) * u_iViewportSize;\n\t\t\n\t\tvec3 rgbA = 0.5 * (texture2D(tex, fragCoord * u_iViewportSize + dir * (1.0 / 3.0 - 0.5)).xyz + \n\t\t\ttexture2D(tex, fragCoord * u_iViewportSize + dir * (2.0 / 3.0 - 0.5)).xyz);\n\t\tvec3 rgbB = rgbA * 0.5 + 0.25 * (texture2D(tex, fragCoord * u_iViewportSize + dir * -0.5).xyz + \n\t\t\ttexture2D(tex, fragCoord * u_iViewportSize + dir * 0.5).xyz);\n\t\t\n\t\treturn vec4(rgbA,1.0);\n\t\tfloat lumaB = dot(rgbB, luma);\n\t\tif ((lumaB < lumaMin) || (lumaB > lumaMax))\n\t\t\tcolor = vec4(rgbA, 1.0);\n\t\telse\n\t\t\tcolor = vec4(rgbB, 1.0);\n\t\treturn color;\n\t}\n";
	Shader.getFXAAShader=function(a){a=a||r.gl;var b=a.shaders[":fxaa"];if(b)return b;var b=new k.Shader(Shader.SCREEN_VERTEX_SHADER,"\n\t\t\tprecision highp float;\n\t\t\tvarying vec2 v_coord;\n\t\t\tuniform sampler2D u_texture;\n\t\t\t"+Shader.FXAA_FUNC+"\n\t\t\t\n\t\t\tvoid main() {\n\t\t\t   gl_FragColor = applyFXAA( u_texture, v_coord * u_viewportSize) ;\n\t\t\t}\n\t\t\t"),c=vec2.fromValues(a.viewport_data[2],a.viewport_data[3]),d=vec2.fromValues(1/a.viewport_data[2],1/a.viewport_data[3]);b.setup=
		function(){c[0]=a.viewport_data[2];c[1]=a.viewport_data[3];d[0]=1/a.viewport_data[2];d[1]=1/a.viewport_data[3];this.uniforms({u_viewportSize:c,u_iViewportSize:d})};return a.shaders[":fxaa"]=b};Shader.getFlatShader=function(a){a=a||r.gl;var b=a.shaders[":flat"];if(b)return b;b=new k.Shader(Shader.FLAT_VERTEX_SHADER,Shader.FLAT_FRAGMENT_SHADER);b.uniforms({u_color:[1,1,1,1]});return a.shaders[":flat"]=b};k.create=function(a){function b(a){var c=l.mouse.buttons;k.augmentEvent(a,e);a.eventType=a.eventType||
		a.type;var d=getTime();q.dragging=a.dragging;q.position[0]=a.canvasx;q.position[1]=a.canvasy;q.x=a.canvasx;q.y=a.canvasy;q.clientx=a.mousex;q.clienty=a.mousey;q.left_button=q.buttons&1<<k.LEFT_MOUSE_BUTTON;q.middle_button=q.buttons&1<<k.MIDDLE_MOUSE_BUTTON;q.right_button=q.buttons&1<<k.RIGHT_MOUSE_BUTTON;if("mousedown"==a.eventType){0==c&&(e.removeEventListener("mousemove",b),c=e.ownerDocument,c.addEventListener("mousemove",b),c.addEventListener("mouseup",b));n=d;if(l.onmousedown)l.onmousedown(a);
		z.trigger(l,"mousedown")}else if("mousemove"==a.eventType){if(l.onmousemove)l.onmousemove(a);z.trigger(l,"mousemove",a)}else if("mouseup"==a.eventType){0==l.mouse.buttons&&(e.addEventListener("mousemove",b),c=e.ownerDocument,c.removeEventListener("mousemove",b),c.removeEventListener("mouseup",b));a.click_time=d-n;if(l.onmouseup)l.onmouseup(a);z.trigger(l,"mouseup",a)}else if("mousewheel"==a.eventType||"wheel"==a.eventType||"DOMMouseScroll"==a.eventType){a.eventType="mousewheel";a.wheel="wheel"==a.type?
		-a.deltaY:null!=a.wheelDeltaY?a.wheelDeltaY:-60*a.detail;a.delta=void 0!==a.wheelDelta?a.wheelDelta/40:a.deltaY?-a.deltaY/3:0;if(l.onmousewheel)l.onmousewheel(a);z.trigger(l,"mousewheel",a)}if(l.onmouse)l.onmouse(a);"mousemove"!=a.eventType&&a.stopPropagation();a.preventDefault();return!1}function c(a){var b=a.changedTouches,c=b[0],d="";if(!(a.touches.length&&a.changedTouches[0].identifier!==a.touches[0].identifier||1<b)){switch(a.type){case "touchstart":d="mousedown";break;case "touchmove":d="mousemove";
		break;case "touchend":d="mouseup";break;default:return}b=document.createEvent("MouseEvent");b.initMouseEvent(d,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null);c.target.dispatchEvent(b);a.preventDefault()}}function d(a){l.ongesture&&(a.eventType=a.type,l.ongesture(a));event.preventDefault()}a=a||{};var e=null;if(a.canvas)if("string"==typeof a.canvas){if(e=document.getElementById(a.canvas),!e)throw"Canvas element not found: "+a.canvas;}else e=a.canvas;else e=createCanvas(a.width||
		800,a.height||600);"alpha"in a||(a.alpha=!1);try{r.gl=e.getContext("webgl",a)}catch(h){}try{r.gl=r.gl||e.getContext("experimental-webgl",a)}catch(m){}if(!r.gl)throw"WebGL not supported";var l=r.gl;e.is_webgl=!0;e.gl=l;l.context_id=this.last_context_id++;l.extensions={};l.extensions.OES_standard_derivatives=l.derivatives_supported=l.getExtension("OES_standard_derivatives")||!1;l.extensions.WEBGL_depth_texture=l.getExtension("WEBGL_depth_texture")||l.getExtension("WEBKIT_WEBGL_depth_texture")||l.getExtension("MOZ_WEBGL_depth_texture");
		l.extensions.OES_element_index_uint=l.getExtension("OES_element_index_uint");l.extensions.WEBGL_draw_buffers=l.getExtension("WEBGL_draw_buffers");l.extensions.EXT_shader_texture_lod=l.getExtension("EXT_shader_texture_lod");l.extensions.EXT_sRGB=l.getExtension("EXT_sRGB");l.extensions.EXT_texture_filter_anisotropic=l.getExtension("EXT_texture_filter_anisotropic")||l.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||l.getExtension("MOZ_EXT_texture_filter_anisotropic");l.extensions.EXT_frag_depth=
			l.getExtension("EXT_frag_depth")||l.getExtension("WEBKIT_EXT_frag_depth")||l.getExtension("MOZ_EXT_frag_depth");l.extensions.WEBGL_lose_context=l.getExtension("WEBGL_lose_context")||l.getExtension("WEBKIT_WEBGL_lose_context")||l.getExtension("MOZ_WEBGL_lose_context");l.extensions.OES_texture_float_linear=l.getExtension("OES_texture_float_linear");l.extensions.OES_texture_float_linear&&(l.extensions.OES_texture_float=l.getExtension("OES_texture_float"));l.extensions.OES_texture_half_float_linear=l.getExtension("OES_texture_half_float_linear");
		l.extensions.OES_texture_half_float_linear&&(l.extensions.OES_texture_half_float=l.getExtension("OES_texture_half_float"));l.HALF_FLOAT_OES=36193;l.extensions.OES_texture_half_float&&(l.HALF_FLOAT_OES=l.extensions.OES_texture_half_float.HALF_FLOAT_OES);l.HIGH_PRECISION_FORMAT=l.extensions.OES_texture_half_float?l.HALF_FLOAT_OES:l.extensions.OES_texture_float?l.FLOAT:l.UNSIGNED_BYTE;l.max_texture_units=l.getParameter(l.MAX_TEXTURE_IMAGE_UNITS);l._viewport_func=l.viewport;l.viewport_data=new Float32Array([0,
			0,l.canvas.width,l.canvas.height]);l.viewport=function(a,b,c,d){var e=this.viewport_data;e[0]=a|0;e[1]=b|0;e[2]=c|0;e[3]=d|0;this._viewport_func(a,b,c,d)};l.getViewport=function(a){return a?(a[0]=l.viewport_data[0],a[1]=l.viewport_data[1],a[2]=l.viewport_data[2],a[3]=l.viewport_data[3],a):new Float32Array(l.viewport_data)};l.setViewport=function(a,b){l.viewport_data.set(a);b&&(l.viewport_data[1]=this.drawingBufferHeight-a[1]-a[3]);this._viewport_func(a[0],l.viewport_data[1],a[2],a[3])};if("undefined"==
			typeof glMatrix)throw"glMatrix not found, LiteGL requires glMatrix to be included";var n=0;l.shaders={};l.textures={};l.meshes={};l.makeCurrent=function(){r.gl=this};l.execute=function(a){var b=r.gl;r.gl=this;a();r.gl=b};l.animate=function(a){function b(){if(!l.destroyed){e._requestFrame_id=c(b);var a=getTime(),h=0.001*(a-d);if(e.onupdate)e.onupdate(h);z.trigger(l,"update",h);e.ondraw&&(h=r.gl,r.gl=e,e.ondraw(),z.trigger(l,"draw"),r.gl=h);d=a}}if(!1===a)r.cancelAnimationFrame(this._requestFrame_id),
			this._requestFrame_id=null;else{var c=r.requestAnimationFrame,d=getTime(),e=this;this._requestFrame_id=c(b)}};l.destroy=function(){t&&(document.removeEventListener("keydown",t),document.removeEventListener("keyup",t));this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);this.destroyed=!0;r.gl==this&&(r.gl=null)};var q=l.mouse={buttons:0,left_button:!1,middle_button:!1,right_button:!1,position:new Float32Array(2),x:0,y:0,deltax:0,deltay:0,clientx:0,clienty:0,isInsideRect:function(a,
																																																																																																																																   b,c,d,e){var h=this.y;e&&(h=l.canvas.height-h);return this.x>a&&this.x<a+c&&h>b&&h<b+d?!0:!1},isButtonPressed:function(a){return this.buttons&1<<k.RIGHT_MOUSE_BUTTON}};l.captureMouse=function(a){e.addEventListener("mousedown",b);e.addEventListener("mousemove",b);a&&(e.addEventListener("mousewheel",b,!1),e.addEventListener("wheel",b,!1));e.addEventListener("contextmenu",function(a){a.preventDefault();return!1});e.addEventListener("touchstart",c,!0);e.addEventListener("touchmove",c,!0);e.addEventListener("touchend",
			c,!0);e.addEventListener("touchcancel",c,!0);e.addEventListener("gesturestart",d);e.addEventListener("gesturechange",d);e.addEventListener("gestureend",d)};l.keys={};var t=null;l.captureKeys=function(a,b){function c(b){var d=a;b.eventType=b.type;var e=b.target.nodeName.toLowerCase();if("input"!==e&&"textarea"!==e&&"select"!==e){b.character=String.fromCharCode(b.keyCode).toLowerCase();var e=!1,h=k.mapKeyCode(b.keyCode);h||(h=b.character);b.altKey||b.ctrlKey||b.metaKey||(h&&(l.keys[h]="keydown"==b.type),
			e=l.keys[b.keyCode],l.keys[b.keyCode]="keydown"==b.type);if(e!=l.keys[b.keyCode]){if("keydown"==b.type&&l.onkeydown)l.onkeydown(b);else if("keyup"==b.type&&l.onkeyup)l.onkeyup(b);z.trigger(l,b.type,b)}if(l.onkey)l.onkey(b);d&&(b.isChar||k.blockable_keys[b.keyIdentifier||b.key])&&b.preventDefault()}}t||(l.keys={},document.addEventListener("keydown",c),document.addEventListener("keyup",c),t=c)};l.gamepads=null;l.captureGamepads=function(){var a=navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads;
			a&&(this.gamepads=a.call(navigator))};l.getGamepads=function(a){var b=navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads;if(b){b=b.call(navigator);this.gamepads||(this.gamepads=[]);for(var c=0;4>c;c++){var d=b[c];if(d&&!a){var e=d,h={axes:[],buttons:{},hat:""};h.axes.lx=e.axes[0];h.axes.ly=e.axes[1];h.axes.rx=e.axes[2];h.axes.ry=e.axes[3];h.axes.triggers=e.axes[4];for(var m=0;m<e.buttons.length;m++)switch(m){case 0:h.buttons.a=e.buttons[m].pressed;break;case 1:h.buttons.b=
			e.buttons[m].pressed;break;case 2:h.buttons.x=e.buttons[m].pressed;break;case 3:h.buttons.y=e.buttons[m].pressed;break;case 4:h.buttons.lb=e.buttons[m].pressed;break;case 5:h.buttons.rb=e.buttons[m].pressed;break;case 6:h.buttons.lt=e.buttons[m].pressed;break;case 7:h.buttons.rt=e.buttons[m].pressed;break;case 8:h.buttons.back=e.buttons[m].pressed;break;case 9:h.buttons.start=e.buttons[m].pressed;break;case 10:h.buttons.ls=e.buttons[m].pressed;break;case 11:h.buttons.rs=e.buttons[m].pressed;break;
			case 12:e.buttons[m].pressed&&(h.hat+="up");break;case 13:e.buttons[m].pressed&&(h.hat+="down");break;case 14:e.buttons[m].pressed&&(h.hat+="left");break;case 15:e.buttons[m].pressed&&(h.hat+="right");break;case 16:h.buttons.home=e.buttons[m].pressed}e.xbox=h}e=this.gamepads[c];if(!e&&d){h=new CustomEvent("gamepadconnected");h.eventType=h.type;h.gamepad=d;if(this.ongamepadconnected)this.ongamepadconnected(h);z.trigger(l,"gamepadconnected",h)}else if(e&&!d){h=new CustomEvent("gamepaddisconnected");
			h.eventType=h.type;h.gamepad=e;if(this.ongamepaddisconnected)this.ongamepaddisconnected(h);z.trigger(l,"gamepaddisconnected",h)}if(d)for(m=0;m<d.buttons.length;++m){var k=d.buttons[m];if(k.pressed&&(!e||!e.buttons[m].pressed)){h=new CustomEvent("gamepadButtonDown");h.eventType=h.type;h.button=k;h.which=m;h.gamepad=d;if(l.onbuttondown)l.onbuttondown(h);z.trigger(l,"buttondown",h)}else if(!k.pressed&&e&&e.buttons[m].pressed){h=new CustomEvent("gamepadButtonUp");h.eventType=h.type;h.button=k;h.which=
			m;h.gamepad=d;if(l.onbuttondown)l.onbuttondown(h);z.trigger(l,"buttonup",h)}}}return this.gamepads=b}};l.fullscreen=function(){var a=this.canvas;a.requestFullScreen?a.requestFullScreen():a.webkitRequestFullScreen?a.webkitRequestFullScreen():a.mozRequestFullScreen?a.mozRequestFullScreen():console.error("Fullscreen not supported")};l.snapshot=function(a,b,c,d,e){var h=createCanvas(c,d),m=h.getContext("2d"),k=m.getImageData(0,0,h.width,h.height),n=new Uint8Array(c*d*4);l.readPixels(a,b,h.width,h.height,
			l.RGBA,l.UNSIGNED_BYTE,n);k.data.set(n);m.putImageData(k,0,0);if(e)return h;a=createCanvas(c,d);m=a.getContext("2d");m.translate(0,d);m.scale(1,-1);m.drawImage(h,0,0);return a};var p={};l.loadTexture=function(a,b,c){if(this.textures[a])return this.textures[a];if(p[a])return null;var d=new Image;d.url=a;d.onload=function(){var a=k.Texture.fromImage(this,b);a.img=this;l.textures[this.url]=a;delete p[this.url];c&&c(a)};d.src=a;p[a]=!0;return null};l.drawTexture=function(){var a=mat3.create(),b=vec2.create(),
			c=vec2.create(),d=vec4.create(),e=vec4.fromValues(1,1,1,1),h=vec2.create(),m={u_texture:0,u_position:b,u_color:e,u_size:c,u_texture_area:d,u_viewport:h,u_transform:a};return function(a,e,k,n,p,q,t,r,v,y,B){b[0]=e;b[1]=k;void 0===n&&(n=a.width);void 0===p&&(p=a.height);c[0]=n;c[1]=p;void 0===q&&(q=0);void 0===t&&(t=0);void 0===r&&(r=a.width);void 0===v&&(v=a.height);d[0]=q/a.width;d[1]=t/a.height;d[2]=(q+r)/a.width;d[3]=(t+v)/a.height;h[0]=this.viewport_data[2];h[1]=this.viewport_data[3];y=y||Shader.getPartialQuadShader(this);
			e=Mesh.getScreenQuad(this);a.bind(0);y.uniforms(m);B&&y.uniforms(B);y.draw(e,l.TRIANGLES)}}();l.canvas.addEventListener("webglcontextlost",function(a){a.preventDefault();if(l.onlosecontext)l.onlosecontext(a)},!1);l.reset=function(){l.viewport(0,0,this.canvas.width,this.canvas.height);l.disable(l.BLEND);l.disable(l.CULL_FACE);l.disable(l.DEPTH_TEST);l.frontFace(l.CCW);l._current_texture_drawto=null;l._current_fbo_color=null;l._current_fbo_depth=null};l.reset();return l};k.mapKeyCode=function(a){return{8:"BACKSPACE",
		9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"}[a]||(65<=a&&90>=a?String.fromCharCode(a):null)};k.dragging=!1;k.last_pos=[0,0];k.augmentEvent=function(a,b){var c=null;b=b||a.target||gl.canvas;c=b.getBoundingClientRect();a.mousex=a.clientX-c.left;a.mousey=a.clientY-c.top;a.canvasx=a.mousex;a.canvasy=c.height-a.mousey;a.deltax=0;a.deltay=0;"mousedown"==a.type?(this.dragging=!0,gl.mouse.buttons|=1<<a.which):"mousemove"!=a.type&&"mouseup"==a.type&&
		(gl.mouse.buttons&=~(1<<a.which),0==gl.mouse.buttons&&(this.dragging=!1));a.deltax=a.mousex-this.last_pos[0];a.deltay=a.mousey-this.last_pos[1];this.last_pos[0]=a.mousex;this.last_pos[1]=a.mousey;a.dragging=this.dragging;a.buttons_mask=gl.mouse.buttons;a.leftButton=gl.mouse.buttons&1<<k.LEFT_MOUSE_BUTTON;a.middleButton=gl.mouse.buttons&1<<k.MIDDLE_MOUSE_BUTTON;a.rightButton=gl.mouse.buttons&1<<k.RIGHT_MOUSE_BUTTON;a.isButtonPressed=function(a){return this.buttons_mask&1<<a}};var z=r.LEvent=k.LEvent=
		{bind:function(a,b,c,d){if(!a)throw"cannot bind event to null";if(!c)throw"cannot bind to null callback";if(a.constructor===String)throw"cannot bind event to a string";var e=a.__levents;e||(Object.defineProperty(a,"__levents",{value:{},enumerable:!1}),e=a.__levents);e.hasOwnProperty(b)?e[b].push([c,d]):e[b]=[[c,d]]},unbind:function(a,b,c,d){if(!a)throw"cannot unbind event to null";if(!c)throw"cannot unbind from null callback";if(a.constructor===String)throw"cannot bind event to a string";if((a=a.__levents)&&
				a.hasOwnProperty(b)){for(var e=0,h=a[b].length;e<h;++e){var m=a[b][e];if(m[0]===c&&m[1]===d){a[b].splice(e,1);break}}0==a[b].length&&delete a[b]}},unbindAll:function(a,b,c){if(!a)throw"cannot unbind events in null";var d=a.__levents;if(d)if(b)for(var e in d){a=d[e];for(var h=a.length-1;0<=h;--h)a[h][1]!=b||c&&c!==a[h][0]||a.splice(h,1)}else delete a.__levents},unbindAllEvent:function(a,b){if(!a)throw"cannot unbind events in null";var c=a.__levents;c&&delete c[b]},isBind:function(a,b,c,d){if(!a)throw"LEvent cannot have null as instance";
				if(a=a.__levents){if(!a.hasOwnProperty(b))return!1;for(var e=0,h=a[b].length;e<h;++e){var m=a[b][e];if(m[0]===c&&m[1]===d)return!0}return!1}},hasBind:function(a,b){if(!a)throw"LEvent cannot have null as instance";var c=a.__levents;return c&&c.hasOwnProperty(b)&&c[b].length?!0:!1},hasBindTo:function(a,b){if(!a)throw"LEvent cannot have null as instance";var c=a.__levents;if(!c)return!1;for(var d in c)for(var e=c[d],h=0;h<e.length;++h)if(e[h][1]===b)return!0;return!1},trigger:function(a,b,c){if(!a)throw"cannot trigger event from null";
				if(a.constructor===String)throw"cannot bind event to a string";a=a.__levents;if(!a||!a.hasOwnProperty(b))return!0;a=a[b];for(var d=0,e=a.length;d<e;++d){var h=a[d];if(h&&!1==h[0].call(h[1],b,c))return!1}return!0},triggerArray:function(a,b,c){for(var d=0,e=a.length;d<e;++d){var h=a[d];if(!h)throw"cannot trigger event from null";if(h.constructor===String)throw"cannot bind event to a string";if((h=h.__levents)&&h.hasOwnProperty(b))for(var m=0,l=h[b].length;m<l;++m){var k=h[b][m];if(!1==k[0].call(k[1],
				b,c))break}}return!0},extendObject:function(a){a.on=function(a,c,d){if(!c)throw"cannot bind to null callback";var e=this.__levents;this||(Object.defineProperty(this,"__levents",{value:{},enumerable:!1}),e=this.__levents);e.hasOwnProperty(a)?e[a].push([c,d]):e[a]=[[c,d]]};a.trigger=function(a,c){var d=this.__levents;if(!d||!d.hasOwnProperty(a))return!0;for(var d=d[a],e=0,h=d.length;e<h;++e){var m=d[e];if(m&&!1==m[0].call(m[1],a,c))return!1}return!0};a.unbind=function(a,c,d){if(!c)throw"cannot unbind from null callback";
				var e=this.__levents;if(e&&e.hasOwnProperty(a)){for(var h=0,m=e[a].length;h<m;++h){var l=e[a][h];if(l[0]===c&&l[1]===d){e[a].splice(h,1);break}}0==e[a].length&&delete e[a]}}},extendClass:function(a){this.extendObject(a.prototype)}};r.CLIP_INSIDE=k.CLIP_INSIDE=0;r.CLIP_OUTSIDE=k.CLIP_OUTSIDE=1;r.CLIP_OVERLAP=k.CLIP_OVERLAP=2;r.geo={createPlane:function(a,b){return new Float32Array([b[0],b[1],b[2],-vec3.dot(a,b)])},distancePointToPlane:function(a,b){return(vec3.dot(a,b)+b[3])/Math.sqrt(b[0]*b[0]+b[1]*
			b[1]+b[2]*b[2])},distance2PointToPlane:function(a,b){return(vec3.dot(a,b)+b[3])/(b[0]*b[0]+b[1]*b[1]+b[2]*b[2])},projectPointOnPlane:function(a,b,c,d){d=d||vec3.create();b=vec3.subtract(vec3.create(),a,b);b=vec3.dot(b,c);return vec3.subtract(d,a,vec3.scale(vec3.create(),c,b))},reflectPointInPlane:function(a,b,c){b=-(-1*(b[0]*c[0]+b[1]*c[1]+b[2]*c[2])+c[0]*a[0]+c[1]*a[1]+c[2]*a[2])/(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]);return vec3.fromValues(a[0]+b*c[0]*2,a[1]+b*c[1]*2,a[2]+b*c[2]*2)},testRayPlane:function(a,
																																																																																																																																	 b,c,d,e){c=vec3.dot(c,d)-vec3.dot(d,a);d=vec3.dot(d,b);if(Math.abs(d)<EPSILON)return!1;d=c/d;if(0>d)return!1;e&&vec3.add(e,a,vec3.scale(e,b,d));return!0},testSegmentPlane:function(){var a=vec3.create();return function(b,c,d,e,h){d=vec3.dot(d,e)-vec3.dot(e,b);c=vec3.sub(a,c,b);e=vec3.dot(e,c);if(Math.abs(e)<EPSILON)return!1;e=d/e;if(0>e||1<e)return!1;h&&vec3.add(h,b,vec3.scale(h,c,e));return!0}}(),testRaySphere:function(){var a=vec3.create();return function(b,c,d,e,h,m){var l=vec3.subtract(a,b,d),
			k=c[0]*c[0]+c[1]*c[1]+c[2]*c[2];d=2*l[0]*c[0]+2*l[1]*c[1]+2*l[2]*c[2];e=d*d-4*k*(l[0]*l[0]+l[1]*l[1]+l[2]*l[2]-e*e);if(0>e)return!1;if(h){e=Math.sqrt(e);l=1/(2*k);k=(-d+e)*l;d=(-d-e)*l;d=k<d?k:d;if(d>m)return!1;vec3.add(h,b,vec3.scale(h,c,d))}return!0}}(),testRayCylinder:function(a,b,c,d,e,h){var m=vec3.clone(a);a=vec3.add(vec3.create(),a,vec3.scale(vec3.create(),b,1E5));var l=0;b=vec3.subtract(vec3.create(),d,c);var k=vec3.subtract(vec3.create(),m,c);c=vec3.subtract(vec3.create(),a,m);d=vec3.dot(k,
			b);a=vec3.dot(c,b);b=vec3.dot(b,b);if(0>d&&0>d+a||d>b&&d+a>b)return!1;var q=vec3.dot(c,c),t=vec3.dot(k,c),l=b*q-a*a;e=vec3.dot(k,k)-e*e;var p=b*e-d*d;if(Math.abs(l)<EPSILON){if(0<p)return!1;l=0>d?-t/q:d>b?(a-t)/q:0;h&&vec3.add(h,m,vec3.scale(vec3.create(),c,l));return!0}k=b*t-a*d;p=k*k-l*p;if(0>p)return!1;l=(-k-Math.sqrt(p))/l;if(0>l||1<l)return!1;if(0>d+l*a){if(0>=a)return!1;l=-d/a;h&&vec3.add(h,m,vec3.scale(vec3.create(),c,l));return 0>=e+2*l*(t+l*q)}if(d+l*a>b){if(0<=a)return!1;l=(b-d)/a;h&&vec3.add(h,
			m,vec3.scale(vec3.create(),c,l));return 0>=e+b-2*d+l*(2*(t-a)+l*q)}h&&vec3.add(h,m,vec3.scale(vec3.create(),c,l));return!0},testRayBox:function(a,b,c,d,e,h){e=e||vec3.create();h=h||Number.MAX_VALUE;for(var m=!0,l=new Float32Array(3),k=0,q=new Float32Array(3),t=new Float32Array(3),k=0;3>k;++k)a[k]<c[k]?(l[k]=1,t[k]=c[k],m=!1):a[k]>d[k]?(l[k]=0,t[k]=d[k],m=!1):l[k]=2;if(m)return vec3.copy(e,a),!0;for(k=0;3>k;++k)q[k]=2!=l[k]&&0!=b[k]?(t[k]-a[k])/b[k]:-1;m=0;for(k=1;3>k;k++)q[m]<q[k]&&(m=k);if(0>q[m]||
			q[m]>h)return!1;for(k=0;3>k;++k)if(m!=k){if(e[k]=a[k]+q[m]*b[k],e[k]<c[k]||e[k]>d[k])return!1}else e[k]=t[k];return!0},testRayBBox:function(a,b,c,d,e,h){if(d){var k=mat4.invert(mat4.create(),d);b=vec3.add(vec3.create(),a,b);a=vec3.transformMat4(vec3.create(),a,k);vec3.transformMat4(b,b,k);vec3.sub(b,b,a);b=vec3.normalize(b,b)}a=this.testRayBox(a,b,c.subarray(6,9),c.subarray(9,12),e,h);d&&vec3.transformMat4(e,e,d);return a},testPointBBox:function(a,b){return a[0]<b[6]||a[0]>b[9]||a[1]<b[7]||a[0]>b[10]||
		a[2]<b[8]||a[0]>b[11]?!1:!0},testBBoxBBox:function(a,b){if(Math.abs(b[0]-a[0])>a[3]+b[3]||Math.abs(b[1]-a[1])>a[4]+b[4]||Math.abs(b[2]-a[2])>a[5]+b[5])return!1;var c=BBox.getMin(b);geo.testPointBBox(c,a)&&(c=BBox.getMax(b),geo.testPointBBox(c,a));return!0},testSphereBBox:function(a,b,c){for(var d=0,e=BBox.getMin(c),h=BBox.getMax(c),k=0;3>k;++k)a[k]<e[k]?(c=a[k]-e[k],d+=c*c):a[k]>h[k]&&(c=a[k]-h[k],d+=c*c);return d<=b*b?!0:!1},closestPointBetweenLines:function(a,b,c,d,e,h){b=vec3.subtract(vec3.create(),
			b,a);d=vec3.subtract(vec3.create(),d,c);var k=vec3.subtract(vec3.create(),a,c),l=vec3.dot(b,b),n=vec3.dot(b,d),q=vec3.dot(d,d),t=vec3.dot(b,k),p=vec3.dot(d,k),r=l*q-n*n,u;r<EPSILON?(u=0,l=n>q?t/n:p/q):(u=(n*p-q*t)/r,l=(l*p-n*t)/r);e&&vec3.add(e,a,vec3.scale(vec3.create(),b,u));h&&vec3.add(h,c,vec3.scale(vec3.create(),d,l));a=vec3.add(vec3.create(),k,vec3.subtract(vec3.create(),vec3.scale(vec3.create(),b,u),vec3.scale(vec3.create(),d,l)));return vec3.length(a)},extractPlanes:function(a,b){function c(a){var c=
			b.subarray(a,a+3),c=vec3.length(c);0!==c&&(c=1/c,b[a]*=c,b[a+1]*=c,b[a+2]*=c,b[a+3]*=c)}b=b||new Float32Array(24);b.set([a[3]-a[0],a[7]-a[4],a[11]-a[8],a[15]-a[12]],0);c(0);b.set([a[3]+a[0],a[7]+a[4],a[11]+a[8],a[15]+a[12]],4);c(4);b.set([a[3]+a[1],a[7]+a[5],a[11]+a[9],a[15]+a[13]],8);c(8);b.set([a[3]-a[1],a[7]-a[5],a[11]-a[9],a[15]-a[13]],12);c(12);b.set([a[3]-a[2],a[7]-a[6],a[11]-a[10],a[15]-a[14]],16);c(16);b.set([a[3]+a[2],a[7]+a[6],a[11]+a[10],a[15]+a[14]],20);c(20);return b},frustumTestBox:function(a,
																																																																																																																																		  b){var c=0,d=0,c=planeBoxOverlap(a.subarray(0,4),b);if(c==CLIP_OUTSIDE)return CLIP_OUTSIDE;d+=c;c=planeBoxOverlap(a.subarray(4,8),b);if(c==CLIP_OUTSIDE)return CLIP_OUTSIDE;d+=c;c=planeBoxOverlap(a.subarray(8,12),b);if(c==CLIP_OUTSIDE)return CLIP_OUTSIDE;d+=c;c=planeBoxOverlap(a.subarray(12,16),b);if(c==CLIP_OUTSIDE)return CLIP_OUTSIDE;d+=c;c=planeBoxOverlap(a.subarray(16,20),b);if(c==CLIP_OUTSIDE)return CLIP_OUTSIDE;d+=c;c=planeBoxOverlap(a.subarray(20,24),b);return c==CLIP_OUTSIDE?CLIP_OUTSIDE:0==
		d+c?CLIP_INSIDE:CLIP_OVERLAP},frustumTestSphere:function(a,b,c){var d,e=!1;d=distanceToPlane(a.subarray(0,4),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=!0);d=distanceToPlane(a.subarray(4,8),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=!0);d=distanceToPlane(a.subarray(8,12),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=!0);d=distanceToPlane(a.subarray(12,16),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=!0);d=distanceToPlane(a.subarray(16,20),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=
			!0);d=distanceToPlane(a.subarray(20,24),b);if(d<-c)return CLIP_OUTSIDE;d>=-c&&d<=c&&(e=!0);return e?CLIP_OVERLAP:CLIP_INSIDE},testPoint2DInPolygon:function(a,b){for(var c=!1,d=-1,e=a.length,h=e-1;++d<e;h=d)(a[d][1]<=b[1]&&b[1]<a[h][1]||a[h][1]<=b[1]&&b[1]<a[d][1])&&b[0]<(a[h][0]-a[d][0])*(b[1]-a[d][1])/(a[h][1]-a[d][1])+a[d][0]&&(c=!c);return c}};r.BBox=k.BBox={center:0,halfsize:3,min:6,max:9,radius:12,data_length:13,corners:new Float32Array([1,1,1,1,1,-1,1,-1,1,1,-1,-1,-1,1,1,-1,1,-1,-1,-1,1,-1,
			-1,-1]),tmp_corners:new Float32Array(24),create:function(){return new Float32Array(13)},clone:function(a){return new Float32Array(a)},copy:function(a,b){a.set(b);return a},fromPoint:function(a){var b=this.create();b.set(a,0);b.set(a,6);b.set(a,9);return b},fromMinMax:function(a,b){var c=this.create();this.setMinMax(c,a,b);return c},fromCenterHalfsize:function(a,b){var c=this.create();this.setCenterHalfsize(c,a,b);return c},fromPoints:function(a){var b=this.create();this.setFromPoints(b,a);return b},
		setFromPoints:function(a,b){var c=a.subarray(6,9),d=a.subarray(9,12);c.set(b.subarray(0,3));d.set(c);for(var e=0,h=3,k=b.length;h<k;h+=3)e=b.subarray(h,h+3),vec3.min(c,e,c),vec3.max(d,e,d);c=vec3.add(a.subarray(0,3),c,d);vec3.scale(c,c,0.5);vec3.subtract(a.subarray(3,6),d,c);a[12]=vec3.length(a.subarray(3,6));return a},setMinMax:function(a,b,c){a[6]=b[0];a[7]=b[1];a[8]=b[2];a[9]=c[0];a[10]=c[1];a[11]=c[2];var d=a.subarray(3,6);vec3.sub(d,c,b);vec3.scale(d,d,0.5);a[0]=c[0]-d[0];a[1]=c[1]-d[1];a[2]=
			c[2]-d[2];a[12]=vec3.length(a.subarray(3,6));return a},setCenterHalfsize:function(a,b,c,d){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=c[0];a[4]=c[1];a[5]=c[2];vec3.sub(a.subarray(6,9),a.subarray(0,3),a.subarray(3,6));vec3.add(a.subarray(9,12),a.subarray(0,3),a.subarray(3,6));a[12]=d?d:vec3.length(c);return a},transformMat4:function(a,b,c){var d=b.subarray(3,6),e=this.tmp_corners;e.set(this.corners);for(var h=0;8>h;++h){var k=e.subarray(3*h,3*h+3);vec3.multiply(k,d,k);vec3.add(k,k,b);mat4.multiplyVec3(k,c,
			k)}return this.setFromPoints(a,e)},getCorners:function(a,b){var c=a.subarray(3,6),d=null;b?(b.set(this.corners),d=b):d=new Float32Array(this.corners);for(var e=0;8>e;++e){var h=d.subarray(3*e,3*e+3);vec3.multiply(h,c,h);vec3.add(h,h,a)}return d},merge:function(a,b,c){var d=a.subarray(6,9),e=a.subarray(9,12);vec3.min(d,b.subarray(6,9),c.subarray(6,9));vec3.max(e,b.subarray(9,12),c.subarray(9,12));return BBox.setMinMax(a,d,e)},extendToPoint:function(a,b){b[0]<a[6]?a[6]=b[0]:b[0]>a[9]&&(a[9]=b[0]);b[1]<
		a[7]?a[7]=b[1]:b[1]>a[10]&&(a[10]=b[1]);b[2]<a[8]?a[8]=b[2]:b[2]>a[11]&&(a[11]=b[2]);var c=a.subarray(6,9),d=a.subarray(9,12),c=vec3.add(a.subarray(0,3),c,d);vec3.scale(c,c,0.5);vec3.subtract(a.subarray(3,6),d,c);a[12]=vec3.length(a.subarray(3,6));return a},getCenter:function(a){return a.subarray(0,3)},getHalfsize:function(a){return a.subarray(3,6)},getMin:function(a){return a.subarray(6,9)},getMax:function(a){return a.subarray(9,12)},getRadius:function(a){return a[12]}};r.distanceToPlane=k.distanceToPlane=
		function(a,b){return vec3.dot(a,b)+a[3]};r.planeBoxOverlap=k.planeBoxOverlap=function(a,b){var c=a[3],d=vec3.fromValues(Math.abs(b[3]*a[0]),Math.abs(b[4]*a[1]),Math.abs(b[5]*a[2])),d=d[0]+d[1]+d[2],c=vec3.dot(a,b)+c;return c<=-d?CLIP_OUTSIDE:c<=d?CLIP_OVERLAP:CLIP_INSIDE};r.Octree=k.Octree=function(a){this.root=null;this.total_nodes=this.total_depth=0;a&&(this.buildFromMesh(a),this.total_nodes=this.trim())};Octree.MAX_NODE_TRIANGLES_RATIO=0.1;Octree.MAX_OCTREE_DEPTH=8;Octree.OCTREE_MARGIN_RATIO=0.01;
	Octree.OCTREE_MIN_MARGIN=0.1;Octree.prototype.buildFromMesh=function(a){this.total_nodes=this.total_depth=0;var b=a.getBuffer("vertices").data;if(a=a.getIndexBuffer("triangles"))a=a.data;var c=this.computeAABB(b);this.root=c;this.total_nodes=1;this.total_triangles=a?a.length/3:b.length/9;this.max_node_triangles=this.total_triangles*Octree.MAX_NODE_TRIANGLES_RATIO;var d=vec3.create();vec3.scale(d,c.size,Octree.OCTREE_MARGIN_RATIO);d[0]<Octree.OCTREE_MIN_MARGIN&&(d[0]=Octree.OCTREE_MIN_MARGIN);d[1]<
	Octree.OCTREE_MIN_MARGIN&&(d[1]=Octree.OCTREE_MIN_MARGIN);d[2]<Octree.OCTREE_MIN_MARGIN&&(d[2]=Octree.OCTREE_MIN_MARGIN);vec3.sub(c.min,c.min,d);vec3.add(c.max,c.max,d);c.faces=[];c.inside=0;if(a)for(d=0;d<a.length;d+=3){var e=new Float32Array([b[3*a[d]],b[3*a[d]+1],b[3*a[d]+2],b[3*a[d+1]],b[3*a[d+1]+1],b[3*a[d+1]+2],b[3*a[d+2]],b[3*a[d+2]+1],b[3*a[d+2]+2]]);this.addToNode(e,c,0)}else for(d=0;d<b.length;d+=9)e=new Float32Array(b.subarray(d,d+9)),this.addToNode(e,c,0);return c};Octree.prototype.addToNode=
		function(a,b,c){b.inside+=1;if(b.c){var d=this.computeAABB(a),e=!1,h;for(h in b.c){var k=b.c[h];if(Octree.isInsideAABB(d,k)){this.addToNode(a,k,c+1);e=!0;break}}e||(null==b.faces&&(b.faces=[]),b.faces.push(a))}else if(null==b.faces&&(b.faces=[]),b.faces.push(a),b.faces.length>this.max_node_triangles&&c<Octree.MAX_OCTREE_DEPTH){this.splitNode(b);this.total_depth<c+1&&(this.total_depth=c+1);var l=b.faces.concat();b.faces=null;for(h in l){a=l[h];var d=this.computeAABB(a),e=!1,n;for(n in b.c)if(k=b.c[n],
			Octree.isInsideAABB(d,k)){this.addToNode(a,k,c+1);e=!0;break}e||(null==b.faces&&(b.faces=[]),b.faces.push(a))}}};Octree.prototype.octree_pos_ref=[[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]];Octree.prototype.splitNode=function(a){a.c=[];var b=[0.5*(a.max[0]-a.min[0]),0.5*(a.max[1]-a.min[1]),0.5*(a.max[2]-a.min[2])],c;for(c in this.octree_pos_ref){var d=this.octree_pos_ref[c],e={};this.total_nodes+=1;e.min=[a.min[0]+b[0]*d[0],a.min[1]+b[1]*d[1],a.min[2]+b[2]*d[2]];e.max=[e.min[0]+
	b[0],e.min[1]+b[1],e.min[2]+b[2]];e.faces=null;e.inside=0;a.c.push(e)}};Octree.prototype.computeAABB=function(a){for(var b=new Float32Array([a[0],a[1],a[2]]),c=new Float32Array([a[0],a[1],a[2]]),d=0;d<a.length;d+=3)for(var e=0;3>e;e++)b[e]>a[d+e]&&(b[e]=a[d+e]),c[e]<a[d+e]&&(c[e]=a[d+e]);return{min:b,max:c,size:vec3.sub(vec3.create(),c,b)}};Octree.prototype.trim=function(a){a=a||this.root;if(!a.c)return 1;for(var b=1,c=[],d=a.c,e=0;e<d.length;++e)d[e].inside&&(c.push(d[e]),b+=this.trim(d[e]));a.c=
		c;return b};Octree.prototype.testRay=function(){var a=vec3.create(),b=vec3.create(),c=vec3.create(),d=vec3.create();return function(e,h,k,l){if(!this.root)throw"Error: octree not build";a.set(e);b.set(h);c.set(this.root.min);d.set(this.root.max);k=Octree.hitTestBox(a,b,c,d);if(!k)return null;k=Octree.testRayInNode(this.root,a,b);return null!=k?(h=vec3.scale(vec3.create(),h,k.t),vec3.add(h,h,e),k.pos=h,k):null}}();Octree.prototype.testSphere=function(a,b){a=vec3.clone(a);if(!this.root)throw"Error: octree not build";
		var c=b*b;return Octree.testSphereBox(a,c,vec3.clone(this.root.min),vec3.clone(this.root.max))?Octree.testSphereInNode(this.root,a,c):!1};Octree.testRayInNode=function(a,b,c){var d=null,e=null;if(a.faces)for(var h=0,k=a.faces.length;h<k;++h){var l=a.faces[h],d=Octree.hitTestTriangle(b,c,l.subarray(0,3),l.subarray(3,6),l.subarray(6,9));null!=d&&(d.face=l,e?e.mergeWith(d):e=d)}var k=vec3.create(),l=vec3.create(),n;if(a.c)for(h=0;h<a.c.length;++h)n=a.c[h],k.set(n.min),l.set(n.max),d=Octree.hitTestBox(b,
		c,k,l),null==d||e&&d.t>e.t||(d=Octree.testRayInNode(n,b,c),null!=d&&(e?e.mergeWith(d):e=d));return e};Octree.testSphereInNode=function(a,b,c){if(a.faces)for(var d=0,e=a.faces.length;d<e;++d){var h=a.faces[d];if(Octree.testSphereTriangle(b,c,h.subarray(0,3),h.subarray(3,6),h.subarray(6,9)))return!0}var e=vec3.create(),h=vec3.create(),k;if(a.c)for(d=0;d<a.c.length;++d)if(k=a.c[d],e.set(k.min),h.set(k.max),Octree.testSphereBox(b,c,e,h)&&Octree.testSphereInNode(k,b,c))return!0;return!1};Octree.isInsideAABB=
		function(a,b){return a.min[0]<b.min[0]||a.min[1]<b.min[1]||a.min[2]<b.min[2]||a.max[0]>b.max[0]||a.max[1]>b.max[1]||a.max[2]>b.max[2]?!1:!0};Octree.hitTestBox=function(){var a=vec3.create(),b=vec3.create(),c=vec3.create(),d=vec3.create(),e=vec3.create(),h=vec3.create(),k=vec3.fromValues(1E-6,1E-6,1E-6);return function(l,n,q,t){vec3.subtract(a,q,l);vec3.subtract(b,t,l);if(0>vec3.maxValue(a)&&0<vec3.minValue(b))return new HitTest(0,l,n);c[0]=1/n[0];c[1]=1/n[1];c[2]=1/n[2];vec3.multiply(a,a,c);vec3.multiply(b,
		b,c);vec3.min(d,a,b);vec3.max(e,a,b);var p=vec3.maxValue(d),r=vec3.minValue(e);return 0<p&&p<r?(l=vec3.add(vec3.create(),vec3.scale(h,n,p),l),vec3.add(q,q,k),vec3.subtract(q,q,k),new HitTest(p,l,vec3.fromValues((l[0]>t[0])-(l[0]<q[0]),(l[1]>t[1])-(l[1]<q[1]),(l[2]>t[2])-(l[2]<q[2])))):null}}();Octree.hitTestTriangle=function(){var a=vec3.create(),b=vec3.create(),c=vec3.create(),d=vec3.create();return function(e,h,k,l,n){vec3.subtract(a,l,k);vec3.subtract(b,n,k);l=vec3.cross(vec3.create(),a,b);vec3.normalize(l,
		l);if(0<vec3.dot(l,h))return null;n=vec3.dot(l,vec3.subtract(d,k,e))/vec3.dot(l,h);if(0<n){h=vec3.scale(vec3.create(),h,n);vec3.add(h,h,e);vec3.subtract(c,h,k);e=vec3.dot(b,b);k=vec3.dot(b,a);var q=vec3.dot(b,c),t=vec3.dot(a,a),p=vec3.dot(a,c),r=e*t-k*k,t=(t*q-k*p)/r;e=(e*p-k*q)/r;if(0<=t&&0<=e&&1>=t+e)return new HitTest(n,h,l)}return null}}();Octree.testSphereTriangle=function(){var a=vec3.create(),b=vec3.create(),c=vec3.create(),d=vec3.create(),e=vec3.create(),h=vec3.create(),k=vec3.create(),l=
		vec3.create();return function(n,q,r,p,v){vec3.sub(a,r,n);vec3.sub(b,p,n);vec3.sub(c,v,n);vec3.sub(d,b,a);vec3.sub(e,c,a);vec3.cross(l,d,e);n=vec3.dot(a,l);r=vec3.dot(l,l);n=n*n>q*r;var u=vec3.dot(a,a),s=vec3.dot(a,b),w=vec3.dot(a,c),y=vec3.dot(b,b),F=vec3.dot(b,c),x=vec3.dot(c,c);r=u>q&s>u&w>u;p=y>q&s>y&F>y;v=x>q&w>x&F>x;var u=s-u,s=F-y,z=w-x;vec3.sub(h,c,b);vec3.sub(k,a,c);y=vec3.dot(d,d);x=vec3.dot(h,h);w=vec3.dot(k,k);F=vec3.scale(vec3.create(),a,y);vec3.sub(F,F,vec3.scale(vec3.create(),d,u));
		u=vec3.scale(vec3.create(),b,x);vec3.sub(u,u,vec3.scale(vec3.create(),h,s));s=vec3.scale(vec3.create(),c,w);vec3.sub(s,s,vec3.scale(vec3.create(),k,z));var C=vec3.scale(vec3.create(),c,y),C=vec3.sub(C,C,F),G=vec3.scale(vec3.create(),a,x),G=vec3.sub(G,G,u),z=vec3.scale(vec3.create(),b,w),z=vec3.sub(z,z,s),y=vec3.dot(F,F)>q*y*y&0<vec3.dot(F,C),x=vec3.dot(u,u)>q*x*x&0<vec3.dot(u,G);q=vec3.dot(s,s)>q*w*w&0<vec3.dot(s,z);return!(n|r|p|v|y|x|q)}}();Octree.testSphereBox=function(a,b,c,d){for(var e,h=0,k=
		0;3>k;++k)a[k]<c[k]?(e=a[k]-c[k],h+=e*e):a[k]>d[k]&&(e=a[k]-d[k],h+=e*e);return h<=b?!0:!1};r.HitTest=k.HitTest=function(a,b,c){this.t=arguments.length?a:Number.MAX_VALUE;this.hit=b;this.normal=c;this.face=null};HitTest.prototype={mergeWith:function(a){0<a.t&&a.t<this.t&&(this.t=a.t,this.hit=a.hit,this.normal=a.normal,this.face=a.face)}};r.Raytracer=k.Raytracer=function(a,b){this.viewport=vec4.create();this.ray00=vec3.create();this.ray10=vec3.create();this.ray01=vec3.create();this.ray11=vec3.create();
		this.eye=vec3.create();this.setup(a,b)};Raytracer.prototype.setup=function(a,b){b=b||gl.viewport_data;this.viewport.set(b);var c=b[0],d=c+b[2],e=b[1],h=e+b[3];vec3.set(this.ray00,c,e,1);vec3.set(this.ray10,d,e,1);vec3.set(this.ray01,c,h,1);vec3.set(this.ray11,d,h,1);vec3.unproject(this.ray00,this.ray00,a,b);vec3.unproject(this.ray10,this.ray10,a,b);vec3.unproject(this.ray01,this.ray01,a,b);vec3.unproject(this.ray11,this.ray11,a,b);c=this.eye;vec3.unproject(c,c,a,b);vec3.subtract(this.ray00,this.ray00,
		c);vec3.subtract(this.ray10,this.ray10,c);vec3.subtract(this.ray01,this.ray01,c);vec3.subtract(this.ray11,this.ray11,c)};Raytracer.prototype.getRayForPixel=function(){var a=vec3.create(),b=vec3.create();return function(c,d,e){e=e||vec3.create();c=(c-this.viewport[0])/this.viewport[2];d=1-(d-this.viewport[1])/this.viewport[3];vec3.lerp(a,this.ray00,this.ray10,c);vec3.lerp(b,this.ray01,this.ray11,c);vec3.lerp(e,a,b,d);return vec3.normalize(e,e)}}();var U=mat4.create();Raytracer.hitTestBox=function(a,
																																																																																																																															 b,c,d,e){var h=new Float32Array(30);e&&(e=mat4.invert(U,e),a=mat4.multiplyVec3(h.subarray(3,6),e,a),b=mat4.rotateVec3(h.subarray(6,9),e,b));var k=vec3.subtract(h.subarray(9,12),c,a);vec3.divide(k,k,b);var l=vec3.subtract(h.subarray(12,15),d,a);vec3.divide(l,l,b);e=vec3.min(h.subarray(15,18),k,l);k=vec3.max(h.subarray(18,21),k,l);e=vec3.maxValue(e);k=vec3.minValue(k);return 0<e&&e<=k?(b=vec3.scale(h.subarray(21,24),b,e),vec3.add(b,a,b),vec3.addValue(h.subarray(24,27),c,1E-6),vec3.subValue(h.subarray(27,
		30),d,1E-6),new HitTest(e,b,vec3.fromValues((b[0]>d[0])-(b[0]<c[0]),(b[1]>d[1])-(b[1]<c[1]),(b[2]>d[2])-(b[2]<c[2])))):null};Raytracer.hitTestSphere=function(a,b,c,d){var e=vec3.subtract(vec3.create(),a,c),h=vec3.dot(b,b),k=2*vec3.dot(b,e),e=vec3.dot(e,e)-d*d,e=k*k-4*h*e;return 0<e?(h=(-k-Math.sqrt(e))/(2*h),a=vec3.add(vec3.create(),a,vec3.scale(vec3.create(),b,h)),new HitTest(h,a,vec3.scale(vec3.create(),vec3.subtract(vec3.create(),a,c),1/d))):null};Raytracer.hitTestTriangle=function(a,b,c,d,e){var h=
		vec3.subtract(vec3.create(),d,c),k=vec3.subtract(vec3.create(),e,c);e=vec3.cross(vec3.create(),h,k);vec3.normalize(e,e);d=vec3.dot(e,vec3.subtract(vec3.create(),c,a))/vec3.dot(e,b);if(0<d){a=vec3.add(vec3.create(),a,vec3.scale(vec3.create(),b,d));var l=vec3.subtract(vec3.create(),a,c);c=vec3.dot(k,k);b=vec3.dot(k,h);var k=vec3.dot(k,l),n=vec3.dot(h,h),h=vec3.dot(h,l),l=c*n-b*b,n=(n*k-b*h)/l,h=(c*h-b*k)/l;if(0<=n&&0<=h&&1>=n+h)return new HitTest(d,a,e)}return null};Mesh.parseOBJ=function(a,b){b=b||
		{};for(var c=[],d=[],e=[],h=[],k=[],l=[],n=[],q={},r=0,p=null,v=null,u=0,s=0,w=v=0,y=0,z=0,x=null,C=!1,G=!1,O=!1,N=!1,M=0,L=b.noindex?b.noindex:1E7<a.length?!0:!1,H=b.flipAxis,I=H||b.flipNormals,A=null,D=[],B=a.split("\n"),E=B.length,K=0;K<E;++K)if(p=B[K].replace(/[ \t]+/g," ").replace(/\s\s*$/,""),"#"!=p[0]&&""!=p)if(x=p.split(" "),N&&"v"==x[0]&&(N=!1),"v"==x[0])H?k.push(-1*parseFloat(x[1]),parseFloat(x[3]),parseFloat(x[2])):k.push(parseFloat(x[1]),parseFloat(x[2]),parseFloat(x[3]));else if("vt"==
		x[0])l.push(parseFloat(x[1]),parseFloat(x[2]));else if("vn"==x[0])I?n.push(-parseFloat(x[2]),-parseFloat(x[3]),parseFloat(x[1])):n.push(parseFloat(x[1]),parseFloat(x[2]),parseFloat(x[3]));else if("f"==x[0]){if(N=!0,!(4>x.length)){for(var P=[],p=1;p<x.length;++p){if(!(x[p]in q)||L){v=x[p].split("/");if(1==v.length)v=s=u=parseInt(v[0])-1;else if(2==v.length)u=parseInt(v[0])-1,s=parseInt(v[1])-1,v=-1;else if(3==v.length)u=parseInt(v[0])-1,s=parseInt(v[1])-1,v=parseInt(v[2])-1;else return console.err("Problem parsing: unknown number of values per face"),
		!1;3<p&&L&&(w=c.length,c.push(c[w-9*(p-3)],c[w-9*(p-3)+1],c[w-9*(p-3)+2]),c.push(c[w-3],c[w-2],c[w-1]),w=d.length,d.push(d[w-6*(p-3)],d[w-6*(p-3)+1]),d.push(d[w-2],d[w-1]),w=e.length,e.push(e[w-9*(p-3)],e[w-9*(p-3)+1],e[w-9*(p-3)+2]),e.push(e[w-3],e[w-2],e[w-1]));z=y=w=0;3*u+2<k.length&&(C=!0,w=k[3*u+0],y=k[3*u+1],z=k[3*u+2]);c.push(w,y,z);y=w=0;2*s+1<l.length&&(G=!0,w=l[2*s+0],y=l[2*s+1]);d.push(w,y);y=w=0;z=1;-1!=v&&(3*v+2<n.length&&(O=!0,w=n[3*v+0],y=n[3*v+1],z=n[3*v+2]),e.push(w,y,z));L||(q[x[p]]=
		r++)}L||(u=q[x[p]],P.push(u),M<u&&(M=u))}if(!L)for(p=2;p<P.length;p++)h.push(P[0],P[p-1],P[p])}}else"g"==x[0]||"usemtl"==x[0]?1<x.length&&(null!=A&&(A.length=h.length-A.start,0<A.length&&D.push(A)),A={name:x[1],start:h.length,length:-1,material:""}):"usemtl"==x[0]&&A&&(A.material=x[1]);if(!k.length)return console.error("OBJ doesnt have vertices, maybe the file is not a OBJ"),null;A&&1<h.length-A.start&&(A.length=h.length-A.start,D.push(A));if((65536<M||L)&&0<h.length){console.log("Deindexing mesh...");
		k=new Float32Array(3*h.length);l=e&&e.length?new Float32Array(3*h.length):null;n=d&&d.length?new Float32Array(2*h.length):null;for(p=0;p<h.length;p+=1)k.set(c.slice(3*h[p],3*h[p]+3),3*p),l&&l.set(e.slice(3*h[p],3*h[p]+3),3*p),n&&n.set(d.slice(2*h[p],2*h[p]+2),2*p);c=k;l&&(e=l);n&&(d=n);h=null}p={};C&&(p.vertices=new Float32Array(c));O&&0<e.length&&(p.normals=new Float32Array(e));G&&0<d.length&&(p.coords=new Float32Array(d));h&&0<h.length&&(p.triangles=new Uint16Array(h));c={};1<D.length&&(c.groups=
		D);p.info=c;D=null;D=Mesh.load(p,null,b.mesh);D.updateBounding();return D};Mesh.parsers.obj=Mesh.parseOBJ.bind(Mesh);Mesh.encoders.obj=function(a,b){var c=a.getBuffer("vertices");if(!c)return null;for(var d="# Generated with liteGL.js by Javi Agenjo\n\n",c=c.data,e=0;e<c.length;e+=3)d+="v "+c[e].toFixed(4)+" "+c[e+1].toFixed(4)+" "+c[e+2].toFixed(4)+"\n";if(e=a.getBuffer("normals"))for(var d=d+"\n",h=e.data,e=0;e<h.length;e+=3)d+="vn "+h[e].toFixed(4)+" "+h[e+1].toFixed(4)+" "+h[e+2].toFixed(4)+"\n";
		if(e=a.getBuffer("coords"))for(d+="\n",h=e.data,e=0;e<h.length;e+=2)d+="vt "+h[e].toFixed(4)+" "+h[e+1].toFixed(4)+"  0.0000\n";d+="\ng mesh\n";if(e=a.getIndexBuffer("triangles"))for(c=e.data,e=0;e<c.length;e+=3)d+="f "+(c[e]+1)+"/"+(c[e]+1)+"/"+(c[e]+1)+" "+(c[e+1]+1)+"/"+(c[e+1]+1)+"/"+(c[e+1]+1)+" "+(c[e+2]+1)+"/"+(c[e+2]+1)+"/"+(c[e+2]+1)+"\n";else for(e=0;e<c.length/3;e+=3)d+="f "+(e+1)+"/"+(e+1)+"/"+(e+1)+" "+(e+2)+"/"+(e+2)+"/"+(e+2)+" "+(e+3)+"/"+(e+3)+"/"+(e+3)+"\n";return d}})("undefined"!=
typeof window?window:"undefined"!=typeof self?self:global);


(function(e){"use strict";var t={};typeof exports=="undefined"?typeof define=="function"&&typeof define.amd=="object"&&define.amd?(t.exports={},define(function(){return t.exports})):t.exports=typeof window!="undefined"?window:e:t.exports=exports,function(e){if(!t)var t=1e-6;if(!n)var n=typeof Float32Array!="undefined"?Float32Array:Array;if(!r)var r=Math.random;var i={};i.setMatrixArrayType=function(e){n=e},typeof e!="undefined"&&(e.glMatrix=i);var s=Math.PI/180;i.toRadian=function(e){return e*s};var o={};o.create=function(){var e=new n(2);return e[0]=0,e[1]=0,e},o.clone=function(e){var t=new n(2);return t[0]=e[0],t[1]=e[1],t},o.fromValues=function(e,t){var r=new n(2);return r[0]=e,r[1]=t,r},o.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e},o.set=function(e,t,n){return e[0]=t,e[1]=n,e},o.add=function(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e},o.subtract=function(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e},o.sub=o.subtract,o.multiply=function(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e},o.mul=o.multiply,o.divide=function(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e},o.div=o.divide,o.min=function(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e},o.max=function(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e},o.scale=function(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e},o.scaleAndAdd=function(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e},o.distance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1];return Math.sqrt(n*n+r*r)},o.dist=o.distance,o.squaredDistance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1];return n*n+r*r},o.sqrDist=o.squaredDistance,o.length=function(e){var t=e[0],n=e[1];return Math.sqrt(t*t+n*n)},o.len=o.length,o.squaredLength=function(e){var t=e[0],n=e[1];return t*t+n*n},o.sqrLen=o.squaredLength,o.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e},o.normalize=function(e,t){var n=t[0],r=t[1],i=n*n+r*r;return i>0&&(i=1/Math.sqrt(i),e[0]=t[0]*i,e[1]=t[1]*i),e},o.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]},o.cross=function(e,t,n){var r=t[0]*n[1]-t[1]*n[0];return e[0]=e[1]=0,e[2]=r,e},o.lerp=function(e,t,n,r){var i=t[0],s=t[1];return e[0]=i+r*(n[0]-i),e[1]=s+r*(n[1]-s),e},o.random=function(e,t){t=t||1;var n=r()*2*Math.PI;return e[0]=Math.cos(n)*t,e[1]=Math.sin(n)*t,e},o.transformMat2=function(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i,e[1]=n[1]*r+n[3]*i,e},o.transformMat2d=function(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[2]*i+n[4],e[1]=n[1]*r+n[3]*i+n[5],e},o.transformMat3=function(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[3]*i+n[6],e[1]=n[1]*r+n[4]*i+n[7],e},o.transformMat4=function(e,t,n){var r=t[0],i=t[1];return e[0]=n[0]*r+n[4]*i+n[12],e[1]=n[1]*r+n[5]*i+n[13],e},o.forEach=function(){var e=o.create();return function(t,n,r,i,s,o){var u,a;n||(n=2),r||(r=0),i?a=Math.min(i*n+r,t.length):a=t.length;for(u=r;u<a;u+=n)e[0]=t[u],e[1]=t[u+1],s(e,e,o),t[u]=e[0],t[u+1]=e[1];return t}}(),o.str=function(e){return"vec2("+e[0]+", "+e[1]+")"},typeof e!="undefined"&&(e.vec2=o);var u={};u.create=function(){var e=new n(3);return e[0]=0,e[1]=0,e[2]=0,e},u.clone=function(e){var t=new n(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t},u.fromValues=function(e,t,r){var i=new n(3);return i[0]=e,i[1]=t,i[2]=r,i},u.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e},u.set=function(e,t,n,r){return e[0]=t,e[1]=n,e[2]=r,e},u.add=function(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e},u.subtract=function(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e},u.sub=u.subtract,u.multiply=function(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e},u.mul=u.multiply,u.divide=function(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e},u.div=u.divide,u.min=function(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e},u.max=function(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e},u.scale=function(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e},u.scaleAndAdd=function(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e},u.distance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return Math.sqrt(n*n+r*r+i*i)},u.dist=u.distance,u.squaredDistance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2];return n*n+r*r+i*i},u.sqrDist=u.squaredDistance,u.length=function(e){var t=e[0],n=e[1],r=e[2];return Math.sqrt(t*t+n*n+r*r)},u.len=u.length,u.squaredLength=function(e){var t=e[0],n=e[1],r=e[2];return t*t+n*n+r*r},u.sqrLen=u.squaredLength,u.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e},u.normalize=function(e,t){var n=t[0],r=t[1],i=t[2],s=n*n+r*r+i*i;return s>0&&(s=1/Math.sqrt(s),e[0]=t[0]*s,e[1]=t[1]*s,e[2]=t[2]*s),e},u.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]},u.cross=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=n[0],u=n[1],a=n[2];return e[0]=i*a-s*u,e[1]=s*o-r*a,e[2]=r*u-i*o,e},u.lerp=function(e,t,n,r){var i=t[0],s=t[1],o=t[2];return e[0]=i+r*(n[0]-i),e[1]=s+r*(n[1]-s),e[2]=o+r*(n[2]-o),e},u.random=function(e,t){t=t||1;var n=r()*2*Math.PI,i=r()*2-1,s=Math.sqrt(1-i*i)*t;return e[0]=Math.cos(n)*s,e[1]=Math.sin(n)*s,e[2]=i*t,e},u.transformMat4=function(e,t,n){var r=t[0],i=t[1],s=t[2];return e[0]=n[0]*r+n[4]*i+n[8]*s+n[12],e[1]=n[1]*r+n[5]*i+n[9]*s+n[13],e[2]=n[2]*r+n[6]*i+n[10]*s+n[14],e},u.transformMat3=function(e,t,n){var r=t[0],i=t[1],s=t[2];return e[0]=r*n[0]+i*n[3]+s*n[6],e[1]=r*n[1]+i*n[4]+s*n[7],e[2]=r*n[2]+i*n[5]+s*n[8],e},u.transformQuat=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=n[0],u=n[1],a=n[2],f=n[3],l=f*r+u*s-a*i,c=f*i+a*r-o*s,h=f*s+o*i-u*r,p=-o*r-u*i-a*s;return e[0]=l*f+p*-o+c*-a-h*-u,e[1]=c*f+p*-u+h*-o-l*-a,e[2]=h*f+p*-a+l*-u-c*-o,e},u.rotateX=function(e,t,n,r){var i=[],s=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],s[0]=i[0],s[1]=i[1]*Math.cos(r)-i[2]*Math.sin(r),s[2]=i[1]*Math.sin(r)+i[2]*Math.cos(r),e[0]=s[0]+n[0],e[1]=s[1]+n[1],e[2]=s[2]+n[2],e},u.rotateY=function(e,t,n,r){var i=[],s=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],s[0]=i[2]*Math.sin(r)+i[0]*Math.cos(r),s[1]=i[1],s[2]=i[2]*Math.cos(r)-i[0]*Math.sin(r),e[0]=s[0]+n[0],e[1]=s[1]+n[1],e[2]=s[2]+n[2],e},u.rotateZ=function(e,t,n,r){var i=[],s=[];return i[0]=t[0]-n[0],i[1]=t[1]-n[1],i[2]=t[2]-n[2],s[0]=i[0]*Math.cos(r)-i[1]*Math.sin(r),s[1]=i[0]*Math.sin(r)+i[1]*Math.cos(r),s[2]=i[2],e[0]=s[0]+n[0],e[1]=s[1]+n[1],e[2]=s[2]+n[2],e},u.forEach=function(){var e=u.create();return function(t,n,r,i,s,o){var u,a;n||(n=3),r||(r=0),i?a=Math.min(i*n+r,t.length):a=t.length;for(u=r;u<a;u+=n)e[0]=t[u],e[1]=t[u+1],e[2]=t[u+2],s(e,e,o),t[u]=e[0],t[u+1]=e[1],t[u+2]=e[2];return t}}(),u.str=function(e){return"vec3("+e[0]+", "+e[1]+", "+e[2]+")"},typeof e!="undefined"&&(e.vec3=u);var a={};a.create=function(){var e=new n(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e},a.clone=function(e){var t=new n(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},a.fromValues=function(e,t,r,i){var s=new n(4);return s[0]=e,s[1]=t,s[2]=r,s[3]=i,s},a.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},a.set=function(e,t,n,r,i){return e[0]=t,e[1]=n,e[2]=r,e[3]=i,e},a.add=function(e,t,n){return e[0]=t[0]+n[0],e[1]=t[1]+n[1],e[2]=t[2]+n[2],e[3]=t[3]+n[3],e},a.subtract=function(e,t,n){return e[0]=t[0]-n[0],e[1]=t[1]-n[1],e[2]=t[2]-n[2],e[3]=t[3]-n[3],e},a.sub=a.subtract,a.multiply=function(e,t,n){return e[0]=t[0]*n[0],e[1]=t[1]*n[1],e[2]=t[2]*n[2],e[3]=t[3]*n[3],e},a.mul=a.multiply,a.divide=function(e,t,n){return e[0]=t[0]/n[0],e[1]=t[1]/n[1],e[2]=t[2]/n[2],e[3]=t[3]/n[3],e},a.div=a.divide,a.min=function(e,t,n){return e[0]=Math.min(t[0],n[0]),e[1]=Math.min(t[1],n[1]),e[2]=Math.min(t[2],n[2]),e[3]=Math.min(t[3],n[3]),e},a.max=function(e,t,n){return e[0]=Math.max(t[0],n[0]),e[1]=Math.max(t[1],n[1]),e[2]=Math.max(t[2],n[2]),e[3]=Math.max(t[3],n[3]),e},a.scale=function(e,t,n){return e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e[3]=t[3]*n,e},a.scaleAndAdd=function(e,t,n,r){return e[0]=t[0]+n[0]*r,e[1]=t[1]+n[1]*r,e[2]=t[2]+n[2]*r,e[3]=t[3]+n[3]*r,e},a.distance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],s=t[3]-e[3];return Math.sqrt(n*n+r*r+i*i+s*s)},a.dist=a.distance,a.squaredDistance=function(e,t){var n=t[0]-e[0],r=t[1]-e[1],i=t[2]-e[2],s=t[3]-e[3];return n*n+r*r+i*i+s*s},a.sqrDist=a.squaredDistance,a.length=function(e){var t=e[0],n=e[1],r=e[2],i=e[3];return Math.sqrt(t*t+n*n+r*r+i*i)},a.len=a.length,a.squaredLength=function(e){var t=e[0],n=e[1],r=e[2],i=e[3];return t*t+n*n+r*r+i*i},a.sqrLen=a.squaredLength,a.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e},a.normalize=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=n*n+r*r+i*i+s*s;return o>0&&(o=1/Math.sqrt(o),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e[3]=t[3]*o),e},a.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]},a.lerp=function(e,t,n,r){var i=t[0],s=t[1],o=t[2],u=t[3];return e[0]=i+r*(n[0]-i),e[1]=s+r*(n[1]-s),e[2]=o+r*(n[2]-o),e[3]=u+r*(n[3]-u),e},a.random=function(e,t){return t=t||1,e[0]=r(),e[1]=r(),e[2]=r(),e[3]=r(),a.normalize(e,e),a.scale(e,e,t),e},a.transformMat4=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3];return e[0]=n[0]*r+n[4]*i+n[8]*s+n[12]*o,e[1]=n[1]*r+n[5]*i+n[9]*s+n[13]*o,e[2]=n[2]*r+n[6]*i+n[10]*s+n[14]*o,e[3]=n[3]*r+n[7]*i+n[11]*s+n[15]*o,e},a.transformQuat=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=n[0],u=n[1],a=n[2],f=n[3],l=f*r+u*s-a*i,c=f*i+a*r-o*s,h=f*s+o*i-u*r,p=-o*r-u*i-a*s;return e[0]=l*f+p*-o+c*-a-h*-u,e[1]=c*f+p*-u+h*-o-l*-a,e[2]=h*f+p*-a+l*-u-c*-o,e},a.forEach=function(){var e=a.create();return function(t,n,r,i,s,o){var u,a;n||(n=4),r||(r=0),i?a=Math.min(i*n+r,t.length):a=t.length;for(u=r;u<a;u+=n)e[0]=t[u],e[1]=t[u+1],e[2]=t[u+2],e[3]=t[u+3],s(e,e,o),t[u]=e[0],t[u+1]=e[1],t[u+2]=e[2],t[u+3]=e[3];return t}}(),a.str=function(e){return"vec4("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},typeof e!="undefined"&&(e.vec4=a);var f={};f.create=function(){var e=new n(4);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e},f.clone=function(e){var t=new n(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},f.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},f.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e},f.transpose=function(e,t){if(e===t){var n=t[1];e[1]=t[2],e[2]=n}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e},f.invert=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=n*s-i*r;return o?(o=1/o,e[0]=s*o,e[1]=-r*o,e[2]=-i*o,e[3]=n*o,e):null},f.adjoint=function(e,t){var n=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=n,e},f.determinant=function(e){return e[0]*e[3]-e[2]*e[1]},f.multiply=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=n[0],a=n[1],f=n[2],l=n[3];return e[0]=r*u+s*a,e[1]=i*u+o*a,e[2]=r*f+s*l,e[3]=i*f+o*l,e},f.mul=f.multiply,f.rotate=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=Math.sin(n),a=Math.cos(n);return e[0]=r*a+s*u,e[1]=i*a+o*u,e[2]=r*-u+s*a,e[3]=i*-u+o*a,e},f.scale=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=n[0],a=n[1];return e[0]=r*u,e[1]=i*u,e[2]=s*a,e[3]=o*a,e},f.str=function(e){return"mat2("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},f.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2))},f.LDU=function(e,t,n,r){return e[2]=r[2]/r[0],n[0]=r[0],n[1]=r[1],n[3]=r[3]-e[2]*n[1],[e,t,n]},typeof e!="undefined"&&(e.mat2=f);var l={};l.create=function(){var e=new n(6);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},l.clone=function(e){var t=new n(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t},l.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e},l.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},l.invert=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=n*s-r*i;return a?(a=1/a,e[0]=s*a,e[1]=-r*a,e[2]=-i*a,e[3]=n*a,e[4]=(i*u-s*o)*a,e[5]=(r*o-n*u)*a,e):null},l.determinant=function(e){return e[0]*e[3]-e[1]*e[2]},l.multiply=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=n[0],l=n[1],c=n[2],h=n[3],p=n[4],d=n[5];return e[0]=r*f+s*l,e[1]=i*f+o*l,e[2]=r*c+s*h,e[3]=i*c+o*h,e[4]=r*p+s*d+u,e[5]=i*p+o*d+a,e},l.mul=l.multiply,l.rotate=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=Math.sin(n),l=Math.cos(n);return e[0]=r*l+s*f,e[1]=i*l+o*f,e[2]=r*-f+s*l,e[3]=i*-f+o*l,e[4]=u,e[5]=a,e},l.scale=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=n[0],l=n[1];return e[0]=r*f,e[1]=i*f,e[2]=s*l,e[3]=o*l,e[4]=u,e[5]=a,e},l.translate=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=n[0],l=n[1];return e[0]=r,e[1]=i,e[2]=s,e[3]=o,e[4]=r*f+s*l+u,e[5]=i*f+o*l+a,e},l.str=function(e){return"mat2d("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+")"},l.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+1)},typeof e!="undefined"&&(e.mat2d=l);var c={};c.create=function(){var e=new n(9);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},c.fromMat4=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e},c.clone=function(e){var t=new n(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t},c.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},c.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},c.transpose=function(e,t){if(e===t){var n=t[1],r=t[2],i=t[5];e[1]=t[3],e[2]=t[6],e[3]=n,e[5]=t[7],e[6]=r,e[7]=i}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e},c.invert=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=t[6],f=t[7],l=t[8],c=l*o-u*f,h=-l*s+u*a,p=f*s-o*a,d=n*c+r*h+i*p;return d?(d=1/d,e[0]=c*d,e[1]=(-l*r+i*f)*d,e[2]=(u*r-i*o)*d,e[3]=h*d,e[4]=(l*n-i*a)*d,e[5]=(-u*n+i*s)*d,e[6]=p*d,e[7]=(-f*n+r*a)*d,e[8]=(o*n-r*s)*d,e):null},c.adjoint=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=t[6],f=t[7],l=t[8];return e[0]=o*l-u*f,e[1]=i*f-r*l,e[2]=r*u-i*o,e[3]=u*a-s*l,e[4]=n*l-i*a,e[5]=i*s-n*u,e[6]=s*f-o*a,e[7]=r*a-n*f,e[8]=n*o-r*s,e},c.determinant=function(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=e[6],a=e[7],f=e[8];return t*(f*s-o*a)+n*(-f*i+o*u)+r*(a*i-s*u)},c.multiply=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=t[6],l=t[7],c=t[8],h=n[0],p=n[1],d=n[2],v=n[3],m=n[4],g=n[5],y=n[6],b=n[7],w=n[8];return e[0]=h*r+p*o+d*f,e[1]=h*i+p*u+d*l,e[2]=h*s+p*a+d*c,e[3]=v*r+m*o+g*f,e[4]=v*i+m*u+g*l,e[5]=v*s+m*a+g*c,e[6]=y*r+b*o+w*f,e[7]=y*i+b*u+w*l,e[8]=y*s+b*a+w*c,e},c.mul=c.multiply,c.translate=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=t[6],l=t[7],c=t[8],h=n[0],p=n[1];return e[0]=r,e[1]=i,e[2]=s,e[3]=o,e[4]=u,e[5]=a,e[6]=h*r+p*o+f,e[7]=h*i+p*u+l,e[8]=h*s+p*a+c,e},c.rotate=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=t[6],l=t[7],c=t[8],h=Math.sin(n),p=Math.cos(n);return e[0]=p*r+h*o,e[1]=p*i+h*u,e[2]=p*s+h*a,e[3]=p*o-h*r,e[4]=p*u-h*i,e[5]=p*a-h*s,e[6]=f,e[7]=l,e[8]=c,e},c.scale=function(e,t,n){var r=n[0],i=n[1];return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=i*t[3],e[4]=i*t[4],e[5]=i*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},c.fromMat2d=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e},c.fromQuat=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=n+n,u=r+r,a=i+i,f=n*o,l=r*o,c=r*u,h=i*o,p=i*u,d=i*a,v=s*o,m=s*u,g=s*a;return e[0]=1-c-d,e[3]=l-g,e[6]=h+m,e[1]=l+g,e[4]=1-f-d,e[7]=p-v,e[2]=h-m,e[5]=p+v,e[8]=1-f-c,e},c.normalFromMat4=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=t[6],f=t[7],l=t[8],c=t[9],h=t[10],p=t[11],d=t[12],v=t[13],m=t[14],g=t[15],y=n*u-r*o,b=n*a-i*o,w=n*f-s*o,E=r*a-i*u,S=r*f-s*u,x=i*f-s*a,T=l*v-c*d,N=l*m-h*d,C=l*g-p*d,k=c*m-h*v,L=c*g-p*v,A=h*g-p*m,O=y*A-b*L+w*k+E*C-S*N+x*T;return O?(O=1/O,e[0]=(u*A-a*L+f*k)*O,e[1]=(a*C-o*A-f*N)*O,e[2]=(o*L-u*C+f*T)*O,e[3]=(i*L-r*A-s*k)*O,e[4]=(n*A-i*C+s*N)*O,e[5]=(r*C-n*L-s*T)*O,e[6]=(v*x-m*S+g*E)*O,e[7]=(m*w-d*x-g*b)*O,e[8]=(d*S-v*w+g*y)*O,e):null},c.str=function(e){return"mat3("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+", "+e[6]+", "+e[7]+", "+e[8]+")"},c.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2))},typeof e!="undefined"&&(e.mat3=c);var h={};h.create=function(){var e=new n(16);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},h.clone=function(e){var t=new n(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},h.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},h.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},h.transpose=function(e,t){if(e===t){var n=t[1],r=t[2],i=t[3],s=t[6],o=t[7],u=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=n,e[6]=t[9],e[7]=t[13],e[8]=r,e[9]=s,e[11]=t[14],e[12]=i,e[13]=o,e[14]=u}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e},h.invert=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=t[6],f=t[7],l=t[8],c=t[9],h=t[10],p=t[11],d=t[12],v=t[13],m=t[14],g=t[15],y=n*u-r*o,b=n*a-i*o,w=n*f-s*o,E=r*a-i*u,S=r*f-s*u,x=i*f-s*a,T=l*v-c*d,N=l*m-h*d,C=l*g-p*d,k=c*m-h*v,L=c*g-p*v,A=h*g-p*m,O=y*A-b*L+w*k+E*C-S*N+x*T;return O?(O=1/O,e[0]=(u*A-a*L+f*k)*O,e[1]=(i*L-r*A-s*k)*O,e[2]=(v*x-m*S+g*E)*O,e[3]=(h*S-c*x-p*E)*O,e[4]=(a*C-o*A-f*N)*O,e[5]=(n*A-i*C+s*N)*O,e[6]=(m*w-d*x-g*b)*O,e[7]=(l*x-h*w+p*b)*O,e[8]=(o*L-u*C+f*T)*O,e[9]=(r*C-n*L-s*T)*O,e[10]=(d*S-v*w+g*y)*O,e[11]=(c*w-l*S-p*y)*O,e[12]=(u*N-o*k-a*T)*O,e[13]=(n*k-r*N+i*T)*O,e[14]=(v*b-d*E-m*y)*O,e[15]=(l*E-c*b+h*y)*O,e):null},h.adjoint=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=t[4],u=t[5],a=t[6],f=t[7],l=t[8],c=t[9],h=t[10],p=t[11],d=t[12],v=t[13],m=t[14],g=t[15];return e[0]=u*(h*g-p*m)-c*(a*g-f*m)+v*(a*p-f*h),e[1]=-(r*(h*g-p*m)-c*(i*g-s*m)+v*(i*p-s*h)),e[2]=r*(a*g-f*m)-u*(i*g-s*m)+v*(i*f-s*a),e[3]=-(r*(a*p-f*h)-u*(i*p-s*h)+c*(i*f-s*a)),e[4]=-(o*(h*g-p*m)-l*(a*g-f*m)+d*(a*p-f*h)),e[5]=n*(h*g-p*m)-l*(i*g-s*m)+d*(i*p-s*h),e[6]=-(n*(a*g-f*m)-o*(i*g-s*m)+d*(i*f-s*a)),e[7]=n*(a*p-f*h)-o*(i*p-s*h)+l*(i*f-s*a),e[8]=o*(c*g-p*v)-l*(u*g-f*v)+d*(u*p-f*c),e[9]=-(n*(c*g-p*v)-l*(r*g-s*v)+d*(r*p-s*c)),e[10]=n*(u*g-f*v)-o*(r*g-s*v)+d*(r*f-s*u),e[11]=-(n*(u*p-f*c)-o*(r*p-s*c)+l*(r*f-s*u)),e[12]=-(o*(c*m-h*v)-l*(u*m-a*v)+d*(u*h-a*c)),e[13]=n*(c*m-h*v)-l*(r*m-i*v)+d*(r*h-i*c),e[14]=-(n*(u*m-a*v)-o*(r*m-i*v)+d*(r*a-i*u)),e[15]=n*(u*h-a*c)-o*(r*h-i*c)+l*(r*a-i*u),e},h.determinant=function(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=e[6],a=e[7],f=e[8],l=e[9],c=e[10],h=e[11],p=e[12],d=e[13],v=e[14],m=e[15],g=t*o-n*s,y=t*u-r*s,b=t*a-i*s,w=n*u-r*o,E=n*a-i*o,S=r*a-i*u,x=f*d-l*p,T=f*v-c*p,N=f*m-h*p,C=l*v-c*d,k=l*m-h*d,L=c*m-h*v;return g*L-y*k+b*C+w*N-E*T+S*x},h.multiply=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=t[4],a=t[5],f=t[6],l=t[7],c=t[8],h=t[9],p=t[10],d=t[11],v=t[12],m=t[13],g=t[14],y=t[15],b=n[0],w=n[1],E=n[2],S=n[3];return e[0]=b*r+w*u+E*c+S*v,e[1]=b*i+w*a+E*h+S*m,e[2]=b*s+w*f+E*p+S*g,e[3]=b*o+w*l+E*d+S*y,b=n[4],w=n[5],E=n[6],S=n[7],e[4]=b*r+w*u+E*c+S*v,e[5]=b*i+w*a+E*h+S*m,e[6]=b*s+w*f+E*p+S*g,e[7]=b*o+w*l+E*d+S*y,b=n[8],w=n[9],E=n[10],S=n[11],e[8]=b*r+w*u+E*c+S*v,e[9]=b*i+w*a+E*h+S*m,e[10]=b*s+w*f+E*p+S*g,e[11]=b*o+w*l+E*d+S*y,b=n[12],w=n[13],E=n[14],S=n[15],e[12]=b*r+w*u+E*c+S*v,e[13]=b*i+w*a+E*h+S*m,e[14]=b*s+w*f+E*p+S*g,e[15]=b*o+w*l+E*d+S*y,e},h.mul=h.multiply,h.translate=function(e,t,n){var r=n[0],i=n[1],s=n[2],o,u,a,f,l,c,h,p,d,v,m,g;return t===e?(e[12]=t[0]*r+t[4]*i+t[8]*s+t[12],e[13]=t[1]*r+t[5]*i+t[9]*s+t[13],e[14]=t[2]*r+t[6]*i+t[10]*s+t[14],e[15]=t[3]*r+t[7]*i+t[11]*s+t[15]):(o=t[0],u=t[1],a=t[2],f=t[3],l=t[4],c=t[5],h=t[6],p=t[7],d=t[8],v=t[9],m=t[10],g=t[11],e[0]=o,e[1]=u,e[2]=a,e[3]=f,e[4]=l,e[5]=c,e[6]=h,e[7]=p,e[8]=d,e[9]=v,e[10]=m,e[11]=g,e[12]=o*r+l*i+d*s+t[12],e[13]=u*r+c*i+v*s+t[13],e[14]=a*r+h*i+m*s+t[14],e[15]=f*r+p*i+g*s+t[15]),e},h.scale=function(e,t,n){var r=n[0],i=n[1],s=n[2];return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*s,e[9]=t[9]*s,e[10]=t[10]*s,e[11]=t[11]*s,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},h.rotate=function(e,n,r,i){var s=i[0],o=i[1],u=i[2],a=Math.sqrt(s*s+o*o+u*u),f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_;return Math.abs(a)<t?null:(a=1/a,s*=a,o*=a,u*=a,f=Math.sin(r),l=Math.cos(r),c=1-l,h=n[0],p=n[1],d=n[2],v=n[3],m=n[4],g=n[5],y=n[6],b=n[7],w=n[8],E=n[9],S=n[10],x=n[11],T=s*s*c+l,N=o*s*c+u*f,C=u*s*c-o*f,k=s*o*c-u*f,L=o*o*c+l,A=u*o*c+s*f,O=s*u*c+o*f,M=o*u*c-s*f,_=u*u*c+l,e[0]=h*T+m*N+w*C,e[1]=p*T+g*N+E*C,e[2]=d*T+y*N+S*C,e[3]=v*T+b*N+x*C,e[4]=h*k+m*L+w*A,e[5]=p*k+g*L+E*A,e[6]=d*k+y*L+S*A,e[7]=v*k+b*L+x*A,e[8]=h*O+m*M+w*_,e[9]=p*O+g*M+E*_,e[10]=d*O+y*M+S*_,e[11]=v*O+b*M+x*_,n!==e&&(e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15]),e)},h.rotateX=function(e,t,n){var r=Math.sin(n),i=Math.cos(n),s=t[4],o=t[5],u=t[6],a=t[7],f=t[8],l=t[9],c=t[10],h=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=s*i+f*r,e[5]=o*i+l*r,e[6]=u*i+c*r,e[7]=a*i+h*r,e[8]=f*i-s*r,e[9]=l*i-o*r,e[10]=c*i-u*r,e[11]=h*i-a*r,e},h.rotateY=function(e,t,n){var r=Math.sin(n),i=Math.cos(n),s=t[0],o=t[1],u=t[2],a=t[3],f=t[8],l=t[9],c=t[10],h=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i-f*r,e[1]=o*i-l*r,e[2]=u*i-c*r,e[3]=a*i-h*r,e[8]=s*r+f*i,e[9]=o*r+l*i,e[10]=u*r+c*i,e[11]=a*r+h*i,e},h.rotateZ=function(e,t,n){var r=Math.sin(n),i=Math.cos(n),s=t[0],o=t[1],u=t[2],a=t[3],f=t[4],l=t[5],c=t[6],h=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=s*i+f*r,e[1]=o*i+l*r,e[2]=u*i+c*r,e[3]=a*i+h*r,e[4]=f*i-s*r,e[5]=l*i-o*r,e[6]=c*i-u*r,e[7]=h*i-a*r,e},h.fromRotationTranslation=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=r+r,a=i+i,f=s+s,l=r*u,c=r*a,h=r*f,p=i*a,d=i*f,v=s*f,m=o*u,g=o*a,y=o*f;return e[0]=1-(p+v),e[1]=c+y,e[2]=h-g,e[3]=0,e[4]=c-y,e[5]=1-(l+v),e[6]=d+m,e[7]=0,e[8]=h+g,e[9]=d-m,e[10]=1-(l+p),e[11]=0,e[12]=n[0],e[13]=n[1],e[14]=n[2],e[15]=1,e},h.fromQuat=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=n+n,u=r+r,a=i+i,f=n*o,l=r*o,c=r*u,h=i*o,p=i*u,d=i*a,v=s*o,m=s*u,g=s*a;return e[0]=1-c-d,e[1]=l+g,e[2]=h-m,e[3]=0,e[4]=l-g,e[5]=1-f-d,e[6]=p+v,e[7]=0,e[8]=h+m,e[9]=p-v,e[10]=1-f-c,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},h.frustum=function(e,t,n,r,i,s,o){var u=1/(n-t),a=1/(i-r),f=1/(s-o);return e[0]=s*2*u,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s*2*a,e[6]=0,e[7]=0,e[8]=(n+t)*u,e[9]=(i+r)*a,e[10]=(o+s)*f,e[11]=-1,e[12]=0,e[13]=0,e[14]=o*s*2*f,e[15]=0,e},h.perspective=function(e,t,n,r,i){var s=1/Math.tan(t/2),o=1/(r-i);return e[0]=s/n,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=s,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(i+r)*o,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*i*r*o,e[15]=0,e},h.ortho=function(e,t,n,r,i,s,o){var u=1/(t-n),a=1/(r-i),f=1/(s-o);return e[0]=-2*u,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*f,e[11]=0,e[12]=(t+n)*u,e[13]=(i+r)*a,e[14]=(o+s)*f,e[15]=1,e},h.lookAt=function(e,n,r,i){var s,o,u,a,f,l,c,p,d,v,m=n[0],g=n[1],y=n[2],b=i[0],w=i[1],E=i[2],S=r[0],x=r[1],T=r[2];return Math.abs(m-S)<t&&Math.abs(g-x)<t&&Math.abs(y-T)<t?h.identity(e):(c=m-S,p=g-x,d=y-T,v=1/Math.sqrt(c*c+p*p+d*d),c*=v,p*=v,d*=v,s=w*d-E*p,o=E*c-b*d,u=b*p-w*c,v=Math.sqrt(s*s+o*o+u*u),v?(v=1/v,s*=v,o*=v,u*=v):(s=0,o=0,u=0),a=p*u-d*o,f=d*s-c*u,l=c*o-p*s,v=Math.sqrt(a*a+f*f+l*l),v?(v=1/v,a*=v,f*=v,l*=v):(a=0,f=0,l=0),e[0]=s,e[1]=a,e[2]=c,e[3]=0,e[4]=o,e[5]=f,e[6]=p,e[7]=0,e[8]=u,e[9]=l,e[10]=d,e[11]=0,e[12]=-(s*m+o*g+u*y),e[13]=-(a*m+f*g+l*y),e[14]=-(c*m+p*g+d*y),e[15]=1,e)},h.str=function(e){return"mat4("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+", "+e[4]+", "+e[5]+", "+e[6]+", "+e[7]+", "+e[8]+", "+e[9]+", "+e[10]+", "+e[11]+", "+e[12]+", "+e[13]+", "+e[14]+", "+e[15]+")"},h.frob=function(e){return Math.sqrt(Math.pow(e[0],2)+Math.pow(e[1],2)+Math.pow(e[2],2)+Math.pow(e[3],2)+Math.pow(e[4],2)+Math.pow(e[5],2)+Math.pow(e[6],2)+Math.pow(e[6],2)+Math.pow(e[7],2)+Math.pow(e[8],2)+Math.pow(e[9],2)+Math.pow(e[10],2)+Math.pow(e[11],2)+Math.pow(e[12],2)+Math.pow(e[13],2)+Math.pow(e[14],2)+Math.pow(e[15],2))},typeof e!="undefined"&&(e.mat4=h);var p={};p.create=function(){var e=new n(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},p.rotationTo=function(){var e=u.create(),t=u.fromValues(1,0,0),n=u.fromValues(0,1,0);return function(r,i,s){var o=u.dot(i,s);return o<-0.999999?(u.cross(e,t,i),u.length(e)<1e-6&&u.cross(e,n,i),u.normalize(e,e),p.setAxisAngle(r,e,Math.PI),r):o>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(u.cross(e,i,s),r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=1+o,p.normalize(r,r))}}(),p.setAxes=function(){var e=c.create();return function(t,n,r,i){return e[0]=r[0],e[3]=r[1],e[6]=r[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-n[0],e[5]=-n[1],e[8]=-n[2],p.normalize(t,p.fromMat3(t,e))}}(),p.clone=a.clone,p.fromValues=a.fromValues,p.copy=a.copy,p.set=a.set,p.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},p.setAxisAngle=function(e,t,n){n*=.5;var r=Math.sin(n);return e[0]=r*t[0],e[1]=r*t[1],e[2]=r*t[2],e[3]=Math.cos(n),e},p.add=a.add,p.multiply=function(e,t,n){var r=t[0],i=t[1],s=t[2],o=t[3],u=n[0],a=n[1],f=n[2],l=n[3];return e[0]=r*l+o*u+i*f-s*a,e[1]=i*l+o*a+s*u-r*f,e[2]=s*l+o*f+r*a-i*u,e[3]=o*l-r*u-i*a-s*f,e},p.mul=p.multiply,p.scale=a.scale,p.rotateX=function(e,t,n){n*=.5;var r=t[0],i=t[1],s=t[2],o=t[3],u=Math.sin(n),a=Math.cos(n);return e[0]=r*a+o*u,e[1]=i*a+s*u,e[2]=s*a-i*u,e[3]=o*a-r*u,e},p.rotateY=function(e,t,n){n*=.5;var r=t[0],i=t[1],s=t[2],o=t[3],u=Math.sin(n),a=Math.cos(n);return e[0]=r*a-s*u,e[1]=i*a+o*u,e[2]=s*a+r*u,e[3]=o*a-i*u,e},p.rotateZ=function(e,t,n){n*=.5;var r=t[0],i=t[1],s=t[2],o=t[3],u=Math.sin(n),a=Math.cos(n);return e[0]=r*a+i*u,e[1]=i*a-r*u,e[2]=s*a+o*u,e[3]=o*a-s*u,e},p.calculateW=function(e,t){var n=t[0],r=t[1],i=t[2];return e[0]=n,e[1]=r,e[2]=i,e[3]=-Math.sqrt(Math.abs(1-n*n-r*r-i*i)),e},p.dot=a.dot,p.lerp=a.lerp,p.slerp=function(e,t,n,r){var i=t[0],s=t[1],o=t[2],u=t[3],a=n[0],f=n[1],l=n[2],c=n[3],h,p,d,v,m;return p=i*a+s*f+o*l+u*c,p<0&&(p=-p,a=-a,f=-f,l=-l,c=-c),1-p>1e-6?(h=Math.acos(p),d=Math.sin(h),v=Math.sin((1-r)*h)/d,m=Math.sin(r*h)/d):(v=1-r,m=r),e[0]=v*i+m*a,e[1]=v*s+m*f,e[2]=v*o+m*l,e[3]=v*u+m*c,e},p.invert=function(e,t){var n=t[0],r=t[1],i=t[2],s=t[3],o=n*n+r*r+i*i+s*s,u=o?1/o:0;return e[0]=-n*u,e[1]=-r*u,e[2]=-i*u,e[3]=s*u,e},p.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e},p.length=a.length,p.len=p.length,p.squaredLength=a.squaredLength,p.sqrLen=p.squaredLength,p.normalize=a.normalize,p.fromMat3=function(e,t){var n=t[0]+t[4]+t[8],r;if(n>0)r=Math.sqrt(n+1),e[3]=.5*r,r=.5/r,e[0]=(t[7]-t[5])*r,e[1]=(t[2]-t[6])*r,e[2]=(t[3]-t[1])*r;else{var i=0;t[4]>t[0]&&(i=1),t[8]>t[i*3+i]&&(i=2);var s=(i+1)%3,o=(i+2)%3;r=Math.sqrt(t[i*3+i]-t[s*3+s]-t[o*3+o]+1),e[i]=.5*r,r=.5/r,e[3]=(t[o*3+s]-t[s*3+o])*r,e[s]=(t[s*3+i]+t[i*3+s])*r,e[o]=(t[o*3+i]+t[i*3+o])*r}return e},p.str=function(e){return"quat("+e[0]+", "+e[1]+", "+e[2]+", "+e[3]+")"},typeof e!="undefined"&&(e.quat=p)}(t.exports)})(this);

if(typeof(GL) == "undefined")
	throw("litegl.js must be included to use enableWebGLCanvas");

export default function enableWebGLCanvas( canvas, options )
{
	var gl;
	options = options || {};

	// Detect if canvas is WebGL enabled and get context if possible
	if(!canvas.is_webgl)
	{
		options.canvas = canvas;
		options.alpha = true;
		options.stencil = true;
		try {
			gl = GL.create(options);
		} catch(e) {
			console.log("This canvas cannot be used as WebGL, maybe WebGL is not supported or this canvas has already a 2D context associated");
			gl = canvas.getContext("2d", options);
			return gl;
       	}
	}
	else
		gl = canvas.gl;


	// Return if canvas is already canvas2DtoWebGL enabled
	if(canvas.canvas2DtoWebGL_enabled)
		return gl;

	//settings
	var curveSubdivisions = 50;
	var max_points = 10000; //max amount of vertex allowed to have in a single primitive
	var max_characters = 1000; //max amount of characters allowed to have in a single fillText

	//flag it for future uses
	canvas.canvas2DtoWebGL_enabled = true;

	var prev_gl = null;

	var ctx = canvas.ctx = gl;
	ctx.WebGLCanvas = {};
	var white = vec4.fromValues(1,1,1,1);

	//reusing same buffer
	var global_index = 0;
	var global_vertices = new Float32Array( max_points * 3 );
	var global_mesh = new GL.Mesh();
	var global_buffer = global_mesh.createVertexBuffer("vertices", null, null, global_vertices, gl.STREAM_DRAW );
	var quad_mesh = GL.Mesh.getScreenQuad();
	var circle_mesh = GL.Mesh.circle({size:1});
	var extra_projection = mat4.create();
	var stencil_enabled = false;
	var anisotropic = options.anisotropic !== undefined ? options.anisotropic : 2;

	var uniforms = {
		u_texture: 0
	};

	var extra_macros = {};
	if(options.allow3D)
		extra_macros.EXTRA_PROJECTION = "";

	//used to store font atlas textures (images are not stored here)
	var textures = gl.WebGLCanvas.textures_atlas = {};
	gl.WebGLCanvas.clearAtlas = function()
	{
		textures = gl.WebGLCanvas.textures_atlas = {};
	}

	var vertex_shader = null;
	var	flat_shader = null;
	var	texture_shader = null;
	var flat_primitive_shader = null;
	var textured_transform_shader = null;
	var textured_primitive_shader = null;
	var gradient_primitive_shader = null;
	var	point_text_shader = null;

	gl.WebGLCanvas.set3DMatrix = function(matrix)
	{
		if(!matrix)
			mat4.identity( extra_projection );
		else
			extra_projection.set( matrix );
		if(extra_macros.EXTRA_PROJECTION == null)
		{
			extra_macros.EXTRA_PROJECTION = "";
			compileShaders();
			uniforms.u_projection = extra_projection;
		}
		uniforms.u_projection_enabled = !!matrix;
	}

	compileShaders();

	function compileShaders()
	{
		vertex_shader = "\n\
				precision highp float;\n\
				attribute vec3 a_vertex;\n\
				uniform vec2 u_viewport;\n\
				uniform mat3 u_transform;\n\
				#ifdef EXTRA_PROJECTION\n\
					uniform bool u_projection_enabled;\n\
					uniform mat4 u_projection;\n\
				#endif\n\
				varying float v_visible;\n\
				void main() { \n\
					vec3 pos = a_vertex;\n\
					v_visible = pos.z;\n\
					pos = u_transform * vec3(pos.xy,1.0);\n\
					pos.z = 0.0;\n\
					#ifdef EXTRA_PROJECTION\n\
						if(u_projection_enabled)\n\
						{\n\
							gl_Position = u_projection * vec4(pos.xy,0.0,1.0);\n\
							return;\n\
						}\n\
					#endif\n\
					//normalize\n\
					pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\
					pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\
					gl_Position = vec4(pos, 1.0); \n\
				}\n\
				";

		vertex_shader2 = "\n\
			precision highp float;\n\
			attribute vec3 a_vertex;\n\
			attribute vec2 a_coord;\n\
			varying vec2 v_coord;\n\
			uniform vec2 u_position;\n\
			uniform vec2 u_size;\n\
			uniform vec2 u_viewport;\n\
			uniform mat3 u_transform;\n\
			#ifdef EXTRA_PROJECTION\n\
				uniform bool u_projection_enabled;\n\
				uniform mat4 u_projection;\n\
			#endif\n\
			void main() { \n\
				vec3 pos = vec3(u_position + vec2(a_coord.x,1.0 - a_coord.y)  * u_size, 1.0);\n\
				v_coord = a_coord; \n\
				pos = u_transform * pos;\n\
				pos.z = 0.0;\n\
				#ifdef EXTRA_PROJECTION\n\
					if(u_projection_enabled)\n\
					{\n\
						gl_Position = u_projection * vec4(pos.xy,0.0,1.0);\n\
						return;\n\
					}\n\
				#endif\n\
				//normalize\n\
				pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\
				pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\
				gl_Position = vec4(pos, 1.0); \n\
			}\n\
		";

		//flat_shader = new GL.Shader( GL.Shader.QUAD_VERTEX_SHADER, GL.Shader.FLAT_FRAGMENT_SHADER );
		//texture_shader = new GL.Shader( GL.Shader.QUAD_VERTEX_SHADER, GL.Shader.SCREEN_COLORED_FRAGMENT_SHADER );

		flat_shader = new GL.Shader(vertex_shader2,"\n\
				precision highp float;\n\
				uniform vec4 u_color;\n\
				void main() {\n\
					gl_FragColor = u_color;\n\
				}\n\
			", extra_macros );

		texture_shader = new GL.Shader(vertex_shader2,"\n\
				precision highp float;\n\
				varying vec2 v_coord;\n\
				uniform vec4 u_color;\n\
				uniform sampler2D u_texture;\n\
				void main() {\n\
					gl_FragColor = u_color * texture2D( u_texture, v_coord );\n\
				}\n\
			", extra_macros );


		flat_primitive_shader = new GL.Shader(vertex_shader,"\n\
				precision highp float;\n\
				varying float v_visible;\n\
				uniform vec4 u_color;\n\
				void main() {\n\
					if (v_visible == 0.0)\n\
						discard;\n\
					gl_FragColor = u_color;\n\
				}\n\
			", extra_macros );

		textured_transform_shader = new GL.Shader(GL.Shader.QUAD_VERTEX_SHADER,"\n\
				precision highp float;\n\
				uniform sampler2D u_texture;\n\
				uniform vec4 u_color;\n\
				uniform vec4 u_texture_transform;\n\
				varying vec2 v_coord;\n\
				void main() {\n\
					vec2 uv = v_coord * u_texture_transform.zw + vec2(u_texture_transform.x,0.0);\n\
					uv.y = uv.y - u_texture_transform.y + (1.0 - u_texture_transform.w);\n\
					uv = clamp(uv,vec2(0.0),vec2(1.0));\n\
					gl_FragColor = u_color * texture2D(u_texture, uv);\n\
				}\n\
			", extra_macros );

		textured_primitive_shader = new GL.Shader(vertex_shader,"\n\
				precision highp float;\n\
				varying float v_visible;\n\
				uniform vec4 u_color;\n\
				uniform sampler2D u_texture;\n\
				uniform vec4 u_texture_transform;\n\
				uniform vec2 u_viewport;\n\
				uniform mat3 u_itransform;\n\
				void main() {\n\
					vec2 pos = (u_itransform * vec3( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t,1.0)).xy;\n\
					pos *= vec2( (u_viewport.x * u_texture_transform.z), (u_viewport.y * u_texture_transform.w) );\n\
					vec2 uv = fract(pos / u_viewport) + u_texture_transform.xy;\n\
					uv.y = 1.0 - uv.y;\n\
					gl_FragColor = u_color * texture2D( u_texture, uv);\n\
				}\n\
			", extra_macros );

		gradient_primitive_shader = new GL.Shader(vertex_shader,"\n\
				precision highp float;\n\
				varying float v_visible;\n\
				uniform vec4 u_color;\n\
				uniform sampler2D u_texture;\n\
				uniform vec4 u_gradient;\n\
				uniform vec2 u_viewport;\n\
				uniform mat3 u_itransform;\n\
				void main() {\n\
					vec2 pos = (u_itransform * vec3( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t,1.0)).xy;\n\
					//vec2 pos = vec2( gl_FragCoord.s, u_viewport.y - gl_FragCoord.t);\n\
					vec2 AP = pos - u_gradient.xy;\n\
					vec2 AB = u_gradient.zw - u_gradient.xy;\n\
					float dotAPAB = dot(AP,AB);\n\
					float dotABAB = dot(AB,AB);\n\
					float x = dotAPAB / dotABAB;\n\
					vec2 uv = vec2( x, 0.0 );\n\
					gl_FragColor = u_color * texture2D( u_texture, uv );\n\
				}\n\
			", extra_macros );

		//used for text
		var POINT_TEXT_VERTEX_SHADER = "\n\
			precision highp float;\n\
			attribute vec3 a_vertex;\n\
			attribute vec2 a_coord;\n\
			varying vec2 v_coord;\n\
			uniform vec2 u_viewport;\n\
			uniform mat3 u_transform;\n\
			#ifdef EXTRA_PROJECTION\n\
				uniform bool u_projection_enabled;\n\
				uniform mat4 u_projection;\n\
			#endif\n\
			uniform float u_pointSize;\n\
			void main() { \n\
				vec3 pos = a_vertex;\n\
				pos = u_transform * pos;\n\
				pos.z = 0.0;\n\
				#ifdef EXTRA_PROJECTION\n\
					if(u_projection_enabled)\n\
					{\n\
						gl_Position = u_projection * vec4(pos.xy,0.0,1.0);\n\
						return;\n\
					}\n\
				#endif\n\
				//normalize\n\
				pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\
				pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\
				gl_Position = vec4(pos, 1.0); \n\
				gl_PointSize = ceil(u_pointSize);\n\
				v_coord = a_coord;\n\
			}\n\
			";

		var POINT_TEXT_FRAGMENT_SHADER = "\n\
			precision highp float;\n\
			uniform sampler2D u_texture;\n\
			uniform float u_iCharSize;\n\
			uniform vec4 u_color;\n\
			uniform float u_pointSize;\n\
			uniform vec2 u_viewport;\n\
			uniform vec2 u_angle_sincos;\n\
			varying vec2 v_coord;\n\
			void main() {\n\
				vec2 uv = vec2(1.0 - gl_PointCoord.s, gl_PointCoord.t);\n\
				uv = vec2( ((uv.y - 0.5) * u_angle_sincos.y - (uv.x - 0.5) * u_angle_sincos.x) + 0.5, ((uv.x - 0.5) * u_angle_sincos.y + (uv.y - 0.5) * u_angle_sincos.x) + 0.5);\n\
				uv = v_coord - uv * u_iCharSize + vec2(u_iCharSize*0.5);\n\
				uv.y = 1.0 - uv.y;\n\
				gl_FragColor = vec4(u_color.xyz, u_color.a * texture2D(u_texture, uv, -1.0  ).a);\n\
			}\n\
			";

		point_text_shader = new GL.Shader( POINT_TEXT_VERTEX_SHADER, POINT_TEXT_FRAGMENT_SHADER, extra_macros );
	};

	ctx.createImageShader = function(code)
	{
		return new GL.Shader( GL.Shader.QUAD_VERTEX_SHADER,"\n\
			precision highp float;\n\
			uniform sampler2D u_texture;\n\
			uniform vec4 u_color;\n\
			uniform vec4 u_texture_transform;\n\
			uniform vec2 u_viewport;\n\
			varying vec2 v_coord;\n\
			void main() {\n\
				vec2 uv = v_coord * u_texture_transform.zw + vec2(u_texture_transform.x,0.0);\n\
				uv.y = uv.y - u_texture_transform.y + (1.0 - u_texture_transform.w);\n\
				uv = clamp(uv,vec2(0.0),vec2(1.0));\n\
				vec4 color = u_color * texture2D(u_texture, uv);\n\
				"+code+";\n\
				gl_FragColor = color;\n\
			}\n\
		", extra_macros );
	}


	//some people may reuse it
	ctx.WebGLCanvas.vertex_shader = vertex_shader;

	//STACK and TRANSFORM
	ctx._matrix = mat3.create();
	var tmp_mat3 = mat3.create();
	var tmp_vec2 = vec2.create();
	var tmp_vec4 = vec4.create();
	var tmp_vec4b = vec4.create();
	var tmp_vec2b = vec2.create();
	ctx._stack = [];
	ctx._stack_size = 0;
	var global_angle = 0;
	var viewport = ctx.viewport_data.subarray(2,4);

	ctx.translate = function(x,y)
	{
		tmp_vec2[0] = x;
		tmp_vec2[1] = y;
		mat3.translate( this._matrix, this._matrix, tmp_vec2 );
	}

	ctx.rotate = function(angle)
	{
		mat3.rotate( this._matrix, this._matrix, angle );
		global_angle += angle;
	}

	ctx.scale = function(x,y)
	{
		tmp_vec2[0] = x;
		tmp_vec2[1] = y;
		mat3.scale( this._matrix, this._matrix, tmp_vec2 );
	}

	//own method to reset internal stuff
	ctx.resetTransform = function()
	{
		//reset transform
		gl._stack_size = 0;
		this._matrix.set([1,0,0, 0,1,0, 0,0,1]);
		global_angle = 0;
	}

	ctx.save = function() {
		if(this._stack_size >= 32)
			return;
		var current_level = null;
		if(this._stack_size == this._stack.length)
		{
			current_level = this._stack[ this._stack_size ] = {
				matrix: mat3.create(),
				fillColor: vec4.create(),
				strokeColor: vec4.create(),
				shadowColor: vec4.create(),
				globalAlpha: 1,
				font: "",
				fontFamily: "",
				fontSize: 14,
				fontMode: "",
				textAlign: ""
			};
		}
		else
			current_level = this._stack[ this._stack_size ];
		this._stack_size++;

		current_level.matrix.set( this._matrix );
		current_level.fillColor.set( this._fillcolor );
		current_level.strokeColor.set( this._strokecolor );
		current_level.shadowColor.set( this._shadowcolor );
		current_level.globalAlpha = this._globalAlpha;
		current_level.font = this._font;
		current_level.fontFamily = this._font_family;
		current_level.fontSize = this._font_size;
		current_level.fontMode = this._font_mode;
		current_level.textAlign = this.textAlign;
	}

	ctx.restore = function() {
		if(this._stack_size == 0)
		{
			mat3.identity( this._matrix );
			global_angle = 0;
			return;
		}
		
		this._stack_size--;
		var current_level = this._stack[ this._stack_size ];

		this._matrix.set( current_level.matrix );
		this._fillcolor.set( current_level.fillColor );
		this._strokecolor.set( current_level.strokeColor );
		this._shadowcolor.set( current_level.shadowColor );
		this._globalAlpha = current_level.globalAlpha;
		this._font = current_level.font;
		this._font_family = current_level.fontFamily;
		this._font_size = current_level.fontSize;
		this._font_mode = current_level.fontMode;
		this.textAlign = current_level.textAlign;

		global_angle = Math.atan2( this._matrix[3], this._matrix[4] ); //use up vector

		if(	stencil_enabled )
		{
			gl.enable( gl.STENCIL_TEST );
			gl.clearStencil( 0x0 );
			gl.clear( gl.STENCIL_BUFFER_BIT );
			gl.disable( gl.STENCIL_TEST );
			stencil_enabled = false;
		}
	}

	ctx.transform = function(a,b,c,d,e,f) {
		var m = tmp_mat3;

        m[0] = a; m[1] = b; m[2] = 0; m[3] = c; m[4] = d; m[5] = 0; m[6] = e; m[7] = f; m[8] = 1; //fix
		//m[0] = a; m[1] = c;	m[2] = e; m[3] = b;	m[4] = d; m[5] = f;	m[6] = 0; m[7] = 0;	m[8] = 1;

		mat3.multiply( this._matrix, this._matrix, m );
		global_angle = Math.atan2( this._matrix[0], this._matrix[1] );
	}

	ctx.setTransform = function(a,b,c,d,e,f) {
		var m = this._matrix;

		m[0] = a; m[1] = b; m[2] = 0; m[3] = c; m[4] = d; m[5] = 0; m[6] = e; m[7] = f; m[8] = 1; //fix
		//m[0] = a; m[1] = c;	m[2] = e; m[3] = b;	m[4] = d; m[5] = f;	m[6] = 0; m[7] = 0;	m[8] = 1;

		//this._matrix.set([a,c,e,b,d,f,0,0,1]);
		global_angle = Math.atan2( this._matrix[0], this._matrix[1] );
	}

	//Images
	var last_uid = 1;

	//textures are stored inside images, so as long as the image exist in memory, the texture will exist
	function getTexture( img )
	{
		var tex = null;
		if(img.constructor === GL.Texture)
		{
			if(img._context_id == gl.context_id)
				return img;
			return null;
		}
		else
		{
			//same image could be used in several contexts
			if(!img.gl)
				img.gl = {};

			//Regular image
			if(img.src)
			{
				var wrap = gl.REPEAT;

				tex = img.gl[ gl.context_id ];
				if(tex)
				{
					if( img.mustUpdate )
					{
						tex.uploadData( img );
						img.mustUpdate = false;
					}
					return tex;
				}
				return img.gl[ gl.context_id ] = GL.Texture.fromImage(img, { magFilter: gl.LINEAR, minFilter: gl.LINEAR_MIPMAP_LINEAR, wrap: wrap, ignore_pot:true, premultipliedAlpha: true, anisotropic: anisotropic } );
			}
			else //probably a canvas
			{
				tex = img.gl[ gl.context_id ];
				if(tex)
				{
					if( img.mustUpdate )
					{
						tex.uploadData( img );
						img.mustUpdate = false;
					}
					return tex;
				}
				return img.gl[ gl.context_id ] = GL.Texture.fromImage(img, { minFilter: gl.LINEAR, magFilter: gl.LINEAR, anisotropic: anisotropic });
			}
		}

		return null;
	}

	//it supports all versions of drawImage (3 params, 5 params or 9 params)
	//it allows to pass a shader, otherwise it uses texture_shader (code is GL.Shader.SCREEN_COLORED_FRAGMENT_SHADER)
	ctx.drawImage = function( img, x, y, w, h, shader )
	{
		if(!img)
			return;

		var img_width = img.videoWidth || img.width;
		var img_height = img.videoHeight || img.height;
			
		if(img_width == 0 || img_height == 0) 
			return;

		var tex = getTexture(img);
		if(!tex)
			return;

		if(arguments.length == 9) //img, sx,sy,sw,sh, x,y,w,h
		{
			tmp_vec4b.set([x/img_width,y/img_height,w/img_width,h/img_height]);
			x = arguments[5];
			y = arguments[6];
			w = arguments[7];
			h = arguments[8];
			shader = textured_transform_shader;
		}
		else
			tmp_vec4b.set([0,0,1,1]); //reset texture transform

		tmp_vec2[0] = x; tmp_vec2[1] = y;
		tmp_vec2b[0] = w === undefined ? tex.width : w;
		tmp_vec2b[1] = h === undefined ? tex.height : h;

		tex.bind(0);
		if(tex !== img) //only apply the imageSmoothingEnabled if we are dealing with images, not textures
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.imageSmoothingEnabled ? gl.LINEAR : gl.NEAREST );

		if(!this.tintImages)
		{
			tmp_vec4[0] = tmp_vec4[1] = tmp_vec4[2] = 1.0;	tmp_vec4[3] = this._globalAlpha;
		}

		uniforms.u_color = this.tintImages ? this._fillcolor : tmp_vec4;
		uniforms.u_position = tmp_vec2;
		uniforms.u_size = tmp_vec2b;
		uniforms.u_transform = this._matrix;
		uniforms.u_texture_transform = tmp_vec4b;
		uniforms.u_viewport = viewport;

		shader = shader || texture_shader;

		shader.uniforms( uniforms ).draw(quad_mesh);
		extra_projection[14] -= 0.001;
	}

	ctx.createPattern = function( img )
	{
		return getTexture( img );
	}

	//to create gradients
	function WebGLCanvasGradient(x,y,x2,y2)
	{
		this.id = (ctx._last_gradient_id++) % ctx._max_gradients;
		this.points = new Float32Array([x,y,x2,y2]);
		this.stops = [];
		this._must_update = true;
	}

	//to avoid creating textures all the time
	ctx._last_gradient_id = 0;
	ctx._max_gradients = 16;
	ctx._gradients_pool = [];

	WebGLCanvasGradient.prototype.addColorStop = function( pos, color )
	{
		var final_color = hexColorToRGBA( color );
		var v = new Uint8Array(4);
		v[0] = Math.clamp( final_color[0], 0,1 ) * 255;
		v[1] = Math.clamp( final_color[1], 0,1 ) * 255;
		v[2] = Math.clamp( final_color[2], 0,1 ) * 255;
		v[3] = Math.clamp( final_color[3], 0,1 ) * 255;
		this.stops.push( [ pos, v ]);
		this.stops.sort( function(a,b) {return (a[0] > b[0]) ? 1 : ((b[0] > a[0]) ? -1 : 0);} );
		this._must_update = true;
	}

	WebGLCanvasGradient.prototype.toTexture = function()
	{
		//create a texture from the pool
		if(!this._texture)
		{
			if(this.id != -1)
				this._texture = ctx._gradients_pool[ this.id ];
			if(!this._texture)
			{
				this._texture = new GL.Texture( 128,1, { format: gl.RGBA, magFilter: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE, minFilter: gl.NEAREST });
				if(this.id != -1)
					ctx._gradients_pool[ this.id ] = this._texture;
			}
		}
		if(!this._must_update)
			return this._texture;
		this._must_update = false;
		if(this.stops.length < 1)
			return this._texture; //no stops
		if(this.stops.length < 2)
		{
			this._texture.fill( this.stops[0][1] );
			return this._texture; //one color
		}

		//fill buffer
		var index = 0;
		var current = this.stops[index];
		var next = this.stops[index+1];

		var buffer = new Uint8Array(128*4);
		for(var i = 0; i < 128; i+=1)
		{
			var color = buffer.subarray( i*4, i*4+4 );
			var t = i/128;
			if( current[0] > t )
			{
				if(index == 0)
					color.set( current[1] );
				else
				{
					index+=1;						
					current = this.stops[index];
					next = this.stops[index+1];
					if(!next)
						break;
					i-=1;
				}
			}
			else if( current[0] <= t && t < next[0] )
			{
				var f = (t - current[0]) / (next[0] - current[0]);
				vec4.lerp( color, current[1], next[1], f );
			}
			else if( next[0] <= t )
			{
				index+=1;						
				current = this.stops[index];
				next = this.stops[index+1];
				if(!next)
					break;
				i-=1;
			}
		}
		//fill the remaining
		if(i<128)
			for(var j = i; j < 128; j+=1)
				buffer.set( current[1], j*4 );
		this._texture.uploadData( buffer );
		return this._texture;
	}

	ctx.createLinearGradient = function( x,y, x2, y2 )
	{
		return new WebGLCanvasGradient(x,y,x2,y2);
	}


	//Primitives

	ctx.beginPath = function()
	{
		global_index = 0;
	}

	ctx.closePath = function()
	{
		if(global_index < 3)
			return;
		global_vertices[ global_index ] = global_vertices[0];
		global_vertices[ global_index + 1] = global_vertices[1];
		global_vertices[ global_index + 2] = 1;
		global_index += 3;
	}

	ctx.moveTo = function(x,y)
	{
		//not the first line
		if(global_index == 0)
		{
			global_vertices[ global_index ] = x;
			global_vertices[ global_index + 1] = y;
			global_vertices[ global_index + 2] = 1;
			global_index += 3;
		}
		else
		{
			global_vertices[ global_index ] = global_vertices[ global_index - 3];
			global_vertices[ global_index + 1] = global_vertices[ global_index - 2];
			global_vertices[ global_index + 2] = 0;
			global_index += 3;
			global_vertices[ global_index ] = x;
			global_vertices[ global_index + 1] = y;
			global_vertices[ global_index + 2] = 0;
			global_index += 3;
		}

	}

	ctx.lineTo = function(x,y)
	{
		global_vertices[ global_index ] = x;
		global_vertices[ global_index + 1] = y;
		global_vertices[ global_index + 2] = 1;
		global_index += 3;
	}

	ctx.bezierCurveTo = function(m1x,m1y, m2x,m2y, ex,ey)
	{
		if(global_index < 3)
			return;

		var last = [ global_vertices[ global_index - 3 ], global_vertices[ global_index - 2 ] ];
		cp = [ last, [m1x, m1y], [m2x, m2y], [ex, ey] ];
		for(var i = 0; i <= curveSubdivisions; i++)
		{
			var t = i/curveSubdivisions;
			var ax, bx, cx;
			var ay, by, cy;
			var tSquared, tCubed;

			/* cálculo de los coeficientes polinomiales */
			cx = 3.0 * (cp[1][0] - cp[0][0]);
			bx = 3.0 * (cp[2][0] - cp[1][0]) - cx;
			ax = cp[3][0] - cp[0][0] - cx - bx;

			cy = 3.0 * (cp[1][1] - cp[0][1]);
			by = 3.0 * (cp[2][1] - cp[1][1]) - cy;
			ay = cp[3][1] - cp[0][1] - cy - by;

			/* calculate the curve point at parameter value t */
			tSquared = t * t;
			tCubed = tSquared * t;

			var x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0][0];
			var y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0][1];
			global_vertices[ global_index ] = x;
			global_vertices[ global_index + 1] = y;
			global_vertices[ global_index + 2] = 1;
			global_index += 3;
		}
	}

	ctx.quadraticCurveTo = function(mx,my,ex,ey)
	{
		if(global_index < 3)
			return;

		var sx = global_vertices[ global_index - 3 ];
		var sy = global_vertices[ global_index - 2 ];
		
		for(var i = 0; i <= curveSubdivisions; i++)
		{
			var f = i/curveSubdivisions;
			var nf = 1-f;

			var m1x = sx * nf + mx * f;
			var m1y = sy * nf + my * f;

			var m2x = mx * nf + ex * f;
			var m2y = my * nf + ey * f;

			global_vertices[ global_index ] = m1x * nf + m2x * f;
			global_vertices[ global_index + 1] = m1y * nf + m2y * f;
			global_vertices[ global_index + 2] = 1;
			global_index += 3;
		}
	}


	ctx.fill = function()
	{
		if(global_index < 9)
			return;

		//update buffer
		global_buffer.uploadRange(0, global_index * 4); //4 bytes per float
		uniforms.u_viewport = viewport;
		var shader = flat_primitive_shader;

		//first the shadow
		if( this._shadowcolor[3] > 0.0 )
		{
			uniforms.u_color = this._shadowcolor;
			this.save();
			this.translate( this.shadowOffsetX, this.shadowOffsetY );
			shader.uniforms(uniforms).drawRange(global_mesh, gl.TRIANGLE_FAN, 0, global_index / 3);
			this.restore();
		}

		uniforms.u_color = this._fillcolor;
		uniforms.u_transform = this._matrix;

		var fill_style = this._fillStyle;

		if( fill_style.constructor === WebGLCanvasGradient ) //gradient
		{
			var grad = fill_style;
			var tex = grad.toTexture();
			uniforms.u_color = [1,1,1, this.globalAlpha]; 
			uniforms.u_gradient = grad.points; 
			uniforms.u_texture = 0;
			uniforms.u_itransform = mat3.invert( tmp_mat3, this._matrix );
			tex.bind(0);
			shader = gradient_primitive_shader;
		}
		else if( fill_style.constructor === GL.Texture ) //pattern
		{
			var tex = fill_style;
			uniforms.u_color = [1,1,1, this._globalAlpha]; 
			uniforms.u_texture = 0;
			tmp_vec4.set([0,0,1/tex.width, 1/tex.height]);
			uniforms.u_texture_transform = tmp_vec4;
			uniforms.u_itransform = mat3.invert( tmp_mat3, this._matrix );
			tex.bind(0);
			shader = textured_primitive_shader;
		}

		//render
		shader.uniforms(uniforms).drawRange(global_mesh, gl.TRIANGLE_FAN, 0, global_index / 3);
		extra_projection[14] -= 0.001;
	}

	//basic stroke using gl.LINES
	ctx.strokeThin = function()
	{
		if(global_index < 6)
			return;

		//update buffer
		global_buffer.uploadRange(0, global_index * 4); //4 bytes per float
		//global_buffer.upload( gl.STREAM_DRAW );

		gl.setLineWidth( this.lineWidth );
		uniforms.u_color = this._strokecolor;
		uniforms.u_transform = this._matrix;
		uniforms.u_viewport = viewport;
		flat_primitive_shader.uniforms(uniforms).drawRange(global_mesh, gl.LINE_STRIP, 0, global_index / 3);
	}

	//advanced stroke (it takes width into account)
	var lines_vertices = new Float32Array( max_points * 3 );
	var lines_mesh = new GL.Mesh();
	var lines_buffer = lines_mesh.createVertexBuffer("vertices", null, null, lines_vertices, gl.STREAM_DRAW );

	ctx.stroke = function()
	{
		if(global_index < 6)
			return;

		tmp_vec2[0] = this._matrix[0];
		tmp_vec2[1] = this._matrix[1];

		if( (this.lineWidth * vec2.length(tmp_vec2)) <= 1.0 )
			return this.strokeThin();

		var num_points = global_index / 3;
		var vertices = lines_vertices;
		var l = global_index;
		var line_width = this.lineWidth * 0.5;

		var points = global_vertices;

		var delta_x = 0;
		var delta_y = 0;
		var prev_delta_x = 0;
		var prev_delta_y = 0;
		var average_x = 0;
		var average_y = 0;
		var first_delta_x = 0;
		var first_delta_y = 0;

		if(points[0] == points[ global_index - 3 ] && points[1] == points[ global_index - 2 ])
		{
			delta_x = points[ global_index - 3 ] - points[ global_index - 6 ];
			delta_y = points[ global_index - 2 ] - points[ global_index - 5 ];
			var dist = Math.sqrt( delta_x*delta_x + delta_y*delta_y );
			if(dist != 0)
			{
				delta_x = (delta_x / dist);
				delta_y = (delta_y / dist);
			}
		}

		var i, pos = 0;
		for(i = 0; i < l-3; i+=3)
		{
			prev_delta_x = delta_x;
			prev_delta_y = delta_y;

			delta_x = points[i+3] - points[i];
			delta_y = points[i+4] - points[i+1];
			var dist = Math.sqrt( delta_x*delta_x + delta_y*delta_y );
			if(dist != 0)
			{
				delta_x = (delta_x / dist);
				delta_y = (delta_y / dist);
			}
			if(i == 0)
			{
				first_delta_x = delta_x;
				first_delta_y = delta_y;
			}

			average_x = delta_x + prev_delta_x;
			average_y = delta_y + prev_delta_y;

			var dist = Math.sqrt( average_x*average_x + average_y*average_y );
			if(dist != 0)
			{
				average_x = (average_x / dist);
				average_y = (average_y / dist);
			}

			vertices[ pos+0 ] = points[i] - average_y * line_width;
			vertices[ pos+1 ] = points[i+1] + average_x * line_width;
			vertices[ pos+2 ] = 1;
			vertices[ pos+3 ] = points[i] + average_y * line_width;
			vertices[ pos+4 ] = points[i+1] - average_x * line_width;
			vertices[ pos+5 ] = 1;

			pos += 6;
		}

		//final points are tricky
		if(points[0] == points[ global_index - 3 ] && points[1] == points[ global_index - 2 ])
		{
			average_x = delta_x + first_delta_x;
			average_y = delta_y + first_delta_y;
			var dist = Math.sqrt( average_x*average_x + average_y*average_y );
			if(dist != 0)
			{
				average_x = (average_x / dist);
				average_y = (average_y / dist);
			}
			vertices[ pos+0 ] = points[i] - average_y * line_width;
			vertices[ pos+1 ] = points[i+1] + average_x * line_width;
			vertices[ pos+2 ] = 1;
			vertices[ pos+3 ] = points[i] + average_y * line_width;
			vertices[ pos+4 ] = points[i+1] - average_x * line_width;
			vertices[ pos+5 ] = 1;
		}
		else
		{
			var dist = Math.sqrt( delta_x*delta_x + delta_y*delta_y );
			if(dist != 0)
			{
				average_x = (delta_x / dist);
				average_y = (delta_y / dist);
			}

			vertices[ pos+0 ] = points[i] - (average_y - average_x) * line_width;
			vertices[ pos+1 ] = points[i+1] + (average_x + average_y) * line_width;
			vertices[ pos+2 ] = 1;
			vertices[ pos+3 ] = points[i] + (average_y + average_x) * line_width;
			vertices[ pos+4 ] = points[i+1] - (average_x - average_y) * line_width;
			vertices[ pos+5 ] = 1;
		}

		pos += 6;

		lines_buffer.upload(gl.STREAM_DRAW);
		lines_buffer.uploadRange(0, pos * 4); //4 bytes per float

		uniforms.u_transform = this._matrix;
		uniforms.u_viewport = viewport;

		//first the shadow
		if( this._shadowcolor[3] > 0.0 )
		{
			uniforms.u_color = this._shadowcolor;
			this.save();
			this.translate( this.shadowOffsetX, this.shadowOffsetY );
			flat_primitive_shader.uniforms(uniforms).drawRange(global_mesh, gl.TRIANGLE_STRIP, 0, pos / 3);
			this.restore();
		}

		//gl.setLineWidth( this.lineWidth );
		uniforms.u_color = this._strokecolor;
		flat_primitive_shader.uniforms( uniforms ).drawRange(lines_mesh, gl.TRIANGLE_STRIP, 0, pos / 3 );
		extra_projection[14] -= 0.001;
	}


	ctx.rect = function(x,y,w,h)
	{
		global_vertices[ global_index ] = x;
		global_vertices[ global_index + 1] = y;
		global_vertices[ global_index + 2] = 1;

		global_vertices[ global_index + 3] = x+w;
		global_vertices[ global_index + 4] = y;
		global_vertices[ global_index + 5] = 1;

		global_vertices[ global_index + 6] = x+w;
		global_vertices[ global_index + 7] = y+h;
		global_vertices[ global_index + 8] = 1;

		global_vertices[ global_index + 9] = x;
		global_vertices[ global_index + 10] = y+h;
		global_vertices[ global_index + 11] = 1;

		global_vertices[ global_index + 12] = x;
		global_vertices[ global_index + 13] = y;
		global_vertices[ global_index + 14] = 1;

		global_index += 15;
	}

	ctx.roundRect = function (x, y, w, h, radius, radius_low)
	{
		if ( radius === undefined )
			radius = 5;
		if(radius_low === undefined)
			radius_low  = radius;
		var gv = global_vertices;
		var gi = global_index;

		for(var i = 0; i < 10; ++i)
		{
			var ang = (i/10)*Math.PI*0.5;
			gv[ gi ] = x+radius*(1.0 - Math.cos(ang));
			gv[ gi + 1] = y+radius*(1.0 - Math.sin(ang));
			gv[ gi + 2] = 1;
			gi += 3;
		}

		gv[ gi + 0] = x+radius; gv[ gi + 1] = y; gv[ gi + 2] = 1;
		gv[ gi + 3] = x+w-radius; gv[ gi + 4] = y; gv[ gi + 5] = 1;
		gi += 6;

		for(var i = 0; i < 10; ++i)
		{
			var ang = (i/10)*Math.PI*0.5;
			gv[ gi + 0] = x+w-radius*(1.0 - Math.sin(ang));
			gv[ gi + 1] = y+radius*(1.0 - Math.cos(ang));
			gv[ gi + 2] = 1;
			gi += 3;
		}

		gv[ gi + 0] = x+w; gv[ gi + 1] = y+radius; gv[ gi + 2] = 1;
		gv[ gi + 3] = x+w; gv[ gi + 4] = y+h-radius_low; gv[ gi + 5] = 1;
		gi += 6;

		for(var i = 0; i < 10; ++i)
		{
			var ang = (i/10)*Math.PI*0.5;
			gv[ gi + 0] = x+w-radius_low*(1.0 - Math.cos(ang));
			gv[ gi + 1] = y+h-radius_low*(1.0 - Math.sin(ang));
			gv[ gi + 2] = 1;
			gi += 3;
		}

		gv[ gi + 0] = x+w-radius_low; gv[ gi + 1] = y+h; gv[ gi + 2] = 1;
		gv[ gi + 3] = x+radius_low; gv[ gi + 4] = y+h; gv[ gi + 5] = 1;
		gi += 6;

		for(var i = 0; i < 10; ++i)
		{
			var ang = (i/10)*Math.PI*0.5;
			gv[ gi + 0] = x+radius_low*(1.0 - Math.sin(ang));
			gv[ gi + 1] = y+h-radius_low*(1.0 - Math.cos(ang));
			gv[ gi + 2] = 1;
			gi += 3;
		}

		gv[ gi + 0] = x; gv[ gi + 1] = y+radius; gv[ gi + 2] = 1;
		global_index = gi + 3;
	}


	ctx.arc = function(x,y,radius, start_ang, end_ang)
	{
		num = Math.ceil(radius*2*this._matrix[0]+1);
		if(num<1)
			return;

		start_ang = start_ang === undefined ? 0 : start_ang;
		end_ang = end_ang === undefined ? Math.PI * 2 : end_ang;

		var delta = (end_ang - start_ang) / num;

		for(var i = 0; i <= num; i++)
		{
			var f = start_ang + i*delta;
			this.lineTo(x + Math.cos(f) * radius, y + Math.sin(f) * radius);
		}
	}

	ctx.strokeRect = function(x,y,w,h)
	{
		this.beginPath();
		this.rect(x,y,w,h);//[x,y,1, x+w,y,1, x+w,y+h,1, x,y+h,1, x,y,1 ];
		this.stroke();
	}
	
	ctx.fillRect = function(x,y,w,h)
	{
		global_index = 0;

		//fill using a gradient or pattern
		if( this._fillStyle.constructor == GL.Texture || this._fillStyle.constructor === WebGLCanvasGradient )
		{
			this.beginPath();
			this.rect(x,y,w,h);
			this.fill();
			return;
		}

		uniforms.u_color = this._fillcolor;
		tmp_vec2[0] = x; tmp_vec2[1] = y;
		tmp_vec2b[0] = w; tmp_vec2b[1] = h;
		uniforms.u_position = tmp_vec2;
		uniforms.u_size = tmp_vec2b;
		uniforms.u_transform = this._matrix;
		uniforms.u_viewport = viewport;
		flat_shader.uniforms(uniforms).draw(quad_mesh);
		extra_projection[14] -= 0.001;
	}

	//other functions
	ctx.clearRect = function(x,y,w,h)
	{
		if(x != 0 || y != 0 || w != canvas.width || h != canvas.height )
			gl.scissor(x,y,w,h);

		//gl.clearColor( 0.0,0.0,0.0,0.0 );
		gl.clear( gl.COLOR_BUFFER_BIT );
		var v = gl.viewport_data;
		gl.scissor(v[0],v[1],v[2],v[3]);
	}

	ctx.fillCircle = function(x,y,r)
	{
		global_index = 0;

		//fill using a gradient or pattern
		if( this._fillStyle.constructor == GL.Texture || this._fillStyle.constructor === WebGLCanvasGradient )
		{
			this.beginPath();
			this.arc(x,y,r,0,Math.PI*2);
			this.fill();
			return;
		}

		uniforms.u_color = this._fillcolor;
		tmp_vec2[0] = x; tmp_vec2[1] = y;
		tmp_vec2b[0] = r; tmp_vec2b[1] = r;
		uniforms.u_position = tmp_vec2;
		uniforms.u_size = tmp_vec2b;
		uniforms.u_transform = this._matrix;
		uniforms.u_viewport = viewport
		flat_shader.uniforms(uniforms).draw(circle_mesh);
		extra_projection[14] -= 0.001;
	}
	
	ctx.clip = function()
	{
		gl.colorMask(false, false, false, false);
		gl.depthMask(false);
		
		//fill stencil buffer
		gl.enable( gl.STENCIL_TEST );
		gl.stencilFunc( gl.ALWAYS, 1, 0xFF );
		gl.stencilOp( gl.KEEP, gl.KEEP, gl.REPLACE ); //TODO using INCR we could allow 8 stencils 
		
		this.fill();

		stencil_enabled = true;		
		gl.colorMask(true, true, true, true);
		gl.depthMask(true);
		gl.stencilFunc( gl.EQUAL, 1, 0xFF );
	}

	//control funcs: used to set flags at the beginning and the end of the render
	ctx.start2D = function()
	{
		prev_gl = window.gl;
		window.gl = this;
		var gl = this;

		//viewport[0] = gl.viewport_data[2];
		//viewport[1] = gl.viewport_data[3];
		gl.disable( gl.CULL_FACE );
		gl.disable( gl.DEPTH_TEST );
		gl.disable( gl.STENCIL_TEST );
		gl.enable( gl.BLEND );
		gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
		gl.blendEquation( gl.FUNC_ADD );
		gl.lineWidth = 1;
		global_index = 0;
		mat4.identity( extra_projection );
	}

	ctx.finish2D = function()
	{
		global_index = 0;
		gl.lineWidth = 1;
		window.gl = prev_gl;
		gl.disable( gl.STENCIL_TEST );
	}

	/*
	var max_triangle_characters = 64;
	var triangle = new Float32Array([-1,1,0, -1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, 1,1,0]);
	var triangle_text_vertices = new Float32Array( max_triangle_characters * 6 * 3 );
	var triangle_text_mesh = new GL.Mesh();
	var triangle_text_vertices_buffer = triangle_text_mesh.createVertexBuffer("vertices", null, null, triangle_text_vertices );
	var tv = triangle_text_vertices;
	for(var i = 0; i < triangle_text_vertices.length; i += 6*3)
	{
		tv.set(triangle, i);
		tv[2] = tv[5] = tv[8] = tv[11] = t[14] = t[17] = i / (6*3);
	}
	triangle_text_vertices_buffer.upload();

	var TRIANGLE_TEXT_VERTEX_SHADER = "\n\
			precision highp float;\n\
			#define MAX_CHARS 64;
			attribute vec3 a_vertex;\n\
			varying vec2 v_coord;\n\
			uniform vec2 u_viewport;\n\
			uniform vec2 u_charPos[ MAX_CHARS ];\n\
			uniform vec2 u_charCoord[ MAX_CHARS ];\n\
			uniform mat3 u_transform;\n\
			uniform float u_pointSize;\n\
			void main() { \n\
				vec3 pos = a_vertex;\n\
				v_coord = a_vertex * 0.5 + vec2(0.5);\n\
				int char_index = (int)pos.z;\n\
				pos.z = 1.0;\n\
				pos.xz = pos.xz * u_pointSize + u_charPos[char_index];\n\
				pos = u_transform * pos;\n\
				pos.z = 0.0;\n\
				//normalize\n\
				pos.x = (2.0 * pos.x / u_viewport.x) - 1.0;\n\
				pos.y = -((2.0 * pos.y / u_viewport.y) - 1.0);\n\
				gl_Position = vec4(pos, 1.0); \n\
			}\n\
			";

	var TRIANGLE_TEXT_FRAGMENT_SHADER = "\n\
			precision highp float;\n\
			uniform sampler2D u_texture;\n\
			uniform float u_iCharSize;\n\
			uniform vec4 u_color;\n\
			uniform float u_pointSize;\n\
			uniform vec2 u_viewport;\n\
			varying vec2 v_coord;\n\
			void main() {\n\
				vec2 uv = vec2(1.0 - gl_PointCoord.s, 1.0 - gl_PointCoord.t);\n\
				uv = v_coord - uv * u_iCharSize + vec2(u_iCharSize*0.5);\n\
				uv.y = 1.0 - uv.y;\n\
				gl_FragColor = vec4(u_color.xyz, u_color.a * texture2D(u_texture, uv, -1.0  ).a);\n\
			}\n\
			";
	*/

	//text rendering
	var point_text_vertices = new Float32Array( max_characters * 3 );
	var point_text_coords = new Float32Array( max_characters * 2 );
	var point_text_mesh = new GL.Mesh();
	var point_text_vertices_buffer = point_text_mesh.createVertexBuffer("vertices", null, null, point_text_vertices, gl.STREAM_DRAW );
	var point_text_coords_buffer = point_text_mesh.createVertexBuffer("coords", null, null, point_text_coords, gl.STREAM_DRAW );

	ctx.fillText = ctx.strokeText = function(text,startx,starty)
	{
		if(text === null || text === undefined)
			return;
		if(text.constructor !== String)
			text = String(text);

		var atlas = createFontAtlas.call( this, this._font_family, this._font_mode );
		var info = atlas.info;

		var points = point_text_vertices;
		var coords = point_text_coords;
		var point_size = this._font_size * 1.1;

		if(point_size < 1)
			point_size = 1;
		var char_size = info.char_size;

		var x = 0;
		var y = 0;
		var l = text.length;
		var spacing = point_size * info.spacing / info.char_size - 1 ;
		var kernings = info.kernings;
		var scale_factor = info.font_size / this._font_size;

		var vertices_index = 0, coords_index = 0;
		
		for(var i = 0; i < l; i++)
		{
			var char_code = text.charCodeAt(i);
			var c = info[ char_code ]; //info
			if(!c)
			{
				if(text.charCodeAt(i) == 10) //break line
				{
					x = 0;
					y -= point_size;
				}
				else
					x += point_size * 0.5;
				continue;
			}

			var kern = kernings[ text[i] ];
			if(i == 0)
				x -= point_size * kern["nwidth"] * 0.25;


			points[vertices_index+0] = startx + x + point_size * 0.5;
			points[vertices_index+1] = starty + y - point_size * 0.25;
			points[vertices_index+2] = 1;
			vertices_index += 3;

			coords[coords_index+0] = c[1];
			coords[coords_index+1] = c[2];
			coords_index += 2;

			var pair_kern = kern[ text[i+1] ];
			if(!pair_kern)
				x += point_size * info.space;
			else
				x += point_size * pair_kern;
		}

		var offset = 0;
		if(this.textAlign == "right")
			offset = x + point_size * 0.5;
		else if(this.textAlign == "center")
			offset = (x + point_size * 0.5 ) * 0.5;
		if(offset)
			for(var i = 0; i < points.length; i += 3)
				points[i] -= offset;
		
		//render
		atlas.bind(0);

		//var mesh = GL.Mesh.load({ vertices: points, coords: coords });
		point_text_vertices_buffer.uploadRange(0,vertices_index*4);
		point_text_coords_buffer.uploadRange(0,coords_index*4);

		uniforms.u_color = this._fillcolor;
		uniforms.u_pointSize = point_size * vec2.length( this._matrix );
		uniforms.u_iCharSize = info.char_size / atlas.width;
		uniforms.u_transform = this._matrix;
		uniforms.u_viewport = viewport;
		if(!uniforms.u_angle_sincos)
			uniforms.u_angle_sincos = vec2.create();

		uniforms.u_angle_sincos[1] = Math.sin(-global_angle);
		uniforms.u_angle_sincos[0] = -Math.cos(-global_angle);
		//uniforms.u_angle_sincos[0] = Math.sin(-global_angle);
		//uniforms.u_angle_sincos[1] = Math.cos(-global_angle);

		point_text_shader.uniforms(uniforms).drawRange(point_text_mesh, gl.POINTS, 0, vertices_index / 3 );

		return { x:x, y:y };
	}

	ctx.measureText = function(text)
	{
		var atlas = createFontAtlas.call( this, this._font_family, this._font_mode );
		var info = atlas.info;
		var point_size = Math.ceil( this._font_size * 1.1 );
		var textsize = 0;
		var spacing = point_size * info.spacing / info.char_size - 1;
		for(var i = 0; i < text.length; ++i)
		{
			var charinfo = info.kernings[ text[i] ];
			if(charinfo)
				textsize += charinfo.nwidth;
			else
				textsize += spacing / info.char_size;
		}
		//textsize = text.length * spacing;
		textsize *= point_size;
		return { width: textsize, height: point_size };
	}

	function createFontAtlas( fontname, fontmode, force )
	{
		fontname = fontname || "monospace";
		fontmode = fontmode || "normal";

		var now = getTime();

		var imageSmoothingEnabled = this.imageSmoothingEnabled;
		var useInternationalFont = enableWebGLCanvas.useInternationalFont;

		var canvas_size = 1024;

		var texture_name = ":font_" + fontname + ":" + fontmode + ":" + useInternationalFont;

		var texture = textures[texture_name];
		if(texture && !force)
			return texture;

		var max_ascii_code = 200;
		var chars_per_row = 10;

		//check if font is being loaded
		//if( document.fonts && !document.fonts.check( fontname + " " + fontmode ) )
		//	return null;

		if(useInternationalFont) //more characters
		{
			max_ascii_code = 400;
			chars_per_row = 20;
		}

		var char_size = (canvas_size / chars_per_row)|0;
		var font_size = (char_size * 0.95)|0;

		var canvas = createCanvas(canvas_size,canvas_size);
		//document.body.appendChild(canvas); //debug
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "white";
		ctx.imageSmoothingEnabled = this.imageSmoothingEnabled;
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.font = fontmode + " " + font_size + "px " + fontname;
		ctx.textAlign = "center";
		var x = 0;
		var y = 0;
		var xoffset = 0.5, yoffset = font_size * -0.3;
		var info = {
			font_size: font_size,
			char_size: char_size, //in pixels
			spacing: char_size * 0.6, //in pixels
			space: (ctx.measureText(" ").width / font_size)
		};
		
		yoffset += enableWebGLCanvas.fontOffsetY * char_size;

		//compute individual char width (WARNING: measureText is very slow)
		var kernings = info.kernings = {};
		for(var i = 33; i < max_ascii_code; i++)
		{
			var character = String.fromCharCode(i);
			var char_width = ctx.measureText(character).width;
			var char_info = { width: char_width, nwidth: char_width / font_size };
			kernings[character] = char_info;
		}
		
		var clip = true; //clip every character: debug

		//paint characters in atlas
		for(var i = 33; i < max_ascii_code; ++i)//valid characters from 33 to max_ascii_code
		{
			var character = String.fromCharCode(i);
			var kerning = kernings[ character ];
			if( kerning && kerning.width ) //has some visual info
			{
				info[i] = [character, (x + char_size*0.5)/canvas.width, (y + char_size*0.5) / canvas.height];
				if(clip)
				{
					ctx.save();
					ctx.beginPath();
					ctx.rect( Math.floor(x)+0.5, Math.floor(y)+0.5, char_size-2, char_size-2 );
					ctx.clip();
					ctx.fillText( character, Math.floor(x+char_size*xoffset), Math.floor(y+char_size+yoffset), char_size );
					ctx.restore();
				}
				else
					ctx.fillText( character, Math.floor(x+char_size*xoffset), Math.floor(y+char_size+yoffset), char_size );
				x += char_size; //cannot pack chars closer because rendering points, no quads
				if((x + char_size) > canvas.width)
				{
					x = 0;
					y += char_size;
				}
			}

			if( y + char_size > canvas.height )
				break; //too many characters
		}

		var last_valid_ascii = i; //the last character in the atlas

		//compute kernings of every char with the rest of chars
		for(var i = 33; i < last_valid_ascii; ++i)
		{
			var character = String.fromCharCode(i);
			var kerning = kernings[ character ];
			var char_width = kerning.width;
			for(var j = 33; j < last_valid_ascii; ++j)
			{
				var other = String.fromCharCode(j);
				var other_width = kernings[other].width; 
				if(!other_width)
					continue;
				var total_width = ctx.measureText(character + other).width; //this is painfully slow...
				kerning[other] = (total_width * 1.45 - char_width - other_width) / font_size;
			}
		}

		texture = GL.Texture.fromImage( canvas, { format: gl.ALPHA, magFilter: imageSmoothingEnabled ? gl.LINEAR : gl.NEAREST, minFilter: imageSmoothingEnabled ? gl.NEAREST_MIPMAP_LINEAR : gl.NEAREST, premultiply_alpha: false, anisotropic: 8 } );
		texture.info = info; //font generation info

		return textures[texture_name] = texture;
	}

	//NOT TESTED
	ctx.getImageData = function(x,y,w,h)
	{
		var buffer = new Uint8Array(w*h*4);
		gl.readPixels(x,y,w,h,gl.RGBA,gl.UNSIGNED_BYTE,buffer);
		return { data: buffer, width: w, height: h, resolution: 1 };
	}

	ctx.putImageData = function( imagedata, x, y )
	{
		var tex = new GL.Texture( imagedata.width, imagedata.height, { filter: gl.NEAREST, pixel_data: imagedata.data } );
		tex.renderQuad(x,y,tex.width, tex.height);
	}

	Object.defineProperty(gl, "fillStyle", {
		get: function() { return this._fillStyle; },
		set: function(v) { 
			if(!v)
				return;
			this._fillStyle = v;
			hexColorToRGBA( v, this._fillcolor, this._globalAlpha ); 
		}
	});

	Object.defineProperty(gl, "strokeStyle", {
		get: function() { return this._strokeStyle; },
		set: function(v) { 
			if(!v)
				return;
			this._strokeStyle = v; 
			hexColorToRGBA( v, this._strokecolor, this._globalAlpha );
		}
	});

	//shortcuts
	Object.defineProperty(gl, "fillColor", {
		get: function() { return this._fillcolor; },
		set: function(v) { 
			if(!v)
				return;
			this._fillcolor.set(v);
		}
	});

	Object.defineProperty(gl, "strokeColor", {
		get: function() { return this._strokecolor; },
		set: function(v) { 
			if(!v)
				return;
			this._strokecolor.set(v);
		}
	});

	Object.defineProperty(gl, "shadowColor", {
		get: function() { return this._shadowcolor; },
		set: function(v) { 
			if(!v)
				return;
			hexColorToRGBA( v, this._shadowcolor, this._globalAlpha );
		}
	});

	Object.defineProperty(gl, "globalAlpha", {
		get: function() { return this._globalAlpha; },
		set: function(v) { 
			this._globalAlpha = v; 
			this._strokecolor[3] = this._fillcolor[3] = v;
		}
	});

	Object.defineProperty(gl, "globalCompositeOperation", {
		get: function() { return this._globalCompositeOperation; },
		set: function(v) { 
			this._globalCompositeOperation = v;
			gl.blendEquation( gl.FUNC_ADD ); 
			//gl.blendEquationSeparate( );
			switch(v)
			{
				case "source-over": 
					gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
					break;
				case "difference": 
					gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA ); 
					gl.blendEquation( gl.FUNC_REVERSE_SUBTRACT ); 
					break;
			}
		}
	});

	Object.defineProperty(gl, "font", {
		get: function() { return this._font; },
		set: function(v) { 
			this._font = v;
			var t = v.split(" ");
			if(t.length == 3)
			{
				this._font_mode = t[0];
				this._font_size = parseFloat(t[1]);
				if( Number.isNaN( this._font_size ) )
					this._font_size = 14;
				if(this._font_size < 10) 
					this._font_size = 10;
				this._font_family = t[2];
			}
			else if(t.length == 2)
			{
				this._font_mode = "normal";
				this._font_size = parseFloat(t[0]);
				if( Number.isNaN( this._font_size ) )
					this._font_size = 14;
				if(this._font_size < 10) 
					this._font_size = 10;
				this._font_family = t[1];
			}
			else
			{
				this._font_mode = "normal";
				this._font_family = t[0];
			}
		}
	});

	ctx._fillcolor = vec4.fromValues(0,0,0,1);
	ctx._strokecolor = vec4.fromValues(0,0,0,1);
	ctx._shadowcolor = vec4.fromValues(0,0,0,0);
	ctx._globalAlpha = 1;
	ctx._font = "14px monospace";
	ctx._font_family = "monospace";
	ctx._font_size = "14px";
	ctx._font_mode = "normal";


	//STATE
	ctx.strokeStyle = "rgba(0,0,0,1)";
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.shadowColor = "transparent";
	ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
	ctx.globalAlpha = 1;
	ctx.globalCompositeOperation = "source-over";
	ctx.setLineWidth = ctx.lineWidth; //save the webgl function
	ctx.lineWidth = 4; //set lineWidth as a number
	ctx.imageSmoothingEnabled = true;
	ctx.tintImages = false; //my own parameter


	//empty functions: this is used to create null functions in those Canvas2D funcs not implemented here
	var names = ["arcTo","isPointInPath","createImageData"]; //all functions have been implemented
	var null_func = function() {};
	for(var i in names)
		ctx[ names[i] ] = null_func;

	return ctx;
};

enableWebGLCanvas.useInternationalFont = false; //render as much characters as possible in the texture atlas
enableWebGLCanvas.fontOffsetY = 0; //hack, some fonts need extra offsets, dont know why