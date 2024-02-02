// import { Socket } from "socket.io";
import { MovePacket } from "./Packet/MovePacket.js";
import { Player } from "./Player.js"
import { InputManager } from "./gameput.js";
import { PacketTypeEnum } from "./Packet/PacketType.js";
import { PacketUtil } from "./Packet/PacketUtil.js";
import { Direction } from "./FlipbookActor.js";
import { States } from "./GameObject.js";

export class MyPlayer extends Player
{
	/** @type {Socket} */
	socket = null;
	keyPressed = false;

	constructor(socket)
	{
		super();
		this.socket = socket;
	}

	update(ctx, dt)
	{
		super.update(ctx, dt);
	}

	IdleUpdate(dt)
	{
		super.IdleUpdate(dt);
	}

	MoveUpdate(dt)
	{
		super.MoveUpdate(dt);
	}

	InputUpdate(dt)
	{
		const moveVec = [0, 0];

		if (InputManager.isPressed('a'))
		{
			moveVec[0]--;
			this.setDirection(Direction.Left);
			this.keyPressed = true;
		}

		if (InputManager.isPressed('s'))
		{
			moveVec[1]++;
			this.setDirection(Direction.Down);
			this.keyPressed = true;
		}

		if (InputManager.isPressed('w'))
		{
			moveVec[1]--;
			this.setDirection(Direction.Up);
			this.keyPressed = true;
		}

		if (InputManager.isPressed('d'))
		{
			moveVec[0]++;
			this.setDirection(Direction.Right);
			this.keyPressed = true;
		}

		const dist = Math.sqrt(moveVec[0] * moveVec[0] + moveVec[1] * moveVec[1]);

		if (dist > 1) return;

		if (dist > 0)
		{
			moveVec[0] /= dist;
			moveVec[1] /= dist;

			// this.pos[0] += moveVec[0] * this.moveSpped * dt;
			// this.pos[1] += moveVec[1] * this.moveSpped * dt;

			this.setDestPos([this.pos[0] + moveVec[0] * this.moveSpped * dt, this.pos[1] + moveVec[1] * this.moveSpped * dt]);

			const movePacket = new MovePacket();
			movePacket.id = this.id;
			movePacket.pos = this.destPos;
			movePacket.direction = this.direction;

			this.socket.emit(PacketTypeEnum.move, PacketUtil.SerializePacket(movePacket));
		}
		else
		{
			this.setState(States.Idle);
		}
	}

	setState(state)
	{
		super.setState(state);
	}
}