# https://www.nginx.com/blog/deploying-nginx-nginx-plus-docker/

FROM nginx

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /var/www/nginx/public

COPY /nginx/nginx.conf /etc/nginx/nginx.conf

COPY /nginx/favicon.ico /var/www/nginx/public/favicon.ico

COPY /nginx/robots.txt /var/www/nginx/public/robots.txt

COPY /nginx/50x.html /var/www/nginx/public/50x.html

COPY /nginx/403.html /var/www/nginx/public/403.html

COPY /nginx/404.html /var/www/nginx/public/404.html


#workaround for missing 404.html and other image files

COPY dist /var/www/nginx/

COPY /nginx/favicon.ico /var/www/nginx/favicon.ico

COPY /nginx/robots.txt /var/www/nginx/robots.txt

COPY /nginx/50x.html /var/www/nginx/50x.html

COPY /nginx/403.html /var/www/nginx/403.html

COPY /nginx/404.html /var/www/nginx/404.html