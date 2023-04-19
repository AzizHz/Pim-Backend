// import multer, {diskStorage} from "multer";
// import {join, dirname} from "path";
// import { fileURLToPath } from "url";
// import { callbackify } from "util";

const { diskStorage } = require('multer');
const multer = require('multer');


const MIME_TYPES = {
"image/jpg":"jpg" , 
"image/jpeg":"jpeg",
"image/png":"png",
};

var upload= multer( {
  storage: diskStorage({
    destination:(req, file, callback)=>
{

  callback(null, "uploads")
},
filename:(req, file, callback) => {
  const name = file.originalname.split("_").join("_");
  const extension = MIME_TYPES[file.mimetype];
  callback(null, name+Date.now() + "." + extension);

},

  }),
  limits: 10 * 1024 * 1024,

}).single("profilePic")

module.exports=upload



    