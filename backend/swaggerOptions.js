const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskPro API",
      version: "1.0.0",
      description: "API documentation for the TaskPro project",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // pt alte scheme, daca e nevoie.
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
