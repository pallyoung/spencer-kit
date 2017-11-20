# helloworld &middot; [![npm version](https://badge.fury.io/js/spencer-kit-project-templates.svg)](https://badge.fury.io/js/spencer-kit-project-templates) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

helloworld

* [build](#build)
* [environment](#environment)
* [proxy](#proxy)
* [directory](#directory)

## Build
when the project inited,4 build environment has been prepared for you.
and you can also configure the build enviroment youself.

```
node build.js --env dev --dist dist --entry project.js
```
you can use --env to set the environment variable,and --dist to set the release dir.
--entry to set the project config file.

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

## proxy

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
