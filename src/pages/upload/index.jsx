import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { userAuthToken } from '../../store/slices/authSlice';

import Navbar from '../../components/Navbar';
import FileUploadForm from './components/FileUploadForm';
import Alert from './Alert';
import FileInfo from './components/FileInfo';
import { uploadVideo } from '../../services/upload';
import backgroundImage from "../../assets/background.svg"



function Index() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const authToken = useSelector(userAuthToken);

  useEffect(() => {
    if (file != null) {
      if (!file.type.match(/image\/*/)) {
        toast.error("you dropped invalid file only image files supported");
        setFile(null);
      }
      else {
        setShowAlert(true);
      }

    }
  }, [file]);

  return (
    <section 
    className='flex flex-col  h-screen bg-blend-overlay '
    style={{"backgroundImage":`url(${backgroundImage})`}}
    >
      <div className='h-auto'>
        <Navbar />
      </div>
      {showAlert ?
        <Alert
          message={`Continue with file named \n ${file.name}`}
          onAccept={async () => {
            setShowAlert(false);
            const resData = await uploadVideo(file,authToken);
            navigate(`/result/${resData.data["fileName"]}`);
            
          }}
          onReject={() => {
            setFile(null);
            setShowAlert(false)
          }}
        />
        : ""}
      <div className='flex-grow  h-full grid place-items-center'>
        <div
          className={`h-2/5 lg:w-2/5 lg:h-3/5  
                     bg-base-300 flex flex-col justify-center items-center   p-4
                     rounded-xl border border-primary 
                     ${dragActive === false ? "hover:ring-4 hover:ring-primary hover:ring-opacity-75" : ""}
                     ${dragActive ? "moving-border  border-none" : ""}
                     `
                     }
        >

          {!showAlert && <h2 className='text-2xl text-center font-semibold h-auto'>Upload Your Image File Here</h2>}


          {!showAlert ? <FileUploadForm
            dragActive={dragActive}
            setDragActive={setDragActive}
            file={file?.name ?? ""}
            setFile={setFile}
          />
            : <FileInfo fileName={file?.name} />
          }
        </div>
          {/* <p className='text-white'>{import.meta.env.VITE_MY_SUPERKEY}</p> */}


      </div>
    </section>
  )
}

export default Index;    