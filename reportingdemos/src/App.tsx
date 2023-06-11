import React from 'react';
import ReactDOM from "react-dom/client";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Reports from './pages/Reports';
import FileType from './pages/FileType';
import Result from './pages/Result';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/> } >
                    <Route index element={<Home />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="file-type/:reportName" element={<FileType />} />
                    <Route path="/result" element={<Result/>} />
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App;