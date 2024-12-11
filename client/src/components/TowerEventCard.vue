<script setup>
import { Event } from '@/models/TowerEvent';


defineProps({
    event: { type: Event, required: true }
})

</script>

<template>
    <div>
        <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
            <img class="img-fluid" :src="event.coverImg" alt="event.creator.name">
        </router-link>
        <span>{{ event.name }}</span>
        <span>{{ event.creator.name }}</span>
        <span>{{ event.startDate }} - {{ event.location }}</span>
        <span>{{ event.capacity }}</span>
    </div>
</template>

<style lang="scss" scoped></style>