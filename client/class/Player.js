import { GameObject, States } from "./GameObject.js";
import { SceneManager } from "./SceneManager.js";
import { Color, Utils } from "./Utils.js";

export class Player extends GameObject
{
	/** @type {Color} */
	color = null;

	destPos = [0, 0];

	moveSpped = 200;

	width = 50;

	height = 50;

	/**
	 * 
	 * @param {Array<number>} pos
	 * @param {Color} color
	 * @param {number} id
	 * @param {number} state
	 * @param {number} width
	 * @param {number} height
	 */
	init(pos, color, id, state, width, height)
	{
		this.width = width;
		this.height = height;
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
		this.InputUpdate(dt);
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
		}

		if (dist > 0)
		{
			this.pos[0] = Utils.clamp(this.pos[0] + direction_x, -987, 962);
			this.pos[1] = Utils.clamp(this.pos[1] += direction_y, -983, 959);
		}

		console.log('player: ', this.pos);
	}

	InputUpdate(dt)
	{
		
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	render(ctx)
	{
		super.render();

		const camera_pos = SceneManager.getInstance().getScene().camera_pos;
		const window_pos = [ctx.canvas.width, ctx.canvas.height];

		const render_pos = [null, null];
		render_pos[0] = this.pos[0] - (this.width / 2) - (camera_pos[0] - window_pos[0] / 2);
		render_pos[1] = this.pos[1] - (this.height / 2) - (camera_pos[1] - window_pos[1] / 2);


		Utils.SetColor(this.color);
		ctx.fillRect(render_pos[0], render_pos[1], this.width * 2, this.height * 2);
	}

	add_component(component)
	{
		component.init();
		component.owner = this;
		this.components.push(component);
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

	/**
	 * 
	 * @param {number} width 
	 */
	setWidth(width)
	{
		this.width = width;
	}

	/**
	 * @param {number} height 
	 */
	setHeight(height)
	{
		this.height = height;
	}
}