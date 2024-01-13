export const States =
{
	None: 0,
	Move: 1,
	Idle: 2,
}

export class GameObject
{
	state = States.None;
	pos = [0, 0];

    init()
    {
	
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
				this.IdleUpdate(ctx, dt);
				break;

			case States.Move:
				this.MoveUpdate(ctx, dt);
				break;

			case States.None:
				throw new TypeError('오브젝트의 상태값이 None 입니다.');
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

    }

	/**
	 * 
	 * @param {Array<number, number>} pos 
	 */
	setPos(pos)
	{
		this.pos = pos;
	}

	/**
	 * 
	 * @param {States} state 
	 */
	setState(state)
	{
		this.state = state;
	}
}

