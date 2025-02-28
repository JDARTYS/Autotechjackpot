import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, email, password } = req.body;

        // Simula il salvataggio dell'utente (in un database, ad esempio)
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
        }

        // Genera un token JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Registrazione avvenuta con successo", token });
    }

    res.status(405).json({ message: "Metodo non consentito" });
}
