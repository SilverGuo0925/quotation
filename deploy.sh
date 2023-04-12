#!/bin/bash

set -e

DOCKER_HUB_USERNAME="silverguo"
IMAGE_NAME="qp-scs-public-frontend-prod"
CONTAINER_NAME="qp-scs-public-frontend-prod"

# Pull the latest image from Docker Hub
docker pull ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest

# Stop the existing container if it's running
if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
fi

# Run the container with the new image
docker run -d -p 80:80 -p 443:443 -v /var/log/nginx:/var/log/nginx --name ${CONTAINER_NAME} ${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest
