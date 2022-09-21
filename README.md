# cogitovirus.com
Personal blog written in hugo.

## local
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
