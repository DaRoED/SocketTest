import { Scene } from "./Scene.js";
import { SceneManager, SceneType } from "./SceneManager.js";

const particles = [];

let bar = null;

export class LoadingScene extends Scene
{
	/** @typedef {function(ctx)} LoadingCompleteCallbackFunction */

	counter = 0;
	particle_no = 25;
	w = 400;
	h = 200;

	/** @type {CanvasRenderingContext2D} */
	main_ctx = null;


	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {LoadingCompleteCallbackFunction} callback
	 */
	constructor(ctx, callback)
	{
		super(ctx);

		this.setLoadingCompleteCallback(callback);

		const canvas = document.createElement("canvas");
		canvas.width = this.w;
		canvas.height = this.h;

		this.ctx = canvas.getContext("2d");
		this.main_ctx = ctx;
		bar = new progressbar();
	}

	init() 
	{
		super.init();
	}

	/**
	 *
	 * @param {number} dt
	 */
	update(dt) 
	{
		super.update(dt);

		if (this.counter > 215)
		{
			this.LoadingCompleteCallback(this.main_ctx);
		}
	}

	render() 
	{
		super.render();
		this.draw(this.ctx);

		const width = this.main_ctx.canvas.width / 2;
		const height = this.main_ctx.canvas.height / 2;

		const offset_y = 50;

		this.main_ctx.drawImage(this.ctx.canvas, width - this.w/2, height - this.h/2 + offset_y + 50, this.w, this.h);
	}

	/**
	 *
	 * @param {number} id
	 * @returns {GameObject | undefined}
	 */
	find_object(id) 
	{
		return super.find_object(id);
	}

	/**
	 *
	 * @param {GameObject} object
	 */
	add_object(object) 
	{
		return super.add_object(object);
	}

	/**
	 *
	 * @param {GameObject} object
	 */
	remove_object(object) 
	{
		super.remove_object(object);
	}

	p_update(ctx) 
	{
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			p.x -= p.vx;
			if (p.down == true) {
				p.g += 0.1;
				p.y += p.g;
			} else {
				if (p.g < 0) {
					p.down = true;
					p.g += 0.1;
					p.y += p.g;
				} else {
					p.y -= p.g;
					p.g -= 0.1;
				}
			}
			p.draw(ctx);
		}
	}

	draw(ctx)
	{
		if (bar === null) return;

		this.reset();
		this.counter++;

		bar.hue += 0.5;

		bar.widths += 2;
		if (bar.widths > 350)
		{
			if (this.counter > 215)
			{
				this.reset();
				bar.hue = 0;
				bar.widths = 351;
				this.counter = 216;
				particles.length = 0;
			}
			else 
			{
				bar.hue = 126;
				bar.widths = 351;
				bar.draw(ctx);
			}
		} 
		else 
		{
			bar.draw(ctx);
			for (var i = 0; i < this.particle_no; i += 10) 
			{
				particles.push(new particle());
			}
		}
		this.p_update(ctx);
	}

	reset() 
	{
		this.ctx.fillStyle = this.main_ctx.fillStyle = "#272822";
		this.ctx.fillRect(0, 0, this.w, this.h);
		this.main_ctx.fillRect(0, 0, this.main_ctx.canvas.width, this.main_ctx.canvas.height);

		this.ctx.fillStyle = this.main_ctx.fillStyle = "#171814";
		this.ctx.fillRect(25, 80, 350, 25);
	}

	/** @type {LoadingCompleteCallbackFunction} */
	LoadingCompleteCallback(ctx)
	{

	}

	/**
	 * 
	 * @param {LoadingCompleteCallbackFunction} callback 
	 */
	setLoadingCompleteCallback(callback)
	{
		this.LoadingCompleteCallback = callback;
	}
}

class progressbar {
	constructor()
	{
		this.widths = 0;
		this.hue = 0;
	};

	draw(ctx)
	{
		ctx.fillStyle = "hsla(" + this.hue + ", 100%, 50%, 1)";
		ctx.fillRect(25, 80, this.widths, 25);
		var grad = ctx.createLinearGradient(0, 0, 0, 130);
		grad.addColorStop(0, "transparent");
		grad.addColorStop(1, "rgba(0,0,0,0.3)");
		ctx.fillStyle = grad;
		ctx.fillRect(25, 80, this.widths, 25);
	}
}

class particle {
	constructor() {
		this.x = 23 + bar.widths;
		this.y = 82;

		this.vx = 0.8 + Math.random() * 1;
		this.v = Math.random() * 5;
		this.g = 1 + Math.random() * 3;
		this.down = false;
	}

	draw(ctx)
	{
		ctx.fillStyle = "hsla(" + (bar.hue + 0.3) + ", 100%, 50%, 1)";
		var size = Math.random() * 2;
		ctx.fillRect(this.x, this.y, size, size);
	};
}
