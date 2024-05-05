import express from "express"
import dotenv from 'dotenv'
import path from 'path'
import cors from "cors"
import { fileURLToPath } from 'url';

import knowledge from "./src/generators/knowledge.ts"
import removeQuotes from "./src/utils/removeQuotes.ts"

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors())
const port = 369

app.get('/', (req, res) => {
    console.log("recebido")
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/buttonClick', async (req, res) => {
    console.log("buttonClick")
    res.send({message:"Chamado recebido"})  
})


app.get('/knowledge', async (req, res) => {
    const quote = await knowledge()
    console.log(quote)
    res.setHeader('Content-Type', 'application/json')
    res.send(removeQuotes(quote.choices?.[0]?.message?.content??""))
})

app.listen(port, () => {
    console.log(`App iniciado na porta: ${port}`)
})