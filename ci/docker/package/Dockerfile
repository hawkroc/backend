#
# Meteor build container
#   usage: `docker build --file ./ci/docker/package/Dockerfile .` from root project folder.
#

FROM node:0.10.41-slim

# Install Meteor build system.
# From instructions: https://www.meteor.com/install.

# 1. Build the aptitude package repository cache
# 2. Install CURL for fetching the Meteor install script
# 3. Fetch and run the Meteor installation
RUN apt-get update
RUN apt-get --assume-yes install curl
RUN curl https://install.meteor.com/ | sh

WORKDIR /opt/working
COPY . .

RUN meteor npm install

# Allow-superuser flag for CI process, otherwise meteor build will fail.
ENV METEOR_ALLOW_SUPERUSER 1

# Verbose logging for build debugging.
ENV METEOR_PROFILE 100
ENV METEOR_DEBUG_BUILD 1

# Seems to be a known issue where the build process runs out of memory.
# https://github.com/meteor/meteor/issues/8157
RUN meteor build ../package

# Unpackage the tarball ready to deploy.
RUN tar -xzf ../package/working.tar.gz -C ../deployment
