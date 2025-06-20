import SIGNUP from './user/signup';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import React from 'react'
import HOME from './home'
import LOGIN from './user/login'
import PRODUCT from './product'
import APPO from './appo'
import LOGIN1 from './admin/admin_login';
import SIGNUP1 from './admin/adsignup';
import ADMIN_HOME from './admin/adminhome';
import ADMIN_APPO from './admin/admin_appo';
import UP_IMG from './admin/up_image';
import CROP_DI from './crops_di';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SIGNUP />} />
        <Route path="/home" element={<HOME />} />
        <Route path="/" element={<LOGIN />} />
        <Route path="/product" element={<PRODUCT />} />
        <Route path="/appointment" element={<APPO />} />
        <Route path="/admin/login" element={<LOGIN1 />} />
        <Route path="/admin/signup" element={<SIGNUP1 />} />
        <Route path="/admin/home" element={<ADMIN_HOME />} />
        <Route path="/admin/appointment" element={<ADMIN_APPO />} />
        <Route path="/admin/product" element={<UP_IMG />} />
        <Route path="/crops_disease" element={<CROP_DI />} />
      </Routes>
    </Router>
  );
}

export default App;
