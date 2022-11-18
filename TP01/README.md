# DOCUMENTATION TP01 DEVOPS

**INITIALISATION DU PROJET**

**FAIRE LES COMMANDES SUIVANTES**
- cd my_project
- npm init -y
- npm install typescript --save-dev
- npm install @types/node --save-dev
- npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
- mkdir src
- echo "console.log('Hello world')" > src/index.ts
- npx tsc
- node build/index.js
-  npm install express
-  npm install typescript ts-node @types/express --save-dev

**MISE EN PLACE DU CODE**
- Dans le fichier "my_project/src/index.ts" copier-coller le code suivant
```
import express from 'express';
const app = express();
const port = 8000;
const route = '/ping';

app.get('/:path', (req, res) => {
    if(req.path === route){
        res.json(req.headers);
    } else {
        res.status(404).end();
    }    
})
app.get('/', (req, res) => {
    res.status(404).end();
})
app.get('/ping/:path', (req, res) => {
    res.status(404).end();
})
app.get('/:path/ping', (req, res) => {
    res.status(404).end();
})
app.post('/:path', (req, res) => {
    res.status(404).end();
})
app.post('/', (req, res) => {
    res.status(404).end();
})
app.post('/ping/:path', (req, res) => {
    res.status(404).end();
})
app.post('/:path/ping', (req, res) => {
    res.status(404).end();
})
app.listen(port, '0.0.0.0',() => {
    console.log('The application is listening on all interfaces on port',port,'!');
})
```

**UTILISATION**
/!\ BIEN ETRE DANS LE DOSSIER "src"

- Pour lancer le projet faire "npx ts-node index.ts"
- A l'aide de votre navigateur ou de curl, faire une requête get sur une des interfaces de votre pc sur le port affiché en console pour la route "/ping"
- Si ces trois conditions ne sont pas respectés, vous aurez une erreur 404
