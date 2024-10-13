


const CLOUD_NAME = 'dria5nd3b';

export const getImageURL = (id: string, trasnsform: string) => {
  const url: string = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/t_${trasnsform}/${id}`;
  return url;
}

export const prefecthImage = async (url: string) => {
  const img = new Image();
  img.src = url;
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'prueba');
  const resp = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );
  if (!resp.ok) {
    console.log(await resp.json());
    throw new Error('API response error');
  }
  const data = await resp.json();
  return data;
}
