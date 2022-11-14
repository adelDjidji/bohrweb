# image version used for tagging
export BUILD_VERSION=1.0.0
# image name
export IMAGE_NAME=webapp_frontend

# import node image
docker pull node:15.12-stretch

# build image locally
docker build --tag luiscua/$IMAGE_NAME:$BUILD_VERSION -f Dockerfile . --build-arg BASE_VERSION=$BUILD_VERSION

# push image to repository
docker push luiscua/$IMAGE_NAME:$BUILD_VERSION


