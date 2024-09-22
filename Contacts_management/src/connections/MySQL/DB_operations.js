const {connection} = require('./connection');

module.exports={
   createContactQuerry:'INSERT INTO contacts (c_name, phone, address, email, place) VALUES (?, ?, ?, ?, ?)',
   getAllContactsQuerry : 'SELECT * FROM contacts',
   updateContactQuerry : 'UPDATE contacts SET c_name = ?, phone = ?, address = ?, email = ?, place = ? WHERE id = ?',
   deleteContactQuerry : 'DELETE FROM contacts WHERE id = ?',
   getContactByIdQuerry : 'select * from  contacts where id=?',
   getPasswordQuerry : 'select * from users where email=?',
   CreateUserQuerry : 'INSERT into users (user,email,passwords) values (?,?,?) ',
   addProfilePicQuerry:'insert into profile_pics(image_path,id) values(?,?)',
   getimageByIdQuerry: 'select image_path from profile_pics where id=?',
   deleteProfilePicQuerry:'delete from profile_pics where id=?',


   // validateUserQuerry :'select * from users where email=?'

};

