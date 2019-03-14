import { getCurrentTimeMs, unfurlSRV } from "./utils";

let mcpc_ping = require('mc-ping-updated');
let serverObject: any = null;

const pingMinecraftServer = (host: any, port: any, timeout: any, callback: any, version: any) => {
	let startTime = getCurrentTimeMs();

	mcpc_ping(host, port, (err: any, res: any) => {
		if (err) {
			callback(err, null);
		} else {
			// Remap our JSON into our custom structure.
			callback(null, {
				players: {
					online: res.players.online,
					max: res.players.max
				},
				version: res.version.protocol,
				latency: getCurrentTimeMs() - startTime,
				favicon: res.favicon
			});
		}

	}, timeout, version);
};

const ping = (host: any, port: any, type: any, timeout: any, callback: any, version: any) => {
	if (type === 'PC') {
		unfurlSRV(host, port, (host: any, port: any) => {
			pingMinecraftServer(host, port || 25565, timeout, callback, version);
		});
	}
};

const callServer = () => {
	ping('mc.craftmania.cz', 25565, 'PC', 1000, (_err: any, res: any) => {
		serverObject = res;
	}, 40);
};

export {
	ping,
	callServer,
	serverObject
};
