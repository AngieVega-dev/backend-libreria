const express = require("express")
const router = express.Router()

const BooksController = require("../controllers/books.controller") // Modelo Vista (route) controlador
const Datasource = require("../db/library.datasource")
const controller = new BooksController(new Datasource())

router.get("/", (req, res) => {
    controller.list(res, req)
});

router.get("/:id", (req, res) => {
    controller.listById(req, res)
});

router.post("/", (req, res) => {
   controller.insert(res, req)
});

router.put("/:id", (req, res) => {
    controller.update(res, req)
});

router.delete("/:id", (req, res) => {
    controller.delete(res, req)
});

module.exports = router;