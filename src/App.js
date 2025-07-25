import Dashboard from "./components/Dashboard";
import Header from "./components/Header"; 
import './App.css';
import Login from "./components/Login";
import TableBinding from "./components/TableBinding";
function App() {
  return (
   <div className='App'>
      <Header/>
      <Login/>
      <Dashboard/>
      <TableBinding/>
   </div>
  );
}
export default App;
