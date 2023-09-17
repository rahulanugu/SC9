const mysql = require('mysql');
/**
 * Interface for MySQL DB functionality.
 * Includes a connection variable, as well as methods for getting, adding, 
 * updating, and deleting data in the db.
 */

/* DB connection instance */

 var connection = mysql.createPool({
    host: 'database-1.cgurbeaohou6.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Scriptchain21!',
    database: 'scriptchain'
  });
  
/* General helpers */

// JSON response generator to pass DB responses up to controllers
function jsonResponse(code, message, body={}) {
  return {'statusCode': code, 'message': message, 'body': body}
}

// Synchronous SQL query wrapper; extracts the result of an SQL query from its callback function into a JS Promise
function queryDB(query, data) {
  return new Promise((resolve) => {
    connection.query(query, data, (err, data) => {
      console.log('DB err is ', err);
      if (err) return resolve(jsonResponse(500, 'DB Error'));
      resolve(jsonResponse(200, 'Success', data));
    });
  });
}

/**
 * DB helpers 
 * Each helper returns a JavaScript Promise. The promise can be consumed asynchronously from the controllers.
 * Response (jsonResponse) objects passed up to controller to be used in API response; { statusCode, message, body }
 * The data from a successful SQL query (statusCode = 200) is located in the response body
 */ 

async function getAllRowsFromTable(table) {
  const query = 'SELECT * FROM ??';
  const data = [table];
  const response = await queryDB(query, data);
  return response;
}

async function getRowFromTableWhere(table, where = {email: ''}) {
  const query = 'SELECT * FROM ?? WHERE ??=?';
  const data = [table];
  for (const key in where) {
    data.push(key);
    data.push(where[key]);
    break;
  }

  const response = new Promise((resolve) => {
    connection.query(query, data, (err, rows) => {
      if (err) return resolve(jsonResponse(500, 'DB Error'));
      if (rows.length === 0) return resolve(jsonResponse(404, 'DB object not found'));
      resolve(jsonResponse(200, 'Success', rows[0]));
    });
  });
  return response;
}

async function getRowByEmail(table, userEmail) {
  return getRowFromTableWhere(table, {'email': userEmail});
}

async function getRowByEmail_(table, userEmail) {
  return getRowFromTableWhere(table, {'Email': userEmail});
}

async function getRowByID(table, _id) {
  return getRowFromTableWhere(table, {'_id': _id});
}

async function checkForUserInDB(table, userEmail) {
  const response = await getRowByEmail(table, userEmail);
  if (response.length === 200) {
    return response.body.length !== 0;
  }
  return false;
}

async function deleteUserFromDB(table, userEmail) {
  const query = 'DELETE FROM ?? WHERE email=? ORDER BY _id LIMIT 1';
  const data = [table, userEmail];
  const response = await queryDB(query, data);
  return response;
}

async function deleteUserFromDB_(table, userEmail) {
  const query = 'DELETE FROM ?? WHERE Email=? ORDER BY _id LIMIT 1';
  const data = [table, userEmail];
  const response = await queryDB(query, data);
  return response;
}

async function insertUserIntoDB(table, user) {
  let query = 'INSERT INTO ?? (';
  let values = ' VALUES ('
  const data1 = [];
  const data2 = [];
  for (const key in user) {
    query += '??,';
    values += '?,';
    data1.push(key);
    data2.push(user[key]);
  }
  if (data1.length == 0) return jsonResponse(400, 'User object must not be empty.');
  
  query = query.slice(0, query.length - 1) + ')' + values.slice(0, values.length - 1) + ')';
  const data = [table, ...data1, ...data2];

  const response = await queryDB(query, data);
  return response;
}

async function updateUserInfoInDB(table, user) {
  const data = [table];
  let query = 'UPDATE ?? SET ';
  for (const key in user) {
    if (key == '_id' || user[key] === null) continue;
    data.push(key);
    data.push(user[key]);
    query += '??=?, ';
  }
  if (data.length <= 1) return jsonResponse(400, 'User object must not be empty.');

  query = query.slice(0, query.length - 2) + ' WHERE _id=?';
  data.push(user._id);
  
  const response = await queryDB(query, data);
  return response;
}

module.exports.getAllRowsFromTable = getAllRowsFromTable;
module.exports.getRowFromTableWhere = getRowFromTableWhere;
module.exports.getRowByEmail = getRowByEmail;
module.exports.getRowByEmail_ = getRowByEmail_;
module.exports.getRowByID = getRowByID;
module.exports.checkForUserInDB = checkForUserInDB;
module.exports.deleteUserFromDB = deleteUserFromDB;
module.exports.deleteUserFromDB_ = deleteUserFromDB_;
module.exports.insertUserIntoDB = insertUserIntoDB;
module.exports.updateUserInfoInDB = updateUserInfoInDB;