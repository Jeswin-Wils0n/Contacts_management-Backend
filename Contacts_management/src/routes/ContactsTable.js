const functions = require('../Services/functions');
const UploadController = require('../Services/UploadController');
const { appLogger, meteredLogger } = require('../logger/logger');

module.exports = (server) => {

  server.post('/createcontact', async (req, res) => {
    const { name, phone, adress, email, place } = req.body;
    appLogger.info('createcontact -started', {
      filename: __filename,
      functionname: 'createcontact',
    });
    const startTime = new Date(); // Record the start time
    try {
      const newContact = await functions.createContact(name, phone, adress, email, place); // calling createContact()
      // console.log('New contact created:', newContact);
      appLogger.info('createcontact completed', {
        filename: __filename,
        functionname: 'createcontact',
      });
      const endTime = new Date(); // Record the end time
      const duration = endTime - startTime; // Calculate the duration in milliseconds
      // Log metered data
      meteredLogger.info('createcontact metered log', {
        filename: __filename,
        functionname: 'createcontact',
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        duration,
      });
      res.status(201); // success status code
      res.send(newContact);
    } catch (error) {
      //   console.error('Error creating contact:', error.message);
      appLogger.error('createcontact- Error creating contact:', error); //logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('createcontact metered log (error)', {
        filename: __filename,
        functionname: 'createcontact',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
      res.status(500); //  Error status code
      res.send({ error: 'Internal Server Error' });
    }
  });



  // to get all contacts
  server.get('/getALLContacts', async (req, res,) => {
    appLogger.info('GET api for retreiving all contacts -started', {
      filename: __filename,
      functionname: 'getALLContacts',
    });
    const startTime = new Date(); // Record the start time
    try {
      const contacts = await functions.getAllContacts();  // Calling getALLContacts()
      appLogger.info('getALLContacts completed', {
        filename: __filename,
        functionname: 'getALLContacts',
      });
      const endTime = new Date(); // Record the end time
      const duration = endTime - startTime; // Calculate the duration in milliseconds
      // Log metered data
      meteredLogger.info('getALLContacts metered log', {
        filename: __filename,
        functionname: 'getALLContacts',
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        duration,
      });
      res.status(200);
      res.send(contacts);
      // next();
    } catch (error) {
      // console.error('Error retrieving contacts:', error.message);
      appLogger.error('getALLContacts- Error retreiving contacts:', error); //logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('getALLContacts metered log (error)', {
        filename: __filename,
        functionname: 'getALLContacts',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
      // res.status(500);
      res.send(500, { error: 'Internal Server Error' });
    }
    // return next();
  });



  // To retreive a record by id
  server.post('/getcontactbyID', async (req, res) => {
    const { id } = req.body; // Extract the ID from the request body
    appLogger.info('getcontactbyID -started', {
      filename: __filename,
      functionname: 'getcontactbyID',
    });
    const startTime = new Date(); // Record the start time
    try {
      const contactById = await functions.getContactById(id); // Pass the ID to the function
      appLogger.info('getcontactbyID completed', {
        filename: __filename,
        functionname: 'getcontactsbyID',
      });
      const endTime = new Date(); // Record the end time
      const duration = endTime - startTime; // Calculate the duration in milliseconds
      // Log metered data
      meteredLogger.info('getcontactbyID metered log', {
        filename: __filename,
        functionname: 'getcontactbyID',
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        duration,
      });
      res.status(200);
      res.send(contactById);
    } catch (error) {
      // console.error('Error getting contact by id:', error.message);
      appLogger.error('getcontactbyID- Error retrieving contacts:', error); // Logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('getcontactbyID metered log (error)', {
        filename: __filename,
        functionname: 'getcontactsbyID',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
      res.status(500);
      res.send({ error: 'Internal Server Error' });
    }
  });



  server.post('/updatecontacts', async (req, res) => {
    appLogger.info('updatecontacts - started', {
      filename: __filename,
      functionname: 'updatecontacts',
    });
    const startTime = new Date(); // Record the start time
    try {
      const contactId = req.body.id; // Retrieve the contact ID from the request body
      const updatedContactData = req.body.updatedData; // Retrieve the updated contact data from the request body
      const updatedContact = await functions.updateContact(contactId, updatedContactData); // Calling the updateContact function
      appLogger.info('updatecontacts completed', {
        filename: __filename,
        functionname: 'updatecontacts',
      });
      const endTime = new Date(); // Record the end time
      const duration = endTime - startTime; // Calculate the duration in milliseconds
      // Log metered data
      meteredLogger.info('updatecontacts metered log', {
        filename: __filename,
        functionname: 'updatecontacts',
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        duration,
      });
      res.send(200, updatedContact); // Sending the success code with the updated contact data
    } catch (error) {
      // console.error('updatecontacts- Error updating contact:', error.message);
      appLogger.error('updatecontacts- Error updating contacts:', error); // Logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('updatecontacts metered log (error)', {
        filename: __filename,
        functionname: 'updatecontacts',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
      res.send(500, { error: 'Internal Server Error' });
    }
  });



  server.post('/deleteById', async (req, res) => {
    // const { id } = req.body; // Extract the ID from the request body
    appLogger.info('deleteById -started', {
      filename: __filename,
      functionname: 'deleteById',
    });
    const startTime = new Date(); // Record the start time
    try {
      const contactId = req.body.id;
      const deleted = await functions.deleteContact(contactId); // Calling the deleteContact function
      appLogger.info('deleteById completed', {
        filename: __filename,
        functionname: 'deleteById',
      });
      const endTime = new Date(); // Record the end time
      const duration = endTime - startTime; // Calculate the duration in milliseconds
      // Log metered data
      meteredLogger.info('deleteById metered log', {
        filename: __filename,
        functionname: 'deleteById',
        startDate: startTime.toISOString(),
        endDate: endTime.toISOString(),
        duration,
      });
      res.send(204, deleted);
    } catch (error) {
      // console.error('Error deleting contact:', error.message);
      appLogger.error('deleteById- Error updating contacts:', error); // Logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('deleteById metered log (error)', {
        filename: __filename,
        functionname: 'deleteById',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
      res.send(500, { error: 'Internal Server Error' });
    }
  });



  server.post('/upload', async (req, res) => {
    appLogger.info('deleteById -started', {
      filename: __filename,
      functionname: 'deleteById',
    });
    const startTime = new Date(); // Record the start time
    // try {
    const { image } = req.files;
    const id = req.body.id;
    // console.log(id,"hi");
    if (typeof req.files.image === 'object') {
      try {
        const result = await new UploadController(image).upload();
        const path = await functions.getFileNameFromPath(result);
        functions.deleteProfilePic(id);
        console.log(path);
        functions.addProfilePic(id, path)
        appLogger.info('deleteById completed', {
          filename: __filename,
          functionname: 'deleteById',
        });
        const endTime = new Date(); // Record the end time
        const duration = endTime - startTime; // Calculate the duration in milliseconds
        // Log metered data
        meteredLogger.info('deleteById metered log', {
          filename: __filename,
          functionname: 'deleteById',
          startDate: startTime.toISOString(),
          endDate: endTime.toISOString(),
          duration,
        });
        res.status(200);
        res.json({
          success: true,
          error_code: null,
          message: "Successfully upload image!",
          data: result
        });
      } catch (exception) {
        appLogger.error('deleteById- Error updating contacts:', error); // Logging the error
      const endTime = new Date();
      const duration = endTime - startTime;
      meteredLogger.error('deleteById metered log (error)', {
        filename: __filename,
        functionname: 'deleteById',
        startDate: startTime,
        endDate: endTime,
        duration,
        error: error.message,
      });
        res.status(500);
        res.json({
          success: false,
          error_code: "5",
          message: exception.message,
          data: null
        });
      }
    } else {
      res.status(400);
      res.json({
        success: false,
        error_code: "3",
        message: "Invalid image or ID!",
        data: null
      });
    }
  });



  server.post('/getimagebyID', async (req, res) => {
    const { id } = req.body;
    try {
      const imageById = await functions.getimageById(id);
      res.status(200);
      res.send(imageById);
      console.log("i", imageById);
    } catch (error) {
      // console.error('Error getting contact by id:', error.message);
      res.status(500);
      res.send({ error: 'Internal Server Error' });
    }
  });


};