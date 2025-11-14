
import React,{ Suspense} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Navbar from './Component/Navbar';
import Loading from './Component/Loading/Loading';
import Expo from './Screens/Expo';
import Expos from './Screens/Expos';
function App() {


  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor`}>
      <Router>
        <div className='sticky top-0 z-[20]'>
          <Navbar/>
        </div>
        <div className="absolute top-[-52px] left-0 w-full ">
            <img src={"/images/background.webp"} alt={"background"} className="w-full h-[400px] lg:h-[740px]   "/>
            
        </div>

        <Suspense fallback={<div className='w-full h-full flex center'><Loading /></div>}>
          <Routes >        
            <Route path="/" element={<Expo title='Émotions, Couleurs'/>}></Route>
            <Route path="/expos/" element={<Expos />}></Route>
            <Route path="/expo/:exponame" element={<Expo />}></Route>
            
            {/* <Route path="/expo/Émotions, Couleurs" element={<Expo title='Émotions, Couleurs'/>}></Route>
            <Route path="/expo/Paysages imaginaires" element={<Expo title='Paysages imaginaires'/>}></Route>
            <Route path="/expo/ARTEAZY premiere expo" element={<Expo title='ARTEAZY premiere expo'/>}></Route>
            <Route path="/expo/ARTEAZY seconde expo" element={<Expo title='ARTEAZY seconde expo'/>}></Route>
             */}
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}``

export default App
