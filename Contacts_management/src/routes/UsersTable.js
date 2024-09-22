const functions = require('../Services/functions');
module.exports = (server)=>{

    server.post('/getPassword', async(req,res)=>{
        const {Email,password}=req.body;
        // console.log(Email);
        try{
            const result= await functions.getPassword(Email,password);
            // console.log(result);
            res.status(200);
            res.send(result);
        } catch(error){
            res.status(500);
             res.send({ error: 'Internal Server Error' });
        }
    })

    server.post('/CreateUser', async(req,res)=>{
        const {name,Email,password}=req.body;
        // console.log("hi");
        
        try{
            
            const result= await functions.createUser(name,Email,password);
            // console.log(result);
            if(result){
            res.status(200);
            res.send('Insertion successful');
        }
        else{
            res.status(400);
            res.send('Insertion failed');
        }
        } catch(error){
            res.status(500);
             res.send({ error: 'Internal Server Error' });
        }
    })
}