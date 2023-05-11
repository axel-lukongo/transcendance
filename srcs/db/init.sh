service postgresql start
cat << EOF | adduser $POSTGRES_USER
$POSTGRES_PASSWORD
$POSTGRES_PASSWORD
$POSTGRES_USER




EOF

sudo -u postgres createuser $POSTGRES_USER
sudo -u postgres createdb $POSTGRES_DB_NAME
echo "alter user $POSTGRES_USER with encrypted password '$POSTGRES_PASSWORD'; grant all privileges on database $POSTGRES_DB_NAME to $POSTGRES_USER;" | sudo -u postgres psql
service postgresql stop
sudo -u postgres /usr/lib/postgresql/11/bin/postgres -D /etc/postgresql/11/main/