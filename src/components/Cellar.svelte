<script>
  import { store } from "../store";
  import Box from "./Box.svelte";
  import Button from "./Button.svelte";
</script>

<div>
  <Box class="overflow-hidden bg-green-950">
    <span class="float-left pr-2">
      <img src="cellar.webp" alt="Cellar" width="200" height="200" />
      <Button on:click={store.manualKill} disabled={$store.energy === 0}>
        Kill a rat
      </Button>
    </span>
    <p>{$store.cellarMessage}</p>
  </Box>
</div>
