/**
 * EXAMPLE: Modern Admin Page with All Improvements
 * 
 * This demonstrates:
 * - Client-side auth using HOC
 * - Reusable admin components
 * - Type-safe user prop
 * - Clean, maintainable code
 * 
 * Copy this template for new admin pages
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/components/admin/AdminLayout';
import { withAdminAuth, User } from '@/lib/client-auth';
import {
  AdminCard,
  AdminTable,
  AdminButton,
  AdminBadge,
  AdminStatsCard,
  AdminAlert,
  AdminFormGroup,
  AdminModal,
} from '@/components/admin/AdminComponents';

// Import styles
import '@/public/css/admin-components.css';

// Types
interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  status: 'available' | 'borrowed' | 'maintenance';
  category: string;
  publishedYear: number;
}

interface Stats {
  total: number;
  available: number;
  borrowed: number;
  overdue: number;
}

interface BooksPageProps {
  user: User; // Provided automatically by withAdminAuth HOC
}

const BooksManagementPage: React.FC<BooksPageProps> = ({ user }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // State management
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    publishedYear: new Date().getFullYear(),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-dismiss alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch books and stats in parallel
      const [booksRes, statsRes] = await Promise.all([
        fetch('/api/admin/books'),
        fetch('/api/admin/books/stats'),
      ]);

      if (booksRes.ok && statsRes.ok) {
        const booksData = await booksRes.json();
        const statsData = await statsRes.json();
        
        setBooks(booksData.books);
        setStats(statsData.stats);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setAlert({ type: 'error', message: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!newBook.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!newBook.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (!newBook.isbn.trim()) {
      newErrors.isbn = 'ISBN is required';
    }
    if (!newBook.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateBook = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const data = await response.json();
        setBooks([data.book, ...books]);
        setShowCreateModal(false);
        setAlert({ type: 'success', message: 'Book created successfully!' });
        
        // Reset form
        setNewBook({
          title: '',
          author: '',
          isbn: '',
          category: '',
          publishedYear: new Date().getFullYear(),
        });
        setErrors({});
      } else {
        const data = await response.json();
        setAlert({ type: 'error', message: data.error || 'Failed to create book' });
      }
    } catch (error) {
      console.error('Create error:', error);
      setAlert({ type: 'error', message: 'An error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBook = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks(books.filter((b) => b.id !== id));
        setAlert({ type: 'success', message: 'Book deleted successfully' });
      } else {
        setAlert({ type: 'error', message: 'Failed to delete book' });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setAlert({ type: 'error', message: 'An error occurred' });
    }
  };

  const getStatusBadge = (status: Book['status']) => {
    const variants = {
      available: 'success',
      borrowed: 'warning',
      maintenance: 'danger',
    };
    return (
      <AdminBadge variant={variants[status] as any}>
        {status.toUpperCase()}
      </AdminBadge>
    );
  };

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          {/* Header */}
          <div className="sec-title text-center mb-4">
            <h2>Books Management</h2>
            <p>Welcome, {user.full_name}</p>
          </div>

          {/* Alert */}
          {alert && (
            <AdminAlert type={alert.type} onClose={() => setAlert(null)}>
              {alert.message}
            </AdminAlert>
          )}

          {/* Statistics Cards */}
          {stats && (
            <div className="row mb-4">
              <div className="col-lg-3 col-md-6 mb-3">
                <AdminStatsCard
                  title="Total Books"
                  value={stats.total}
                  icon="fa-book"
                  color="blue"
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <AdminStatsCard
                  title="Available"
                  value={stats.available}
                  icon="fa-check-circle"
                  color="green"
                  trend={{ value: 5.2, isPositive: true }}
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <AdminStatsCard
                  title="Borrowed"
                  value={stats.borrowed}
                  icon="fa-book-reader"
                  color="yellow"
                />
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <AdminStatsCard
                  title="Overdue"
                  value={stats.overdue}
                  icon="fa-exclamation-triangle"
                  color="red"
                  trend={{ value: 2.1, isPositive: false }}
                />
              </div>
            </div>
          )}

          {/* Books Table */}
          <AdminCard
            title="All Books"
            actions={
              <AdminButton
                variant="primary"
                icon="fa-plus"
                onClick={() => setShowCreateModal(true)}
              >
                Add Book
              </AdminButton>
            }
          >
            <AdminTable<Book>
              data={books}
              columns={[
                { 
                  key: 'title', 
                  label: 'Title', 
                  sortable: true,
                  width: '25%'
                },
                { 
                  key: 'author', 
                  label: 'Author', 
                  sortable: true,
                  width: '20%'
                },
                { 
                  key: 'isbn', 
                  label: 'ISBN',
                  width: '15%'
                },
                { 
                  key: 'category', 
                  label: 'Category',
                  width: '15%'
                },
                {
                  key: 'status',
                  label: 'Status',
                  width: '15%',
                  render: (book) => getStatusBadge(book.status),
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  width: '10%',
                  render: (book) => (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <AdminButton
                        size="small"
                        variant="primary"
                        icon="fa-edit"
                        onClick={() => router.push(`/admin/books/${book.id}`)}
                      >
                        Edit
                      </AdminButton>
                      <AdminButton
                        size="small"
                        variant="danger"
                        icon="fa-trash"
                        onClick={() => handleDeleteBook(book.id, book.title)}
                      >
                        Delete
                      </AdminButton>
                    </div>
                  ),
                },
              ]}
              loading={loading}
              emptyMessage="No books found. Create your first book!"
            />
          </AdminCard>

          {/* Create Book Modal */}
          <AdminModal
            isOpen={showCreateModal}
            onClose={() => {
              setShowCreateModal(false);
              setErrors({});
            }}
            title="Add New Book"
            size="medium"
            footer={
              <>
                <AdminButton
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </AdminButton>
                <AdminButton
                  variant="primary"
                  onClick={handleCreateBook}
                  loading={submitting}
                  icon="fa-save"
                >
                  Save Book
                </AdminButton>
              </>
            }
          >
            <form onSubmit={(e) => { e.preventDefault(); handleCreateBook(); }}>
              <AdminFormGroup
                label="Title"
                required
                error={errors.title}
                helpText="Enter the book title"
              >
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  placeholder="e.g., The Great Gatsby"
                />
              </AdminFormGroup>

              <AdminFormGroup
                label="Author"
                required
                error={errors.author}
              >
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  placeholder="e.g., F. Scott Fitzgerald"
                />
              </AdminFormGroup>

              <AdminFormGroup
                label="ISBN"
                required
                error={errors.isbn}
                helpText="13-digit ISBN number"
              >
                <input
                  type="text"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  placeholder="e.g., 978-3-16-148410-0"
                />
              </AdminFormGroup>

              <AdminFormGroup
                label="Category"
                required
                error={errors.category}
              >
                <select
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="science">Science</option>
                  <option value="technology">Technology</option>
                  <option value="history">History</option>
                </select>
              </AdminFormGroup>

              <AdminFormGroup
                label="Published Year"
                required
              >
                <input
                  type="number"
                  value={newBook.publishedYear}
                  onChange={(e) => setNewBook({ ...newBook, publishedYear: parseInt(e.target.value) })}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </AdminFormGroup>
            </form>
          </AdminModal>
        </div>
      </section>
    </AdminLayout>
  );
};

// 🔒 Protected Route - Only admins and superadmins can access
export default withAdminAuth(BooksManagementPage, {
  allowedRoles: ['admin', 'superadmin'],
  redirectTo: '/login',
});
