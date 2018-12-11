const PROXY_CONFIG = {
    "/api/*": {
       "target":  {
           "host": "localhost",
           "protocol": "http:",
           "port":80
         },
       "secure": false,
       "changeOrigin": true,
       "logLevel": "info",
       "bypass": function (req, res, proxyOptions) {
       }
   }
}

module.exports = PROXY_CONFIG;
