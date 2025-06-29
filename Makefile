build:
	cd frontend && npm install && npm run build

start:
	node ./node_modules/@hexlet/chat-server/dist/server.js --static frontend/dist
