<script>
  import { store } from "../store";
  import Box from "./Box.svelte";
  import Button from "./Button.svelte";
</script>

<div class="flex">
  <Box class="shrink-0 flex-col bg-green-950">
    <img src="cellar.webp" alt="Cellar" width="200" height="200" />
    <Button on:click={store.manualKill} disabled={$store.energy === 0}>
      Kill a rat
    </Button>
    {#if $store.kills >= 50}
      <Button on:click={store.gotoTavern}>Return to Tavern</Button>
    {/if}
  </Box>
  <Box class="grow bg-green-950">
    <div>{$store.cellarMessage}</div>
  </Box>
</div>
