const User = require('./User');
const Ticket = require('./Ticket');

class PurchaseManager {
  constructor() {
    this.users = [];
  }

  findOrCreateUser(name) {
    let user = this.users.find(u => u.name === name);
    if (!user) {
      user = new User(name);
      this.users.push(user);
    }
    return user;
  }

  buyTicket(userName, ticketType, quantity) {
    const user = this.findOrCreateUser(userName);
    const tickets = [];

    let price = 0;
    if (ticketType === 'Lofoten Islands Tour') price = 120;
    else if (ticketType === 'Northern Lights Experience') price = 150;
    else if (ticketType === 'Fjord Cruise Adventure') price = 100;
    else if (ticketType === 'Trolltunga Hike') price = 90;
    else if (ticketType === 'Geirangerfjord Safari') price = 130;

    for (let i = 0; i < quantity; i++) {
      const ticket = new Ticket(ticketType, price);
      user.buy(ticket);
      tickets.push(ticket);
    }

    return { user, tickets };
  }
}

module.exports = PurchaseManager;
