import { Scene } from "./Scene.js";
import { StartScene } from "./StartScene.js";
import { LoadingScene } from "./LoadingScene.js";
import { GameScene } from "./GameScene.js";

export const SceneType =
{
	None: 0,
	Start: 1,
	Loading: 2,
	Game: 3,
}

export class SceneManager
{
	/** @type {CanvasRenderingContext2D} */
	ctx = null;

	/** @type {Scene} */
	scene = null;

	/** @type {SceneType} */
	sceneType = SceneType.None;

	/** @type {SceneManager} */
	static #instance = null;

	/**
	 * 
	 * @returns {SceneManager}
	 */
	static getInstance()
	{
		if (this.#instance == null)
		{
			this.#instance = new SceneManager();
		}

		return this.#instance;
	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {Scene} scene 
	 */
	init(ctx, sceneType)
	{
		this.ctx = ctx;
		this.sceneType = SceneType[sceneType];
		this.changeScene(sceneType);
	}

	/**
	 * 
	 * @param {SceneType} type 
	 */
	changeScene(type)
	{
		switch (type) {
			case SceneType.Start:
				if (!(this.scene instanceof StartScene))
				{
					const scene = new StartScene(this.ctx);
					this.scene = scene;
				}
				break;

			case SceneType.Game:
				if (!(this.scene instanceof GameScene))
				{
					const scene = new GameScene(this.ctx);
					this.scene = scene;
				}
				break;

			case SceneType.Loading:
				if (!(this.scene instanceof LoadingScene))
				{
					const scene = new LoadingScene(this.ctx);
					this.scene = scene;
				}
				break;
			default:
				throw new TypeError('Scene 타입이 이상합니다.');
		}

		this.scene.init();
	}

	/** @type {Scene} */
	getScene()
	{
		return this.scene;
	}

	/**
	 * 
	 * @returns {SceneType}
	 */
	getSceneType()
	{
		return this.sceneType;
	}
}