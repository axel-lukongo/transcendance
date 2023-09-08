FROM debian:buster

# Installation des dépendances
RUN apt-get update && apt-get install -y \
    curl

# Installation de la dernière version de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Copie des fichiers du projet
COPY ./ft_transcendence /ft_transcendence/

# Copie du script d'initialisation
COPY init.sh ./


# Définition du répertoire de travail
WORKDIR /ft_transcendence/

# Définition du point d'entrée
ENTRYPOINT ["bash", "../init.sh"]
