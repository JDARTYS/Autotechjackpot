export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({ auth: false, token: null });
    } else {
        res.status(405).json({ message: 'Metodo non consentito' });
    }
}
