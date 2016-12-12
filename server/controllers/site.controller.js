import Site from '../models/site';

/**
 * Get all sites
 * @param req
 * @param res
 * @returns void
 */
export function getSites(req, res) {
  Site.find().sort('-name').exec((err, sites) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ sites });
  });
}

/**
 * Save a site
 * @param req
 * @param res
 * @returns void
 */
export function addSite(req, res) {
  const newSite = new Site(req.body);

  newSite.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ site: saved });
  });
}

/**
 * Get a single site
 * @param req
 * @param res
 * @returns void
 */
export function getSite(req, res) {
  Site.findOne({ _id: req.params.id }).exec((err, site) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ site });
  });
}

/**
 * Update a site
 * @param req
 * @param res
 * @returns void
 */
export function updateSite(req, res) {
  Site.findById(req.params.id, (err, site) => {
    if (err) {
      res.status(500).send(err);
    }

    // only allow updating the schedules
    site.schedules = req.body.schedules;

    site.save((err, saved) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ site: saved });
    });
  });
}


/**
 * Delete a site
 * @param req
 * @param res
 * @returns void
 */
export function deleteSite(req, res) {
  Site.findOne({ _id: req.params.id }).exec((err, site) => {
    if (err) {
      res.status(500).send(err);
    }
    site.remove(() => {
      res.status(200).end();
    });
  });
}
