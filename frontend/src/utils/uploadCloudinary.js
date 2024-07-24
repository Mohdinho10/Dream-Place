const upload_preset = import.meta.env.VITE_CLOUD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await res.json();

  return data;
};

export const uploadMultipleImageCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );
  console.log(res);

  const data = await res.json();

  return data;
};

// export const uploadMultipleImageCloudinary = async (files) => {
//   const uploadedImages = [];

//   for (const file of files) {
//     try {
//       const uploadData = new FormData();
//       uploadData.append("file", file);
//       uploadData.append("upload_preset", upload_preset);
//       uploadData.append("cloud_name", cloud_name);

//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
//         {
//           method: "post",
//           body: uploadData,
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`HTTP error ${res.status}`);
//       }

//       const data = await res.json();
//       uploadedImages.push(data);
//     } catch (error) {
//       console.error(`Error uploading file: ${file.name}`, error);
//       uploadedImages.push({ error: error.message });
//     }
//   }

//   return uploadedImages;
// };

export default uploadImageCloudinary;
