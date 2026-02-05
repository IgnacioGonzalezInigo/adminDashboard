import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Products = () => {
    const { products, addProduct, updateProduct, deleteProduct, isAdmin } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        status: 'In Stock'
    });

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
            render: (value) => `$${value.toFixed(2)}`
        },
        { key: 'stock', label: 'Stock', sortable: true },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value) => {
                const color = value === 'In Stock' ? 'success' : value === 'Low Stock' ? 'warning' : 'danger';
                return <span className={`badge badge-${color}`}>{value}</span>;
            }
        }
    ];

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            status: product.status
        });
        setIsModalOpen(true);
    };

    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            deleteProduct(product.id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10)
        };

        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }

        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({ name: '', category: 'Electronics', price: '', stock: '', status: 'In Stock' });
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({ name: '', category: 'Electronics', price: '', stock: '', status: 'In Stock' });
        setIsModalOpen(true);
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Products</h1>
                    <p className="page-description">Manage your product inventory</p>
                </div>
                {isAdmin && (
                    <button className="btn btn-primary" onClick={openAddModal}>
                        ➕ Add Product
                    </button>
                )}
            </div>

            <DataTable
                data={products}
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
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Electronics">Electronics</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Audio">Audio</option>
                            <option value="Computing">Computing</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Office">Office</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="form-input"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Stock Quantity</label>
                        <input
                            type="number"
                            min="0"
                            className="form-input"
                            value={formData.stock}
                            onChange={(e) => {
                                const stock = e.target.value;
                                let status = 'In Stock';
                                if (stock === '0') status = 'Out of Stock';
                                else if (parseInt(stock) < 20) status = 'Low Stock';
                                setFormData({ ...formData, stock, status });
                            }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                            {editingProduct ? 'Update Product' : 'Create Product'}
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

export default Products;
