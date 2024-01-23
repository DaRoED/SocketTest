import { GameObject } from "./GameObject.js";
import { SceneManager } from "./SceneManager.js";
import { Utils } from "./Utils.js";
import { GEN_UUID } from "./GEN_UUID.js"

export class ImageTexture extends GameObject
{
	/** @type {HTMLImageElement} */
	image = null;

	init(src, width = null, height = null)
	{
		this.pos = [0, 0];
		this.id = GEN_UUID();

		const image = width != null && height != null ? new Image(width, height) : new Image();
		image.src = src;

		this.image = image;
	}

	update(ctx, dt)
	{

	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @returns 
	 */
	render(ctx)
	{
		if (this.image === null) return;
	
		const width = this.image.width;
		const height = this.image.height;

		const camera_pos = SceneManager.getInstance().getScene().camera_pos;
		const window_pos = [ctx.canvas.width, ctx.canvas.height];

		const render_pos = [null, null];
		render_pos[0] = this.pos[0] - (width / 2) - (camera_pos[0] - window_pos[0] / 2);
		render_pos[1] = this.pos[1] - (height / 2) - (camera_pos[1] - window_pos[1] / 2);

		// console.log('background: ', render_pos);

		Utils.SetAlpha(1);

		ctx.drawImage(this.image, render_pos[0], render_pos[1], width, height);
	}
}