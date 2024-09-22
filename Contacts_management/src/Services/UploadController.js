const mv = require('mv');
const path = require('path');

class UploadController {
  constructor(image) {
    this._image = image;
  }

  async upload() {
    // Split the image name and get the extension
    const name = this._image.name;
    const extension = path.extname(name);

    // Define the destination path inside your Angular project's assets folder
    const destinationPath = path.join(
      'C:/Users/JeswinWilson/Desktop/Base_project/src/assets',
      'uploads'
    );

    // Create a unique filename 
    const newFileName = `${new Date().getTime()}${extension}`;

    // Construct the full path to the destination
    const newFilePath = path.join(destinationPath, newFileName);

    // Move the uploaded image to the new destination
    return new Promise((resolve, reject) => {
      mv(this._image.path, newFilePath, { mkdirp: true }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // Resolve with the path where the image was uploaded
          resolve(newFilePath);
        }
      });
    });
  }
}

module.exports = UploadController;

