import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import Login from './pages/Login';
import { Dashboard } from '@mui/icons-material';
import UserDashboard from './pages/UserDashboard';
import ViewMoreProjects from './pages/ViewMoreProjects';
import Header from './components/Header';
import Page404 from './pages/Page404';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/' element={<Landing></Landing>}></Route>
  <Route path='/login' element={<Login></Login>}></Route>
  <Route path='/dashboard' element={<UserDashboard></UserDashboard>}></Route>
  <Route path='/view' element={<ViewMoreProjects></ViewMoreProjects>}></Route>
  <Route path='/*' element={<Page404></Page404>}></Route>
</Routes>
<Footer></Footer>
    </div>
  );
}

export default App;
