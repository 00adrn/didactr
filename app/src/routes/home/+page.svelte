<script>
  import PracticeCard from "$lib/components/home/RaceButton.svelte";

  const raceOptions = ["Create", "Join", "Practice"]
</script>

<div class="flex flex-col items-center gap-2 max-w-400 h-full mt-8">
    <div class="flex flex-col items-center gap-4 mb-48">
        <p class="text-white text-8xl font-semibold">Welcome to Didactr</p>
        <p class="text-white text-3xl">Practice your fluency in another language by testing your recognition speeds!</p>
        <p class="text-white text-3xl">Add stakes by racing against others!</p>
    </div>
    <p class="text-white text-4xl">Create, join, or practice races</p>
    <div class="flex flex-row gap-2">
        {#each raceOptions as option, index}
            <PracticeCard text={option} />
            {#if index != raceOptions.length - 1}
                <div class="border-r border-stone-50"></div>
            {/if}
        {/each}
    </div>
</div>
