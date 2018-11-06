FORMAT: 1A

# CraftMania.cz API

Server API pro získání statistik a jiných dat z serveru bez použití přímého napojené na databáze.
Vytvořeno v TypeScript & NodeJS.

* Source: https://git.craftmania.cz/craftmania/craftapi-2


# Group Základní
Získání aktuální verze API.

## General [/version]

### Získání verze [GET]

+ Response 200 (application/json; charset=utf-8)
    + Attributes
        + version: 1.0.0 (string, required)