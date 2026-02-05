import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Users = () => {
    const { users, addUser, updateUser, deleteUser, isAdmin } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Viewer',
        status: 'Active'
    });

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            render: (value) => (
                <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value) => (
                <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>
            )
        },
        { key: 'registrationDate', label: 'Registration Date', sortable: true }
    ];

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingUser) {
            updateUser(editingUser.id, formData);
        } else {
            addUser(formData);
        }

        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
    };

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({ name: '', email: '', role: 'Viewer', status: 'Active' });
        setIsModalOpen(true);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Users</h1>
                    <p className="page-description">Manage your users and their permissions</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={openAddModal}>
                        ➕ Add User
                    </button>
                )}
            </div>

            <DataTable
                data={users}
                columns={columns}
                onEdit={isAdmin ? handleEdit : null}
                onDelete={isAdmin ? handleDelete : null}
                canEdit={isAdmin}
                canDelete={isAdmin}
            />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingUser ? 'Edit User' : 'Add New User'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Manager">Manager</option>
                            <option value="Viewer">Viewer</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            {editingUser ? 'Update User' : 'Create User'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal} style={{ flex: 1 }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Users;
