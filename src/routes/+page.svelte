<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Box from '../components/Box.svelte';
	import Cellar from '../components/Cellar.svelte';
	import Tavern from '../components/Tavern.svelte';
	import { store, Scene } from '../store';
	import { gameTick } from '../tick';

	onMount(() => {
		let lastTick = Date.now();
		const loop = () => {
			const now = Date.now();
			gameTick((now - lastTick) / 1000);
			lastTick = now;
			setTimeout(loop, 4);
		};
		loop();
	});
</script>

<div class="flex">
	<Box class="grow flex-col bg-red-950">
		<div>Rats killed: {Math.floor($store.kills)}</div>
	</Box>
	<Box class="grow flex-col bg-red-950">
		<div>Energy: {$store.energy} / {$store.maxEnergy}</div>
	</Box>
	{#if $store.hiredAdventurers > 0}
		<Box class="grow flex-col bg-red-950">
			<div>Adventurers: {$store.hiredAdventurers}</div>
		</Box>
	{/if}
</div>
{#if $store.scene === Scene.cellar}
	<Cellar />
{:else if $store.scene === Scene.tavern}
	<Tavern />
{:else if $store.scene === Scene.shop}
	<!-- <Shop /> -->
{/if}
