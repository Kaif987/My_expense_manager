const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }, 
    {timestamps: true}
)

userSchema.statics.login = async function (email, password){
    
    if(!email || !password) {
        throw Error("All the fields must be filled")
    }

    const exists = await this.findOne( {email} )
    
    if(exists){
        return exists
    }

    const user = await this.create({email, password})

    return user
}

module.exports = mongoose.model("User", userSchema)