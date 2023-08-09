<script>
  import { Quest, store } from "../store";
  import Box from "./Box.svelte";
  import Button from "./Button.svelte";
</script>

<div class="flex">
  <Box class="shrink-0 flex-col bg-green-950">
    <img src="barkeep.webp" alt="Barkeep" width="200" height="200" />
    <!-- <Button on:click={() => store.hireAdventurers(1)}>Hire Adventurer</Button> -->
    {#if $store.quests[Quest.first].status === "inactive"}
      <Button on:click={() => store.acceptQuest(Quest.first)}
        >Accept Quest</Button
      >
    {/if}
    {#if $store.kills >= 50}
      <Button
        on:click={store.rest}
        disabled={$store.energy === $store.maxEnergy}
      >
        Rest
      </Button>
    {/if}
  </Box>
  <Box class="grow bg-green-950">
    {$store.tavernMessage}
  </Box>
</div>
