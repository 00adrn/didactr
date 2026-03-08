<script lang="ts">
  import PracticeCard from "$lib/components/home/RaceButton.svelte";
  import JoinField from "$lib/components/home/JoinField.svelte"
  import { goto } from "$app/navigation";

  const raceOptions = ["Create", "Practice"]
  let roomCode = $state("");
  const onSubmit = (event: Event) => {
    event.preventDefault();
    goto("/race/session?room=" + roomCode)
  }
</script>

<div class="flex flex-col items-center gap-2 max-w-400 h-full mt-8">
    <div class="flex flex-col items-center gap-4 mb-48">
        <p class="text-white text-8xl font-semibold">Welcome to Didactr</p>
        <p class="text-white text-3xl">Practice your fluency in another language by testing your recognition speeds!</p>
        <p class="text-white text-3xl">Add stakes by racing against others!</p>
    </div>
    <p class="text-white text-5xl mb-4">Join, create, or practice</p>
    <div class="flex flex-row gap-2">
        <JoinField bind:code={roomCode} {onSubmit}/>
        <div class="border-r border-stone-50 h-full"></div>
        {#each raceOptions as option, index}
            <PracticeCard text={option} />
            {#if index != raceOptions.length - 1}
                <div class="border-r border-stone-50 h-full"></div>
            {/if}
        {/each}
    </div>
</div>
