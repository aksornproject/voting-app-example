# ใช้ Node.js เวอร์ชัน LTS
FROM node:18

# ตั้งค่าโฟลเดอร์ทำงานในคอนเทนเนอร์
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json ไปยังคอนเทนเนอร์
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์โปรเจกต์ทั้งหมดไปที่ /app
COPY . .

# กำหนดพอร์ตที่แอปจะรัน
