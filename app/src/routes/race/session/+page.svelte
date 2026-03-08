<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount, onDestroy } from "svelte";
  import { supabase } from "$lib/supabase";

  import ProgressBar from "$lib/components/race/ProgressBar.svelte";

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

    if (
      data.translationData[count - 1].translations.includes(input.toLowerCase())
    ) {
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
        type: "broadcast",
        event: "start_game",
        payload: { message: "Go!" },
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
      .on("presence", { event: "sync" }, () => {
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
      .on("broadcast", { event: "start_game" }, (payload: any) => {
        started = true;
      })
      .subscribe(async (status: string) => {
        if (status === "SUBSCRIBED") {
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

<div class="w-full max-w-6xl mx-auto">
  {#if data?.translationData}
    {#if started}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div
          class="bg-stone-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-stone-700 flex flex-col gap-4"
        >
          <h2 class="text-2xl text-stone-100 font-bold text-center mb-4">
            Race Standings
          </h2>
          <ProgressBar
            user={`You (${myUserId})`}
            progress={count}
            total={data.translationData.length}
            is_self={true}
          />
          {#each Object.entries(opponents) as [id, progress] (id)}
            <ProgressBar
              user={id}
              {progress}
              total={data.translationData.length}
            />
          {/each}
        </div>
        <div
          class="md:col-span-2 bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-stone-700 flex flex-col items-center gap-8"
        >
          <div class="flex flex-col gap-4 items-center text-center">
            {#if currentWord !== "Complete!"}
              <p class="text-stone-300 font-semibold text-4xl tracking-tight">
                Word #{count}
              </p>
            {/if}
            <p class="text-stone-50 font-bold text-7xl md:text-8xl wrap-break-words">
              {currentWord}
            </p>
          </div>
          <form
            onsubmit={onSubmit}
            class="flex flex-col gap-6 items-center justify-center w-full"
          >
            {#if currentWord !== "Complete!"}
              <div class="h-8">
                {#if wrong}
                  <p class="text-red-400 text-2xl font-semibold animate-pulse">
                    Incorrect!
                  </p>
                {/if}
              </div>
              <input
                type="text"
                placeholder="Translate..."
                bind:value={input}
                bind:this={inputField}
                autofocus
                class="w-full max-w-md text-3xl text-center text-stone-100 bg-stone-900/50 border-2 border-stone-700 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors duration-300 px-6 py-3"
              />
              <button
                type="submit"
                class="w-48 font-semibold text-stone-50 text-xl bg-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
              >
                Submit
              </button>
            {/if}
          </form>
        </div>
      </div>
    {:else}
      <div
        class="w-full max-w-2xl mx-auto bg-stone-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-stone-700 flex flex-col items-center gap-8"
      >
        <h1 class="text-4xl text-stone-100 font-bold tracking-tight">
          Lobby | {data.room}
        </h1>
        <div
          class="w-full bg-stone-900/50 rounded-xl p-6 flex flex-col items-center gap-4"
        >
          <h2 class="text-2xl text-stone-200 mb-2">Players in room</h2>
          <div
            class="bg-emerald-600/20 border border-emerald-500 text-emerald-300 text-xl font-semibold rounded-lg px-4 py-2"
          >
            You ({myUserId})
          </div>
          {#each Object.entries(opponents) as [id, progress] (id)}
            <div
              class="bg-stone-700/50 border border-stone-600 text-stone-300 text-lg font-medium rounded-lg px-4 py-2"
            >
              {id}
            </div>
          {/each}
        </div>
        {#if data.isHost}
          <div class="flex justify-center items-center">
            <button
              onclick={startGame}
              class="w-64 font-semibold text-stone-50 text-2xl bg-emerald-600 px-8 py-4 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
            >
              Start
            </button>
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
