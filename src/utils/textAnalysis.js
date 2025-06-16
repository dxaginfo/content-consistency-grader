/**
 * Text Analysis Utility for Content Consistency Grader
 * 
 * This module provides the core text analysis functionality for comparing content
 * across different platforms and measuring consistency.
 */

// Import required NLP libraries
// Note: In a real implementation, you would install these via npm
// npm install compromise sentiment natural stopword
const nlp = {}; // placeholder for compromise
const sentiment = {}; // placeholder for sentiment
const natural = {}; // placeholder for natural
const stopword = {}; // placeholder for stopword

/**
 * Analyzes the sentiment of given text and returns a normalized score
 * @param {string} text - The text to analyze
 * @return {number} - Normalized sentiment score between -1 and 1
 */
const analyzeSentiment = (text) => {
  // In a real implementation, this would use the sentiment library
  // const result = sentiment.analyze(text);
  // return result.comparative;
  
  // For demonstration, we'll return a simple mock implementation
  const positiveWords = ['happy', 'great', 'excellent', 'good', 'amazing', 'love', 'best', 'positive'];
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'poor', 'negative', 'disappointing'];
  
  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  // Normalize to a range between -1 and 1
  return score / Math.max(words.length / 10, 1);
};

/**
 * Extracts the most significant keywords from text
 * @param {string} text - The text to analyze
 * @param {number} count - Number of keywords to extract
 * @return {Array} - Array of top keywords
 */
const extractKeywords = (text, count = 5) => {
  // In a real implementation, this would use natural TF-IDF and stopwords
  // For demonstration, a simple implementation
  const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 3);
  const frequency = {};
  
  // Count word frequencies
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency
  const sortedWords = Object.keys(frequency).sort((a, b) => {
    return frequency[b] - frequency[a];
  });
  
  // Return top N keywords
  return sortedWords.slice(0, count);
};

/**
 * Determines the formality level of text
 * @param {string} text - The text to analyze
 * @return {number} - Formality score between 0 (casual) and 1 (formal)
 */
const analyzeFormality = (text) => {
  const formalIndicators = [
    'therefore', 'consequently', 'furthermore', 'additionally', 'however', 
    'nevertheless', 'regarding', 'concerning', 'accordingly', 'subsequently'
  ];
  
  const casualIndicators = [
    'yeah', 'cool', 'awesome', 'gonna', 'wanna', 'kinda', 'sorta', 
    'just', 'really', 'super', 'totally', 'basically'
  ];
  
  const words = text.toLowerCase().split(/\W+/);
  let formalCount = 0;
  let casualCount = 0;
  
  words.forEach(word => {
    if (formalIndicators.includes(word)) formalCount++;
    if (casualIndicators.includes(word)) casualCount++;
  });
  
  // Calculate ratio of formal indicators to total indicators
  const total = formalCount + casualCount;
  return total === 0 ? 0.5 : formalCount / total;
};

/**
 * Calculates the similarity between two texts based on shared keywords
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @return {number} - Similarity score between 0 and 1
 */
const calculateSimilarity = (text1, text2) => {
  const keywords1 = new Set(extractKeywords(text1, 10));
  const keywords2 = new Set(extractKeywords(text2, 10));
  
  // Find intersection
  const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
  
  // Calculate Jaccard similarity: intersection size / union size
  const union = new Set([...keywords1, ...keywords2]);
  
  return intersection.size / union.size;
};

/**
 * Calculates the overall consistency score for multiple content pieces
 * @param {Array} contentItems - Array of text strings from different platforms
 * @return {Object} - Consistency scores and analysis
 */
const analyzeConsistency = (contentItems) => {
  if (!contentItems || contentItems.length < 2) {
    return {
      overallScore: 0,
      error: 'Need at least two content items to compare'
    };
  }
  
  // Calculate all metrics for each content item
  const metrics = contentItems.map(content => {
    return {
      sentiment: analyzeSentiment(content),
      keywords: extractKeywords(content),
      formality: analyzeFormality(content),
      text: content
    };
  });
  
  // Calculate sentiment consistency (standard deviation)
  const sentiments = metrics.map(m => m.sentiment);
  const avgSentiment = sentiments.reduce((sum, val) => sum + val, 0) / sentiments.length;
  const sentimentVariance = sentiments.reduce((sum, val) => sum + Math.pow(val - avgSentiment, 2), 0) / sentiments.length;
  const sentimentConsistency = 1 - Math.min(Math.sqrt(sentimentVariance), 1);
  
  // Calculate formality consistency
  const formalities = metrics.map(m => m.formality);
  const avgFormality = formalities.reduce((sum, val) => sum + val, 0) / formalities.length;
  const formalityVariance = formalities.reduce((sum, val) => sum + Math.pow(val - avgFormality, 2), 0) / formalities.length;
  const formalityConsistency = 1 - Math.min(Math.sqrt(formalityVariance), 1);
  
  // Calculate keyword consistency
  let keywordSimilaritySum = 0;
  let comparisonCount = 0;
  
  for (let i = 0; i < contentItems.length; i++) {
    for (let j = i + 1; j < contentItems.length; j++) {
      keywordSimilaritySum += calculateSimilarity(contentItems[i], contentItems[j]);
      comparisonCount++;
    }
  }
  
  const keywordConsistency = comparisonCount > 0 ? keywordSimilaritySum / comparisonCount : 0;
  
  // Calculate overall consistency score (weighted average)
  const overallScore = (
    sentimentConsistency * 0.3 + 
    formalityConsistency * 0.3 + 
    keywordConsistency * 0.4
  ) * 100; // Convert to percentage
  
  return {
    overallScore: Math.round(overallScore),
    sentimentConsistency: Math.round(sentimentConsistency * 100),
    formalityConsistency: Math.round(formalityConsistency * 100),
    keywordConsistency: Math.round(keywordConsistency * 100),
    platformMetrics: metrics.map(m => ({
      sentiment: m.sentiment,
      topKeywords: m.keywords.slice(0, 5),
      formality: m.formality
    })),
    recommendations: generateRecommendations(sentimentConsistency, formalityConsistency, keywordConsistency)
  };
};

/**
 * Generates recommendations based on consistency scores
 * @param {number} sentimentConsistency - Sentiment consistency score (0-1)
 * @param {number} formalityConsistency - Formality consistency score (0-1)
 * @param {number} keywordConsistency - Keyword consistency score (0-1)
 * @return {Array} - Array of recommendation strings
 */
const generateRecommendations = (sentimentConsistency, formalityConsistency, keywordConsistency) => {
  const recommendations = [];
  
  if (sentimentConsistency < 0.7) {
    recommendations.push('Your messaging tone varies significantly across platforms. Consider standardizing your emotional tone to maintain brand consistency.');
  }
  
  if (formalityConsistency < 0.7) {
    recommendations.push('The formality level of your content varies between platforms. Develop a consistent voice that can be adapted to each platform while maintaining your brand identity.');
  }
  
  if (keywordConsistency < 0.5) {
    recommendations.push('Your key message points differ substantially across platforms. Identify your core value propositions and ensure they appear consistently in all communications.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Your messaging is quite consistent across platforms. Continue monitoring to maintain this consistency as your content evolves.');
  }
  
  return recommendations;
};

// Export the utility functions
export {
  analyzeSentiment,
  extractKeywords,
  analyzeFormality,
  calculateSimilarity,
  analyzeConsistency
};

export default analyzeConsistency;