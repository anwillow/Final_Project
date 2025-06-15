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
