![banner](http://i.imgur.com/7FS24Ts.png)

- Integrate local country taxi resources.
- SCABER = safe + cab + togerther

## Collaborate
- Detail in [wiki page](https://github.com/SCABER-Dev-Team/SCABER/wiki/Develope).

## Feature
- Ride service
- Rating system
    - Both passenger and driver can rate each other, to promote entire quality.
    - Avoid passenger/driver with bad behavior.
- Security
    - Enhance security of taking taxi.
    - Provide realtime monitor of each passenger/driver, prevent from accident or carjacking.
- Integration
    - Integrate all the locality taxi resources, and promote entire benefit.
- Cooperate with Government
    - Using resources provide on [openData](http://data.gov.tw/wise_search?nodetype=metadataset&kw=%E8%A8%88%E7%A8%8B%E8%BB%8A)

## Installation
- Before start:
```bash
# Step 1:
(install ruby on your platform => take some time)
# Step 2: (install ruby complete)
> gem install sass
# Step 3: (using gem update system)
> gem update --system
```
- Using gulp:
```bash
# Set gulp as global
> npm install -g gulp
# install gulp-sass (can add into)
> npm install gulp-sass
```
- Build & start
```bash
# construct css (if first time use , or having any update)
> npm run build_css
# run the server
> npm run all
```
