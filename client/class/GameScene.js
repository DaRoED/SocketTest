import { GameObject } from "./GameObject.js";
import { Scene } from "./Scene.js";
// import { MyPlayer } from "./MyPlayer.js";
import { ImageTexture } from "./ImageTexture.js";

export class GameScene extends Scene
{
	/** @type {MyPlayer} */
	my_player = null;

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

		const background = new ImageTexture();
		background.init('../resources/map.jpg');
		this.add_object(background);
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