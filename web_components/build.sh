set -x
rm -rf dist
npx babel src -d dist --extensions ".ts,.tsx"
tsc
cp -r src/assets dist/assets
set +x
