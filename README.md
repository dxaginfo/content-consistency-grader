# Content Consistency Grader

A web application that helps brands and marketers assess how consistently their messaging is delivered across different platforms.

## Overview

The Content Consistency Grader analyzes content from multiple platforms (website, social media, email, etc.) and measures consistency across three key dimensions:

1. **Tone Consistency**: How similar the sentiment and emotional tone is across platforms
2. **Voice Consistency**: How consistent the formality and writing style remains
3. **Message Consistency**: How well core keywords and themes are maintained

## Key Features

- **Multi-platform input**: Enter content from various channels in a user-friendly form
- **Comprehensive analysis**: Advanced text processing evaluates multiple consistency factors
- **Visual scoring**: Intuitive gauge visualizations make results easy to understand
- **Actionable recommendations**: Get specific suggestions for improving consistency
- **Platform comparison**: See exactly where and how your messaging differs

## How It Works

1. Enter your brand name
2. Add content from different platforms (website, social media, email, etc.)
3. Submit for analysis
4. View your consistency scores and detailed breakdown
5. Implement recommendations to improve brand messaging alignment

## Technology Stack

- **Frontend**: React.js with custom SVG visualizations
- **Text Analysis**: Custom JavaScript algorithms for sentiment, keyword, and formality analysis
- **Styling**: CSS with responsive design for all device types

## Installation

1. Clone the repository
   ```
   git clone https://github.com/dxaginfo/content-consistency-grader.git
   cd content-consistency-grader
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
content-consistency-grader/
├── public/
├── src/
│   ├── components/
│   │   ├── ContentInputForm.js    # Form for inputting platform content
│   │   ├── ConsistencyScoreVisualization.js    # Results visualization
│   ├── utils/
│   │   ├── textAnalysis.js    # Core text analysis functionality
│   ├── App.js    # Main application component
│   ├── App.css   # Application styles
│   └── index.js  # Entry point
├── docs/
│   ├── architecture.md    # System architecture documentation
│   └── progress-tracker.md    # Development progress tracking
```

## Use Cases

- **Marketing Teams**: Ensure consistent messaging across all marketing channels
- **Brand Managers**: Monitor and maintain brand voice across departments
- **Content Creators**: Check if content aligns with established brand guidelines
- **Social Media Managers**: Verify platform-specific content maintains core brand messaging

## Limitations

- Currently handles text content only (no image or video analysis)
- Works best with English language content
- Most effective with samples of at least 50 words per platform

## Future Enhancements

- User accounts to save analysis history
- PDF export of reports
- Direct API connections to social media platforms
- Advanced NLP with machine learning for deeper insights

## License

This project is licensed under the MIT License - see the LICENSE file for details.