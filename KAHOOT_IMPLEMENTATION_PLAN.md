# Kahoot Quiz Feature Implementation Plan

## Overview
Implement a Kahoot-like interactive quiz feature for the wedding invitation website that supports up to 100 participants, with questions imported from TSV files and answers recorded to Google Sheets.

## Requirements Summary
- Support for 100 concurrent participants
- Questions imported from TSV file format: `question\tanswer1\tanswer2\tanswer3\tanswer4\n` (answer1 is correct)
- User identification: Email (unique) + Name (changeable)
- All answers recorded to Google Sheet
- Real-time quiz experience similar to Kahoot

---

## Architecture Overview

### Frontend Components
1. **Quiz Landing Page** (`quiz.html`)
   - User registration/login (email + name)
   - Quiz selection/start interface

2. **Quiz Player Interface** (`quiz-player.html` or embedded in `quiz.html`)
   - Question display
   - Answer buttons (4 options)
   - Timer countdown
   - Score display
   - Progress indicator

3. **Quiz Results Page**
   - Final score
   - Leaderboard (optional)
   - Answer review

### Backend Components
1. **Google Apps Script Handler**
   - Question management
   - Answer submission handler
   - User session management
   - Score calculation

2. **Google Sheet Structure**
   - Questions sheet
   - Answers sheet
   - Users sheet (for session management)

### Data Flow
```
User → Quiz Page → Email/Name Entry → Question Display → Answer Selection → 
Google Apps Script → Google Sheet → Results Display
```

---

## Implementation Steps

### Phase 1: File Structure & Configuration ✅ COMPLETED

#### 1.1 Create Quiz HTML Page
- **File**: `quiz.html`
- **Location**: Root directory
- **Features**:
  - Header/Footer integration (using existing components)
  - User registration form (email + name)
  - Quiz selection interface
  - Quiz player interface (embedded)
  - Results display section

#### 1.2 Create Quiz JavaScript Module
- **File**: `js/quiz.js`
- **Responsibilities**:
  - TSV file parsing
  - Question management
  - Answer handling
  - Timer management
  - Score calculation
  - Google Apps Script communication

#### 1.3 Create Quiz CSS
- **File**: `css/quiz.css` (or add to `style.css`)
- **Styles**:
  - Quiz container
  - Question display
  - Answer buttons (4 color-coded options)
  - Timer display
  - Score display
  - Progress bar

#### 1.4 Update Configuration
- **File**: `config.js`
- **Add**:
  ```javascript
  QUIZ_CONFIG: {
      GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
      MAX_PARTICIPANTS: 100,
      QUESTION_TIME_LIMIT: 30000, // 30 seconds in milliseconds
      QUESTIONS_TSV_PATH: 'data/quiz-questions.tsv'
  }
  ```

---

### Phase 2: TSV Question Parser ✅ COMPLETED

#### 2.1 TSV Format Specification
- **Format**: `question\tanswer1\tanswer2\tanswer3\tanswer4\n`
- **Rules**:
  - First answer (answer1) is always the correct answer
  - Tab-separated values
  - Newline-separated questions
  - UTF-8 encoding
  - Example:
    ```
    What is the bride's favorite color?\tRed\tBlue\tGreen\tYellow
    Where did the couple first meet?\tUniversity\tCoffee Shop\tPark\tLibrary
    ```

#### 2.2 Parser Implementation
- **Function**: `parseTSVQuestions(tsvContent)`
- **Location**: `js/quiz.js`
- **Returns**: Array of question objects
  ```javascript
  [
    {
      id: 1,
      question: "What is the bride's favorite color?",
      answers: ["Red", "Blue", "Green", "Yellow"],
      correctAnswer: 0, // Index of correct answer
      shuffledAnswers: ["Blue", "Red", "Green", "Yellow"], // Shuffled for display
      correctIndex: 1 // Index in shuffled array
    }
  ]
  ```

#### 2.3 Question Loading
- Load TSV file via fetch API
- Parse on page load
- Store in memory for quiz session
- Handle errors (file not found, invalid format)

---

### Phase 3: User Management ✅ COMPLETED

#### 3.1 User Registration/Login
- **Email as Unique Identifier**:
  - Store email in localStorage/sessionStorage
  - Use email to identify user across sessions
  - Check if email exists in Google Sheet

- **Name Management**:
  - Allow name changes
  - Store current name in session
  - Update name in Google Sheet when changed

#### 3.2 Session Management
- **Local Storage Keys**:
  - `quiz_user_email`: User's email
  - `quiz_user_name`: Current name
  - `quiz_session_id`: Current quiz session ID
  - `quiz_answers`: Temporary answer storage

#### 3.3 User Interface
- Registration form (if new user)
- Login form (if returning user)
- Name update form
- Welcome message with user name

---

### Phase 4: Quiz Player Interface ✅ COMPLETED

#### 4.1 Question Display
- **Layout**:
  - Large question text (centered, prominent)
  - 4 answer buttons (color-coded: Red, Blue, Yellow, Green)
  - Timer countdown (visual + numeric)
  - Question number indicator (e.g., "Question 3 of 10")
  - Progress bar

#### 4.2 Answer Selection
- **Interaction**:
  - Click answer button
  - Visual feedback (highlight selected)
  - Disable other buttons after selection
  - Show correct/incorrect after timer ends
  - Auto-submit if time runs out

#### 4.3 Timer Implementation
- Countdown from 30 seconds (configurable)
- Visual timer (circular progress or bar)
- Audio/visual alert at 5 seconds remaining
- Auto-submit when timer reaches 0

#### 4.4 Score Calculation
- **Scoring**:
  - Points based on time remaining
  - Correct answer: `basePoints + timeBonus`
  - Incorrect answer: 0 points
  - Formula: `basePoints = 1000`, `timeBonus = (timeRemaining / totalTime) * 500`

---

### Phase 5: Google Apps Script Integration 🔄 IN PROGRESS

#### 5.1 Google Sheet Structure

##### Sheet 1: Questions
| Question ID | Question Text | Answer 1 (Correct) | Answer 2 | Answer 3 | Answer 4 | Active |
|-------------|---------------|-------------------|----------|----------|----------|--------|
| 1 | What is... | Red | Blue | Green | Yellow | TRUE |

##### Sheet 2: Quiz Sessions
| Session ID | Start Time | End Time | Status | Total Questions |
|------------|------------|----------|--------|-----------------|
| SESSION001 | 2024-01-01 10:00 | 2024-01-01 10:30 | COMPLETED | 10 |

##### Sheet 3: User Answers
| Timestamp | Session ID | Email | Name | Question ID | Selected Answer | Correct Answer | Is Correct | Time Taken (ms) | Points | Question Text |
|-----------|------------|-------|------|-------------|-----------------|----------------|------------|-----------------|--------|---------------|
| 2024-01-01 10:05 | SESSION001 | user@email.com | John | 1 | Red | Red | TRUE | 25000 | 1250 | What is... |

##### Sheet 4: User Scores
| Email | Name | Session ID | Total Score | Total Questions | Correct Answers | Completion Time |
|-------|------|------------|-------------|-----------------|-----------------|-----------------|
| user@email.com | John | SESSION001 | 8500 | 10 | 8 | 2024-01-01 10:30 |

#### 5.2 Google Apps Script Functions

##### Function: `doPost(e)` - Handle Quiz Actions
```javascript
function doPost(e) {
  var action = e.parameter.action || '';
  
  switch(action) {
    case 'submitAnswer':
      return submitAnswer(e);
    case 'startSession':
      return startSession(e);
    case 'endSession':
      return endSession(e);
    case 'updateUserName':
      return updateUserName(e);
    case 'getUserHistory':
      return getUserHistory(e);
    default:
      return returnJson({success: false, error: 'Invalid action'});
  }
}
```

##### Function: `submitAnswer(e)`
- Parameters: `email`, `name`, `sessionId`, `questionId`, `selectedAnswer`, `timeTaken`, `points`
- Validates answer
- Records to User Answers sheet
- Updates User Scores sheet
- Returns success/error

##### Function: `startSession(e)`
- Parameters: `email`, `name`
- Creates new session ID
- Records to Quiz Sessions sheet
- Returns session ID

##### Function: `endSession(e)`
- Parameters: `email`, `sessionId`
- Updates session status to COMPLETED
- Calculates final score
- Returns final results

##### Function: `updateUserName(e)`
- Parameters: `email`, `newName`
- Updates name in User Scores sheet
- Updates all recent answers with new name
- Returns success

##### Function: `getUserHistory(e)`
- Parameters: `email`
- Returns user's quiz history, scores, and statistics

#### 5.3 Error Handling
- Validate email format
- Check for duplicate submissions
- Handle missing data
- Return appropriate error messages

---

### Phase 6: Answer Submission Flow ✅ COMPLETED

#### 6.1 Answer Submission Process
1. User selects answer
2. Calculate points based on time remaining
3. Store answer locally (backup)
4. Submit to Google Apps Script
5. Show confirmation
6. Move to next question

#### 6.2 Retry Logic
- If submission fails, retry up to 3 times
- Store answers locally as backup
- Allow manual retry option
- Show error message if all retries fail

#### 6.3 Data Validation
- Validate email format
- Validate answer selection
- Validate session ID
- Validate question ID

---

### Phase 7: Results & Leaderboard ✅ COMPLETED

#### 7.1 Results Display
- Final score
- Total questions answered
- Correct answers count
- Accuracy percentage
- Time taken

#### 7.2 Leaderboard (Optional)
- Top 10 scores
- User's rank
- Average score
- Refresh button

#### 7.3 Answer Review
- Show all questions
- Highlight correct/incorrect answers
- Show user's selected answers
- Show correct answers

---

### Phase 8: UI/UX Enhancements

#### 8.1 Responsive Design
- Mobile-friendly layout
- Touch-optimized buttons
- Readable font sizes
- Proper spacing

#### 8.2 Animations
- Question transition animations
- Answer button hover effects
- Timer pulse animation
- Score update animations

#### 8.3 Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

#### 8.4 Performance
- Lazy load questions
- Optimize image loading
- Minimize API calls
- Cache question data

---

### Phase 9: Testing & Validation

#### 9.1 Unit Tests
- TSV parser tests
- Score calculation tests
- Timer functionality tests
- Answer validation tests

#### 9.2 Integration Tests
- Google Apps Script integration
- Google Sheet data integrity
- User session management
- Answer submission flow

#### 9.3 Load Testing
- Test with 100 concurrent users (simulated)
- Monitor API response times
- Check Google Sheet write performance
- Validate error handling under load

#### 9.4 User Acceptance Testing
- Test with real users
- Gather feedback
- Fix bugs
- Improve UX

---

### Phase 10: Deployment

#### 10.1 Pre-Deployment Checklist
- [ ] All files created and tested
- [ ] Google Apps Script deployed
- [ ] Google Sheets created with proper headers
- [ ] TSV file uploaded and accessible
- [ ] Configuration updated
- [ ] Navigation links added
- [ ] Mobile testing completed
- [ ] Error handling tested

#### 10.2 Deployment Steps
1. Upload all files to GitHub Pages
2. Deploy Google Apps Script as web app
3. Update `config.js` with script URL
4. Test live deployment
5. Monitor for errors

#### 10.3 Post-Deployment
- Monitor Google Sheet for submissions
- Check error logs
- Gather user feedback
- Make improvements

---

## File Structure

```
wedding-invitation/
├── quiz.html                    # Main quiz page
├── data/
│   └── quiz-questions.tsv      # Questions file
├── js/
│   └── quiz.js                 # Quiz functionality
├── css/
│   └── quiz.css                # Quiz styles (or add to style.css)
├── config.js                   # Updated with QUIZ_CONFIG
└── GOOGLE_APPS_SCRIPT_CODE.js  # Updated with quiz handlers
```

---

## Google Apps Script Code Additions

### New Functions to Add:
1. `submitAnswer(e)` - Handle answer submissions
2. `startSession(e)` - Create new quiz session
3. `endSession(e)` - End quiz session
4. `updateUserName(e)` - Update user's name
5. `getUserHistory(e)` - Get user's quiz history
6. `calculateScore(timeTaken, isCorrect)` - Calculate points
7. `validateAnswer(questionId, selectedAnswer)` - Validate answer

### Sheet Setup Functions:
1. `setupQuizSheets()` - Create all required sheets with headers
2. `importQuestionsFromTSV(tsvContent)` - Import questions from TSV (optional)

---

## Configuration Options

### In `config.js`:
```javascript
QUIZ_CONFIG: {
    GOOGLE_SCRIPT_URL: 'YOUR_SCRIPT_URL',
    MAX_PARTICIPANTS: 100,
    QUESTION_TIME_LIMIT: 30000, // 30 seconds
    QUESTIONS_TSV_PATH: 'data/quiz-questions.tsv',
    BASE_POINTS: 1000,
    TIME_BONUS_MAX: 500,
    ENABLE_LEADERBOARD: true,
    SHOW_CORRECT_ANSWER_DELAY: 2000, // 2 seconds
    AUTO_ADVANCE_DELAY: 3000 // 3 seconds
}
```

---

## Security Considerations

1. **Email Validation**: Validate email format on both client and server
2. **Rate Limiting**: Prevent spam submissions (max 1 answer per question per user)
3. **Session Validation**: Verify session IDs
4. **Data Sanitization**: Sanitize all user inputs
5. **CORS**: Configure Google Apps Script CORS properly

---

## Future Enhancements (Optional)

1. **Real-time Leaderboard**: WebSocket or polling for live updates
2. **Multiple Quiz Sets**: Support multiple quiz files
3. **Question Categories**: Organize questions by category
4. **Admin Panel**: Manage questions, view statistics
5. **Export Results**: Download results as CSV/PDF
6. **Email Notifications**: Send results via email
7. **Social Sharing**: Share scores on social media
8. **Achievements/Badges**: Gamification elements

---

## Timeline Estimate

- **Phase 1-2**: File structure & TSV parser (2-3 hours)
- **Phase 3**: User management (2-3 hours)
- **Phase 4**: Quiz player interface (4-5 hours)
- **Phase 5**: Google Apps Script integration (3-4 hours)
- **Phase 6**: Answer submission (2-3 hours)
- **Phase 7**: Results & leaderboard (2-3 hours)
- **Phase 8**: UI/UX enhancements (3-4 hours)
- **Phase 9**: Testing (3-4 hours)
- **Phase 10**: Deployment (1-2 hours)

**Total Estimated Time**: 22-31 hours

---

## Notes

- The quiz can be designed as a single-page application (SPA) within `quiz.html`
- Consider using localStorage for offline answer storage (submit when online)
- Google Sheets has a limit of 10 million cells, which should be sufficient for 100 users
- Consider implementing pagination for leaderboard if it grows large
- Test thoroughly with different browsers and devices

---

## Success Criteria

1. ✅ Users can register with email and name
2. ✅ Questions load from TSV file
3. ✅ Users can answer questions within time limit
4. ✅ Answers are recorded to Google Sheet
5. ✅ Scores are calculated correctly
6. ✅ Results are displayed accurately
7. ✅ Supports up to 100 concurrent users
8. ✅ Name can be updated
9. ✅ Email serves as unique identifier
10. ✅ All data persists in Google Sheets

