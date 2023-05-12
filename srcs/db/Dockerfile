FROM debian:buster

RUN apt-get update && \
	apt-get install -y sudo \
    vim \
	postgresql \
	curl \
	zsh


COPY init.sh .

COPY ./postgresql.conf /etc/postgresql/11/main/postgresql.conf

COPY ./pg_hba.conf /etc/postgresql/11/main/pg_hba.conf

# RUN chown pos:xtgres:postgres /etc/postgresql/11/main/postgresql.conf && chmod u+rwx /etc/postgresql/11/main/postgresql.conf

EXPOSE 5432



ENTRYPOINT ["bash", "./init.sh"]