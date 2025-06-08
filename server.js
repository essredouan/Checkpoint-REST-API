const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' });
const User = require('./models/User');


console.log('test');


const app = express();
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected'))
.catch((err) => console.error('❌error:', err));

// الراوتس

// GET: جلب جميع المستخدمين
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: إضافة مستخدم جديد
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: تعديل مستخدم حسب ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: حذف مستخدم حسب ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Route مؤقت للتجربة
app.get('/', (req, res) => {
  res.send('✅ API working');
});

// تشغيل الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 on http://localhost:${PORT}`);
});
