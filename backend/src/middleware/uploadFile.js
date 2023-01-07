import { createRequire } from "module";
import { getValidFileToUpload } from "../helper/pathfilename.js";
const require = createRequire(import.meta.url);
const multer = require('multer');
const mkdir = require('mkdirp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        mkdir('./public/uploads/imgages').then(made=>{
            cb(null, './public/uploads/imgages');
        })
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
})
   
const upload = multer({ storage: storage });

export default  upload;

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

// export default upload;
