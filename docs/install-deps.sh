source ~/.nvm/nvm.sh
pushd "$BUILD_WORKSPACE_DIRECTORY/docs" && nvm install && npm i && popd || exit
pushd "$BUILD_WORKSPACE_DIRECTORY/docs/ui" && npm i -g gulp && npm i
