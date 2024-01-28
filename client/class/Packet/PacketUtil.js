export class PacketUtil 
{
	/**
	 *
	 * @param {object} packet
	 * @returns {string}
	 */

	static encoder = new TextEncoder();
	static decoder = new TextDecoder();

	static SerializePacket(packet) 
	{
		const s = JSON.stringify(packet);
		const d = this.bytesToBase64(this.encoder.encode(s));
		return d;
	}

	/**
	 *
	 * @param {string} packet
	 * @returns {object}
	 */
	static Parse(packet) 
	{
		const s = this.decoder.decode(this.base64ToBytes(packet));
		const d = JSON.parse(s);
		return d;
	}

	static base64ToBytes(base64) 
	{
		const binString = atob(base64);
		return Uint8Array.from(binString, (m) => m.codePointAt(0));
	}

	static bytesToBase64(bytes) 
	{
		const binString = String.fromCodePoint(...bytes);
		return btoa(binString);
	}
}
