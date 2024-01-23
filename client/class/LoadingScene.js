import { Scene } from "./Scene.js";

export class LoadingScene extends Scene
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
		super.init();
	}

	/**
	 * 
	 * @param {number} dt 
	 */
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