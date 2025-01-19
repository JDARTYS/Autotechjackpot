const stripe = require('stripe')(process.env.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); // Usa il nome della variabile di ambiente standard

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Validazione dei dati della richiesta
      const { cartItems } = req.body;

      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('Invalid cart items. Ensure the cart is not empty.');
      }

      // Creazione degli elementi per Stripe
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100), // Converti in centesimi
        },
        quantity: item.quantity,
      }));

      // Creazione della sessione di checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success.html`, // URL di successo
        cancel_url: `${req.headers.origin}/checkout.html`, // URL di annullamento
      });

      console.log('Stripe Session Created:', session.id); // Debug utile

      // Restituisce l'ID della sessione
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Stripe Error:', error.message); // Log dettagliato per debug
      res.status(500).json({ error: error.message });
    }
  } else {
    // Metodo non consentito
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
