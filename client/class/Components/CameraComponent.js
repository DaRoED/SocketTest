import { Player } from "../Player.js";
import { SceneManager } from "../SceneManager.js";
import { Utils } from "../Utils.js";

export class CameraComponent
{
	/** @type {Player} */
	owner = null;

	init()
	{

	}

	update(ctx, dt)
	{
		SceneManager.getInstance().getScene().camera_pos = 
		[Utils.clamp(this.owner.pos[0], -357, 357), Utils.clamp(this.owner.pos[1], -625, 643)];
	}

	render(ctx)
	{

	}
}