import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
import PersonDetailPage from './components/DetailPage/PersonDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="detail/:id" element={<PersonDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
