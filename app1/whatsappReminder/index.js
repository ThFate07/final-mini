const FACEBOOK_PAGE_ACCESS_TOKEN="EAAbFdzTqihABO3urIbjiCgQnzhvjZCiyzLcKZCraZAgeaMCuZCDTgw1mNrzJyAR4F2aWueBHYBKgSGP0yqpwqsaUVZCRailRUSQDI1wcdTCNfiwikM1GjgFZBFwA5ZB0WpqNUSLfdkfPKN3gNvbwn7EYwIDjJvgjnRrpkytYBSdNv5oN9GWnkzyQUd0bX9g3NfKLmDt0Ur2QQTPThgNl2VqeFsRpOcZD"
// permanent EAAbFdzTqihABO2w9gU9cTjeEH3mZAOleoxcM6IbC47uB9hpbc22jPIhauhEz88FI9ZAFqe8zQyZBTPsns1x1MJ9dE4ptM3zKPpSo95H5eof0u96gAZA5QekcRUl4To7BZBVRhhbnQ3jViYytMcGhjed8kQKz3A0pIUt3r4SPPynXJeg7FMZAfXcawW6vCHmCRE
function sendMessage(message) {
  const headers = {
    Authorization: `Bearer ${FACEBOOK_PAGE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
  //
  const data = {
    messaging_product: "whatsapp",
    to: `+917715821250`, // 9763556796
    type: "text",
    text: {
      body: `${message}`,
    },
  };

  fetch("https://graph.facebook.com/v19.0/382562468271039/messages", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);
}

console.log("hi")
sendMessage("Test message from Kunaal");