const swaggerAutogen = require('swagger-autogen')({
    openapi: "3.0.0",
    autoHeaders: false,
});

const doc = {
    info: {
    title: 'Circle',
    description: 'Circle API Documentation'
    },
    servers: [
        {
            url: "http://localhost:3000",
        },
        {
            url: "https://circle.vercel.app",
        },
        {
            url: "https://circle-staging.vercel.app",
        },
    ],
    components: {
        "@schemas": {
            LoginDTO: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        format: "email"
                    },
                    password: {
                        type: "string",
                        format: "password"
                    }
                },
                required: ["email", "password"]
            },
            RegisterDTO: {
                type: "object",
                properties: {
                    fullName: {
                        type: "string"
                    },
                    email: {
                        type: "string",
                        format: "email"
                    },
                    password: {
                        type: "string",
                        format: "password"
                    }
                },
                required: ["fullName","email", "password"]
            },
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                schema: "bearer"
            }
        }
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ["./src/index.ts"]

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);