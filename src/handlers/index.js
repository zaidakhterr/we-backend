const {
  wrapResponse,
  generateJWT,
  verifyJWT,
  verifyPassword,
  get,
  addUser,
} = require("../db");

// Dummy handler
async function hello(event, context) {
  console.log({ event, context });
  return wrapResponse({ status: true, message: "Hello World" });
}

// *************
// AUTH HANDLERS
// *************

// Register
async function register(event) {
  const data = JSON.parse(event.body);
  const { fullname, email, password } = data;

  if (!fullname || !email || !password) {
    return wrapResponse(null, 400, {
      message: "Empty Fields. Please fill all fields",
    });
  }

  try {
    let user = await addUser({ fullname, email, password });
    let token = await generateJWT(user);
    return wrapResponse({ user, token });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// Login
async function login(event) {
  const data = JSON.parse(event.body);
  const { email, password } = data;

  if (!email || !password) {
    return wrapResponse(null, 400, {
      message: "Empty Fields. Please fill all fields",
    });
  }

  try {
    let user = await get("users", "email", email);
    let verified = await verifyPassword(password, user[0].password);
    if (verified) {
      let token = await generateJWT(user[0]);
      return wrapResponse({ user: user[0], token });
    }

    return wrapResponse(null, 400, {
      message: "Incorrect password. Please enter correct password.",
    });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

// *************
// USER HANDLERS
// *************

// GET user with id
async function getUser(event) {
  const queryParams = event.queryStringParameters;

  if (!queryParams || !queryParams.id) {
    return wrapResponse(null, 400, {
      message: "Empty Parameter. Please fill all parameters.",
    });
  }

  const { id } = queryParams;

  try {
    let user = await get("users", "id", id);
    if (user.length === 0) {
      return wrapResponse(null, 400, {
        message: "Not Found. User does not exist.",
      });
    }
    return wrapResponse({ user: user[0] });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

export { hello, register, login, getUser };
