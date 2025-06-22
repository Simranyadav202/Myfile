import React, { useEffect, useState } from 'react';
import { Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MaterialDashboard.css';

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="sidebar-title">Office Store Management</h2>
    <nav className="nav-links">
      <NavLink to="." end className="nav-item">Dashboard</NavLink>
      <NavLink to="requests" className="nav-item">Requests</NavLink>
      <NavLink to="inventory" className="nav-item">Inventory</NavLink>
      <NavLink to="settings" className="nav-item">Settings</NavLink>
    </nav>
  </aside>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main className="main-content">
      <h1 className="section-title">Employee Dashboard</h1>
      <div className="card-grid">
        <div className="card" onClick={() => navigate('/requests')}>New Request</div>
        <div className="card" onClick={() => navigate('/requests')}>Track Requests</div>
        <div className="card" onClick={() => navigate('/inventory')}>View Inventory</div>
        <div className="card">My Profile</div>
      </div>
    </main>
  );
};

const RequestForm = () => (
  <main className="main-content">
    <h2 className="section-title">Request Details</h2>
    <form className="form-grid">
      <select><option>Select category</option><option>Stationery</option><option>Electronics</option></select>
      <select><option>Select item type</option><option>Type 1</option><option>Type 2</option></select>
      <input type="text" placeholder="Enter specific item name" />
      <input type="number" placeholder="Enter quantity" />
      <input type="text" placeholder="Enter delivery location" />
      <textarea placeholder="Explain why you need this item" rows="4" />
      <div className="radio-group">
        <label><input type="radio" name="urgency" /> Low</label>
        <label><input type="radio" name="urgency" /> Normal</label>
        <label><input type="radio" name="urgency" /> High</label>
      </div>
      <button type="submit">Submit Request</button>
    </form>
  </main>
);

const Inventory = () => {
  const [materials, setMaterials] = useState([]);
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '', status: '', vendor: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/materials');
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/materials/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/materials/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/materials', formData);
      }
      setFormData({ name: '', category: '', quantity: '', status: '', vendor: '' });
      setEditMode(false);
      setEditId(null);
      setShowForm(false);
      fetchMaterials();
    } catch (err) {
      console.error('Error submitting material:', err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/materials/${id}`);
      setFormData(res.data);
      setEditId(id);
      setEditMode(true);
      setShowForm(true);
    } catch (err) {
      console.error('Error fetching material:', err);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/materials/${id}`);
      setViewData(res.data);
    } catch (err) {
      console.error('Error viewing material:', err);
    }
  };

  return (
    <main className="main-content">
      <h2 className="section-title">Inventory Management</h2>

      <button onClick={() => {
        setShowForm(prev => !prev);
        setFormData({ name: '', category: '', quantity: '', status: '', vendor: '' });
        setEditMode(false);
        setEditId(null);
      }} className="toggle-form-btn">
        {showForm ? 'Cancel' : 'Add Material'}
      </button>

      {showForm && (
        <form className="form-grid" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="text" name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
          <input type="text" name="vendor" placeholder="Vendor" value={formData.vendor} onChange={handleChange} required />
          <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
        </form>
      )}

      <input type="text" placeholder="Search items..." className="search-input" />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Vendor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(mat => (
            <tr key={mat.id}>
              <td>{mat.id}</td>
              <td>{mat.name}</td>
              <td>{mat.category}</td>
              <td>{mat.quantity}</td>
              <td>{mat.status}</td>
              <td>{mat.vendor}</td>
              <td>
                <button onClick={() => handleEdit(mat.id)}>Edit</button>
                <button onClick={() => handleDelete(mat.id)}>Delete</button>
                <button onClick={() => handleView(mat.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewData && (
        <div className="view-card">
          <h3>Material Details</h3>
          <p><strong>Name:</strong> {viewData.name}</p>
          <p><strong>Category:</strong> {viewData.category}</p>
          <p><strong>Quantity:</strong> {viewData.quantity}</p>
          <p><strong>Status:</strong> {viewData.status}</p>
          <p><strong>Vendor:</strong> {viewData.vendor}</p>
        </div>
      )}
    </main>
  );
};

const Settings = () => (
  <main className="main-content">
    <h2 className="section-title">Settings Page</h2>
    <p>Customize your preferences here.</p>
  </main>
);

export default function MaterialDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content-area">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<RequestForm />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}