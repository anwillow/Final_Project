class Ticket {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.id = Date.now() + Math.floor(Math.random() * 1000);
  }
}

module.exports = Ticket;
