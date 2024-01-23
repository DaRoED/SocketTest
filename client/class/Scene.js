import { GameObject } from "./GameObject.js";

export class Scene
{
	/** @type {CanvasRenderingContext2D} */
	ctx;

	/** @type {Array<GameObject>} */
	objects = [];

	camera_pos = [0, 0];

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(ctx)
	{
		this.ctx = ctx;
	}

	init()
	{
		
	}

	/**
	 * 
	 * @param {number} dt 
	 */
	update(dt)
	{
		for (const object of this.objects)
		{
			object.update(this.ctx, dt);
		}
	}

	render()
	{
		for (const object of this.objects)
		{
			object.render(this.ctx);
		}
	}

	/**
	 * 
	 * @param {number} id 
	 * @returns {GameObject | undefined}
	 */
	find_object(id)
	{
		return this.objects.find(object => id === object.id);
	}

	/**
	 * 
	 * @param {GameObject} object 
	 */
	add_object(object)
	{
		if (this.find_object(object.id))
		{
			return false;
		}
		else
		{
			this.objects.push(object);
			return true;
		}
	}

	/**
	 * 
	 * @param {GameObject} object 
	 */
	remove_object(object)
	{
		this.objects.splice(this.objects.indexOf(object));
	}
}