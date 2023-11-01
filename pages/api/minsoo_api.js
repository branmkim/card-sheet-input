import { google } from 'googleapis'

export default async function handler(req, res) {
    const query = [req.body["date"], req.body["note"], req.body["category"], req.body["amount"]]

    const auth = await google.auth.getClient({
        projectId: "norse-carport-392418",
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    const sheets = google.sheets({ version: 'v4', auth })
    const body = {
        values: [
            query
        ]
    }

    const today = new Date()
    const month = today.toLocaleString('default', { month: 'short' }).toLowerCase();
    const year = today.toLocaleString('default', { year: '2-digit' });

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: "1AfgQFaRvrmZZdq5PsoXbqXTlJCO1TBcAqVfhZDAk9u0",
        range: month + ' ' + year + "!A:C",
        valueInputOption: "USER_ENTERED",
        resource: body
    })
    console.log(response.status)
    res.status(200).json({ data: response.data })
}
