# Anton's Story Quest is plain static files: serve them with unprivileged nginx.
FROM nginxinc/nginx-unprivileged:1.29-alpine@sha256:0c79d56aee561a1d81c63f00eee5fb5fe29279560cdc55e91425133104c7fbe6
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css app.js books.js /usr/share/nginx/html/
EXPOSE 8080
