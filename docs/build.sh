source ~/.nvm/nvm.sh
cd "$BUILD_WORKSPACE_DIRECTORY/docs/ui" && nvm install && gulp bundle || exit
cd .. && npx --yes antora antora-playbook.yml
