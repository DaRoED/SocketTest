import { EnterPacket } from "./Packet/EnterPacket.js";
import { PlayerInfo } from "./Packet/PlayerInfo.js";
import { PacketUtil } from "./Packet/PacketUtil.js";
import { Player } from "./Player.js";
import { Scene } from "./Scene.js";

export class SceneManager
{
	/** @type {Scene} */
	scene = null;

	/** @type {SceneManager} */
	static #instance = null;

	/**
	 * 
	 * @returns {SceneManager}
	 */
	static getInstance()
	{
		if (this.#instance == null)
		{
			this.#instance = new SceneManager();
		}

		return this.#instance;
	}

	/**
	 * 
	 * @param {Scene} scene 
	 */
	init(scene)
	{
		this.scene = scene;
	}

	/** @type {Scene} */
	getScene()
	{
		return this.scene;
	}

	/**
	 * 
	 * @param {EnterPacket} packet 
	 */
	HandleEnter(packet)
	{
		for (let i = 0; i < packet.objects.length; i++)
		{
			const playerInfo = packet.objects[i];
			const player = new Player();
			player.init(scoekt, playerInfo.pos, playerInfo.color);

			this.scene.add_object(player);
		}
	}

	/**
	 * 
	 * @param  {PlayerInfo} playerInfos
	 * @returns {EnterPacket}
	 */
	static Make_EnterPacket(playerInfo)
	{
		const packet = new EnterPacket();
		packet.objects.push(playerInfo);
		return PacketUtil.SerializePacket(packet);
	}
}