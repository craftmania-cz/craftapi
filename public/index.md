FORMAT: 1A
HOST: api.craftmania.cz

# CraftMania.cz API

## Informace
Server API pro získání statistik a jiných dat z serveru bez použití přímého napojené na databáze.
Vytvořeno v TypeScript & NodeJS.

* Source: https://git.craftmania.cz/craftmania/craftapi-2

## Error chyby
Code | Info | Description
--:| ---- | -----------
400 | Bad Request | Neplatný request
401 | Unauthorized | Na request je potřeba ID pro přihlášení
403 | Forbidden | Nedostupné pro public použití
404 | Not Found | Specifikovaný request nebyl nalezen nebo požadavek
405 | Method Not Allowed | Použití requestu s neplatnou metodou
406 | Not Acceptable | Request není ve formátu JSON
410 | Gone | Neexistující cesta
429 | Too Many Requests | Zasílání příliš requestů za krátkou dobu
500 | Internal Server Error | Chyba na serveru
503 | Service Unavailable | Probíhá údržba nebo request není k dispozici (dočasně)

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
    ```json
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
              "economy": {
                  "craftcoins": 18318,
                  "crafttokens": 22,
                  "votetokens": 52,
                  "karma": 0,
                  "achievement_points": 0
              },
              "ranked": {
                  "global_level": 4,
                  "survival_level": 12,
                  "survival_experience": 533,
                  "skyblock_level": 0,
                  "skyblock_experience": 33,
                  "creative_level": 15,
                  "creative_experience": 2002,
                  "vanilla_level": 10,
                  "vanilla_experience": 3083,
                  "prison_level": 30,
                  "prison_experience": 0,
                  "skycloud_level": 0,
                  "skycloud_experience": 0
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
                  "web": null
              },
              "discord": {
                  "id": "76365242422726"
              },
              "deprecated": {
                  "votetokens": 30,
                  "level": 87,
                  "experience": 3332
              }
          }
    }
    ```
            
+ Response 404 (application/json)

    + Body
        ```json
        {
            "status": 404,
            "error": "Not found!",
            "data": []
        }
        ```

+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
            
## Data podle UUID [/player/uuid/{uuid}]

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
    ```json
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
              "economy": {
                  "craftcoins": 18318,
                  "crafttokens": 22,
                  "votetokens": 52,
                  "karma": 0,
                  "achievement_points": 0
              },
              "ranked": {
                  "global_level": 4,
                  "survival_level": 12,
                  "survival_experience": 533,
                  "skyblock_level": 0,
                  "skyblock_experience": 33,
                  "creative_level": 15,
                  "creative_experience": 2002,
                  "vanilla_level": 10,
                  "vanilla_experience": 3083,
                  "prison_level": 30,
                  "prison_experience": 0,
                  "skycloud_level": 0,
                  "skycloud_experience": 0
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
                  "web": null
              },
              "discord": {
                  "id": "76365242422726"
              },
              "deprecated": {
                  "votetokens": 30,
                  "level": 87,
                  "experience": 3332
              }
          }
    }
    ```
            
+ Response 404 (application/json)

    + Body
        ```json
        {
            "status": 404,
            "error": "Not found!",
            "data": []
        }
        ```

+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
          
# Group Economy

## Výpočet levlů [/economy/calclevel/{level}]
### Výpočet levlů [GET]
Enpoint pro výpočet experience a počtu exp do dalšího levelu.

+ Parameters

    + level: `10` (number, required) - požadovaný počet levlu
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": {
        "level": 10,
        "expToNext": 32500,
        "totalExp": 180000
      }
    }
    ```
  
## Log akcí v ekonomice [/economy/log]
### Log akcí v ekonomice [GET]
Enpoint pro zobrazení 100 globálních posledních akcí v CraftEconomy.

::: note
Data v tomto endpointu nejsou dodělány, jelikož nebyl dokončen projekt Player Logs. S verzí 1.15 budou přibývat později více akcí.
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "nick": "MrWakeCZ",
          "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
          "action": "ECONOMY_REGISTER",
          "sender": "server",
          "server": "lobby",
          "old_value": "0",
          "new_value": "0",
          "date": "1575419164275"
        }
      ]
    }
    ```

# Group Achievements

## Log achievementů [/achievements/log]
### Log obdržených achievementů [GET]
Endpoint pro získání logu 100 posledních obdržených achievementů.

### Vysvětlení
* `ach_id`: Interní ID achievementů př. `vanilla_first_join`
* `ach_name`: Zobrazovaný název pro hráče
* `ach_value`: Hodnota Achievement Points, kterou hráč obdrží při splnění.

::: warning
#### <i class="fa fa-warning"></i> Varování 
* `ach_id` je null z důvodu neimplementovaného seznamu achievementů, bude implementováno později.
:::

+ Response 200 (application/json)
    + Body
        ```json
        {
          "status": 200,
          "data": [
            {
              "nick": "MrWakeCZ",
              "uuid": "43d05dab-2dbc-418b-9e6f-dc73ab916dbc",
              "ach_id": null,
              "ach_name": "První připojení",
              "ach_value": "10",
              "server": "vanilla",
              "date": "1575419164275"
            }
          ]
        }
        ```

# Group Leaderboard

## Hlasující celkem [/economy/leaderboard/total-votes]
### Hlasující celkem [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíc hlasy.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 337
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Hlasující za tento měsíc [/economy/leaderboard/month-votes]
### Hlasující za tento měsíc [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíc hlasy v tomto měsíci.
::: note
Data se zde mažou vždy 1. den v měsíci.
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 70
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## Hlasující za tento týden [/economy/leaderboard/week-votes]
### Hlasující za tento týden [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíc hlasy v tomto týdnu.
::: note
Data se zde mažou vždy v pondělí ve 4:00.
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 10
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## CraftCoins [/economy/leaderboard/craftcoins]
### CraftCoins [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíce CraftCoins na serveru.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 78572
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## CraftTokens [/economy/leaderboard/crafttokens]
### CraftTokens [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíce CraftTokens na serveru.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 3
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## VoteTokens [/economy/leaderboard/votetokens]
### VoteTokens [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíce VoteTokens na serveru.

::: note
API zobrazuje pouze VoteTokeny na verzi 1.14
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 70
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Played time [/economy/leaderboard/played-time]
### Played time [GET]
Endpoint pro získání TOP 50 hráčů, s nejdelším časem hraní na serveru.

::: note
Hodnota je zde v minutách.
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 67533
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Achievement Points [/economy/leaderboard/achievement-points]
### Achievement Points [GET]
Endpoint pro získání TOP 50 hráčů, s největším počtem Achievement Pointů za plnění achievementů.

::: note
Hodnota achievement points neudává počet splněných achievementů ale celkovou hodnotu achievementů, které hráč splnil.

Více info: https://wiki.craftmania.cz/levels/achievements.html#hodnoceni-achievementu
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 67533
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
    
## Event Points [/economy/leaderboard/event-points]
### Event Points [GET]
Endpoint pro získání TOP 50 hráčů, s nejvíce Event Pointy na serveru.

::: warning
Event Pointy nejsou aktivní na serveru.
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "value": 3
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Global levels [/economy/leaderboard/levels/global]
### Global levels [GET]
Endpoint pro získání TOP 50 hráčů s největším globalním levelem.

::: note
Globální level je součet server levels.

Více info: https://wiki.craftmania.cz/levels/leveling.html#global-level
:::
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "level": 3
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## Survival levels [/economy/leaderboard/levels/survival]
### Survival levels [GET]
Endpoint pro získání TOP 50 hráčů, s největším levelem na serveru Survival.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "level": 3,
          "experience": 3943,
          "toNextLevel": 987,
          "percentage": 32.2334
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

## Skyblock levels [/economy/leaderboard/levels/skyblock]
### Skyblock levels [GET]
Endpoint pro získání TOP 50 hráčů, s největším levelem na serveru Skyblock.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "level": 4,
          "experience": 3227,
          "toNextLevel": 1,
          "percentage": 99.2334
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Creative levels [/economy/leaderboard/levels/creative]
### Creative levels [GET]
Endpoint pro získání TOP 50 hráčů, s největším levelem na serveru Creative.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "level": 17,
          "experience": 76323,
          "toNextLevel": 8832,
          "percentage": 75.333
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
      
## Vanilla levels [/economy/leaderboard/levels/vanilla]
### Vanilla levels [GET]
Endpoint pro získání TOP 50 hráčů, s největším levelem na serveru Vanilla.
    
+ Response 200 (application/json)
    + Body
    ```json
    {
      "status": 200,
      "data": [
        {
          "index": 1,
          "nick": "MrPhox",
          "uuid": "98e10440-1132-4808-8d0c-a5ac86bca99c",
          "level": 2,
          "experience": 386,
          "toNextLevel": 10,
          "percentage": 98.765
        }
      ]
    }
    ```
  
+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```

# Group Games

## Seznam serverů [/games]

### Seznam serverů [GET]
Endpoint pro získání všech serverů a jejich popisků.

```no-highlight
https://api.craftmania.cz/games
```

+ Response 200 (application/json)

    + Body
        ```json
        {
            "status": 200,
            "data": [
                {
                    "name": "Survival",
                    "description": "...",
                    "type": "survival",
                    "web_image": "https://....",
                    "version": "1.12.2"
                },
                {
                    "name": "BedWars",
                    "description": "...",
                    "type": "minigames",
                    "web_image": "https://....",
                    "version": "1.12.2"
                }
            ]
        }
        ```
    
# Group Server

## Počet hráčů na serveru [/server/playercount]

### Počet hráčů na serveru [GET]
Endpoint pro získání aktuální online počtu hráčů na serveru, počtu portů a pingu.

```no-highlight
https://api.craftmania.cz/server/playercount
```
::: note
Pokud je server offline, zobrazí se počet online hráčů jako 0 a `isOnline` jako `false`.
:::

+ Response 200 (application/json)

    + Body
    ```json
    {
        "status": 200,
        "data": {
            "players": {
                "online": 669,
                "max": 1000
            },
            "isOnline": true,
            "version": 399,
            "latency": 39,
            "favicon": "xxxxx"
        }
    }
    ```
            
## Počet registrovaných hráčů [/server/uniqueplayers]

### Počet registrovaných hráčů [GET]
Endpoint pro získání celkového počtu hráčů registrovaných od prosince 2013 do dneška.

```no-highlight
https://api.craftmania.cz/server/uniqueplayers
```

+ Response 200 (application/json)

    + Body
        ```json
        {
            "status": 200,
            "data": {
                "amount": 988233
            }
        }
        ```

+ Response 500 (application/json)

    + Body
        ```json
        {
            "status": 500,
            "error": "Internal error!",
            "data": []
        }
        ```
