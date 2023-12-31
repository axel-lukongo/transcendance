#!/bin/bash
npm install

sleep 5

# Fonction pour tester la connexion à la base de données
function test_db_connection {
  echo "====> Testing database connection... <===="

  until npx prisma db push; do
    echo "====> Database connection failed. Retrying in 5 seconds... <===="
    sleep 5
  done

  echo "====> Database connection successful! <===="
}

# Appel de la fonction de test de connexion
test_db_connection

# Démarrage de l'application Nest.js
npm run start