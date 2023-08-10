<script lang="ts">
  import { store } from "../store";
  import { nextLevelRequirement } from "../util";

  let levelProgress = 0;
  let fields: string[] = [];
  $: {
    levelProgress =
      ($store.experience / nextLevelRequirement($store.level)) * 100;
    fields = [
      `Rats killed: ${Math.floor($store.kills)}`,
      `Energy: ${$store.energy} / ${$store.maxEnergy}`,
      ...($store.hiredAdventurers > 0
        ? `Adventurers: ${$store.hiredAdventurers}`
        : []),
    ];
  }
</script>

<div class="flex">
  {#each fields as field}
    <div class="grow rounded-md border bg-red-950 p-0 pl-1 text-sm">
      <div>{field}</div>
    </div>
  {/each}
</div>
<div
  class=" h-5 rounded-md border pl-1 pr-1 text-sm font-bold"
  style={`background: linear-gradient(90deg, #666600 ${levelProgress}%, #000000 ${levelProgress}%);`}
>
  <div class="float-left">
    Level {$store.level}
  </div>
  <div class="float-right">
    {Math.floor($store.experience)} / {Math.ceil(
      nextLevelRequirement($store.level)
    )}
  </div>
</div>
