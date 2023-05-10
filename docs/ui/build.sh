source ~/.nvm/nvm.sh
cd "$BUILD_WORKSPACE_DIRECTORY/docs/" && nvm install && cd ui && gulp bundle
