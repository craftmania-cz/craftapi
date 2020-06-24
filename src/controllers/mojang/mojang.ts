import Axios from "axios";
import * as Res from "../../services/response";
const crypto = require('crypto');

const MojangAxios = Axios.create({
	baseURL: 'https://api.mojang.com/',
	timeout: 1000
});

async function _simpleGet<T>(url: string): Promise<T> {
	return (await MojangAxios.get(url)).data;
}

interface UuidResponseModel {
	id: string;
	name: string;
}

interface NameHistoryResponseModel {
	name: string;
	changedTo: string | null;
}

interface ProfileResponseModel {
	id: string;
	name: string;
	properties: [{
		value: string;
	}];
}

namespace Mojang {

	export async function getPlayerMojangUUID(req: any, res: any) {
		const player = req.params.name;
		if (player === undefined) {
			Res.property_required(res, "Required name in url parametr!");
			return;
		}
		const data = await _simpleGet<UuidResponseModel>('/users/profiles/minecraft/' + player + '?at=' + Date.now());
		let finalObject = {
			name: player,
			original: data.id !== undefined ? data.id : null,
			offline: crypto.createHash('md5').update('OfflinePlayer:' + player).digest('hex')
		};
		Res.success(res, finalObject);
	}

	export async function getPlayerMojangNameHistory(req: any, res: any) {
		const uuid = req.params.uuid;
		if (uuid === undefined) {
			Res.property_required(res, "Required uuid in url parametr!");
			return;
		}
		const data = await _simpleGet<Array<NameHistoryResponseModel>>('/user/profiles/' + uuid + '/names').catch((error: any) => {
			return Res.bad_request(res, error.message);
		});
		Res.success(res, data);
	}

	export async function getPlayerMojangProfile(req: any, res: any) {
		const uuid = req.params.uuid;
		if (uuid === undefined) {
			Res.property_required(res, "Required uuid in url parametr!");
			return;
		}
		const data = await _simpleGet<ProfileResponseModel>
		('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid) + '?unsigned=false').catch((error: any) => {
			return Res.bad_request(res, error.message);
		});
		// @ts-ignore
		if (data.properties === undefined) {
			return Res.not_found(res);
		}
		// @ts-ignore
		let profileValue = data.properties[0].value as string;
		const buffer = Buffer.from(profileValue, 'base64');
		Res.success(res, JSON.parse(buffer.toString()));
	}

}

export = Mojang;
