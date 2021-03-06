const express = require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')
const cors = require('cors')
const bodyParser=require('body-parser')
const passport=require('passport')
const path =require('path')



const app=express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', require('./routers/userRoute'))
app.use('/api/transactions',require('./routers/transactionRoutes'))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))

    })

}

app.get('/', (req,res) => {
    res.json({
        message: 'Welcome To our Aplication'
    })
})

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    mongoose.connect(`mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0-nhp0s.mongodb.net/test`,
    { useNewUrlParser: true },
    
    () => {
        console.log('Database Connected........')
    })
})
