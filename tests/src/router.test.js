const test = require('tape');
const shot = require('shot');

const router = require('../../src/router');

const routes = {
  home: [
    {
      method: 'GET',
      url: '/',
    },
    {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
    },
  ],
  css: [
    {
      method: 'GET',
      url: '/public/styles.css',
    },
    {
      statusCode: 200,
      headers: { 'Content-Type': 'text/css' },
    },
  ],
  fakeCSS: [
    {
      method: 'GET',
      url: '/public/fakecss.css',
    },
    {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
    },
  ],
  injection: [
    {
      method: 'GET',
      url: '/public/../src/server.js',
    },
    {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
    },
  ],
  js: [
    {
      method: 'GET',
      url: '/public/index.js',
    },
    {
      statusCode: 200,
      headers: { 'Content-Type': 'application/javascript' },
    },
  ],
  random: [
    {
      method: 'GET',
      url: '/hgvhp',
    },
    {
      statusCode: 404,
      headers: { 'Content-Type': 'text/html' },
    },
  ],
};

Object.keys(routes).forEach((route) => {
  test(`Testing ${route} route`, (t) => {
    shot.inject(router, routes[route][0], (res) => {
      const expectedStatusCode = routes[route][1].statusCode;
      const expectedHeaders = routes[route][1].headers['Content-Type'];
      t.equal(expectedStatusCode, res.statusCode, `${expectedStatusCode} = ${res.statusCode}`);
      t.equal(expectedHeaders, res.headers['Content-Type'], `${expectedHeaders} = ${res.headers['Content-Type']}`);
      t.end();
    });
  });
});
