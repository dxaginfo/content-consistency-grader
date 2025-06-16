import React, { useState } from 'react';

/**
 * ContentInputForm Component
 * 
 * A form for inputting content from different platforms to analyze consistency.
 * Allows users to add, remove, and edit content entries before submission.
 */
const ContentInputForm = ({ onAnalyze }) => {
  // State for storing content items
  const [contentItems, setContentItems] = useState([
    { platform: 'Website', content: '', id: 1 },
    { platform: 'Twitter', content: '', id: 2 },
    { platform: 'Instagram', content: '', id: 3 }
  ]);
  
  // State for brand name
  const [brandName, setBrandName] = useState('');
  
  // State for form errors
  const [errors, setErrors] = useState({});
  
  // Platform options
  const platformOptions = [
    'Website', 'Twitter', 'Instagram', 'Facebook', 'LinkedIn', 
    'Email Newsletter', 'Press Release', 'Blog', 'YouTube', 'TikTok',
    'Pinterest', 'Product Packaging', 'Advertising Copy', 'Other'
  ];
  
  // Handle content item changes
  const handleContentChange = (id, field, value) => {
    const updatedItems = contentItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setContentItems(updatedItems);
    
    // Clear any errors for this field
    if (errors[`content-${id}`]) {
      const newErrors = { ...errors };
      delete newErrors[`content-${id}`];
      setErrors(newErrors);
    }
  };
  
  // Add a new content item
  const addContentItem = () => {
    const newId = Math.max(0, ...contentItems.map(item => item.id)) + 1;
    setContentItems([
      ...contentItems, 
      { platform: 'Other', content: '', id: newId }
    ]);
  };
  
  // Remove a content item
  const removeContentItem = (id) => {
    if (contentItems.length <= 2) {
      setErrors({
        ...errors,
        general: 'You need at least two platforms to analyze consistency'
      });
      return;
    }
    
    setContentItems(contentItems.filter(item => item.id !== id));
    
    // Clear any errors for this item
    if (errors[`content-${id}`]) {
      const newErrors = { ...errors };
      delete newErrors[`content-${id}`];
      setErrors(newErrors);
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    // Check brand name
    if (!brandName.trim()) {
      newErrors.brandName = 'Brand name is required';
    }
    
    // Check each content item
    contentItems.forEach(item => {
      if (!item.content.trim()) {
        newErrors[`content-${item.id}`] = 'Content cannot be empty';
      }
    });
    
    // Check for duplicate platforms
    const platforms = contentItems.map(item => item.platform);
    const duplicates = platforms.filter((platform, index) => platforms.indexOf(platform) !== index);
    
    if (duplicates.length > 0) {
      newErrors.general = `Duplicate platforms detected: ${duplicates.join(', ')}`;
    }
    
    // Check minimum content length
    contentItems.forEach(item => {
      if (item.content.trim().length < 20) {
        newErrors[`content-${item.id}`] = 'Content should be at least 20 characters';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Call the onAnalyze prop with the content items
      onAnalyze({
        brandName,
        contentItems: contentItems.map(({ platform, content }) => ({ platform, content }))
      });
    }
  };
  
  return (
    <div className="content-input-form">
      <h2>Content Consistency Analysis</h2>
      <p className="form-instructions">
        Enter your brand's messaging from different platforms to analyze consistency.
      </p>
      
      <form onSubmit={handleSubmit}>
        {/* Brand Name Input */}
        <div className="form-group">
          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter your brand name"
            className={errors.brandName ? 'error' : ''}
          />
          {errors.brandName && <div className="error-message">{errors.brandName}</div>}
        </div>
        
        {/* General Errors */}
        {errors.general && <div className="error-message general">{errors.general}</div>}
        
        {/* Content Items */}
        <div className="content-items">
          <h3>Platform Content</h3>
          
          {contentItems.map((item) => (
            <div key={item.id} className="content-item">
              <div className="item-header">
                <select
                  value={item.platform}
                  onChange={(e) => handleContentChange(item.id, 'platform', e.target.value)}
                >
                  {platformOptions.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
                
                <button 
                  type="button" 
                  className="remove-button"
                  onClick={() => removeContentItem(item.id)}
                  aria-label="Remove content item"
                >
                  ✕
                </button>
              </div>
              
              <textarea
                value={item.content}
                onChange={(e) => handleContentChange(item.id, 'content', e.target.value)}
                placeholder={`Enter your ${item.platform} content here...`}
                rows={4}
                className={errors[`content-${item.id}`] ? 'error' : ''}
              />
              
              {errors[`content-${item.id}`] && (
                <div className="error-message">{errors[`content-${item.id}`]}</div>
              )}
            </div>
          ))}
          
          <button 
            type="button" 
            className="add-button"
            onClick={addContentItem}
          >
            Add Another Platform
          </button>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="analyze-button">
            Analyze Consistency
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentInputForm;