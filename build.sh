# image version used for tagging
export BUILD_VERSION=2.1.6
# image name
export IMAGE_NAME=webapp_frontend

# import node image
docker pull node:18.14-alpine

# build image locally
docker build --tag luiscua/$IMAGE_NAME:$BUILD_VERSION -f Dockerfile . --build-arg BASE_VERSION=$BUILD_VERSION

# push image to repository
docker push luiscua/$IMAGE_NAME:$BUILD_VERSION