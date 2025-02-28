import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        // Simula una verifica (puoi usare un database)
        if (email === "test@example.com" && password === "password123") {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            return res.status(200).json({ message: "Login avvenuto con successo", token });
        }

        return res.status(401).json({ message: "Credenziali non valide" });
    }

    res.status(405).json({ message: "Metodo non consentito" });
}
