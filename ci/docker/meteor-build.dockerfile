#
# Meteor runtime container and build context.
#

FROM node:4.8.4-slim

# Install Meteor build system.
# From instructions: https://www.meteor.com/install.

# Build the aptitude package repository cache and install CURL.
RUN apt-get update && \
    apt-get --assume-yes install curl && \

# Install bsdtar as tar replacement - due to tar package issues with docker:
# https://github.com/docker/hub-feedback/issues/727 
    apt-get -y install --no-install-recommends bsdtar && \

# Fetch and run the Meteor installation
    curl https://install.meteor.com/ | \ 
    # Replace the tar command with bsdtar before running.
    sed 's/tar /bsdtar /g' | sh
