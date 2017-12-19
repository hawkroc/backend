#
# Application build and package.
#

# Available from yinpeng ACR.
# Alternatively local build from: https://bitbucket.org/yinpengdev/meteor
FROM yinpengcontainerregistry-on.azurecr.io/yinpeng/meteor-build-1.5.1:1.0.4

# Set-up the application from our repository build context.
WORKDIR /opt/working

# Copy over project dependencies explicitly.
# Any unrequired subfolders should be specified in the .dockerignore file.
COPY ./\.meteor ./\.meteor
COPY ./\.tools ./\.tools

COPY ./client ./client
COPY ./imports ./imports
COPY ./public ./public
COPY ./server ./server

COPY ./package.json .
RUN meteor npm install

# Allow-superuser flag for CI process, otherwise meteor build will fail.
ENV METEOR_ALLOW_SUPERUSER 1

# Verbose logging for build debugging.
ENV METEOR_PROFILE 5000
ENV METEOR_DEBUG_BUILD 1

# Seems to be a known issue where the build process runs out of memory.
# https://github.com/meteor/meteor/issues/8157
# Using the directory flag and compressing the bundle manually to save memory.
RUN meteor build --directory ../deployment

# Use internal tool to minify the client app bundle.
WORKDIR /opt/deployment/bundle/programs/web.browser/app
RUN node /opt/working/.tools/minify-app.js

# Bundle the artifacts into a tarball for fast copying to host.
WORKDIR /opt/deployment/bundle/
RUN tar -zcf build-artifacts.tar.gz *