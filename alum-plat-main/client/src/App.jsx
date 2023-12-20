// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from "./pages/Home.jsx";
// import StudentDashboard from "./pages/StudentDashboard.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import Login from "./pages/Login.jsx";
// import AlumniEvents from "./pages/AlumniEvents.jsx";
// import AlumniRecords from "./pages/AlumniRecords.jsx";
// import Register from "./pages/Register.jsx";
// import Events from "./pages/Events.jsx";
// import About from "./pages/About.jsx";
// import './App.css'
//
// const App = () => {
//     const routes = [
//         { path: "/", element: <Home /> },
//         { path: "/student-dashboard", element: <StudentDashboard /> },
//         { path: "/admin-dashboard", element: <AdminDashboard /> },
//         { path: "/login", element: <Login /> },
//         { path: "/register", element: <Register /> },
//         { path: "/alumni-events", element: <AlumniEvents /> },
//         { path: "/alumni-records", element: <AlumniRecords /> },
//         { path: "/events", element: <Events /> },
//         { path: "/about", element: <About /> },
//
//     ];
//
//     return (
//         <Router>
//             <Routes>
//                 {routes.map((route) => (
//                     <Route key={route.path} path={route.path} element={route.element} />
//                 ))}
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import AlumniEvents from "./pages/AlumniEvents.jsx";
import AlumniRecords from "./pages/AlumniRecords.jsx";
import Register from "./pages/Register.jsx";
import Events from "./pages/Events.jsx";
import About from "./pages/About.jsx";
import './App.css'
import {AuthProvider} from "./authContext.jsx";

const App = () => {
    const routes = [
        { path: "/", element: <Home /> },
        { path: "/student-dashboard", element: <StudentDashboard /> },
        { path: "/admin-dashboard", element: <AdminDashboard /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/alumni-events", element: <AlumniEvents /> },
        { path: "/alumni-records", element: <AlumniRecords /> },
        { path: "/events", element: <Events /> },
        { path: "/about", element: <About /> },
    ];

    return (
        <Router>
            {/* Wrap your entire application with AuthProvider */}
            <AuthProvider>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
