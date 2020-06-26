const dbConfig = require("../config/db_config");
const JWTSecret = require("../config").JWT_SECRET;

const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const db = require("serverless-mysql")(dbConfig);

// Wrap the result of all handlers with this function
function wrapResponse(jsonData = null, statusCode = 200, error = null) {
  let response = {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({
      status: error ? false : true,
      result: { ...jsonData },
      error,
    }),
  };
  return response;
}

// Generate Json Web Token
// returns: token or throws error
async function generateJWT(user) {
  try {
    let token = jwt.sign(
      {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
      JWTSecret,
      { expiresIn: 60 * 60 * 24 * 365 }
    );
    return token;
  } catch (error) {
    throw error;
  }
}

// Verify Json Web Token
// returns: An array, [isVerified, decodedUser]
async function verifyJWT(event) {
  let token = event.headers.Authorization
    ? event.headers.Authorization.replace("Bearer ", "")
    : null;

  if (!token) return [false, undefined];

  try {
    const decodedUser = jwt.verify(token);
    return [true, decodedUser];
  } catch (error) {
    return [false, undefined];
  }
}

// Get results from any table. Can quey with 1 or 2 fields
// returns: array of results or throws error
async function get(table, field1, value1, field2, value2) {
  let sql = "";
  let params = [];

  if (field2 && value2) {
    sql = `SELECT * FROM ${table} WHERE is_deleted = 0 AND ${field1} = ? AND ${field2} = ?`;
    params = [value1, value2];
  } else {
    sql = `SELECT * FROM ${table} WHERE is_deleted = 0 AND ${field1} = ?`;
    params = [value1];
  }

  try {
    let results = await db.query(sql, params);
    await db.end();
    return results;
  } catch (error) {
    throw error;
  }
}

// Insert user to the users table
// returns: Object of the user inserted or throws error
async function addUser(data) {
  let sql = `
  INSERT INTO users (fullname, email, password, created_at, updated_at)
  VALUES(?, ?, ?, ?, ?);
  `;

  let presentDate = moment().format("DD-MM-YYYY HH:mm:ss");

  const hash = await bcrypt.hash(data.password, 8);

  let params = [data.fullname, data.email, hash, presentDate, presentDate];

  try {
    await db.query(sql, params);
    await db.end();

    let results = await db.query(
      "SELECT * FROM users WHERE id=(SELECT LAST_INSERT_ID())"
    );
    await db.end();
    return results[0];
  } catch (error) {
    throw error;
  }
}

export { wrapResponse, generateJWT, verifyJWT, get, addUser };
