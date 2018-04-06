const path = require('path');

const uploadPath = () => 
    path.join(process.env.FILESYSTEM_ROOT, process.env.FILESYSTEM_UPLOAD_DIRECTORY);

module.exports = {
    uploadPath: uploadPath
};