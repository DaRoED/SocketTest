export class PacketUtil
{
	/**
	 * 
	 * @param {object} packet 
	 * @returns {string}
	 */
	static SerializePacket(packet)
	{
		const s = JSON.stringify(packet);
		const d = btoa(s);
		return d;
	}

	/**
	 * 
	 * @param {string} packet 
	 * @returns {object}
	 */
	static Parse(packet)
	{
		const s = atob(packet);
		const d = JSON.parse(s);
		return d;
	}
}