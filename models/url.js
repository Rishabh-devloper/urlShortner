const mongoose= require("mongoose")

mongoose.connect("mongodb://localhost:27017/urlShortner").then(()=>console.log("mongob connected"))
    

const urlSchema = mongoose.Schema({
    shortId:{
        type :String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type:String                                                                                                                                 ,
        required: true
    },
    visitHistory: [{ timeStamp :{
        type: Number ,

    } }]

},{timeStamp : true}
)

const URL = mongoose.model("url", urlSchema)

module.exports = URL