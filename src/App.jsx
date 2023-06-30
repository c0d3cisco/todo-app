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
import { useStyles } from './style';

function App() { // extends React.Component {

  const [incomplete, setIncomplete] = useState([]);
  const [list, setList] = useState([]);

  const { classes } = useStyles();


  return (
    <>
      <Router>
        <Header />
        <div className={classes.mainElement}>
          <Routes>
            <Route path="/" element={<Main
              list={list}
              setList={setList}
              incomplete={incomplete}
              setIncomplete={setIncomplete}
            />} />
            <Route path="/settings" element={<Setting/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}


export default App;
