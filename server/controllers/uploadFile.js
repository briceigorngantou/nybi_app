const { bucket, storage } = require('../firebase/firebase.js');
const logger = require('../utils/logger.js');
const { responseBody } = require('../utils/shared.js');
const { sequelize } = require('../models/index.js');
const { typeImage } = require('../utils/shared.js');

const Image = sequelize.models.images;

const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const { imageType, postId } = req.body;

    if (!file) {
      logger.error('No file uploaded');
      responseBody(null, 'No file uploaded', res, 400);
    } else if (
      imageType === typeImage.post ||
      imageType === typeImage.profile
    ) {
      const destinationPath = `uploads/${imageType}/${file.originalname}`;
      const stream = storage
        .bucket(bucket.name)
        .file(destinationPath)
        .createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        });

      stream.on('error', (err) => {
        logger.error(err);
        responseBody(null, `Error uploading file. ${err}`, res, 500);
      });

      stream.on('finish', async () => {
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/uploads%2F${imageType}%2F${file.originalname}?alt=media`;
        const dataImage = {
          fileName: file.originalname,
          path: url,
          typeImage: imageType
        };
        if (postId && imageType === typeImage.post) {
          dataImage.post_id = postId;
        }
        const imageSaved = await Image.create(dataImage);
        if (imageSaved) {
          responseBody(
            { message: 'File uploaded successfully', url },
            null,
            res,
            200
          );
        } else responseBody(null, 'Error uploading file', res, 500);
      });
      stream.end(file.buffer);
    } else {
      logger.error('Incorrect type of image');
      responseBody(null, 'Incorrect type of image', res, 400);
    }
  } catch (error) {
    logger.error('Error uploading file:', error);
    responseBody(null, `Server error : ${error}`, res, 500);
  }
};

module.exports = uploadFile;
