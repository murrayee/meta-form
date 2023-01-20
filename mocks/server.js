const {
    setupServer
} = require('msw/node');

const {
    handlers
} = require('./handlers.js')

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers)

server.listen({
    onUnhandledRequest(req) {
        console.error(
            'Found an unhandled %s request to %s',
            req.method,
            req.url.href,
        )
    },
})