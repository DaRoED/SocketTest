// import { Socket } from "socket.io";
import { Player } from "./class/Player.js";
import { SceneManager, SceneType } from "./class/SceneManager.js";
import { Color, Utils } from "./class/Utils.js";
import { PlayerInfo, States } from "./class/Packet/PlayerInfo.js";
import { PacketTypeEnum } from "./class/Packet/PacketType.js";
import { PacketUtil } from "./class/Packet/PacketUtil.js";
import { AddObjectPacket } from "./class/Packet/AddObjectPacket.js";
import { MyPlayerPacket } from "./class/Packet/MyPlayerPacket.js";
import { MyPlayer } from "./class/MyPlayer.js";
import { RemoveObjectPacket } from "./class/Packet/RemoveObjectPacket.js";
import { limitLoop } from "./class/limitloop.js";
import { MovePacket } from "./class/Packet/MovePacket.js";
import { CameraComponent } from "./class/Components/CameraComponent.js";
import { InputManager } from "./class/gameput.js";
import { NetworkManager } from "./class/NetworkManager.js";
import { ResourceManager } from "./class/ResourceManager.js";

const fps = 100;

/** @type {HTMLCanvasElement} */
let canvas = null;

/** @type {CanvasRenderingContext2D} */
let ctx = null;



window.onload = () => 
{
	/** @type {Socket} */
	const socket = io();

	socket.on('connect', () =>
	{
		console.log('Connected to server');
	});


	socket.on(PacketTypeEnum.add_object, packet_d =>
	{
		/** @type {AddObjectPacket} */
		const packet = PacketUtil.Parse(packet_d);
		for (let i = 0; i < packet.objects.length; i++)
		{
			const playerInfo = packet.objects[i];
			const player = new Player();
			player.init(playerInfo.pos, playerInfo.color, playerInfo.id, playerInfo.state, playerInfo.width, playerInfo.height, playerInfo.name);

			SceneManager.getInstance().getScene().add_object(player);
		}
	});

	socket.on(PacketTypeEnum.my_player, packet_d =>
	{
		/** @type {MyPlayerPacket} */
		const packet = PacketUtil.Parse(packet_d);
		const playerInfo = packet.info;

		const my_player = new MyPlayer(socket);
		my_player.init(playerInfo.pos, playerInfo.color, playerInfo.id, playerInfo.state, playerInfo.width, playerInfo.height, playerInfo.name);
		my_player.setAnimationSetting(ResourceManager.getResource('player1_idle'), [0,0], [8, 4], true, 0.15);

		my_player.add_component(new CameraComponent());

		SceneManager.getInstance().getScene().set_myPlayer(my_player);

		SceneManager.getInstance().getScene().add_object(my_player);
	});

	socket.on(PacketTypeEnum.remove_object, packet_d =>
	{
		/** @type {RemoveObjectPacket} */
		const packet = PacketUtil.Parse(packet_d);

		packet.ids.forEach(id =>
		{
			SceneManager.getInstance().getScene().remove_object(id);
		});
	});

	socket.on(PacketTypeEnum.move, packet_d =>
	{
		/** @type {MovePacket} */
		const packet = PacketUtil.Parse(packet_d);

		const player = SceneManager.getInstance().getScene().find_object(packet.id);

		if (player && (player.id !== SceneManager.getInstance().getScene().my_player.id))
		{
			player.setDestPos(packet.pos);
		}
	});


	socket.on('disconnect', () =>
	{
		console.log('Disconnected');
	});

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	init(socket);
	update();
};

window.onresize = ev =>
{
	document.body.style.width = `${window.innerWidth}px`;
	document.body.style.height = `${window.innerHeight}px`;
};


function init(socket)
{
	Utils.Init(ctx);
	NetworkManager.init(socket);

	SceneManager.getInstance().init(ctx, SceneType.Start);

	document.body.style.width = `${window.innerWidth}px`;
	document.body.style.height = `${window.innerHeight}px`;
}

function update()
{
	const scene = SceneManager.getInstance().getScene();

	canvas.width = 1280;
	canvas.height = 720;

	// Utils.SetColor(Color.BLACK);
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	scene.update(Utils.deltaTime);
	scene.render();

	const mouse_pos = InputManager.getMousePos(ctx);
	Utils.SetColor(Color.WHITE);
	ctx.font = '10px sans-serif';
	ctx.fillText(`x: ${mouse_pos[0]} y: ${mouse_pos[1]}`, 100, 100);

	Utils.calculateDeltaTime();
}

limitLoop(update, fps);