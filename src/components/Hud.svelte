<script lang="ts">
  import { store } from "../store";
  import Box from "./Box.svelte";
  import { nextLevelRequirement } from "../util";

  let levelProgress = 0;
  $: {
    levelProgress =
      ($store.experience / nextLevelRequirement($store.level)) * 100;
  }
</script>

<div class="flex">
  <Box class="grow flex-col bg-red-950 p-0 pl-1 text-sm">
    <div>Rats killed: {Math.floor($store.kills)}</div>
  </Box>
  <Box class="grow flex-col bg-red-950 p-0 pl-1 text-sm">
    <div>Energy: {$store.energy} / {$store.maxEnergy}</div>
  </Box>
  {#if $store.hiredAdventurers > 0}
    <Box class="grow flex-col bg-red-950 text-sm">
      <div>Adventurers: {$store.hiredAdventurers}</div>
    </Box>
  {/if}
</div>
<div
  class=" h-5 rounded-md border pl-1 pr-1 text-sm font-bold"
  style={`background: linear-gradient(90deg, #666600 ${levelProgress}%, #000000 ${levelProgress}%);`}
>
  <div class="float-left">
    Level {$store.level}
  </div>
  <div class="float-right">
    {$store.experience} / {nextLevelRequirement($store.level)}
  </div>
</div>
