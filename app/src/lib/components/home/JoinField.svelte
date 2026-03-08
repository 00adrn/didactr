<script>
    let { onSubmit, code=$bindable() } = $props();
</script>

<form onsubmit={onSubmit} class="flex justify-center items-center">
    <input 
        type="text"
        placeholder="Enter a room code..."
        class="p-2 text-3xl text-stone-50 font-semibold flex justify-center items-center
        pl-6 pr-6 bg-stone-700 border border-stone-900 rounded-full focus:outline-none"
        bind:value={code}
    />
</form>