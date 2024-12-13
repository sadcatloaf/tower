import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventService } from "../services/TowerEventService";
import BaseController from "../utils/BaseController";
import { ticketService } from "../services/TicketService";
import { commentService } from "../services/CommentService";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventsById)
            .get('/:eventId/tickets', this.getTicketsById)
            .get('/:eventId/comments', this.getCommentsByEventId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.editEvents)
            .post('', this.createTowerEvent)
            .delete('/:eventId', this.cancelEvent)
    }

    /**
     * Creates a new value from request body and returns the value
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
    */

    async createTowerEvent(request, response, next) {
        try {
            const eventData = request.body
            eventData.creatorId = request.userInfo.id
            const event = await towerEventService.createTowerEvent(eventData)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }


    /**
     * returns all events from database
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
    */

    async getAllEvents(request, response, next) {
        try {
            const events = await towerEventService.getAllEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    /**
        * returns a single event from database using the id from route params
        * @param {import("express").Request} request
        * @param {import("express").Response} response
        * @param {import("express").NextFunction} next
    */

    async getEventsById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerEventService.getEventsById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }


    async editEvents(request, response, next) {
        try {
            const eventId = request.params.eventId
            const updateData = request.body
            const userInfo = request.userInfo
            const editEvents = await towerEventService.editEvents(eventId, updateData, userInfo.id)
            response.send(editEvents)
        } catch (error) {
            next(error)
        }
    }

    /**
     * flip the archived boolean using supplied id from route params
     * @param {import("express").Request} request
     * @param {import("express").Response} response
            * @param {import("express").NextFunction} next
    */

    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userInfo = request.userInfo
            const event = await towerEventService.cancelEvent(eventId, userInfo.id)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    /**
            * flip the archived boolean using supplied id from route params
            * @param {import("express").Request} request
            * @param {import("express").Response} response
            * @param {import("express").NextFunction} next
            */

    async getTicketsById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketService.getTicketsById(eventId)
            response.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    /**
            * 
            * @param {import("express").Request} request
            * @param {import("express").Response} response
            * @param {import("express").NextFunction} next
            */


    async getCommentsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentService.getCommentsByEventId(eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }
}