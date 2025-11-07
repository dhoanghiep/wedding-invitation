// Google Apps Script Code for RSVP Form Handler
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

function doPost(e) {
  try {
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

