export const Color = 
{
	BLACK: 0,
	WHITE: 1,
	RED: 2,
	BLUE: 3,
	GREEN: 4,
	YELLOW: 5,
	PURPLE: 6,
}

export class Utils
{
	static #lastTime = performance.now();
	static #dt = 0;

	/** @type {CanvasRenderingContext2D} */
	static #ctx = null;

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
	static Init(ctx)
	{
		this.#ctx = ctx;
	}

	static GetRandom(min, max)
	{
		return Math.floor((Math.random() * (max - min + 1)) + min);
	}

	/**
	 * 
	 * @param {number} color 
	 */
	static SetColor(color = 'white')
	{
		switch (color)
		{
			case Color.WHITE:
				this.#ctx.fillStyle = 'white';
				break;

			case Color.BLACK:
				this.#ctx.fillStyle = "black";
				break;

			case Color.RED:
				this.#ctx.fillStyle = "red";
				break;

			case Color.BLUE:
				this.#ctx.fillStyle = "blue";
				break;

			case Color.GREEN:
				this.#ctx.fillStyle = "green";
				break;

			case Color.YELLOW:
				this.#ctx.fillStyle = "yellow";
				break;

			case Color.PURPLE:
				this.#ctx.fillStyle = "purple";
				break;
		}
	}

	/**
	 * 
	 * @param {number} alpha 
	 */
	static SetAlpha(alpha)
	{
		this.#ctx.globalAlpha = alpha;
	}

	static calculateDeltaTime()
	{
		const now = performance.now();
		this.#dt = (now - this.#lastTime) / 1000;
		this.#lastTime = now;
	}

	/**
	 * @returns {number}
	 */
	static get deltaTime()
	{
		return this.#dt;
	}

	static clamp(num, a, b)
	{
		return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
	}
}