<script>
    import SelectOption from "$lib/components/race/SelectOption.svelte";
    import { goto } from "$app/navigation";

    const languages = ["Spanish", "Portuguese", "Italian", "Tagalog", "French", "German", "Hindi", "Mandarin", "Arabic", "Swahili"];
    const wordCount = [5, 10, 15, 20, 25];

    let selectedLang = $state("");
    let selectedCount = $state(0);
    let loading = $state(false);

    const handleLanguageSelect = ( /** @type {string} */lang) => {
        selectedLang = lang;
    };

    const handleWordCountSelect = ( /** @type {number} */count) => {
        selectedCount = count;
    };

    const startPractice = () => {
        if (selectedLang === "" || selectedCount === 0 || loading)
            return;

        loading = true;

        goto(`/race/practice/session?lang=${selectedLang.toLowerCase()}&count=${selectedCount}`);
    };
</script>

<div class="flex flex-col items-center gap-6 w-300 h-150 bg-stone-700 rounded-3xl p-4">
    <p class="text-5xl text-stone-50 font-semibold">Practice Options</p>
    <p class="text-4xl text-stone-50">Select language</p>
    <div class="flex flex-wrap gap-8 justify-center bg-stone-800 rounded-2xl p-4">
        {#each languages as option}
            <SelectOption
            {option}
            selected={selectedLang}
            handleClick={() => handleLanguageSelect(option)}
            />
        {/each}
    </div>
    <p class="text-4xl text-stone-50">Select word count</p>
    <div class="flex flex-wrap gap-8 justify-center bg-stone-800 rounded-2xl p-4">
        {#each wordCount as option}
            <SelectOption
            {option}
            selected={selectedCount}
            handleClick={() => handleWordCountSelect(option)}
            />
        {/each}
    </div>
    <button class="flex justify-center items-center w-64 font-semibold text-stone-50 text-4xl bg-emerald-600 pl-8 pr-8 pt-4 pb-4 rounded-full hover:bg-emerald-500"
        onclick={startPractice}>
        {loading ? "Starting..." : "Start"}
    </button>
</div>
;