// Dummy handler
const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

module.exports = {
  hello,
};
