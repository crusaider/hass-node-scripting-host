# hass-node-scripting-host

[![Build Status](https://travis-ci.com/crusaider/hass-node-scripting-host.svg?branch=main)](https://travis-ci.com/crusaider/hass-node-scripting-host)

> A library to enable automation of / communication with a Home Assistant
> installation from a node application.

## Purpose

This library makes it possible to, from a node application communicate with one
or more [Home Assistant](https://www.home-assistant.io/) systems. Based on the
library any type of node application can query the state of a Home Assistant,
subscribe to state changes and and call services in the system.

## Installation

```
npm i hass-node-scripting-host
```

## Prerequisites

The home assistant system will have to expose the
[REST API](https://developers.home-assistant.io/docs/api/rest/) as well as the
[WebSocket API](https://developers.home-assistant.io/docs/api/websocket). Booth
are enabled by default of the Web UI is enabled.

To access the system you will have to generate a
[_long lived access token_](https://www.home-assistant.io/docs/authentication/).

## Documentation

[The generated TypeDoc site](https://crusaider.github.io/hass-node-scripting-host/index.html)

## Example

### Connect to home assistant

```ts
const instance = await HAInstance.create(
  'hostname:port',
  'long-lived-access-token'
);
```

Get object instances representing entities in Home Assistant.

```ts
const sun = instance.getEntity<Sun>(Sun.ENTITY_ID, Sun);
const patioLight = instance.getEntity<Light>('light.patio', Light);
```

Turn the patio light on whe the sun sets.

```ts
sun.state$
  .pipe(
    startWith(await sun.state),
    distinctUntilChanged(),
    filter((s) => s === 'below_horizon')
  )
  .subscribe(() => void patioLight.turnOn());
```

Classes derrived from `Entity` are
Observables that exposes a set of different streams that emits when the state of
the entity changes in Home Assistant. They also implement relevant services for
the different entity types making it possible to change the state of the
entities.

## License

MIT License

Copyright (c) 2020 Jonas Andreasson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
