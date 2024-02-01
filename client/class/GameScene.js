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

		const player1_idle = new ImageTexture(); player1_idle.init('../resources/players/player1/idle.png');
		ResourceManager.addResource('player1_idle', player1_idle);

		const player1_running = new ImageTexture(); player1_running.init('../resources/players/player1/running.png');
		ResourceManager.addResource('player1_running', player1_running);
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