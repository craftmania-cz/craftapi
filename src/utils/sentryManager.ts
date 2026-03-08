/**
 * @deprecated Sentry is now initialized via src/instrument.ts which is imported
 * first in server.ts. This file is kept for backward compatibility only.
 */
export function registerSentry(): void {
	// no-op: Sentry init moved to instrument.ts for correct initialization order
}
