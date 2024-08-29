include .env

PHONY: lint
lint:
	act -j commitlint -P ubuntu-24.04=catthehacker/ubuntu:act-22.04

PHONY: check
check:
	act -j check -P ubuntu-24.04=catthehacker/ubuntu:act-22.04

PHONY: deploy
deploy:
	act -j deploy -P ubuntu-24.04=catthehacker/ubuntu:act-22.04 -s GITHUB_TOKEN=${GITHUB_TOKEN} --eventpath .github/pull_request.closed.develop.json

PHONY: login
login:
	docker login ghcr.io -u tkgstrator -p ${GITHUB_TOKEN}

PHONY: build
build:
	docker buildx build --push --platform linux/amd64,linux/arm64 -t ghcr.io/tkgstrator/chatgpt_discord_bot:latest .
