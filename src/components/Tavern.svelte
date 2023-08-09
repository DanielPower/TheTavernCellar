<script>
  import { Quest, store } from "../store";
  import Button from "./Button.svelte";
  import Room from "./Room.svelte";
</script>

<Room>
  <div slot="actions">
    <img src="barkeep.webp" alt="Barkeep" />
    <span>
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
    </span>
  </div>
  <p slot="text">{$store.tavernMessage}</p>
</Room>
