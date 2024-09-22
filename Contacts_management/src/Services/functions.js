const { createContactQuerry, getAllContactsQuerry, updateContactQuerry, CreateUserQuerry , deleteContactQuerry, getContactByIdQuerry, getPasswordQuerry,addProfilePicQuerry,getimageByIdQuerry, deleteProfilePicQuerry } = require('../connections/MySQL/DB_operations');
// const pool = require('../connections/MySQL/connection');
const { appLogger, meteredLogger } = require('../logger/logger');
const {queryExecution} = require('../connections/MySQL/DB_querrys');

// Create a new contact
async function createContact(name, phone, adress, email, place) {
  // const user_id=currentUserQuerry;
  const sql = createContactQuerry; // calling the createContact Querry
  const values = [name, phone, adress, email ];
  // Log when the function starts
  appLogger.info('createContact function started', {
    filename: __filename,
    functionname: 'createContact',
  });
  const startTime = new Date(); // Record the start time
  try {
    const [result] = await queryExecution(sql, values);
    const newContactId = result.insertId; // insertID will give the auto_incremented ID of the newly inserted record
    // Log when the function ends
    appLogger.info('createContact function completed', { filename: __filename,functionname: 'createContact', });
    const endTime = new Date(); // Record the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds
    // Log metered data
    meteredLogger.info('createContact metered log', { filename: __filename, functionname: 'createContact', startDate: startTime.toISOString(), endDate: endTime.toISOString(),duration,});
    return { id: newContactId, name, phone, adress, email, place };
  } catch (error) {
    // console.error('MySQL Error (POST):', error);
    appLogger.error('MySQL Error (POST):', error);
    // Log metered data for errors
    const endTime = new Date();
    const duration = endTime - startTime;
    meteredLogger.error('createContact metered log (error)', {filename: __filename, functionname: 'createContact', startDate: startTime, endDate: endTime, duration, error: error.message, });
    throw error; // Rethrow the error to handle it at the calling level
  }
}

// get a contact by id
async function getContactById(contactId) {
  const sql = getContactByIdQuerry;

  // calling the getContactByIdQuerry
  appLogger.info('getContactById function started', { filename: __filename, functionname: 'getContactById', });
  const startTime = new Date(); // Record the start time
  try {
    // const [rows,fields] = await queryExecution(sql, [contactId]);
    const [rows] = await queryExecution(sql, [contactId]);
    appLogger.info('getContactById function completed', { filename: __filename, functionname: 'getContactById', });
    const endTime = new Date(); // Record the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds
    // Log metered data
    meteredLogger.info('getContactById metered log', { filename: __filename, functionname: 'getContactById', startDate: startTime.toISOString(), endDate: endTime.toISOString(), duration, });
    // return [rows,fields];
    return rows[0];
  } catch (error) {
    // console.error('MySQL Error (GET by ID):', error);
    appLogger.error('MySQL Error (GET by ID):', error); //logging the error

    const endTime = new Date();
    const duration = endTime - startTime;
    meteredLogger.error('getContactById metered log (error)', {filename: __filename, functionname: 'getContactById', startDate: startTime, endDate: endTime, duration, error: error.message,});
    throw error;
  }
}


async function getAllContacts() {
  const sql = getAllContactsQuerry; // calling the getAllContactsQuerry
  appLogger.info('getALLContacts function started', { filename: __filename, functionname: 'getALLContacts', });
  const startTime = new Date(); // Record the start time
  try {
    const [rows] = await queryExecution(sql);

    appLogger.info('getALLContacts function completed', {filename: __filename, functionname: 'getALLContacts', });
    const endTime = new Date(); // Record the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds
    // Log metered data
    meteredLogger.info('getALLContacts metered log', { filename: __filename, functionname: 'getALLContacts', startDate: startTime.toISOString(), endDate: endTime.toISOString(), duration, });
    return rows; // Return the retrieved records
  } catch (error) {
    console.error('MySQL Error (GET):', error);
    // appLogger.error('MySQL Error (GET):', error);
    // Log metered data for errors
    const endTime = new Date();
    const duration = endTime - startTime;
    meteredLogger.error('getALLContacts metered log (error)', { filename: __filename, functionname: 'getALLContacts', startDate: startTime, endDate: endTime, duration, error: error.message, });
    throw error;
  }
}


async function updateContact(contactId, updatedData) {
  const sql = updateContactQuerry; // SQL query to update the contact
  const values = [updatedData.name, updatedData.phone, updatedData.adress, updatedData.email, updatedData.place, contactId];
  appLogger.info('updateContact function started', {
    filename: __filename,
    functionname: 'updateContact',
  });
  const startTime = new Date(); // Record the start time
  try {
    await queryExecution(sql, values);
    appLogger.info('updateContact function completed', { filename: __filename, functionname: 'updateContact', });
    const endTime = new Date(); // Record the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds
    // Log metered data
    meteredLogger.info('updateContact metered log', { filename: __filename, functionname: 'updateContact', startDate: startTime.toISOString(), endDate: endTime.toISOString(), duration,});
    // After updating, retrieve all the contact data and return it
    const updatedContact = await getContactById(contactId); // Implement this function
    return updatedContact;
  } catch (error) {
    // console.error('MySQL Error (PUT):', error);
    appLogger.error('MySQL Error (PUT):', error);
    // Log metered data for errors
    const endTime = new Date();
    const duration = endTime - startTime;
    meteredLogger.error('updateContact metered log (error)', {filename: __filename, functionname: 'updateContact', startDate: startTime, endDate: endTime, duration, error: error.message,});
    throw error; // Rethrow the error to handle it at the calling level
  }
}


async function deleteContact(contactId) {
  const sql = deleteContactQuerry; // SQL query to delete the contact
  appLogger.info('deleteContact function started', { filename: __filename, functionname: 'deleteContact', });
  const startTime = new Date(); // Record the start time
  try {
    await queryExecution(sql, [contactId]);

    appLogger.info('deleteContact function completed', { filename: __filename, functionname: 'deleteContact',});
    const endTime = new Date(); // Record the end time
    const duration = endTime - startTime; // Calculate the duration in milliseconds
    // Log metered data
    meteredLogger.info('deleteContact metered log', { filename: __filename, functionname: 'deleteContact', startDate: startTime.toISOString(), endDate: endTime.toISOString(), duration, });
    const DelContact = await getAllContacts(); // Implement this function
    return DelContact;
  } catch (error) {
    // console.error('MySQL Error (DELETE):', error);
    appLogger.error('MySQL Error (DELETE):', error);
    // Log metered data for errors
    const endTime = new Date();
    const duration = endTime - startTime;
    meteredLogger.error('deleteContact metered log (error)', { filename: __filename, functionname: 'deleteContact', startDate: startTime, endDate: endTime, duration, error: error.message, });
    throw error; // Rethrow the error to handle it at the calling level
  }

  
}
async function getPassword(Email,password){
  const sql=getPasswordQuerry;

  try{
    const [rows]= await queryExecution(sql,[Email]);
    // console.log(rows[0],password);
    if(rows[0].passwords==password){
    // return rows[0];
    // return "success" ;
    return {
      status: "success",
      name: rows[0].user,
    };
  }
  else
  // return "failed";
  return {
    status: "failed"
  };
  }catch(error){
    throw error;
  }

}
async function createUser(name,Email,password){
 
  // const sql=CreateUserQuerry;
  try{
  const sql=CreateUserQuerry ;
  
  const values=[name,Email,password];
 
    
    const [rows]= await queryExecution(sql,values);
    
    // console.log(rows[0],password);
    if (rows.affectedRows === 1) {
      return true; // Insertion successful
    } else {
      return false; // Insertion failed
    }
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}
async function deleteProfilePic(id){
  try{
  const sql=deleteProfilePicQuerry;
  // const values=[id];

    
    const [rows]= await queryExecution(sql,[id]);
    
    // console.log(rows[0],password);
    if (rows.affectedRows === 1) {
      return true; // Insertion successful
    } else {
      return false; // Insertion failed
    }
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}
async function getFileNameFromPath(path) {
  try{
  const parts = path.split("\\");
  return parts[parts.length - 1];
  } catch(error){
    throw error
  }
}

async function addProfilePic(id,path){
  try{
  const sql =addProfilePicQuerry;
  const values=[path,id];
  
    const [rows]= await queryExecution(sql,values);
    
    // console.log(rows[0],password);
    if (rows.affectedRows === 1) {
      return true; // Insertion successful
    } else {
      return false; // Insertion failed
    }
  } catch (error) {
    console.log(error);
    throw error;
    
  }

  
}


async function getimageById(id){
  try{

  const sql=getimageByIdQuerry
  
    const [rows]= await queryExecution(sql,[id]);
    
    // console.log(rows[0],password);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}



module.exports = {
  getimageById,
  getFileNameFromPath,
  deleteProfilePic,
  addProfilePic,
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  getContactById,
  getPassword,
  createUser
};



