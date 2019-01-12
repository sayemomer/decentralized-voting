const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

  const checkJwt = jwt({
  
    secret:jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:process.env.AUTH0JWJSURL
    }),

    audience: process.env.KEY,
    issuer: process.env.CALLBACK,
    algorithms:['RS256']
})

module.exports =checkJwt;