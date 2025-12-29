// Google Apps Script Code for RSVP Form Handler and Google Photos Integration
// Copy this entire code into your Google Apps Script editor
//
// IMPORTANT: Set up your Google Sheet with the following header row (first row):
// Timestamp | Name | Email | Guest Of | Phone | Number of Guests | Attendance | Events Attending | Other Requests | Message
//
// QUIZ SHEETS:
// The script will automatically create the following sheets for quiz functionality:
// - Sessions: Session tracking with Session ID, Start Time, End Time, Status, Total Questions, Email, Name, Current Question Index, Last Forced Advance
// - Player Scores: Player scores with Email, Name, Session ID, Total Score, Total Questions, Correct Answers, Completion Time
// - Detailed Answers: Individual answer submissions with Timestamp, Session ID, Email, Name, Question ID, Question Text, Selected Answer, Correct Answer, Is Correct, Time Taken, Points
//
// Instructions:
// 1. Create a new Google Sheet
// 2. Add the header row in the first row (see above) for RSVP data
// 3. Copy this code into Google Apps Script (script.google.com)
// 4. Run the setupQuizSheets() function once to create all quiz sheets (or they will be created automatically)
// 5. Deploy as a web app with "Execute as: Me" and "Who has access: Anyone"
// 6. Copy the web app URL and paste it into config.js as GOOGLE_SCRIPT_URL
//
// ============================================
// GOOGLE PHOTOS SHARED ALBUM SETUP
// ============================================
// This script uses shared Google Photos album links (no OAuth required!)
//
// To use:
// 1. Create a shared album in Google Photos
// 2. Get the share link (e.g., https://photos.app.goo.gl/ABC123XYZ)
// 3. Extract the token from the URL (e.g., ABC123XYZ)
// 4. Use this token in config.js as GOOGLE_PHOTOS_ALBUM_TOKEN
//
// The script will automatically extract photos from the shared album.

// Helper function to return JSON response with CORS headers
function returnJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var action = e.parameter.action || '';
    
    // Handle photo uploads
    if (action === 'uploadPhoto') {
      return uploadPhoto(e);
    }
    
    // Handle quiz actions
    if (action === 'startSession' || action === 'submitAnswer' || action === 'endSession' || 
        action === 'updateUserName' || action === 'getUserHistory' || action === 'getLeaderboard' ||
        action === 'getActiveSessions' || action === 'forceNextQuestion' || action === 'checkForcedAdvance' ||
        action === 'getCurrentQuestion' || action === 'allowNextQuestion' || action === 'goToQuestion' ||
        action === 'closeCurrentQuestion' || action === 'checkQuestionState') {
      return handleQuizAction(e);
    }
    
    // Handle RSVP (existing functionality)
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse form data from POST request
    var data = {
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      guestOf: e.parameter.guestOf || '',
      phone: e.parameter.phone || '',
      guests: e.parameter.guests || '',
      attendance: e.parameter.attendance || '',
      ceremonies: e.parameter.ceremonies || '', // Comma-separated string
      otherRequests: e.parameter.otherRequests || '',
      message: e.parameter.message || '',
      redirect: e.parameter.redirect || ''
    };
    
    // Append row with RSVP data
    // Column order: Timestamp | Name | Email | Guest Of | Phone | Number of Guests | Attendance | Events Attending | Other Requests | Message
    // Prefix phone with single quote to force Google Sheets to treat it as text (preserves leading zeros)
    var phoneValue = data.phone || '';
    if (phoneValue) {
      phoneValue = "'" + String(phoneValue);
    }
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.guestOf || '',
      phoneValue,
      data.guests || '',
      data.attendance || '',
      data.ceremonies || '',
      data.otherRequests || '',
      data.message || ''
    ]);
    
    // Redirect to success page (avoids CORS issues)
    if (data.redirect) {
      return HtmlService.createHtmlOutput(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>RSVP Submitted</title>
            <script>
              window.top.location.href = "${data.redirect}";
            </script>
          </head>
          <body>
            <p>RSVP submitted successfully! Redirecting...</p>
          </body>
        </html>
      `);
    } else {
      // Fallback: return simple success message
      return HtmlService.createHtmlOutput('<html><body><h1>RSVP Submitted Successfully!</h1></body></html>');
    }
    
  } catch (error) {
    // Return error page
    return HtmlService.createHtmlOutput(`
      <html>
        <body>
          <h1>Error</h1>
          <p>There was an error submitting your RSVP. Please try again.</p>
          <p>Error: ${error.toString()}</p>
        </body>
      </html>
    `);
  }
}

// Optional: Function to set up the header row automatically
// Run this function once to create the header row in your sheet
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Check if headers already exist
  if (sheet.getLastRow() > 0) {
    var firstRow = sheet.getRange(1, 1, 1, 10).getValues()[0];
    if (firstRow[0] === 'Timestamp') {
      Logger.log('Headers already exist. Skipping setup.');
      return;
    }
  }
  
  // Set header row
  sheet.getRange(1, 1, 1, 10).setValues([[
    'Timestamp',
    'Name',
    'Email',
    'Guest Of',
    'Phone',
    'Number of Guests',
    'Attendance',
    'Events Attending',
    'Other Requests',
    'Message'
  ]]);
  
  // Format header row (bold, background color)
  var headerRange = sheet.getRange(1, 1, 1, 10);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');
  headerRange.setBorder(true, true, true, true, true, true);
  
  Logger.log('Headers set up successfully!');
}

// ============================================
// Google Photos Album Handler
// ============================================
// Function to fetch photos from Google Photos shared album
// Uses shared album links - no OAuth required!
function doGet(e) {
  try {
    // Handle regular API calls
    var action = e.parameter.action || '';
    
    if (action === 'getPhotos') {
      var albumToken = e.parameter.albumToken || '';
      if (!albumToken) {
        return returnJson({
          success: false,
          error: 'Album token is required',
          usage: 'Add ?action=getPhotos&albumToken=YOUR_ALBUM_TOKEN to the URL'
        });
      }
      
      // Fetch photos from Google Photos shared album
      var photos = fetchGooglePhotosFromSharedAlbum(albumToken);
      
      return returnJson({
        success: true,
        photos: photos
      });
    }
    
    // No action specified - return helpful message
    if (!action) {
      return HtmlService.createHtmlOutput(
        '<html><body>' +
        '<h1>Google Photos Shared Album Web App</h1>' +
        '<p>This web app extracts photos from shared Google Photos albums.</p>' +
        '<h2>Available Actions:</h2>' +
        '<ul>' +
        '<li><strong>getPhotos</strong>: Fetch photos from a Google Photos shared album<br>' +
        'Usage: ?action=getPhotos&albumToken=YOUR_ALBUM_TOKEN</li>' +
        '</ul>' +
        '<h2>How to get album token:</h2>' +
        '<ol>' +
        '<li>Create a shared album in Google Photos</li>' +
        '<li>Get the share link (e.g., https://photos.app.goo.gl/ABC123XYZ)</li>' +
        '<li>Extract the token from the URL (e.g., ABC123XYZ)</li>' +
        '<li>Use this token in the request</li>' +
        '</ol>' +
        '</body></html>'
      );
    }
    
    return returnJson({
      success: false,
      error: 'Invalid action',
      availableActions: ['getPhotos'],
      usage: 'Add ?action=getPhotos&albumToken=YOUR_ALBUM_TOKEN to the URL'
    });
    
  } catch (error) {
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// OAuth code removed - using shared album links instead

// ============================================
// GOOGLE PHOTOS SHARED ALBUM FUNCTIONS
// ============================================
// Helper function to fetch photos from Google Photos shared album
// Uses shared album link - no OAuth required!
function fetchGooglePhotosFromSharedAlbum(albumToken) {
  try {
    // Construct the shared album URL
    // Google Photos shared albums use: https://photos.app.goo.gl/TOKEN
    var albumUrl = 'https://photos.app.goo.gl/' + albumToken;
    
    Logger.log('Fetching photos from shared album: ' + albumUrl);
    
    // Fetch the album page
    var options = {
      'method': 'get',
      'followRedirects': true,
      'muteHttpExceptions': true
    };
    
    var response = UrlFetchApp.fetch(albumUrl, options);
    var responseCode = response.getResponseCode();
    var html = response.getContentText();
    
    if (responseCode !== 200) {
      Logger.log('ERROR: Failed to fetch album page. Response code: ' + responseCode);
      return [];
    }
    
    // Extract photo URLs from the HTML
    // Google Photos shared albums embed photo data in the page
    // Look for image URLs in the page content
    var photoUrls = [];
    
    // Helper function to clean and add URL
    function addPhotoUrl(url) {
      if (!url || url.indexOf('googleusercontent.com') === -1) {
        return;
      }
      
      // Ensure URL has proper protocol (https://)
      // Handle protocol-relative URLs (//lh3.googleusercontent.com/...)
      if (url.indexOf('//') === 0 && url.indexOf('http') !== 0) {
        url = 'https:' + url;
      } else if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
        // If URL doesn't start with http:// or https://, add https://
        url = 'https://' + url;
      }
      
      // Remove query params that might interfere
      var cleanUrl = url.split('?')[0];
      
      // Add size parameter for better quality if not present
      if (cleanUrl.indexOf('=') === -1) {
        cleanUrl = cleanUrl + '=w2048-h2048';
      }
      
      // Avoid duplicates
      if (photoUrls.indexOf(cleanUrl) === -1) {
        photoUrls.push(cleanUrl);
      }
    }
    
    // Method 1: Try to extract from script tags with JSON data
    // Google Photos often embeds photo data in script tags
    var scriptMatches = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
    if (scriptMatches) {
      for (var i = 0; i < scriptMatches.length; i++) {
        var scriptContent = scriptMatches[i];
        
        // Look for various URL patterns in script tags
        var urlPatterns = [
          // Direct URLs with https://
          /https:\/\/[^"'\s]*lh3\.googleusercontent\.com[^"'\s]*/gi,
          /https:\/\/[^"'\s]*lh[0-9]\.googleusercontent\.com[^"'\s]*/gi,
          /https:\/\/[^"'\s]*googleusercontent\.com[^"'\s]*/gi,
          // Protocol-relative URLs (//lh3...)
          /\/\/lh3\.googleusercontent\.com[^"'\s]*/gi,
          /\/\/lh[0-9]\.googleusercontent\.com[^"'\s]*/gi,
          /\/\/[^"'\s]*googleusercontent\.com[^"'\s]*/gi,
          // JSON patterns
          /"url"\s*:\s*"([^"]*googleusercontent[^"]*)"/gi,
          /"baseUrl"\s*:\s*"([^"]*)"/gi,
          /"image"\s*:\s*"([^"]*googleusercontent[^"]*)"/gi,
          /"thumbnail"\s*:\s*"([^"]*googleusercontent[^"]*)"/gi,
          // Array patterns
          /\["https:\/\/[^"]*googleusercontent[^"]*"\]/gi,
          /\["\/\/[^"]*googleusercontent[^"]*"\]/gi
        ];
        
        for (var p = 0; p < urlPatterns.length; p++) {
          var matches = scriptContent.match(urlPatterns[p]);
          if (matches) {
            for (var m = 0; m < matches.length; m++) {
              var match = matches[m];
              
              // Handle JSON arrays
              if (match.indexOf('[') === 0) {
                try {
                  var urls = JSON.parse(match);
                  for (var u = 0; u < urls.length; u++) {
                    addPhotoUrl(urls[u]);
                  }
                } catch (e) {
                  // Not valid JSON, try as string
                  var url = match.replace(/^\["|"\]$/g, '').replace(/^"|"$/g, '');
                  addPhotoUrl(url);
                }
              } else {
                // Extract URL from match (handle capture groups)
                var url = match;
                if (match.indexOf(':') !== -1) {
                  // JSON key-value pattern
                  var urlMatch = match.match(/:\s*"([^"]+)"/);
                  if (urlMatch && urlMatch[1]) {
                    url = urlMatch[1];
                  } else {
                    url = match.replace(/^["']|["']$/g, '').replace(/^.*?:\s*/, '');
                  }
                }
                addPhotoUrl(url);
              }
            }
          }
        }
      }
    }
    
    // Method 2: Try to extract from img tags
    var imgMatches = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
    if (imgMatches) {
      for (var j = 0; j < imgMatches.length; j++) {
        var srcMatch = imgMatches[j].match(/src=["']([^"']+)["']/i);
        if (srcMatch && srcMatch[1]) {
          addPhotoUrl(srcMatch[1]);
        }
      }
    }
    
    // Method 3: Try to extract from data attributes
    var dataMatches = html.match(/data-[^=]*=["']([^"']*googleusercontent[^"']*)["']/gi);
    if (dataMatches) {
      for (var d = 0; d < dataMatches.length; d++) {
        var dataMatch = dataMatches[d].match(/=["']([^"']+)["']/i);
        if (dataMatch && dataMatch[1]) {
          addPhotoUrl(dataMatch[1]);
        }
      }
    }
    
    // Method 4: Try to find photo IDs and construct URLs
    // Google Photos sometimes embeds photo IDs that can be used to construct URLs
    var photoIdPatterns = [
      /"photoId"\s*:\s*"([^"]+)"/gi,
      /"id"\s*:\s*"([^"]+)"/gi,
      /data-photo-id=["']([^"']+)["']/gi
    ];
    
    for (var pid = 0; pid < photoIdPatterns.length; pid++) {
      var idMatches = html.match(photoIdPatterns[pid]);
      if (idMatches) {
        Logger.log('Found ' + idMatches.length + ' potential photo IDs (not using for now)');
        // Note: Photo IDs alone aren't enough - we'd need the album context
        // This is just for logging purposes
      }
    }
    
    Logger.log('Extracted ' + photoUrls.length + ' photos from shared album');
    
    // If no photos found, log a warning
    if (photoUrls.length === 0) {
      Logger.log('WARNING: No photos found in shared album. The album may be private or the format may have changed.');
      Logger.log('Try making sure the album is publicly shared.');
    }
    
    return photoUrls;
    
  } catch (error) {
    Logger.log('Error fetching Google Photos shared album: ' + error.toString());
    Logger.log('Stack trace: ' + error.stack);
    return [];
  }
}

// ============================================
// Photo Upload Handler
// ============================================
// Function to handle photo uploads
// Photos will be uploaded to the specified Google Drive folder
function uploadPhoto(e) {
  try {
    var fileData = e.parameter.fileData || '';
    var fileName = e.parameter.fileName || 'photo.jpg';
    var folderId = e.parameter.folderId || '1XMrIeZl9sNAQuHNk43C426NDWhffDfPW'; // Default folder ID
    
    if (!fileData) {
      return returnJson({
        success: false,
        error: 'File data is required'
      });
    }
    
    // Decode base64 file data
    var fileBlob = Utilities.newBlob(Utilities.base64Decode(fileData), 'image/jpeg', fileName);
    
    // Upload to Google Drive folder
    var folder;
    try {
      // Try to get the folder by ID
      folder = DriveApp.getFolderById(folderId);
      Logger.log('Using Google Drive folder: ' + folder.getName() + ' (ID: ' + folderId + ')');
    } catch (error) {
      Logger.log('Could not access folder by ID: ' + folderId);
      Logger.log('Error: ' + error.toString());
      
      // Fallback: Try to find or create folder by name
      var folderName = 'Wedding Guest Photos';
      var folders = DriveApp.getFoldersByName(folderName);
      
      if (folders.hasNext()) {
        folder = folders.next();
        Logger.log('Using existing folder: ' + folderName);
      } else {
        folder = DriveApp.createFolder(folderName);
        Logger.log('Created new folder: ' + folderName);
      }
    }
    
    // Create file in folder
    var file = folder.createFile(fileBlob);
    
    // Make file publicly accessible (optional)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Get file URL
    var fileUrl = file.getUrl();
    var fileId = file.getId();
    
    // Log upload to sheet (optional)
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Photo Uploads');
      if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Photo Uploads');
        sheet.appendRow(['Timestamp', 'File Name', 'File ID', 'File URL', 'Folder ID']);
      }
      sheet.appendRow([new Date(), fileName, fileId, fileUrl, folderId]);
    } catch (sheetError) {
      Logger.log('Could not log to sheet: ' + sheetError.toString());
    }
    
    return returnJson({
      success: true,
      fileId: fileId,
      fileUrl: fileUrl,
      folderId: folderId,
      message: 'Photo uploaded successfully to Google Drive folder.'
    });
    
  } catch (error) {
    Logger.log('Error uploading photo: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// ============================================
// Quiz Handler Functions
// ============================================
// Main handler for quiz actions
function handleQuizAction(e) {
  try {
    var action = e.parameter.action || '';
    
    switch(action) {
      case 'startSession':
        return startQuizSession(e);
      case 'submitAnswer':
        return submitQuizAnswer(e);
      case 'endSession':
        return endQuizSession(e);
      case 'updateUserName':
        return updateQuizUserName(e);
      case 'getUserHistory':
        return getUserQuizHistory(e);
      case 'getLeaderboard':
        return getLeaderboard(e);
      case 'getActiveSessions':
        return getActiveSessions(e);
      case 'forceNextQuestion':
        return forceNextQuestion(e);
      case 'checkForcedAdvance':
        return checkForcedAdvance(e);
      case 'updateQuestionIndex':
        return updateQuestionIndex(e);
      case 'getCurrentQuestion':
        return getCurrentQuestion(e);
      case 'allowNextQuestion':
        return allowNextQuestion(e);
      case 'goToQuestion':
        return goToQuestion(e);
      case 'closeCurrentQuestion':
        return closeCurrentQuestion(e);
      case 'checkQuestionState':
        return checkQuestionState(e);
      default:
        return returnJson({
          success: false,
          error: 'Invalid quiz action'
        });
    }
  } catch (error) {
    Logger.log('Error handling quiz action: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Start a new quiz session
function startQuizSession(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var email = e.parameter.email || '';
    var name = e.parameter.name || '';
    var sessionId = e.parameter.sessionId || '';
    var totalQuestions = e.parameter.totalQuestions || '0';
    
    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return returnJson({
        success: false,
        error: 'Valid email is required'
      });
    }
    
    if (!name) {
      return returnJson({
        success: false,
        error: 'Name is required'
      });
    }
    
    if (!sessionId) {
      sessionId = 'SESSION_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    var startTime = new Date();
    
    // Append to sessions sheet
    // Column order: Session ID | Start Time | End Time | Status | Total Questions | Email | Name | Current Question Index | Last Forced Advance
    sessionsSheet.appendRow([
      sessionId,
      startTime,
      '',
      'IN_PROGRESS',
      totalQuestions,
      email,
      name,
      0, // Current Question Index (starts at 0)
      '' // Last Forced Advance timestamp
    ]);
    
    return returnJson({
      success: true,
      sessionId: sessionId
    });
  } catch (error) {
    Logger.log('Error starting quiz session: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Submit a quiz answer
function submitQuizAnswer(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var answersSheet = getOrCreateSheet(spreadsheet, 'Detailed Answers');
    var scoresSheet = getOrCreateSheet(spreadsheet, 'Player Scores');
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    var email = e.parameter.email || '';
    var name = e.parameter.name || '';
    var sessionId = e.parameter.sessionId || '';
    var questionId = e.parameter.questionId || '';
    var questionText = e.parameter.questionText || '';
    var selectedAnswer = e.parameter.selectedAnswer || '';
    var correctAnswer = e.parameter.correctAnswer || '';
    var isCorrect = e.parameter.isCorrect === 'true';
    var timeTaken = e.parameter.timeTaken || '0';
    var points = e.parameter.points || '0';
    var questionIndex = parseInt(e.parameter.questionIndex || 0);
    
    // Check if question is closed - if so, set points to 0
    var stateData = stateSheet.getDataRange().getValues();
    var questionClosed = false;
    if (stateData.length >= 2) {
      var stateRow = stateData[1];
      var currentQuestionIndex = parseInt(stateRow[0] || 0);
      var questionStatus = stateRow[2] || 'CLOSED';
      // Question is closed if status is CLOSED or if it's not the current question
      if (questionStatus === 'CLOSED' || currentQuestionIndex !== questionIndex) {
        questionClosed = true;
        points = '0'; // Force points to 0 for closed questions
      }
    }
    
    // Validate inputs
    if (!email || !sessionId || !questionId) {
      return returnJson({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Check for duplicate answer submission
    var existingAnswers = answersSheet.getDataRange().getValues();
    for (var i = 1; i < existingAnswers.length; i++) {
      if (existingAnswers[i][2] === sessionId && 
          existingAnswers[i][3] === email && 
          existingAnswers[i][4] === questionId) {
        // Duplicate submission, return success but don't add again
        return returnJson({
          success: true,
          message: 'Answer already submitted'
        });
      }
    }
    
    // Append to answers sheet
    // Column order: Timestamp | Session ID | Email | Name | Question ID | Question Text | 
    //               Selected Answer | Correct Answer | Is Correct | Time Taken (ms) | Points | Question Closed
    answersSheet.appendRow([
      new Date(),
      sessionId,
      email,
      name,
      questionId,
      questionText,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      timeTaken,
      points,
      questionClosed
    ]);
    
    // Update or create user score entry
    updateUserScore(scoresSheet, email, name, sessionId, parseInt(points), isCorrect);
    
    return returnJson({
      success: true
    });
  } catch (error) {
    Logger.log('Error submitting quiz answer: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// End a quiz session
function endQuizSession(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    var scoresSheet = getOrCreateSheet(spreadsheet, 'Player Scores');
    
    var email = e.parameter.email || '';
    var sessionId = e.parameter.sessionId || '';
    var totalScore = e.parameter.totalScore || '0';
    var totalQuestions = e.parameter.totalQuestions || '0';
    var correctAnswers = e.parameter.correctAnswers || '0';
    
    // Validate inputs
    if (!email || !sessionId) {
      return returnJson({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Get user name and start time from sessions sheet
    var userName = '';
    var startTime = null;
    var sessionsData = sessionsSheet.getDataRange().getValues();
    for (var i = 1; i < sessionsData.length; i++) {
      if (sessionsData[i][0] === sessionId && sessionsData[i][5] === email) {
        startTime = sessionsData[i][1]; // Start Time
        userName = sessionsData[i][6] || ''; // Name
        sessionsSheet.getRange(i + 1, 3).setValue(new Date()); // End Time
        sessionsSheet.getRange(i + 1, 4).setValue('COMPLETED'); // Status
        break;
      }
    }
    
    var endTime = new Date();
    
    // Update or create final score in Player Scores sheet
    var scoresData = scoresSheet.getDataRange().getValues();
    var foundInScores = false;
    for (var j = 1; j < scoresData.length; j++) {
      if (scoresData[j][0] === email && scoresData[j][2] === sessionId) {
        scoresSheet.getRange(j + 1, 4).setValue(totalScore); // Total Score
        scoresSheet.getRange(j + 1, 5).setValue(totalQuestions); // Total Questions
        scoresSheet.getRange(j + 1, 6).setValue(correctAnswers); // Correct Answers
        scoresSheet.getRange(j + 1, 7).setValue(endTime); // Completion Time
        foundInScores = true;
        break;
      }
    }
    
    // Create new entry if not found
    if (!foundInScores) {
      scoresSheet.appendRow([
        email,
        userName,
        sessionId,
        totalScore,
        totalQuestions,
        correctAnswers,
        endTime
      ]);
    }
    
    return returnJson({
      success: true,
      totalScore: totalScore,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers
    });
  } catch (error) {
    Logger.log('Error ending quiz session: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Update user's name
function updateQuizUserName(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var answersSheet = getOrCreateSheet(spreadsheet, 'Detailed Answers');
    var scoresSheet = getOrCreateSheet(spreadsheet, 'Player Scores');
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var email = e.parameter.email || '';
    var newName = e.parameter.newName || '';
    
    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return returnJson({
        success: false,
        error: 'Valid email is required'
      });
    }
    
    if (!newName) {
      return returnJson({
        success: false,
        error: 'New name is required'
      });
    }
    
    // Update name in answers sheet (recent entries only - last 100)
    var answersData = answersSheet.getDataRange().getValues();
    var updateCount = 0;
    var startRow = Math.max(1, answersData.length - 100);
    for (var i = startRow; i < answersData.length; i++) {
      if (answersData[i][2] === email) {
        answersSheet.getRange(i + 1, 4).setValue(newName); // Name column
        updateCount++;
      }
    }
    
    // Update name in scores sheet
    var scoresData = scoresSheet.getDataRange().getValues();
    for (var j = 1; j < scoresData.length; j++) {
      if (scoresData[j][0] === email) {
        scoresSheet.getRange(j + 1, 2).setValue(newName); // Name column
      }
    }
    
    // Update name in sessions sheet
    var sessionsData = sessionsSheet.getDataRange().getValues();
    for (var k = 1; k < sessionsData.length; k++) {
      if (sessionsData[k][5] === email) {
        sessionsSheet.getRange(k + 1, 7).setValue(newName); // Name column
      }
    }
    
    return returnJson({
      success: true,
      updatedEntries: updateCount
    });
  } catch (error) {
    Logger.log('Error updating user name: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Get user's quiz history
function getUserQuizHistory(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var scoresSheet = getOrCreateSheet(spreadsheet, 'Player Scores');
    
    var email = e.parameter.email || '';
    
    // Validate inputs
    if (!email || !isValidEmail(email)) {
      return returnJson({
        success: false,
        error: 'Valid email is required'
      });
    }
    
    // Get user's scores
    var scoresData = scoresSheet.getDataRange().getValues();
    var userHistory = [];
    
    for (var i = 1; i < scoresData.length; i++) {
      if (scoresData[i][0] === email) {
        userHistory.push({
          sessionId: scoresData[i][2],
          name: scoresData[i][1],
          totalScore: scoresData[i][3],
          totalQuestions: scoresData[i][4],
          correctAnswers: scoresData[i][5],
          completionTime: scoresData[i][6]
        });
      }
    }
    
    return returnJson({
      success: true,
      history: userHistory
    });
  } catch (error) {
    Logger.log('Error getting user history: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Get leaderboard
function getLeaderboard(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var scoresSheet = getOrCreateSheet(spreadsheet, 'Player Scores');
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var leaderboard = [];
    var leaderboardMap = {}; // Use map to combine scores from both sheets
    
    // Get completed scores from Player Scores sheet
    // Column order: Email | Name | Session ID | Total Score | Total Questions | Correct Answers | Completion Time
    var scoresData = scoresSheet.getDataRange().getValues();
    
    // Skip header row (row 1)
    for (var i = 1; i < scoresData.length; i++) {
      var row = scoresData[i];
      
      // Include entries with completion time (completed quizzes)
      if (row[6]) { // Completion Time column (index 6)
        var email = row[0] || '';
        var key = email; // Use email as key
        
        leaderboardMap[key] = {
          email: email,
          name: row[1] || 'Anonymous',
          sessionId: row[2] || '',
          totalScore: parseInt(row[3] || 0),
          totalQuestions: parseInt(row[4] || 0),
          correctAnswers: parseInt(row[5] || 0),
          isCompleted: true
        };
      }
    }
    
    // Get in-progress sessions from Sessions sheet
    // Column order: Session ID | Start Time | End Time | Status | Total Questions | Email | Name | Current Question Index | Last Forced Advance
    var sessionsData = sessionsSheet.getDataRange().getValues();
    
    // Skip header row (row 1)
    for (var j = 1; j < sessionsData.length; j++) {
      var sessionRow = sessionsData[j];
      
      // Only include IN_PROGRESS sessions
      if (sessionRow[3] === 'IN_PROGRESS') {
        var sessionEmail = sessionRow[5] || '';
        var key = sessionEmail;
        
        // Get current score from Player Scores for this session (if exists)
        var currentScore = 0;
        var currentQuestions = 0;
        var currentCorrect = 0;
        
        // Look for existing score entry for this session
        for (var k = 1; k < scoresData.length; k++) {
          if (scoresData[k][0] === sessionEmail && scoresData[k][2] === sessionRow[0]) {
            currentScore = parseInt(scoresData[k][3] || 0);
            currentQuestions = parseInt(scoresData[k][4] || 0);
            currentCorrect = parseInt(scoresData[k][5] || 0);
            break;
          }
        }
        
        // Always update/overwrite with in-progress session data
        // This ensures in-progress sessions are always shown with their latest scores
        leaderboardMap[key] = {
          email: sessionEmail,
          name: sessionRow[6] || 'Anonymous',
          sessionId: sessionRow[0] || '',
          totalScore: currentScore,
          totalQuestions: parseInt(sessionRow[4] || 0),
          correctAnswers: currentCorrect,
          isCompleted: false
        };
      }
    }
    
    // Convert map to array
    for (var key in leaderboardMap) {
      leaderboard.push(leaderboardMap[key]);
    }
    
    // Sort by total score (descending), then by correct answers
    leaderboard.sort(function(a, b) {
      // First sort by total score
      if (b.totalScore !== a.totalScore) {
        return b.totalScore - a.totalScore;
      }
      // Then by correct answers
      return b.correctAnswers - a.correctAnswers;
    });
    
    // Limit to top 50 entries
    if (leaderboard.length > 50) {
      leaderboard = leaderboard.slice(0, 50);
    }
    
    return returnJson({
      success: true,
      leaderboard: leaderboard
    });
  } catch (error) {
    Logger.log('Error getting leaderboard: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Helper function to get or create a sheet
function getOrCreateSheet(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    
    // Set up headers based on sheet name
    if (sheetName === 'Sessions') {
      // Sessions table: Session tracking
      sheet.appendRow(['Session ID', 'Start Time', 'End Time', 'Status', 'Total Questions', 'Email', 'Name', 'Current Question Index', 'Last Forced Advance']);
    } else if (sheetName === 'Quiz State') {
      // Quiz State table: Current question tracking
      sheet.appendRow(['Current Question Index', 'Current Question Text', 'Question Status', 'Last Updated', 'Game Start Status']);
      // Initialize with first question, game start status = 0 (not started)
      sheet.appendRow([0, '', 'CLOSED', new Date(), 0]);
    } else if (sheetName === 'Detailed Answers') {
      // Detailed Answers table: Individual answer submissions
      sheet.appendRow(['Timestamp', 'Session ID', 'Email', 'Name', 'Question ID', 'Question Text', 
                       'Selected Answer', 'Correct Answer', 'Is Correct', 'Time Taken (ms)', 'Points', 'Question Closed']);
    } else if (sheetName === 'Player Scores') {
      // Player Scores table: Final scores per session
      sheet.appendRow(['Email', 'Name', 'Session ID', 'Total Score', 'Total Questions', 
                       'Correct Answers', 'Completion Time']);
    }
    
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f0f0f0');
    headerRange.setBorder(true, true, true, true, true, true);
  }
  
  return sheet;
}

// Helper function to update user score
function updateUserScore(scoresSheet, email, name, sessionId, points, isCorrect) {
  var scoresData = scoresSheet.getDataRange().getValues();
  var found = false;
  
  // Look for existing entry
  for (var i = 1; i < scoresData.length; i++) {
    if (scoresData[i][0] === email && scoresData[i][2] === sessionId) {
      // Update existing entry
      var currentScore = scoresData[i][3] || 0;
      var currentQuestions = scoresData[i][4] || 0;
      var currentCorrect = scoresData[i][5] || 0;
      
      scoresSheet.getRange(i + 1, 3).setValue(sessionId); // Session ID
      scoresSheet.getRange(i + 1, 4).setValue(parseInt(currentScore) + points); // Total Score
      scoresSheet.getRange(i + 1, 5).setValue(parseInt(currentQuestions) + 1); // Total Questions
      scoresSheet.getRange(i + 1, 6).setValue(parseInt(currentCorrect) + (isCorrect ? 1 : 0)); // Correct Answers
      
      found = true;
      break;
    }
  }
  
  // Create new entry if not found
  if (!found) {
    scoresSheet.appendRow([
      email,
      name,
      sessionId,
      points,
      1,
      isCorrect ? 1 : 0,
      ''
    ]);
  }
}

// Helper function to validate email
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get active sessions
function getActiveSessions(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var sessionsData = sessionsSheet.getDataRange().getValues();
    var activeSessions = [];
    
    // Skip header row (row 1)
    // Column order: Session ID | Start Time | End Time | Status | Total Questions | Email | Name | Current Question Index | Last Forced Advance
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      
      // Check if session is in progress
      if (row[3] === 'IN_PROGRESS') {
        activeSessions.push({
          sessionId: row[0] || '',
          email: row[5] || '',
          name: row[6] || 'Anonymous',
          startTime: row[1] ? row[1].getTime() : Date.now(),
          totalQuestions: parseInt(row[4] || 0),
          currentQuestionIndex: parseInt(row[7] || 0),
          lastForcedAdvance: row[8] || null
        });
      }
    }
    
    return returnJson({
      success: true,
      sessions: activeSessions
    });
  } catch (error) {
    Logger.log('Error getting active sessions: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Force all active sessions to next question
function forceNextQuestion(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var sessionsData = sessionsSheet.getDataRange().getValues();
    var advancedCount = 0;
    var forcedTime = new Date();
    
    // Skip header row (row 1)
    // Column order: Session ID | Start Time | End Time | Status | Total Questions | Email | Name | Current Question Index | Last Forced Advance
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      
      // Check if session is in progress
      if (row[3] === 'IN_PROGRESS') {
        var currentIndex = parseInt(row[7] || 0);
        var totalQuestions = parseInt(row[4] || 0);
        
        // Only advance if not at the last question
        if (currentIndex < totalQuestions - 1) {
          // Increment current question index (column 8, index 7)
          sessionsSheet.getRange(i + 1, 8).setValue(currentIndex + 1);
          // Update last forced advance timestamp (column 9, index 8)
          sessionsSheet.getRange(i + 1, 9).setValue(forcedTime);
          advancedCount++;
        }
      }
    }
    
    return returnJson({
      success: true,
      advancedCount: advancedCount,
      timestamp: forcedTime.getTime()
    });
  } catch (error) {
    Logger.log('Error forcing next question: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Update question index (called by client when moving to next question)
function updateQuestionIndex(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var sessionId = e.parameter.sessionId || '';
    var email = e.parameter.email || '';
    var questionIndex = parseInt(e.parameter.questionIndex || 0);
    
    if (!sessionId || !email) {
      return returnJson({
        success: false,
        error: 'Session ID and email are required'
      });
    }
    
    var sessionsData = sessionsSheet.getDataRange().getValues();
    
    // Find the session and update question index
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      
      if (row[0] === sessionId && row[5] === email && row[3] === 'IN_PROGRESS') {
        // Update current question index (column 8, index 7)
        sessionsSheet.getRange(i + 1, 8).setValue(questionIndex);
        
        return returnJson({
          success: true,
          questionIndex: questionIndex
        });
      }
    }
    
    return returnJson({
      success: false,
      error: 'Session not found'
    });
  } catch (error) {
    Logger.log('Error updating question index: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Check if session should advance (called by client)
function checkForcedAdvance(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    
    var sessionId = e.parameter.sessionId || '';
    var email = e.parameter.email || '';
    var clientQuestionIndex = parseInt(e.parameter.currentQuestionIndex || 0);
    
    if (!sessionId || !email) {
      return returnJson({
        success: false,
        error: 'Session ID and email are required'
      });
    }
    
    var sessionsData = sessionsSheet.getDataRange().getValues();
    
    // Find the session
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      
      if (row[0] === sessionId && row[5] === email && row[3] === 'IN_PROGRESS') {
        var serverQuestionIndex = parseInt(row[7] || 0);
        var lastForcedAdvance = row[8];
        
        // If server index is ahead of client index, client should advance
        if (serverQuestionIndex > clientQuestionIndex) {
          return returnJson({
            success: true,
            shouldAdvance: true,
            targetQuestionIndex: serverQuestionIndex,
            lastForcedAdvance: lastForcedAdvance ? lastForcedAdvance.getTime() : null
          });
        }
        
        return returnJson({
          success: true,
          shouldAdvance: false,
          currentQuestionIndex: serverQuestionIndex
        });
      }
    }
    
    return returnJson({
      success: false,
      error: 'Session not found'
    });
  } catch (error) {
    Logger.log('Error checking forced advance: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Get current question state
function getCurrentQuestion(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    // Get current state (row 2, since row 1 is header)
    var stateData = stateSheet.getDataRange().getValues();
    if (stateData.length < 2) {
      return returnJson({
        success: true,
        currentQuestionIndex: 0,
        currentQuestionText: '',
        questionStatus: 'CLOSED',
        gameStartStatus: 0
      });
    }
    
    var row = stateData[1]; // Row 2 (index 1)
    // Handle backward compatibility - if column doesn't exist, default to 0 (game not started)
    // CRITICAL: Check if value exists (not undefined/null), not if it's truthy (0 is falsy!)
    var gameStartStatus = 0; // Default to 0 (not started)
    if (row.length > 4 && row[4] !== null && row[4] !== undefined && row[4] !== '') {
      gameStartStatus = parseInt(row[4]);
    }
    return returnJson({
      success: true,
      currentQuestionIndex: parseInt(row[0] || 0),
      currentQuestionText: row[1] || '',
      questionStatus: row[2] || 'CLOSED',
      lastUpdated: row[3] ? row[3].getTime() : null,
      gameStartStatus: gameStartStatus
    });
  } catch (error) {
    Logger.log('Error getting current question: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Allow next question (advance all sessions and open new question)
function allowNextQuestion(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    // Get current question index from state
    var stateData = stateSheet.getDataRange().getValues();
    var currentIndex = 0;
    if (stateData.length >= 2) {
      currentIndex = parseInt(stateData[1][0] || 0);
    }
    
    var newIndex = currentIndex + 1;
    // Question text is not needed - it's already in the TSV file loaded client-side
    
    // IMPORTANT: Update quiz state FIRST (atomically) before updating sessions
    // This ensures status is OPEN when users check, even if session updates are still processing
    var now = new Date();
    // Preserve game start status (don't change it when advancing questions)
    var currentGameStartStatus = 0; // Default to 0 (not started)
    if (stateData.length >= 2) {
      var row = stateData[1];
      // CRITICAL: Check if value exists (not undefined/null), not if it's truthy (0 is falsy!)
      if (row.length > 4 && row[4] !== null && row[4] !== undefined && row[4] !== '') {
        currentGameStartStatus = parseInt(row[4]);
      }
    }
    
    // Ensure we have 5 columns for Game Start Status
    var numCols = stateSheet.getLastColumn();
    if (numCols < 5) {
      stateSheet.insertColumnAfter(4);
      stateSheet.getRange(1, 5).setValue('Game Start Status');
    }
    
    if (stateData.length < 2) {
      stateSheet.appendRow([newIndex, '', 'OPEN', now, currentGameStartStatus]);
    } else {
      // Update all state fields in a single operation for atomicity, preserving game start status
      stateSheet.getRange(2, 1, 1, 5).setValues([[newIndex, '', 'OPEN', now, currentGameStartStatus]]);
    }
    
    // Now update all active sessions
    var sessionsData = sessionsSheet.getDataRange().getValues();
    var advancedCount = 0;
    
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      if (row[3] === 'IN_PROGRESS') {
        var totalQuestions = parseInt(row[4] || 0);
        if (newIndex < totalQuestions) {
          sessionsSheet.getRange(i + 1, 8).setValue(newIndex);
          advancedCount++;
        }
      }
    }
    
    return returnJson({
      success: true,
      advancedCount: advancedCount,
      newQuestionIndex: newIndex
    });
  } catch (error) {
    Logger.log('Error allowing next question: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Go to specific question (jump to any question number)
function goToQuestion(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sessionsSheet = getOrCreateSheet(spreadsheet, 'Sessions');
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    var targetIndex = parseInt(e.parameter.questionIndex || 0);
    var restartGame = e.parameter.restartGame === 'true'; // Check if this is a restart
    
    // Update all sessions (both IN_PROGRESS and COMPLETED if restarting)
    var sessionsData = sessionsSheet.getDataRange().getValues();
    var updatedCount = 0;
    
    for (var i = 1; i < sessionsData.length; i++) {
      var row = sessionsData[i];
      var sessionStatus = row[3]; // Status column
      
      // Update IN_PROGRESS sessions always, or COMPLETED sessions if restarting
      var shouldUpdate = false;
      if (sessionStatus === 'IN_PROGRESS') {
        shouldUpdate = true;
      } else if (restartGame && sessionStatus === 'COMPLETED') {
        shouldUpdate = true;
      }
      
      if (shouldUpdate) {
        var totalQuestions = parseInt(row[4] || 0);
        // When restarting, always update to question 0. Otherwise, check if target is within valid range.
        var shouldUpdateIndex = false;
        if (restartGame) {
          // Force update when restarting (always go to question 0)
          shouldUpdateIndex = (targetIndex >= 0);
        } else {
          // Normal update: check if target index is within valid range
          shouldUpdateIndex = (targetIndex >= 0 && targetIndex < totalQuestions);
        }
        
        if (shouldUpdateIndex) {
          // Update question index (column 8, index 7)
          sessionsSheet.getRange(i + 1, 8).setValue(targetIndex);
          
          // If restarting and session was completed, reset it to IN_PROGRESS
          if (restartGame && sessionStatus === 'COMPLETED') {
            sessionsSheet.getRange(i + 1, 3).setValue(''); // Clear End Time
            sessionsSheet.getRange(i + 1, 4).setValue('IN_PROGRESS'); // Reset Status
          }
          
          updatedCount++;
        }
      }
    }
    
    // Update quiz state - open the selected question (atomically)
    var stateData = stateSheet.getDataRange().getValues();
    var now = new Date();
    var gameStartStatus = 1; // When going to question (start game), set status to 1
    if (restartGame) {
      gameStartStatus = 0; // When restarting, set status to 0
    }
    
    // Check if Game Start Status column exists, if not, add it
    var headerRow = stateSheet.getRange(1, 1, 1, stateSheet.getLastColumn()).getValues()[0];
    var hasGameStartStatusColumn = headerRow.length >= 5 && headerRow[4] === 'Game Start Status';
    
    if (!hasGameStartStatusColumn && stateData.length >= 2) {
      // Add the column header
      stateSheet.getRange(1, 5).setValue('Game Start Status');
    }
    
    if (stateData.length < 2) {
      stateSheet.appendRow([targetIndex, '', 'OPEN', now, gameStartStatus]);
    } else {
      // Update all state fields in a single operation for atomicity
      // Ensure we have 5 columns
      var numCols = Math.max(5, stateSheet.getLastColumn());
      if (numCols < 5) {
        stateSheet.insertColumnAfter(4);
        stateSheet.getRange(1, 5).setValue('Game Start Status');
      }
      stateSheet.getRange(2, 1, 1, 5).setValues([[targetIndex, '', 'OPEN', now, gameStartStatus]]);
    }
    
    return returnJson({
      success: true,
      updatedCount: updatedCount,
      questionIndex: targetIndex
    });
  } catch (error) {
    Logger.log('Error going to question: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Close current question
function closeCurrentQuestion(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    var stateData = stateSheet.getDataRange().getValues();
    if (stateData.length < 2) {
      return returnJson({
        success: false,
        error: 'No question state found'
      });
    }
    
    // Update status to CLOSED (preserve game start status)
    var row = stateData[1];
    var currentGameStartStatus = 0; // Default to 0 (not started)
    // CRITICAL: Check if value exists (not undefined/null), not if it's truthy (0 is falsy!)
    if (row.length > 4 && row[4] !== null && row[4] !== undefined && row[4] !== '') {
      currentGameStartStatus = parseInt(row[4]);
    }
    
    // Ensure we have 5 columns for Game Start Status
    var numCols = stateSheet.getLastColumn();
    if (numCols < 5) {
      stateSheet.insertColumnAfter(4);
      stateSheet.getRange(1, 5).setValue('Game Start Status');
    }
    
    stateSheet.getRange(2, 3).setValue('CLOSED'); // Status
    stateSheet.getRange(2, 4).setValue(new Date()); // Last Updated
    stateSheet.getRange(2, 5).setValue(currentGameStartStatus); // Preserve Game Start Status
    
    return returnJson({
      success: true,
      message: 'Current question closed'
    });
  } catch (error) {
    Logger.log('Error closing current question: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Check question state (called by client)
function checkQuestionState(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var stateSheet = getOrCreateSheet(spreadsheet, 'Quiz State');
    
    var questionIndex = parseInt(e.parameter.questionIndex || 0);
    
    // Force fresh read - clear any potential cache by reading specific range
    // Read row 2 (index 1) directly to ensure we get the latest value
    var lastRow = stateSheet.getLastRow();
    if (lastRow < 2) {
      return returnJson({
        success: true,
        isOpen: false,
        questionStatus: 'CLOSED',
        currentQuestionIndex: 0,
        gameStartStatus: 0
      });
    }
    
    // Read row 2 directly (more reliable than getDataRange which might cache)
    var row2 = stateSheet.getRange(2, 1, 1, stateSheet.getLastColumn()).getValues()[0];
    
    var currentQuestionIndex = parseInt(row2[0] || 0);
    var questionStatus = row2[2] || 'CLOSED';
    
    // Handle backward compatibility - if column doesn't exist, default to 0 (game not started)
    // CRITICAL: Check if value exists (not undefined/null), not if it's truthy (0 is falsy!)
    var gameStartStatus = 0; // Default to 0 (not started)
    if (row2.length > 4 && row2[4] !== null && row2[4] !== undefined && row2[4] !== '') {
      var rawValue = row2[4];
      gameStartStatus = parseInt(rawValue);
      // Additional validation - if parseInt returns NaN, default to 0
      if (isNaN(gameStartStatus)) {
        gameStartStatus = 0;
      }
    }
    
    var isOpen = (currentQuestionIndex === questionIndex && questionStatus === 'OPEN');
    
    return returnJson({
      success: true,
      isOpen: isOpen,
      questionStatus: questionStatus,
      currentQuestionIndex: currentQuestionIndex,
      gameStartStatus: gameStartStatus
    });
  } catch (error) {
    Logger.log('Error checking question state: ' + error.toString());
    return returnJson({
      success: false,
      error: error.toString()
    });
  }
}

// Setup function to create all quiz sheets with headers
function setupQuizSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Create all required sheets (4 tables)
  getOrCreateSheet(spreadsheet, 'Sessions');
  getOrCreateSheet(spreadsheet, 'Player Scores');
  getOrCreateSheet(spreadsheet, 'Detailed Answers');
  getOrCreateSheet(spreadsheet, 'Quiz State');
  
  Logger.log('Quiz sheets set up successfully!');
  Logger.log('Created sheets: Sessions, Player Scores, Detailed Answers, Quiz State');
}


