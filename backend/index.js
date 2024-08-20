const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://dominikadobosz23:h4ayTHmUIyw4M2Eg@cluster0.g4w9hvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get("/", (req, res) => {
    res.send("Express app is running");
});


/*
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
*/
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));
/*
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});
*/
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: "No file uploaded" });
    }
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema dla Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
});

// API do dodawania produktu
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
    });
    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    });
});

// API do usuwania produktu
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
    });
});

//API do edycji produktu
app.put('/editproduct/:id', upload.single('product'), async (req, res) => {
    const productId = req.params.id;
    const { name, category, description, price } = req.body;
    let updatedProduct = {
        name,
        category,
        description,
        price,
    };

    if (req.file) {
        updatedProduct.image = `http://localhost:${port}/images/${req.file.filename}`;
    }

    try {
        await Product.findOneAndUpdate({ id: productId }, updatedProduct);
        res.json({ success: true });
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
  

// API do pobierania wszystkich produktow
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

//Schema dla użytkownika
const User = mongoose.model('User',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const validateSignupData = (name, email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z]+$/;
    const errors = [];
    
    if (!emailRegex.test(email)) {
        errors.push("Invalid email format.");
    }
    if (!nameRegex.test(name)) {
        errors.push("Name can only contain letters.");
    }
    if (password.length < 4) {
        errors.push("Password must be at least 4 characters long.");
    }

    return errors;
}

//endpoint dla user
app.post('/signup', async (req,res)=>{
    const { name, email, password, isAdmin } = req.body;
    const validationErrors = validateSignupData(name, email, password);

    if (validationErrors.length > 0) {
        return res.status(400).json({ success: false, errors: validationErrors });
    }

    let check = await User.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"User with this email already exist."})
    }
    let cart={};
    for(let i=0; i<300; i++){
        cart[i] = 0;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        cartData:cart,
        isAdmin: req.body.isAdmin || false,
    })
    await user.save();
    const data = {
        user:{
            id:user.id,
            isAdmin: user.isAdmin,
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

//endpoint do logowania uzytkownika
app.post('/login',async (req,res)=>{
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, errors: ["Invalid email format."] });
    }

    let user = await User.findOne({email:req.body.email});
    if(user){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (passwordMatch){
            const data = {
                user:{
                    id:user.id,
                    isAdmin: user.isAdmin,
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false, errors:"Wrong Password"});
        }
    } else{
        res.json({success:false, errors: "Wrong Email id"});
    }
})


//middleware do fetchowania uzytkownika
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate using token"})
    } else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error){
            res.status(401).send({errors:"Please authenticate using token"})
        }
    }
}
//ENDOPINT DO CARTDATA  
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("added", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Added" });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post('/removefromcart', fetchUser, async (req,res)=>{
    try {
        console.log("removed", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        if(userData.cartData[req.body.itemId] > 0)
            userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.json({ success: true, message: "Removed" });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

app.post('/getcart', fetchUser, async (req, res)=>{
    console.log("GET CART")
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) {
        console.log("SERVER RUNNING ON PORT " + port);
    } else {
        console.log("ERROR " + error);
    }
});
