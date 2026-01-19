const mongoose = require('mongoose');

async function fixDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/StudentManagement');
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('classes');
    
    // Drop all indexes except _id
    await collection.dropIndexes();
    console.log('Dropped all indexes');
    
    // Clear the collection
    await collection.deleteMany({});
    console.log('Cleared classes collection');
    
    console.log('Database fixed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error);
    process.exit(1);
  }
}

fixDatabase();