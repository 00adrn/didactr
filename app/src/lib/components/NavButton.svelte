<script>
    let { href, text } = $props();
</script>

<div class="rounded-full w-full flex justify-center items-center bg-emerald-800 hover:bg-emerald-900 h-10 transition-all">
    <a class="rounded-full w-full h-full flex justify-center items-center decoration-0 text-2xl text-stone-50 font-bold" href={href}>
        {text}
    </a>
</div>