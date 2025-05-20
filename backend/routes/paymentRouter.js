// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const authentication = require("../middleware/Authentication");
const { createPayment,
    getUserPayments,
    getPaymentById} =require ("../controllers/paymentController")

router.post("/payments", authentication, createPayment); 
router.get("/payments", authentication, getUserPayments); 
router.get("/payments/:id", authentication, getPaymentById);

module.exports = router;
