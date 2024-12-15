import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
    async getCommentsByCreatorId(eventId) {
        const response = await api.get(`api/events/${{ eventId }}/comments`)
        logger.log('Got Comments', response.data)
    }
}

export const commentsService = new CommentsService()