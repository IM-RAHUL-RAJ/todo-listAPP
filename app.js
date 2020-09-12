

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser:true});

const itemsSchema =new mongoose.Schema({
  listItem:String
})

// const insertItem=function (db,callback) {
//   const collection = db.collection('lists');
//   }
const Item=mongoose.model("Item",itemsSchema);



// defaultItems.forEach(function(item){
  
// })
// const item1 =new Item({
//   listItem:'Todays LIST'
// })
// const item2 =new Item({
//   listItem:'study'
// })
// const item3 =new Item({
//   listItem:'cooking'
// })
const defaultItems =[]; 

// Item.insertMany(defaultItems,function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("success");
//   }
// })

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {

  const day = date.getDate();

  // res.render("list", {listTitle: day, newListItems: defaultItems}); 

  Item.find({},function(err,founditems){
    // if(founditems.length==0){
    //   Item.insertMany(defaultItems,function(err){
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log("successfully inserted");
    //     }
    //   })
    //   res.redirect("/");
    // }
    // else{
      res.render("list",{listTitle:day,newListItems:founditems});
      res.redirect("/");
    // }
  })



});

app.post("/", function(req, res){

  const name = req.body.newItem;
  const item =new Item({
    listItem:name
  });
  

  if(name!=''){

    if(req.body.hasOwnProperty("submit")) {
      if (name!=''){
      defaultItems.push(name);
      console.log("button preseed");
      item.save();
      res.redirect("/"); 
      
    }
  }
}
  
   //save in the table
 

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
