<script setup>
import { AppState } from '@/AppState';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const event = computed(() => AppState.activeEvent)

const route = useRoute()

onMounted(() => {
    getEventsById()
})

async function getEventsById() {
    try {
        const eventId = route.params.eventId
        await towerEventService.getEventsById(eventId)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Getting Events by Id]', error)
    }

}
</script>

<template>
    <div v-if="event" class="container">
        <section class="row">
            <div class="col-mb-12">
                <img :src="event.coverImg" alt="event.creator.name" class="img-fluid">
            </div>
        </section>
        <section class="row">
            <div class="col-7">
                <h2 class="m-3">{{ event.name }}</h2>
                <p>{{ event.description }}</p>
                <h4>Date and Time</h4>
                <p>{{ event.createdAt }}</p>
                <h4>Location</h4>
                <p>{{ event.location }}</p>
            </div>
            <div class="col-4 m-3">
                <div>
                    <h4>Interested in going?</h4>
                    <p>Grab a ticket!</p>
                    <button class="btn btn-primary">Attend</button>
                </div>
                <div>
                    <h4>Attendees</h4>
                    <div>list of people</div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
img {
    max-height: 50dvh;
}
</style>