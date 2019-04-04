
cd apps/backends
{ PORT=5000 SERVER=republik yarn start & } 2>./log
cd ../..
cd apps/frontend
{ npm run dev & } 2>./log
cd ../..

sleep 10
