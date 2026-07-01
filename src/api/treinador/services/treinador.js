'use strict';

/**
 * treinador service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::treinador.treinador');
