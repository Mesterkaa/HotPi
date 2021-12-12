const PROXY_CONFIG = [
  {
      context: [
          "/data",
          "/device",
          "/setting"
      ],
      target: "http://10.42.0.1:3000",
      secure: false
  }
]

module.exports = PROXY_CONFIG;
