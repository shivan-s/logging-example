import { asyncLocalStorage, getLogger, createLogger } from '$lib/server/logging';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { randomUUID } from 'node:crypto';

class Clock {
	#value: number;
	constructor() {
		this.#value = 0;
	}

	#increment() {
		this.#value += 1;
	}

	get value() {
		this.#increment();
		return this.#value;
	}
}

const clock = new Clock();

const logHandle: Handle = async ({ event, resolve }) => {
	const requestId = clock.value;
	const url = event.url.pathname;
	event.locals.requestId = requestId;
	const method = event.request.method;

	const log = createLogger();
	log.withContext({ requestId });
	event.locals.log = log;

	return asyncLocalStorage.run({ logger: log }, async () => {
		const response = await resolve(event);
		const status = response.status;
		log.info(`${method} ${status} ${url}`);
		return response;
	});
};

export const handle = sequence(logHandle);
