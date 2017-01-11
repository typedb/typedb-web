#!/bin/bash

#
# Downloads all the releases and extracts restapidocs directories from them.
# If the directory for the version already exists, it will be skipped.
# Run this as a cron job:
# 15 0,6,12,18 * * * /home/ech35/repo/get_restapidocs.sh &> /dev/null
#

set -e

readonly PROGNAME=$(basename $0)
readonly PROGDIR=$(readlink -m $(dirname $0))

RESTAPIDOCS_DIR=/home/ech35/rest-api-docs/
mkdir -p ${RESTAPIDOCS_DIR} && cd ${RESTAPIDOCS_DIR}

# Check if already running
LOCKFILE=${RESTAPIDOCS_DIR}/lockfile
if [ -e ${LOCKFILE} ] && kill -0 `cat ${LOCKFILE}`; then
  echo "Already running"
  exit
fi
trap "rm -f ${LOCKFILE}; exit" INT TERM EXIT
echo $$ > ${LOCKFILE}

# Obtain list of all releases
# API limit of 60 requests per hour
RELEASES=$(curl -s https://api.github.com/repos/graknlabs/grakn/releases | grep browser_download_url | grep -E "tgz|tar\.gz" | awk '{print $2}' | sed -e 's/\"//g')
LATEST_VERSION=$(curl -s https://api.github.com/repos/graknlabs/grakn/releases/latest | grep tag_name | awk '{print $2}' | sed -e 's/\"//g' | tr -d ',')

# Download and extract only docs for each release
for RELEASE in $RELEASES; do
  PKG_NAME=$(basename ${RELEASE} | grep -oE "grakn|mindmaps")
  VERSION=$(basename ${RELEASE} | sed -e 's/[a-z]*-dist-//' -e 's/\.tgz//' -e 's/\.tar\.gz//')
  if [[ ! -d v${VERSION} ]]; then
    echo "Downloading ${VERSION}"
    wget --continue -q ${RELEASE} -o ${PKG_NAME}-dist-${VERSION}.tar.gz
    mkdir -p v${VERSION}
    if [[ ! -z $(tar -tf ${PKG_NAME}-dist-${VERSION}.tar.gz ${PKG_NAME}-dist-${VERSION}/docs/rest-api/) ]]; then
      tar -xf ${PKG_NAME}-dist-${VERSION}.tar.gz -C v${VERSION} ${PKG_NAME}-dist-${VERSION}/docs/rest-api/ --strip-components=3
    fi
    touch v${VERSION}/index.html
    touch v${VERSION}/engine-apis.html
    rm ${PKG_NAME}-dist-${VERSION}.tar.gz
  fi
done

# Create symlink for latest version
if [[ -d ${LATEST_VERSION} ]]; then
  ln -sTf ${LATEST_VERSION} latest
fi

rm -f ${LOCKFILE}
