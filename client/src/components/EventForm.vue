<script setup>
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const categories = ['concert', 'convention', 'sport', 'digital']

const editableEventData = ref({
    coverImg: '',
    name: '',
    location: '',
    description: '',
    capacity: '',
    startDate: '',
    type: ''
})
// name, description, capacity, coverImg, location, startDate, capacity, type

const router = useRouter()

async function createEvent() {
    try {
        const event = await towerEventService.createEvent(editableEventData.value)

        editableEventData.value = {
            coverImg: '',
            name: '',
            location: '',
            description: '',
            capacity: '',
            startDate: '',
            type: ''
        }

        Modal.getInstance('#eventModal').hide()

        router.push({ name: 'TowerEvent', params: { eventId: event.id } })
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Creating Event]', error)
    }
}
</script>

<template>
    <form @submit.prevent="createEvent()">
        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="name"
                placeholder="Event Name..." required minlength="3" maxlength="25">
            <label for="name">Event Name</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.startDate" type="text" class="form-control" id="startDate"
                placeholder="Event StartDate..." required minlength="3" maxlength="25">
            <label for="startDate">Start Date</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="text" class="form-control" id="location"
                placeholder="Event Location..." required minlength="3" maxlength="25">
            <label for="location">Event Location</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity"
                placeholder="Event Capacity..." required minlength="3" maxlength="5000">
            <label for="capacity">Capacity</label>
        </div>
        <div class="form-floating mb-3">
            <textarea v-model="editableEventData.description" class="form-control" placeholder="Album Description..."
                id="description" minlength="15" maxlength="250"></textarea>
            <label for="description">Event Description</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImg"
                placeholder="Album CoverImg..." required maxlength="2000">
            <label for="coverImg">Event CoverImg</label>
        </div>
        <div class="form-floating mb-3">
            <!-- TODO - Change the name to type instead of category -->
            <select v-model="editableEventData.type" class="form-select text-capitalize" id="category"
                aria-label="Event Category" required>
                <option selected value="" disabled>Choose a category</option>
                <option v-for="category in categories" :key="'option-' + category" :value="category"
                    class="text-capitalize">
                    {{ category }}
                </option>
            </select>
            <label for="category">Event Category</label>
        </div>
        <div class="text-end">
            <button class="btn btn-success" type="submit">Create Event</button>
        </div>
    </form>
</template>

<style lang="scss" scoped></style>