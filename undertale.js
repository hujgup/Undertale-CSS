var utjs_getRoot = function() {
	var scripts = document.querySelectorAll("script[src]");
	var res = scripts[scripts.length - 1].src;
	return res.replace("undertale.js","");
};
var utjs_root = utjs_getRoot();

function RGBColor(r,g,b) {
	this.red = Math.floor(r);
	this.green = Math.floor(g);
	this.blue = Math.floor(b);
	this.equals = function(rgbCol) {
		return this.red === rgbCol.red && this.green === rgbCol.green && this.blue === rgbCol.blue;
	};
	this.toString = function() {
		return "rgb("+this.red+","+this.green+","+this.blue+")";
	};
}
function HSVColor(h,s,v) {
	this.hue = h;
	this.saturation = s;
	this.value = v;
	this.toRGB = function() {
		var chroma = this.value*this.saturation;
		var hue = this.hue%360;
		if (hue < 0) {
			hue += 360;
		}
		hue /= 60;
		var x = chroma*(1 - Math.abs(hue%2 - 1));
		var r = 0;
		var g = 0;
		var b = 0;
		if (hue < 1) {
			r = chroma;
			g = x;
		} else if (hue < 2) {
			r = x;
			g = chroma;
		} else if (hue < 3) {
			g = chroma;
			b = x;
		} else if (hue < 4) {
			g = x;
			b = chroma;
		} else if (hue < 5) {
			b = chroma;
			r = x;
		} else {
			b = x;
			r = x;
		}
		var m = this.value - chroma;
		r += m;
		g += m;
		b += m;
		var cnv = 255;
		r *= cnv;
		g *= cnv;
		b *= cnv;
		return new RGBColor(r,g,b);
	};
	this.toString = function() {
		return this.toRGB().toString();
	};
}

function UndertaleTemplate() {
	var _this = this;
	var _preload = [];
	var _preloaded = [];
	var _open = true;
	var _saveFrames = {
		global: [],
		star: []
	};
	var _buttonApply = function(ele,text,normal) {
		text = "&nbsp;"+text;
		normal += "&nbsp;"+text;
		var active = "<span class='ut-chara ut-title-basic-back' style='font-size:0.685em;vertical-align:middle;'>_</span>"+text;
		var old = null;
		window.addEventListener("mousemove",function(event) {
			var hoveredEles = ele.parentElement.querySelectorAll(":hover");
			var hovered = false;
			for (var i = 0; i < hoveredEles.length; i++) {
				if (hoveredEles[i] === ele) {
					hovered = true;
					i = hoveredEles.length;
				}
			}
			if (hovered !== old) {
				old = hovered;
				if (hovered) {
					ele.innerHTML = active;
				} else {
					ele.innerHTML = normal;
				}
			}
		});
		ele.innerHTML = normal;
		ele.className = "ut-button ut-link ut-action";
	};
	var _buttonSprites = function(ele,normal,active,alt) {
		ele.textContent = "";
		var sprite = document.createElement("img");
		sprite.src = normal;
		sprite.alt = alt;
		var old = null;
		var res = {
			active: false
		};
		window.addEventListener("mousemove",function(event) {
			var hoveredEles = ele.parentElement.querySelectorAll(":hover");
			var hovered = false;
			for (var i = 0; i < hoveredEles.length; i++) {
				if (hoveredEles[i] === ele) {
					hovered = true;
					i = hoveredEles.length;
				}
			}
			if (hovered !== old) {
				old = hovered;
				if (hovered) {
					sprite.src = active;
					res.active = true;
				} else {
					sprite.src = normal;
					res.active = false;
				}
			}
		});
		ele.appendChild(sprite);
		return res;
	};
	var _preloadImage = function(url) {
		var res = null;
		if (_preloaded.indexOf(url) === -1) {
			res = new Image();
			res.src = url;
			_preload.push(res);
			_preloaded.push(url);
		}
		return res;
	};
	var _preloadSaveFrames = function() {
		for (var i = 0; i < _saveFrames.global.length; i++) {
			_preloadImage(_saveFrames.global[i]);
			_preloadImage(_saveFrames.star[i]);
		}
	};
	var _createOverlay = function(parent) {
		var res = document.createElement("canvas");
		res.style.position = "absolute";
		res.style.left = "0";
		res.style.top = "0";
		res.style.pointerEvents = "none";
		res.style.display = "inline-block";
		parent.appendChild(res);
		return res;
	};
	this.images = {
		fight: utjs_root+"sprites/fight.png",
		act: utjs_root+"sprites/act.png",
		item: utjs_root+"sprites/item.png",
		mercy: utjs_root+"sprites/mercy.png",
		save: utjs_root+"sprites/save.png",
		//heart: utjs_root+"sprites/heart_overlay.png",
		active: {
			fight: utjs_root+"sprites/fight_active.png",
			act: utjs_root+"sprites/act_active.png",
			item: utjs_root+"sprites/item_active.png",
			mercy: utjs_root+"sprites/mercy_active.png",
			save: utjs_root+"sprites/save_active.png",
			saveEmpty: utjs_root+"sprites/save_active_empty.png"
		}
	};
	this.presets = {
		sprites: {
			fight: function(ele) {
				_preloadImage(_this.images.fight);
				_preloadImage(_this.images.active.fight);
				_buttonSprites(ele,_this.images.fight,_this.images.active.fight,"FIGHT");
			},
			act: function(ele) {
				_preloadImage(_this.images.act);
				_preloadImage(_this.images.active.act);
				_buttonSprites(ele,_this.images.act,_this.images.active.act,"ACT");
			},
			item: function(ele) {
				_preloadImage(_this.images.item);
				_preloadImage(_this.images.active.item);
				_buttonSprites(ele,_this.images.item,_this.images.active.item,"ITEM");
			},
			mercy: function(ele) {
				_preloadImage(_this.images.mercy);
				_preloadImage(_this.images.active.mercy);
				_buttonSprites(ele,_this.images.mercy,_this.images.active.mercy,"MERCY");
			},
			save: function(ele,frameRate) {
				frameRate = typeof frameRate === "number" ? frameRate : 60;
				var huePerSecond = 10800/42;
				var huePerFrame = huePerSecond/frameRate;

				var imgSave = _preloadImage(_this.images.save);
				_preloadImage(_this.images.active.save);
				var imgSaveActive = _preloadImage(_this.images.active.saveEmpty);
				ele.style.position = "relative";
				var save = _buttonSprites(ele,_this.images.save,_this.images.active.save,"SAVE");
				var overlay = _createOverlay(ele);
				var ctx = overlay.getContext("2d");
				var frame = 0;
				var col = new HSVColor(0,0.62,0.76);
				var replaceMe = new RGBColor(195,195,195);
				var increment = huePerFrame;
				var width = null;
				var height = null;

				var animate = function() {
					if (height === null) {
						height = ele.children[0].offsetHeight;
						if (height === 0) {
							height = null;
						} else {
							width = ele.children[0].offsetWidth;
							overlay.width = width;
							overlay.height = height;
						}
					}
					if (height !== null) {
						overlay.style.top = (ele.offsetHeight - height + (ele.children[0].getBoundingClientRect().bottom - ele.getBoundingClientRect().bottom))+"px";
						try {
							// Credit to http://stackoverflow.com/a/16228281
							ctx.save();
							ctx.clearRect(0,0,width,height);
							ctx.drawImage(save.active ? imgSaveActive : imgSave,0,0,width,height);
							ctx.fillStyle = col.toString();
							ctx.globalCompositeOperation = "source-in";
							ctx.fillRect(0,0,width,height);
							ctx.restore();
						} catch (e) {
							// Cross-origin data on canvas, just show the uncoloured version
						}
						col.hue += increment;
						frame = (++frame)%_saveFrames.global.length;
					}
				};
				var initialAnimate = function() {
					animate();
					if (width !== null) {
						clearInterval(timer);
						setInterval(animate,1000/frameRate);
					}
				};
				var timer = setInterval(initialAnimate,0);
				initialAnimate();
			}
		},
		css: {
			fight: function(ele) {
				_buttonApply(ele,"FIGHT","#");
			},
			act: function(ele) {
				_buttonApply(ele,"ACT","$");
			},
			item: function(ele) {
				_buttonApply(ele,"ITEM","%");
			},
			mercy: function(ele) {
				_buttonApply(ele,"MERCY","&amp;");
			}
		}
	};
	this.pushSaveFrame = function(global,star) {
		if (_open) {
			_saveFrames.global.push(global);
			_saveFrames.star.push(star);
		}
		return _open;
	};
	this.lockSaveFrames = function() {
		_open = false;
	};
}

var utjs_setupUndertale = function() {
	var res = new UndertaleTemplate();
	var frames = 1;
	var ext = ".png";
	var startNorm = utjs_root+"sprites/save_frames/frame_";
	var startStar = startNorm+"star_";
	var file;
	for (var i = 0; i < frames; i++) {
		file = i+ext;
		res.pushSaveFrame(startNorm+file,startStar+file);
	}
	res.lockSaveFrames();
	return res;
};
var Undertale = utjs_setupUndertale();
