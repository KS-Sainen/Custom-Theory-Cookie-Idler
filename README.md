# Cookie Idler
The repository for my first exponential theory called "Cookie Idler"
## Basic Guide
> Quoting this from the main instruction text

Welcome to a theory all about cookies and more cookies!!!
You have 3 currencies, cookies(C), heavenly chips(H), and sugar lumps(L), which you'll be spending on upgrades located on both tabs.
Cookies by far is the most important, as the majority of the gameplay revolves around it, from buildings to even tau! You can get your first batch of cookies by buying a cursor, which is gifted to you for free to kickstart your very own cookie empire! By maximizing CPS(C dot), you are sure to produce a whole lot of cookies.
Heavenly Chips are a special type of cookie that forms whenever you sacrificed everything material you own in exchange for greater power(called publications). They can be used for all sorts of special upgrades, and might even end up boosting your CPS if you know enough.
Sugar lumps by far are the hardest to acquire, literally requiring luck in order to get some, but its powers of being able to outright boost your building's CPS by 10%, multiplicative! Rumor has it that it gets easier to acquire the more cookies you have.

## Query Commands
For the `- Redux` version, I've implemented a bunch of query commands that are meant to be run through the SDK console. Many of the commands are useful for keep track of CPS/Multipliers, Internal State, and Achievements. The following is a list of implemented query commands
1. `getAllUpgradeMultiplierFromCookie(cookie)`
Input in `cookie` and the console will print out all possible upgrades that can be purchased with `cookie` C and their respective multipliers before totalling them at the last line.
2. `getCPSBuildingFromCookie(cookie, index, lumpLv)`
An advanced version of the above function, now involving specific buildings, does all of the above, with `index`th building having `lumpLv` building lump level. Will also takes Continuous Growth and Empowerments upgrade into consideration if you have enough cookies.
3. `getAllAchCount()`
Prints the highest possible value of `achCount` and the highest `achCount` coming from Feats. 
4. `printStateTable()`
Prints the entire "Table" of the internal state, useful for catching some mischevious entries or table errors.
5. `getBuildingLump(lump)`
Prints how many levels of sugar lump upgrades you can purchase with `lump` L per building.
6. `getBuildingCollect()`
Prints the amount of cookies collected per building at the very moment. Also comes with local and global multipliers for added detail.
7. `TestBuildingDisplay(indx)`
Prints the raw text of every possible description and info of each building(3(normal/power/lump) x 2(info/desc) x 3(normal/compressed/????) = 18 per building!).

# THE SPOILER SECTION
## Table of Values
### 1 - Basic Building Information
Every single building has a `1.15` price multiplier whenever you buy each building, 1000x is around 50 of them
| Order  | Buliding Name | Base Cost | Base CPS |
| ------------- | ------------- | ----- | -----|
| 0 | Cursor | 11 | 7 |
| 1 | Grandma | 1000 | 310 |
| 2 | Farm | 110000 | 53000 |
| 3 | Mine | 1.2e8 | 7.4e7 |
| 4 | Factory | 1.3e12 | 4.05e10 |
| 5 | Bank | 1.4e18 | 1.4e12 |
| 6 | Temple | 2e25 | 1.6e18 |
| 7 | Wizard Tower | 3.3e50 | 4.4e32 |
| 8 | Shipment | 5.1e75 | 2.6e39 |
| 9 | Alchemy Lab | 7.5e100 | 5.6e51 |
| 10 | Portal | 1e125 | 6.66e60 |
| 11 | Time Machine | 1.4e150 | 6.5e74 |
| 12 | Antimatter Condenser | 1.7e180 | 3.15e85 |
| 13 | Prism | 2.1e215 | 4.9e97 |
| 14 | Chancemaker | 2.6e300 | 2.1e125 |
| 15 | Fractal Engine | 3.1e350 | 1.5e170 |
| 16 | Javascript Console | 7.1e400 | 1.1e185 |
| 17 | Idleverse | 1.2e450 | 8.3e200 |
| 18 | Cortex Baker | 1.9e500 | 6.4e250 |
