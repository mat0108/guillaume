
import React,{ createRef, Suspense, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie';

import Navbar from './Component/Navbar';
import Loading from './Component/Loading/Loading';
import Expo from './Screens/Expo';
import Expos from './Screens/Expos';
import APropos from './Screens/APropos';
import AdminLogin from './Screens/Admin/Admin_login';
import './index.css'
import './ReactToastify.css'
import AdminMain from './Screens/Admin/Admin_main';
import AdminExpo from './Screens/Admin/Expo/Admin_Expo';
import AdminExpoOrder from './Screens/Admin/Expo/Admin_Expo_Order';
import AdminExpoUpdate from './Screens/Admin/Expo/Admin_Expo_Update';
import AdminTableauUpdates from './Screens/Admin/Tableaux/Admin_Tableau_Update';
function App() {
  
  const isMobile = window.screen.width < 600;
  const [bgLoaded,setBgLoaded] = useState(false);
  const scrollRef = createRef(null);
  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor`}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
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
                <Route path="/expo/:expoId" element={<Expo/>}></Route>
                <Route path="/apropos" element={<APropos/>}></Route>
                <Route path="/admin" element={<AdminLogin/>}></Route>
                <Route path="/admin/main" element={<AdminMain />}></Route>
                <Route path="/admin/expos" element={<AdminExpo />}></Route>
                <Route path="/admin/expo/:expoId/order" element={<AdminExpoOrder />}></Route>
                <Route path="/admin/expo/:expoId/update" element={<AdminExpoUpdate />}></Route>
                <Route path="/admin/tableaux/" element={<AdminTableauUpdates />}></Route>
                <Route path="/admin/tableaux/:expoId" element={<AdminTableauUpdates />}></Route>
              </Routes>
            </Suspense>
          </div>
          </>}
          <ToastContainer
              // icon={(type) =>
              //     <img
              //       src={`./images/toast/${type.type}.svg`}
              //       alt={type.type}
              //     />
              // }
              position="bottom-center"
              autoClose={10000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              className={"w-fit"}
              />
        </Router>
      </CookiesProvider>
    </div>
  )
}``

export default App
