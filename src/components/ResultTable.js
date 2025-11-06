import React, { useState, useEffect } from 'react';
function ResultTable({keyword,user,onAdded}) {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [editing, setEditing] = useState(null);
    // Tải dữ liệu 1 lần khi component mount (gán vào virtual DOM)
    React.useEffect(()=> {
        // lấy dữ liệu và setstate để component render lại
        fetch("https://jsonplaceholder.typicode.com/users") 
        .then(res => res.json()) 
        .then(data => { setUsers(data); setLoading(false); }); 
}, []);
// dùng [] để chỉ fetch 1 lần
    // CREATE 
  // Dùng useEffect để lắng nghe prop 'user' (newUser từ App) 
  useEffect(() => { 
    if (user) { // Nếu 'user' (newUser) có dữ liệu 
      // Thêm user mới vào state 'users'
      // Gán ID tạm thời (vì API không trả về ID khi thêm)
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]); 
      onAdded(); // Gọi callback báo App reset 'newUser' về null
    }
  }, [user]); // [user] = Chạy lại khi prop 'user' thay đổi 

  // 3. DELETE 
  const removeUser = (id) => { 
    // Dùng filter để tạo mảng mới, loại bỏ user có id trùng
    // React yêu cầu tạo mảng mới thay vì sửa mảng cũ 
    setUsers((prev) => prev.filter((u) => u.id !== id)); 
  };

  // 4. UPDATE 
  const editUser = (user) => { 
    // Phải sao chép cả object 'user' và object 'address' lồng bên trong
    // Nếu không, việc sửa 'editing' sẽ làm thay đổi 'users' gốc (do tham chiếu).
    setEditing({ ...user, address: { ...user.address } }); 
  };

  // 4. UPDATE (Sửa - cập nhật form)
  const handleEditChange = (id, value) => {
    // Logic tương tự handleChange của AddUser, nhưng cập nhật state 'editing'
    if (["street", "suite", "city"].includes(id)) {
      setEditing(prev => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setEditing(prev => ({ ...prev, [id]: value })); 
    }
  };

  // 4. UPDATE
  const saveUser = () => { 
    // Dùng map() để tìm user và thay thế bằng dữ liệu từ 'editing' 
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u)); 
    setEditing(null); // Đóng modal edit
  };
   // lọc danh sách theo keyword
   const filteredUsers = users.filter(
    (u) => 
        u.name.toLowerCase().includes(keyword.toLowerCase()) ||
        u.username.toLowerCase().includes(keyword.toLowerCase())
   );
   if (loading) return <p>Loading...</p>;

   return (
    <>
   <tbody>
     {filteredUsers.map((u) => (
        <tr key = {u.id}>
            <td> {u.id}</td>
            <td> {u.name}</td>
            <td> {u.username}</td>
            <td> {u.email}</td>
            <td> {u.address.city}</td>
            <td>
                <button onClick={()=>editUser(u)}>Sửa</button>
                <button className="btn-delete" onClick={()=>removeUser(u.id)}>Xóa</button>
            </td>
        </tr>
     ))}
   </tbody>
   {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa người dùng</h4>
            <label>Name: <input id="name" type="text" value={editing.name} onChange={(e) => handleEditChange("name", e.target.value)} /></label> {/* [cite: 175] */}
            <label>Username: <input id="username" type="text" value={editing.username} onChange={(e) => handleEditChange("username", e.target.value)} /></label>
            <label>Email: <input id="email" type="text" value={editing.email} onChange={(e) => handleEditChange("email", e.target.value)} /></label>
            <label>Street: <input id="street" type="text" value={editing.address.street} onChange={(e) => handleEditChange("street", e.target.value)} /></label>
            <label>City: <input id="city" type="text" value={editing.address.city} onChange={(e) => handleEditChange("city", e.target.value)} /></label>
            <button onClick={saveUser}>Lưu</button> 
            <button onClick={() => setEditing(null)}>Hủy</button>
          </div>
        </div>
      )}
    </>
   )
}
export default ResultTable;