const express=require('express')
const mongoose=require('mongoose')
const app=express()
const router=express.Router()
const path=require('path');
const bodyParser = require('body-parser');
const PORT=process.env.PORT||3500;
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'./public')))
app.use(bodyParser.json());

const Student=require('./Student');
main().catch(err => console.log(err.message));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Student');
}

app.post('/submit',(req, res) =>{ 
  const email=Student.find({email:req.body.email})
  if(!email)
  {
    const student=Student.create({
      name:req.body.name,
      age:req.body.age,
      email:req.body.email,
      about:req.body.message,
    })
    res.sendFile(path.join(__dirname,'views','Welcome.html'));
  }
  else{
    res.send("The user already existed")
  }
  
  
})

app.get("/data.html",(req,res)=>{
  res.sendFile(path.join(__dirname,'views','data.html'))
})

app.get("/data", async (request, response) => {
  try {
   const data = await Student.find({_id:"65fff5f8bf10c2f133e03af7"});
    response.json(data);
  } catch (error) {
    response.status(500).send({ error });
  }
});

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/*',(req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})


app.listen(PORT,()=>console.log(`Server running on port${PORT}`));