// Let us use cookies to create a stateful http communication between client and server
const http = require("http");

const server = http.createServer((req, res) => {
  const cookies = req.headers.cookie;

  //if no cookie exists for the current client
  if (!cookies) {
    const cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate() + 1);

    const cookieText = `session=abcdef;expiresIn=${cookieExpiry.toUTCString()};`;
    res.setHeader("Set-Cookie", cookieText);
    res.writeHead(302, {
      location: "/",
    });
    return res.end();
  }

  //if cookie exists
  cookies.split(";").forEach((cookie) => {
    const s = cookie.match(/(.*?)=(.*)$/);
    cookies[s[1].trim()] = (s[2] || "").trim();
  });
  res.end("Cookie set: " + cookies.toString());
});
server.listen(4040, () => console.log("Server listening on 4040"));
