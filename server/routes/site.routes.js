import { Router } from 'express';
import * as SiteController from '../controllers/site.controller';
const router = new Router();

// Get all Sites
router.route('/sites').get(SiteController.getSites);

// Get one site by id
router.route('/sites/:id').get(SiteController.getSite);

// Add a new site
router.route('/sites').post(SiteController.addSite);

// Delete a site by id
router.route('/sites/:id').delete(SiteController.deleteSite);

// Update a site by id
router.route('/sites/:id').put(SiteController.updateSite);

export default router;
