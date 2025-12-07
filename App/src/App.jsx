
import React,{ createRef, lazy, Suspense, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import { ToastContainer } from 'react-toastify'
import { CookiesProvider } from 'react-cookie';
import { Dialog, DialogPanel } from "@headlessui/react";


import Navbar from './Component/Navbar';
import Loading from './Component/Loading/Loading';
import Expo from './Screens/Expo';

import './index.css'
import './ReactToastify.css'
import Home from './Screens/Home';
import { HelmetProvider } from 'react-helmet-async';
import Messages from './Screens/Messages';

function App() {
  const isMobile = window.screen.width < 600;
  const [bgLoaded,setBgLoaded] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const [popup,setPopup] = useState()
  const scrollRef = createRef(null);


  const Expos = lazy(() => import('./Screens/Expos'));
  const APropos = lazy(() => import('./Screens/APropos'));
  const Contact = lazy(() => import('./Screens/Contact'));

  const AdminMain = lazy(() => import('./Screens/Admin/Admin_main'));
  const AdminLogin = lazy(() => import('./Screens/Admin/Admin_login'));

  const AdminExpo = lazy(() => import('./Screens/Admin/Expo/Admin_Expo'));
  const AdminExpoOrder = lazy(() => import('./Screens/Admin/Expo/Admin_Expo_Order'));
  const AdminExpoUpdate = lazy(() => import('./Screens/Admin/Expo/Admin_Expo_Update'));

  const AdminTableauUpdates = lazy(() => import('./Screens/Admin/Tableaux/Admin_Tableau_Update'));
  const AdminTableauCreate = lazy(() => import('./Screens/Admin/Tableaux/Admin_tableau_create'));
  return (<div className={`w-screen h-screen relative flex flex-col bg-mainColor`}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <HelmetProvider>
        <Router> 
          <div className='sticky top-0 z-[20]'>
            <Navbar scrollRef={scrollRef} 
            onContact={()=>{setPopup(<Contact onClose={()=>{setIsOpen(false)}}/>); setIsOpen(true)}}
            />
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
          <div className="relative flex flex-col overflow-y-auto custom-scrollbar" ref={scrollRef}>
            <Suspense fallback={<div className='w-full h-full flex center'><Loading darkMode/></div>}>
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                          <div className="fixed inset-0 flex w-screen flex items-center justify-center p-1 lg:p-4">
                              <DialogPanel>{popup}</DialogPanel> 
                                  
                              
                          </div>
              </Dialog>
              <Routes >        
                <Route path="/" element={<Home/>}></Route>
                <Route path="/expos/" element={<Expos />}></Route>
                <Route path="/expo/:expoId" element={<Expo/>}></Route>
                <Route path="/apropos" element={<APropos/>}></Route>
                <Route path="/messages" element={<Messages setIsOpen={setIsOpen} setPopup={setPopup} />}></Route>
                <Route path="/contact" element={<div className="w-full h-screen flex center bg-mainColor"><Contact onClose={setIsOpen}/></div>}></Route>
                <Route path="/admin" element={<AdminLogin/>}></Route>
                <Route path="/admin/main" element={<AdminMain />}></Route>
                <Route path="/admin/expos" element={<AdminExpo />}></Route>
                <Route path="/admin/expo/:expoId/order" element={<AdminExpoOrder />}></Route>
                <Route path="/admin/expo/:expoId/update" element={<AdminExpoUpdate />}></Route>
                <Route path="/admin/tableaux/" element={<AdminTableauUpdates />}></Route>
                <Route path="/admin/tableaux/:expoId" element={<AdminTableauUpdates />}></Route>
                <Route path="/admin/tableau/create" element={<AdminTableauCreate setIsOpen={setIsOpen} setPopup={setPopup}/>}></Route>
                
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
              autoClose={5000}
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
        </HelmetProvider>
      </CookiesProvider>
    </div>
  )
}``

export default App
