import { GameObject } from "./GameObject.js";
import { ImageTexture } from "./ImageTexture.js";
import { SceneManager } from "./SceneManager.js";
import { Color, Utils } from "./Utils.js";
import { InputManager } from "./gameput.js";

export const UI_State =
{
	N_Hover: 1,
	Hover: 2,
}

export const UI_Shape =
{
	Rect: 1,
	Round: 2,
	Triangle: 3
}

export class UI extends GameObject
{
	/** @type {ImageTexture} */
	texture = null;

	/** @type {UI_Shape} */
	shape = UI_Shape.Rect;

	/** @type {UI_State} */
	state = UI_State.N_Hover;

	radius = 0;

	width = 0;

	height = 0;

	constructor(image_src, shape = UI_Shape.Rect, width = null, height = null)
	{
		super();

		const texture = new ImageTexture();
		texture.init(image_src, width, height);
		this.shape = shape;

		this.texture = texture;
		texture.pos = [0, 0];

		this.width = width;
		this.height = height;
	}

	update(ctx, dt)
	{
		this.DetectHover(ctx);
		this.texture.update(ctx, dt);

		switch (this.state)
		{
			case UI_State.N_Hover:
				this.N_HoverUpdate(ctx, dt);
				break;
			case UI_State.Hover:
				this.HoverUpdate(ctx, dt);
				break;

			default:
				throw new TypeError("알맞지 않은 UI 상태입니다.");
				break;
		}

		for (const component of this.components)
		{
			component.update(ctx, dt);
		}
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	DetectHover(ctx)
	{
		if (this.shape == UI_Shape.Rect)
		{
			const ui_pos = this.pos;
			const width = this.texture.image.width;
			const height = this.texture.image.height

			const mouse_pos = InputManager.getMousePos(ctx);
			const camera_pos = SceneManager.getInstance().getScene().camera_pos;
			const window_pos = [ctx.canvas.width, ctx.canvas.height];

			const cx = (camera_pos[0] - window_pos[0] / 2)
			const cy = (camera_pos[1] - window_pos[1] / 2);

			const left_x = ui_pos[0] - width / 2 - cx;
			const right_x = ui_pos[0] + width / 2 - cx;
			const top_y = ui_pos[1] - height / 2 - cy;
			const bottom_y = ui_pos[1] + height / 2 - cy;

			if (left_x < mouse_pos[0] && right_x > mouse_pos[0] && top_y < mouse_pos[1] && bottom_y > mouse_pos[1])
			{
				this.setState(UI_State.Hover);
			}
			else
			{
				this.setState(UI_State.N_Hover);
			}
		}
	}

	N_HoverUpdate(ctx, dt)
	{

	}

	HoverUpdate(ctx, dt)
	{

	}

	init(ctx)
	{
		super.init();
	}

	render(ctx)
	{
		super.render();
		this.texture.render(ctx);
	}

	/**
	 * 
	 * @param {number} x 
	 * @param {number} y 
	 */
	setPos(x, y)
	{
		this.pos = [x, y];
		this.texture.pos = this.pos;
	}
}