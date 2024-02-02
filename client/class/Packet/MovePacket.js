import { Direction } from "../FlipbookActor.js";

export class MovePacket
{
	/** @type {number} */
	id = 0;

	/** @type {Array<number, number>} */
	pos = [0, 0]; 

	/** @type {Direction} */
	direction = 0;
}