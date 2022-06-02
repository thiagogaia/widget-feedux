<script lang="ts">
  import { ArrowLeft, Bug, Camera, Check, Cloud, Lightbulb, Trash, X } from 'phosphor-svelte'
  import { PopoverButton } from '@rgossiaux/svelte-headlessui'
  import html2canvas from "html2canvas";
  import Loading from './Loading.svelte';
  import {api} from './api'

  export let title:string
  let feedsChoice:number
  let feedbackTypes = [
    {id: 1, name: 'Problemas', icone: Bug},
    {id: 2, name: 'Ideia', icone: Lightbulb},
    {id: 3, name: 'Outro', icone: Cloud},
  ]
  
  let imgScreenshot:string | null
  let isTakenScreenshot:boolean = false
  async function takeScreenshot() {
    isTakenScreenshot = true
    const canvas = await html2canvas(document.querySelector('body')!)
    const base64img = canvas.toDataURL('image/png')
    imgScreenshot = base64img
    isTakenScreenshot = false
    //feedsChoice = antFeedsChoice
  }
  
  let comentario:string = ''
  let feedbackSent:boolean = false
  let isSendingDados:boolean = false
  async function enviarDados() {
    isSendingDados = true
    //console.log(comentario, imgScreenshot, feedsChoice)
    try {
      let resp = await api.post('feedbacks', {
        type: feedsChoice,
        comment: comentario,
        screenshot: imgScreenshot
      });
      //console.log(resp.data)
      title = ''
      feedsChoice = null
      feedbackSent = true
      isSendingDados = false
    } catch (err) {
      console.log(err)
    }
    
  }

  function reSend() {
    feedbackSent = false
    title = 'Deixe seu Feedback'
  }
</script>
<div class="bg-zinc-900 text-white p-4 rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
  <header>
    {#if feedsChoice}
      <button type="button" on:click={() => feedsChoice = null} class="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
        <ArrowLeft weight={'bold'} size={16} />
      </button>
    {/if}
    <span class="text-xl leading-6 flex items-center gap-2">
      {#if feedsChoice}
        <svelte:component this={feedbackTypes[feedsChoice-1].icone} size={17}/>
      {/if}
      {!feedsChoice ? title : feedbackTypes[feedsChoice-1].name}
    </span>
    
    <PopoverButton class="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100" title="Fechar o formulário de feedback">
      <X size={16} weight={'bold'} />
    </PopoverButton>
  </header>
 
  {#if feedbackSent}
    <div class="flex flex-col items-center py-10 w-[304px]">
      <Check size={42} color="#528a47" weight='bold'/>
      <span class="text-xl mt-2">Agradecemos o seu feedback!</span>
      <button 
        class="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus-custom"
        on:click={reSend}
        >
        Quero enviar outro
      </button>
    </div>
  {:else}
    {#if !feedsChoice}
      <div class="flex py-8 gap-2 w-full">
        {#each feedbackTypes as feeds}
          <label class="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none">
            <input type="radio" bind:group={feedsChoice} value={feeds.id} class="opacity-0" />
            <svelte:component this={feeds.icone} size={50}/>
            <p>{feeds.name}</p>
          </label>
        {/each}  
      </div>
    {:else}
      <form class="my-4 w-full" on:submit|preventDefault={enviarDados}>
        <textarea bind:value={comentario} class="min-w-[304px] min-h-[112px] w-full text-sm placeholder-zinc-400 text-zinc-100 border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin" placeholder="Conte detalhes do que está acontecendo..." />
        <footer class="flex gap-2 mt-2">
          {#if imgScreenshot}
            <button 
              type="button"
              class="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
              style="background-image: url({imgScreenshot}); background-position: right bottom; background-size: 180px;"
              on:click={() => imgScreenshot = null}
              >
              <Trash weight={'fill'}/>
            </button>
          {:else}        
            <button on:click={takeScreenshot} class="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500" type="button">
              {#if isTakenScreenshot}
                <Loading />
              {:else}
                <Camera size={24}/>
              {/if}
              
            </button>
          {/if}

         
          <button disabled={comentario.length === 0 || isSendingDados} type="submit" class="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
            {#if isSendingDados}
              <Loading />
            {:else}
              Enviar Feedback
            {/if}
          </button>
          
        </footer>
      </form>
    {/if}
  {/if}
  <footer class="text-xs text-neutral-400">
    Feito com &#10084; <a href="https://nuzap.com.br" class="underline underline-offset-2">Gaia Corp</a>
  </footer>
</div>