import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventService } from "../services/TowerEventService";
import BaseController from "../utils/BaseController";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:eventId', this.getEventsById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
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

}