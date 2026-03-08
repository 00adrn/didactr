<script lang="ts">
    import type { PageData } from "./$types";
    import { onMount } from 'svelte';

    const { data } = $props();
    let currentWord = $state("");
    let count = $state(0);
    let input = $state("");
    let wrong = $state(false);
    let inputField: HTMLInputElement | undefined = $state();;

    const onSubmit = (event: Event) => {
        console.log("Submitting...")
        event.preventDefault();
        if (data.translationData[count - 1].translations.includes(input.toLowerCase())) {
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
        setTimeout(() => {wrong = false}, 1000);
    };

    onMount(() => {
        currentWord = data.translationData[0].word;
        count = 1;
        input = "";
    });
</script>

<div class="w-300 flex item-center justify-center  flex-col gap-12">
        {#if data?.translationData}
        <div class="flex flex-col gap-4 items-center">
            {#if currentWord !== "Complete!"}
            <p class="text-stone-50 font-semibold text-5xl">Word #{count}</p>
            {/if}
            <p class="text-stone-50 font-semibold text-8xl">{currentWord}</p>
        </div>
        <form class="flex flex-col gap-4 items-center justify-center">
            {#if currentWord !== "Complete!"}
                {#if wrong} 
                    <p class="text-red-900 text-4xl">Incorrect!</p>
                {/if}
            <input type="text"
                    placeholder="translate..."
                    bind:value={input}
                    bind:this={inputField}
                    class="w-sm flex flex-col items-center jutsify-center
                            text-4xl text-stone-50 bg-stone-700 border-stone-900 border pt-2 pb-2 pr-6 pl-6 
                            rounded-full focus:outline-none"/>
            <input  type="submit"
                    onclick={onSubmit} 
                    value="Submit"
                    class="w-xs pr-4 pl-4 pt-2 pb-2 bg-emerald-700 flex justify-center items-center hover:bg-emerald-600 transition-all rounded-full text-3xl font-semibold">
            {/if}
        </form>
        {:else}
        <p>
            Loading...
        </p>
        {/if}
</div>

