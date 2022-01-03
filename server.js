const express = require("express");
const newsletter = express();
const bodyParser = require("body-parser");
const {request, response} = require("express");
const https = require("https");
const PORT = 3000;

newsletter.use(bodyParser.urlencoded({extended: true}));
newsletter.use(express.static("public"));

newsletter.get("/", (request, response)=>{
    return response.sendFile(__dirname + '/signup.html');
});

newsletter.post("/" , (request, response)=>{
    console.log(request.body);

    const data = {
        members: [
            {
                email_address: request.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: request.body.name
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us20.api.mailchimp.com/3.0/lists/{$list_id}";
    const options = {
        method: "POST",
        auth: "API_KEY"
    }

    const req = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    });

    req.write(jsonData);
    req.end();
    return response.sendFile(__dirname + '/success.html');
})

newsletter.listen(PORT, (err)=>{
    if(err){
        console.log(err.message);
        return err;
    }
    console.log("Server is listening on PORT", PORT);
})
