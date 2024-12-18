<script setup>
import { AppState } from '@/AppState';
import CommentsForm from '@/components/CommentsForm.vue';
import { Commented } from '@/models/Comment';
import { commentsService } from '@/services/CommentsService';
import { ticketService } from '@/services/TicketService';
import { towerEventService } from '@/services/TowerEventService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';


const event = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const ticketAttendees = computed(() => AppState.ticketAttendees)
const attending = computed(() => ticketAttendees.value.some(ticketAttendee => ticketAttendee.accountId == account.value?.id))
const comments = computed(() => AppState.comments)


const route = useRoute()


// const props = defineProps({
//     commentProp: { type: Commented, required: true }
// })



watch(route, () => {
    getEventsById()
    getTicketProfilesByEventId()
    getCommentsByCreatorId()
}, { immediate: true })


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

async function createTicket() {
    try {
        const eventData = { eventId: route.params.eventId }
        await ticketService.createTicket(eventData)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Creating Ticket]', error)
    }
}

async function getTicketProfilesByEventId() {
    try {
        const eventId = route.params.eventId
        await ticketService.getTicketProfilesByEventId(eventId)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Getting ticket Profiles]', error)
    }
}


async function getCommentsByCreatorId() {
    try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByCreatorId(eventId)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Getting comments]', error)
    }
}

async function deleteComment(commentId) {
    try {
        const message = 'Are you sure you want to delete this comment?'
        const confirmed = await Pop.confirm(message)
        if (!confirmed) { return }
        await commentsService.deleteComment(commentId)
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[deleting comment]', error)
    }
}
</script>

<template>
    <div v-if="event" class="container-fluid">
        <section class="row">
            <div class="col-mb-12 justify-content-center">
                <img :src="event.coverImg" alt="event.creator.name" class="img-fluid">
                <i v-if="event.isCanceled" class="mdi mdi-alert text-warning" :title="`${event.name} is canceled`"></i>
            </div>
        </section>
        <section class="row justify-content-start">
            <div class="col-mb-5 m-3">
                <div>
                    <h2>{{ event.name }}</h2>
                    <p>{{ event.description }}</p>
                    <h4>Date and Time</h4>
                    <p>{{ event.startDate.toDateString() }}</p>
                    <h4>Location</h4>
                    <p>{{ event.location }}</p>
                    <h4>Event Capacity</h4>
                    <p>{{ event.capacity }}</p>
                    <h4>Type</h4>
                    <p>{{ event.type }}</p>
                </div>
            </div>
            <div v-if="!event.isCanceled" class="col-mb-8 m-3">
                <div>
                    <h4>Interested in going?</h4>
                    <p>Grab a ticket!</p>
                    <div v-if="account">
                        <button v-if="attending" class="btn btn-primary m-3" disabled>Attending</button>
                        <button v-show="ticketAttendees.length < event.capacity" @click="createTicket()"
                            class="btn btn-info">Attend</button>
                        <p v-show="ticketAttendees.length >= event.capacity">Sold Out</p>
                    </div>
                    <!-- NOTE logic check -->
                    <!-- <div>{{ ticketAttendees.length < event.capacity }} {{ ticketAttendees.length }}</div> -->
                </div>
                <div>
                    <h4>Attendees</h4>
                    <div v-for="ticketAttendee in ticketAttendees" :key="ticketAttendee.id" class="col-4 mb-3">
                        <img :src="ticketAttendee.profile.picture" :alt="ticketAttendee.profile.name"
                            class="img-fluid rounded" :title="ticketAttendee.profile.name">
                    </div>
                </div>
                <h5>Remaining Tickets</h5>
                <b>{{ event?.capacity - ticketAttendees.length }} spots left</b>
            </div>
            <div class="d-flex justify-content-end">
                <span @click="cancelEvent()" class="bg-danger rounded-pill p-2" role="button">Cancel</span>
            </div>
        </section>
        <div>
            <CommentsForm />
            <div v-for="comment in comments" :key="comment.id">
                <p>{{ comment.creator.picture }} {{ comment.creator.name }} <br> {{ comment.body }}</p>
                <div class="text-end m-4">
                    <button @click="deleteComment(comment.id)" v-if="comment.creatorId == account?.id">Delete
                        Comment</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    max-height: 50dvh;
}
</style>