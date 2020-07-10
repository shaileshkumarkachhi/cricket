DOCKER_IMAGE =  eu.gcr.io/ingka-sandbox-angup2-dev/ecs-web/ecs-web-dream11

.PHONY: all
all:

.PHONY: clean
clean:

.PHONY: build-dev
build-dev:
	@echo "building dev..."
	docker build --target dev -t ${DOCKER_IMAGE}:dev .

.PHONY: run
run-dev: build-dev
	docker run \
	-p 1515:8080 \
	$(DOCKER_IMAGE):dev

.PHONY: build-prod
build-prod:
	@echo "building dev..."
	docker build --target prod -t ${DOCKER_IMAGE}:prod .

.PHONY: run
run-prod: build-prod
	docker run \
	-p 1717:8080 \
	$(DOCKER_IMAGE):prod