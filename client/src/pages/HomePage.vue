<script setup>
import { AppState } from '@/AppState';
import ModalWrapper from '@/components/ModalWrapper.vue';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted, ref } from 'vue';

const events = computed(() => {
  if (activeFilterCategory.value == 'all') return AppState.events
  return AppState.events.filter(event => event.type == activeFilterCategory.value)
})

const activeFilterCategory = ref('all')

const categories = [

  { name: 'all', icon: 'mdi mdi-all-inclusive' },
  { name: 'concert', icon: 'mdi mdi-guitar-electric' },
  { name: 'convention', icon: 'mdi mdi-account-multiple' },
  { name: 'sport', icon: 'mdi mdi-soccer' },
  { name: 'digital', icon: 'mdi mdi-television' }

]

onMounted(() => {
  getEvents()


  async function getEvents() {
    try {
      await towerEventService.getEvents()
    }
    catch (error) {
      Pop.meow(error);
      logger.error('[Getting Events]', error)
    }

  }
})




</script>

<template>
  <div class=" container">
    <section class="row">
      <div class="col-mb-12 background-img">
        <div class="col-mb-8 text-light">
          <h2 class="m-2 p-3">Event management for people,by people</h2>
          <p class="m-4 p-2">Whatever your interest, from hiking and reading to networking and skill sharing, there are
            thousands of
            people who share it on Tower Events are happening every day-log in to join the fun</p>
        </div>
      </div>

      <div class="col-mb-12 m-3">
        <h3>How Tower works</h3>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">Create Event</button>
      </div>

      <div class="col-mb-3 d-flex m-3 p-2 text-center">
        <div v-for="category in categories" :key="'filter-' + category.name" class=" m-3">
          <div @click="activeFilterCategory = category.name" role="button">
            <span :class="category.icon"></span>
            <h3>{{ category.name }}</h3>
          </div>
        </div>
      </div>

      <div class="col-mb-3">
        <h3>Upcoming Events</h3>
        <div v-for="event in events" :key="event.id">
          <TowerEventCard :event="event" />
        </div>

      </div>
    </section>
  </div>
  <ModalWrapper />
</template>

<style scoped lang="scss">
.background-img {
  background-image: url(https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D);
  background-position: center;
  background-size: cover;
  min-height: 50dvh;
}
</style>
