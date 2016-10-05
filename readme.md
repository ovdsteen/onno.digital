#onno.digital - creative webdeveloper
> This repo contains my website [onno.digital](http://onno.digital).<br>
> Build with reactjs, socket.io, express, webpack, sass and coffee



###Install

Rename `config.sample.json` to  `config.json` and fill in the credentials

```
$ git clone git@github.com:ovdsteen/onno.digital.git
```
```
$ npm install
```
```
$ npm run build
```


###Development
The `npm` scripts use `nodemon` to keep the server alive when developing. <br>
```
$ npm run dev
```
or without `nodemon`
```
$ node server
```


###Server
The site runs on `node` and is hosted on a `nginx` vps.
```
NODE_ENV=production node server.js
```
or with forever
```bash
$ NODE_ENV=production forever start -e /var/www/onno.digital/log/err.log -a --uid onno.digital server.js
```

###Todo
* deploy using `capistrano`
* add realtime socket `slack` connection
