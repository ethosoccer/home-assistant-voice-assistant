# Home Assistant Voice for Pebble

A single-purpose Pebble app that launches directly into Home Assistant Assist.

This project is a streamlined fork of
[`caco3/pebble-home-assistant-on-your-wrist`](https://github.com/caco3/pebble-home-assistant-on-your-wrist).
It retains the original WebSocket authentication, Assist pipeline support,
dictation UI, and response display while removing entity browsing, favorites,
areas, labels, and other menu features.

## Fast launch behavior

On launch the app:

1. connects and authenticates to Home Assistant;
2. reuses the saved Assist pipeline when available;
3. opens the Assistant screen immediately;
4. starts Pebble dictation automatically; and
5. refreshes the pipeline list in the background.

On first launch, or when no pipeline has been saved, the app performs one
pipeline discovery request before opening Assistant. It does **not** download
Home Assistant entity states or registries.

Press Select to dictate another command. Long-press Select to cycle through
available Assist pipelines.

## Requirements

- A microphone-enabled Pebble supported by the `emery` platform
- Home Assistant reachable from the paired phone
- A Home Assistant long-lived access token
- The Home Assistant Conversation integration and at least one Assist pipeline

## Configuration

Open the app settings in the Pebble mobile app and enter your Home Assistant
URL and long-lived access token. Voice confirmation, font size, and pipeline
selection from the upstream configuration page remain supported.

The access token stays in Pebble settings and is not sent to the hosted
configuration page.

## Build

```bash
pebble build
```

The installable package is created at:

```text
build/pebble-home-assistant-on-your-wrist.pbw
```

Install it through the developer connection or your preferred Pebble
sideloader.

## Project identity

This fork uses its own app UUID and the display name **HA Voice**, so it can be
installed alongside the original Home Assistant app.

## License and attribution

MIT licensed. This derivative retains the original license and copyright
notices for Skylar S and George Ruinelli. See [`license.txt`](license.txt).
