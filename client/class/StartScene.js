import { ImageTexture } from "./ImageTexture.js";
import { Scene } from "./Scene.js";

export class StartScene extends Scene
{
	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(ctx)
	{
		super(ctx);
	}

	init()
	{
		const start_scene_background = new ImageTexture();
		start_scene_background.init('../resources/start_scene_background.jpg', 1280, 720);

		const start_boutton = new ImageTexture();
		start_boutton.init('../resources/start_button.png');

		this.add_object(start_scene_background);
		this.add_object(start_boutton);

	}

	update(dt)
	{
		super.update(dt);
	}

	render()
	{
		super.render();
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
}