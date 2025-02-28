const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let users = []; // Stesso array di utenti

const secretKey = 'secretkey123';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Password errata' });
        }
        const token = jwt.sign({ id: user.username }, secretKey, { expiresIn: 86400 });
        res.status(200).json({ auth: true, token });
    } else {
        res.status(405).json({ message: 'Metodo non consentito' });
    }
}
