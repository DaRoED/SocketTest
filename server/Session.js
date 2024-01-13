import { Socket } from "socket.io";
import { Player } from "./Game/Player.js";
import { PacketUtil } from "../Packet/PacketUtil.js";

export class Session
{
	/** @type {Socket} */
	socket = null;

	/** @type {Player} */
	player = null;

	id = '';

	/**
	 * 
	 * @param {Socket} socket 
	 */
	constructor(socket)
	{
		this.socket = socket;
		this.id = socket.id;
	}

	/**
	 * 
	 * @returns {Socket}
	 */
	getSocket() { return this.socket; }

	getSocketId() { return this.id; }

	/**
	 * 
	 * @param {number} packetId 
	 * @param {object} packetData 
	 */
	send(packetId, packetData)
	{
		
		// 데이터를 base64로 인코딩 후 패킷 전송
		const serializedPacket = PacketUtil.SerializePacket(packetData);
		this.socket.emit(packetId, serializedPacket);
	}

	disconnect()
	{
		this.socket.disconnect();
	}
}