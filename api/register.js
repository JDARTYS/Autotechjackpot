const bcrypt = require('bcryptjs');
let users = []; // Array per salvare temporaneamente gli utenti

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        users.push({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Registrazione completata' });
    } else {
        res.status(405).json({ message: 'Metodo non consentito' });
    }
}
