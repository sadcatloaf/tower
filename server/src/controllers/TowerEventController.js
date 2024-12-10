import BaseController from "../utils/BaseController";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .post('', this.createTowerEvent)
    }

    /**
     * Creates a new value from request body and returns the value
     * @param {import("express").Request} request
     * @param {import("express").Response} response
     * @param {import("express").NextFunction} next
     */

    createTowerEvent(request, response, next) {
        try {
            response.send("Yes, post works")
        } catch (error) {
            next(error)
        }
    }



}