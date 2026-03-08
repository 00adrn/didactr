<script lang="ts">
  import "./layout.css";
  import Navbar from "$lib/components/Navbar.svelte";

  let { children } = $props();
</script>

<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head>	 -->
<div class="h-screen w-screen bg-stone-800 flex flex-col items-center box-border overflow-hidden">
  <Navbar />
  <div class="w-full h-full flex justify-center">
    {@render children()}
  </div>
</div>
