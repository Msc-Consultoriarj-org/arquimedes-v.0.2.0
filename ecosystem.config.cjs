module.exports = {
  apps: [{
    name: "arquimedes",
    script: "dist/index.js",
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
