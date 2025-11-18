
import React,{ createRef, Suspense, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import Navbar from './Component/Navbar';
import Loading from './Component/Loading/Loading';
import Expo from './Screens/Expo';
import Expos from './Screens/Expos';
import APropos from './Screens/APropos';
function App() {
  
  const isMobile = window.screen.width < 600;
  const [bgLoaded,setBgLoaded] = useState(false);
  const scrollRef = createRef(null);
  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor`}>
      <Router>
        <div className='sticky top-0 z-[20]'>
          <Navbar scrollRef={scrollRef}/>
        </div>
       <img
          src="/images/background.webp"
          alt=""
          className="hidden"
          onLoad={() => setBgLoaded(true)}
        />
        {!bgLoaded && <div className='w-screen h-screen flex center'><Loading darkMode/></div>}
        {bgLoaded && <>
        <div className="absolute top-[-52px] left-0 w-full ">
            <img src={isMobile ? "/images/background-mobile.webp":"/images/background.webp"} alt={"background"} className="w-full h-[400px] lg:h-[680px]   "/>
            
        </div>
        <div className="relative flex flex-col overflow-y-scroll custom-scrollbar" ref={scrollRef}>
          <Suspense fallback={<div className='w-full h-full flex center'><Loading darkMode/></div>}>
            <Routes >        
              <Route path="/" element={<Expo title='Émotions, Couleurs' />}></Route>
              <Route path="/expos/" element={<Expos />}></Route>
              <Route path="/expo/:exponame" element={<Expo/>}></Route>
              <Route path="/apropos" element={<APropos/>}></Route>
            </Routes>
          </Suspense>
        </div>
        </>}
      </Router>
    </div>
  )
}``

export default App
