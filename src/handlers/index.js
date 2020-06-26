const { wrapResponse, generateJWT, verifyJWT, get, addUser } = require("../db");

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

export { hello, register };
