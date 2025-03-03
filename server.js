require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const winston = require("winston");

const app = express();
const PORT = process.env.PORT || 3000;

// ตั้งค่า Winston Logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// ใช้ Morgan ร่วมกับ Winston
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info("MongoDB Connected"))
    .catch(err => logger.error(`MongoDB Connection Error: ${err.message}`));

// ตั้งค่า EJS และ Static Files
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// โมเดลฐานข้อมูล
const VoteSchema = new mongoose.Schema({
    category: String,
    votes: Number
});
const Vote = mongoose.model("Vote", VoteSchema);

// ตรวจสอบว่ามีข้อมูลในฐานข้อมูลหรือยัง ถ้าไม่มีให้สร้างเริ่มต้น
const initializeVotes = async () => {
    const categories = ["Birds", "Dogs"];
    for (const category of categories) {
        const existing = await Vote.findOne({ category });
        if (!existing) {
            await Vote.create({ category, votes: 0 });
            logger.info(`Initialized category: ${category}`);
        }
    }
};
initializeVotes();

// เส้นทางแสดงผลหน้าเว็บ
app.get("/", async (req, res) => {
    try {
        const votes = await Vote.find();
        res.render("index", { votes });
    } catch (error) {
        logger.error(`Error fetching votes: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// เส้นทางบันทึกโหวต
app.post("/vote", async (req, res) => {
    const { category } = req.body;
    try {
        await Vote.findOneAndUpdate({ category }, { $inc: { votes: 1 } });
        logger.info(`Vote added to ${category}`);
        res.redirect("/");
    } catch (error) {
        logger.error(`Error voting for ${category}: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));
