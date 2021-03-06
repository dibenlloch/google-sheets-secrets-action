const core = require('@actions/core');
const {JWT} = require('google-auth-library');
const {google} = require('googleapis');
const sheets = google.sheets('v4');


async function googleSheetsSecrets(googleAuth,sheetId,sheetTab) {
  core.info(`Loading values from ${sheetTab}`)
  try {
    await sheets.spreadsheets.values.get({
      auth: googleAuth,
      spreadsheetId: sheetId,
      range: sheetTab,
    }).then(response => {
      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        throw Error('No secrets found');
      }
      else {
        for (const row of rows) {
          if (row[0] && row[1]) {
            core.setSecret(row[1]);
            core.exportVariable(row[0], row[1]);
          }
        }
      }
    });
  } catch(err) {
    throw err;
  }
}


async function run() {
  try { 
    const auth_private_key = core.getInput('auth-private-key');
    const auth_client_email = core.getInput('auth-client-email');
    const sheetId = core.getInput('spreadsheet');
    var sheetTab = core.getInput('sheet');
    if (sheetTab) {
      sheetTab=`${sheetTab}!A:B`
    } else {
      sheetTab="A:B";
    }
    const googleAuth = new JWT(
      auth_client_email,
      null,
      auth_private_key,
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    await googleSheetsSecrets(googleAuth,sheetId,sheetTab);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
