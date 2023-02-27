import React, { Suspense } from 'react';
import Header from './Components/Header';
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
import Extra from './Components/Extra';
const Home = React.lazy(() => import('./Components/Home.js'));
const Inhouse = React.lazy(() => import('./Components/Inhouse.js'));

function App() {
  return (
    <>
      <Header />
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Image />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Extra" element={<Extra />} />
            <Route exact path="/Home/Walkin" element={<Walkin />} />
            <Route exact path="/Home/Reservation" element={<Reservation />} />
            <Route exact path="/Home/Inhouse/:id" element={<Inhouse />} />
            <Route exact path="/Home/ReservationInhouse/:id" element={<ReservationInhouse />} />
          </Routes>
        </Suspense>
      </Provider>
      <Footer />
    </>
  );
}

export default App;
