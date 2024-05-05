import express from "express"
import knowledge from "./src/generators/knowledge.js"
import removeQuotes from "./src/utils/removeQuotes.js"
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 369

app.get('/', (req, res) => {
    console.log("recebido")
    res.send("olá mundo")
    
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