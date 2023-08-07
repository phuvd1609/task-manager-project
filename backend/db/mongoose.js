const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:3001/TaskManager', {useNewUrlParse: true}).then(() => {
    console.log("connect to database successfully")
}).catch((e) => {
    console.log("connect database failed")
    console.log(e)
})

// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false)

module.exports = {
    mongoose
}