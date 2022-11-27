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
- Si ces trois conditions ne sont pas respectés, vous aurez une erreur 404 vide

# DOCUMENTATION TP02 DEVOPS

**INITIALISATION DU PROJET**

**FAIRE LES COMMANDES SUIVANTES**
```
- cd my_project
- touch Dockerfile
```

**MISE EN PLACE DU CODE**
- Dans le fichier "Dockerfile" copier-coller le code suivant (single stage)
```
FROM node:slim
WORKDIR /app/src
COPY . /app/
RUN npm install express typescript
EXPOSE 8000
CMD ["npx", "ts-node", "index.ts"]
```

**BUILD**
```
sudo docker build -t imageapi .
```
```
Sending build context to Docker daemon  75.52MB
Step 1/6 : FROM node:slim
 ---> fd5a82aaf385
Step 2/6 : WORKDIR /app/src
 ---> Running in 6496e17eeb17
Removing intermediate container 6496e17eeb17
 ---> b04be048cdf6
Step 3/6 : COPY . /app/
 ---> f3863a80848a
Step 4/6 : RUN npm install express typescript
 ---> Running in 22bbcf176464

up to date, audited 85 packages in 1s

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
seth@hackenaton:~/Desktop/COURS_B3/DEVOPS/DEVOPS_B3/TP02$ sudo docker build -t imageapi .
Sending build context to Docker daemon  75.52MB
Step 1/6 : FROM node:slim
 ---> fd5a82aaf385
Step 2/6 : WORKDIR /app/src
 ---> Running in 9255b5eac253
Removing intermediate container 9255b5eac253
 ---> 63b776549b7e
Step 3/6 : COPY . /app/
 ---> 029a1cd2f1ba
Step 4/6 : RUN npm install express typescript
 ---> Running in a658bc9b1208

up to date, audited 85 packages in 1s

7 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice 
npm notice New major version of npm available! 8.19.3 -> 9.1.2
npm notice Changelog: <https://github.com/npm/cli/releases/tag/v9.1.2>
npm notice Run `npm install -g npm@9.1.2` to update!
npm notice 
Removing intermediate container a658bc9b1208
 ---> 962dc476601f
Step 5/6 : EXPOSE 8000
 ---> Running in d2922bcade53
Removing intermediate container d2922bcade53
 ---> bcb410998754
Step 6/6 : CMD ["npx", "ts-node", "index.ts"]
 ---> Running in c18e26f84da0
Removing intermediate container c18e26f84da0
 ---> d08ca5416d55
Successfully built d08ca5416d55
Successfully tagged imageapi:latest
```

**IMAGES DOCKER**
```
sudo docker images -a
```
```
REPOSITORY                TAG       IMAGE ID       CREATED          SIZE
<none>                    <none>    ce6ecae341df   28 seconds ago   328MB
imageapi                  latest    67e52c96b442   28 seconds ago   328MB
<none>                    <none>    62740ed1a4a4   29 seconds ago   328MB
<none>                    <none>    dec2071cf617   31 seconds ago   319MB
<none>                    <none>    d4a7728e89f3   32 seconds ago   244MB
node                      slim      fd5a82aaf385   12 days ago      244MB
dockercloud/hello-world   latest    0b898a637c19   5 years ago      30.8MB
```

**SCAN**
```
seth@hackenaton:~/Desktop/COURS_B3/DEVOPS/DEVOPS_B3$ sudo trivy image imageapi:latest
2022-11-27T22:43:46.112+0100    INFO    Need to update DB
2022-11-27T22:43:46.112+0100    INFO    DB Repository: ghcr.io/aquasecurity/trivy-db
2022-11-27T22:43:46.112+0100    INFO    Downloading DB...
35.36 MiB / 35.36 MiB [----------------------------------------------------------------------------------------------------------------------------------------] 100.00% 16.90 MiB p/s 2.3s
2022-11-27T22:43:49.255+0100    INFO    Vulnerability scanning is enabled
2022-11-27T22:43:49.255+0100    INFO    Secret scanning is enabled
2022-11-27T22:43:49.255+0100    INFO    If your scanning is slow, please try '--security-checks vuln' to disable secret scanning
2022-11-27T22:43:49.255+0100    INFO    Please see also https://aquasecurity.github.io/trivy/v0.35/docs/secret/scanning/#recommendation for faster secret detection
2022-11-27T22:43:59.208+0100    INFO    Detected OS: debian
2022-11-27T22:43:59.208+0100    INFO    Detecting Debian vulnerabilities...
2022-11-27T22:43:59.216+0100    INFO    Number of language-specific files: 1
2022-11-27T22:43:59.216+0100    INFO    Detecting node-pkg vulnerabilities...

imageapi:latest (debian 11.5)

Total: 81 (UNKNOWN: 0, LOW: 61, MEDIUM: 8, HIGH: 10, CRITICAL: 2)

┌──────────────────┬──────────────────┬──────────┬───────────────────┬──────────────────┬──────────────────────────────────────────────────────────────┐
│     Library      │  Vulnerability   │ Severity │ Installed Version │  Fixed Version   │                            Title                             │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ apt              │ CVE-2011-3374    │ LOW      │ 2.2.4             │                  │ It was found that apt-key in apt, all versions, do not       │
│                  │                  │          │                   │                  │ correctly...                                                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2011-3374                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ bash             │ CVE-2022-3715    │ MEDIUM   │ 5.1-2+deb11u1     │                  │ bash: a heap-buffer-overflow in valid_parameter_transform    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-3715                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ bsdutils         │ CVE-2022-0563    │ LOW      │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ coreutils        │ CVE-2016-2781    │          │ 8.32-4            │                  │ coreutils: Non-privileged session can escape to the parent   │
│                  │                  │          │                   │                  │ session in chroot                                            │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2016-2781                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2017-18018   │          │                   │                  │ coreutils: race condition vulnerability in chown and chgrp   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2017-18018                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ e2fsprogs        │ CVE-2022-1304    │ HIGH     │ 1.46.2-2          │                  │ e2fsprogs: out-of-bounds read/write via crafted filesystem   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-1304                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libapt-pkg6.0    │ CVE-2011-3374    │ LOW      │ 2.2.4             │                  │ It was found that apt-key in apt, all versions, do not       │
│                  │                  │          │                   │                  │ correctly...                                                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2011-3374                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libblkid1        │ CVE-2022-0563    │          │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libc-bin         │ CVE-2010-4756    │          │ 2.31-13+deb11u5   │                  │ glibc: glob implementation can cause excessive CPU and       │
│                  │                  │          │                   │                  │ memory consumption due to...                                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2010-4756                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-20796   │          │                   │                  │ glibc: uncontrolled recursion in function                    │
│                  │                  │          │                   │                  │ check_dst_limits_calc_pos_1 in posix/regexec.c               │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-20796                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010022 │          │                   │                  │ glibc: stack guard protection bypass                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010022                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010023 │          │                   │                  │ glibc: running ldd on malicious ELF leads to code execution  │
│                  │                  │          │                   │                  │ because of...                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010023                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010024 │          │                   │                  │ glibc: ASLR bypass using cache of thread stack and heap      │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010024                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010025 │          │                   │                  │ glibc: information disclosure of heap addresses of           │
│                  │                  │          │                   │                  │ pthread_created thread                                       │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010025                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-9192    │          │                   │                  │ glibc: uncontrolled recursion in function                    │
│                  │                  │          │                   │                  │ check_dst_limits_calc_pos_1 in posix/regexec.c               │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-9192                    │
├──────────────────┼──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│ libc6            │ CVE-2010-4756    │          │                   │                  │ glibc: glob implementation can cause excessive CPU and       │
│                  │                  │          │                   │                  │ memory consumption due to...                                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2010-4756                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-20796   │          │                   │                  │ glibc: uncontrolled recursion in function                    │
│                  │                  │          │                   │                  │ check_dst_limits_calc_pos_1 in posix/regexec.c               │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-20796                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010022 │          │                   │                  │ glibc: stack guard protection bypass                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010022                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010023 │          │                   │                  │ glibc: running ldd on malicious ELF leads to code execution  │
│                  │                  │          │                   │                  │ because of...                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010023                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010024 │          │                   │                  │ glibc: ASLR bypass using cache of thread stack and heap      │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010024                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-1010025 │          │                   │                  │ glibc: information disclosure of heap addresses of           │
│                  │                  │          │                   │                  │ pthread_created thread                                       │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-1010025                 │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-9192    │          │                   │                  │ glibc: uncontrolled recursion in function                    │
│                  │                  │          │                   │                  │ check_dst_limits_calc_pos_1 in posix/regexec.c               │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-9192                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libcom-err2      │ CVE-2022-1304    │ HIGH     │ 1.46.2-2          │                  │ e2fsprogs: out-of-bounds read/write via crafted filesystem   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-1304                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libdb5.3         │ CVE-2019-8457    │ CRITICAL │ 5.3.28+dfsg1-0.8  │                  │ sqlite: heap out-of-bound read in function rtreenode()       │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-8457                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libext2fs2       │ CVE-2022-1304    │ HIGH     │ 1.46.2-2          │                  │ e2fsprogs: out-of-bounds read/write via crafted filesystem   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-1304                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libgcrypt20      │ CVE-2021-33560   │          │ 1.8.7-6           │                  │ libgcrypt: mishandles ElGamal encryption because it lacks    │
│                  │                  │          │                   │                  │ exponent blinding to address a...                            │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-33560                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-6829    │ LOW      │                   │                  │ libgcrypt: ElGamal implementation doesn't have semantic      │
│                  │                  │          │                   │                  │ security due to incorrectly encoded plaintexts...            │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-6829                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libgnutls30      │ CVE-2011-3389    │          │ 3.7.1-5+deb11u2   │                  │ HTTPS: block-wise chosen-plaintext attack against SSL/TLS    │
│                  │                  │          │                   │                  │ (BEAST)                                                      │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2011-3389                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libgssapi-krb5-2 │ CVE-2022-42898   │ MEDIUM   │ 1.18.3-6+deb11u2  │ 1.18.3-6+deb11u3 │ krb5: integer overflow vulnerabilities in PAC parsing        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-42898                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2004-0971    │ LOW      │                   │                  │ security flaw                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2004-0971                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-5709    │          │                   │                  │ krb5: integer overflow in dbentry->n_key_data in             │
│                  │                  │          │                   │                  │ kadmin/dbutil/dump.c                                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-5709                    │
├──────────────────┼──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│ libk5crypto3     │ CVE-2022-42898   │ MEDIUM   │                   │ 1.18.3-6+deb11u3 │ krb5: integer overflow vulnerabilities in PAC parsing        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-42898                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2004-0971    │ LOW      │                   │                  │ security flaw                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2004-0971                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-5709    │          │                   │                  │ krb5: integer overflow in dbentry->n_key_data in             │
│                  │                  │          │                   │                  │ kadmin/dbutil/dump.c                                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-5709                    │
├──────────────────┼──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│ libkrb5-3        │ CVE-2022-42898   │ MEDIUM   │                   │ 1.18.3-6+deb11u3 │ krb5: integer overflow vulnerabilities in PAC parsing        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-42898                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2004-0971    │ LOW      │                   │                  │ security flaw                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2004-0971                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-5709    │          │                   │                  │ krb5: integer overflow in dbentry->n_key_data in             │
│                  │                  │          │                   │                  │ kadmin/dbutil/dump.c                                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-5709                    │
├──────────────────┼──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│ libkrb5support0  │ CVE-2022-42898   │ MEDIUM   │                   │ 1.18.3-6+deb11u3 │ krb5: integer overflow vulnerabilities in PAC parsing        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-42898                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2004-0971    │ LOW      │                   │                  │ security flaw                                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2004-0971                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2018-5709    │          │                   │                  │ krb5: integer overflow in dbentry->n_key_data in             │
│                  │                  │          │                   │                  │ kadmin/dbutil/dump.c                                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2018-5709                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libmount1        │ CVE-2022-0563    │          │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libpcre3         │ CVE-2017-11164   │          │ 2:8.39-13         │                  │ pcre: OP_KETRMAX feature in the match function in            │
│                  │                  │          │                   │                  │ pcre_exec.c                                                  │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2017-11164                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2017-16231   │          │                   │                  │ pcre: self-recursive call in match() in pcre_exec.c leads to │
│                  │                  │          │                   │                  │ denial of service...                                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2017-16231                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2017-7245    │          │                   │                  │ pcre: stack-based buffer overflow write in                   │
│                  │                  │          │                   │                  │ pcre32_copy_substring                                        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2017-7245                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2017-7246    │          │                   │                  │ pcre: stack-based buffer overflow write in                   │
│                  │                  │          │                   │                  │ pcre32_copy_substring                                        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2017-7246                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-20838   │          │                   │                  │ pcre: Buffer over-read in JIT when UTF is disabled and \X    │
│                  │                  │          │                   │                  │ or...                                                        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-20838                   │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libsepol1        │ CVE-2021-36084   │          │ 3.1-1             │                  │ libsepol: use-after-free in __cil_verify_classperms()        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-36084                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-36085   │          │                   │                  │ libsepol: use-after-free in __cil_verify_classperms()        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-36085                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-36086   │          │                   │                  │ libsepol: use-after-free in cil_reset_classpermission()      │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-36086                   │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-36087   │          │                   │                  │ libsepol: heap-based buffer overflow in ebitmap_match_any()  │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-36087                   │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libsmartcols1    │ CVE-2022-0563    │          │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libss2           │ CVE-2022-1304    │ HIGH     │ 1.46.2-2          │                  │ e2fsprogs: out-of-bounds read/write via crafted filesystem   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-1304                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libssl1.1        │ CVE-2022-2097    │ MEDIUM   │ 1.1.1n-0+deb11u3  │                  │ openssl: AES OCB fails to encrypt some bytes                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-2097                    │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2007-6755    │ LOW      │                   │                  │ Dual_EC_DRBG: weak pseudo random number generator            │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2007-6755                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2010-0928    │          │                   │                  │ openssl: RSA authentication weakness                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2010-0928                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libsystemd0      │ CVE-2022-3821    │ MEDIUM   │ 247.3-7+deb11u1   │                  │ systemd: buffer overrun in format_timespan() function.       │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-3821                    │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2013-4392    │ LOW      │                   │                  │ systemd: TOCTOU race condition when updating file            │
│                  │                  │          │                   │                  │ permissions and SELinux security contexts...                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2013-4392                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2020-13529   │          │                   │                  │ systemd: DHCP FORCERENEW authentication not implemented can  │
│                  │                  │          │                   │                  │ cause a system running the...                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2020-13529                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libtasn1-6       │ CVE-2021-46848   │ CRITICAL │ 4.16.0-2          │                  │ libtasn1: Out-of-bound access in ETYPE_OK                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-46848                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libtinfo6        │ CVE-2022-29458   │ HIGH     │ 6.2+20201114-2    │                  │ ncurses: segfaulting OOB read                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-39537   │ LOW      │                   │                  │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                  │                  │          │                   │                  │ captoinfo.c                                                  │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libudev1         │ CVE-2022-3821    │ MEDIUM   │ 247.3-7+deb11u1   │                  │ systemd: buffer overrun in format_timespan() function.       │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-3821                    │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2013-4392    │ LOW      │                   │                  │ systemd: TOCTOU race condition when updating file            │
│                  │                  │          │                   │                  │ permissions and SELinux security contexts...                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2013-4392                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2020-13529   │          │                   │                  │ systemd: DHCP FORCERENEW authentication not implemented can  │
│                  │                  │          │                   │                  │ cause a system running the...                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2020-13529                   │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ libuuid1         │ CVE-2022-0563    │          │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ login            │ CVE-2007-5686    │          │ 1:4.8.1-1         │                  │ initscripts in rPath Linux 1 sets insecure permissions for   │
│                  │                  │          │                   │                  │ the /var/lo ......                                           │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2007-5686                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2013-4235    │          │                   │                  │ shadow-utils: TOCTOU race conditions by copying and removing │
│                  │                  │          │                   │                  │ directory trees                                              │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2013-4235                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-19882   │          │                   │                  │ shadow-utils: local users can obtain root access because     │
│                  │                  │          │                   │                  │ setuid programs are misconfigured...                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-19882                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ logsave          │ CVE-2022-1304    │ HIGH     │ 1.46.2-2          │                  │ e2fsprogs: out-of-bounds read/write via crafted filesystem   │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-1304                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ mount            │ CVE-2022-0563    │ LOW      │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-base     │ CVE-2022-29458   │ HIGH     │ 6.2+20201114-2    │                  │ ncurses: segfaulting OOB read                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-39537   │ LOW      │                   │                  │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                  │                  │          │                   │                  │ captoinfo.c                                                  │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────┼──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│ ncurses-bin      │ CVE-2022-29458   │ HIGH     │                   │                  │ ncurses: segfaulting OOB read                                │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-29458                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2021-39537   │ LOW      │                   │                  │ ncurses: heap-based buffer overflow in _nc_captoinfo() in    │
│                  │                  │          │                   │                  │ captoinfo.c                                                  │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2021-39537                   │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ passwd           │ CVE-2007-5686    │          │ 1:4.8.1-1         │                  │ initscripts in rPath Linux 1 sets insecure permissions for   │
│                  │                  │          │                   │                  │ the /var/lo ......                                           │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2007-5686                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2013-4235    │          │                   │                  │ shadow-utils: TOCTOU race conditions by copying and removing │
│                  │                  │          │                   │                  │ directory trees                                              │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2013-4235                    │
│                  ├──────────────────┤          │                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2019-19882   │          │                   │                  │ shadow-utils: local users can obtain root access because     │
│                  │                  │          │                   │                  │ setuid programs are misconfigured...                         │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2019-19882                   │
├──────────────────┼──────────────────┼──────────┼───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ perl-base        │ CVE-2020-16156   │ HIGH     │ 5.32.1-4+deb11u2  │                  │ perl-CPAN: Bypass of verification of signatures in CHECKSUMS │
│                  │                  │          │                   │                  │ files                                                        │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2020-16156                   │
│                  ├──────────────────┼──────────┤                   ├──────────────────┼──────────────────────────────────────────────────────────────┤
│                  │ CVE-2011-4116    │ LOW      │                   │                  │ perl: File::Temp insecure temporary file handling            │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2011-4116                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ tar              │ CVE-2005-2541    │          │ 1.34+dfsg-1       │                  │ tar: does not properly warn the user when extracting setuid  │
│                  │                  │          │                   │                  │ or setgid...                                                 │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2005-2541                    │
├──────────────────┼──────────────────┤          ├───────────────────┼──────────────────┼──────────────────────────────────────────────────────────────┤
│ util-linux       │ CVE-2022-0563    │          │ 2.36.1-8+deb11u1  │                  │ util-linux: partial disclosure of arbitrary files in chfn    │
│                  │                  │          │                   │                  │ and chsh when compiled...                                    │
│                  │                  │          │                   │                  │ https://avd.aquasec.com/nvd/cve-2022-0563                    │
└──────────────────┴──────────────────┴──────────┴───────────────────┴──────────────────┴──────────────────────────────────────────────────────────────┘

```

**UTILISATION**

- Pour lancer le projet faire "sudo docker run -p 8000:8000 imageapi"
- A l'aide de votre navigateur ou de curl, faire une requête get sur une des interfaces de votre pc sur le port affiché en console pour la route "/ping"
- Si ces trois conditions ne sont pas respectés, vous aurez une erreur 404 vide