require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

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
    const categories = ["Cats", "Dogs"];
    for (const category of categories) {
        const existing = await Vote.findOne({ category });
        if (!existing) {
            await Vote.create({ category, votes: 0 });
        }
    }
};
initializeVotes();

// เส้นทางแสดงผลหน้าเว็บ
app.get("/", async (req, res) => {
    const votes = await Vote.find();
    res.render("index", { votes });
});

// เส้นทางบันทึกโหวต
app.post("/vote", async (req, res) => {
    const { category } = req.body;
    await Vote.findOneAndUpdate({ category }, { $inc: { votes: 1 } });
    res.redirect("/");
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
