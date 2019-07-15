# !/bim/sh
cd /Users/deanwen/Documents/www/GitHub/node-server/blog1/logs
cp access.log $(date +%Y-%m-%d).access.log

echo "" > access.log