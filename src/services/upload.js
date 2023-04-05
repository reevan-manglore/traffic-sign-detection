import axios from 'axios';


export async function uploadVideo(video){
    const formData = new FormData();
    formData.append("video",video)
    const url = `${import.meta.env.VITE_PUBLIC_HOST}/api/video/upload-video`;
    const data = await axios.post(url,formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
          }
      
    });
   return data;
}