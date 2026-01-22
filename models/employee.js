import mongoose from "mongoose";

const EMSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },                                  
  position: { type: String, required: true },
  salary: { type: String },           
  hireDate: {type: Date,required: true,},
  status: { type: String },
  email: {
  type: String,
  required: true,
  lowercase: true,  
  match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email address",
  ],
},

});

const EMS =
  mongoose.models.EMS || mongoose.model("EMS", EMSchema);

export default EMS;
