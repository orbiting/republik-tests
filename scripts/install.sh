BACKENDS_REMOTE="https://github.com/orbiting/backends.git"
FRONTEND_REMOTE="https://github.com/orbiting/republik-frontend.git"

setup_backends() {
  cd apps/backends
  yarn
  cp .env.example .env
  cp servers/republik/.env.example servers/republik/.env
  dropdb --if-exists republik-test
  createdb republik-test
  yarn run db:migrate:up
  NODE_ENV=development OVERWRITE_ENV=.test.env yarn run db:seed
  cd ../..
}
setup_frontend() {
  cd apps/frontend
  cp .env.example .env
  npm i
  cd ../..
}

echo "[env] TRAVIS_BRANCH=${TRAVIS_BRANCH} BACKENDS_BRANCH=${BACKENDS_BRANCH} FRONTEND_BRANCH=${FRONTEND_BRANCH}"

DEFAULT_BRANCH=master
BRANCH=${TRAVIS_BRANCH:-$DEFAULT_BRANCH}
BACKENDS_BRANCH=${BACKENDS_BRANCH:-$BRANCH}
FRONTEND_BRANCH=${FRONTEND_BRANCH:-$BRANCH}

if [ $(git ls-remote --heads $BACKENDS_REMOTE $BACKENDS_BRANCH | wc -l) == "0" ] ; then
  echo "[backends] ${BACKENDS_BRANCH} not available"
  BACKENDS_BRANCH=$DEFAULT_BRANCH ; fi
if [ $(git ls-remote --heads $FRONTEND_REMOTE $FRONTEND_BRANCH | wc -l) == "0" ] ; then
  echo "[frontend] ${FRONTEND_BRANCH} not available"
  FRONTEND_BRANCH=$DEFAULT_BRANCH ; fi

rm -rf apps

echo "[backends] cloning ${BACKENDS_BRANCH}"
git clone --depth=1 --branch=$BACKENDS_BRANCH $BACKENDS_REMOTE apps/backends
echo "[frontend] cloning ${FRONTEND_BRANCH}"
git clone --depth=1 --branch=$FRONTEND_BRANCH $FRONTEND_REMOTE apps/frontend

setup_backends
setup_frontend

