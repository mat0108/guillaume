import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
const App = () =>{
  return <div className='w-screen h-screen flex flex-col text-[50px] text-white font-mt-bold center'>
    <p>Guillaume Barnabé</p>
    <p>Work in progress</p>
  </div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


