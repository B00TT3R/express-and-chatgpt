import express from "express"
import dotenv from 'dotenv'

import knowledge from "./src/generators/knowledge.js"
import removeQuotes from "./src/utils/removeQuotes.js"

dotenv.config()
const app = express()
const port = 369
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log("recebido")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/knowledge', async (req, res) => {
    const quote = await knowledge()
    console.log(quote)
    res.setHeader('Content-Type', 'application/json')
    res.send(removeQuotes(quote.choices?.[0]?.message?.content))
})

app.listen(port, () => {
    console.log(`App iniciado na porta: ${port}`)
})