import multer from "multer"

//Multer is a tool (a middleware) that helps
// your Node.js + Express website receive files 
// from people — like images, videos, or documents.

const storage = multer.diskStorage({//configuration 
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
})

const upload = multer({storage})

export default upload