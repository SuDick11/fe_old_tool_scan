const fs = require('fs')
const path = require('path')
const http = require('http')

const PORT = process.env.PORT || 3000
const DIST_DIR = path.join(__dirname, 'dist')

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    filePath = path.join(DIST_DIR, 'index.html')
  }

  const ext = path.extname(filePath)
  let contentType = 'text/html'
  
  switch (ext) {
    case '.js':
      contentType = 'application/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.svg':
      contentType = 'image/svg+xml'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg'
      break
    case '.gif':
      contentType = 'image/gif'
      break
    case '.woff':
      contentType = 'font/woff'
      break
    case '.woff2':
      contentType = 'font/woff2'
      break
    case '.ttf':
      contentType = 'font/ttf'
      break
    case '.eot':
      contentType = 'application/vnd.ms-fontobject'
      break
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Serve index.html for SPA routing
      if (err.code === 'ENOENT' && !ext) {
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404)
            res.end('Not Found')
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data2)
        })
      } else {
        res.writeHead(404)
        res.end('Not Found')
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    }
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
