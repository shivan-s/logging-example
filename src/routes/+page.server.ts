import { getLogger } from '$lib/server/logging';
import type { PageServerLoad } from './$types';

function generateNumber() {
	const log = getLogger();
	const number = Math.round(Math.random() * 1_000_000);
	log.withMetadata({ number }).info('Generating Number');
	return number;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	const name = url.searchParams.get('name');
	const log = locals.log.withPrefix('[Load]').withContext({ name });
	log.info('Start of load');
	const number = generateNumber() ?? 0;
	log.info('End of Load');
	return { number, name };
};
