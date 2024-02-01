import { GameObject } from "./GameObject.js";
import { ImageTexture } from "./ImageTexture.js";
import { SceneManager } from "./SceneManager.js";

export const Direction = 
{
	Down: 	0,
	Left: 	1,
	Right: 	2,
	Up: 	3,
}

export class FlipbookActor extends GameObject
{
	/** @type {ImageTexture} */
	texture = null;
	cuts = [0, 0];
	repeat = true;
	repeat_time = 0;
	start = [0, 0];
	count = 0;
	time = 0;

	/** @type {Direction} */
	direction = Direction.Down;

	init(image, start, cuts, repeat, repeat_time)
	{
		this.texture = image;
		this.start = start;
		this.cuts = cuts;
		this.repeat = repeat;
		this.repeat_time = repeat_time;
	}

	update(ctx, dt)
	{
		super.update(ctx, dt);

		if (this.count >= this.cuts[0] - 1)
		{
			if (this.repeat)
			{
				this.count = 0;
				this.time = 0;
			}
			else
			{
				return;
			}
		}

		this.time += dt;
		if (this.time >= this.repeat_time)
		{
			this.time = 0;
			this.count++;
		}
	}

	render(ctx)
	{
		super.render(ctx);

		const camera_pos = SceneManager.getInstance().getScene().camera_pos;
		const window_pos = [ctx.canvas.width, ctx.canvas.height];

		const render_pos = [null, null];
		render_pos[0] = this.pos[0] - (this.width / 2) - (camera_pos[0] - window_pos[0] / 2);
		render_pos[1] = this.pos[1] - (this.height / 2) - (camera_pos[1] - window_pos[1] / 2);

		const width = this.texture.image.width / this.cuts[0];
		const height = this.texture.image.height / this.cuts[1];

		ctx.drawImage(this.texture.image, this.start[0] + (width * this.count), this.start[1] + (height * this.direction), width, height, render_pos[0], render_pos[1], width, height);
	}

	setDirection(direction)
	{
		this.direction = direction;
	}
}