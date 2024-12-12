<script setup>
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { ref } from 'vue';


const categories = ['concert', 'convention', 'sport', 'digital']

const editableEventData = ref({
    creatorImg: '',
    name: '',
    location: '',
    description: '',
    capacity: '',
    startDate: '',
    type: '',
    category: ''
})
// name, description, capacity, coverImg, location, startDate, capacity, type

async function createEvent() {
    try {
        await towerEventService.createEvent(editableEventData.value)
        editableEventData.value = {
            creatorImg: '',
            name: '',
            location: '',
            description: '',
            capacity: '',
            startDate: '',
            type: '',
            category: ''
        }
        Modal.getInstance('#eventModal').hide()
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
            <input v-model="editableEventData.name" type="text" class="form-control" id="type"
                placeholder="Event Type..." required minlength="3" maxlength="25">
            <label for="type">Event Type</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="startDate"
                placeholder="Event StartDate..." required minlength="3" maxlength="25">
            <label for="startDate">Start Date</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="location"
                placeholder="Event Location..." required minlength="3" maxlength="25">
            <label for="location">Event Title</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="capacity"
                placeholder="Event Capacity..." required minlength="3" maxlength="25">
            <label for="capacity">Capacity</label>
        </div>
        <div class="form-floating mb-3">
            <textarea v-model="editableEventData.description" class="form-control" placeholder="Album Description..."
                id="description" minlength="15" maxlength="250"></textarea>
            <label for="description">Event Description</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.creatorImg" type="url" class="form-control" id="coverImg"
                placeholder="Album CoverImg..." required maxlength="2000">
            <label for="coverImg">Event CoverImg</label>
        </div>
        <div class="form-floating mb-3">
            <select v-model="editableEventData.category" class="form-select text-capitalize" id="category"
                aria-label="Event Category" required>
                <option selected value="" disabled>Choose a category</option>
                <option v-for="category in categories" :key="category" :value="category" class="text-capitalize">
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