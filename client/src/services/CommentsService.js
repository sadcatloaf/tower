import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Commented } from "@/models/Comment.js";

class CommentsService {
    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)
        logger.log('delete comment', response.data)
        const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)

        if (commentIndex == -1) {
            throw new Error("You dont have an index")
        }
    }
    async getCommentsByCreatorId(eventId) {
        AppState.comments = []
        const response = await api.get(`api/events/${eventId}/comments`)
        logger.log('Got Comments', response.data)
        const comments = response.data.map(commentsPOJO => new Commented(commentsPOJO))
        AppState.comments = comments
    }

    async createComment(CommentData) {
        const response = await api.post('api/comments', CommentData)
        logger.log('Created Comment', response.data)
        const comments = new Commented(response.data)
        AppState.comments.push(comments)
    }
}

export const commentsService = new CommentsService()