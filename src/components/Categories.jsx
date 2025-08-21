import React, { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useApi';

const Categories = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', parent_id: '' });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading,
    error,
    refetch
  } = useCategories();

  // Mutations
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories = categoriesData || [];
  const mainCategories = categories.filter(cat => !cat.parent_id);
  const subCategories = categories.filter(cat => cat.parent_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data: formData
      });
      setEditingCategory(null);
    } else {
      await createCategory.mutateAsync(formData);
    }
    
    setFormData({ name: '', parent_id: '' });
    setIsCreating(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, parent_id: category.parent_id || '' });
    setIsCreating(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', parent_id: '' });
    setEditingCategory(null);
    setIsCreating(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-xl mb-4">Error loading categories</div>
        <button 
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Category
        </button>
      </div>

      {/* Category Form */}
      {(isCreating || editingCategory) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? 'Edit Category' : 'Create New Category'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent Category (Optional)
              </label>
              <select
                value={formData.parent_id}
                onChange={(e) => setFormData(prev => ({ ...prev, parent_id: e.target.value || null }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No Parent (Main Category)</option>
                {mainCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={createCategory.isPending || updateCategory.isPending}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                {createCategory.isPending || updateCategory.isPending ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Main Categories</h2>
          <div className="space-y-4">
            {mainCategories.map(category => (
              <div key={category.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {subCategories.filter(sub => sub.parent_id === category.id).length} subcategories
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                {/* Subcategories */}
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  {subCategories
                    .filter(sub => sub.parent_id === category.id)
                    .map(subCategory => (
                      <div key={subCategory.id} className="flex justify-between items-center py-2">
                        <span className="text-gray-700">• {subCategory.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(subCategory)}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(subCategory.id)}
                            className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Statistics */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Statistics</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Categories:</span>
                <span className="text-2xl font-bold text-blue-600">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Main Categories:</span>
                <span className="text-xl font-semibold text-green-600">{mainCategories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sub Categories:</span>
                <span className="text-xl font-semibold text-purple-600">{subCategories.length}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Category Distribution</h3>
              <div className="space-y-2">
                {mainCategories.map(category => {
                  const subCount = subCategories.filter(sub => sub.parent_id === category.id).length;
                  const percentage = ((subCount / Math.max(subCategories.length, 1)) * 100).toFixed(1);
                  
                  return (
                    <div key={category.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{subCount}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
