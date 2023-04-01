import { BrowserRouter,Routes,Route } from 'react-router-dom'

import  Upload from "./pages/upload/index.jsx";
import NoPageFound  from "./pages/noPageFound/index.jsx";


function App() {

  return (
    <BrowserRouter>
      <Routes>
					<Route path="/" element={<Upload/>}/>	
					<Route path="*" element={<NoPageFound/>}/>
				</Routes>
    </BrowserRouter>
  )
}

export default App
