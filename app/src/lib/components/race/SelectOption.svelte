<script>
  let { option, selected, handleClick } = $props();
</script>

<button
  class:bg-emerald-900={option != selected}
  class:bg-emerald-700={option == selected}
  class="rounded-full min-w-32 text-3xl pt-2 pb-2 pr-4 pl-4 text-stone-50 hover:bg-emerald-800"
  onclick={() => handleClick(option)}
>
  {option}
</button>
