# NodeJS runtime.
FROM node:4.8.4-alpine

# Assume our build artifacts are available on the host from previous
# container services.
COPY ./artifacts/build-artifacts.tar.gz ./artifacts/build-artifacts.tar.gz

WORKDIR ./artifacts

# Unpack the build artifacts and install the npm dependencies.
RUN tar -xzf build-artifacts.tar.gz && \
    cd ./programs/server && \
    npm install