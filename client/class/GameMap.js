import { Player } from "./Player.js";
import { Color } from "./Utils.js";

const BlockType =
{
	Void: 0,
	Player: 1,
	Wall: 2,
}

export class Block
{
	/** @type {Player} */
	player = null;

	/** @type {BlockType} */
	type = null;

	/** @type {Color} */
	color = null;

	/**
	 * 
	 * @param {Player} player 
	 * @param {BlockType} type 
	 */
	constructor(type)
	{
		this.type = type;
	}

	/**
	 * 
	 * @param {Player | null} player 
	 */
	ChangePlayer(player)
	{
		this.player = player;
	}

	/**
	 * 
	 * @returns {Player | null}
	 */
	GetPlayer()
	{
		return this.player;
	}

	/**
	 * 
	 * @param {Color} color 
	 */
	SetColor(color)
	{
		this.color = color;
	}
}

export class GameMap
{
	mapSize = [20, 20];
	blocks = [];

	constructor()
	{
		
	}

	#GenerateMap()
	{
		for (let y = 0; y < mapSize[1]; y++)
		{
			for (let x = 0; x < mapSize[0]; x++)
			{

				if (x == 0 || y == 0 || x == this.mapSize[0] - 1 || y == this.mapSize[1] - 1)
				{
					const block = new Block(BlockType.Wall);
					block.SetColor(Color.RED);

					this.blocks.push(block);
				}
				else
				{
					const block = new Block(BlockType.Void);
					block.SetColor(Color.WHITE);

					this.blocks.push(block);
				}
			}
		}
	}

	Init()
	{
		this.#GenerateMap();
	}


}