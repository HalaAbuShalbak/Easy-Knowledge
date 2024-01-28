const express = require("express");
const { createRole, deleteRole } = require("../controllers/roleController");
const roleRouter = express.Router();
roleRouter.post("/create", createRole);
roleRouter.delete("/delete/:id", deleteRole);

module.exports = roleRouter;
