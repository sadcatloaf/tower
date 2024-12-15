import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";

class CommentsService {
    async getCommentsByCreatorId(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('Got Comments', response.data)
        const comments = response.data.map(commentsPOJO => new Comment(commentsPOJO))
        AppState.comments = comments
    }
}

export const commentsService = new CommentsService()