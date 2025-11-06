// Google Apps Script Code for RSVP Form Handler
// Copy this entire code into your Google Apps Script editor

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse form data from POST request
    var data = {
      name: e.parameter.name || '',
      email: e.parameter.email || '',
      attendance: e.parameter.attendance || '',
      guests: e.parameter.guests || '',
      dietary: e.parameter.dietary || '',
      message: e.parameter.message || '',
      redirect: e.parameter.redirect || ''
    };
    
    // Append row with RSVP data
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.attendance || '',
      data.guests || '',
      data.dietary || '',
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

