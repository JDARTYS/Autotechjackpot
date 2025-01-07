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
