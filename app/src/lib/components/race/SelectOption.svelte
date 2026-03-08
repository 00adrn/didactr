<script>
  let { option, selected, handleClick } = $props();
  let isSelected = $derived(option === selected);
</script>

<button
  class="rounded-lg min-w-24 text-xl py-2 px-4 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-stone-900/50"
  class:bg-emerald-600={isSelected}
  class:text-white={isSelected}
  class:shadow-lg={isSelected}
  class:bg-stone-700={!isSelected}
  class:text-stone-300={!isSelected}
  class:hover:bg-stone-600={!isSelected}
  on:click={() => handleClick(option)}
>
  {option}
</button>
