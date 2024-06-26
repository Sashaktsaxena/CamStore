import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose";
import ejs from "ejs";
import axios from "axios"
import {fileURLToPath} from "url"
import { dirname,join } from "path";
import cors from "cors"
import passport from "passport"
import passportlocalmongoose from "passport-local-mongoose"
import session from "express-session";
import { log } from "console";
import findOrCreate from 'mongoose-findorcreate'
import { kStringMaxLength } from "buffer";

const saltround=10;
const app=express();


const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(session({
//     secret:"Our little secret.",
//     resave:false,
//     saveUninitialized:false
// }));

app.use(passport.initialize());
//app.use(passport.session());
app.use(session({
    secret: "YourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 604800000 // Session expiration time in milliseconds (e.g., 7 days)
    }
}));

app.set('view engine','ejs');

  


app.use(express.static("public"));

// Enable CORS

mongoose.connect("mongodb://127.0.0.1/camDB")

// const userSchema={
//     name:String,
//     email:String,
//     password:String
    
// }
const camSchema=({
    name:String,
    price:Number,
    img:String,
    brand:String,
    desc:String,
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand', // Reference to the Brand model
        required: true,
        default: function () {
          return new mongoose.Types.ObjectId();
        }
    }
});
const brandSchema={
    brands:{type:String,unique:true},
    image:{type:String}
}

const cartSchema={
    id:String,
    images:String,
    names:String,
    price:Number,
    quantity:Number
}
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    username: { type: String, unique: true }
});
userSchema.plugin(passportlocalmongoose);
userSchema.plugin(findOrCreate)



const Users = new mongoose.model("Users", userSchema);
passport.use(Users.createStrategy());
const Items=mongoose.model("Items",camSchema);
const Brand=mongoose.model("brand",brandSchema);
const Cart=mongoose.model("cart",cartSchema);
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
   
//   passport.deserializeUser(function(users, done) {
//     done(null, users);
//   });
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});
//passport.use(new LocalStrategy(Users.authenticate()));

// app.post("/api/user/register", async (req, res) => {
//     const { emailID, name, pass } = req.body;

//     try {
//         const user = new Users({ username: emailID, name: name });
//         await Users.register(user, pass);

//         passport.authenticate("local", (err, user, info) => {
//             if (err) {
//                 console.error("Authentication error:", err);
//                 return res.redirect("http://localhost:3000/register");
//             }
//             if (!user) {
//                 console.error("User not authenticated");
//                 return res.redirect("http://localhost:3000/register");
//             }

//             req.login(user, (loginErr) => {
//                 if (loginErr) {
//                     console.error("Login error:", loginErr);
//                     return res.redirect("http://localhost:3000/register");
//                 }

//                 console.log("Redirecting to the home page");
//                 res.redirect("http://localhost:3000");
//             });
//         })(req, res);
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.redirect("http://localhost:3000/register");
//     }
// });
app.post("/api/user/register", function (req, res) {
    Users.register({ username: req.body.emailID, name: req.body.name }, req.body.pass, function (err, user) {
        if (err) {
            console.error("Registration error:", err);
            return res.status(500).send("Registration failed");
        }

        // If registration succeeds, authenticate the user
        passport.authenticate("local")(req, res, function () {
            console.log("User authenticated");
            res.status(200).send("User registered and authenticated");
        });
    });
});


// app.post("/api/user/register", function (req, res) {
//     // const { emailID, name, pass } = req.body;

//     Users.register({ username: req.body.emailID, name: req.body.name }, req.body.pass, function (err, user) {
        
//         if (err) {
//             console.error("Registration error:", err);
//             res.redirect("http://localhost:3000/register/");
//         }
//         else{
//         res.sendStatus(200);
//         console.log("hello");
        
//         passport.authenticate("local")(req, res, function () {
            
//             console.log("Redirecting to the home page");
//             // res.redirect("http://localhost:3000/");
//             // console.log(req.session); // Log the session information

            
        
//         });
//     }
//     });
// });


app.get("/sell",(req,res)=>{
    res.render("sell.ejs",{message:"Welcome to Camstore.",desc:"Provide us with the details of your product"})
});
app.get("/getbrands",async(req,res)=>{//get request api
    try{
        const allItem=await Brand.find({});
        res.send({status:"ok",data:allItem})
    }catch(error){
        console.log(error);
    }
})
app.get("/getallproducts",async(req,res)=>{
    try{
        const allProduct=await Items.find({});
        res.send({status:"ok",data:allProduct})
    }catch(error){
        console.log(error);
    }
})
app.get("/getproducts",async(req,res)=>{
    try{
        const allProduct=await Items.find({});
        res.json(allProduct);
    }catch(error){
        console.log(error);
    }
})

app.get("/getproducts/:brand",async(req,res)=>{
    try{
        const com=req.params.brand;
        const products=await Items.find({brand:com});
        res.json(products);
    }catch(error){
        console.log(error);
    }
})
app.get("/getidproducts/:id",async(req,res)=>{
    try{
        const com=req.params.id;
        const products=await Items.find({_id:com});
        res.json(products);
    }catch(error){
        console.log(error);
    }
})
// app.post("http://localhost:3001/addToCart",async(req,res)=>{
//     const cart=new Cart({
//         id:req.body.id,
//         images:req.body.img,
//         name:req.body.name,
//         price:req.body.cost,
//         quantity:req.body.size
//     });
//     cart.save()
//     .then(()=>{
//         console.log("Cart updated")
//     })
//     .catch((error)=>{
//         console.log(error);
//     })
// })
// app.post("/addToCart", async (req, res) => {
//     try {
//       const cartItem = new Cart({
//         id: req.body.id,
//         images: req.body.images,
//         names: req.body.names,
//         price: req.body.price,
//         quantity: req.body.quantity,
//       });
  
//       const savedCartItem = await cartItem.save();
//       console.log("Item added to cart successfully:", savedCartItem);
//       res.sendStatus(200);
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  // app.js

// ... other imports ...

app.post("/addToCart", async (req, res) => {
    const { id, images, names, price, quantity } = req.body;

    try {
        // Check if the product with the given ID already exists in the cart
        const existingCartItem = await Cart.findOne({ id });

        if (existingCartItem) {
            // If it exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            console.log("Quantity updated in cart:", existingCartItem);
        } else {
            // If it doesn't exist, create a new cart item
            const newCartItem = new Cart({
                id,
                images,
                names,
                price,
                quantity,
            });
            await newCartItem.save();
            console.log("Item added to cart:", newCartItem);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

  app.get("/getCartItems", async (req, res) => {
    try {
      const cartItems = await Cart.find({});
      res.json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.patch("/updateCartItem/:id", async (req, res) => {
    const { id } = req.params;
    const { increaseBy } = req.body;
  
    try {
      const cartItem = await Cart.findById(id);
      if (!cartItem) {
        return res.status(404).send("Cart item not found");
      }
  
      cartItem.quantity += increaseBy;
      await cartItem.save();
  
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.delete("/deleteCartItem/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        const cartItem=await Cart.findByIdAndDelete(id);
        if(!cartItem){
            return res.status(404).send("cart item not found");
        }
        res.status(200);


    }catch(error){
        console.error("not able to delete ");
        res.status(500);
    }
  })

    // Save the cart item to the database


app.post("/sell",(req,res)=>{
    const brand=new Brand({
        brands:req.body.brand,
        image:req.body.file
    })
    const cam=new Items({
        name:req.body.nameitem,
        price:req.body.price,
        brand:req.body.brand,
        img:req.body.file,
        desc:req.body.decsr,
        brandId: brand._id
    });

    cam.save()
    .then(()=>{
        console.log("Item succesfully saved");
        res.redirect("http://localhost:3000/")
        
    })
    .catch((error)=>{
        console.log(error);
    })
    brand.save()
    .then(()=>{
        console.log("brand saved succesfuly")
    })
    .catch((error)=>{
        console.log(error);
    })
    
    
})
app.post("http://localhost:3001/addToCart")

app.listen(3001,function(){
    console.log("Server started at port 3001")
});