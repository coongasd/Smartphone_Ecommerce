
import './App.css';
import Header from './components/Header'
import MainPage from './components/MainPage';
import Data from './components/data.json'
import Detail from './components/Detail';
import Cart from './components/Cart';
import Shipping from './components/Shipping';

import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from './components/Profile';
import Payment from './components/Payment';
import PlaceOrder from './components/PlaceOrder';
import Order from './components/Order';
function App() {

  return (  
    <div className="App">
      
      <Router>
         <Header/>
         <Switch>
           <Route path="/detail/:id">
             <Detail/>
           </Route>
           <Route path="/cart/:id">
             <Cart/>
           </Route>
           <Route path="/cart/">
             <Cart/>
           </Route>
           <Route path="/login/">
             <Login/>
           </Route>
           <Route path="/profile/">
             <Profile/>
           </Route>
           <Route path="/shipping">
             <Shipping/>
           </Route>
           <Route path="/payment">
             <Payment/>
           </Route>
           <Route path="/placeorder">
             <PlaceOrder/>
           </Route>
           <Route path="/order/:id">
             <Order/>
           </Route>
           <Route path="/search/:keyword">
             <MainPage/>
           </Route>
           <Route path="/">
             <MainPage/>
           </Route>
         </Switch>
      </Router>
  
    </div>
      
  );
}

export default App;
