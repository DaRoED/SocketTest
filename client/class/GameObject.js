import { GEN_UUID } from "./GEN_UUID.js"

export const States =
{
	None: 0,
	Move: 1,
	Idle: 2,
}

export class GameObject
{
	components = [];
	state = States.None;
	pos = [0, 0];
	id = 0;

    init()
    {
		this.id = GEN_UUID();
    }

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {number} dt 
	 */
    update(ctx, dt)
    {
		switch (this.state) {
			case States.Idle:
				this.IdleUpdate(dt);
				break;

			case States.Move:
				this.MoveUpdate(dt);
				break;

			default:
				throw new TypeError('오브젝트의 상태값이 None 입니다.');
		}

		for (const component of this.components)
		{
			component.update(ctx, dt);
		}
    }

	IdleUpdate(ctx, dt)
	{

	}

	MoveUpdate(ctx, dt)
	{

	}

	/**
	 * 
	 * @param {CanvasRenderingContext2D} ctx 
	 */
    render(ctx)
    {
		for (const component of this.components)
		{
			component.render(ctx);
		}
    }

	/**
	 * 
	 * @param {Array<number, number>} pos 
	 */
	setPos(pos)
	{
		this.pos = pos;
	}
	
	setState(state)
	{
		this.state = state;
	}
}

