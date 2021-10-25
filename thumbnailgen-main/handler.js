'use strict';
const util = require('util');
const {getImageFromS3,validateType,saveImageToS3} = require('./s3helper');
const {generateThumbnail}=require('./thumbnailGenerator');

module.exports.hello =  async (event,context,callback) => {
  console.log("Record File Event:\n", util.inspect(event, {depth: 5}));
  const srcBucketName = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcFileName    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  const dstBucketName = srcBucketName + "-thumbnails";
  const dstFileName    = srcFileName;
  try{

      //check if image
      if(validateType(srcFileName)){
          // get the image for thumbnail generation
          
          let origimage=await getImageFromS3(srcBucketName,srcFileName);
          console.log(origimage);
          let resizedImage =await generateThumbnail(origimage) ;
          console.log(Buffer.byteLength(resizedImage));
          saveImageToS3(dstBucketName,dstFileName,resizedImage);

  console.log('Generted Thumbnail for' + srcBucketName + '/' + srcFileName +
  ' and uploaded to ' + dstBucketName + '/' + dstFileName);
      }
      else{
          console.log(`${srcFileName} not picked up for thumbnail generation`);
      }
  }
  catch(Err){
        console.log(Err);
        return;
  }          
};