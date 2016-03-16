var utjs_getRoot = function() {
	var scripts = document.querySelectorAll("script[src]");
	var res = scripts[scripts.length - 1].src;
	return res.replace("undertale.js","");
};
var utjs_root = utjs_getRoot();
console.log(utjs_root);

var UndertaleImages = {
	fight: utjs_root+"sprites/fight.png",
	act: utjs_root+"sprites/act.png",
	item: utjs_root+"sprites/item.png",
	mercy: utjs_root+"sprites/mercy.png",
	save: utjs_root+"sprites/save.png",
	heart: utjs_root+"sprites/heart_overlay.png",
	saveFrames: [],
	saveStarFrames: [],
	active: {
		fight: utjs_root+"sprites/fight_active.png",
		act: utjs_root+"sprites/act_active.png",
		item: utjs_root+"sprites/item_active.png",
		mercy: utjs_root+"sprites/mercy_active.png",
		save: utjs_root+"sprites/save_active.png"
	}
};
var UndertalePreload = {
	fight: new Image(),
	act: new Image(),
	item: new Image(),
	mercy: new Image(),
	save: new Image(),
	heart: new Image(),
	saveFrames: [],
	saveStarFrames: [],
	active: {
		fight: new Image(),
		act: new Image(),
		item: new Image(),
		mercy: new Image(),
		save: new Image()
	}
};
UndertalePreload.fight.src = UndertaleImages.fight;
UndertalePreload.act.src = UndertaleImages.act;
UndertalePreload.item.src = UndertaleImages.item;
UndertalePreload.mercy.src = UndertaleImages.mercy;
UndertalePreload.save.src = UndertaleImages.save;
UndertalePreload.heart.src = UndertaleImages.heart;
UndertalePreload.active.fight.src = UndertaleImages.active.fight;
UndertalePreload.active.act.src = UndertaleImages.active.act;
UndertalePreload.active.item.src = UndertaleImages.active.item;
UndertalePreload.active.mercy.src = UndertaleImages.active.mercy;
UndertalePreload.active.save.src = UndertaleImages.active.save;
var saveFramePath = utjs_root+"sprites/save_frames/";
var saveFrameTemplate = "frame_";
var saveStarFrameTemplate = "frame_star_";
var ext = ".png";
for (var i = 0; i < 10; i++) {
	UndertaleImages.saveFrames.push(saveFramePath+saveFrameTemplate+i+ext);
	UndertaleImages.saveStarFrames.push(saveFramePath+saveStarFrameTemplate+i+ext);
	UndertalePreload.saveFrames.push(new Image());
	UndertalePreload.saveStarFrames.push(new Image());
	UndertalePreload.saveFrames[i].src = UndertaleImages.saveFrames[i];
	UndertalePreload.saveStarFrames[i].src = UndertaleImages.saveStarFrames[i];
}

var UndertaleButtons = {
	apply: function(ele,text,normal) {
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
	},
	applySprites: function(ele,normal,active,alt) {
		normal = "<img src='"+normal+"' alt='"+alt+"' />";
		active = "<img src='"+active+"' alt='"+alt+"' />";
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
					ele.innerHTML = active;
					res.active = true;
				} else {
					ele.innerHTML = normal;
					res.active = false;
				}
			}
		});
		ele.innerHTML = normal;
		return res;
	},
	presets: {
		sprites: {
			fight: function(ele) {
				UndertaleButtons.applySprites(ele,UndertaleImages.fight,UndertaleImages.active.fight,"FIGHT");
			},
			act: function(ele) {
				UndertaleButtons.applySprites(ele,UndertaleImages.act,UndertaleImages.active.act,"ACT");
			},
			item: function(ele) {
				UndertaleButtons.applySprites(ele,UndertaleImages.item,UndertaleImages.active.item,"ITEM");
			},
			mercy: function(ele) {
				UndertaleButtons.applySprites(ele,UndertaleImages.mercy,UndertaleImages.active.mercy,"MERCY");
			},
			save: function(ele) {
				ele.style.display = "relative";
				var save = UndertaleButtons.applySprites(ele,UndertaleImages.save,UndertaleImages.active.save,"SAVE");
				var createOverlay = function() {
					var res = document.createElement("img");
					res.style.position = "absolute";
					res.style.left = "0";
					res.style.top = "0";
					res.style.pointerEvents = "none";
					ele.appendChild(res);
					return res;
				};
				var overlayBack = createOverlay();
				var overlayFore = createOverlay();
				var frame = 0;
				var animate = function() {
					overlayBack.src = UndertaleImages.saveFrames[frame];
					if (save.active) {
						overlayFore = UndertaleImages.heart;
					} else {
						overlayFore = UndertaleImages.saveStarFrames[frame];
					}
					frame++;
				};
				setInterval(animate,1000/60); // todo get frame rate
				animate();
			}
		},
		fight: function(ele) {
			UndertaleButtons.apply(ele,"FIGHT","#");
		},
		act: function(ele) {
			UndertaleButtons.apply(ele,"ACT","$");
		},
		item: function(ele) {
			UndertaleButtons.apply(ele,"ITEM","%");
		},
		mercy: function(ele) {
			UndertaleButtons.apply(ele,"MERCY","&amp;");
		}
	}
};
