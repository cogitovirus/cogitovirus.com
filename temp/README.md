# cogitovirus.com

Personal blog written in hugo with [cactus theme](https://github.com/monkeyWzr/hugo-theme-cactus) as a base template and sligth retouches on top of it.

## run locally

```sh
hugo server
```

## deploy

First build the site with

```sh
./build.sh
```

TODO: Then deploy using firebase:
check if everything looks good locally

```sh
firebase emulators:start (this has messed up references)
```

push

```sh
firebase deploy --only hosting
```

## TODO

- [ ] bug with low resolution. hamburger/name overlap
- [ ] flexbox for mobile header
- [ ] bug with the relative footer on mobile
