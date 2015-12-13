'use strict';

const Hapi = require('hapi'),
      figlet = require('figlet'),
      pkg = require('./package.json'),
      Joi = require('joi');

const server = new Hapi.Server();
server.connection({
    host: '127.0.0.1',
    port: 8000
});


String.prototype.titleize = () => this.split(/[.?*+^$[\]\\(){}_\s|-]/g).map(function( s ){ return s.capitalize(); }).join(' ');
String.prototype.capitalize = () => this.substr( 0, 1 ).toUpperCase() + this.substr(1);

server.register([require('vision'), require('inert'), { register: require('lout') }], (err) => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
        plugins: {
            lout: false
        }
    },
    handler: {
        directory: {
            path: './public'
        }
    }
});

server.route({
    method: 'GET',
    path:'/fonts',
    config: {
        description: 'Get a list of possible fonts',
        notes: 'Returns an Array of fonts',
        tags: ['api']
    },
    handler: (request, reply) => {
        return reply(pkg.fontList);
    }
});

server.route({
    method: 'GET',
    path:'/figlefy',
    config: {
        description: 'Welcome page',
        notes: 'API Root',
        tags: ['api']
    },
    handler: (request, reply) => {
        return reply({
            'welcome': 'Welcome to figlefy API',
            'docs': '/docs'
        });
    }
});

server.route({
    method: 'GET',
    path:'/figlefy/{string}/{font?}',
    config: {
        description: 'Get your text figlefied',
        notes: 'Returns a logable string',
        tags: ['api'],
        validate: {
            params: {
                string: Joi.string()
                           .required()
                           .description('The text you want figlefied.'),
                font: Joi.string()
                          .description('The font you want to use.'),
            }
        }
    },
    handler: (request, reply) => {
        let ascii = figlet.textSync(request.params.string, {
            font: (request.params.font) ? request.params.font.titleize() : 'standard'.titleize(),
            horizontalLayout: 'default',
            verticalLayout: 'default'
        });
        return reply(ascii);
    }
});

server.start((err) => {
    if (err) { throw err; }
    console.log('Server running at:', server.info.uri);
});
