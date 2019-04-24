
cd apps/backends
# TRAVIS= workaround: https://github.com/orbiting/backends/issues/246
TRAVIS= PORT=5000 SERVER=republik yarn start &
cd ../..
cd apps/frontend
npm run dev &
cd ../..

sleep 10
