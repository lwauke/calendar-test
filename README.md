# Calendar App

A calendar written in Vue.js

## Project Setup

```sh
npm install
```

## Run in development mode
```sh
npm run dev
```

## Running on Docker

If you prefer using Docker to install and run:

```sh
docker build -t calendar-test .
docker run --mount type=bind,source="$(pwd)"/src,target=/opt/dev/src -it -p 3000:3000 calendar-test
```

## Running tests
```sh
npm run test
```

## Building
```sh
npm run build
```

The bundles will be generated on `dist` directory

## Considerations

### Tests
I would like to write more tests and improve some things, but I think that I have no time anymore.

Also, I think that you might be asking yourself why I did not use jest, but it's only because vitest it's easier to integrate with the vue-cli project. I didn't want to loose much time just writing configs.

### State manager usage

I did not want to keep all the days on a store because I think that it is not necessary.

If we think about state as properties that changes over the time, then days of a month are not states, once the days of a month will always be the same.

However, I decided to keep the date as a key of an Object which value is an Array of reminders as the state. In my opinion, it is easier to render all reminders or just delete everything in a simple way like this

### Weather API

Sometimes I don't receive any data from some cities. But if you search for some capital, problably you will get some response.

Also, the API has a limit of 500 requests per day.
https://www.meteomatics.com/en/api/getting-started/

### Acessibility
I did have no time to test in a reader screen and maybe some components can be unaccessible for it.
However, I tried to make the most accessible that I could make for keyboard users.

## Conclusion
Well, I would like to have more time to improve some components, but I think this is good as a result of few work days.

I hope you like it too and thank you for your time :)