var request = require('supertest')
    , mocha = require('mocha')
    , should = require('should')
    , async = require('async')
    , testedUrl = 'http://localhost:3000';


describe('Testing routing', function () {
    describe('Send requests to test method based routing ', function () {

        var requests = [
            {
                method: 'post',
                controller: 'restaurants',
                action: 'create',
                path: '',
                expect: {
                    body: {
                        controller: 'restaurants',
                        action: 'create'
                    }
                }
            },
            {
                method: 'put',
                controller: 'restaurants',
                action: 'update',
                path: '/1',
                expect: {
                    body: {
                        controller: 'restaurants',
                        action: 'update'
                    }
                }
            },
            {
                method: 'del',
                controller: 'restaurants',
                action: 'delete',
                path: '/1',
                expect: {
                    body: {
                        controller: 'restaurants',
                        action: 'delete'
                    }
                }
            },
            {
                method: 'get',
                controller: 'restaurants',
                action: 'list',
                path: '/1/menu',
                expect: {
                    body: {
                        controller: 'restaurants/menu',
                        action: 'list'
                    }
                }

            },
            {
                method: 'get',
                controller: 'resta',
                action: 'list',
                path: '',
                expect: {
                    status: 404,
                    body: {
                        error: 'Not found'
                    }
                }

            },
            {
                method: 'post',
                controller: 'restaurants',
                action: 'create',
                path: '/1',
                expect: {
                    status: 404,
                    body: {
                        error: 'Not found'
                    }
                }

            }
        ];

        requests.forEach(function (_request) {
            it('Testing action ' + _request.action + ' of controller ' + _request.controller, function (done) {
                request(testedUrl)[_request.method]('/' + _request.controller + _request.path)
                    .expect(_request.expect.status || 200)
                    .expect(_request.expect.body)
                    .end(done);
            });
        });
    });
})
;