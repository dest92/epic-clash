import mongoose from 'mongoose';

// Define el esquema de tu usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  points : {
    type: Number,
    required: false
  }
  // Agrega aquí otros campos según sea necesario
});

// Crea el modelo User basado en el esquema
//const User = mongoose.model('User', userSchema);

export default mongoose.models.User || mongoose.model('User', userSchema);
