import Dashboard from "./components/Dashboard";
import Header from "./components/Header"; 
import './App.css';
import Login from "./components/Login";
function App() {
  return (
   <div className='App'>
      <Header/>
      <Login/>
      <Dashboard/>
   </div>
  );
}
export default App;
