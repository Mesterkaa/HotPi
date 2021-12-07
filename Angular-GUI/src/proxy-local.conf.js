const PROXY_CONFIG = [
  {
      context: [
          "/data",
          "/device",
          "/setting"
      ],
      target: "http://192.168.137.21:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;
