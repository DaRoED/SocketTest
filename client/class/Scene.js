import { Player } from "./Player.js";
// import { MyPlayer } from "./MyPlayer.js";

export class Scene
{
	/** @type {CanvasRenderingContext2D} */
	ctx;

	/** @type {Array<GameObject>} */
	objects = [];

	/** @type {MyPlayer} */
	my_player = null;

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
	 * @returns {Player | undefined}
	 */
	find_object(id)
	{
		return this.objects.find(object => id === object.id);
	}

	/**
	 * 
	 * @param {Player} object 
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
	 * @param {Player} object 
	 */
	remove_object(object)
	{
		this.objects.splice(this.objects.indexOf(object));
	}

	/**
	 * 
	 * @param {MyPlayer} my_player 
	 * @returns {boolean}
	 */
	set_myPlayer(my_player)
	{
		if (this.my_player) return false;
		else
		{
			this.my_player = my_player;
			return true;
		}
	}
}