const {
    rest
} = require('msw')

const handlers = [
    rest.get('/api/decoration/detail/123', (req, res, ctx) => {
        return res(
            // Respond with a 200 status code
            ctx.status(200),
            ctx.json({})
        )
    })
]

module.exports = {
    handlers
}