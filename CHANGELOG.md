### 2.1.0
- Fix null values being returned as empty objects (#24)
- Add processCheckIns and abortCheckIn methods to tournament api

### 2.0
- Bump node engine to node >= 6.0.x
- Fix challonge.createClient massageProperties is tautologically true (#2)
- Fix issues caused by previously published versions switching to request (#3)
- Added better documentation (#6)
- Add tests at 100% coverage (#7)
- Fix Client generating duplicate qs props created for nested objects (#13)
- Moved helper methods into utilities (#14)
- Fix malformed urls if an organization has a dash in the name (#15)
- Merged changes from challonge-js fork, to be deprecated (#19)
- Update to es6 standard let/const (#20)
- Add jsformat and jshint for style consistancy (#22)
- Fix crash on creating a client instance with no options

### 1.0
- Initial Release
