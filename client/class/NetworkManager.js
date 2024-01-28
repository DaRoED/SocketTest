export class NetworkManager
{
	static socket = null;

	static init(socket)
	{
		this.socket = socket;
	}

	static getSocket()
	{
		return this.socket;
	}
}