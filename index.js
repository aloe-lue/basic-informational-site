const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  let reqUrl = req.url;

  if (reqUrl === "/") {
    reqUrl = "index";
  }

  // really weird file handling to serve html
  let hasExtension = reqUrl.split("").includes(".");
  if (!hasExtension) {
    reqUrl = `${reqUrl}.html`;
  }

  const fileNotFound = function fileHandling() {
    fs.readFile(
      "pages/404.html",
      { "Content-Type": "text/html" },
      (err, data) => {
        if (err) {
          throw err;
        }
        res.writeHead(404, "OK", { "Content-Type": "text/html" });
        res.write(data);
        res.end();
        return;
      }
    );
  };

  fs.readFile(`pages/${reqUrl}`, "utf-8", (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        fileNotFound();
        return;
      }
      return;
    }

    res.writeHead(200, "OK", { "Content-Type": "text/html" });
    res.write(data);
    res.end();
    return;
  });
});

server.listen(8080);
