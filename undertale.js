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
	},
	presets: {
		sprites: {
			fight: function(ele) {
				UndertaleButtons.applySprites(ele,"sprites/fight.png","sprites/fight_active.png","FIGHT");
			},
			act: function(ele) {
				UndertaleButtons.applySprites(ele,"sprites/act.png","sprites/act_active.png","ACT");
			},
			item: function(ele) {
				UndertaleButtons.applySprites(ele,"sprites/item.png","sprites/item_active.png","ITEM");
			},
			mercy: function(ele) {
				UndertaleButtons.applySprites(ele,"sprites/mercy.png","sprites/mercy_active.png","MERCY");
			},
			save: function(ele) {
				UndertaleButtons.applySprites(ele,"sprites/save.png","sprites/save_active.png","SAVE");
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
