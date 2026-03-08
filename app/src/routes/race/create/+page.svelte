<script>
    import SelectOption from "$lib/components/race/SelectOption.svelte";
    import { goto } from "$app/navigation";
    import { genRoomId } from "$lib/utils"

    const languages = ["Spanish", "Portuguese", "Italian", "Tagalog", "French", "German", "Hindi", "Mandarin", "Arabic", "Swahili"];
    const wordCount = [5, 10, 15, 20, 25];
    const capacities = [2, 3, 4, 5, 6];

    let selectedLang = $state("");
    let selectedCount = $state(0);
    let playerCap = $state(0);
    let loading = $state(false);

    const handleLanguageSelect = (/** @type {string} */lang) => {
        selectedLang = lang;
    };

    const handleWordCountSelect = (/** @type {number} */ count) => {
        selectedCount = count;
    };

    const handleCapSelect = (/** @type {number} */ cap) => {
        playerCap = cap;
    };

    const createSession = () => {
        if (selectedLang === "" || selectedCount === 0 || playerCap === 0 || loading)
            return;
        const roomId = genRoomId();
        loading = true;

        goto(`/race/session?lang=${selectedLang.toLowerCase()}&count=${selectedCount}&room=${roomId}`);
    };
</script>

<div class="flex flex-col items-center gap-4 w-300 h-180 bg-stone-700 rounded-3xl p-6">
    <p class="text-5xl text-stone-50 font-semibold">Lobby Options</p>
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
    <p class="text-4xl text-stone-50">Select lobby capacity</p>
    <div class="flex flex-wrap gap-8 justify-center bg-stone-800 rounded-2xl p-4">
        {#each capacities as option}
            <SelectOption
            {option}
            selected={playerCap}
            handleClick={() => handleCapSelect(option)}
            />
        {/each}
    </div>

    <button class="flex justify-center items-center w-64 font-semibold text-stone-50 text-4xl bg-emerald-600 pl-8 pr-8 pt-4 pb-4 rounded-full hover:bg-emerald-500"
        onclick={createSession}>
        {loading ? "Creating..." : "Create"}
    </button>
</div>
;