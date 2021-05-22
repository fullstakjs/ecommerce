const mongoose = require("mongoose")
const url=process.env.DATA_STRING;
console.log(url);
 mongoose.connect(url, {
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