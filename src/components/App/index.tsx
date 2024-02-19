import React from 'react';
// Wrong import logo that don't using in application because of comments,
import logo from '../../logo.svg';
import './App.css';
// MainApp does not exist, instead class Index
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';
// Do (state: RootState) for useSelector or be better using useAppSelector instead useSelector
// Todos has any type instead array [] 
// App has got React.FunctionComponent = () => {}
function App() {
    // Extra space in the next line
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
    // Remove next comment line
      // туду лист для юзеров:
    // Wrong className 
    <div className="App main">
      <header className="App-header">
        TODO list with users:
      {/*  // Undo comment with "img src.." for correct work App-logo styles */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
      {/* Remove the next comment line }
        {/* MAIN APP: */}
        <MainApp todos={todos}/>
        {/* Remove next empty line */}

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}
// Do one of export options, nammed or default 
export default App;
