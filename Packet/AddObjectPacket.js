import { PlayerInfo } from "./PlayerInfo.js";

export class AddObjectPacket
{
	// 플레이어 추가 패킷 만들어야됨
	// 만들고 나서 main으로 돌아서 이 패킷을 다시 클라로 싸주고
	// 난 다음에 그걸 다시 클라에서 해석해서 Scene에 추가

	/** @type {Array<PlayerInfo>} */
	objects = [];
}