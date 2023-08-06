const express=require("express");
const bodyParser=require("body-parser");
const app=express();

const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});



app.post("/",function(req,res){
    var city=req.body.city;

    https.get('https://api.openweathermap.org/data/2.5/weather?appid=ac6a040d4320f567016ea5f07781b79f&units=metric&q='+city,(res22) =>{
        console.log(res22.statusCode);
        if(res22.statusCode===200){
            res22.on("data",function(data){
                const w=JSON.parse(data);
                const icon=w.weather[0].icon;
                const wetherDes=w.weather[0].description;
                const main=w.weather[0].main;
                const tempp=w.main.temp;
                const feels=w.main.feels_like;
                const humid=w.main.humidity;
                const image="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                console.log( w);
                // res.write("<h1>Weather of "+city+"->"+w.weather[0].description+"</h1>");
                // res.write('<img src="'+image+'">');
                // res.send();
                // res.sendFile(__dirname+"/index.html");
                res.render("final",{m:main ,wd:wetherDes, namecity:city, felltemp:tempp, feel:feels, hum:humid, imagee:image});
            })
        }else{
            res.sendFile(__dirname+"/error.html");
        }
    })

})

app.post("/views/final.ejs", function (req, res) {
    res.redirect("/");
    
})

app.get("/error" , function(req , res){
    res.redirect("/");
})



app.listen(3000,function(){
    console.log("Server is running on port 3000");
})