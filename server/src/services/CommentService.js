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
        const comments = await dbContext.Comment.find({ eventId: eventId }).populate('creator', 'name coverImg')
        return comments
    }
}
export const commentService = new CommentService()