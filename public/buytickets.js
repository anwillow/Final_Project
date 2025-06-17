document.getElementById('buyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    ticket: formData.get('ticket'),
    quantity: formData.get('quantity')
  };

  const res = await fetch('/buytickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  let message = `<p>Thank you, ${result.user.name}!</p><p>You purchased:</p><ul>`;
  result.tickets.forEach(ticket => {
    message += `<li>${ticket.name} (ID: ${ticket.id}, Price: ${ticket.price})</li>`;
  });
  message += '</ul>';
  document.getElementById('result').innerHTML = message;

  setTimeout(() => location.reload(), 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("ticketSearch");
  const ticketCards = document.querySelectorAll(".ticket-card");

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    ticketCards.forEach(card => {
      const name = card.querySelector(".buyer-name")?.innerText.toLowerCase() || "";
      const id = card.querySelector(".ticket-id")?.innerText.toLowerCase() || "";

      if (name.includes(query) || id.includes(query)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});