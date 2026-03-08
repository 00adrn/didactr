<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  const { data } = $props();
  let currentWord = $state("");
  let count = $state(0);
  let input = $state("");
  let wrong = $state(false);
  let inputField: HTMLInputElement | undefined = $state();

  const onSubmit = (event: Event) => {
    console.log("Submitting...");
    event.preventDefault();
    if (
      data.translationData[count - 1].translations.includes(input.toLowerCase())
    ) {
      console.log("Translation achieved!");

      if (count === data.translationData.length) {
        console.log("You win!");
        currentWord = "Complete!";
        return;
      }

      currentWord = data.translationData[count].word;
      count++;
      input = "";
      inputField!.focus();
      return;
    }
    wrong = true;
    input = "";
    inputField!.focus();
    setTimeout(() => {
      wrong = false;
    }, 1000);
  };

  onMount(() => {
    currentWord = data.translationData[0].word;
    count = 1;
    input = "";
  });
</script>

<div
  class="w-full max-w-4xl mx-auto bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-stone-700 flex flex-col items-center gap-12"
>
  {#if data?.translationData}
    <div class="flex flex-col gap-4 items-center text-center">
      {#if currentWord !== "Complete!"}
        <p class="text-stone-300 font-semibold text-4xl tracking-tight">
          Word #{count}
        </p>
      {/if}
      <p class="text-stone-50 font-bold text-7xl md:text-8xl break-words">
        {currentWord}
      </p>
    </div>
    <form
      on:submit={onSubmit}
      class="flex flex-col gap-6 items-center justify-center w-full"
    >
      {#if currentWord !== "Complete!"}
        <div class="h-8">
          {#if wrong}
            <p class="text-red-400 text-2xl font-semibold animate-pulse">
              Incorrect!
            </p>
          {/if}
        </div>
        <input
          type="text"
          placeholder="Translate..."
          bind:value={input}
          bind:this={inputField}
          autofocus
          class="w-full max-w-md text-3xl text-center text-stone-100 bg-stone-900/50 border-2 border-stone-700 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300 px-6 py-3"
        />
        <button
          type="submit"
          class="w-48 font-semibold text-stone-50 text-xl bg-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
        >
          Submit
        </button>
      {/if}
    </form>
  {:else}
    <p class="text-stone-200 text-2xl">Loading...</p>
  {/if}
</div>
