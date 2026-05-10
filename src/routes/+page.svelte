<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { Tween } from 'svelte/motion';
	import { sineInOut } from 'svelte/easing';

	let { data }: PageProps = $props();

	const INTERVAL_MS = 2000;
	let interval: ReturnType<typeof setInterval> | null = null;
	onMount(() => {
		if (!interval) interval = setInterval(() => invalidateAll(), INTERVAL_MS);
		return () => {
			if (interval) clearInterval(interval);
		};
	});

	let displayValue = new Tween(0, { easing: sineInOut, duration: INTERVAL_MS / 2 });
	$effect(() => {
		displayValue.set(data.number);
	});
</script>

<section>
	<p>{data.name}</p>
	<code>{Intl.NumberFormat(undefined).format(parseInt(displayValue.current.toFixed(0)))}</code>
</section>

<style>
	section {
		display: grid;
		width: 100dvw;
		height: 100dvh;
		place-content: center;
		& code {
			font-size: 3rem;
		}
	}
</style>
