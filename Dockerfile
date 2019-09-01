FROM ubuntu:18.04

USER root

RUN apt-get update
RUN apt-get install nginx -y

RUN rm -v /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/

ADD dist /usr/share/nginx/html/
ADD dist /var/www/html/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 81

CMD service nginx start
