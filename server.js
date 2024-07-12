import http from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";
import { error } from "console";
// console.log(process.env)
let PORT=8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

const server= http.createServer(async (req,res)=>{
    try{
        let filepath;
        if (req.method=='GET'){
            if (req.url=="/"){
                filepath=path.join(__dirname,'index.html');
            }
            else if (req.url=="/about"){
                filepath=path.join(__dirname,'about.html');

            }
            else if (req.url == '/contact-me'){
                filepath=path.join(__dirname,'contact-me.html');
            }
            else {
                filepath=path.join(__dirname,'404.html');
            }
            console.log(filepath);
            let data= await fs.readFile(filepath);
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();

        }else{
           throw new Error("method not allowed");
        }

    }catch(error){
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.write("server error");
        res.end();
    }

});

server.listen(PORT ,()=>{
    console.log("server running on port",PORT);
})