# Utiliser l'image de base Debian Buster
FROM debian:buster

# Mise à jour des paquets et installation des dépendances
RUN apt-get update && apt-get install -y \
    curl

# Copie des fichiers du projet
COPY ./ft_transcendence /ft_transcendence/

# Copie du script d'initialisation
COPY ./init.sh /

# Définition du répertoire de travail
WORKDIR /ft_transcendence

# Définition du point d'entrée
ENTRYPOINT ["bash", "../init.sh"]
