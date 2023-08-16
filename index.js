const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')

app.listen(3002, console.log("Servidor arriba"))

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    canciones.push(cancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción agregada correctamente!")
})


app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = cancion
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción editada exitosamente!")
})


app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Canción borrada exitosamente!")
})