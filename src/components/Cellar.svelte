<script>
  import { store } from "../store";
  import Button from "./Button.svelte";
  import Room from "./Room.svelte";
</script>

<Room>
  <div slot="actions">
    <img src="cellar.webp" alt="Cellar" />
    <Button on:click={store.manualKill} disabled={$store.energy === 0}>
      Kill a rat
    </Button>
  </div>
  <p slot="text">{$store.cellarMessage}</p>
</Room>
