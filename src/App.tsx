import UserList from './components/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from  './components/Header'
import './App.css';


function App() {
  return (
    <div>
      <Header></Header>
      <UserList></UserList>
      <ToastContainer/>
    </div>
  );
}

export default App;
