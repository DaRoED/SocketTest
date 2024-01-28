import { UI } from "./UI.js";
import { InputManager } from "./gameput.js";

export class TextInputUI extends UI
{
	text_input_width = 0;
	text_input_height = 0;

	offset_x = 0;
	offset_y = 0;

	constructor(image_src, shape = UI_Shape.Rect, text_input_width = null, text_input_height = null, image_width = null, image_height = null)
	{
		super(image_src, shape, image_width, image_height);

		this.text_input_width = text_input_width;
		this.text_input_height = text_input_height;
	}

	init(ctx)
	{
		const text_input = document.createElement("input");
		text_input.setAttribute("type", "text");

		text_input.style.width = `${this.text_input_width}px`;
		text_input.style.height = `${this.text_input_height}px`;
		text_input.id = "text_input_box";

		this.text_input = text_input;
		document.body.appendChild(text_input);
	}

	HoverUpdate(ctx, dt)
	{
		if (InputManager.isPressed('leftmouse'))
		{
			
		}
	}

	render(ctx)
	{
		super.render(ctx);

		const window_pos = [window.innerWidth, window.innerHeight];
		const render_pos = [null, null];

		render_pos[0] = this.pos[0] - (this.text_input_width / 2) + window_pos[0] / 2;
		render_pos[1] = this.pos[1] - (this.text_input_height / 2) + window_pos[1] / 2;

		this.text_input.style.transform = `translate(${render_pos[0] + this.offset_x}px, ${render_pos[1] + this.offset_y}px)`;
	}

	remove()
	{
		this.text_input.remove();
	}

	setOffset(offset_x, offset_y)
	{
		this.offset_x = offset_x;
		this.offset_y = offset_y;
	}

	getInputData()
	{
		return this.text_input.value;
	}
}