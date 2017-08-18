FROM ulexus/meteor:latest
WORKDIR workdir

COPY . .

RUN meteor npm install
RUN meteor build ./build
