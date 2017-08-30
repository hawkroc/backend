# Our meteor/build context service in compose file.
# TODO: appropriate image version tagging.
FROM centrality/meteor-build:latest

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

WORKDIR /opt/working

# Allow-superuser flag for CI process, otherwise meteor build will fail.
ENV METEOR_ALLOW_SUPERUSER 1

# Verbose logging for build debugging.
ENV METEOR_PROFILE 5000
#ENV METEOR_DEBUG_BUILD 1

# Seems to be a known issue where the build process runs out of memory.
# https://github.com/meteor/meteor/issues/8157
# Using the directory flag and compressing the bundle manually to save memory.
RUN meteor build --directory ../deployment

# Reset the working directory for running external compose commands.
WORKDIR /