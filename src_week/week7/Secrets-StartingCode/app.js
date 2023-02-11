const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`)
});


mongoose.connect(`mongodb+srv://diwwergg:Diwwer54321@cluster0.cgpglgr.mongodb.net/UserDB?retryWrites=true&w=majority`)
mongoose.set('strictQuery', false);

const userSchema = {
    email: String,
    password: String
}
const User = new mongoose.model("User", userSchema);


app.get('/', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/logout', (req, res) => {
    res.redirect('/');
});


app.post("/register", (req, res) => {
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) console.log (err)
        else res.render("secrets")
    })
})


app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}, (err, foundUser) => {
        if (err) console.log(err)
        else {
            if (foundUser) {
                if (foundUser.password === password) res.render("secrets");
            }
        }
    });
});







