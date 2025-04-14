import React, { Children, useContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import NewUser from './pages/newUser/NewUser.jsx';
import NewHotel from './pages/newHotel/NewHotel.jsx';
import NewRoom from './pages/newRoom/NewRoom.jsx';
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelInputs, productInputs, roomInputs, userInputs } from "./formSource";
import { hotelColumns, userColumns,roomColumns } from "./components/datatable/datatablesource";
import SingleHotel from "./pages/singleHotel/SingleHotel.jsx";
import SingleRoom from "./pages/singleRoom/SingleRoom.jsx";

const App = () => {

  const {darkMode} = useContext(DarkModeContext);

  const ProtectedRoute = ({children})=>{
    const {user} = useContext(AuthContext);
    if(!user){
      return <Navigate to='/login'/>;
    }
    return children;
  }

  return (
    <div className={darkMode?"app dark":"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login/>} />
            <Route index element={ <ProtectedRoute><Home /></ProtectedRoute> } />
            <Route path="users" >
              <Route index element={<ProtectedRoute><List type={'users'} columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewUser inputs={userInputs} /></ProtectedRoute>} />
            </Route>
            <Route path="hotels" >
              <Route index element={<ProtectedRoute><List type={'hotels'} columns={hotelColumns} /></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute><SingleHotel /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewHotel inputs={hotelInputs} /></ProtectedRoute>} />
            </Route>
            <Route path="rooms" >
              <Route index element={<ProtectedRoute><List type={'rooms'} columns={roomColumns} /></ProtectedRoute>} />
              <Route path=":roomId" element={<ProtectedRoute><SingleRoom /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewRoom inputs={roomInputs} /></ProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import List from "./pages/list/List";
// import Single from "./pages/single/Single";
// import New from "./pages/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource.jsx";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext.jsx";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route index element={<Home />} />
//             <Route path="login" element={<Login />} />
//             <Route path="users">
//               <Route index element={<List />} />
//               <Route path=":userId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={userInputs} title="Add New User" />}
//               />
//             </Route>
//             <Route path="products">
//               <Route index element={<List />} />
//               <Route path=":productId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={productInputs} title="Add New Product" />}
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
