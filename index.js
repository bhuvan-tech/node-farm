const http = require('http');
const url = require('url');
const fs = require('fs')
//slugify third party package which transforms the query to a string
const slugify = require('slugify');

const replaceTemplate = require('./module/replaceTemplate'); 

//reading the files just once at beginning
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const slugs = dataObj.map(ele => slugify(ele.productName, {lower:true}));
// console.log(slugs);

const server = http.createServer((req, res) =>{
    const {query, pathname} = url.parse(req.url, true);
    // console.log(pathname);
    
    if(pathname === '/' || pathname === '/overview'){
        //Overview page
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        //cards array
        const cardsHtml = dataObj.map(ele => replaceTemplate(tempCard, ele)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        //respond with output
        res.end(output);
    }
    else if(pathname === '/product'){
        // console.log(pathname)
        // console.log(query)
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        //Product page
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(output);
    }
    else if (pathname === '/api'){
        //API page
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }
    else{
        //Page not found
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'What-upp!'
        })
        res.end('<h1>Page Not found</h1>');
    }
})
    

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to server on port 8000');
});