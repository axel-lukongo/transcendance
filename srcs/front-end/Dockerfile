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

# Installation de create-react-app pour initialiser le projet React
# RUN npm install @apollo/client

COPY ./init.sh .

# Définir le répertoire de travail
WORKDIR /ft_transcendence

ENTRYPOINT ["bash", "../init.sh"]
