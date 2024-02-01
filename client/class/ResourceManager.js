import { ImageTexture } from "./ImageTexture.js";

export class ResourceManager
{
	/** @type {Map<string, ImageTexture>} */
	static resources = new Map();

	static addResource(name, texture)
	{
		if (this.resources.has(name)) return false;
		this.resources.set(name, texture);
		return true;
	}

	static removeResource(name)
	{
		return this.resources.delete(name);
	}

	static getResource(name)
	{
		return this.resources.get(name);
	}
}