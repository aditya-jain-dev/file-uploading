const File = require('../modals/File');
const cloudinary = require('cloudinary').v2;

// localFileUpload -> handler function
exports.localFileUpload = async (req, res) =>  {
  try {
    const file = req.files.file;
    // console.log("file", file);

    // server path -> inside controller folder
    let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
    // console.log("dirname", path)

    file.mv(path, (err) => {
      if(err) {
        console.log(err);
      };
    })

    res.status(200).json({
      success: true,
      message: 'Local file uploaded successfully'
    })
  } catch (error) {
    console.log("Not able to upload local file");
    console.error(error);
  }
}

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {folder};
  options.resource_type = 'auto'

  if(quality){
    options.quality = quality;
  }

  // console.log('tempFilePath:', file.tempFilePath);
  // console.log('file:', file);
  // console.log('options:', options);
  return await cloudinary.uploader.upload(file.tempFilePath, options); 
}

// image upload -> handler function
exports.imageUpload = async (req, res) =>  {
  try {
    // console.log('inside imageUpload');
    // console.log(req.body);
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;
    // console.log(file);

    // validation
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file.name.split('.');
    const len = fileType.length;

    // console.log('fileType:', fileType[len-1]);

    if(!isFileTypeSupported(fileType[len-1], supportedTypes)){
      return res.status(400).json({
        success: false,
        message: 'Image format not supported'
      })
    }

    // valid supported format -> upload to cloudinary
    const response = await uploadFileToCloudinary(file, 'sampleFiles');
    // console.log(response);

    // created entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url
    });

    console.log('file upload successfully');

    res.status(200).json({
      success: true,
      fileUrl: response.secure_url,
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Not able to upload image'
    })
  }
}

// video upload -> handler function
exports.videoUpload = async (req, res) =>  {
  try {
    // console.log('inside imageUpload');
    // console.log(req.body);
    const { name, tags, email } = req.body;

    const file = req.files.videoFile;
    // console.log(file);

    // validation
    const supportedTypes = ['mp4', 'mpeg', 'mkv', 'mov'];
    const fileType = file.name.split('.');
    const len = fileType.length;

    // console.log('fileType:', fileType[len-1]);

    // -----------add upperlimit of 5mb--------------- ????? -> pending

    if(!isFileTypeSupported(fileType[len-1], supportedTypes)){
      return res.status(400).json({
        success: false,
        message: 'Video format not supported'
      })
    }

    // valid supported format -> upload to cloudinary
    const response = await uploadFileToCloudinary(file, 'sampleFiles');
    console.log(response);

    // created entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url
    });

    console.log('file upload successfully');

    res.status(200).json({
      success: true,
      fileUrl: response.secure_url,
      message: 'Video uploaded successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Not able to upload Video'
    })
  }
}

exports.imageSizeReducer = async (req, res) => {
  try {
    const {name, tags, email} = req.body;
    const file = req.files.imageFile;

    // validation
    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file.name.split('.');
    const len = fileType.length;

    if(!isFileTypeSupported(fileType[len-1], supportedTypes)){
      return res.status(400).json({
        success: false,
        message: 'Image format not supported'
      })
    }

    // valid supported format -> upload to cloudinary
    const response = await uploadFileToCloudinary(file, 'sampleFiles', 30);
    // console.log(response);

    // created entry in db
    const fileData = await File.create({
      name,
      tags,
      email,
      fileUrl: response.secure_url
    });

    console.log('file upload successfully');

    res.status(200).json({
      success: true,
      fileUrl: response.secure_url,
      message: 'Image Compressed uploaded successfully'
    })

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Not able to upload compressed image'
    })
  }
}
