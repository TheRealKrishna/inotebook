const connectToMongo = require("./db");
const cors = require("cors");
connectToMongo();

const express = require('express')
const app = express()
const port = 80

app.use(express.json())
app.use(cors())

//Available Routes
app.use("/auth", require("./routes/auth"))
app.use("/notes", require("./routes/notes"))

app.get("/", (req, res) => {
  return res.send("Backend for iNoteBook..")
})

app.listen(port, () => {
  console.log(`app running on port http://localhost:${port}`)
});