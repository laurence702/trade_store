
# Store Assessment


## Snapshots
### Login page
![](https://i.imgur.com/DWpiAeP.jpg)
### Register page

![enter image description here](https://i.imgur.com/fixDwai.png)
*image get's clearer as you enter a more secure password. neat.*
### Home page
![enter image description here](https://i.imgur.com/sEkYlzz.png)
![enter image description here](https://i.imgur.com/bVmb31s.png)

## UIkit
This project mainly uses [UIkit CSS framework](https://getuikit.com/). Though some bootstrap was used in bits

### Tools

```
** This project uses Vue.Js on the frontend
** google firebase for authentication and 
** firestore for data storage
** Cloudinary for assets storage while URL is saved to firestore
** Google places API, and Geocoding service
```

#### If you want to change and use Bootstrap:
```
npm remove uikit --save
npm install bootstrap --save
```
Also don't forget to cleanup `main.js` file.

## Project setup

```
npm install
```

  

### Compiles and hot-reloads for development

```
npm run serve
```

  

### Compiles and minifies for production

```
npm run build
```

  

### Lints and fixes files

```
npm run lint
```
### Run your unit tests
*Tests are not really written, but hopefully I can add them in a later time :)*
```
npm run test:unit
```
### File structure
This is pretty much the default file structure that you get from scaffolding app from `vue-cli 3`, added stuff to suit the needs of the this prject.
```
.
|____.browserslistrc
|____.eslintrc.js
|____.gitignore
|____babel.config.js
|____jest.config.js
|____LICENSE
|____package-lock.json
|____package.json
|____postcss.config.js
|____public
| |____favicon.ico
| |____index.html
| |____js
| | |____imagesloaded.pkgd.min.js
| | |____zxcvbn.js
|____README.md
|____src
| |____App.vue
| |____components
| | |____globals
| | | |____ButtonSpinner
| | | | |____index.vue
| |____main.js
| |____router
| | |____index.js
| |____settings.js
| |____store
| | |____actions
| | | |____auth.js
| | | |____user.js
| | |____index.js
| | |____modules
| | | |____auth.js
| | | |____settings.js
| | | |____user.js
| |____styles
| | |____index.scss
| | |_____variables.scss
| |____utils
| | |____api.js
| |____views
| | |____auth
| | | |____login
| | | | |____img
| | | | | |____login.jpg
| | | | |____index.vue
| | | |____register
| | | | |____img
| | | | | |____register.jpg
| | | | |____index.vue
| | | |____styles
| | | | |____auth-styles.scss
| | |____home
| | | |____index.vue
| | |____layouts
| | | |____App
| | | | |____index.vue
| | |____table
| | | |____index.vue
| | | |____Modal.vue
|____tests
| |____unit
| | |____.eslintrc.js
| | |____HelloWorld.spec.js
|____vue.config.js

```

## LICENSE
MIT
