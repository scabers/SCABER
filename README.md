# SCABER
- Integrate local country taxi resources.
- SCABER = safe + cab + togerther

# Collaborate
- server-core:
    - `Currently worker`:
        - Kevin Cyu
    - contain mostly server work.
- client-service:
    - `Currently worker`:
    - contain our all front-end resources and work.
    - web designer goes here.
    - repository structure(edit if you modify this repository structure):
        - `views`: ejs files go here.
            - `index.ejs`: main page.
            - `about.ejs`: detail of our develope team.
        - `elements`: also ejs files, but mostly the separated part of main ejs files( contain in "`view`")
            - `header.ejs`: our bootstrap library header.

# Feature
- About manage user account
    - `sign in`/`sign up` part, support:
        - Google
        - Facebook
        - github
        - localStrategy
    - `passenger`/`driver`
        - provide 2 interfaces for user , also you can have both.
- Passenger service
    - `Personal Control Panel`: provide personal status page, let user can manipulate with their information.
    - `Route History`: maintain the routes of users.
- Driver
    
- Rating system
    - Both passenger and driver can rate each other, to promote entire quality.
    - Avoid passenger/driver with bad behavior.
- Security
    - Enhance security of taking taxi.
    - Provide realtime monitor of each passenger/driver, prevent from accident or carjacking.
- Integration
    - Integrate all the locality taxi resources, and promote entire benefit.
