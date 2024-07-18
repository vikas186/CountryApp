const DoctorModel = require("../models/doctor.model");


// Create doctor function


exports.createDoctor = async (req, res) => {
  try {
    const file = req.file;

    const { name, content, title, totalRating, totalPatients, longitude, latitude } = req.body;
    

    if (!totalPatients && !title && !content && ! latitude && !longitude && !name && !totalRating) {
      res.status(400).json({ message: "Doctor data fields can not be empty!", statusCode:400 });
    }

    const newDoctor = new DoctorModel({
      image: file.filename,
      title: title,
      content: content,
      name: name,
      longitude: longitude,
      latitude: latitude,
      totalRating: totalRating,
      totalPatients: totalPatients
    });
    
    const savedDoctor = await newDoctor.save();

    res.status(201).json({ message: "Doctor data created successfully!", Doctor: savedDoctor, statusCode:201});
  } catch (err) {res.status(500).json({message: "An error occurred while creating Doctor data", statusCode:500});
  }
};


// Get a Doctor function


exports.getDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);
    res.status(200).json({ message: "Get a Doctor data successfully", doctor, statusCode:200});
  } catch (error) {
    res.status(404).json({message: "An error occurred while getting a Doctor data", statusCode:404});
  }
};


//  Get all Doctor function


exports.getAllDoctors = async (req, res) => {
  try {
const doctors = await DoctorModel.find()
    res.status(200).json({ message: "Get all Doctor list successfully", doctors, statusCode: 200 });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while getting all Doctor data", statusCode: 500 });
  }
};


// Update Doctor function


exports.updateDoctor = async (req, res) => {
    const { id, name, content, title, totalRating, totalPatients, longitude, latitude } = req.body;

    const file = req.file;
  
    try {
      const doctor = await DoctorModel.findOne({ _id: id });
      
      if (!doctor) {
        return res.status(404).json({ message: "Doctor data not found.", statusCode: 404 });
      }
  
      const updateData = {
      image: file.filename,
      title: title,
      content: content,
      name: name,
      longitude: longitude,
      latitude: latitude,
      totalRating: totalRating,
      totalPatients: totalPatients
      };
  
      if (file) {
        updateData.image = file.filename;
      }
  
      const updateDoctor = await DoctorModel.findByIdAndUpdate(id, updateData);
  
      if (!updateDoctor) {
        return res.status(404).json({ message: "Doctor data not found.", statusCode: 404 });
      }
  
      return res.status(200).json({ message: "Doctor data updated successfully.", statusCode: 200 });
    } catch (err) {console.error(err); 
      return res.status(500).json({ message: "An error occurred while updating Doctor data", statusCode: 500 });
    }
  };
  

// Delete Doctor function


exports.destroydoctor = async (req, res) => {
  const { id } = req.body;
  await DoctorModel.findByIdAndRemove(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).json({message: "Doctor data not found.", statusCode:404});
      } else {
        res.status(200).json({ message: "Doctor data updated successfully.", statusCode:200});
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "An error occurred while deleting Doctor data", statusCode:500});
    });
};


