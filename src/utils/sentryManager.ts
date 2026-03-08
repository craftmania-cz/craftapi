import * as Sentry from '@sentry/node';
import { Logger } from "./Logger";
import { Config } from "config";

const config: Config = require("config");

const log = Logger('sentryManager');

export async function registerSentry() {
	log.info('Initializing Sentry with DSN: ' + config.get('sentry.dsn'));

	Sentry.init({
		dsn: config.get('sentry.dsn'),
		environment: config.get('app.environment'),
		tracesSampleRate: 0.5,
		release: `api@${process.env.npm_package_version}`,
		integrations: [
			Sentry.rewriteFramesIntegration({
				root: __dirname,
			}),
		],
	});
}
