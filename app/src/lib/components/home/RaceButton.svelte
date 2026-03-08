<script>
    import { goto } from "$app/navigation";

    const { text } = $props();
</script>

<div class="w-full flex flex-row items-center p-4 bg-transparent gap-4 border-box">
    <button class="w-sm pr-4 pl-4 pt-2 pb-2 bg-emerald-700 flex justify-center items-center hover:bg-emerald-600 transition-all rounded-full text-3xl font-semibold" 
            onclick={() => goto(`/race/${text.toLowerCase()}`)}>
                {text}
    </button>
</div>