const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

// ดูเมนูกาแฟ
app.get("/menu", async (req, res) => {
    res.status(200).json([
        {
            "name": "latte",
            "size": ["big","small"],
            "sweetness": [100, 75, 50, 0]
        },
        {
            "name": "expresso",
            "size": ["big","small"],
            "sweetness": [100, 75, 50, 0]
        },
        {
            "name": "americano",
            "size": ["big","small"],
            "sweetness": [100, 75, 50, 0]
        },
    ])
})

app.get("/coffee", async  (req, res) => {
    res.status(200).json({ "status": "success" })
})

// ทำกาแฟเพิ่ม
app.post("/coffee",async  (req, res) => {
    res.status(200).json({ "status": "success" })
})

// เติมน้ำตาล
app.put("/coffee",async  (req, res) => {
    res.status(200).json({ "status": "success" })
})

// รับกาแฟ
app.delete("/coffee",async  (req, res) => {
    res.status(200).json({ "status": "success" })
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})


