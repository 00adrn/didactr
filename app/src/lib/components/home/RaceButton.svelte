<script>
  import { goto } from "$app/navigation";

  const { text } = $props();
</script>

<button
  class="w-64 font-semibold text-stone-50 text-2xl bg-emerald-600 px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
  on:click={() => goto(`/race/${text.toLowerCase()}`)}
>
  {text}
</button>
