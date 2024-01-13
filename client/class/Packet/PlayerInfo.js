export const States =
{
	None: 0,
	Move: 1,
	Idle: 2,
}

export class PlayerInfo
{
	constructor(id, pos, color, state, width, height)
	{
		this.id = id;
		this.pos = pos;
		this.color = color;
		this.state = state;
		this.width = width;
		this.height = height;
	}

	id = 0;
	pos = [0, 0];
	color = null;
	width = 0;
	height = 0;
	
	/** @type {States} */
	state = States.None;
}