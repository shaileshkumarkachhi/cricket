DOCKER_IMAGE =  eu.gcr.io/hardy-abode-283819/ecs-backend/ecs-backend-dream11
.PHONY: build-dev
build-dev:
	@echo "building dev..."
	docker build --target dev -t ${DOCKER_IMAGE}:dev .

.PHONY: run-dev
run-dev: build-dev
	docker run \
	-p 1919:3001 \
	$(DOCKER_IMAGE):dev
