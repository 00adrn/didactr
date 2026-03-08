<script lang="ts">
  import "./layout.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { supabase } from "$lib/supabase";

  let { children } = $props();
</script>

<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head>	 -->
<div
  class="h-screen w-screen bg-gradient-to-br from-stone-900 to-stone-800 flex flex-col items-center box-border overflow-auto"
>
  <Navbar />
  <div class="w-full h-full flex justify-center mt-16 p-4 sm:p-8">
    {@render children()}
  </div>
</div>
