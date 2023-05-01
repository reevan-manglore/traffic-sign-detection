import axios from 'axios';


export async function uploadVideo(video,token){
    const formData = new FormData();
    formData.append("video",video)
    const url = `${import.meta.env.VITE_BACKEND_HOST}/api/video/upload-video`;
    const data = await axios.post(url,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            "Auth-Token":token
          }
      
    });
   return data;
}