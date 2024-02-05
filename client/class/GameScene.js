import { GameObject } from "./GameObject.js";
import { Scene } from "./Scene.js";
// import { MyPlayer } from "./MyPlayer.js";
import { ImageTexture } from "./ImageTexture.js";
import { EnterPacket } from "./Packet/EnterPacket.js";
import { PacketTypeEnum } from "./Packet/PacketType.js";
import { PacketUtil } from "./Packet/PacketUtil.js";
import { NetworkManager } from "./NetworkManager.js";
import { ResourceManager } from "./ResourceManager.js";

export class GameScene extends Scene
{
	/** @type {MyPlayer} */
	my_player = null;

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {string} my_player_name
	 */
	constructor(ctx, my_player_name)
	{
		super(ctx);
		this.my_player_name = my_player_name;
	}

	init()
	{
		super.init();

		const enterPacket = new EnterPacket();
		enterPacket.name = this.my_player_name;

		NetworkManager.getSocket().emit(PacketTypeEnum.enter, PacketUtil.SerializePacket(enterPacket));

		const background = new ImageTexture();
		background.init('../resources/map.jpg');
		this.add_object(background);

		const player1_idle_down = new ImageTexture(); player1_idle_down.init('../resources/players/player1/idle_down.png');
		ResourceManager.addResource('player1_idle_down', player1_idle_down);

		const player1_idle_up = new ImageTexture(); player1_idle_up.init('../resources/players/player1/idle_up.png');
		ResourceManager.addResource('player1_idle_up', player1_idle_up);

		const player1_idle_left = new ImageTexture(); player1_idle_left.init('../resources/players/player1/idle_left.png');
		ResourceManager.addResource('player1_idle_left', player1_idle_left);

		const player1_idle_right = new ImageTexture(); player1_idle_right.init('../resources/players/player1/idle_right.png');
		ResourceManager.addResource('player1_idle_right', player1_idle_right);

		const player1_idle_downLeft = new ImageTexture(); player1_idle_downLeft.init('../resources/players/player1/idle_downLeft.png');
		ResourceManager.addResource('player1_idle_downLeft', player1_idle_downLeft);

		const player1_idle_downRight = new ImageTexture(); player1_idle_downRight.init('../resources/players/player1/idle_downRight.png');
		ResourceManager.addResource('player1_idle_downRight', player1_idle_downRight);

		const player1_idle_upLeft = new ImageTexture(); player1_idle_upLeft.init('../resources/players/player1/idle_upLeft.png');
		ResourceManager.addResource('player1_idle_upLeft', player1_idle_upLeft);

		const player1_idle_upRight = new ImageTexture(); player1_idle_upRight.init('../resources/players/player1/idle_upRight.png');
		ResourceManager.addResource('player1_idle_upRight', player1_idle_upRight);

		const player1_walk_down = new ImageTexture(); player1_walk_down.init('../resources/players/player1/walk_down.png');
		ResourceManager.addResource('player1_walk_down', player1_walk_down);

		const player1_walk_up = new ImageTexture(); player1_walk_up.init('../resources/players/player1/walk_up.png');
		ResourceManager.addResource('player1_walk_up', player1_walk_up);

		const player1_walk_left = new ImageTexture(); player1_walk_left.init('../resources/players/player1/walk_left.png');
		ResourceManager.addResource('player1_walk_left', player1_walk_left);

		const player1_walk_right = new ImageTexture(); player1_walk_right.init('../resources/players/player1/walk_right.png');
		ResourceManager.addResource('player1_walk_right', player1_walk_right);

		const player1_walk_downLeft = new ImageTexture(); player1_walk_downLeft.init('../resources/players/player1/walk_downLeft.png');
		ResourceManager.addResource('player1_walk_downLeft', player1_walk_downLeft);

		const player1_walk_downRight = new ImageTexture(); player1_walk_downRight.init('../resources/players/player1/walk_downRight.png');
		ResourceManager.addResource('player1_walk_downRight', player1_walk_downRight);

		const player1_walk_upLeft = new ImageTexture(); player1_walk_upLeft.init('../resources/players/player1/walk_upLeft.png');
		ResourceManager.addResource('player1_walk_upLeft', player1_walk_upLeft);

		const player1_walk_upRight = new ImageTexture(); player1_walk_upRight.init('../resources/players/player1/walk_upRight.png');
		ResourceManager.addResource('player1_walk_upRight', player1_walk_upRight);
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