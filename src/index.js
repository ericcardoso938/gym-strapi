'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      const authRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'authenticated' } });
      if (authRole) {
        const perms = ['api::reserva.reserva.create', 'api::reserva.reserva.find', 'api::reserva.reserva.delete'];
        for (const action of perms) {
          const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: authRole.id } });
          if (!exists) {
            await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: authRole.id } });
          }
        }
      }
    } catch(e) { console.error('Error setting perms:', e); }
  },
};
