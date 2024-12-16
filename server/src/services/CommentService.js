import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";
import { towerEventService } from "./TowerEventService";

class CommentService {
    async createComment(commentData) {
        const event = await towerEventService.getEventsById(commentData.eventId)

        if (event.isCanceled) {
            throw new Forbidden(`${event.name} is canceled and can no longer use comments`)
        }

        const comment = await dbContext.Comment.create(commentData)
        await comment.populate('creator', 'name coverImg')
        return comment
    }

    async getCommentsByEventId(eventId) {
        const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator', 'name picture')
        return comments
    }

    async deleteComment(commentId, userId) {
        const commentToDelete = await dbContext.Comment.findById(commentId)

        if (commentToDelete == null) {
            throw new Error(`Invalid comment id: ${commentId}`)
        }
        if (commentToDelete.creatorId != userId) {
            throw new Forbidden("You are not allowed to delete someone elses comment")
        }
        await commentToDelete.deleteOne()
        return 'Comment had been deleted'
    }
}
export const commentService = new CommentService()