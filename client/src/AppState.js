import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,
  /** @type {import('./models/TowerEvent.js').TowerEvent[]}*/
  events: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent}*/
  activeEvent: null,
  /** 
   * @type {import('./models/Ticket.js').Ticket[]} this is for a personal account tickets to an event
   * */
  tickets: [],
  /**
   *  @type {import('./models/Ticket.js').Ticket[]} this is tickets or profiles of people attending
  */
  ticketAttendees: [],
  /** @type {import('./models/Comment.js').Comment[]}*/
  comments: []
})

