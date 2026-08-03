import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination(req,file,cb){

        cb(null,"uploads/products");

    },

    filename(req,file,cb){

        cb(

            null,

            Date.now()+"-"+Math.round(Math.random()*1000)+path.extname(file.originalname)

        );

    }

});

export const upload=multer({

storage,

limits:{

fileSize:5*1024*1024

}

});