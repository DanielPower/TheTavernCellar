<script lang="ts">
  import { confetti } from "tsparticles-confetti";
  import { store } from "../store";
  import Button from "./Button.svelte";
  import Room from "./Room.svelte";
  import { exponentialCost } from "../util";
  import { cellars } from "../cellars";
  import { TavernStage } from "../tavern";

  let adventurersGuildUnlocked = false;
  $: {
    adventurersGuildUnlocked =
      $store.tavernStage >= TavernStage.adventurersGuild;
  }
</script>

{#each cellars as cellar}
  {#if cellar.available($store)}
    {#if $store.openedCellars[cellar.id]}
      <Room>
        <div slot="actions">
          <img src="cellar.webp" alt="Cellar" />
          <div class="flex-col">
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
                decay: 0.9,
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
        </div>
        <p slot="text">{cellar.interiorText}</p>
      </Room>
    {:else}
      <Room>
        <div slot="actions">
          <img src="cellar.webp" alt="Cellar" />
          <Button on:click={() => store.openCellar(cellar.id)}>
            {cellar.entranceButtonText}
          </Button>
        </div>
        <p slot="text">{cellar.entranceText}</p>
      </Room>
    {/if}
  {/if}
{/each}
