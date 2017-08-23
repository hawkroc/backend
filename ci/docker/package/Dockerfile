#
# Meteor build container
#   usage: `docker build --file ./ci/docker/package/Dockerfile .` from root project folder.
#

FROM node:4.8.2-slim

# Install Meteor build system.
# From instructions: https://www.meteor.com/install.

# 1. Build the aptitude package repository cache
# 2. Install CURL for fetching the Meteor install script
# 3. Fetch and run the Meteor installation
RUN apt-get update
RUN apt-get --assume-yes install curl
RUN curl https://install.meteor.com/ | sh

WORKDIR /opt/working

# Copy over project dependencies explicitly.
# Any unrequired subfolders should be specified in the .dockerignore file.
COPY ./\.meteor ./\.meteor
COPY ./client ./client
COPY ./imports ./imports
COPY ./public ./public
COPY ./server ./server

COPY ./package.json .
RUN meteor npm install

# Allow-superuser flag for CI process, otherwise meteor build will fail.
ENV METEOR_ALLOW_SUPERUSER 1

# Verbose logging for build debugging.
ENV METEOR_PROFILE 100
ENV METEOR_DEBUG_BUILD 1

# Seems to be a known issue where the build process runs out of memory.
# Also ran into memory issues using the --directory flag.
# https://github.com/meteor/meteor/issues/8157
RUN meteor build ../package

# Unpackage the tarball ready to deploy.
RUN mkdir ../deployment
RUN tar -xzf ../package/working.tar.gz -C ../deployment

# Fetch the required production dependencies for the Meteor server.
WORKDIR /opt/deployment/bundle/programs/server
RUN npm install --production
