document.addEventListener('DOMContentLoaded', () => {
  // Aggiungi qui eventuale codice di interattività, animazioni o altre logiche JS

  // Esempio per l'integrazione del PayPal Button direttamente nella pagina
  const paypalButtonContainer = document.getElementById('paypal-button-container');

  if (paypalButtonContainer) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' // Imposta l'importo per il pagamento
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render(paypalButtonContainer); // Renderizza il pulsante PayPal
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Dati dei biglietti iniziali
  const ticketsData = {
    iphone: { total: 3800, price: 1.22 },
    audi: { total: 18000, price: 1.80 },
    bmw: { total: 22000, price: 2.22 },
    mercedesGle: { total: 15000, price: 5.11 },
    mercedesCls: { total: 15000, price: 3.59 },
    mercedesS63: { total: 13500, price: 5.01 }
  };

  // Funzione per aggiornare il conteggio dei biglietti
  const updateTicketCount = (competitionId, ticketsRemaining) => {
    const element = document.getElementById(`${competitionId}-tickets-remaining`);
    if (element) {
      element.textContent = ticketsRemaining;
    }
  };

  // Logica per il decremento dei biglietti quando l'utente acquista un biglietto
  document.querySelectorAll('.enter-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const competitionId = e.target.href.split('=')[1];
      switch (competitionId) {
        case '1':
          ticketsData.iphone.total--;
          updateTicketCount('iphone', ticketsData.iphone.total);
          break;
        case '2':
          ticketsData.audi.total--;
          updateTicketCount('audi', ticketsData.audi.total);
          break;
        case '3':
          ticketsData.bmw.total--;
          updateTicketCount('bmw', ticketsData.bmw.total);
          break;
        case '4':
          ticketsData.mercedesGle.total--;
          updateTicketCount('mercedes-gle', ticketsData.mercedesGle.total);
          break;
        case '5':
          ticketsData.mercedesCls.total--;
          updateTicketCount('mercedes-cls', ticketsData.mercedesCls.total);
          break;
        case '6':
          ticketsData.mercedesS63.total--;
          updateTicketCount('mercedes-s63', ticketsData.mercedesS63.total);
          break;
      }
    });
  });
});
