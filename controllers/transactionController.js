const Transaction = require('../model/Transaction')
const User=require('../model/User')
const {serverError} = require('../util/error')


module.exports = {
    create(req,res){
        let {amount,note,type} = req.body
        let userId=req.user._id

        let transaction = new Transaction ({
            amount, note, type, author: userId
        })
        transaction.save()
        .then(trans => {
            let updateUser = {...req.user._doc}
            if(type === 'income'){
                updateUser.balance= updateUser.balance + amount
                updateUser.income = updateUser.income + amount

            }else if(type === 'expense'){

                updateUser.balance= updateUser.balance - amount
                updateUser.expense = updateUser.expense + amount

            }
           
            updateUser.transactions.unshift(trans._id)
            User.findByIdAndUpdate(updateUser._id,{$set: updateUser},{new: true})
            
            .then(result=>{
                res.status(201).json({
                    message:'Transaction create Successfully',
                    ...trans._doc,
                    user:result
                })
            })
            .catch(error => serverError(res,error))
           
        })
        .catch(error => serverError(res,error))
    },
    getAll(req,res){
        let {_id} = req.user
        Transaction.find({author: _id})
        .then(transactions =>{
            if(transactions.length === 0){
                res.status(200).json({
                    message: 'No Transaction Found'
                })
            }else {
                res.status(200).json(transactions)
            }
        })
        .catch(error => serverError(res,error))
    },
    getSingleTransact(req,res){
        let {transactionId}= req.params
        Transaction.findById(transactionId)
        .then(transaction =>{
            if(!transaction){
                res.status(200).json({
                    message: 'No Transaction Found'
                })
            }else {
                res.status(200).json(transaction)
            }
        })
        .catch(error => serverError(res,error))
    },
    update(req,res){
        let {transactionId} = req.params
        Transaction.findOneAndUpdate({_id: transactionId},{$set: req.body},{new:true})
        .then(result =>{
            res.status(200).json({
                message: 'Updated Successfully',
                transaction: result
            })
        })
        .catch(error => serverError(res,error))
    },
    remove(req,res){
        let{transactionId}= req.params
        Transaction.findOneAndDelete({_id: transactionId})
        .then(result=>{
            res.status(200).json({
                message: 'Deleted Successfully',
                ...result._doc
            })
        })
        .catch(error => serverError(res,error))
    }
}