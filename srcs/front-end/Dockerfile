# Utiliser l'image de base Debian Buster
FROM debian:buster

# Mise à jour des paquets et installation des dépendances
RUN apt-get update && apt-get install -y \
    curl \
    git 

# Installation de la dernière version de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

COPY ./ft_transcendence /ft_transcendence/

COPY ./init.sh .

WORKDIR /ft_transcendence

RUN npm install @apollo/client

ENTRYPOINT ["bash", "../init.sh"]
