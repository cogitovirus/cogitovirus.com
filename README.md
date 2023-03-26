# cogitovirus.com
Personal blog written in hugo with [cactus theme](https://github.com/monkeyWzr/hugo-theme-cactus) as a base template and sligth retouches on top of it.

## run locally
```
hugo server
```

## deploy
First build the site with
```
./build.sh
```
TODO: Then deploy using firebase:
check if everything looks good locally
```
firebase emulators:start (this has messed up references)
```
push
```
firebase deploy --only hosting
```
## TODO:
- [ ] flexbox for mobile header