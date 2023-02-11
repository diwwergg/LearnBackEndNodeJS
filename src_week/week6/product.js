const express = require('express');
const app = express();
const bodyParser = require ('body-parser');

class Product {
  constructor(image, name, price, description) {
    this.image = image;
    this.name = name;
    this.price = price;
    this.description = description;
  }
}
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const nullProduct = new Product('', '', '', '');
const product1 = new Product('https://truecoffee.truecorp.co.th/cache/large/product/323/m3WNdnqdj9crdpHpgcTqumtCdgfhhhdDeKgCnnI5.jpeg',
    'Choco Latte', '90 Bath', 'This is the first product.');
const product2 = new Product('https://truecoffee.truecorp.co.th/cache/large/product/324/h4KK5hUCd7VbFkku2u4RbkZO9TeXpxAQArZbN2h1.jpeg',
    'Thai Tea Latte','90 Bath',  'This is the second product.');
const product3 = new Product('https://truecoffee.truecorp.co.th/cache/large/product/325/FxEv6T314rTivcjbRCPuySboQvYqerxqRwMYtRkl.jpeg', 
    'Matcha Latte', '110 THB', 'This is the third product.');



let productShow = nullProduct ;
app.get('/', (req, res) => {
    productShow = nullProduct;
    res.render('product' , { product: productShow });
});
app.get('/product1', (req, res) => {
    productShow = product1;
    res.render('product', { product: productShow });
});

app.get('/product2', (req, res) => {
    productShow = product2;
    res.render('product', { product: productShow });
});

app.get('/product3', (req, res) => {
    productShow = product3;
    res.render('product', { product: productShow });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
