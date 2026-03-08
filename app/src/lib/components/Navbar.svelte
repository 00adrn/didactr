<script>
    import NavButton from "$lib/components/NavButton.svelte"

    const buttons = ["Home", "Profile"]
</script>

<div class="relative w-screen flex justify-center items-center mt-2">
    <nav class="flex flex-row w-2xl rounded-full bg-emerald-700 p-1 gap-1 m-2">
        {#each buttons as button}
            <NavButton href={'/' + button.toLowerCase()} text={button}/>
        {/each}
    </nav>
</div>