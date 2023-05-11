FROM debian:buster

RUN apt-get update && \
    apt-get install -y vim \
	npm \
	curl \
	git \
	zsh


COPY ./init.sh .


ENTRYPOINT ["bash",  "./init.sh"]