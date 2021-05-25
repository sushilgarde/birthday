const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sushil_retro_app_anj:sushilgarderetro@cluster0-t8xd6.mongodb.net/retroboard?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});
// mongoose.connect('mongodb://127.0.0.1:27017/retro_test', {useNewUrlParser: true, useCreateIndex: true});

//mongodb://127.0.0.1:27017/retro_test