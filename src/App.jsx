import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { SettingsContext } from './Context/Settings';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import Header from './Components/Header';
import List from './Components/List';

function App() { // extends React.Component {
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
  }, [list]);

  const { hideState, pageCount, sortBy } = useContext(SettingsContext);

  return (
    <React.Fragment>
      <Header incomplete={incomplete} />
      {`${hideState}`}
      {pageCount}
      {`${hideState}`}
      <Todo
        list={list}
        setList={setList}
        incomplete={incomplete}
        setIncomplete={setIncomplete}
      />
      <List
        list={list}
        setList={setList}
      />
      <Footer />
    </React.Fragment>
  );
}


export default App;
