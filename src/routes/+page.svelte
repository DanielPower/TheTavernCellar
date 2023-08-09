<script lang="ts">
  import { onMount } from "svelte";
  import Cellar from "../components/Cellar.svelte";
  import Tavern from "../components/Tavern.svelte";
  import { Quest, store } from "../store";
  import { gameTick } from "../tick";
  import Button from "../components/Button.svelte";
  import Hud from "../components/Hud.svelte";

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

<h1 class="text-2xl">The Tavern Cellar</h1>
<p class="pb-1 text-lg">Created for Gump Jam</p>
<Button on:click={store.reset}>Reset</Button>
<div class="sticky top-0 flex flex-col">
  <Hud />
</div>
<Tavern />
{#if $store.quests[Quest.first].status !== "inactive"}
  <Cellar />
{/if}
