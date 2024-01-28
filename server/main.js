import { Server } from 'socket.io';
import { SessionManager } from './SessionManager.js';

import UUID_INT from 'uuid-int'

import express from 'express';
import path from 'path';

import { PacketTypeEnum } from '../Packet/PacketType.js';
import { PlayerInfo } from '../Packet/PlayerInfo.js';
import { Player, States } from './Game/Player.js';
import { GRoom } from './Game/GameRoom.js';
import { AddObjectPacket } from '../Packet/AddObjectPacket.js';
import { PacketUtil } from '../Packet/PacketUtil.js';
import { RemoveObjectPacket } from '../Packet/RemoveObjectPacket.js';
import { MyPlayerPacket } from '../Packet/MyPlayerPacket.js';
import { MovePacket } from '../Packet/MovePacket.js';
import { EnterPacket } from '../client/class/Packet/EnterPacket.js';

const __dirname = path.resolve();
const id = 81;

const GENERATOR = UUID_INT(id);


const app = express();

app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) =>
{
	res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/aHRtbC9pbmRleC5qcw==', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/index.js'));
});

const server = app.listen(3000, () => {
	console.log('listening on port 3000');
	SessionManager.Init();
});


const io = new Server(server);
GRoom.Init();

io.on('connection', socket => {
	// 세션매니저를 통해 소켓으로 세션을 만들고 그 세션을 매니저에 등록
	const session = SessionManager.createSession(socket);
	console.log(`id ${session.getSocketId()} is connected`);


	socket.on(PacketTypeEnum.enter, (packet_d) =>
	{
		/** @type {EnterPacket} */
		const packet = PacketUtil.Parse(packet_d);

		// MyPlayer 패킷을 보냄 => 클라이언트에서 MyPlayer를 생성
		const id = GENERATOR.uuid();
		const pos = [getRandom(250, 500), getRandom(250, 500)];
		const color = getRandom(1, 6);
		const width = 25;
		const height = 25;

		const myPlayerPacket = new MyPlayerPacket();
		myPlayerPacket.info  = new PlayerInfo(id, pos, color, States.Idle, width, height, packet.name);

		const player = new Player(session, States.Idle, color, pos, id, width, height, packet.name);
		session.player = player;

		GRoom.add_object(player);
		session.send(PacketTypeEnum.my_player, myPlayerPacket);

		// 현재 접속해 있는 플레이어의 정보를 방금 접속한 클라한테 보내줌
		const addObjectPacket = new AddObjectPacket();
		const players = GRoom.getPlayers();

		players.forEach((player, id) =>
		{
			const playerInfo = new PlayerInfo(player.id, player.pos, player.color, player.state, width, height, player.name);
			addObjectPacket.objects.push(playerInfo);
		});

		session.send(PacketTypeEnum.add_object, addObjectPacket);

		// 방금 접속한 클라의 정보를 모든 클라한테 보내줌
		const b_addObjectPacket = new AddObjectPacket();
		b_addObjectPacket.objects.push(myPlayerPacket.info);

		SessionManager.broadcast(PacketTypeEnum.add_object, b_addObjectPacket);
	});

	socket.on(PacketTypeEnum.move, packet_d =>
	{
		/** @type {MovePacket} */
		const packet = PacketUtil.Parse(packet_d);

		const player = GRoom.find_object(packet.id);
		if (!player) return;

		player.pos = packet.pos;

		SessionManager.broadcast(PacketTypeEnum.move, packet);
	});

	// 소켓과의 연결이 끊어졌을 때 이유와 설명을 로그로 찍음
	socket.on('disconnect', (reason, description) => 
	{
		console.log('disconnect: ' + socket.id, reason, description);

		if (session.player == null) return;

		const playerId = session.player.id;

		GRoom.remove_object(playerId);

		const removeObjectPacket = new RemoveObjectPacket();
		removeObjectPacket.ids.push(playerId);

		SessionManager.removeSession(session.id);
		SessionManager.broadcast(PacketTypeEnum.remove_object, removeObjectPacket);
	});
});


function getRandom(min, max)
{
	return Math.floor((Math.random() * (max - min + 1)) + min);
}