FROM debian:buster

RUN apt-get update && \
	apt-get install -y sudo \
    vim \
	postgresql

COPY init.sh .

ENTRYPOINT ["bash", "./init.sh"]