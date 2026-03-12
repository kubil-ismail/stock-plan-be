const fs = require("fs");
const path = require("path");

function registerRoutes(app) {
  const basePath = path.join(process.cwd(), "/api");

  fs.readdirSync(basePath).forEach((feature) => {
    const routeFile = path.join(basePath, feature, "route.js");

    if (fs.existsSync(routeFile)) {
      const router = require(routeFile);

      app.use(`/v1/${feature}`, router);
    }
  });
}

module.exports = registerRoutes;
