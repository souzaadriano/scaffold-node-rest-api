#!/bin/bash

echo 'installing server.'

read -n 1 -s -r -p "Pressione uma tecla para continuar ! "
echo 'Copying the template files and creating a config file'
echo ''
mkdir config
cat ./.install/environment.template.env > ./config/.env
cat ./.install/docker-compose.template.yml > ./docker-compose.yml

echo ''
echo 'Preparando volumes, instalando dependencias e configurando o container'
read -n 1 -s -r -p "Pressione uma tecla para continuar ! "
echo ''
docker-compose run royal_service yarn build

read -n 1 -s -r -p "Pressione uma tecla para finalizar ! "