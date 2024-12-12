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
}
export const commentService = new CommentService()