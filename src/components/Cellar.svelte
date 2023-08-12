<script lang="ts">
  import { confetti } from "tsparticles-confetti";
  import { Quest, store } from "../store";
  import Button from "./Button.svelte";
  import Room from "./Room.svelte";
  import { TavernStage } from "../tavern";
  import { exponentialCost } from "../util";

  let cellars: {
    id: number;
    available: boolean;
    entranceText: string;
    entranceButtonText: string;
    interiorText: string;
    ratExperience: number;
    initialAdventurerCost: number;
  }[] = [];
  $: {
    cellars = [
      {
        id: 0,
        available: $store.tavernStage >= TavernStage.firstQuestAccepted,
        entranceText: `As your eyes follow Gump's pleading gaze, you notice a worn wooden door nestled in a dimly lit corner. The flickering candlelight casts eerie shadows on the door's surface, revealing faint claw marks and scuffing. It's clear that this portal to the unknown holds the key to the tavern's rat-infested predicament. With a deep breath, you approach the cellar door, your heart quickening in anticipation of the challenge that lies ahead.`,
        entranceButtonText: "Enter the cellar",
        interiorText: `The tavern cellar is dark and damp. You hear a faint dripping sound. You can't see anything, but you can feel a cold stone wall to your left and a wooden door to your right."`,
        ratExperience: 2,
        initialAdventurerCost: 5,
      },
      {
        id: 1,
        available: $store.level >= 5,
        entranceText: "You approach the cellar entrance.",
        entranceButtonText: "Enter the cellar",
        interiorText: "foo",
        ratExperience: 5,
        initialAdventurerCost: 100,
      },
    ];
  }
</script>

{#each cellars as cellar}
  {#if cellar.available}
    {#if $store.openedCellars[cellar.id]}
      <Room>
        <div slot="actions">
          <img src="cellar.webp" alt="Cellar" />
          <div class="flex-col">
            <div class="grow rounded-md border bg-red-950 p-0 pl-1 text-sm">
              <div>
                Hired Adventurers: {$store.openedCellars[cellar.id]
                  .adventurersHired}
              </div>
            </div>
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
