FROM debian:buster

# Installation des dépendances
RUN apt-get update && apt-get install -y \
    curl \
    git

# Installation de la dernière version de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Installation de global packages npm
RUN npm install -g \
    @nestjs/cli \
    n \
    prisma

# Copie des fichiers du projet
COPY ./ft_transcendence /ft_transcendence/

# Installation des packages npm spécifiques
WORKDIR /ft_transcendence/
RUN npm install


# Installation des packages npm supplémentaires
RUN npm install --save \
    @nestjs/graphql \
    graphql \
    @apollo/server \
    @nestjs/mapped-types \
    class-validator \
    class-transformer \
    @prisma/client

# Exécution de n latest pour obtenir la dernière version de Node.js
RUN n latest

# Copie du script d'initialisation
COPY init.sh ../

# Définition du répertoire de travail
WORKDIR /ft_transcendence

EXPOSE 3000

ENTRYPOINT ["bash", "../init.sh"]
