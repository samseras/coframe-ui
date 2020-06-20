#!/bin/bash
rm -rf node_modules
echo "----------------Start npm install----------------"
npm config set registry http://10.15.15.133:8081/repository/proxy-npm/
npm info underscore
npm install  --unsafe-perm
echo "----------------Start npm run build----------------"
npm run build:prod

cd dist
# zip -q -r ./EOS_Microservices_5.0_Coframe_UI.zip .
tar -zcf EOS_Microservices_5.0_Coframe_UI.tar.gz --exclude=./EOS_Microservices_5.0_Coframe_UI.tar.gz ./*
