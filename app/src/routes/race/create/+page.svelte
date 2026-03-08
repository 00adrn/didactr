<script>
  import SelectOption from "$lib/components/race/SelectOption.svelte";
  import { goto } from "$app/navigation";
  import { genRoomId } from "$lib/utils";

  const languages = [
    "Spanish",
    "Portuguese",
    "Italian",
    "Tagalog",
    "French",
    "German",
    "Hindi",
    "Mandarin",
    "Arabic",
    "Swahili",
  ];
  const wordCount = [5, 10, 15, 20, 25];
  const capacities = [2, 3, 4, 5, 6];

  let selectedLang = $state("");
  let selectedCount = $state(0);
  let playerCap = $state(0);
  let loading = $state(false);

  const handleLanguageSelect = (/** @type {string} */ lang) => {
    selectedLang = lang;
  };

  const handleWordCountSelect = (/** @type {number} */ count) => {
    selectedCount = count;
  };

  const handleCapSelect = (/** @type {number} */ cap) => {
    playerCap = cap;
  };

  const createSession = () => {
    if (
      selectedLang === "" ||
      selectedCount === 0 ||
      playerCap === 0 ||
      loading
    )
      return;
    const roomId = genRoomId();
    loading = true;

    goto(
      `/race/session?lang=${selectedLang.toLowerCase()}&count=${selectedCount}&room=${roomId}`,
    );
  };
</script>

<div
  class="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-stone-700"
>
  <h1 class="text-4xl text-stone-100 font-bold tracking-tight">
    Lobby Options
  </h1>

  <div class="w-full">
    <h2 class="text-2xl text-stone-200 mb-4 text-center">Select language</h2>
    <div
      class="flex flex-wrap gap-4 justify-center bg-stone-900/50 rounded-xl p-6"
    >
      {#each languages as option}
        <SelectOption
          {option}
          selected={selectedLang}
          handleClick={() => handleLanguageSelect(option)}
        />
      {/each}
    </div>
  </div>

  <div class="w-full">
    <h2 class="text-2xl text-stone-200 mb-4 text-center">Select word count</h2>
    <div
      class="flex flex-wrap gap-4 justify-center bg-stone-900/50 rounded-xl p-6"
    >
      {#each wordCount as option}
        <SelectOption
          {option}
          selected={selectedCount}
          handleClick={() => handleWordCountSelect(option)}
        />
      {/each}
    </div>
  </div>

  <div class="w-full">
    <h2 class="text-2xl text-stone-200 mb-4 text-center">
      Select lobby capacity
    </h2>
    <div
      class="flex flex-wrap gap-4 justify-center bg-stone-900/50 rounded-xl p-6"
    >
      {#each capacities as option}
        <SelectOption
          {option}
          selected={playerCap}
          handleClick={() => handleCapSelect(option)}
        />
      {/each}
    </div>
  </div>

  <button
    class="flex justify-center items-center w-64 font-semibold text-stone-50 text-2xl bg-emerald-600 px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 disabled:bg-stone-600 disabled:text-stone-400 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/30"
    on:click={createSession}
    disabled={selectedLang === "" ||
      selectedCount === 0 ||
      playerCap === 0 ||
      loading}
  >
    {#if loading}
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>Creating...</span>
    {:else}
      <span>Create</span>
    {/if}
  </button>
</div>
