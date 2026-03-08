<script>
  const { user, total, progress, is_self = false } = $props();

  let percentage = $derived(Math.max(0, ((progress - 1) / total) * 100));
</script>

<div class="flex items-center gap-4 w-full">
  <span
    class="font-semibold w-24 truncate"
    class:text-emerald-300={is_self}
    class:text-stone-300={!is_self}>{user}</span
  >
  <div
    class="flex-1 bg-stone-900/50 h-4 rounded-full overflow-hidden border border-stone-700"
  >
    <div
      class="h-full transition-all duration-300 rounded-full"
      class:bg-emerald-500={is_self}
      class:bg-sky-500={!is_self}
      style="width: {percentage}%"
    ></div>
  </div>
  <span class="text-stone-400 text-sm font-mono w-16 text-right"
    >{progress - 1} / {total}</span
  >
</div>
