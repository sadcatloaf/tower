<script setup>
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';


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
    </section>
    <section class="row m-3">
      <h3>How Tower works</h3>
    </section>
    <section class="row m-3">
      <h3>Explore top categories</h3>
    </section>
    <section class="row m-3">
      <h3>Upcoming Events</h3>
    </section>
  </div>
</template>

<style scoped lang="scss">
.background-img {
  background-image: url(https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlb3BsZXxlbnwwfHwwfHx8Mg%3D%3D);
  background-position: center;
  background-size: cover;
  min-height: 50dvh;
}
</style>
