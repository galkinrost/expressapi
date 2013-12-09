exports.name = 'restaurants';

exports.actions = {
    // POST /restaurants
    create: function (req, next) {
        next(null, {
            controller: 'restaurants',
            action: 'create'
        });
    },
    // GET /restaurants/:id
    read: function (req, next) {
        next(null, {
            controller: 'restaurants',
            action: 'read'
        });
    },
    // PUT /restaurants/:id
    update: function (req, next) {
        next(null, {
            controller: 'restaurants',
            action: 'update'
        });
    },
    // DELETE /restaurants/:id
    delete: function (req, next) {
        next(null, {
            controller: 'restaurants',
            action: 'delete'
        });
    },
    // GET /restaurants
    list: function (req, next) {
        next(null, {
            controller: 'restaurants',
            action: 'list'
        });
    },
    menu: {
        // GET /restaurants/:id/menu
        list: function (req, next) {
            next(null, {
                controller: 'restaurants/menu',
                action: 'list'
            });
        }
    }
}
