class User {
  constructor(name) {
    this.name = name;
    this.tickets = [];
  }

  buy(ticket) {
    this.tickets.push(ticket);
  }
}

module.exports = User;
