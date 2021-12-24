const express = require("express");
const newsletter = express();
const bodyParser = require("body-parser");
const {request, response} = require("express");
const PORT = 3000;

newsletter.use(bodyParser.urlencoded({extended: true}));

newsletter.get("/", (request, response)=>{
    return response.send(request.body);
});

newsletter.post("/singup" , (request, response)=>{
    return response.redirect("/");
})

newsletter.listen(PORT, (err)=>{
    if(err){
        console.log(err.message);
        return err;
    }
    console.log("Server is listening on PORT", PORT);
})
