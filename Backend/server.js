const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');


const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');

mongoose.connection.once('open',()=>console.log('MongoDB connected Successfully'));

const PORT = 3000;

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));