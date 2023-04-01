import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import FileUploadForm from './components/FileUploadForm';
import Alert from './Alert';


function Index() {
  const [dragActive, setDragActive] = useState(false);
  const [file,setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(()=>{
    if(file!=null){
      setShowAlert(true);

    }
  },[file]);

  return (
    <section className='flex flex-col h-screen'>
      <div className='h-auto'>
        <Navbar />
      </div>
      {showAlert?
      <Alert
        message={`Continue with file named \n ${file.name}`}
        onAccept={()=>setShowAlert(false)}
        onReject={()=>{
          setFile(null);
          setShowAlert(false)
        }}
      />
      :""}
      <div className='flex-grow  h-full grid place-items-center'>
        <div
          className={`h-2/5 lg:w-2/5 lg:h-3/5  
                     bg-base-300 flex flex-col   p-4
                     rounded-xl border border-primary 
                     ${dragActive===false?"hover:ring-4 hover:ring-primary hover:ring-opacity-40":""}
                     ${dragActive?"moving-border  border-none":""}
                     `
          }
        >

          <h2 className='text-2xl text-center font-semibold h-auto'>Upload Your Video File Here</h2>

          <div className='h-full'>
            <FileUploadForm
            dragActive={dragActive}
            setDragActive={setDragActive}
            file = {file?.name??""}
            setFile={setFile}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Index;    