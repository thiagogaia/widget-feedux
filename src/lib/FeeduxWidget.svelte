<script lang="ts">
  import { ChatTeardropDots } from 'phosphor-svelte'
  import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui'
  import FeeduxContainer from './FeeduxContainer.svelte';
  

  
</script>
<Popover class="fixed bottom-4 right-4 md:bottom-7 md:right-7 flex flex-col items-end">
  
    <PopoverPanel>
      <FeeduxContainer title="Deixe seu Feedback" />
    </PopoverPanel>
    
    <PopoverButton class="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
      <ChatTeardropDots size={24} />
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
        <span class="pl-2"></span>
        Feedback
      </span>
    </PopoverButton>
  </Popover>