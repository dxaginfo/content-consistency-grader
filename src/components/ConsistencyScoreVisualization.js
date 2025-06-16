import React from 'react';

/**
 * ConsistencyScoreVisualization Component
 * 
 * Displays visualization of content consistency scores across different dimensions.
 * Uses a combination of gauges, charts, and text to represent the analysis results.
 */
const ConsistencyScoreVisualization = ({ results, brandName }) => {
  // If no results, show placeholder
  if (!results) {
    return (
      <div className="no-results">
        <h3>No Analysis Results Yet</h3>
        <p>Submit content from different platforms to see consistency analysis here.</p>
      </div>
    );
  }
  
  const { 
    overallScore, 
    sentimentConsistency, 
    formalityConsistency, 
    keywordConsistency,
    platformMetrics,
    recommendations
  } = results;
  
  // Helper function to determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FFC107'; // Amber
    return '#F44336'; // Red
  };
  
  // Helper function to create circular gauge
  const CircularGauge = ({ score, label, size = 150 }) => {
    const radius = size / 2;
    const strokeWidth = size / 15;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    return (
      <div className="gauge-container">
        <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            stroke="#e6e6e6"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Score circle */}
          <circle
            stroke={getScoreColor(score)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            transform={`rotate(-90, ${radius}, ${radius})`}
          />
          {/* Score text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size / 4}
            fontWeight="bold"
          >
            {score}
          </text>
          {/* Percentage symbol */}
          <text
            x="70%"
            y="35%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={size / 10}
          >
            %
          </text>
        </svg>
        <div className="gauge-label">{label}</div>
      </div>
    );
  };
  
  // Helper function to create keyword comparison table
  const KeywordComparison = ({ platformMetrics }) => {
    return (
      <div className="keyword-comparison">
        <h3>Key Message Consistency</h3>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Top Keywords</th>
              <th>Sentiment</th>
              <th>Formality</th>
            </tr>
          </thead>
          <tbody>
            {platformMetrics.map((metric, index) => (
              <tr key={index}>
                <td>{results.contentItems?.[index]?.platform || `Platform ${index + 1}`}</td>
                <td>{metric.topKeywords.join(', ')}</td>
                <td>
                  <div className="sentiment-indicator">
                    <div 
                      className="sentiment-bar"
                      style={{ 
                        width: '100%',
                        background: `linear-gradient(to right, 
                          ${metric.sentiment < 0 ? '#F44336' : '#4CAF50'} ${Math.abs(metric.sentiment) * 100}%, 
                          #e6e6e6 ${Math.abs(metric.sentiment) * 100}%)`
                      }}
                    />
                    <span>{metric.sentiment.toFixed(2)}</span>
                  </div>
                </td>
                <td>
                  <div className="formality-indicator">
                    <div 
                      className="formality-bar"
                      style={{ 
                        width: '100%',
                        background: `linear-gradient(to right, #e6e6e6 ${(1-metric.formality) * 100}%, 
                          #2196F3 ${(1-metric.formality) * 100}%)`
                      }}
                    />
                    <span>{metric.formality < 0.4 ? 'Casual' : metric.formality > 0.6 ? 'Formal' : 'Neutral'}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  return (
    <div className="consistency-visualization">
      <h2>{brandName} Content Consistency Analysis</h2>
      
      <div className="overall-score-container">
        <CircularGauge 
          score={overallScore} 
          label="Overall Consistency" 
          size={200}
        />
        
        <div className="score-interpretation">
          <h3>Score Interpretation</h3>
          <p>
            {overallScore >= 80 
              ? 'Excellent consistency across platforms! Your brand voice is clear and unified.'
              : overallScore >= 60
                ? 'Good consistency with some variations. Minor adjustments could improve brand cohesion.'
                : 'Significant inconsistencies detected. Your messaging varies considerably across platforms.'}
          </p>
        </div>
      </div>
      
      <div className="detailed-scores">
        <CircularGauge score={sentimentConsistency} label="Tone Consistency" />
        <CircularGauge score={formalityConsistency} label="Voice Consistency" />
        <CircularGauge score={keywordConsistency} label="Message Consistency" />
      </div>
      
      <KeywordComparison platformMetrics={platformMetrics} />
      
      <div className="recommendations">
        <h3>Recommendations</h3>
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConsistencyScoreVisualization;