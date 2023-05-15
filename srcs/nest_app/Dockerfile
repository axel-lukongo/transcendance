FROM debian:buster

RUN apt-get update && \
    apt-get install -y vim \
	npm \
	curl \
	git 

RUN npm install -g @nestjs/cli

RUN npm install -g n

RUN	n latest  

RUN	hash -r

COPY ./init.sh .

COPY ./ft_transcendence /ft_transcendence/ 

WORKDIR ./ft_transcendence/

RUN npm install prisma --save-dev

ENTRYPOINT ["bash",  "../init.sh"]