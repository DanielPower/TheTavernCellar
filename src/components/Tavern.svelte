<script>
	import { store } from '../store';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
</script>

<div class="flex">
	<Box class="shrink-0 flex-col bg-green-950">
		<img src="barkeep.webp" alt="Barkeep" width="200" height="200" />
		<Button on:click={store.gotoCellar}>Enter the Cellar</Button>
		<Button on:click={() => store.hireAdventurers(1)}>Hire Adventurer</Button>
		<Button on:click={store.rest} disabled={$store.energy === $store.maxEnergy}>Rest</Button>
	</Box>
	<Box class="grow bg-green-950">
		{$store.tavernMessage}
	</Box>
</div>
