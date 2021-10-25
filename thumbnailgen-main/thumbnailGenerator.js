
const sharp = require('sharp');

async function generateThumbnail(origimage){
        // set thumbnail width. Resize will set the height automatically to maintain aspect ratio.
        const width  = 200;

        // Use the sharp module to resize the image and save in a buffer.
        try {
            return await sharp(origimage.Body).resize(width).toBuffer();
        } catch (error) {
            console.log(error);
            throw error;
        }
}

module.exports={
    generateThumbnail
}