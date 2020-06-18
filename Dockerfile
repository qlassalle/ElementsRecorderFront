FROM nginx:latest
COPY dist/elements-recorder /usr/share/nginx/html
