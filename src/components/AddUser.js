import React, { useState, useEffect } from 'react';
function AddUser({onAdd}) {
    const [adding, setAdding] = React.useState(false);
    const [user, setUser] = React.useState({
        name: "", username : "", email : "",
        address: { street : "", suite: "", city: ""},
        phone: "", website: ""
    });
    const handleChange = (e) =>{
        const {id, value} = e.target;
        if (["street", "suite","city"].includes(id)) {
            setUser({...user,address: {...user.address, [id]:value}});  
        } else {
            setUser({...user, [id]:value});
        }
    };
    const handleAdd = () => {
        if (user.name === ""||user.username === "") {
            alert("Vui lòng nhập Name và Username!");
            return;
        }
        onAdd(user);
        setUser({ name: "", username: "", email: "", address: { street: "", 
suite: "", city: "" }, phone: "", website: "" }); 
       setAdding(false);
    };
    if (!adding) {
    return <button onClick={() => setAdding(true)}>Thêm</button>;
   }
   return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Thêm người dùng mới</h4> 
        <label>Name: <input id="name" type="text" value={user.name} onChange={handleChange} /></label> {/* [cite: 149] */}
        <label>Username: <input id="username" type="text" value={user.username} onChange={handleChange} /></label>
        <label>Email: <input id="email" type="text" value={user.email} onChange={handleChange} /></label>
        <label>Street: <input id="street" type="text" value={user.address.street} onChange={handleChange} /></label>
        <label>City: <input id="city" type="text" value={user.address.city} onChange={handleChange} /></label>
        <button onClick={handleAdd}>Lưu</button>
        <button onClick={() => setAdding(false)}>Hủy</button>
      </div>
    </div>
  );
}
export default AddUser