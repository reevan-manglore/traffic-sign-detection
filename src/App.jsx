import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./store/index"

import SignUp from "./pages/authentication/signup/index.jsx"
import Login from "./pages/authentication/login/index.jsx"
import Upload from "./pages/upload/index.jsx";
import Result from "./pages/result/index.jsx";
import NoPageFound from "./pages/noPageFound/index.jsx";




function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="w-fit"
            theme='dark'
          />
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/result/:fileName" element={<Result />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>


        </PersistGate>
      </Provider>
    </BrowserRouter>
  )
}

export default App
