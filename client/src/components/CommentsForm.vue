<script setup>
import { commentsService } from '@/services/CommentsService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const editableCommentData = ref({
    body: '',
    eventId: '',
    creatorId: '',
    creator: '',
})

async function createComment() {
    try {
        // @ts-ignore
        editableCommentData.value.eventId = route.params.eventId
        await commentsService.createComment(editableCommentData.value)

        editableCommentData.value = {
            body: '',
            eventId: '',
            creatorId: '',
            creator: '',
        }
    }
    catch (error) {
        Pop.meow(error);
        logger.error('[Creating Comment]', error)
    }
}
</script>


<template>
    <form @submit.prevent="createComment()">
        <div class="form-floating mb-3">
            <input v-model="editableCommentData.body" type="text" class="form-control" id="description"
                placeholder="Event description..." maxlength="5000">
            <label for="description">Event Comment</label>
        </div>
        <div class="text-end">
            <button class="btn btn-success">Submit</button>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>