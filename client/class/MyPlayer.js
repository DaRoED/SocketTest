// import { Socket } from "socket.io";
import { MovePacket } from "./Packet/MovePacket.js";
import { Player } from "./Player.js"
import { InputManager } from "./gameput.js";
import { PacketTypeEnum } from "./Packet/PacketType.js";
import { PacketUtil } from "./Packet/PacketUtil.js";

export class MyPlayer extends Player
{
	/** @type {Socket} */
	socket = null;

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

	inputUpdate(dt)
	{
		const moveVec = [0, 0];

		if (InputManager.isPressed('a'))
		{
			moveVec[0]--;
		}

		if (InputManager.isPressed('w'))
		{
			moveVec[1]--;
		}

		if (InputManager.isPressed('s'))
		{
			moveVec[1]++;
		}

		if (InputManager.isPressed('d'))
		{
			moveVec[0]++;
		}

		const dist = Math.sqrt(moveVec[0] * moveVec[0] + moveVec[1] * moveVec[1]);

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

			this.socket.emit(PacketTypeEnum.move, PacketUtil.SerializePacket(movePacket));
		}
	}
}