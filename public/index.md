FORMAT: 1A

# CraftMania.cz API

Server API pro získání statistik a jiných dat z serveru bez použití přímého napojené na databáze.
Vytvořeno v TypeScript & NodeJS.

* Source: https://git.craftmania.cz/craftmania/craftapi-2


# Group Ccomunity
Základní enpoindy pro získání a správu dat z naší databáze hráčů v Ccomunity.

## Data podle nicku [/player/{nick}]

### Data podle nicku [GET]
Získání všech dat podle zadaného nicku. Příklad:

```no-highlight
https://api.craftmania.cz/player/MrWakeCZ
```

+ Parameters
    
    + nick: `MrWakeCZ` (string, required) - Nick hráče na serveru
    
+ Response 200 (application/json)
    
    + Body
    
            {
                "status": 200,
                "data": {
                    "id": 25710,
                    "discriminator": "0001",
                    "nick": "MrWakeCZ",
                    "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
                    "web_group": 11,
                    "registred": 1387654320000,
                    "last_online": 1549764592647,
                    "last_server": "lobby2",
                    "is_online": true,
                    "played_time": 29793,
                    "mc_version": "1.11.2",
                    "economy" {
                        "craftcoins": 18318,
                        "crafttokens": 22,
                        "votetokens": 52,
                        "karma": 0,
                        "achievment_points": 0
                    },
                    "ranked": {
                        "level": 3,
                        "experience": 765,
                        "total_experience": 86532
                    },
                    "votes": {
                        "total": 30,
                        "month": 4,
                        "week": 2,
                        "last_vote": 1549972308250
                    },
                    "social": {
                        "status": "Craftmania je super!",
                        "facebook": "https://xxxx",
                        "twitter": "https://xxxx",
                        "twitch": "https://xxxx",
                        "steam": null,
                        "web": null,
                    }
                }
            }
    
## Data podle UUID [/player/{uuid}]

### Data podle UUID [GET]
Získání všech dat podle zadaného uuid. Příklad:

```no-highlight
https://api.craftmania.cz/player/uuid/43d05dab-2dbc-418b-9e6f-dc73ab916dbc
```

::: warning
#### <i class="fa fa-warning"></i> Varování 
UUID může být originální i warez, jelikož server má mixované UUID dle toho zda má hráč originálku nebo warez.
:::

+ Parameters
    
    + uuid: `43d05dab-2dbc-418b-9e6f-dc73ab916dbc` (string, required) - UUID hráče na serveru
    
+ Response 200 (application/json)
    
    + Body
    
            {
                "status": 200,
                "data": {
                    "id": 25710,
                    "discriminator": "0001",
                    "nick": "MrWakeCZ",
                    "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
                    "web_group": 11,
                    "registred": 1387654320000,
                    "last_online": 1549764592647,
                    "last_server": "lobby2",
                    "is_online": true,
                    "played_time": 29793,
                    "mc_version": "1.11.2",
                    "economy" {
                         "craftcoins": 18318,
                         "crafttokens": 22,
                         "votetokens": 52,
                         "karma": 0,
                         "achievment_points": 0
                    },
                    "ranked": {
                         "level": 3,
                         "experience": 765,
                         "total_experience": 86532
                    },
                    "votes": {
                         "total": 30,
                         "month": 4,
                         "week": 2,
                         "last_vote": 1549972308250
                    },
                    "social": {
                         "status": "Craftmania je super!",
                         "facebook": "https://xxxx",
                         "twitter": "https://xxxx",
                         "twitch": "https://xxxx",
                         "steam": null,
                         "web": null,
                    }
                }
            }
    
# Group Server

## Počet hráčů na serveru [/server/playercount]

### Počet hráčů na serveru [GET]
Endpoint pro získání aktuální online počtu hráčů na serveru, počtu portů a pingu.

```no-highlight
https://api.craftmania.cz/server/playercount
```

+ Response 200 (application/json)

    + Body
    
            {
                "status": 200,
                "data": {
                    "players": {
                        "online": 669,
                        "max": 1000
                    },
                    "version": 399,
                    "latency": 39,
                    "favicon": "xxxxx"
                }
            }