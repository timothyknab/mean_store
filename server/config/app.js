// Setup 'client' and 'bower_components' static folders:
module.exports = function(express, app, bodyParser, path) {

    // Setup Static Folders (client and bower_components)
    app.use(express.static(path.join(__dirname, './../../client')))
        .use(express.static(path.join(__dirname, './../../bower_components')))
        .use(bodyParser.json()); // setup bodyParser to send form data as JSON
};
