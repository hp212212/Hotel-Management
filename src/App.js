import React, { createContext, Suspense, useState } from 'react';
import Header from './Components/Header';
// import Header1 from './Components/Header1';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom'
// import Home from './Components/Home';
// import Inhouse from './Components/Inhouse';
import { store } from '../src/Redux Folder/Store'
import { Provider } from 'react-redux';
import Image from './Components/Image';
import Walkin from './Components/Walkin';
import Reservation from './Components/Reservation';
import ReservationInhouse from './Components/ReservationInhouse';
import Loginn from './Components/Loginn';
import Revenue from './Components/Revenue';
import Userss from './Components/Userss';
import 'react-toastify/dist/ReactToastify.css';
import Extra2 from './Components/Extra2';
// import Email from './Components/Email';
const Home = React.lazy(() => import('./Components/Home.js'));
const Inhouse = React.lazy(() => import('./Components/Inhouse.js'));
export const UidContext = createContext()

function App() {
  const [uid, setUid] = useState(-1)
  let element = <Loginn />
  let path = "/Login"
  if (uid === 0) {
    element = <Home />
    path = "/Home"
  } else {
    element = <Userss />
    path = "/MyAccount/:id"
  }

  return (
    <>
      <UidContext.Provider value={{ uid, setUid }}>
        {/* <Header1 /> */}
        <Header />
        <Provider store={store}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Image />} />
              <Route path={path} element={element} />
              <Route path="/Login" element={<Loginn />} />
              <Route exact path={`${path}/Walkin`} element={<Walkin />} />
              <Route exact path={`${path}/Reservation`} element={<Reservation />} />
              <Route exact path={`${path}/Revenue`} element={<Revenue />} />
              <Route exact path={`${path}/Inhouse/:id`} element={<Inhouse />} />
              <Route exact path={`${path}/ReservationInhouse/:id`} element={<ReservationInhouse />} />
              <Route exact path="/Extra2" element={<Extra2 />} />
            </Routes>
          </Suspense>
        </Provider>
        <Footer />
      </UidContext.Provider>
    </>
  );
}

export default App;
