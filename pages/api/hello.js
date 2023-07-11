import { google } from 'googleapis'

export default async function handler(req, res) {
    const query = []
    Object.keys(req.body).forEach((key, index) => {
        if(key != 'card') query.push(req.body[key])
    })
    console.log(query)

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
    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: req.body["card"] + "!A:C",
        valueInputOption: "USER_ENTERED",
        resource: body
    })
    console.log(response.status)
    res.status(200).json({ data: response.data })
}
