# 🗳️ Vote App

## 📌 รายละเอียดโปรเจกต์

Vote App เป็นแอปพลิเคชันสำหรับโหวตระหว่าง "แมว 🐱" และ "สุนัข 🐶" โดยใช้ **Node.js**, **Express.js**, และ **MongoDB**

---

## 🚀 วิธีการติดตั้งและรันแอปพลิเคชัน

### 🔹 1. ติดตั้ง **Node.js** และ **MongoDB**

- ดาวน์โหลดและติดตั้ง [Node.js](https://nodejs.org/) หากยังไม่มี
- ติดตั้งและรัน [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### 🔹 2. โคลนโปรเจกต์

```sh
git clone https://github.com/your-repo/vote-app.git
cd vote-app
```

### 🔹 3. ติดตั้ง dependencies

```sh
npm install
```

### 🔹 4. รันแอปพลิเคชัน

```sh
node server.js
```

- แอปจะรันที่ **`http://localhost:3000`**
- MongoDB ต้องรันอยู่ที่ **`mongodb://localhost:27017/votingdb`**

### 🔹 5. หยุดแอปพลิเคชัน

กด `Ctrl + C` เพื่อหยุดเซิร์ฟเวอร์

---

## 📁 โครงสร้างไฟล์

```
📂 vote-app
├── 📂 models         # โครงสร้างของฐานข้อมูล
├── 📂 routes         # เส้นทางของ API
├── 📂 views          # ไฟล์ HTML (ใช้ EJS)
├── 📂 public         # ไฟล์ CSS และ assets
├── server.js        # ไฟล์หลักของเซิร์ฟเวอร์
├── package.json     # รายละเอียด dependencies ของ Node.js
└── README.md        # คำแนะนำการใช้งาน
```

---

## 🛠️ API Endpoint

| Method | Endpoint | Description   |
| ------ | -------- | ------------- |
| GET    | `/`      | หน้า UI หลัก  |
| POST   | `/vote`  | บันทึกการโหวต |

---

## ⚙️ การตั้งค่า Environment Variables

สามารถเปลี่ยนค่าการเชื่อมต่อ MongoDB ได้ที่ไฟล์ **server.js**

```javascript
อย่าลืมสร้างไฟล์ .env โดยมีค่า MONGO_URI=mongodb://localhost:27017/voteDB ;
```

---

## 📜 License

MIT License


