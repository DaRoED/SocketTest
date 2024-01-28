import { SceneManager, SceneType } from "./SceneManager.js";
import { UI } from "./UI.js";
import { InputManager } from "./gameput.js";

export class ButtonUI extends UI
{

	/** @typedef {function(CanvasRenderingContext2D)} ClickCallbackFunction */

	constructor(image_src, shape, width = null, height = null)
	{
		super(image_src, shape, width, height);
	}

	HoverUpdate(ctx, dt)
	{
		if (InputManager.isPressed('mouseleft'))
		{
			this.ClickCallback(ctx);
		}
	}

	update(ctx, dt)
	{
		super.update(ctx, dt);
	}

	/**
	 * 
	 * @type {ClickCallbackFunction}
	 */
	ClickCallback(ctx)
	{

	}

	/**
	 * 
	 * @param {ClickCallbackFunction} callback 
	 */
	setClickCallback(callback)
	{
		this.ClickCallback = callback;
	}
}