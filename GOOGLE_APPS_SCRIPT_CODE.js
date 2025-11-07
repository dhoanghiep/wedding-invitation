// Google Apps Script Code for RSVP Form Handler and Google Photos Integration
// Copy this entire code into your Google Apps Script editor
//
// IMPORTANT: Set up your Google Sheet with the following header row (first row):
// Timestamp | Name | Email | Guest Of | Phone | Number of Guests | Attendance | Events Attending | Other Requests | Message
//
// Instructions:
// 1. Create a new Google Sheet
// 2. Add the header row in the first row (see above)
// 3. Copy this code into Google Apps Script (script.google.com)
// 4. Deploy as a web app with "Execute as: Me" and "Who has access: Anyone"
// 5. Copy the web app URL and paste it into config.js as GOOGLE_SCRIPT_URL
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
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.guestOf || '',
      data.phone || '',
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


