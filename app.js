const express = require("express");
const path = require("node:path");
const app = express();

const options = {
  root: path.join(__dirname, "pages"),
  dotfiles: "deny",
  headers: {
    "x-timestamp": Date.now(),
    "x-sent": true,
  },
};

app.get("/", (req, res, next) => {
  const path = req.path;

  res.sendFile(`index.html`, options, (err) => {
    if (err) {
      next(err);
    } else {
      `sent: ${path}`;
    }
  });
});

app.get("/about", (req, res, next) => {
  const path = req.path;

  res.sendFile(`about.html`, options, (err) => {
    if (err) {
      next(err);
    } else {
      `sent: ${path}`;
    }
  });
});

app.get("/contact-me", (req, res, next) => {
  const path = req.path;

  res.sendFile(`contact-me.html`, options, (err) => {
    if (err) {
      next(err);
    } else {
      `sent: ${path}`;
    }
  });
});

app.get("/:param", (req, res, next) => {
  const path = req.path;

  res.sendFile(`404.html`, options, (err) => {
    if (err) {
      next(err);
    } else {
      `sent: ${path}`;
    }
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
