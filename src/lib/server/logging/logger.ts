import { asyncLocalStorage } from './async-local-storage';
import { getSimplePrettyTerminal, neon } from '@loglayer/transport-simple-pretty-terminal';
import { LogLayer, type ILogLayer } from 'loglayer';

export function createLogger(): LogLayer {
	return new LogLayer({
		transport: [
			getSimplePrettyTerminal({
				runtime: 'node',
				theme: neon
			})
		]
	});
}

export const defaultLogger = createLogger();

export function getLogger(): ILogLayer {
	const store = asyncLocalStorage.getStore();
	if (!store) {
		return defaultLogger;
	}
	return store.logger;
}
