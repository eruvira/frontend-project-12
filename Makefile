install:
	npm install && cd frontend && npm install

build:
	make install && cd frontend && npm run build

start:
	npx start-server --static frontend/dist

