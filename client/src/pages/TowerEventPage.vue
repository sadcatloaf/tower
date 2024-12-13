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

async function cancelEvent() {
    try {
        const yes = await Pop.confirm(`Are you sure that you want to cancel ${event.value.name} event?`, "It's an awesome event", "Yes I am sure!")

        if (!yes) return

        const eventId = route.params.eventId
        await towerEventService.cancelEvent(eventId)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Canceling Event]', error)
    }
}


</script>

<template>
    <div v-if="event" class="container">
        <section class="row">
            <div class="col-mb-12">
                <img :src="event.coverImg" alt="event.creator.name" class="img-fluid">
                <i v-if="event.isCanceled" class="mdi mdi-alert text-warning" :title="`${event.name} is canceled`"></i>
            </div>
        </section>
        <section class="row">
            <div class="col-7 m-3">
                <h2>{{ event.name }}</h2>
                <p>{{ event.description }}</p>
                <h4>Date and Time</h4>
                <p>{{ event.startDate }}</p>
                <h4>Location</h4>
                <p>{{ event.location }}</p>
            </div>
            <div class="col-4 m-3">
                <div>
                    <h4>Interested in going?</h4>
                    <p>Grab a ticket!</p>
                    <button class="btn btn-primary m-3">Attend</button>
                </div>
                <div>
                    <div class="m-3">
                        <h4>Attendees</h4>
                        <p>{{ event.capacity }}</p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <span @click="cancelEvent()" class="bg-danger rounded-pill p-2" role="button">Cancel</span>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
img {
    max-height: 50dvh;
}
</style>