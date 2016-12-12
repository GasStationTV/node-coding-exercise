import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Site from '../site';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial sites added into test db
const sites = [
  new Site({ name: 'test1' }),
  new Site({ name: 'test2' }),
];

test.beforeEach('connect and add two sites', t => {
  connectDB(t, () => {
    Site.create(sites, err => {
      if (err) t.fail('Unable to create sites');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});


test.serial('Should correctly give number of Sites', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/sites')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(sites.length, res.body.sites.length);
});

test.serial('Should send correct data when queried against an id', async t => {
  t.plan(2);

  const site = new Site({ name: 'Foo'});
  await site.save();

  const res = await request(app)
    .get(`/api/sites/${site._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.site.name, site.name);
});

test.serial('Should correctly add a site', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/sites')
    .send({ name: 'Foo2' })
    .set('Accept', 'application/json');


  t.is(res.status, 200);

  const savedSite = await Site.findOne({ name: 'Foo2' }).exec();
  t.is(savedSite.name, 'Foo2');
});

test.serial('Should correctly delete a site', async t => {
  t.plan(2);

  const site = new Site({ name: 'Foo4' });
  await site.save();
  const res = await request(app)
    .delete(`/api/sites/${site._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedSite = await Site.findOne({ name: 'Foo4' }).exec();
  t.is(queriedSite, null);
});

