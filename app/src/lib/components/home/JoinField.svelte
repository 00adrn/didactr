<script>
  let { onSubmit, code = $bindable() } = $props();
</script>

<form on:submit={onSubmit} class="flex justify-center items-center">
  <input
    type="text"
    placeholder="Enter a room code..."
    class="w-full max-w-md text-2xl text-center text-stone-100 bg-stone-900/50 border-2 border-stone-700 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300 px-6 py-3"
    bind:value={code}
    maxlength="6"
  />
</form>
