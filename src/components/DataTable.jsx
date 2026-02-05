import React, { useState, useMemo } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import './DataTable.css';

const DataTable = ({
    data,
    columns,
    onEdit,
    onDelete,
    canEdit = true,
    canDelete = true,
    itemsPerPage = 10
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Filter data based on search term
    const filteredData = useMemo(() => {
        if (!debouncedSearchTerm) return data;

        return data.filter(item => {
            return columns.some(column => {
                const value = item[column.key];
                return value && value.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase());
            });
        });
    }, [data, debouncedSearchTerm, columns]);

    // Sort data
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        const sorted = [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue === bValue) return 0;

            const comparison = aValue > bValue ? 1 : -1;
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }, [filteredData, sortConfig]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handlePageChange = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) return '⇅';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="data-table-container">
            {/* Search */}
            <div className="table-controls">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="table-info">
                    Showing {paginatedData.length} of {sortedData.length} records
                </div>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    onClick={() => column.sortable !== false && handleSort(column.key)}
                                    className={column.sortable !== false ? 'sortable' : ''}
                                >
                                    <div className="th-content">
                                        {column.label}
                                        {column.sortable !== false && (
                                            <span className="sort-icon">{getSortIcon(column.key)}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {(canEdit || canDelete) && <th className="actions-column">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (canEdit || canDelete ? 1 : 0)} className="no-data">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex}>
                                    {columns.map(column => (
                                        <td key={column.key} data-label={column.label}>
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                    {(canEdit || canDelete) && (
                                        <td className="actions-cell" data-label="Actions">
                                            <div className="action-buttons">
                                                {canEdit && onEdit && (
                                                    <button
                                                        className="btn-icon btn-edit"
                                                        onClick={() => onEdit(row)}
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                )}
                                                {canDelete && onDelete && (
                                                    <button
                                                        className="btn-icon btn-delete"
                                                        onClick={() => onDelete(row)}
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹
                    </button>

                    <div className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </div>

                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        ›
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>
            )}
        </div>
    );
};

export default DataTable;
