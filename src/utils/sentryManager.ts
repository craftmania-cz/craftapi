import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
const express = require('express');
import { Logger } from "./Logger";
import { IConfig } from "config";

const config: IConfig = require("config");

const log = Logger('sentryManager');
const app = express();

export async function registerSentry() {
	log.info('Initializing Sentry with DSN: ' + config.get('sentry.dsn'));

	// Sentry
	Sentry.init({
		dsn: config.get('sentry.dsn'),
		environment: config.get('app.environment'),
		tracesSampleRate: 0.5,
		profilesSampleRate: 0.5,
		release: `api@${process.env.npm_package_version}`,
		autoSessionTracking: true,
		integrations: [
			// Source Maps generations - rewrite root path
			// @ts-ignore
			new RewriteFrames({
				root: __dirname,
			}),

			// Enable HTTP calls tracing
			new Sentry.Integrations.Http({ tracing: true }),

			// Express integration
			new Sentry.Integrations.Express({ app }),
		],
	});
}
