exports.options = {
    swaggerDefinition: {
        info: {
            description: 'Prello API Server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:5000',
        basePath: '/api',
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: ""
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./../routes/**/*.js'] //Path to the API handle folder
};