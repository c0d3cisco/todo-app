import React, { useEffect, useState, useContext } from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Main from './Components/Main';
import { MantineProvider } from '@mantine/core';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Setting from './Components/Settings';
import { useStyles } from './style';
import Auth from './Components/Auth';
import axios from 'axios';
import { SettingsContext } from './Context/Settings';

function App() {

  const [incomplete, setIncomplete] = useState([]);
  const [list, setList] = useState([]);
  const { settings } = useContext(SettingsContext);


  useEffect(() => {
    if (!settings.localMemory) {
      axios.get('https://api-js401.herokuapp.com/api/v1/todo')
      .then((response) => {setList(response.data.results)});
    } 
    else {
      let localList = localStorage.getItem('list');
      if (localList) {
        let parsedList = JSON.parse(localList);
        setList(parsedList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.localMemory])

  const { classes } = useStyles();



  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
        },
      }}
    >
      <Router>
        <Header />
        <Auth capability="read">
          <div className={classes.mainElement}>
            <Routes>
              <Route path="/" element={<Main
                list={list}
                setList={setList}
                incomplete={incomplete}
                setIncomplete={setIncomplete}
              />} />
              <Route path="/settings" element={<Setting
                list={list}
                setList={setList}
              />} />
            </Routes>
          </div>
        </Auth>
        <Footer />
      </Router>
    </MantineProvider>
  );
}


export default App;
