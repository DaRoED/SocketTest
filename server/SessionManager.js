import { Socket } from "socket.io";
import { Session } from "./Session.js";

export class SessionManager
{
	/** @type {Map<number, Session>} */
	static sessions = new Map();

	static Init()
	{
		this.sessions = new Map();
	}

	/**
	 * 
	 * @param {Socket} socket 
	 * @returns {Session}
	 */
	static createSession(socket)
	{
		const session = new Session(socket);
		this.addSession(session);

		return session;
	}

	/**
	 * 
	 * @param {Session} session 
	 * @return {Session | boolean}
	 */
	static findSession(id)
	{
		const session = this.sessions.get(id);

		if (session) return session;
		else return false;
	}

	/**
	 * 
	 * @param {Session} session
	 * @returns {boolean}
	 */
	static addSession(session)
	{
		if (this.findSession(session.getSocketId()) == false)
		{
			this.sessions.set(session.getSocketId(), session);
			return true;
		}

		return false;
	}

	/**
	 * 
	 * @param {number} id
	 * @returns {boolean} 
	 */
	static removeSession(id)
	{
		if (this.findSession(id))
		{
			this.sessions.delete(id);
			return true;
		}

		return false;
	}

	/**
	 * 
	 * @param {string} packetId 
	 * @param {*} packetData 
	 * @param {funtion(id)} condition
	 */
	static broadcast(packetId, packetData, condition = ((id) => {return true}))
	{
		this.sessions.forEach(session => {
			if (!condition(session.getSocketId())) return;
			session.send(packetId, packetData);
		});
	}
}