development:
	@PORT=8080 ./node_modules/.bin/supervisor -q -w server.js lib/api.js bin/www.js
