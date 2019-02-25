import * as dns from 'dns';


const getCurrentTimeMs = () => {
	return new Date().getTime();
};


/**
 * Attempts to resolve Minecraft PC SRV records from DNS, otherwise falling back to the old hostname.
 *
 * @param hostname hostname to check
 * @param port port to pass to callback if required
 * @param callback function with a hostname and port parameter
 */
const unfurlSRV = (hostname: any, port: any, callback: any) => {
	dns.resolveSrv("_minecraft._tcp."+hostname, (_err: any, records: any) => {
		if(!records||records.length<=0) {
			callback(hostname, port);
			return;
		}
		callback(records[0].name, records[0].port);
	})
};

export {
	getCurrentTimeMs,
	unfurlSRV
}