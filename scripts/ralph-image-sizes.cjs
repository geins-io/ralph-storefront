const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

process.on('exit', (code) => {
  if (code === 0) {
    console.log(
      chalk.green(
        '✔ ' +
          chalk.bold.yellow('./config/image-sizes.csv') +
          ' has been sucessfully generated! :)\n',
      ),
    );
  }
});

// Input settings
const settings = require('../config/image-sizes.json');

// Function to calculate height based on aspect ratio and width
function calculateHeight(aspectRatio, width) {
  const [widthRatio, heightRatio] = aspectRatio.split(':');
  return Math.round((width / parseInt(widthRatio)) * parseInt(heightRatio));
}

// Function to generate CSV data for each image size
function generateCSVData(imageSize) {
  const {
    type,
    aspectRatio,
    startWidth,
    endWidth,
    resizeFunction,
    incrementStep,
  } = imageSize;

  const rows = [];

  // Generate CSV rows
  for (let width = startWidth; width <= endWidth; width += incrementStep) {
    let useType = type === 'cms' ? 'pagewidget' : type;
    useType = useType === 'category' ? 'categoryheader' : useType;
    const height = aspectRatio ? calculateHeight(aspectRatio, width) : 0;
    const folder = `${width}${resizeFunction}${height === 0 ? '' : height}`;
    const timestamp = new Date().toISOString();

    let imageTypeId;

    switch (useType) {
      case 'product':
        imageTypeId = 3;
        break;
      case 'pagewidget':
        imageTypeId = 26;
        break;
      case 'categoryheader':
        imageTypeId = 14;
        break;
      case 'brand':
        imageTypeId = 2;
        break;
      default:
        imageTypeId = 1;
    }

    rows.push({
      PartitionKey: useType,
      RowKey: `${useType}.${folder}`,
      Timestamp: timestamp,
      Folder: folder,
      Foldertype: 'Edm.String',
      Height: height,
      Heighttype: 'Edm.Int32',
      ImageTypeId: imageTypeId,
      ImageTypeIdtype: 'Edm.Int32',
      Jpg: false,
      Jpgtype: 'Edm.Boolean',
      Quality: 80,
      Qualitytype: 'Edm.Int32',
      Webp: false,
      Webptype: 'Edm.Boolean',
      Width: width,
      Widthtype: 'Edm.Int32',
    });
  }

  return rows;
}

// Function to convert data to CSV format
function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((row) => Object.values(row).join(','));
  return `${headers}\n${rows.join('\n')}`;
}

// Generate CSV data for each image size
const csvData = settings.imageSizes.flatMap((imageSize) =>
  generateCSVData(imageSize),
);

// Convert data to CSV format
const csvContent = convertToCSV(csvData);

// Output file path
const outputFilePath = path.join(__dirname, '..', 'config', 'image-sizes.csv');

// Write CSV content to file
fs.writeFileSync(outputFilePath, csvContent, 'utf8');
