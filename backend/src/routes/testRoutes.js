import express from "express";

const router = express.Router();

router.get('/ping', (req, res) => {
    res.sendStatus(200);
})

export default router;