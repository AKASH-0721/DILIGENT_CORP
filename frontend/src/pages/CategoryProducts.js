import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../components/product/ProductList';
import { productAPI, apiUtils } from '../services/api';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
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
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || '',
      page: parseInt(searchParams.get('page')) || 1,
      limit: parseInt(searchParams.get('limit')) || 12
    };
    
    setFilters(urlFilters);
  }, [location.search]);

  // Fetch products for the category
  const fetchProducts = useCallback(async () => {
    if (!category) return;
    
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

      const response = await productAPI.getProductsByCategory(category, cleanFilters);
      
      setProducts(response.products || []);
      setPagination(response.pagination || {});
    } catch (error) {
      console.error('Error fetching category products:', error);
      setError(apiUtils.handleApiError(error));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, filters]);

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

    const newURL = searchParams.toString() 
      ? `/category/${category}?${searchParams.toString()}` 
      : `/category/${category}`;
    navigate(newURL, { replace: true });
  }, [navigate, category]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };

    if (filterType === 'clear') {
      newFilters = {
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

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

  return (
    <div className="category-products-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{categoryTitle}</span>
        </nav>

        {/* Category Header */}
        <div className="category-header">
          <div className="category-info">
            <h1>{categoryTitle} Products</h1>
            <p>Discover our amazing collection of {category?.toLowerCase()} products</p>
          </div>
          
          <div className="category-actions">
            <Link to="/products" className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 17.9 19 19 19S21 18.1 21 17V13M9 19C10.1 19 11 20.1 11 21S10.1 23 9 23 7 21.9 7 21 7.9 19 9 19ZM20 19C21.1 19 22 20.1 22 21S21.1 23 20 23 18 21.9 18 21 18.9 19 20 19Z"/>
              </svg>
              All Products
            </Link>
          </div>
        </div>

        {/* Products List with Filters */}
        <ProductList
          products={products}
          loading={loading}
          error={error}
          title=""
          showFilters={true}
          filters={filters}
          onFilterChange={handleFilterChange}
          emptyMessage={`No ${category?.toLowerCase()} products found`}
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
              {pagination.totalProducts} {category?.toLowerCase()} products
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;