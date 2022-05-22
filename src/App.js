import './App.css';
import Navbar from './Components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup'
import { useState } from 'react'
import Alert from './Components/Alert';

function App() {
  //eslint-disable-next-line
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />}>
              </Route>
              <Route path="/about" element={<About />}>
              </Route>
              <Route path='/Login' element={<Login showAlert={showAlert} />}>
              </Route>
              <Route path='/Signup' element={<Signup showAlert={showAlert} />}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
