

export async function uploadFilesToCloudinary(files) {
  const CLOUD_NAME = "dqpdsenlt";          
  const UPLOAD_PRESET = "diego_app-imgs";  
  const FOLDER = "dogs";                   

  if (!files || !files.length) return [];

  // If already URLs, skip upload
  if (typeof files[0] === "string") return files;

  const uploads = files.map(async (file) => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", UPLOAD_PRESET);
    if (FOLDER) form.append("folder", FOLDER);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: form }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "Cloudinary upload failed");
    return data.secure_url;
  });

  return Promise.all(uploads);
}
