const stripe = require('stripe')(process.env.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);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { cartItems } = req.body;

      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/success.html`,
        cancel_url: `${req.headers.origin}/checkout.html`,
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
