import React, { useState } from 'react';
import ContentInputForm from './components/ContentInputForm';
import ConsistencyScoreVisualization from './components/ConsistencyScoreVisualization';
import { analyzeConsistency } from './utils/textAnalysis';
import './App.css';

/**
 * Main App Component
 * 
 * Orchestrates the Content Consistency Grader application, managing
 * the input form, analysis process, and results visualization.
 */
function App() {
  // State for analysis results
  const [results, setResults] = useState(null);
  
  // State for brand name
  const [brandName, setBrandName] = useState('');
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  
  // State for displaying the form or results
  const [showResults, setShowResults] = useState(false);
  
  // Function to handle content analysis
  const handleAnalyze = ({ brandName, contentItems }) => {
    setIsLoading(true);
    setBrandName(brandName);
    
    // Extract just the content strings for analysis
    const contentTexts = contentItems.map(item => item.content);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Perform analysis using our utility
      const analysisResults = analyzeConsistency(contentTexts);
      
      // Add content items to results for reference
      analysisResults.contentItems = contentItems;
      
      // Update state with results
      setResults(analysisResults);
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };
  
  // Function to return to the form
  const handleBackToForm = () => {
    setShowResults(false);
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Content Consistency Grader</h1>
        <p className="tagline">
          Measure how consistently your brand message is delivered across platforms
        </p>
      </header>
      
      <main className="app-main">
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing content consistency...</p>
          </div>
        ) : showResults ? (
          <div className="results-container">
            <ConsistencyScoreVisualization 
              results={results} 
              brandName={brandName}
            />
            <button 
              className="back-button" 
              onClick={handleBackToForm}
            >
              ← Back to Form
            </button>
          </div>
        ) : (
          <ContentInputForm onAnalyze={handleAnalyze} />
        )}
      </main>
      
      <footer className="app-footer">
        <p>&copy; 2025 Content Consistency Grader | A tool to help brands maintain consistent messaging</p>
      </footer>
    </div>
  );
}

export default App;