import { ButtonUI } from "./ButtonUI.js";
import { ImageTexture } from "./ImageTexture.js";
import { Scene } from "./Scene.js";
import { SceneManager, SceneType } from "./SceneManager.js";
import { TextInputUI } from "./TextInputUI.js";
import { UI, UI_Shape } from "./UI.js";
import { Utils } from "./Utils.js";

export class StartScene extends Scene
{
	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	constructor(ctx)
	{
		super(ctx);
	}

	init()
	{
		const start_scene_background = new ImageTexture();
		start_scene_background.init('../resources/start_scene_background.jpg', 1280, 720);

		const textinputui = new TextInputUI('../resources/nickname_input_box.png', UI_Shape.Rect, 300, 40, 361, 70); // image 비율: 5.16(가로/세로)
		textinputui.init(this.ctx, 49.8, 60.5);
		textinputui.setPos(0, 100);

		const start_boutton = new ButtonUI('../resources/start_button.png', UI_Shape.Rect, 300, 90);
		start_boutton.init();
		start_boutton.setPos(0, 200);


		start_boutton.setClickCallback((ctx) =>
		{
			let name = textinputui.getInputData();
			if (name === '') name = (['@#$(#$)@_#!', 'TG92ZSBXaW5zIEFsbA=='])[Utils.GetRandom(0, 1)];

			textinputui.remove();

			SceneManager.getInstance().changeScene(SceneType.Loading, ((ctx) =>
			{
				SceneManager.getInstance().changeScene(SceneType.Game, name);
			}));
		});

		this.add_object(start_scene_background);
		this.add_object(start_boutton);
		this.add_object(textinputui);

	}

	update(dt)
	{
		super.update(dt);
	}

	render()
	{
		super.render();
	}

	/**
	 * 
	 * @param {number} id 
	 * @returns {GameObject | undefined}
	 */
	find_object(id)
	{
		return super.find_object(id);
	}

	/**
	 * 
	 * @param {GameObject} object 
	 */
	add_object(object)
	{
		return super.add_object(object);
	}

	/**
	 * 
	 * @param {GameObject} object 
	 */
	remove_object(object)
	{
		super.remove_object(object);
	}
}