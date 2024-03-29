const GAMEPUT = { REVISION:2 };

GAMEPUT.devices = {};
GAMEPUT.pressed_combinations = {};
GAMEPUT.map = {};

GAMEPUT.isPressed = function(combinations) {
	var combs = this.splitCombinations(combinations),
		c,
		i,n,
		j,m,
		device,
		combmatch;

	for(let i=0,n=combs.length; i<n; i++) {
		combmatch = true;
		for(let j=0,m=combs[i].length; j<m; j++) {
			c = combs[i][j];
			device = this.findKeyDevice(c);

			if(device == null)
				return false;

			if(!this.devices[device].isPressed(c)) {
				combmatch = false;
				break;
			}
		}
		if(combmatch)
			return true;
	}
	return false;
};

GAMEPUT.get = GAMEPUT.isPressed;

GAMEPUT.getDown = function(combinations) {
	var combs = this.splitCombinations(combinations),
		c,
		i,n,
		j,m,
		device,
		combmatch,
		anyDown;

	for(let i=0,n=combs.length; i<n; i++) {
		combmatch = true;
		anyDown = false;
		for(let j=0,m=combs[i].length; j<m; j++) {
			c = combs[i][j];
			device = this.findKeyDevice(c);

			if(device == null)
				return false;

			if(!this.devices[device].isPressed(c)) {
				combmatch = false;
				break;
			}
			if(this.devices[device].getDown(c)) {
				anyDown = true;
			}
		}
		if(combmatch && anyDown)
			return true;
	}
	return false;
};

GAMEPUT.getUp = function(combinations) {
	var combs = this.splitCombinations(combinations),
		c,
		i,n,
		j,m,
		device,
		combmatch,
		anyUp;

	for(let i=0,n=combs.length; i<n; i++) {
		combmatch = true;
		anyDown = false;
		for(let j=0,m=combs[i].length; j<m; j++) {
			c = combs[i][j];
			device = this.findKeyDevice(c);

			if(device == null)
				return false;

			if(!this.devices[device].isPressed(c) && !this.devices[device].getUp(c)) {
				combmatch = false;
				break;
			}
			if(this.devices[device].getUp(c)) {
				anyUp = true;
			}
		}
		if(combmatch && anyUp)
			return true;
	}
	return false;
};

GAMEPUT.splitCombinations = function(combinations) {
	var combArray = combinations.split(" "), c = [];
	for(var i=0,n=combArray.length; i<n; i++) {
		c.push(this.splitCombination(combArray[i]));
	}
	return c;
};

GAMEPUT.splitCombination = function(combination) {
	return combination.split("+");
};

GAMEPUT.findKeyDevice = function(name) {
	for(var d in this.devices) {
		if(this.devices.hasOwnProperty(d) && this.devices[d].isMine(name))
			return d;
	}

	return null;
};

GAMEPUT.getCodes = function(name, device) {
	return this.devices[device].getCodes(name);
};

GAMEPUT.bind = function(comb, callback, prevent_repeat) {
	if(typeof prevent_repeat == "undefined")
		prevent_repeat = true;

	var fndown = function(e) {
		if(GAMEPUT.isPressed(comb) && (!prevent_repeat || !GAMEPUT.pressed_combinations[comb])) {
			if(prevent_repeat) GAMEPUT.pressed_combinations[comb] = true;
			return callback(e);
		}
	};

	document.addEventListener("keydown", fndown);
	document.addEventListener("mousedown", fndown);

	if(prevent_repeat) {
		var fnup = function(e) {
			GAMEPUT.pressed_combinations[comb] = false;
		};

		document.addEventListener("keyup", fnup);
		document.addEventListener("mouseup", fnup);
	}
};

GAMEPUT.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

GAMEPUT.frameSetup = function() {
	for(var d in this.devices) {
		if(this.devices.hasOwnProperty(d))
			this.devices[d].frameSetup();
	}
};

GAMEPUT.isArray = function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};
GAMEPUT.devices.gamepad = {};

GAMEPUT.devices.gamepad.GAMEPAD_ANALOGUE_THRESHOLD = 0.5;

GAMEPUT.devices.gamepad.map = {
		button: {
			'1': 0,
			'2': 1,
			'3': 2,
			'4': 3,
			'L1': 4,
			'R1': 5,
			'L2': 6,
			'R2': 7,
			'select': 8,
			'start': 9,
			'leftanalogue': 10,
			'rightanalogue': 11,
			'padup': 12,
			'paddown': 13,
			'padleft': 14,
			'padright': 15
		},
		axis: {
			'leftanaloguehor': 0,
			'leftanaloguevert': 1,
			'rightanaloguehor': 2,
			'rightanaloguevert': 3
		}
};

GAMEPUT.devices.gamepad.isMine = function(name) {
	return name.substr(0,7) == "gamepad";
};

GAMEPUT.devices.gamepad.getCodes = function(name) {};

GAMEPUT.devices.gamepad.isPressed = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name),
		gptype = (gpdesc.type == "axis")? "axes" : "buttons",
		gamepads = GAMEPUT.getGamepads();
	return gamepads[gpdesc.gamepad]
			&& gamepads[gpdesc.gamepad][gptype][gpdesc.num]
			&& (gpdesc.type == "button" && gamepads[gpdesc.gamepad][gptype][gpdesc.num].pressed
			 	|| gpdesc.type == "axis" && Math.abs(gamepads[gpdesc.gamepad][gptype][gpdesc.num]) > this.GAMEPAD_ANALOGUE_THRESHOLD);
};

GAMEPUT.devices.gamepad.getDown = function(name) {
};

GAMEPUT.devices.gamepad.getUp = function(name) {
};

GAMEPUT.getGamepads = function() {
	return navigator.getGamepads && navigator.getGamepads()
		|| navigator.webkitGetGamepads && navigator.webkitGetGamepads()
		|| navigator.webkitGamepads;

};

GAMEPUT.getAxis = function(name) {
	var gpdesc = GAMEPUT.devices.gamepad.getGamepadButtonDescription(name);
	if(GAMEPUT.getGamepads()[gpdesc.gamepad])
		return GAMEPUT.getGamepads()[gpdesc.gamepad].axes[gpdesc.num];
	else
		return 0;
};

GAMEPUT.devices.gamepad.getGamepadButtonDescription = function(name) {
	var gpcode = name.split("/");
	var gpnum = parseInt(gpcode[0].substr(7))-1;
	var gptype, gpbutton;
	if(gpcode.length == 2) {
		gptype = (typeof this.map.button[gpcode[1]] != "undefined")? "button" : "axis";
		gpbutton = this.map[gptype][gpcode[1]];
	} else {
		gptype = gpcode[1];
		gpbutton = parseInt(gpcode[2])-1;
	}

	return {
		gamepad: gpnum,
		type: gptype,
		num: gpbutton
	};
};

GAMEPUT.devices.gamepad.frameSetup = function() {

};
GAMEPUT.devices.keyboard = {};
GAMEPUT.devices.keyboard.pressed = {};
GAMEPUT.devices.keyboard.frameDown = {};
GAMEPUT.devices.keyboard.frameUp = {};
GAMEPUT.devices.keyboard.down = {};
GAMEPUT.devices.keyboard.up = {};
GAMEPUT.devices.keyboard.map = {
		'backspace': 8, 'tab': 9, 'enter': 13, 'shift': 16, 'control': 17, 'alt': 18, 'capslock': 20, 'altgr': 225, 'del': 46,
		'pagedown': 33, 'pageup': 34, 'end': 35, 'home': 36,
		'left': 37, 'up': 38, 'right': 39, 'down': 40,
		'boardplus': 187, 'numpadplus': 107, 'plus': ['boardplus', 'numpadplus'],
		'boardhyphen': 189, 'numpadhyphen': 109, 'hyphen': ['boardhyphen', 'numpadhyphen'], 'minus': 'hyphen',
		'space': 32, 'leftwindows': 91, 'rightwindows': 92, 'windows': ['leftwindows', 'rightwindows'],

		'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
		'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
		'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,

		'numpad0': 96, 'numpad1': 97, 'numpad2': 98, 'numpad3': 99, 'numpad4': 100, 'numpad5': 101, 'numpad6': 102, 'numpad7': 103, 'numpad8': 104, 'numpad9': 105,
		'board0': 48, 'board1': 49, 'board2': 50, 'board3': 51, 'board4': 52, 'board5': 53, 'board6': 54, 'board7': 55, 'board8': 56, 'board9': 57,
		'0': ['numpad0','board0'], '1': ['numpad1','board1'], '2': ['numpad2','board2'], '3': ['numpad3','board3'], '4': ['numpad4','board4'],
		'5': ['numpad5','board5'], '6': ['numpad6','board6'], '7': ['numpad7','board7'], '8': ['numpad8','board8'], '9': ['numpad9','board9']
};

GAMEPUT.devices.keyboard.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

GAMEPUT.devices.keyboard.getCodes = function(name) {
	var v = this.map[name];

	if(typeof v != "undefined") {
		if(GAMEPUT.isNumber(v)) {
			return [v];

		} else if(typeof v === "string") {
			return this.getCodes(v);

		} else if(this.isArray(v)) {
			var codes = [];
			for(var i=0; i < v.length; i++) {
				codes = codes.concat(this.getCodes(v[i]));
			}
			return codes;
		}
	} else {
		throw "Key "+name+" unknown";
	}
};

GAMEPUT.devices.keyboard.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.getDown = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.down[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.getUp = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.up[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.keyboard.frameSetup = function() {
	var i;
	for(i in this.frameDown) {
		if(this.frameDown.hasOwnProperty(i)) {
			this.down[i] = this.frameDown[i];
			this.frameDown[i] = false;
		}
	}
	for(i in this.frameUp) {
		if(this.frameUp.hasOwnProperty(i)) {
			this.up[i] = this.frameUp[i];
			this.frameUp[i] = false;
		}
	}
};

GAMEPUT.devices.keyboard._manageKeyDown = function(event) {
	if(!this.pressed[event.keyCode]) {
		this.pressed[event.keyCode] = true;
		this.frameDown[event.keyCode] = true;
	}
};

GAMEPUT.devices.keyboard._manageKeyUp = function(event) {
	this.pressed[event.keyCode] = false;
	this.frameUp[event.keyCode] = true;
};

document.addEventListener("keydown", function(event) {
	GAMEPUT.devices.keyboard._manageKeyDown(event);
});
document.addEventListener("keyup", function(event) {
	GAMEPUT.devices.keyboard._manageKeyUp(event);
});


GAMEPUT.devices.mouse = {};
GAMEPUT.devices.mouse.pressed = {};
GAMEPUT.devices.mouse.frameDown = {};
GAMEPUT.devices.mouse.frameUp = {};
GAMEPUT.devices.mouse.down = {};
GAMEPUT.devices.mouse.up = {};
GAMEPUT.devices.mouse.map = {
		'mouseleft': 1,
		'mousecenter': 2,
		'mouseright': 3,
		'mousecentre': 'mousecenter',
		'click': ['mouseleft', 'mouseright', 'mousecenter']
};
GAMEPUT.devices.mouse.c_pos = [0, 0];

GAMEPUT.devices.mouse.isMine = function(name) {
	return typeof this.map[name] != "undefined";
};

GAMEPUT.devices.mouse.getCodes = function(name) {
	var v = this.map[name];

	if(typeof v != "undefined") {
		if(GAMEPUT.isNumber(v)) {
			return [v];

		} else if(typeof v === "string") {
			return this.getCodes(v);

		} else if(this.isArray(v)) {
			var codes = [];
			for(var i=0; i < v.length; i++) {
				codes = codes.concat(this.getCodes(v[i]));
			}
			return codes;
		}
	} else {
		throw "Mouse button "+name+" unknown";
	}
};

GAMEPUT.devices.mouse.isPressed = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.pressed[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse.getDown = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.down[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse.getUp = function(name) {
	var codes = this.getCodes(name);
	for(let i=0,n=codes.length; i<n; i++) {
		if(this.up[codes[i]]) {
			return true;
		}
	}
	return false;
};

GAMEPUT.devices.mouse._manageMouseDown = function(event) {
	if(!this.pressed[event.which]) {
		this.pressed[event.which] = true;
		this.frameDown[event.which] = true;
	}
};

GAMEPUT.devices.mouse._manageMouseUp = function(event) {
	this.pressed[event.which] = false;
	this.frameUp[event.which] = true;
};

GAMEPUT.devices.mouse.frameSetup = function() {
	for(let i in this.frameDown) {
		if(this.frameDown.hasOwnProperty(i)) {
			this.down[i] = this.frameDown[i];
			this.frameDown[i] = false;
		}
	}
	for(let i in this.frameUp) {
		if(this.frameUp.hasOwnProperty(i)) {
			this.up[i] = this.frameUp[i];
			this.frameUp[i] = false;
		}
	}
};

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
GAMEPUT.getMousePos = ctx =>
{
	const rect = ctx.canvas.getBoundingClientRect();
	const c_pos = GAMEPUT.devices.mouse.c_pos;

	return [c_pos[0] - rect.left, c_pos[1] - rect.top];
}

document.addEventListener("mousemove", function(event) {
	GAMEPUT.devices.mouse.c_pos = [event.clientX, event.clientY];
});

document.addEventListener("mousedown", function(event) {
	GAMEPUT.devices.mouse._manageMouseDown(event || window.event);
});

document.addEventListener("mouseup", function(event) {
	GAMEPUT.devices.mouse._manageMouseUp(event || window.event);
});

export const InputManager = GAMEPUT;