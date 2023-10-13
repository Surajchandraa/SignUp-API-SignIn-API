const express = require("express");
const bcrypt = require("bcryptjs")
const app = express();
require("./src/config");
const database = require("./src/schema")


const path = require('path');
const port = process.env.port || 5000;
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","homepage.html"));
})

app.get('/sign_up', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.post('/sign_up',async(req,res)=>{

   try{
    console.log(req.body)
    
    
    var data = {
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "phone":req.body.phone
    }

    let insertdata = new database(data);
    let result = await insertdata.save();
    console.log(result)

    res.redirect('signup_sucess.html');
    
}
catch(e){
    res.status(400).send(e)
}
})

app.get("/sign_in",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "signin.html"));
});

app.post("/sign_in",async(req,res)=>{
    try{
    let data = await database.find(
    { phone: req.body.phone });

    if(data.length!=0){
        console.log(data);
        const isPasswordValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (isPasswordValid) {
            res.redirect("signin_sucess.html");
            console.log(isPasswordValid)
          } else {
            res.send("Invalid credentials");
            console.log(isPasswordValid)
          }
        
    }
    else{
        console.log(data)
        res.send("user not found")
    }
    
    
    

}
catch(e){
 res.status(400).send(e);
}
    
})


app.listen(port,()=>{
    console.log("http://localhost:5000")
})