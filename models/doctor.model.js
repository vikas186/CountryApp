const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
    name : {
    type : String,
    default : null
},
    title : {
    type : String,
    default : null
},
    image : {
    type : String,
    default : null
},
    totalRating : {
    type : String,
    default : null
},
    totalPatients : {
    type : String,
    default : null
},
    content : {
    type : String,
    default : null
},
    longitude : {
    type : String,
    default : null
},
    latitude : {
    type : String,
    default : null
},
},
{  
    timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at' 
  }
}
);

const doctor = new mongoose.model('Doctors', schema);
module.exports = doctor;