
import LoveLanding from './LandingPage/LoveLanding';
import MainPage from './Mainpage/MainPage';
import ShowAllData from './ShowAllData/showAlldata';
import PageNotFound from './PageNotFound/PageNotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<LoveLanding />} />
          <Route path="/calculate" element={<MainPage/>} />
          <Route path="/showData" element={<ShowAllData/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
