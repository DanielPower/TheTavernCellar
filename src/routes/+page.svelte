<script lang="ts">
  import { onMount } from "svelte";
  import Box from "../components/Box.svelte";
  import Cellar from "../components/Cellar.svelte";
  import Tavern from "../components/Tavern.svelte";
  import { store } from "../store";
  import { gameTick } from "../tick";
  import { nextLevelRequirement } from "../util";

  let levelProgress = 0;

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

  $: {
    levelProgress =
      ($store.experience / nextLevelRequirement($store.level)) * 100;
  }
</script>

<h1 class="text-2xl">The Tavern Cellar</h1>
<p class="pb-1 text-lg">Created for Gump Jam</p>
<div class="sticky top-0 flex">
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
<Tavern />
<Cellar />
<div
  class="sticky bottom-0 h-5 font-bold"
  style={`background: linear-gradient(90deg, #cccc00 ${levelProgress}%, #000000 ${levelProgress}%);`}
>
  <div class="float-left">
    Level {$store.level}
  </div>
  <div class="float-right">
    {$store.experience} / {nextLevelRequirement($store.level)}
  </div>
</div>
