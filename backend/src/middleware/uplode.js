import multer from "multer"
import path from "path";
import {fileURLToPath} from 'url'
import {dirname} from 'path'
// const __filename=fileURLToPath(import.meta.url)
// const dirname=dirname(__filename)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+path.extname(file.originalname))
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const uploade =multer({
  
    storage:storage,
    limits:{fileSize:"5000000"},
     fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|jpg|png|gif/
        const mimType=fileTypes.test(file.mimetype)
        const extname=fileTypes.test(path.extname(file.originalname))

        if(mimType && extname){
            return cb(null ,true)
        }
        cb("give proper files forwate to upload")
     }


}).single("image")


  export default uploade 


