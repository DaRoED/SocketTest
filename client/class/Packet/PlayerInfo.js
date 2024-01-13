export const States =
{
	None: 0,
	Move: 1,
	Idle: 2,
}

export class PlayerInfo
{
	constructor(id, pos, color, state)
	{
		this.id = id;
		this.pos = pos;
		this.color = color;
		this.state = state;
	}

	id = 0;
	pos = [0, 0];
	color = null;
	
	/** @type {States} */
	state = States.None;
}