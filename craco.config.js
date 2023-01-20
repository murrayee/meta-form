const CracoLessPlugin = require('craco-less')

module.exports = {
    typescript: {
        enableTypeChecking: true /* (default value) */ ,
    },
    plugins: [{
        plugin: CracoLessPlugin
    }],
}