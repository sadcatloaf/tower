<script setup>
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';


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
    <section class="row">
        <div class="col-mb-12">
            {{ }}
        </div>
    </section>
</template>

<style lang="scss" scoped></style>