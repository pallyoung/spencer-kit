# helloworld

helloworld

* [environment](#environment)
* [usage](#usage)
* [directory](#directory)

## Environment
this project is inited with 4 env,dev、ft、uat and prod.
you can add other env use node build.js --env envname
* dev
develop env,when in development phases,you can use this environment.

```
npm start
```

* ft
this environment is released for test. you can publish the release code to you test server.
ft env
```
npm run ft
```
* uat 
this environment is released for user acceptance test.
uat env

```
npm run uat
```

* prod env
this environment is released for product.
```
npm run release
```
## Directory

```
- root/               # root
    - js/               # js目录
        - views/          # view,
            + pages       # pages
            + components  # components
        + controllers     # controllers
        + constants       # constants
        + stores          # stores
        + utils           # utils
        + libs/           # js lib
    AppRegister.js        # AppRegister.js
    AppRegister.render.js # AppRegister.render.js
    build.js              # build js
    config.rb             # compass config
    project.js            # project config
    package.json          # package.json
    README.md             # readme
    webpack.config.js     # webpack config
```
