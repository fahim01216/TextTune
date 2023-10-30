import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Textform from './components/Textform';
import About from './components/About';
import Alert from './components/Alert';

function App() {

  const [mode, setMode] = useState('light');
  const [textMode, setTextMode] = useState('dark');
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      setTextMode('light');
      document.body.style.color = 'white';
      document.body.style.backgroundColor = '#060B23';
      showAlert('success', 'Dark mode has been enabled!!');
    }
    else {
      setMode('light');
      setTextMode('dark');
      document.body.style.color = 'black';
      document.body.style.backgroundColor = 'white';
      showAlert('success', 'Light mode has been enabled!!');
      
    }
  }

  return (
    <>
    <Router>
      <NavBar title="TextTune" home="Home" about="About" mode={mode} toggleMode={toggleMode} textMode={textMode}/>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<Textform heading="Enter the text to analyze" showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
