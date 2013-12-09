module.exports = function (app) {
    var http = require('http')
        , fs = require('fs')
        , router = function (controllerName, route, actions) {
            var actionsMethods = {
                create: 'post',
                read: 'get',
                update: 'put',
                delete: 'delete',
                list: 'get'
            };

            Object.keys(actions).forEach(function (action) {

                var _route = route;

                if (typeof actions[action] == 'object')return router(action, _route + '/:' + controllerName + 'Id/' + action, actions[action]);

                if (typeof actions[action] != 'function') throw 'Action must be a function';

                var method = actionsMethods[action];

                if (!method)throw 'Unknown action';

                if (~['read', 'update', 'delete'].indexOf(action)) _route += '/:id';

                app[method](_route, function (req, res, next) {
                    actions[action](req, function (err, response) {
                        if (err)return next(err);
                        res.json(200, response);
                    });
                });
            });
        };

    fs.readdirSync(__dirname + '/controllers').forEach(function (filename) {
        var controller = require('./controllers/' + filename);

        if (!controller.name) throw 'Controller name is required';

        if (!controller.actions) throw 'Controller actions are required';

        router(controller.name, '/' + controller.name, controller.actions);

    });

    app.all('*', function (err, req, res, next) {
        if (err.name && err.name == 'Http') {
            return res.json(err.status, err.body);
        }
        console.log(err.stack);
        console.log(err);
        return res.json(500, {message: 'Something is wrong'});

    });

    app.use(function (req, res, next) {
        res.send(404, { error: 'Not found' });
    });


    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });

}