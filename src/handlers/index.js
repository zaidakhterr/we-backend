const { wrapResponse, generateJWT, verifyJWT, get, addUser } = require("../db");

// Dummy handler
async function hello(event, context) {
  console.log({ event, context });
  return wrapResponse({ status: true, message: "Hello World" });
}

// Register handler
async function register(event, context) {
  const data = JSON.parse(event.body);
  const { fullname, email, password } = data;

  try {
    let user = addUser({ fullname, email, password });
    let token = generateJWT(user);
    return wrapResponse({ user, token });
  } catch (error) {
    return wrapResponse(null, 500, error);
  }
}

export { hello };
