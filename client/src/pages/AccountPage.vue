<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketService } from '@/services/TicketService.js';

const account = computed(() => AppState.account)

onMounted(() => {
  getMyTickets()
})

async function getMyTickets() {
  try {
    await ticketService.getMyTickets()
  } catch (error) {
    Pop.meow(error)
    logger.error('[Getting my tickets]', error)
  }

}

</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome back {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" :alt="account.name" />
    </div>
    <div v-else>
      <h1 class="text-center">Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
