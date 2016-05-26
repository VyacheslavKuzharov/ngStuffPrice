var express = require('express'),
    app = express();

app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
app.get('/*', function(req, res) {
    // AJAX requests are aren't expected to be redirected to the AngularJS app
    if (req.xhr) {
        return res.status(404).send(req.url + ' not found');
    }

    // `sendfile` requires the safe, resolved path to your AngularJS app
    res.sendfile(path.resolve(__dirname + 'index.html'));
});
app.listen(process.env.PORT || 8081);