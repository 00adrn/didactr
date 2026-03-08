<script>
    const { user, total, progress } = $props();
</script>

<div class="flex items-center gap-8">
    <span class="text-emerald-400 font-bold w-16">{user}</span>
    <div class="flex-1 bg-stone-700 h-4 rounded-full overflow-hidden w-sm">
        <div class="bg-emerald-500 h-full transition-all duration-300" 
                style="width: {( (progress - 1) / total) * 100}%">
        </div>
    </div>
    <span class="text-stone-400 text-sm">{progress - 1} / {total}</span>
</div>