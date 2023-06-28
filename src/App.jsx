import React from 'react';
import { useState } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';

function App() { // extends React.Component {

  const [incomplete, setIncomplete] = useState([]);

  return (
    <React.Fragment>
      <Header incomplete={incomplete} />
      <Main
        incomplete={incomplete}
        setIncomplete={setIncomplete}
      />
      <Footer />
    </React.Fragment>
  );
}


export default App;
