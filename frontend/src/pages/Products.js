import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { productAPI, apiUtils } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    page: 1,
    limit: 12
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || '',
      page: parseInt(searchParams.get('page')) || 1,
      limit: parseInt(searchParams.get('limit')) || 12
    };
    
    setFilters(urlFilters);
  }, [location.search]);

  // Fetch products based on current filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Clean up filters - remove empty values
      const cleanFilters = Object.keys(filters).reduce((acc, key) => {
        if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});

      const response = await productAPI.getProducts(cleanFilters);
      
      setProducts(response.products || []);
      setPagination(response.pagination || {});
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(apiUtils.handleApiError(error));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update URL when filters change
  const updateURL = useCallback((newFilters) => {
    const searchParams = new URLSearchParams();
    
    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] !== '' && newFilters[key] !== null && newFilters[key] !== undefined) {
        searchParams.set(key, newFilters[key]);
      }
    });

    const newURL = searchParams.toString() ? `/products?${searchParams.toString()}` : '/products';
    navigate(newURL, { replace: true });
  }, [navigate]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };

    if (filterType === 'clear') {
      newFilters = {
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        sort: '',
        page: 1,
        limit: 12
      };
    } else {
      newFilters[filterType] = value;
      // Reset to first page when filters change (except page changes)
      if (filterType !== 'page') {
        newFilters.page = 1;
      }
    }

    setFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      handleFilterChange('page', newPage);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchTerm = formData.get('search');
    handleFilterChange('search', searchTerm);
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <div className="page-title-section">
            <h1>All Products</h1>
            <p>Discover our complete collection of amazing products</p>
          </div>

          {/* Search Bar */}
          <form className="products-search" onSubmit={handleSearchSubmit}>
            <input
              name="search"
              type="text"
              placeholder="Search products..."
              defaultValue={filters.search}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3965 17.9998 12.4887 17.9998 10.4995C17.9998 8.51035 17.2096 6.60262 15.803 5.19605C14.3965 3.78947 12.4887 2.99927 10.4995 2.99927C8.51035 2.99927 6.60262 3.78947 5.19605 5.19605C3.78947 6.60262 2.99927 8.51035 2.99927 10.4995C2.99927 12.4887 3.78947 14.3965 5.19605 15.803C6.60262 17.2096 8.51035 17.9998 10.4995 17.9998C12.4887 17.9998 14.3965 17.2096 15.803 15.803Z"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Products List with Filters */}
        <ProductList
          products={products}
          loading={loading}
          error={error}
          title="Products"
          showFilters={true}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="pagination-container">
            <div className="pagination">
              {/* Previous Page */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="pagination-btn"
                aria-label="Previous page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18L9 12l6-6"/>
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="pagination-numbers">
                {[...Array(pagination.totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  const isCurrentPage = pageNum === pagination.currentPage;
                  
                  // Show first page, last page, current page, and pages around current page
                  const showPage = (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    Math.abs(pageNum - pagination.currentPage) <= 2
                  );

                  if (!showPage) {
                    // Show ellipsis for gaps
                    if (pageNum === 2 && pagination.currentPage > 4) {
                      return (
                        <span key={pageNum} className="pagination-ellipsis">
                          ...
                        </span>
                      );
                    }
                    if (pageNum === pagination.totalPages - 1 && pagination.currentPage < pagination.totalPages - 3) {
                      return (
                        <span key={pageNum} className="pagination-ellipsis">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`pagination-number ${isCurrentPage ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="pagination-btn"
                aria-label="Next page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>

            {/* Page Info */}
            <div className="pagination-info">
              Showing {((pagination.currentPage - 1) * filters.limit) + 1} to{' '}
              {Math.min(pagination.currentPage * filters.limit, pagination.totalProducts)} of{' '}
              {pagination.totalProducts} products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;