export default async function handler(req, res) {
    if (req.method === "POST") {
        return res.status(200).json({ message: "Logout effettuato con successo" });
    }

    res.status(405).json({ message: "Metodo non consentito" });
}
