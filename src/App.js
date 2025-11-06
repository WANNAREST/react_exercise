import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser';
import ResultTable from './components/ResultTable';

function App() {
  // State tập trung: từ khóa tìm kiếm (kw) và người dùng mới (newUser)
  // được chia sẻ cho các component con
  const [kw, setKeyword] = React.useState(""); 
  const [newUser, setNewUser] = React.useState(null); 

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <SearchForm onChangeValue={setKeyword} /> 
      <AddUser onAdd={setNewUser} />
      <ResultTable
        keyword={kw} 
        user={newUser} 
        onAdded={() => setNewUser(null)} // Reset newUser về null
      />
    </div>
  );
}

export default App;