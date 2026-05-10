import type { ILogLayer } from 'loglayer';

declare global {
	namespace App {
		interface Locals {
			requestId: number;
			log: ILogLayer;
		}
	}
}

export {};
