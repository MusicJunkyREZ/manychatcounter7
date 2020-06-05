const mongoose = require('mongoose');

const user = new mongoose.Schema({ 
    // Only the important variables utilizing the "Full Subscriber Data" ManyChat variable
    id: {
        type: String
    },
    name: {
        type: String
    },
    last_interaction: {
        type: Date
    },
    last_seen: {
        type: Date
    }

    // The main info ManyChat sends back. The form tests this.
    // id: {
    //     type: String
    // },
    // key: {
    //     type: String
    // },
    // page_id: {
    //     type: String
    // },
    // status: {
    //     type: String
    // },
    // first_name: {
    //     type: String
    // },
    // last_name: {
    //     type: String
    // },
    // name: {
    //     type: String
    // },
    // gender: {
    //     type: String
    // },
    // profile_pic: {
    //     type: String
    // },
    // locale: {
    //     type: String
    // },
    // language: {
    //     type: String
    // },
    // timezone: {
    //     type: String
    // }
})

module.exports = User = mongoose.model('user', user);

// For Postman testing
// {
// 	"id":"myid",
// 	"key":"mykey",
// 	"page_id":"mypageid",
// 	"status":"mystatus",
// 	"first_name":"myfirstname",
// 	"last_name":"mylastname",
// 	"name":"name",
// 	"gender":"mygender",
// 	"profile_pic":"myprofilepic",
// 	"locale":"mylocale",
// 	"language":"language",
// 	"timezone":"mytimezone"
// }
   
// For Postman testing