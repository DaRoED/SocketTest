import { GameObject } from "./GameObject.js";
import { ImageTexture } from "./ImageTexture.js";
import { SceneManager } from "./SceneManager.js";

export const Direction = 
{
	Down: 		0,
	Left: 		1,
	Right: 		2,
	Up: 		3,

	DownLeft: 	4,
	DownRight: 	5,

	UpLeft: 	6,
	UpRight: 	7,
}

export class FlipbookActor extends GameObject
{
	/** @type {ImageTexture} */
	texture = null;

	/** 첫 번째 원소는 전체 애니메이션 개수, 두 번째 원소는 한 줄에 있는 애니메이션 개수 */
	cuts = 			[0, 0];
	start = 		[0, 0];
	sizes = 		[0, 0];
	repeat = 		true;
	count = 		8;
	time = 			0;
	repeat_time = 	0;

	/** @type {Direction} */
	direction = Direction.Down;

	init(image, start, cuts, repeat, repeat_time, sizes)
	{
		if (image === this.texture) return;

		this.texture = 		image;
		this.start = 		start;
		this.cuts = 		cuts;
		this.repeat = 		repeat;
		this.sizes = 		sizes;
		this.repeat_time = 	repeat_time;

		this.count = 		0;
		this.time = 		0;
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

		const width = this.sizes[0];
		const height = this.sizes[1];

		const gap_width = this.texture.image.width / this.cuts[1];
		const gap_height = this.texture.image.height / Math.ceil(this.cuts[0] / this.cuts[1]);

		ctx.drawImage(this.texture.image, this.start[0] + (gap_width * (this.count % this.cuts[1])), this.start[1] + (gap_height * Math.floor(this.count / this.cuts[1])), width, height, render_pos[0], render_pos[1], this.height * 0.443, this.height);
	}

	setDirection(direction)
	{
		this.direction = direction;
	}
}