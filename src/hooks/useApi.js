import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

// Query keys for caching
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

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: apiService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => apiService.getCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => apiService.updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.category(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
};

// Products hooks
export const usePosts = (params = {}) => {
  return useQuery({
    queryKey: [...queryKeys.posts, params],
    queryFn: () => apiService.getPosts(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: queryKeys.featuredPosts,
    queryFn: apiService.getFeaturedPosts,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useLowStockPosts = () => {
  return useQuery({
    queryKey: queryKeys.lowStockPosts,
    queryFn: apiService.getLowStockPosts,
    staleTime: 1 * 60 * 1000, // 1 minute (low stock changes frequently)
  });
};

export const usePostsByCategory = (categoryId) => {
  return useQuery({
    queryKey: queryKeys.postsByCategory(categoryId),
    queryFn: () => apiService.getPostsByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 2 * 60 * 1000,
  });
};

export const usePostsByPriceRange = (minPrice, maxPrice) => {
  return useQuery({
    queryKey: queryKeys.postsByPriceRange(minPrice, maxPrice),
    queryFn: () => apiService.getPostsByPriceRange(minPrice, maxPrice),
    enabled: !!minPrice && !!maxPrice,
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: queryKeys.featuredPosts });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => apiService.updatePost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: queryKeys.post(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.featuredPosts });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      queryClient.invalidateQueries({ queryKey: queryKeys.featuredPosts });
    },
  });
};

// User hooks
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: apiService.getUser,
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 5 * 60 * 1000,
  });
};

// Authentication hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.login,
    onSuccess: (data) => {
      if (data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
        queryClient.invalidateQueries({ queryKey: queryKeys.user });
      }
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: apiService.logout,
    onSuccess: () => {
      localStorage.removeItem('auth_token');
      queryClient.clear();
    },
  });
};