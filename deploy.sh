#!/bin/bash

set -e

# delete logs more than 1 hours
find /tmp/frontend -type f -name "deploy_*.log" -mmin +60 -exec rm {} \;

# Set the working directory
cd /tmp/frontend

# Generate the timestamp and log file name
TIMESTAMP=$(date "+%Y-%m-%d_%H-%M-%S")
DEPLOY_LOG="deploy_${TIMESTAMP}.log"

# Redirect stdout and stderr to the deploy log
exec > "${DEPLOY_LOG}" 2>&1

# Debug information
echo "Script started at ${TIMESTAMP}"

DOCKER_HUB_USERNAME="silverguo"
IMAGE_NAME="qp-scs-public-frontend-prod"
CONTAINER_NAME="qp-scs-public-frontend-prod"

# Pull the latest image from Docker Hub
LATEST_IMAGE="${DOCKER_HUB_USERNAME}/${IMAGE_NAME}:latest"
docker pull ${LATEST_IMAGE}

LATEST_IMAGE_ID=$(docker images --quiet ${LATEST_IMAGE})
echo "LATEST_IMAGE_ID: '${LATEST_IMAGE_ID}'"

# Check if the container is running
if [ "$(docker ps -q -f name=${CONTAINER_NAME})" ]; then
    RUNNING_IMAGE_ID_SHORT=$(docker inspect --format='{{.Image}}' ${CONTAINER_NAME} | sed 's/sha256://' | cut -c 1-12)
    echo "RUNNING_IMAGE_ID_SHORT: '${RUNNING_IMAGE_ID_SHORT}'"

    # Check if the running container's image is out of date
    if [ "${RUNNING_IMAGE_ID_SHORT}" != "${LATEST_IMAGE_ID}" ]; then
        # Stop and remove the outdated container
        docker stop ${CONTAINER_NAME}
        docker rm ${CONTAINER_NAME}

        # Run the container with the new image
        docker run -d -p 80:80 -p 443:443 -v /var/log/nginx:/var/log/nginx --name ${CONTAINER_NAME} ${LATEST_IMAGE}
    else
        echo "The running container is already using the latest image."
    fi
else
    # Run the container with the new image
    docker run -d -p 80:80 -p 443:443 -v /var/log/nginx:/var/log/nginx --name ${CONTAINER_NAME} ${LATEST_IMAGE}
fi

TIMESTAMP=$(date "+%Y-%m-%d_%H-%M-%S")
echo "Script end at ${TIMESTAMP}"
