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
                "data": [
                    "id": 25710,
                    "discriminator": "0001",
                    "nick": "MrWakeCZ",
                    "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
                    "web_group": 11,
                    "registred": 1387654320000,
                    "last_online": 1549764592647,
                    "last_server": "lobby2",
                    "is_online": 0,
                    "played_time": 29793,
                    "craftcoins": 183718,
                    "crafttokens": 22,
                    "votetokens": 52,
                    "level": 1,
                    "experience": 677,
                    "karma": 0,
                    "total_votes": 30,
                    "month_votes": 3,
                    "week_votes": 3,
                    "last_vote": 1549972308250,
                    "status": "Hm.. tak jdem na to!",
                    "soc_facebook": "wakecz",
                    "soc_twitter": "0",
                    "soc_ytb": "0",
                    "soc_steam": "0",
                    "soc_twitch": "0",
                    "soc_web": "https://waked.cz",
                    "mc_version": "1.11.2"
                ]
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
                "data": [
                    "id": 25710,
                    "discriminator": "0001",
                    "nick": "MrWakeCZ",
                    "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
                    "web_group": 11,
                    "registred": 1387654320000,
                    "last_online": 1549764592647,
                    "last_server": "lobby2",
                    "is_online": 0,
                    "played_time": 29793,
                    "craftcoins": 183718,
                    "crafttokens": 22,
                    "votetokens": 52,
                    "level": 1,
                    "experience": 677,
                    "karma": 0,
                    "total_votes": 30,
                    "month_votes": 3,
                    "week_votes": 3,
                    "last_vote": 1549972308250,
                    "status": "Hm.. tak jdem na to!",
                    "soc_facebook": "wakecz",
                    "soc_twitter": "0",
                    "soc_ytb": "0",
                    "soc_steam": "0",
                    "soc_twitch": "0",
                    "soc_web": "https://waked.cz",
                    "mc_version": "1.11.2"
                ]
            }
    