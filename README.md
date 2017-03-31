# dervice-docker-run

- Do a `docker inspect` of the container you want. 
- Copy/paste its output into a file called `inspect.json`
- Run `node derive-docker-run.js inspect.json` and it will output a `docker run` command you can use at least as a starting point.