# NodeJS runtime.
FROM node:4.8.2-slim

# Assume our build artifacts are available on the host from previous
# container services.
COPY ./artifacts ./artifacts

RUN cd /artifacts/programs/server && \
    npm install --production