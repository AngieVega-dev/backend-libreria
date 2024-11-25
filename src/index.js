const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Bienvenido a nuestra API")
});

// Endpoints (middlewares vista)


app.use("/api/books", require("./routes/books.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/authors", require("./routes/authors.routes"));
app.use("/api/loans", require("./routes/loans.routes"));

app.on("error", (error) => {
    console.error(error)
});

app.listen(3000, () => {
    console.log('Aplicación escuchando por el puerto 3000')
});
