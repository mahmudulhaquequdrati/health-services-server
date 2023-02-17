const admin = require("firebase-admin");

require("dotenv").config();

if(admin){
    admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
}


async function verifyToken(req, res, next) {
    try {
      
     if (req?.headers?.authorization) {
       const token = req.headers.authorization.split(" ")[1];
       // console.log(token);
         if (token) {
           const decodedUser = await admin.auth().verifyIdToken(token);
           // sending data to request
   
           req.decodedEmail = decodedUser.email;
        //    console.log(decodedUser.email)
           next();
         }else{
            res.status(403).send("forbbiden");
         }
       
     }else{
        res.status(401).send({"message" : "Unauthorized"})
     }
    } catch (error) {
     console.log(error)
    }
   }

  module.exports = verifyToken;