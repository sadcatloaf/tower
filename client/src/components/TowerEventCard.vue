<script setup>
import { TowerEvent } from '@/models/TowerEvent';


defineProps({
    event: { type: TowerEvent, required: true }
})

</script>

<template>
    <router-link :to="{ name: 'TowerEvent', params: { eventId: event.id } }">
        <img class="img-fluid" :src="event.coverImg" alt="event.creator.name">
    </router-link>
    <span>{{ event.name }}</span>
    <div v-if="event.creator">
        <span>{{ event.creator.name }}</span>
    </div>
    <span>{{ event.startDate }} - {{ event.location }}</span>
    <span>{{ event.capacity }}</span>
</template>

<style lang="scss" scoped></style>