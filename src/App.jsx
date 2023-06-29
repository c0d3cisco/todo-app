import React from 'react';
import { useState } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Setting from './Components/Settings';

function App() { // extends React.Component {

  const [incomplete, setIncomplete] = useState([]);

  return (
    <>
      <Router>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Routes>
            <Route path="/" element={<Main
              incomplete={incomplete}
              setIncomplete={setIncomplete}
            />} />
          </Routes>
          <Routes>
            <Route path="/settings" element={<Setting/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}


export default App;
