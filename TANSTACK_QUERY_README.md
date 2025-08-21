# 🚀 TanStack Query Implementation Guide

This document explains how TanStack Query (React Query) has been implemented in your frontend to fetch data from the Laravel backend API.

## 📦 What's Installed

- **@tanstack/react-query** - Core React Query library
- **@tanstack/react-query-devtools** - Development tools for debugging
- **axios** - HTTP client for API requests

## 🏗️ Architecture Overview

### 1. **API Service Layer** (`src/services/api.js`)
- Centralized API configuration with axios
- Request/response interceptors for authentication
- Organized endpoint constants
- Service methods for all CRUD operations

### 2. **Custom Hooks** (`src/hooks/useApi.js`)
- React Query hooks for data fetching
- Mutation hooks for create/update/delete operations
- Automatic cache invalidation
- Optimistic updates and error handling

### 3. **Query Client Configuration** (`src/main.jsx`)
- Global query client setup
- Default options for caching and retries
- React Query DevTools integration

## 🔧 Key Features

### **Automatic Caching**
- Data is cached automatically
- Configurable stale time and garbage collection
- Background refetching for fresh data

### **Loading & Error States**
- Built-in loading states (`isLoading`, `isPending`)
- Error handling with retry mechanisms
- Optimistic updates for better UX

### **Cache Management**
- Automatic cache invalidation
- Query key-based cache organization
- Background synchronization

## 📡 Available API Hooks

### **Categories**
```javascript
const { data, isLoading, error } = useCategories();
const createCategory = useCreateCategory();
const updateCategory = useUpdateCategory();
const deleteCategory = useDeleteCategory();
```

### **Products**
```javascript
const { data, isLoading, error } = usePosts(params);
const { data } = useFeaturedPosts();
const { data } = useLowStockPosts();
const { data } = usePostsByCategory(categoryId);
const { data } = usePostsByPriceRange(minPrice, maxPrice);
```

### **Authentication**
```javascript
const { data } = useUser();
const login = useLogin();
const logout = useLogout();
```

## 🎯 Usage Examples

### **Basic Data Fetching**
```javascript
import { usePosts } from '../hooks/useApi';

const Products = () => {
  const { data, isLoading, error } = usePosts();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data?.data?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### **Mutations with Cache Updates**
```javascript
import { useCreatePost } from '../hooks/useApi';

const CreateProduct = () => {
  const createPost = useCreatePost();
  
  const handleSubmit = async (formData) => {
    try {
      await createPost.mutateAsync(formData);
      // Cache is automatically invalidated
      // UI will show updated data
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createPost.isPending}
      >
        {createPost.isPending ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
};
```

### **Filtered Queries**
```javascript
const [filters, setFilters] = useState({});

const { data, refetch } = usePosts(filters);

// Query automatically refetches when filters change
useEffect(() => {
  refetch();
}, [filters, refetch]);
```

## 🗂️ Query Keys Structure

```javascript
export const queryKeys = {
  // Categories
  categories: ['categories'],
  category: (id) => ['categories', id],
  
  // Products
  posts: ['posts'],
  post: (id) => ['posts', id],
  featuredPosts: ['posts', 'featured'],
  lowStockPosts: ['posts', 'low-stock'],
  postsByCategory: (categoryId) => ['posts', 'category', categoryId],
  postsByPriceRange: (minPrice, maxPrice) => ['posts', 'price-range', minPrice, maxPrice],
  
  // User
  user: ['user'],
};
```

## ⚙️ Configuration Options

### **Global Query Client Settings**
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 minutes
      gcTime: 10 * 60 * 1000,      // 10 minutes
      retry: 1,                     // Retry once on failure
      refetchOnWindowFocus: false,  // Don't refetch on window focus
    },
  },
});
```

### **Individual Query Settings**
```javascript
const { data } = useQuery({
  queryKey: queryKeys.posts,
  queryFn: apiService.getPosts,
  staleTime: 2 * 60 * 1000,  // 2 minutes
  gcTime: 5 * 60 * 1000,     // 5 minutes
  enabled: !!userId,          // Only run when userId exists
});
```

## 🔄 Cache Invalidation

### **Automatic Invalidation**
```javascript
const createPost = useCreatePost();

// After successful creation, these queries are automatically invalidated:
// - All posts queries
// - Featured posts
// - Category-specific posts
```

### **Manual Invalidation**
```javascript
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: queryKeys.posts });

// Invalidate all queries
queryClient.clear();
```

## 🛠️ Development Tools

### **React Query DevTools**
- Automatically included in development
- Shows all queries and their states
- Cache inspection and manipulation
- Performance monitoring

### **Debugging Queries**
```javascript
// Check query state
console.log('Query state:', {
  isLoading,
  isError,
  isSuccess,
  data,
  error
});

// Force refetch
const { refetch } = usePosts();
refetch();
```

## 📱 Component Examples

### **Products Component**
- Demonstrates filtered queries
- Search and category filtering
- Price range filtering
- Pagination support

### **Categories Component**
- CRUD operations with mutations
- Hierarchical category display
- Real-time updates

### **Dashboard Component**
- Multiple query hooks
- Statistics calculation
- Real-time data display

## 🚀 Best Practices

### **1. Query Keys**
- Use consistent, descriptive keys
- Include parameters in keys for filtered queries
- Avoid deeply nested objects in keys

### **2. Error Handling**
- Always check for errors
- Provide user-friendly error messages
- Implement retry mechanisms

### **3. Loading States**
- Show loading indicators for better UX
- Use skeleton loaders for content
- Disable forms during mutations

### **4. Cache Management**
- Set appropriate stale times
- Invalidate related queries after mutations
- Use optimistic updates when possible

## 🔗 API Integration

### **Backend Requirements**
- RESTful API endpoints
- JSON responses
- Proper HTTP status codes
- CORS configuration

### **Authentication**
- Bearer token in Authorization header
- Automatic token refresh
- Logout on 401 responses

## 📊 Performance Benefits

- **Reduced API Calls**: Smart caching prevents unnecessary requests
- **Background Updates**: Data stays fresh without blocking UI
- **Optimistic Updates**: Immediate UI feedback
- **Request Deduplication**: Multiple components can share the same data

## 🎉 Getting Started

1. **Navigate to the demo routes**:
   - `/dashboard` - Overview with multiple queries
   - `/products` - Product listing with filters
   - `/categories` - Category management

2. **Open React Query DevTools**:
   - Look for the floating button in development
   - Inspect queries and cache

3. **Try the features**:
   - Filter products by category
   - Search products
   - Create/edit categories
   - Watch real-time updates

## 🔍 Troubleshooting

### **Common Issues**
- **CORS errors**: Ensure backend allows your frontend origin
- **401 errors**: Check authentication token
- **Cache not updating**: Verify query key structure
- **Infinite loops**: Check dependency arrays in useEffect

### **Debug Steps**
1. Check browser console for errors
2. Use React Query DevTools
3. Verify API endpoints are working
4. Check network tab for failed requests

---

**Happy Querying! 🚀**
