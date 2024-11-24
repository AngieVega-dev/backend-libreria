const express = require("express")
const router = express.Router()

const LoansController = require("../controllers/loans.controller")
const Datasource = require("../db/library.datasource")
const controller = new LoansController(new Datasource())

router.get("/", (req, res) => {
    controller.list(res, req)
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