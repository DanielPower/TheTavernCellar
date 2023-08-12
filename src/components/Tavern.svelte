<script lang="ts">
  import { store } from "../store";
  import Button from "./Button.svelte";
  import Room from "./Room.svelte";
  import { stages } from "../tavern";
</script>

<Room>
  <div slot="actions">
    <img src="barkeep.webp" alt="Barkeep" />
    <span>
      {#each stages[$store.tavernStage].buttons as button}
        <Button on:click={button.action}>{button.text}</Button>
      {/each}
    </span>
  </div>
  <p slot="text">{stages[$store.tavernStage].text}</p>
</Room>
