import { BrowserRouter ,Route,Routes} from "react-router"

import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Connections from "./components/Connections"
import Requests from "./components/Requests"
function App() {
  

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
          <Routes>
              <Route path="/" element={<Body/>}>
                <Route path="/" element={<Feed/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/connections" element={<Connections/>} />
                <Route path="/requests" element={<Requests/>} />
              </Route>
          </Routes>
      </BrowserRouter>
    </Provider> 
    <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="w-96 h-4 text-sm"
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        
      /> 
    </>
  )
}

export default App
