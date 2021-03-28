import admin from '../middlewares/initFirebase'
const serviceAccount = require('../config/fbServiceAccountKey.json')


 
const changeNameFirebaseAuth = async(req: any, name : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
    
    displayName: name,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeNamePhoneFirebaseAuth = async(req: any, name : string, phone : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
        phoneNumber: phone,

    displayName: name,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}



const changeNamePhoneAccessFirebaseAuth = async(req: any, name : string, phone : string, role: string) => {
 
    admin
  .auth()
  .updateUser(req.body.uid, {
        phoneNumber: phone,

    displayName: name,
   })
  .then((userRecord) => {



                        admin
            .auth()
            .setCustomUserClaims(req.body.uid, {
                role
            })
            .then((b) => {

            })
            .catch((error) => {
                console.log('Error updating user:', error);
            }); 





    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeEmailVerificationStatus = async(uid: any,) => {
 
       admin
  .auth()
  .updateUser(uid, {
    
    emailVerified: true,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });




   
}




const changeNameAccessFirebaseAuth = async(req: any, name : string,  role: string) => {
 
    admin
  .auth()
  .updateUser(req.body.uid, {

    displayName: name,
   })
  .then((userRecord) => {



                        admin
            .auth()
            .setCustomUserClaims(req.body.uid, {
                role
            })
            .then((b) => {

            })
            .catch((error) => {
                console.log('Error updating user:', error);
            }); 





    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}


const changeProfilePicture = async(req: any, imageUrl : string) => {

    admin
  .auth()
  .updateUser(req.body.uid, {
    
    photoURL: imageUrl,
   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}



const createUser = async(req: any, imageUrl : string) => {

    admin
  .auth()
  .createUser( {
    
 email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',   })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully updated user', userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error updating user:', error);
  });


   
}






export default {changeNameFirebaseAuth, changeNamePhoneFirebaseAuth, changeNamePhoneAccessFirebaseAuth, changeNameAccessFirebaseAuth, changeProfilePicture, changeEmailVerificationStatus};