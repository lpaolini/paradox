FROM node:16-alpine

EXPOSE 10443

# ENV MODULE_NAME user-files
# ENV MODULE /usr/local/src/sepal/modules/${MODULE_NAME}
# ENV SHARED /usr/local/src/sepal/lib/js/shared

# RUN npm install -g nodemon

# Set bash prompt
# RUN echo "export PS1='[\[\033[1;34m\]\u@${MODULE_NAME}\[\033[0m\]:\w]\$ '" >> /home/node/.bashrc
# RUN echo "export PS1='[\[\033[1;34m\]\u@${MODULE_NAME}\[\033[0m\]:\w]\$ '" >> /root/.bashrc

# ADD lib/js/shared ${SHARED}
# WORKDIR ${SHARED}/js/shared
# USER root
# RUN chown -R node: ${SHARED}
# USER node
# RUN npm install

ARG DIR=/paradox

RUN apk --no-cache add --virtual native-deps g++ gcc libgcc libstdc++ linux-headers make python3

ADD --chown=node:node package.json ${DIR}/
# ADD package-lock.json ${DIR}/

WORKDIR ${DIR}

RUN npm install --quiet node-gyp -g

USER node

RUN npm install --quiet

# RUN apk del native-deps

# RUN npm install

ADD --chown=node:node src ${DIR}/src/

# CMD sleep 1d

ENTRYPOINT ["node", "src/main.js", "../config/config.json"]
