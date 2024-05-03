const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const routeHandlers = {
  "/": homeHandler,
  "/projects": projectHandler,
  "/contact": contactHandler,
  "/design_project": designProHandler,
  "/images": imageHandler, // Route for serving images
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  if (path.endsWith(".jpg")) {
    imageHandler(req, res)
  } else if (path.endsWith(".png")) {
    imageHandler(req, res)
  } else if (path.endsWith(".gif")) {
    imageHandler(req, res)
  } else {
    console.log(`${path}`)
    const handler = routeHandlers[path] || notFoundHandler;
    console.log(`${handler}`)
    handler(req, res);
  }



});

function homeHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
}

function projectHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("projects.html").pipe(res);
}

function contactHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("contact.html").pipe(res);
}

function designProHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.createReadStream("design_project.html").pipe(res);
}

function imageHandler(req, res) {
  console.log('image handler')
  // Extract the file name from the request URL
  const fileName = req.url.split('/').pop();

  // Determine the content type based on the file extension
  const extension = path.extname(fileName).slice(1);
  const contentType = `image/${extension}`;

  // Serve the file with appropriate content type
  fs.readFile(path.join(__dirname, "images", fileName), (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

function notFoundHandler(req, res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Not Found");
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
