const express = require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')
const cors = require('cors')
const bodyParser=require('body-parser')
const passport=require('passport')



const app=express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', require('./routers/userRoute'))
app.use('/api/transactions',require('./routers/transactionRoutes'))

app.get('/', (req,res) => {
    res.json({
        message: 'Welcome To our Aplication'
    })
})

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    mongoose.connect('mongodb://localhost:27017/final-management',
    { useNewUrlParser: true },
    
    () => {
        console.log('Database Connected........')
    })
})