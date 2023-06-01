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

WORKDIR /ft_transcendence/

RUN npm install prisma --save-dev

RUN npm install --save @prisma/client \
	@nestjs/mapped-types \
	class-validator \
	class-transformer
RUN	 npm i @nestjs/graphql @nestjs/apollo @apollo/server graphql


ENTRYPOINT ["bash", "../init.sh"]