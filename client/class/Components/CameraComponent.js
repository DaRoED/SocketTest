import { Player } from "../Player.js";
import { SceneManager } from "../SceneManager.js";

export class CameraComponent
{
	/** @type {Player} */
	owner = null;

	init()
	{

	}

	update(ctx, dt)
	{
		SceneManager.getInstance().getScene().camera_pos = this.owner.pos;
	}

	render(ctx)
	{

	}
}