/**
 * Sentry instrumentation — must be imported FIRST before Express app is created.
 * Sentry.init() needs to run before any Express routes/middleware are registered
 * so that expressIntegration() can properly hook into the app.
 */
import * as Sentry from '@sentry/node';
const config = require('config');

const dsn: string = config.get('sentry.dsn');
const environment: string = config.get('app.environment');

if (environment === 'production' && dsn) {
	Sentry.init({
		dsn,
		environment,
		tracesSampleRate: 0.5,
		release: `api@${process.env.npm_package_version}`,
		integrations: [
			// Rewrites stack frame paths for source maps
			Sentry.rewriteFramesIntegration({ root: __dirname }),
			// Auto-instruments Express routes and creates transactions per request
			Sentry.expressIntegration(),
		],
	});
}
