var express     = require('express');
var app         = require('express')();
var server      = require('http').createServer(app);
var io          = require('socket.io')(server);
var ejs         = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://yogi345:vUPN7zyXQlT4TosK@cluster0-lfgu7.mongodb.net/testper?retryWrites=true&w=majority'
  )

app.set('view engine', 'ejs');


io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
});




server.listen(process.env.PORT || 3000, function(){
    console.log('app running');
});


const FacultySchema ={
    fname:String,
    lname:String,
    subname:String,
    IsRequested:Boolean,
    IsAccepted:Boolean,
    IsSendPaper:Boolean
}
const faculty = mongoose.model("faculty",FacultySchema);

const faculty4 = new faculty({
    fname:"Yogesh",
    lname:"Prajapati",
    subname:"Cloud Computing",
    IsRequested:true
})
var foundFaculty="";
app.get("/",function(req,res){

    faculty.find({},function(err,foundFaculty){
        console.log(foundFaculty);
        res.render("admin",{title:"Hello",getfac:foundFaculty})

    })
 
})
app.post("/",function(req,res){
 
    console.log(n);
  
    res.redirect("admin");
})

app.get("/fac",function(req,res){
    res.render("faculty")
})