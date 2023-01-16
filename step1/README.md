# Step 1: Static HTTP server with apache httpd

Template choisi pour le contenu html : [https://www.free-css.com/free-css-templates/page286/caraft](https://www.free-css.com/free-css-templates/page286/caraft)

## Création de l’image docker

Pour ce faire nous avons utilisé une image existante ([https://hub.docker.com/_/httpd](https://hub.docker.com/_/httpd)) dans laquelle nous avons juste ajouté la ligne suivante qui permet de copier le contenu de notre dossier public-html dans htdocs dans le docker qui sera ensuite affiché dans l’interface web sur l’appel de http://localhost:8080.

```docker
# pull httpd version v2.4 from dockerhub
FROM httpd:2.4
# copy the content of public-html from host machine(whose running the docker image) to docker htdocs directory
COPY ./public-html/ /usr/local/apache2/htdocs/
```

1. Génération du docker sur la base de la présente image :

    `.` indique que le PATH est le directory local (**Cette commande doit être exécutée dans le dossier contenant le fichier `Dockerfile`, soit, dans notre cas : step1**).

    ```bash
    docker build -t step1 .
    ```

2. Lancer l’image docker

    ```bash
    docker run -d -p 8080:80 -v public-html:/usr/local/apache2/htdocs/ --name step1 step1
    ```

- Nous montons un volume ( `-v HOST_DIR:DOCKER_DIR`) qui permet de faire une liaison dynamique entre notre répertoire host et celui du docker pour pouvoir changer dynamiquement depuis notre machine le contenu du dossier `htdocs`.
- Nous lions le port 8080 de notre machine avec le port 80 du docker.
- `-d` permet de run le container en arrière-plan et d’imprimer le container id