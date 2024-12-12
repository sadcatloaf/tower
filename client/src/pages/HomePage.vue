<script setup>
import { AppState } from '@/AppState';
import ModalWrapper from '@/components/ModalWrapper.vue';
import TowerEventCard from '@/components/TowerEventCard.vue';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.events)

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
        <div class="col-8 text-light">
          <h2 class="m-2 p-3">Event management for people,by people</h2>
          <p class="m-4 p-2">Whatever your interest, from hiking and reading to networking and skill sharing, there are
            thousands of
            people who share it on Tower Events are happening every day-log in to join the fun</p>
        </div>
      </div>

      <div class="col-12 m-3">
        <h3>How Tower works</h3>

        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventModal">Create Event</button>
      </div>

      <div class=" m-3">
        <h3>Explore top categories</h3>
      </div>

      <div class=" m-3">
        <h3>Upcoming Events</h3>
      </div>

      <div v-for="event in events" :key="event.id" class="col-3 m-3">
        <TowerEventCard :event="event" />
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
