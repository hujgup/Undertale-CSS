var utjs_getRoot = function() {
	var scripts = document.querySelectorAll("script[src]");
	var res = scripts[scripts.length - 1].src;
	return res.replace("undertale.js","");
};
var utjs_root = utjs_getRoot();

function RGBColor(r,g,b) {
	this.red = r;
	this.green = g;
	this.blue = b;
	this.equals = function(rgbCol) {
		return this.red === rgbCol.red && this.green === rgbCol.green && this.blue === rgbCol.blue;
	};
}
function HSVColor(h,s,v) {
	this.hue = h;
	this.saturation = s;
	this.value = v;
	this.toRGB = function() {
		var chroma = this.value*this.saturation;
		var hue = hue%360;
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
			r = chroma;
			b = x;
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
/*
		var res = document.createElement("img");
*/
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
			save: function(ele) {
				var imgSave = _preloadImage(_this.images.save);
				//_preloadImage(_this.images.heart);
				_preloadImage(_this.images.active.save);
				var imgSaveActive = _preloadImage(_this.images.active.saveEmpty);
				//_preloadSaveFrames();
				ele.style.position = "relative";
				var save = _buttonSprites(ele,_this.images.save,_this.images.active.save,"SAVE");
				var overlay = _createOverlay(ele);
				//var overlayFore = _createOverlay(ele);
				var ctx = overlay.getContext("2d");
				//var foreCtx = overlayFore.getContext("2d");
				var frame = 0;
				var col = new HSVColor(0,0.62,0.76);
				var increment = 360/42;
				var width = 1;
				var height = 1;
				var animate = function() {
					if (height === 0) {
						height = ele.children[0].offsetHeight;
						if (height !== 0) {
							var offset = (ele.offsetHeight - height + (ele.children[0].getBoundingClientRect().bottom - ele.getBoundingClientRect().bottom))+"px";
							overlay.style.top = offset;
							//overlayFore.style.top = offset;
							width = ele.children[0].offsetWidth;
							var cssWidth = width+"px";
							overlay.style.width = cssWidth;
							//overlayFore.style.width = cssWidth;
						}
					}
					try {
						ctx.clearRect(0,0,width,height);
						ctx.drawImage(save.active ? imgSaveActive : imgSave,0,0,width,height,0,0,width,height);
						var imgData = ctx.getImageData(0,0,width,height);
						var replaceMe = new RGBColor(195,195,195);
						var rgb = col.toRGB();
						var testCol;
						for (var i = 0; i < imgData.data.length; i += 4) {
							testCol = new RGBColor(imgData.data[i],imgData.data[i + 1],imgData.data[i + 2]);
							if (testCol.equals(replaceMe)) {
								imgData.data[i] = rgb.red;
								imgData.data[i] = rgb.green;
								imgData.data[i] = rgb.blue;
							}
						}
						ctx.putImageData(imgData,0,0);
					} catch (e) {
						// Cross-origin data on canvas, just show the uncoloured version
					}
/*
					overlayBack.src = _saveFrames.global[frame];
					overlayFore.src = _saveFrames.star[frame];
					overlayFore.style.display = save.active ? "none" : "initial";
*/
					col.hue += increment;
					frame = (++frame)%_saveFrames.global.length;
				};
				setInterval(animate,1000/30);
				animate();
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
