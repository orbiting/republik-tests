
cd apps/backends
PORT=5000 SERVER=republik yarn start &
cd ../..
cd apps/frontend
npm run dev &
cd ../..

sleep 3
