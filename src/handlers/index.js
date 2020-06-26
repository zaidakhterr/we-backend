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

// Register handler
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

// Login handler
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

export { hello, register, login };
