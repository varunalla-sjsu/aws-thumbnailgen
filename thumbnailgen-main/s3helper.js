const AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function getImageFromS3(bucketId,fileId){
    try {
        const params = {
            Bucket: bucketId,
            Key: fileId
        };
        return await s3.getObject(params).promise();
    } catch (error) {
        console.log(error);
        return;
    }
}
async function saveImageToS3(bucketId,fileId,buffer){
    try {
        const destparams = {
            Bucket: bucketId,
            Key: fileId,
            Body: buffer,
            ContentType: "image"
        };
  
        const putResult = await s3.putObject(destparams).promise();
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
  
}
function validateType(srcFileName){
    // check file suffix
    const typeMatch = srcFileName.match(/\.([^.]*)$/);
    if (!typeMatch) {
        console.log("no file suffix");
        return '';
    }
    // Check that the image type is supported
    const imageType = typeMatch[1].toLowerCase();
    if (imageType != "jpg" && imageType != "png") {
        console.log(`Unsupported image type: ${imageType}`);
        return '';
    }
    return true;
}
module.exports={
    getImageFromS3,
    validateType,
    saveImageToS3
}