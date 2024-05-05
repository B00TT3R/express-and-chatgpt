import express from "express"
import dotenv from 'dotenv'
import path from 'path'
import cors from "cors"
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

import knowledge from "./src/generators/knowledge.ts"
import removeQuotes from "./src/utils/removeQuotes.ts"
import isJSONValid from "./src/utils/isJSONValid.ts"

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




app.get('/knowledge', async (req, res) => {
    const quote = await knowledge()
    console.log(quote)
    res.setHeader('Content-Type', 'application/json')
    res.send(removeQuotes(quote.choices?.[0]?.message?.content??""))
})

const server = app.listen(port, () => {
    console.log(`App iniciado na porta: ${port}`)
})

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
    console.log("Nova conexão WebSocket");

    
    ws.on("message", (data) => {
        try{
            if (isJSONValid(data.toString())){
                const dataValue = JSON.parse(String(data.toString()));
                switch(dataValue.op){
                    case "echo":
                        wss.clients.forEach((client) => {
                            if (client.readyState === client.OPEN) {
                                client.send(`Mensagem ecoada: ${dataValue.message}`);
                            }
                        });
                }
            }
            else wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                    client.send(`Não é um json válido`);
                }
            });
        }
        catch (err) {
            console.error(err);
        }
    });

    ws.on("close", () => {
        console.log("Conexão WebSocket fechada");
    });
});

app.get('/buttonClick', async (req, res) => {
    console.log("buttonClick")
    res.send({message:"Chamado recebido"})
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify({"op":"light", "message":"on"}));
        }
    });
    
})