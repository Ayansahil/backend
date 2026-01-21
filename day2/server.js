const express= require("express");
const app= express()

app.get('/',(req,res)=>{
    res.send("Hello world 1")
})


app.get("/about",function(req,res){
    res.send("This is About Page")
})


app.get('/home',(req,res)=>{
    res.send("This is Home Page")
})

app.listen(3000)