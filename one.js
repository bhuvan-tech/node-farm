const http = require('http');

const server = http.createServer((req, res) =>{
    
        //Overview page
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        //respond with output
        res.end("<h2>Name<h2><input type='text' name='name' /><br/> <h2>Phone Number<h2><input type='text' name='number' /></h2> <br/> <input type='submit' name='submit' value='submit' />");
    

})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to server on port 8000');
});