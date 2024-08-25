// const mongoose = require ('mongoose');

// const schema = new mongoose.Schema({
//     name : {
//         type : String,
//         default : null
//     },
//     email : {
//         type : String,
//         default : null
//     },
//     password : {
//         type : String,
//         default : null
//     },
//     otp : {
//         type : String,
//         default : null
//     }
// },
// {  
//     timestamps: {
//     createdAt: 'created_at', 
//     updatedAt: 'updated_at' 
//   }
// }
// );
// const users = new mongoose.model('Users', schema);

// module.exports = user


// function promise () {
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(()=>{
//             let success = true 
//             if (success){
//                 resolve("sucessfull")
//             }else{
//                 reject("failure")
//             }
//         },2000)
//     })
//     return promise

// }


function outerfunction (outerVarialble){
    return function
    innerfunction(outerVarialble){
        console.log(outerfunction, "outerfunction")
    }
    
}


outerfunction()


