build:
	npm install && cd frontend && npm install && npm run build

start:
	npx start-server --static frontend/dist

