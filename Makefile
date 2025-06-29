build:
	cd frontend && npm install && npm run build

start:
	npx chat-server --static frontend/dist
