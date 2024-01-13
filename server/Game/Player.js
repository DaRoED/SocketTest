import { Session } from "../Session.js";

export const States =
{
	None: 0,
	Move: 1,
	Idle: 2,
}

export const Color = 
{
	WHITE: 0,
	BLACK: 1,
	RED: 2,
	BLUE: 3,
	GREEN: 4,
	YELLOW: 5,
	PURPLE: 6,
}

export class Player
{
	/**
	 * 
	 * @param {Session} session 
	 * @param {States} state 
	 * @param {Color} color 
	 * @param {Array<number, number>} pos 
	 * @param {number} id
	 */
	constructor(session, state, color, pos, id)
	{
		this.session = 		session;
		this.state = 		state;
		this.color = 		color;
		this.pos = 			pos;
		this.id = 			id;
	}

	/** @type {Session} */
	session = null;

	/** @type {States} */
	state = States.None;

	/** @type {Color} */
	color = Color.GREEN;

	pos = [0, 0];

	id = 0;
}