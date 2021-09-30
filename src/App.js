// hg'' HG""
import React,{useReducer} from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { createContext } from 'react';
import InitState from './reducers/InitState';
import appReducer from './reducers/Reducer';
//pages
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
//primeReact
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
//Context
export const AppContext = createContext(null);

function App() {

  const [state, dispatch] = useReducer(appReducer, InitState)

  return (
    <AppContext.Provider value={{state:state, dispatch:dispatch}}>
      <Router>
        <Route component={SideNav} />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
