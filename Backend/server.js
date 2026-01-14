const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require("dotenv").config();
const AdminRoutes=require('./routes/Admin-Routes');
const AuthRoutes=require('./routes/Auth-Routes');
const TeacherRoutes=require('./routes/Teacher-Routes');
const StudentRoutes=require('./routes/Student-Routes');



const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/StudentManagement');

mongoose.connection.once('open',()=>console.log('MongoDB connected Successfully'));

app.use('/admin', AdminRoutes);
app.use('/auth', AuthRoutes);
app.use('/teacher', TeacherRoutes);
app.use('/student', StudentRoutes);

const PORT = 3000;



app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));