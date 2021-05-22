const mongoose = require("mongoose")
const url=process.env.DATA_STRING;
console.log(url);
 mongoose.connect("mongodb+srv://shoppy123:shoppy123@cluster0.hi6if.mongodb.net/sample_analytics?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {


  if (!err) {
    console.log("connection to database was successfull----");
  } else {
    console.log(err);
  }

})
module.exports = mongoose;