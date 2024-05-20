import fs from 'fs';
import csv from 'csv-parser';

const imageSizesFile = './config/image-sizes.csv';
const imageSizeSettings = require('./image-sizes.json');

export async function getImageSizes() {
  const imageSizesStream = fs.createReadStream(imageSizesFile);
  const imageSizeObject = {};

  const imageSizesStreamRead = new Promise((resolve) => {
    imageSizesStream
      .pipe(csv())
      .on('data', (row) => {
        // Get the value from the PartitionKey (Imate type) Column and make it lowercase (Because of input inconsistencies in the source document)
        const PartitionKey = row.PartitionKey.toLowerCase();
        // Create the data for this row
        const imageRow = {
          folder: row.Folder,
          descriptor: row.Width + 'w',
        };
        // Check if the imagesizeobject has the current image tyoe already, if so add to it, otherwise create it
        if (imageSizeObject[PartitionKey]) {
          imageSizeObject[PartitionKey].push(imageRow);
        } else {
          imageSizeObject[PartitionKey] = [imageRow];
        }
      })
      .on('end', () => {
        resolve(imageSizeObject);
      });
  });
  return await imageSizesStreamRead;
}

export function getProductImageRatio() {
  const productSetting = imageSizeSettings.imageSizes.find(
    (setting) => setting.type === 'product',
  );
  const aspectRatio = productSetting?.aspectRatio || '1:1';
  const [widthRatio, heightRatio] = aspectRatio.split(':');
  return parseInt(heightRatio) / parseInt(widthRatio);
}
