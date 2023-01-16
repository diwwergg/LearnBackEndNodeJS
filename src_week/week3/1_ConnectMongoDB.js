
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://diwwergg:<password>@cluster0.cgpglgr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// user name: diwwergg
// password: ZoPT16s0z37He8Ff

// Check connection
client.connect(err => {
    if (err) console.log(err);
    else console.log("Connected to MongoDB");
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

// Create database

// MongoClient.connect(uri, (err, db) => {
//     if (err) console.log(err);
//     let dbo = db.db("Employees");
//     dbo.createCollection("Profile", (err, res) => {
//         if (err) console.log(err);
//         else console.log("Collection created!");
//         db.close();
//     });
//     console.log("Database created!");
//     db.close();
// });


// Profile collection
const setProfile = (name=null, id=null, age=null, hobby = null, study = null) => {
    return {
        name: name,
        id: id,
        age: age,
        hobby: hobby,
        study: study
    };
}

const getProfile = (data) => {
    return {
        name: data.name,
        id: data.id,
        age: data.age,
        hobby: data.hobby,
        study: data.study
    };
}




MongoClient.connect(uri, (err, db) => {
    if (err) console.log(err);
    let dbo = db.db("Employees");


    // // Insert data
    // let myobj1 = { name: 'Thawatchai', id:'6352300197', age: 21, hobby: 'Play game', study: 'Computer Engineering PIM' }; // data to insert
    // dbo.collection("Profile").insertOne(myobj1, (err, res) => {
    //     if (err) console.log(err);
    //     else console.log("1 document inserted");
    //     db.close();
    // });


    // // Insert many data
    // let myobj2 = [
    //     Profile('dew', '6352300198', 21, 'Play game', 'Computer Engineering PIM'),
    //     Profile('james', '6352300199', 21, 'Play game', 'Computer Engineering PIM'),
    //     Profile('fah', '6352300200', 21, 'Play game', 'Computer Engineering PIM'),
    // ]; // data to insert
    // dbo.collection("Profile").insertMany(myobj2, (err, res) => {
    //     if (err) console.log(err);
    //     else console.log("Number of documents inserted: " + res.insertedCount);
    // });

    // // Query one (find one)
    // let query = { name: 'dew' }; // query data
    // dbo.collection("Profile").findOne(query
    //     , (err, result) => {
    //     if (err) console.log(err);
    //     else console.log(result);
    //     let data = setProfile(result);
    //     console.log(data);
    //     db.close();
    // });


    // // Query many (find many)
    // dbo.collection("Profile").find({}).toArray((err, result) => {
    //     if (err) console.log(err);
    //     else {
    //         let data = result.map((item) => {
    //             return setProfile(item);
    //             }
    //         );
    //     }
    //     let data = result.map((item) => {
    //         return setProfile(item);
    //     });
    //     console.log(data);
    //     db.close();
    // });

    // find with condition
    const condition = { name: 'dew' };
    dbo.collection("Profile").find(condition).toArray((err, result) => {
        if (err) console.log(err);
        else console.log(result);
        let data = result.map((item) => {
            return getProfile(item);
        });
        console.log(data);
        db.close();
    });
});
