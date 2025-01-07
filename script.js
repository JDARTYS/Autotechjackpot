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
  const updateTicketCount = (competitionId) => {
    if (ticketsData[competitionId]) {
      ticketsData[competitionId].total--;  // Decrementa il numero di biglietti disponibili
      // Aggiorna l'interfaccia utente per riflettere il nuovo numero
      const ticketElement = document.getElementById(`${competitionId}-tickets-remaining`);
      if (ticketElement) {
        ticketElement.textContent = ticketsData[competitionId].total;
      }
    }
  };

  // Funzione per gestire il decremento dei biglietti quando l'utente acquista un biglietto
  document.querySelectorAll('.enter-button').forEach(button => {
    button.addEventListener('click', (e) => {
      const competitionId = e.target.href.split('=')[1];  // Ottieni l'ID del biglietto dalla URL
      updateTicketCount(competitionId);  // Decrementa il numero del biglietto
    });
  });

  // Aggiungi il pulsante PayPal nella pagina
  const paypalButtonContainer = document.getElementById('paypal-button-container');

  if (paypalButtonContainer) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        const competitionId = data.purchase_units[0].description || 'iphone';  // Usa 'iphone' come default
        return actions.order.create({
          purchase_units: [{
            description: competitionId,  // Associa l'ID del biglietto
            amount: { value: ticketsData[competitionId].price.toFixed(2) }  // Imposta l'importo per il pagamento
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name);

          // Decrementa il numero del biglietto acquistato
          const competitionId = data.purchase_units[0].description;
          updateTicketCount(competitionId);

          // Reindirizza alla homepage dopo il pagamento
          window.location.href = 'index.html';  // Homepage
        });
      }
    }).render(paypalButtonContainer); // Renderizza il pulsante PayPal
  }
});
