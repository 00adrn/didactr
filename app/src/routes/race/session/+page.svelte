<script lang="ts">
    import type { PageData } from "./$types";
    import { onMount, onDestroy } from "svelte";
    import { supabase } from "$lib/supabase";

    import ProgressBar from "$lib/components/race/ProgressBar.svelte"

    const { data }: { data: PageData } = $props();
    
    let currentWord = $state("");
    let count = $state(0);
    let input = $state("");
    let wrong = $state(false);
    let started = $state(false);
    let inputField: HTMLInputElement | undefined = $state();


    const myUserId = "Racer_" + Math.floor(Math.random() * 1000); 
    let opponents = $state<Record<string, number>>({}); 
    let raceChannel: any;

    const onSubmit = (event: Event) => {
        event.preventDefault();
        
        if (data.translationData[count - 1].translations.includes(input.toLowerCase())) {
            if (count === data.translationData.length) {
                count++;
                currentWord = "Complete!";
                broadcastProgress(count);
                return;
            }

            currentWord = data.translationData[count++].word;
            input = "";
            inputField!.focus();
            
            broadcastProgress(count);
            return;
        } else {
            wrong = true;
        }
    };

    const broadcastProgress = async (currentProgress: number) => {
        if (!raceChannel) return;
        
        await raceChannel.track({ userId: myUserId, progress: currentProgress });
    };

    const startGame = async () => {
        started = true;

        if (raceChannel) {
            await raceChannel.send({
                type: 'broadcast',
                event: 'start_game',
                payload: { message: 'Go!' }
            });
        }
    };

    onMount(() => {
        currentWord = data.translationData[0].word;
        count = 1;
        input = "";

        const roomId = data.room;

        raceChannel = supabase.channel(`room_${roomId}`);

        raceChannel
            .on('presence', { event: 'sync' }, () => {
                const newState = raceChannel.presenceState();
                
                const currentOpponents: Record<string, number> = {};
                
                for (const key in newState) {
                    for (const user of newState[key] as any[]) {
                        if (user.userId !== myUserId) {
                            currentOpponents[user.userId] = user.progress;
                        }
                    }
                }
                
                opponents = currentOpponents;
            })
            .on('broadcast', { event: 'start_game' }, (payload: any) => {
                started = true;
            })
            .subscribe(async (status: string) => {
                if (status === 'SUBSCRIBED') {
                    await raceChannel.track({ userId: myUserId, progress: count });
                }
            });
    });

    onDestroy(() => {
        if (raceChannel) {
            supabase.removeChannel(raceChannel);
        }
    });
</script>

<div class="w-300 flex item-center justify-center  flex-col gap-12">
        {#if data?.translationData}
        {#if started}
        <div class="flex flex-row gap-24 justify-center items-center">
            <div class="flex item-center justify-center flex-col gap-12">
                <p class="text-2xl text-stone-50">Race Standings</p>
                <ProgressBar user={`You (${myUserId})` } progress={count} total={data.translationData.length} />
                {#each Object.entries(opponents) as [id, progress]}
                    <ProgressBar user={id} progress={progress} total={data.translationData.length} />
                {/each}
            </div>
            <div class="flex item-center justify-start  flex-col gap-12">
                <div class="flex flex-col gap-4 items-center">
                    {#if currentWord !== "Complete!"}
                    <p class="text-stone-50 font-semibold text-5xl">Word #{count}</p>
                    {/if}
                    <p class="text-stone-50 font-semibold text-8xl">{currentWord}</p>
                </div>
                <form class="flex flex-col gap-4 items-center justify-center">
                    {#if currentWord !== "Complete!"}
                        {#if wrong} 
                            <p class="text-red-900 text-4xl">Incorrect!</p>
                        {/if}
                    <input type="text"
                            placeholder="translate..."
                            bind:value={input}
                            bind:this={inputField}
                            class="w-sm flex flex-col items-center jutsify-center
                                    text-4xl text-stone-50 bg-stone-700 border-stone-900 border pt-2 pb-2 pr-6 pl-6 
                                    rounded-full focus:outline-none"/>
                    <input  type="submit"
                            onclick={onSubmit} 
                            value="Submit"
                            class="w-xs pr-4 pl-4 pt-2 pb-2 bg-emerald-700 flex justify-center items-center hover:bg-emerald-600 transition-all rounded-full text-3xl font-semibold">
                    {/if}
                </form>
            </div>
        </div>
        {:else}
        <div class="flex flex-col items-center justify-center gap-12 h-content bg-stone-600 rounded-xl p-8 ">
            <div class="flex flex-col items-center gap-12 bg-stone-700 rounded-xl w-xl h-full p-4">
                <p class="text-stone-200 font-semibold text-3xl">Players in room</p>
                <p class="text-stone-50 font-semibold text-3xl">You ({myUserId})</p>
                {#each Object.entries(opponents) as [id, progress]}
                <p class="text-stone-50 font-semibold text-2xl">{id}</p>
                {/each}
            </div>
            {#if data.isHost}
            <div class="flex justify-center items-center">
                <button onclick={startGame} 
                        class="w-xs pr-4 pl-4 pt-2 pb-2 bg-emerald-700 flex justify-center items-center hover:bg-emerald-600 transition-all rounded-full text-3xl font-semibold">
                        Start
                </button>
            </div>
            {/if}
        </div>
        {/if}
        {/if}
</div>

