#!/bin/bash

#
# Downloads all the releases and extracts javadocs directories from them.
# If the directory for the version already exists, it will be skipped.
# Run this as a cron job:
# 0,30 * * * * /home/ech35/repo/get_javadocs.sh &> /dev/null
#

set -e

readonly PROGNAME=$(basename $0)
readonly PROGDIR=$(readlink -m $(dirname $0))

JAVADOCS_DIR=/home/ech35/api-reference/
mkdir -p ${JAVADOCS_DIR} && cd ${JAVADOCS_DIR}

# Check if already running
LOCKFILE=${JAVADOCS_DIR}/lockfile
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
  VERSION=$(basename ${RELEASE} | sed -e 's/grakn-dist-//' -e 's/\.tgz//' -e 's/\.tar\.gz//')
  if [[ ! -d v${VERSION} ]]; then
    echo "Downloading ${VERSION}"
    wget --continue -q ${RELEASE} -o grakn-dist-${VERSION}.tar.gz
    mkdir -p v${VERSION}
    tar -xf grakn-dist-${VERSION}.tar.gz -C v${VERSION} grakn-dist-${VERSION}/docs/api/ --strip-components=3
    rm grakn-dist-${VERSION}.tar.gz
  fi
done

# Create symlink for latest version
if [[ -d ${LATEST_VERSION} ]]; then
  ln -sTf ${LATEST_VERSION} latest
fi

rm -f ${LOCKFILE}
