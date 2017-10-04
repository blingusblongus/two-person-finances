function addItem(description, lukeValue) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var lastRow = sheet.getLastRow();
  var date = new Date();

  var contents = [date, description, lukeValue, -lukeValue];

  sheet.appendRow(contents);
}

function doGet(){
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function getStartingValues(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var lukeValue = sheet.getRange('C1').getValue();
  var nickValue = sheet.getRange('D1').getValue();
  var content = [lukeValue.toFixed(2), nickValue.toFixed(2)];

  return content;
}
