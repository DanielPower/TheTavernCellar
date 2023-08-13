<script lang="ts">
  import { confetti } from "tsparticles-confetti";
  import { store } from "../store";
  import Button from "./Button.svelte";
  import { exponentialCost } from "../util";
  import { TavernStage } from "../tavern";
  import Box from "./Box.svelte";

  let adventurersGuildUnlocked = false;
  $: {
    adventurersGuildUnlocked =
      $store.tavernStage >= TavernStage.adventurersGuild;
  }
</script>

<div class="flex flex-wrap">
  {#each $store.openedCellars as cellar}
    <Box class="w-1/4 overflow-hidden bg-green-950">
      <img src="cellar.webp" alt="Cellar" />
      <div class="flex">
        {#if adventurersGuildUnlocked}
          <div class="grow rounded-md border bg-red-950 p-0 pl-1 text-sm">
            Hired Adventurers: {$store.openedCellars[cellar.id]
              .adventurersHired}
          </div>
        {/if}
      </div>
      <Button
        on:click={(event) => {
          store.manualKill(cellar.ratExperience);
          confetti({
            particleCount: 30,
            shapes: ["circle"],
            position: {
              x: (event.clientX / window.innerWidth) * 100,
              y: (event.clientY / window.innerHeight) * 100,
            },
            colors: ["#dd0000", "#8a0303", "#6d0000"],
          });
        }}
      >
        Kill a rat
      </Button>
      {#if adventurersGuildUnlocked}
        <Button
          disabled={$store.gold <
            exponentialCost(
              cellar.initialAdventurerCost,
              $store.openedCellars[cellar.id].adventurersHired,
              1.2
            )}
          on:click={() =>
            store.hireAdventurers(
              cellar.id,
              1,
              exponentialCost(
                cellar.initialAdventurerCost,
                $store.openedCellars[cellar.id].adventurersHired,
                1.2
              )
            )}
        >
          <div class="flex flex-wrap justify-center gap-x-2">
            Hire an adventurer <div>
              🪙{exponentialCost(
                cellar.initialAdventurerCost,
                $store.openedCellars[cellar.id].adventurersHired,
                1.2
              )}
            </div>
          </div>
        </Button>
      {/if}
    </Box>
  {/each}
</div>
