docker run -t -p 3306:3306 \
  --name ultimate-pokedex-dev \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=ultimate-pokedex \
  -d mysql:5.7 \
  --character-set-server=utf8mb4