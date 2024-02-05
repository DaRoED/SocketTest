import { Direction, FlipbookActor } from "./FlipbookActor.js";
import { SceneManager } from "./SceneManager.js";
import { Color, Utils } from "./Utils.js";
import { States } from "./GameObject.js";
import { ResourceManager } from "./ResourceManager.js";

export class Player extends FlipbookActor
{
	destPos = [0, 0];

	moveSpped = 200;

	width = 120;

	height = 80;

	name = '';

	lastState = States.None;

	/**
	 * 
	 * @param {Array<number>} pos
	 * @param {Color} color
	 * @param {number} id
	 * @param {number} state
	 * @param {number} width
	 * @param {number} height
	 * @param {string} name
	 */
	init(pos, color, id, state, width, height, name)
	{
		this.width = width;
		this.height = height;
		this.pos = pos;
		this.color = color;
		this.id = id;
		this.name = name;

		this.setState(state);
	}

	setAnimationSetting(image, start, cuts, repeat, repeat_time, sizes)
	{
		super.init(image, start, cuts, repeat, repeat_time, sizes);
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
			this.pos[1] = Utils.clamp(this.pos[1] += direction_y, -975, 960);

		}
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
		super.render(ctx);

		const camera_pos = SceneManager.getInstance().getScene().camera_pos;
		const window_pos = [ctx.canvas.width, ctx.canvas.height];

		const render_pos = [null, null];
		render_pos[0] = this.pos[0] - (this.width / 2) - (camera_pos[0] - window_pos[0] / 2);
		render_pos[1] = this.pos[1] - (this.height / 2) - (camera_pos[1] - window_pos[1] / 2);

		Utils.SetColor(Color.WHITE);
		ctx.font = 'bold 13px serif';
		ctx.textAlign = 'start';

		const text_width = ctx.measureText(this.name).width;
		const pos_x = render_pos[0] + this.width;

		const gap = (render_pos[0] + text_width - pos_x) / 2;

		ctx.fillText(this.name, render_pos[0] - gap, render_pos[1] - 10);
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

	setState(state)
	{
		super.setState(state);

		switch (state)
		{
			case States.Idle:
				switch (this.direction)
				{
					case Direction.Down:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_down'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Up:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_up'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Left:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_left'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Right:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_right'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.DownLeft:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_downLeft'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.DownRight:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_downRight'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.UpLeft:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_upLeft'), [100, 50], [14, 4], true, 0.15, [55, 124]);
						break;

					case Direction.UpRight:
						this.setAnimationSetting(ResourceManager.getResource('player1_idle_upRight'), [100, 100], [14, 4], true, 0.15, [55, 124]);
						break;
				}
				break;

			case States.Move:
				switch (this.direction)
				{
					case Direction.Down:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_down'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Up:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_up'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Left:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_left'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.Right:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_right'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.DownLeft:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_downLeft'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.DownRight:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_downRight'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.UpLeft:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_upLeft'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;

					case Direction.UpRight:
						this.setAnimationSetting(ResourceManager.getResource('player1_walk_upRight'), [100, 45], [9, 4], true, 0.15, [55, 124]);
						break;
				}
				break;
		}
	}
}