import blobServiceClient from "../config/azureBlob.js";

const uploadToBlob = async (file, folder) => {
  const containerClient = blobServiceClient.getContainerClient(
    process.env.BLOB_NAME,
  );

  const blobName = `${folder}/${Date.now()}-${file.originalname}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: {
      blobContentType: file.mimetype,
    },
  });

  return blockBlobClient.url;
};

export default uploadToBlob;
