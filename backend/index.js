const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const Stripe = require("stripe")

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }))

const PORT = process.env.PORT || 8080

// console.log(process.env.MONGODB_URL)

/*************************** Here we are connecting mongodb to nodejs *****************/
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("connect to database")
}).catch((err) => {
    console.log(err)
})


app.get('/', (req, res) => {
    res.send('server is starting...')
})

/************************ Here we made Schema and Model for user Signup and login page **************************/

/********** Schema for user signup ***********/
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String
})

/********** Model for user signup ***********/
const userModel = mongoose.model("user", userSchema)

/******** API for signup page ************/
app.post('/signup', async (req, res) => {
    console.log(req.body)
    const { email } = req.body
    const result = await userModel.findOne({ email: email })

    if (result) {
        res.send({ message: "Email is already register", alert: false })
    } else {
        const data = userModel(req.body);
        const save = await data.save();
        res.send({ message: "Sucessfull signup", alert: true })
    }

})

/******** API for login page ************/
app.post('/login', async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body
    const result = await userModel.findOne({ email: email })
    if (result) {

        if (result.password !== password) {
            res.send({ message: 'Enter the correct password', alert: false })
        } else {
            const dataSend = {
                _id: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                image: result.image,
            }
            res.send({ message: "Login is successful", alert: true, data: dataSend })
        }

    } else {
        res.send({ message: "Enter the correct email", alert: false })
    }

})

/************************ Here we made Schema and Model for adding product  **************************/

/********** Schema for adding product in mongodb ***********/

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: String,
    category: String,
    description: String
})

/********** Model for adding product ***********/
const productModel = mongoose.model('product', productSchema)

/*** api for new product and store data into database ****/
app.post('/uploadProduct', async (req, res) => {
    const data = await productModel(req.body);
    const dataSvae = await data.save();
    res.send({ message: 'upload sucessfully' })
})

/********** fetch the products data from database and show on browser **********/
app.get('/productData', async (req, res) => {
    const data = await productModel.find({})
    res.send(JSON.stringify(data));

})




/********************************************** payment getway ***********************************************/
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {

    try {
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [{ shipping_rate: "shr_1NQC2wSGaZqzBN42G9cgIhfK" }],

            line_items: req.body.map((item) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            // images : [item.image]
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.qty
                }
            }),

            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,

        }
        const session = await stripe.checkout.sessions.create(params)
        res.status(200).json(session.id)
    }
    catch (err) {
        res.status(err.statusCode || 500).json(err.message)
    }

})


app.listen(PORT, () => {
    console.log("server is runnig at PORT : " + PORT)
})