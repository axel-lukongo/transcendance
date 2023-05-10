# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: idouidi <idouidi@student.42.fr>            +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/05/05 20:16:48 by idouidi           #+#    #+#              #
#    Updated: 2023/05/05 20:56:58 by idouidi          ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all: up

up:
		# sudo systemctl restart docker
		sudo docker compose -f docker-compose.yml build #--no-cache
		sudo docker compose -f docker-compose.yml up --force-recreate #-d --force-recreate

down:
		sudo docker compose -f docker-compose.yml down 

ps:		
		sudo docker compose -f docker-compose.yml ps -a
		sudo docker ps -a

clean:	down
		sudo docker system prune
		sudo docker volume rm srcs_db srcs_website

		sudo rm -rf ${HOME}/data/db
		mkdir -p ${HOME}/data/db

re : 	clean up


.PHONY: start stop re ps clean