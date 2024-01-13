import { Player } from "./Player.js";

class GameRoom
{
	/** @type {Map<number, Player>} */
	players = new Map();

	constructor()
	{
	}

	Init()
	{

	}

	/**
	 * 
	 * @param {number} id 
	 * @returns {Player | undefined}
	 */
	find_object(id)
	{
		return this.players.get(id);
	}

	/**
	 * 
	 * @param {Player} object 
	 */
	add_object(object)
	{
		const player = this.find_object(object.id);
		if (!player)
		{
			this.players.set(object.id, object);
			return true;
		}
		else
		{
			return false;
		}
	}

	remove_object(id)
	{
		if (this.find_object(id))
		{
			this.players.delete(id);
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * 
	 * @returns {Map<number, Player>}
	 */
	getPlayers()
	{
		return this.players;
	}
}

export const GRoom = new GameRoom();