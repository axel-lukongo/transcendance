#DOESN'T WORK FOR NOW | Install OH My ZSH for better bash can comment this 2 lignes
# sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# zsh


service postgresql start
cat << EOF | adduser $POSTGRES_USER
$POSTGRES_PASSWORD
$POSTGRES_PASSWORD
$POSTGRES_USER




EOF

sudo -u postgres createuser $POSTGRES_USER
sudo -u postgres createdb $POSTGRES_DB_NAME
cat << EOF | sudo -u postgres psql
alter user $POSTGRES_USER with encrypted password '$POSTGRES_PASSWORD';
grant all privileges on database $POSTGRES_DB_NAME to $POSTGRES_USER;
grant all privileges on schema public to $POSTGRES_USER;
alter user $POSTGRES_USER createdb;
EOF
service postgresql stop
sudo -u postgres /usr/lib/postgresql/11/bin/postgres -D /etc/postgresql/11/main/