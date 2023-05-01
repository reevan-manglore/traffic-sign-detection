import { useRef } from "react";
// import { BsUpload } from "react-icons/bs"


function FileUploadForm({ dragActive, setDragActive,file,setFile }) {

  const inputRef = useRef(null);
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been droppedto upload file to server
      console.log("file dropped ", e.dataTransfer.files[0]);
      setFile(e.dataTransfer.files[0]);

    }
  };

  const onButtonClick = () => {

    inputRef.current.click();
  };

  // to trigger when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected to upload file to server
      console.log("file uplaoded ", e.target.files[0]);
      setFile( e.target.files[0]);
    }
  };

  return (
    <form className='h-full w-full flex flex-col justify-center items-center' onDragEnter={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        accept="image/*"
        name="input-file-upload"
        id="input-file-upload"
        multiple = {true}
        value=""
        ref={inputRef}
        hidden
  
        onChange={handleChange}
      />

      {/* if required remove svg */}
      {/* <BsUpload className='text-6xl font-semibold mx-auto my-4' /> */}

      <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" fill="currentColor" className="bi bi-upload my-4 overflow-visible" viewBox="0 0 18 18">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path className={`animate-bounce `} d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
      </svg>

      <label htmlFor="input-file-upload">
        <div>
          <p className="text-center">Drag and drop your file here or</p>
          <p className="text-center">or <button type="button" className="btn btn-link text-secondary px-1" onClick={onButtonClick}>browse file</button> from device</p>

        </div>
      </label>
      {/* when the drag goes over above elements, a dragleave event will be  triggered, 
          eventough file is wihin form container so. To get around this issue, 
          when dragActive is true we are adding an invisible element to cover the entire form. 
          This then listens to the events without interference from any other elements. 
          And this can also handle the drop.
      */}
      {dragActive && <div className='absolute inset-0 w-full h-full' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </form>

  )
}

export default FileUploadForm