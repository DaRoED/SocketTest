import { GameObject, States } from "./GameObject.js";
import { Color, Utils } from "./Utils.js";

export class Player extends GameObject
{
	/** @type {Color} */
	color = null;

	destPos = [0, 0];

	moveSpped = 200;

	/**
	 * 
	 * @param {Array<number>} pos
	 * @param {Color} color
	 * @param {number} id
	 */
	init(pos, color, id, state)
	{
		this.pos = pos;
		this.color = color;
		this.id = id;
		this.state = state;
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} dt 
	 */
	update(ctx, dt)
	{
		super.update(ctx, dt);
		this.inputUpdate(dt);
	}

	IdleUpdate(dt)
	{
		super.IdleUpdate(dt);
	}

	MoveUpdate(dt)
	{
		super.MoveUpdate(dt);

		let direction_x = this.destPos[0] - this.pos[0];
		let direction_y = this.destPos[1] - this.pos[1];

		const dist = Math.sqrt(direction_x * direction_x + direction_y * direction_y);

		if (dist === 0)
		{
			this.setState(States.Idle);
			return;
		}

		if (dist > 0)
		{
			this.pos[0] += direction_x;
			this.pos[1] += direction_y;
		}
	}

	inputUpdate(dt)
	{
		
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	render(ctx)
	{
		super.render();

		Utils.SetColor(Color.RED);
		ctx.fillRect(this.pos[0] - 25, this.pos[1] - 25, 50, 50);
	}

	/**
	 * 
	 * @param {Array<number, number>} destPos 
	 */
	setDestPos(destPos)
	{
		this.destPos = destPos;
		this.setState(States.Move);
	}
}