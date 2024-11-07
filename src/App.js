import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/header/header';
import Dashboard from './pages/dashboard/dashboard';
import NoMatch from './pages/noMatch/noMatch';
import PostUser from './pages/contact/PostUser';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/contact' element={<PostUser/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>
  );
}

export default App;
