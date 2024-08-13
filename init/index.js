const mongoose = require("mongoose");
const Listing = require("../Models/Listing.js");
const initData = require("./data.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main(){{
    await mongoose.connect(MONGO_URL);
}}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"66af9dbcfcb04b3260e7b9db",geometry: { type: 'Point', coordinates: [ 79.0821, 21.1498 ] },}))
    await Listing.insertMany(initData.data);
    console.log("Data was intialized");
}

initDB();