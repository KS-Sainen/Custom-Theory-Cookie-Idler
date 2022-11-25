import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { log, Utils } from "./api/Utils";
import { UI } from "./api/ui/UI";
import { Game } from "./api/Game";
import { ConstantCost, CustomCost } from "../api/Costs";
import { ImageSource } from "../api/ui/properties/ImageSource";
import { Popup } from "../api/ui/Popup";
import { ui } from "../api/ui/UI";
import { FontFamily } from "../api/ui/properties/FontFamily";
import { Thickness } from "../api/ui/properties/Thickness";
import { profilers } from "../api/Profiler";
import { TextAlignment } from "../api/ui/properties/TextAlignment";
import { FontAttributes } from "../api/ui/properties/FontAttributes";
import { QuaternaryEntry } from "../api/Theory";
// Hello to the person reading this "code"
// Spoilers alert for ALL of the upgrades, buildings and achievements
// Before leaving, please try and find any bugs or bad JS coding practices for me

// Some parameters
// If you're wondering why the refund button doesn't appear, please refer to line 646 and you would know something's up

var id = "CookieIdler";
var name = "Cookie Idler";
var description = "🍪👵🍪\nA game within a theory involving baking a copius amounts of cookies in exchange for something far greater...\n🍪👵🍪\n\n🍪==FEATURES==🍪\n🍪 Click, Bake, Farm, Produce your way into the big leagues. With 19 buildings to buy, empower, and upgrade.\n🍪 Experience a whole new level of text richness in theories like never before. Boatloads of text waiting to be read in all aspects, from the buildings, achievements, all the way to upgrades(nerdy mode included).\n🍪 Unique upgrades and intresting game mechanics will involve you to no end! Tasty Cookies, even tastier cookies, breaking the fourth wall, and changing the game itself.\n🍪Absolute lack of big and scary mathematics, rated E for Everyone\n\n🍪==CREDITS==🍪\n🍪 Orteil for bringing such a legendary game idea to life\n🍪 ellipsis for suggesting ideas for the UI\n🍪 skyhigh173 for reformatting the code so it looks better\nspqcey(randomname#9373) for proofreading and fixing a majority of the text\n🍪 Lava for fixing the legendary bug";
var authors = "Sainen Lv.420 #2684";

/*
 Big thinks to these people!
 ellipsis
 sky
 spqcey
 Lava#3374
 Frozen Moon#7244 (alex)
 elkshadow5#7952

 feel free to add more into the list.
 */
var version = 1.4;

// Function Name Reductions
/**
 * Returns the BigNumber equivalent of any of the following arguments. Functionally IDENTICAL to BigNumber.from()
 * @param {number|string|BigNumber} i
 * @return {BigNumber} The BigNumber from the given input i
 */
let BF = (i) => BigNumber.from(i);

/**
 * Returns the value of i^p, identical to Math.pow(i,p)
 * @param {number} i The base
 * @param {number} p The exponent
 * @return {number} The value of i^p
 */
let MP = (i, p) => Math.pow(i, p);

/**
 * Returns the 2nd logarithm of the given number, identical to Math.log2(i)
 * @param {number} i The given number
 * @return {number} The 2nd logarithm of the given number
 */
let ML2 = (i) => Math.log2(i);

/**
 * Returns the 10th logarithm of the given number, identical to Math.log2(i)
 * @param {number} i The given number
 * @return {number} The 10th logarithm of the given number
 */
let ML10 = (i) => Math.log10(i);

/**
 * Returns a random number within the range of [0,1]
 * @param void
 * @return {number} A random number within the range of [0,1]
 */
let MR = () => Math.random();

/**
 * Identical to Math.pow(i,p) but for big numbers; also automatically converts any valid BigNumber inputted
 * @param {number|string|BigNumber} i The base
 * @param {number} p The exponent
 * @return {BigNumber} The value of i^p
 */
let BigP = (i, p) => BF(i).pow(p);

/**
 * Gives the equivalent cookies compared to i minutes of your CPS
 * @param {number|string|BigNumber} i The number used
 * @return {BigNumber} The value of log10(i)
 */
let BigL10 = (i) => BF(i).log10();

/**
 * Identical to Math.i) but for big numbers; also automatically converts any valid BigNumber inputted
 * @param {number|string|BigNumber} i The number used
 * @return {BigNumber} The value of log2(i)
 */
let BigL2 = (i) => BF(i).log2();

/**
 * Converts the given valid BigNumber string into a string without any decimal places
 * @param {number|string|BigNumber} i The BigNumber used
 * @return {string} The string without any decimal places
 */
let BigTS = (i) => BF(i).toString(0);

/**
 * Converts a given number to a string
 * @param {number} i The number used
 * @return {string} The string representation of the number
 */
let TS10 = (i) => i.toString(10);

/**
 * Returns a random integer in the range of [0,i]
 * @param {number} i
 * @return {number} A random integer in the range of [0,i]
 */
let RandI = (i) => Math.floor(MR() * i);

/**
 * Returns a random number in the range of [s,e] where s >= e
 * @param {number} s The maximum number
 * @param {number} e The minimum number
 * @return {number} A random number in the range of [s,e]
 */
let RandR = (s, e) => e + (MR() * (s - e));


// Prize Functions
let prize = 0;
/**
 * @desc Gives the equivalent cookies compared to i minutes of your CPS
 * @param {number} i
 */
let minCookie = (i) => {
    cookie.value += BF(60) * CPS * BF(i) * Logistic();
};

/**
 * @desc Gives the equivalent heavenly chips if you pubbed at this moment
 * @param {number} i
 */
let pubH = (i) => {
    if (cookie.value <= 0) return;
    hc.value += BF(i) * (cookie.value / BF("1e12")).pow(1 / 3);
};

/**
 * @desc Gives the equivalent amount of lumps for i ticks
 * @param {number} i
 */
let tickLump = (i) => {
    let dL = (BF(i) * (LPS - (sugarCoat.level * 2.475) - (recom.level + ((artArt.level > 7) ? 10 : 0)) * 0.009)) + (1 / (lumpc / BigL10(BF(10) + (cookie.value).abs()))) * BF(i);
    lump.value += dL;
    lumpTotal += dL;
};

/**
 * @desc Binary searches through an array arr to the desired number f
 * @param {array} arr, must be sorted from maximum to minimum
 * @param {number} f, value to search for
 * @returns {number} the index where the next element is less than, -1 if it's beyond the end of the array
 */
let bsearch = (arr, f) => {
    if (f >= arr[0]) {
        return 0;
    }
    if (f < arr[arr.length - 1]) {
        return -1;
    }
    let l = 0, r = arr.length - 1;
    let mid = 0;
    while (l < r) {
        mid = l + r >> 1;
        if (f > arr[mid]) {
            r = mid - 1;
        } else if (f < arr[mid]) {
            l = mid + 1;
        } else {
            return mid;
        }
    }
    return arr[r] <= f ? r : r + 1;
};

// States (And thus begins the spoilers)
/**
 * @desc Serializes the state of the theory
 * @returns {string} The internal state of the array, compatible with setInternalState()
 */
var getInternalState = () => {
    // 0, 1, 2, 3, 4, 5, 6
    let st = `${achCount} ${vizType} ${lumpTotal} ${eqType} ${artUnlock} ${BigTS(CPS)} ${BigTS(HPS)} `;
    // 7-14
    for (let i = 0; i < 8; i++) {
        st += `${spellCast[i]} `;
    }
    // 15, 16, 17
    st += `${heavVis} ${bInfo} ${perkPoint} `;
    // 18->36
    for (let i = 0; i < 19; i++) {
        st += `${buiPerk[i]} `;
    }
    // 37, 38, 39
    st += `${eqC} ${reactorMode} ${dominate} `;
    // 40
    // [REMOVED]
    // 41->49
    for (let i = 0; i < 9; i++) {
        st += `${spellCountCast[i]} `;
    }
    // 50
    st += `${quType} `;
    return st;
};

/**
 * @desc Sets certain values of the theory according to the serialized state
 * ! The values set are the following:
 * ! Achievement Count, Visualizer Type(unused), Total Lumps, Equation Type, Artifacts Unlocked, CPS, HPS, Time since last cast of every spell
 * @param {state} state, must be from getInternalState() only
 */
var setInternalState = (state) => {
    let res = state.split(" ");
    if (res.length > 0) {
        achCount = parseInt(res[0]);
    }
    if (res.length > 1) {
        vizType = parseInt(res[1]);
    }
    if (res.length > 2) {
        lumpTotal = parseInt(res[2]);
    }
    if (res.length > 3) {
        eqType = parseInt(res[3]);
    }
    if (res.length > 4) {
        artUnlock = parseInt(res[4]);
        artArt.maxLevel = artUnlock + 1;
    }
    if (res.length > 5) {
        CPS = BF(res[5]);
    }
    if (res.length > 6) {
        HPS = BF(res[6]);
    }
    for (let i = 0; i < 8; i++) {
        if (res.length > (7 + i)) {
            spellCast[i] = parseInt(res[7 + i]);
        }
    }
    if (res.length > 15) {
        heavVis = parseInt(res[15]);
    }
    if (res.length > 16) {
        bInfo = parseInt(res[16]);
        biButton.text = `Building Display\n${binfoname[bInfo]}`;
    }
    if (res.length > 17) {
        perkPoint = parseInt(res[17]);
    }
    if (Number.isNaN(perkPoint)) {
        perkPoint = 0;
    }
    perkHas = perkPoint;
    for (let i = 0; i < 19; i++) {
        if (res.length > (18 + i)) {
            buiPerk[i] = parseInt(res[18 + i]);
            perkHas -= buiPerk[i];
        } else {
            buiPerk[i] = 0;
        }
        perkMenu.content.children[3].children[0].children[i].children[1].text = `${buiPerk[i]} / ${maxbuiPerk(i)}`;
    }
    if (res.length > 37) {
        eqC = parseInt(res[37]);
    } else {
        eqC = 0;
    }
    if (res.length > 38) {
        reactorMode = parseInt(res[38]);
    } else {
        reactorMode = -1;
    }
    if (res.length > 39) {
        dominate = parseInt(res[39]);
    } else {
        dominate = 0;
    }
    if (res.length > 40) {
        // [REMOVED]
    }
    for (let i = 0; i < 9; i++) {
        if (res.length > (41 + i)) {
            spellCountCast[i] = parseInt(res[41 + i]);
        } else {
            spellCountCast[i] = 0;
        }
        if (Number.isNaN(spellCountCast[i])) {
            spellCountCast[i] = 0;
        }
    }
    if (res.length > 50) {
        quType = parseInt(res[50]);
        if(Number.isNaN(quType) || !Number.isFinite(quType)) {
            quType = 0;
        }
        quartButton.text = `Quaternary Values\n${quName[quType]}`;
    } else {
        quType = 0;
    }
    reactorInterim = reactorMode;
    reactorMenu.content.children[2].text = `Current Element : ${(reactorInterim > -1) ? elemFormalName[reactorInterim + 2] : "OFF"}`;
};

// Initializes the variables for the serialized string(the scope is global)
let CPS = BigNumber.ZERO,
    HPS = BigNumber.ZERO,
    LPS = BigNumber.ZERO;
let achCount = 0;
let vizType = 0;
let lumpTotal = BigNumber.ZERO;
let eqType = 0, quType = 0;
let artUnlock = 0;
let time = 0; // degrees
let spellCast = new Array(8).fill(0);
let heavVis = 0;
let bInfo = 0;
let buiPerk = new Array(21).fill(0);
let maxbuiPerk = (indx) => (indx == 2) ? 3 : 5;
let perkPoint = 0;
let perkHas = 0;
let eqC = 0;
let reactorMode = -1, reactorInterim;
let dominate = 0;
let spellCountCast = new Array(9).fill(0);

// End States


// Profiling things for performance and optimizations
var profiler1 = profilers.get("profiler1");


//==Utility Variables==
var buip;
const lumpc = 500;
const buipb = 1.1;
const buiexp = 0.05;
const bcp = 0.01;
let subconstant = BF(1);// filling in the missing parts
let arrcps = new Array(21).fill(0);
let getbuip = () => buipb + (0.01 * superL.level);
let lumpbf = BigNumber.ZERO;
let hbf = BigNumber.ZERO;


//==Primary Vairables==
var cookie, hc, lump, milk;
var elements = new Array(9);
var isCurrencyVisible = (indx) => indx <= 2;
const elemName = ["Be", "Ch", "Bg", "Su", "Jm", "Cs", "Hz", "Mn", "As"];
const elemFormalName = ["Berrylium", "Chalcedhoney", "Buttergold", "Sugarmuck", "Jetmint", "Cherrysilver", "Hazelrald", "Mooncandy", "Astrofudge"];
const elemWeight = [1, 2, 3, 5, 8, 13, 21, 36, 57];
const nextExcavateReq = [0, 1.2e13, 9.5e11, 1.25e11, 4e8, 5e7, 7.5e6, 100000];// req to unlock THAT element(comp: n-1)


//==Buildings==
let building = new Array(21);
let buildingName = [
    [
        "Cursor",
        "Grandma",
        "Farm",
        "Mine",
        "Factory",
        "Bank",
        "Temple",
        "Wizard Tower",
        "Shipment",
        "Alchemy Lab",
        "Portal",
        "Time Machine",
        "Antimatter Condenser",
        "Prism",
        "Chancemaker",
        "Fractal Engine",
        "Javascript Console",
        "Idleverse",
        "Cortex Baker",
    ],
    [
        "Cursof",
        "Gradnma",
        "Famr",
        "Meni",
        "Fcotyr",
        "Bawknk",
        "Themple",
        "Wiszard Trower",
        "Shipement",
        "Alchemy Lasb",
        "Proalt",
        "Time Macine",
        "Antimatter Condenstor",
        "Prims",
        "Chamceamekr",
        "Framcael Engine",
        "Jacascipr Consoel",
        "IDledeverse",
        "Corex Baker",
    ],
];
let buildingDesc = [
    "clicking ",
    "baking ",
    "growing ",
    "mining ",
    "mass producing ",
    "interesting ",
    "directing in ",
    "spawning in ",
    "bringing in ",
    "transmuting ",
    "retrieving ",
    "preventing cookies from being eaten by ",
    "synthesizing ",
    "matterifying from light ",
    "lucking in ",
    "duplicating in ",
    "hacking in ",
    "hijacking ",
    "thinking up ",
];
let baseCost = [
    11,// 0
    1e3,// 1
    1.1e5,// 2
    1.2e8,// 3
    1.3e12,// 4
    1.4e18,// 5
    2e25,// 6
    3.3e50,// 7
    5.1e75,
    7.5e100,
    1e125,
    1.4e150,
    BF("1.7e180"),
    BF("2.1e215"),
    BF("2.6e300"),
    BF("3.1e351"),// 15
    BF("7.1e425"),// 16
    BF("1.2e1450"),// BREAK
    BF("1.9e1500"),
];
// Ideally, 1/a lot base
let bcps = [
    7,// 0
    310,// 1
    5.3e4,// 2
    7.4e7,// 3
    4.05e10,// 4
    1.4e12,// 5
    4.8e18,// 6
    1.1e29,// 7, 2.5x
    1.58e38,// 8
    1.12e50,// 9, doubled
    6.66e58,// 10
    6.5e72,// 11
    9.15e79,// 12
    BF("4.9e96"),// 13
    BF("2.1e123"),// 14
    BF("2.2e150"),// 15
    BF("3.1e187"),// 16
    BF("8.3e190"),// 17
    BF("6.4e195"),// 18
];
// Getting the info of a building but in a function
var getInf = (index, am) => {
    if (bInfo == 1) {
        return `\$B[${index}]^{${(getExpn(index) > 1) ? getExpn(index) : ""}}\$ = ${Utils.getMathTo(calcBuilding(index, 0), calcBuilding(index, am))}`;
    }
    let result = buildingName[0 + Math.floor(bInfo / 2)][index];
    if (building[index].level == 1) {
        result += " ";
    } else {
        result += "s ";
    }
    // Sorry, but you CAN'T get 1 CPS per building skill issue lol
    result += buildingDesc[index] + BF(arrcps[index]).toString(0) + " cookies per second";
    return result;
};
var universalBought = (indx) => {
    updateMult();
    if ((cookie.value > 1e50) && indx != dominate) {
        return;
    } else if ((cookie.value > 1e50) && indx == dominate) {
        lessPreciseCalcCPS();
    } else {
        calcCPS();
    }
};


//==Types of Cookies==
var cookieT, crystalHoney;
var mult = BF(1);
var updateMult = () => {
    mult = BF(1);
    mult *= (getCookieP(cookieT.level) * (1 + (CookieTau.level * game.tau.log10().log10().pow(2))));
    //"cookiep : " + (getCookieP(cookieT.level) * (1+(CookieTau.level * game.tau.log10().log10().pow(2)))));
    mult *= (1 + (BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp));
    //"click : " + (1+(BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp)));
    mult *= ((TwinGates.level > 0) ? hc.value.pow(0.03 * TwinGates.level) : 1);
    //"twin : " + ((TwinGates.level > 0) ? hc.value.pow(0.03 * TwinGates.level) : 1));
    mult *= theory.publicationMultiplier;
    //"pub : " + theory.publicationMultiplier);
    mult *= (BigP(game.sigmaTotal, R9Box.level * 0.7));
    //"r9 : " + (BigP(game.sigmaTotal,R9Box.level*0.7)));
    mult *= ((artArt.level > 9) ? BF(100) : BF(1));
    //"art9 : " + ((artArt.level > 9)?BF(100):BF(1)));
    mult *= ((ChronosAge.level > 0) ? (BF(1) + BF(thyme.level).pow(0.5)) : BF(1));
    //"chrono : " + ((ChronosAge.level > 0)?(BF(1) + BF(thyme.level).pow(0.5)):BF(1)));
    mult *= ((artArt.level > 4) ? BigP(building[1].level, 0.61) : BF(1));
    //"art4 : " + ((artArt.level > 4)?BigP(building[1].level,0.61):BF(1)));
    mult *= ((((spellCast[1] + (10 * effectCPSBDur)) >= thyme.level)) ? effectCPSB : BF(1));
    //"spellsus : " + ((((spellCast[1]+(10*effectCPSBDur)) >= thyme.level))?effectCPSB:BF(1)));
};
/**
 * Calculates the total boost from the different types of cookies you have
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieT.level
 * @returns {BigNumber} The total amount of cookie boost you have from the normal cookie flavors
 */
var getCookieTP = (level) => {
    let res = BF(1);
    level += crystalHoney.level * 10;
    if (level >= 150) {
        res = BF(1.13).pow(level);
    } else if (level >= 100) {
        res = BF(1.11).pow(level);
    } else if (level >= 75) {
        res = BF(1.09).pow(level);
    } else if (level >= 50) {
        res = BF(1.07).pow(level);
    } else if (level >= 25) {
        res = BF(1.05).pow(level);
    } else {
        res = BF(1.03).pow(level);
    }
    return res;
};
/**
 * Calculates the total cookie power
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieT.level
 * @returns {BigNumber} The total amount of cookie boost you have
 */
var getCookieP = (level) => {
    // let bn = (num) => BF(num);
    let res = getCookieTP(level);
    for (let i = 0; i < cookieTinName.length; i++) {
        res *= BigP(cookietP[i], cookiet[i].level);
    }
    if (CookieS.level != 0) res *= (BigNumber.TWO + lump.value).log2().pow(1.5);
    if (CookieH.level != 0) res *= (BigNumber.TEN + hc.value).log10().pow(1.25);
    if (CookieC.level != 0 && (cookie.value > BigNumber.ZERO)) res *= (BigNumber.TEN + cookie.value).log10().pow(0.9);
    if (DivineD.level != 0) res *= BigNumber.TWO.pow(DivineD.level);
    res *= BigP(1.01, invest.level);
    if (superC.level > 0) {
        res = BigP(res, 1.05);
    }
    return res;
};
// An array of strings containing every single cookies types for use in displaying the name
const cookieType = ["Plain Cookie", "Chocolate Chip Cookie", "Sugar Cookie", "Oatmeal Raisin Cookie", "Peanut Butter Cookie", "Coconut Cookie", "Almond Cookie", "Hazelnut Cookie", "Walnut Cookie", "Cashew Cookie", "White Chocolate Cookie", "Milk Chocolate Cookie", "Macadamia Cookie", "Double Chip Cookie", "White Chocolate Macadamia Cookie", "All-Chocolate Cookie", "Dark-Chocolated Coated Cookie", "White-Chocolate Coated Cookie", "Eclipse Cookie", "Zebra Cookie", "Snickerdoodle", "Stroopwafel", "Macaroon", "Madeleine", "Palmier", "Palets", "Sables", "Pure Black Chocolate Cookie", "Pure White Chocolate Cookie", "Ladyfingers", "Tullies", "Checker Cookie", "Butter Cookie", "Vanilla Cream Cookie", "Gingersnap", "Cinnamon Cookie", "Vanity Cookie", "Pinwheel Cookie", "Shortbread Biscuits", "Millionare\'s Shortbread", "Caramel Cookie", "Pecan Sandies", "Moravian Spice Cookie", "Anzac Biscuit", "Whole Grain Cookie", "Candy Cookie", "Big Chipped Cookie", "Spinkled Cookie", "Anti-Idle Cookie", "Florentine", "Chocolate Crinkles", "Zero-Idle Cookie", "Maple Cookie", "Persian Rice Cookie", "Norwegian Cookie", "Crispy Rice Cookie", "Ube Cookie", "Butterscotch Cookie", "Speculaas", "Chocolate Oatmeal Cookie", "Molasses Cookie", "Biscotti", "Waffle Cookie", "Custard Cream Cookie", "Bourbon Biscuits", "Mini-Cookie", "Whoopie Pies", "Caramel Wafer Biscuits", "Chocolate Chip Mocha Cookie", "Earl Grey Cookie", "Chai Tea Cookie", "Myanmar Tea Cookie", "Thai Tea Cookie", "Corn Syrup Cookie", "Icebox Cookie", "Graham Cracker", "Hardtack", "Tofu Cookie", "Gluten-Free Cookie", "Lebkuchen", "Aachener Printen", "Canistrelli", "Petit Beurre", "Nanaimo Bars", "Berger Cookie", "Chinsuko", "Putri Salju", "Milk Cookie", "Kruidnoten", "Marie Biscuits", "Meringue Cookie", "Yogurt Cookie", "Thumbprint", "Pizzelle", "Granola Cookie", "Ricotta Cookie", "Roze Koeken", "Peanut Butter Cup Cookie", "Sesame Cookie", "Vanillekipferl", "Battenberg Biscuits", "Rosette Cookie", "Gangmakers", "Welsh Cookie", "Raspberry Cheesecake Cookies", "Bokkenpootjes", "Fat Rascals", "Ischler Cookies", "Matcha Cookie", "Super Fusion Cookie", "Spicy Cookie", "Kolachy Cookie", "Gomma Cookie", "Coyotas", "Frosted Sugar Cookie", "Marshmallow Sandwich Cookie", "Chocolate Chip Covered Chocolate Chip Cookie", "Benne Wafers", "Bizcochitos", "Yakgwa", "Alfajores", "Super Idler Flavored Cookie"];
const basect = 2.2e6;
const ctr = ML2(2700);
const defaultcookieType = "Exotic Undefined Cookies";
const cookieInf = "Increases overall CPS by making your cookie taste better.";


//==Kitty==
var kitty;
const kittyDName = "Very Chawwtic Kitty";
const kittyID = 69420; // ouo
const kittyExp = ML2(9750);
const kittyCost = 75000;
const kittyName = [
    "Helper Kittens",
    "Worker Kittens",
    "Engineer Kittens",
    "Overseer Kittens",
    "Manager Kittens",
    "Accountant Kittens",
    "Specialist Kittens",
    "Expert Kittens",
    "Consultant Kittens",
    "Assistants to the Regional Kittens",
    "Marketeer Kittens",
    "Analyst Kittens",
    "Kitten Executive",
    "Senior Kitten Executive",
    "The meowy boss",
];
/**
 * Calculated the amount of kitty power you have
 * @param {number} level The level of the kitty upgrade
 * @returns {BigNumber} The amount of kitty boost you have
 */
var kittyPower = (level) => {
    let ret = BF(1);
    if (level >= 50) {
        ret += BF((level - 49) * 0.5);
    }
    if (level >= 25) {
        ret += BF((level - 24) * 0.4);
    }
    if (level >= 10) {
        ret += BF((level - 9) * 0.3);
    }
    ret += level * 0.2;
    if (artArt.level > 2) {
        ret = BigP(ret, 1.5 + (achCount * 0.01));
    }
    return ret;
};


//==UNIQUE UPGRADES==
// GRANDMA - Covenant Upgrade (Shipment -> Alchemy Lab)
var covenant;
const covExp = 5.1;
const covDelta = 0.6;
// FARM - Yggdrasil
var ygg;
const yggName = "Yggdrasil $(Y_{g})$";
const yggInfo = "Empower your farms with the power of time and cookie ancients";
// MINE - Terra + Excavation Site
var terra, excavate, moreExcavator;
const terraName = "Mass Terraforming $(T_{r})$";
const terraInfo = "Unlocks/Improves a buff that temporarily boosts your CPS by a lot";
// FACTORY - Recombobulators
var recom;
const recomName = "Recombobulators $(R_{e})$";
const recomInfo = "Produces a constant stream of all currencies! What a dream!";
// BANK - Investment
var invest;
const investName = "Investment Openings $(I_{o})$";
const investInfo = "Open your very own investments forms. Grants 5 buildings of random type and a flat 1.01 CPS boost!(chance of failure included)";
// TEMPLE - Archaeology
var art, artArt;
const artName = "Archaeology $(A_{r})$";
const artInfo = "Go into your own temples to discover some secrets lost to mankind";
const artArtName = [
    "Rhombus of Chocolatance",// 0Temple CPS goes up
    "Occam\'s Lazer",// 1Prism CPS goes up
    "All-Natural ouo sugar",// 2Cats become CPS
    "Doctor T\'s Thesis",// 3Cursor CPS
    "Bountiful box of Gilles-Philippe",// 4Grandma CPS
    "Key to the Conservatorium",// 5Farm CPS
    "Coreforge Bar",// 6Terra-Finity + Mine CPS
    "Da Vinci Manuscript",// 7Factory CPS
    "A very curious tulip bulb",// 8Bank CPS
    "Book of Symbolisms",// 9Chancemaker Unlock
    "Grimoire of Basic Cookie Magic",// 10Grimoire
    "Antediluvian Engine",// 11Time Dilation
    "Elementium Infused Chocolate Chunk",// 12Secrets of the Elements
    "Scent of Vanilla Nebula",// 13Shipment CPS + Astrofudge
    "Iteration Drive",// 14Unlocks funny things
    "More artifacts coming soon",
];
const artClue = [
    "One is One, Five is Two",// 0-1
    "Achieved Enough?",// 1-2
    "YEAH SCIENCE!!!!!!!!",// 2-3
    "There\'s kings in cookies",// 3-4
    "Explore more, duh",// 4-5
    "A bit deeper",// 5-6
    "Get those patents out, ya stingy",// 6-7
    "Hoard, Hoard, Hoard more",// 7-8
    "Am I lucky? enough?",// 8-9
    "haha mana goes brrrrrr",// 9-10
    "Time-Stopping Performance",// the world
    "Cavitilicious",// Choco Chunk
    "5 Cosmic Mappings ah ah ah",// Vanilla Neb
    "15$(^=)$1.268e30, 16=117.39, 8E=500,000",// Itr Drive
    "You have all artifacts, yay",
];
const artArtDesc = [
    "Very shiny chocolate bringing in the attention of even more gods",
    "Multiplies Light way more than necessary",
    "Makes the cat go ouo and [DATA EXPUNGED]",
    "The panacea to all those hand diseases",
    "Replaces grandma with something.... else better?",
    "Finally being able to go into the conservatorium, you know it\'s time for plants",
    "Looks very hot, but contains way too much energy",
    "Do it like the renaissance! Legacy design included",
    "The best thing about economics is that it can be reset to zero, and undo your mistakes",
    "You don\'t know why, but you felt a compulsion to keep this book close to you",
    "Finally, you get the wizard to cast actual spells instead of conjuring cookies. Despite the thickness, there\'s somehow only 8 spells",
    "You feel a strange compulsion in the engine, and you know it\'s time shout \"THE WORLD\" as loud as possible",
    "Despite its \"normal\" appearance, that chunk is full of.... uh.... elements? What is that word anyway?",
    "Some astronomers go crazy over these",
    "I don\'t think we should go deep, I heard the buildings get strange if we go too deep",
    "The temple is currently empty and fully explored for artifacts, but not for long....",
];
var artCheck = (cond) => {
    switch (cond) {
        case 0:
            return art.level >= 532 - (532 & 512 | 1 | 2 | 4 | 8);
            break;
        case 1:
            return achCount >= (((((((1 << 1) + 1) << 1) + 1) << 1) + 1) << 1);
            break;
        case 2:
            return building[9].level >= (((((((4095 & (4095 - 1)) & (4095 - 2)) & (4095 - 16)) & (4095 - 32)) & (4095 - 64)) & (4095 - 256)) & (4095 - 1024));
            break;
        case 3:
            return cookiet[7].level >= 1 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2;
            break;
        case 4:
            return art.level >= (((1 << 5) | 1) & 31 & 62 | 2 | 4 | 8 | 16);
            break;
        case 5:
            return art.level >= (((((((1 << 1) + 1) << 1) + 1) << 1) + 1) << 1) + ((1 << 3) + 10);
            break;
        case 6:
            return buildingUpgrade[4].level >= (32 >> 4) | (32 >> 1) | 32;
            break;
        case 7:
            return cookie.value >= BF(1e280);
            break;
        case 8:
            return Math.random() < 0.9999999;
            break;
        case 9:
            return building[7].level >= (parseInt([+!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[]]) ^ parseInt([+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[] + !+[] + !+[]])) + 50;
            break;
        case 10:// oops looks like someone spilled a [][][[][[]][][](}()()})(!+{)({)([!({)}())])})})]] in there....
            return arrcps[0x36 - 0x34 + 0x6 + 0x4 + 0x59 + 0x2d - 0x9c + 0x14] >= BF([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]][([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]]((!![] + [])[+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + ([][[]] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+!+[]] + (+[![]] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]] + (+(!+[] + !+[] + !+[] + [+!+[]]))[(!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([] + [])[([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]][([][[]] + [])[+!+[]] + (![] + [])[+!+[]] + ((+[])[([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + ([][[]] + [])[+!+[]] + (![] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]] + [])[!+[] + !+[] + !+[]] + (!![] + [])[+[]] + (!![] + [][(![] + [])[+[]] + (![] + [])[!+[] + !+[]] + (![] + [])[+!+[]] + (!![] + [])[+[]]])[+!+[] + [+[]]] + (!![] + [])[+!+[]]] + [])[+!+[] + [+!+[]]] + (!![] + [])[!+[] + !+[] + !+[]]]](!+[] + !+[] + !+[] + [!+[] + !+[]]) + (![] + [])[+!+[]] + (![] + [])[!+[] + !+[]])()([+!+[]] + (!![] + [])[!+[] + !+[] + !+[]] + [+!+[]] + [!+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [!+[] + !+[] + !+[] + !+[] + !+[]]));
        case 11:
            return lump.value >= 0b10011100010000;
        case 12:
            return building[7].level >= 0b10011100010000 / 2;
        case 13:
            return (buildingUpgrade[15].level >= [+!+[]] + [+[]] + [+[]]) && (buildingUpgrade[1 << 4].level >= (-0x1d * -0xbd + -0x5b * 0x62 + 0xd9f * 0x1)) && (elements[1 << 3].value >= (0x4d5 * -0x129 + 0xdc627 + -0x89ea));
        default:
            return false;
    }
};
// WIZARD TOWER - Grimoire
var Spell = new Array(9);
var SpellView;
var isSpellShown = 0;
let effectCPSB = 1;
let templeLuck = 1000;
let templeLuckDur = 30;
let effectCPSBDur = 37;
let spellCost = [15, 20, 75, 25, 30, 100, 10, 0, 69];
//! SECONDS ONLY
let spellCool = [720, 420, 3600, 600, 420, 900, 660, 1200, 1440];
let logBoost = 1;
let logBoostDue = 0;
let updateSpellLayer = () => {
    for (let i = 0; i < 9; i++) {
        Spell[i].maxLevel = 1 + SpellStack.level;
    }
};
let castSpell = (index) => {
    spellCast[index] = thyme.level;
    spellCountCast[index] += 1;
    let spellBoost = spellAch[4 + index].isUnlocked + spellAch[4].isUnlocked;
    switch (index) {
        case 0:
            var rand = RandI(100);
            if (rand <= 90) {
                log("Cookies for you");
                rand = RandI(15 + (2 * SpellStack.level)) + spellBoost;
                minCookie(rand * 30);
            } else {
                log("No Cookies for you");
            }
            break;
        case 1:
            var rand = RandI(200 + (7 * SpellStack.level)) + 5 * spellBoost;
            if (rand >= 200) {
                log("Sweet");
                tickLump(100 + (50 * SpellStack.level));
            } else if (rand >= 100) {
                log("Lucky");
                minCookie(17 + (3.5 * SpellStack.level));
            } else if (rand >= 60) {
                log("Frenzy");
                effectCPSB = 7 + (0.5 * SpellStack.level);
                calcCPS();
            } else if (rand >= 50) {
                log("Clot");
                minCookie(-6 + (0.1 * SpellStack.level));
            } else if (rand >= 40) {
                log("Bleed");
                effectCPSB = 0.6 + (0.05 * SpellStack.level);
                calcCPS();
            } else {
                log("Nothing Happened");
            }
            break;
        case 2:
            log("Get your chips");
            pubH(1 + (0.05 * SpellStack.level) + (0.025 * spellBoost));
            break;
        case 3:
            log("That\'s to the moon");
            xBegin = thyme.level - 600;
            logBoost = 50 + (2.5 * SpellStack.level) + (5 * spellBoost);
            logBoostDue = terra.level * 30 * (spellBoost + 1);
            break;
        case 4:
            log("HERE COMES THE LOOT");
            templeLuck += 100 * spellBoost;
            break;
        case 5:
            let rand = RandI(20);
            if (rand < 19) {
                if ((building[rand].level > 0) && (building[rand].cost.getCost(building[rand].level) <= (BF(1e9) * cookie.value))) {
                    log(`You won ${buildingName[0][rand]}`);
                    building[rand].level += RandI(10 + spellBoost) + 1 + SpellStack.level + spellBoost;
                }
            }
            break;
        case 6:
            for (let i = 0; i < Spell.length; i++) {
                spellCast[i] -= 600 + (150 * SpellStack.level) + (60 * spellBoost);
            }
            log("It works!");
            break;
        case 7:
            log("Sweet Anyone?");
            if (RandI(100 + spellBoost) > 5) tickLump(500 + (25 * SpellStack.level) + (25 * spellBoost));
            break;
        case 8:
            let warpthyme = ((100 + (10 * SpellStack.level)) * RandR(0.9, 1.1 + (0.05 * SpellStack.level)) + (15 * SpellStack.level)) + (10 * spellBoost);
            log("Time goes brrrrrrrr " + warpthyme);
            for (let i = 0; i < warpthyme; i++) {
                tick(0.1, 1);
                if (i % 10 == 0) {
                    log(i);
                }
            }
            log("The spell wears off...");
    }
};
const spellName = [
    "Conjure Idled Goods",
    "Force the Hand of Cookies",
    "Prestidigus",
    "Terrona Terra",
    "Replenish Extradionaire",
    "Asseto Accio",
    "Mimi Mami",
    "Simply Sweetdelicious",
    "The World"
];
const spellDesc = [
    "You get more cookies, simple",
    "Something good or bad happens to you, find out what happens!",
    "Gives you HC equivalent to publishing now",
    "Makes the terraforming business suddenly go to the cookie moon",
    "Enriches your temple with a lot more loot",
    "Spawn buildings into existence, only works for a certain amounts",
    "Reduces the cooldown time of certain spells",
    "Spawn some sugar lumps in",
    "haha jojo reference goes brrrrrrrrrr",
];
// ALCHEMY LAB - Cookiearium Convertor + Aqua Crustulae
var cookiearium, aquaCrust;
// TIME MACHINE - Tile Dilation
var timeDilate;
const timeDilateName = "Time Dilation $(T_{D})$";
const timeDilateInfo = "Dilates the time to produce more cookies that isn\'t affected by Conjure Idled Goods";
// ANTIMATTER CONDENSER - Quark Accelerator
var accelerator, acceleratorMenu;


//==Visualizer==
var viz;
const vizTypeM = 1;
const vizID = 99000;
const vizName = ["Classic", "Milk"];


//==Permanent Building Upgrades==
var clickp, jetDrive, sugarCoat; // Click Power relative to CPS + Empowerments but I'm so 🍪riginal
var buildingUpgrade = new Array(19);
var buildingP = new Array(19);
const clickpname = "Tougher Mouse";
const buildingPMax = [
    150, 350, 250, 500, 500, 500, 500, 500, 500, 500, 450, 400,
    350, 350, 350, 350, 300, 250, 200,
];
const buildingUpgradeName = [
    "Extra Finger",
    "Anti-Aging Cream",
    "Electrolytes and Acres",
    "Drilling Overclock",
    "Patent Publishing",
    "Increase Interest Rates",
    "Sacred Chocolate Artifact",
    "Syllables",
    "Cosmic Exploration",
    "New Esoteric Elements",
    "Normalize Dimension",
    "Paradox Resolve",
    "Derived Elementary Flavor",
    "Extended Spectrum",
    "Serendipity",
    "Gone Iterative",
    "Reformat JS Script",
    "Install Another Idle Game",
    "Get an extra IQ Point",
];
let buildingUpgradeMult = [
    250, 3.5, 60, 125, 59, 35, 8, 17, 25, 23, 21, 20, 15, 25, 10, 10, 9, 7, 5, 7,
];

//==HC Upgrade==
var cookieTin, CookieH, CookieR, CookieS, CookieC, DivineD, CookieTau, TerraInf, TwinGates, ConjureBuild, ChronosAge,
    R9Box, conGrow, SpellStack, Empower, heavvis, milkOil;
const cookieTinInfo =
    "Heavenly cookies that boosts your CPS more than normal cookie.";
const cookieTinName = [
    "Box of Macarons",
    "Tin of Butter Cookies",
    "Tin of British Tea Biscuits",
    "Box of Brand Biscuits",
    "Box of 100\\%\\ Pastries",// brought to you by Lava#3374
    "Box of Cookie?",
    "Box of Cookien'\t",
    "Crate full of Exponential Idle Community References",
    "The creator's inside jokes Box",
    "Pack of Exotic Cookies",
];
const cookieHName = "Heavenly Cookie";
const cookieHInfo = "You gain more CPS the more HC you have";
const cookieRName = "[REDACTED] Cookie";
const cookieRInfo = "A very [REDACTED] cookie that [DATA EXPUNGED]";
const cookieSName = "Sugar Crystal Cookie";
const cookieSInfo = "This cookie gets tastier the more sugar you have";
const cookieCName = "Cookie Cookie";
const cookieCInfo = "This cookie increases CPS by the amount of cookies you own";
const divineDName = "Divine Doubling ($D_{d}$)";
const divineDInfo = "Doubles your CPS";
const cookieTauName = "Tauonium Cookie";
const cookieTauInfo = "An experimental type of antimatter-based cookie that is based on tau";
const terraInfName = "Terra-Infinity $(T_{\\infty})$";
const terraInfInfo = "Using your devotion, the gods grant you an everlasting source of cookieverse materials";
const twingateName = "Twin Gates of Transcendence";
const twingateInfo = "Unwind the secrets of heveanly chips to empower your empire";
const conjurebuildName = "Blessing of the Capital";
const conjurebulidInfo = "Blessed with the money power, you investments rewards increase";
const chronosageName = "Chronos Aging";
const chronosageInfo = "Transmute the power of yggdrasil to all your buildings";
const boxrName = "Box of R9 $(R_{9})$";
const boxrInfo = `A very stange and mathematical box seemingly full of ${game.sigmaTotal} students`;
const congrowName = "Continuos Growth";
const congrowInfo = "Certain high-tech buildings get more powerful the more of them you have";
// Conseq. HC Upgrade
var cookiet = new Array(9);
const cookietP = [1.2, 1.25, 1.35, 1.5, 1.55, 1.75, 1.8, 2, 2.25, 2.5];
const cookietB = [
    1.5e17,
    1.5e32,
    1.5e47,
    1.5e65,
    BF("1.5e83"),
    BF("1.5e101"),
    BF("1.5e119"),
    BF("1.5e137"),
    BF("1.5e155"),
    BF("6e175"),
];
const cookietName = [
    ["Basic Macaron", "Rose Macaron", "Lemon Macaron", "Chocolate Macaron", "Pistachio Macaron", "Hazelnut Macaron", "Violet Macaron", "Caramel Macaron", "Licorice Macaron", "Earl Grey Macaron"],
    ["Butter Horseshoe", "Butter Pucks", "Butter Knots", "Butter Swirls", "One Million Square Inches Butter per Cookie", "Slab of Pure Butter", "French Pure Butter Cookie", "Garlic Butter Braised Cookie", "I can\'t believe it\'s not Butter Cookies"],
    ["Empire Biscuits", "British Tea Biscuits", "Chocolate British Tea Biscuits", "Round British Tea Biscuits", "Round Chocolate Tea Biscuits", "Round British Tea Biscuits with Heart Motif", "Round Chocolate British Tea Biscuits with Heart Motif", "Big Ben Cookie", "Hobnobs Biscuits"],
    ["Caramoas", "Sagalogs", "Shortfoils", "Win Mints", "Fig Gluttons", "Loreols", "Jaffa Cake", "Grease\'s Cups", "Digits", "Lombardia Cookies", "Bastenaken Cookies", "Festivity Loops", "Havabreaks", "Zilla Wafers", "Dim Dams", "Pokey"],
    ["Cheesecake", "Profiteroles", "Panettone", "Churros", "Cinnamon Bun", "Jelly Donut", "Glazed Donut", "Chocolate Cake", "Pies", "Croissant", "Pain Au Chocolat", "Focaccia", "Taiyaki", "Phyllo", "Apple Strudel", "Samarkand Bread"],
    ["Cookie Dough", "Cookie Dough(No Salmonella)", "Burnt Cookie", "A normal chocolate chip cookie but there\'s no chips at all for some reason", "4K Cookie", "Ray-Traced Cookie", "Crackers", "Deep-Fried Cookie", "Flavor Text Cookie"],
    ["Toast", "Pancakes", "Marshmellows", "PB amd J", "Wookies", "Cheeseburger", "Beesechurger", "One lone chocolate Chip", "Pizza", "Candy", "Brownies", "Flavor text Food that is not cookie", "Medovik", "Fudge"],
    ["Gilles-Cookie Paillé", "liver", "Mathmatically Illegal Cookie", "! [ Snakey Snickerdoodles ] !", "Nerdy as f Cookie", ":exCookie:", "JS-Formed ellipsis Cookie", "SkyXCookie", "Weierstra🅱️ Cookie Spiral", "Exponential Cookie", "ouo cookie", "Orteil β Cookie"],
    ["Gigaloopite", "Tetraloopite", "Enium Cookie", "Orate Cookie", "Dxygen Cookie", "IUSpawn Cookie", "egg", "Euler Serion Cookies"],
    ["Mutated Cookie", "Magic Marbled Cookie", "Shortcake-like Cookie", "Truffle Cookie", "Salt Pretzels", "Seaweed Sesame Cookie", "Dulce De Leche", "Keylime Pie", "S\'Mores", "Chocolate Drizzle Cookie", "Peppermint Kiss Cookie", "Sprinkled Jelly Cookie", "Galaxial Drop", "Reflective Frosted Cookie", "Pecan Walnut Cookie", "White Mine Cookie", "Jelly Triangle", "Gold Leafed Cookie", "Grand Chocolate Wafer Sprinkles"]
];
// Want your self insert? DM me your very own cookie name and I might add it!


//==MILESTONES==
var superP, superL, superC;
// P Exponent, L Mult Increase, C Power Increase


//==Achievements==
var ca = new Array(25);
const caName = [
    "Wake and Bake",
    "Fledging Bakery",
    "Affluent Bakery",
    "World-Famous Bakery",
    "Cosmic Bakery",
    "Universal Bakery",
    "Eternity Bakery",
    "You can't stop me from all those cookies",
    "Overdose",
    "The land of milk and cookies",
    "He who controls the cookie, controls the universe",
    "In the halls of Idlers",
    "The dreams in which I'm baking are the best I've ever had",
    "Bursting at the seams",
    "O lord who is the creator, grace my existence with cookies",
    "I think it's safe to say you've got it made",
    "Horn O' Plenty",
    "Hypersize me",
    "Overdrive",
    "There's nothing else other than my pleasure with cookies",
    "Naught as slowing down",
    "Idleborn",
    "I cookie, therefore I am",
    "Closing the end",
    "How?",
];
var cookiesAchievement, CPSAchievement;
const cookiesAchievementCatName = "Cookies Baked";
const caReq = [
    1, 3, 6, 12, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450,
    500, 550, 600, 650, 675, 700, 725, 750,
];
var cpsa = new Array(26);
const cpsaName = [
    "Casual Bakedling",
    "Hardcore Bakedling",
    "Cookie Vortex",
    "Cookie Monster",
    "Let's bake some more",
    "The world full with cookies",
    "Fast and Delicious",
    "Cookiehertz : a really, really tasty hertz",
    "Baking cookies but really really really REALLY REALLY REALLY FAST",
    "Turbopuns",
    "Still hungry for more?",
    "The Abakening",
    "The Antidisestablishmentarianbakeningism",
    "Knead for speed 2 : Fast and Doughrious",
    "Well the cookies start coming and they don't stop coming",
    "The proof of cookie is in the baking",
    "What did we even eat before these",
    "Keep going until I say stop",
    "Green cookies sleep furiously",
    "Go ahead, try to comprehend the sheer amounts",
    "The problem of being faster than light is that you can only live in cookies",
    "Blazing Flamin' Bakery",
    "A cookie is a baked or cooked snack or dessert that is typically small, flat and sweet. It usually contains flour, sugar, egg, and some type of oil, fat, or butter. It may include other ingredients such as raisins, oats, chocolate chips, nuts, etc. In most English-speaking countries except for the United States, crunchy cookies are called biscuits. Chewier biscuits are sometimes called cookies even in the United Kingdom. Some cookies may also be named by their shape, such as date squares or bars.",
    "Someone go stop him, he's TOO FAST AAAAAAAAAAAAAAAAAAAAAAAA",
    "The baking goes on, and ON, AND ONNNNNNNNN!!!!!!!!!!!!",
    "Cookie Idler Speedrun pubMult-100% 1 tick[0.1s] WR|SR|PB",
];
const cpsaReq = [
    1, 2, 5, 11, 24, 49, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 350,
    400, 450, 500, 550, 600, 650, 700, 725, 751,
];
var lumpAch = new Array(10); // 10 tiers
var lumpAchCat;
const lumpAchName = [
    "Dude, Sweet",
    "Caramelized",
    "Sugar Rush",
    "Sugar Sugar",
    "Type 1 Diabetes, ah ah ah",
    "TYPE 2 Diabetes, ah ah ahhh",
    "I love cavities",
    "Sweetness Overload!!!!",
    "Scrumptiosllionare",
    "THAT\'S A LOTTA SUGARS",
];
const lumpAchReq = [1, 10, 50, 100, 500, 1000, 10000, 100000, 1000000, 10000000];
const perkAchReq = [1, 5, 25, 50, 95];
const spellAchReq = [10, 50, 100, 500, 1000, 25, 25, 25, 50, 50, 50, 100, 250, 50];// 5 number + 9 specific
var BuildingAchievement;
var buiAch1 = new Array(19);
var buiAch2 = new Array(19);
var buiAch3 = new Array(19);
var buiAch4 = new Array(14);// Very endgame content right there
var buiLumpAch = new Array(19);
var perkAch = new Array(5);// Forge them, get them
var spellAch = new Array(14);// spell, 5 number + 9 specific
const bach1 = ["Mouse Wheel", "Retirement Club", "Home Organic", "Stop! Drilling Time!", "Industrial Act", "Pretty Penny Pinchers", "Way of the Temple", "Bewitched", "Local Expedition", "Transmutation", "Isekai\'d", "Thyme Wrap", "When does it matter?", "Some rays of dough and batter", "Lucked up", "Z_n+1 = (Z_n)^2 + c", "Press F12", "Manifest Destiny", "O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA"];// not to be confused with a famous composer from the romantic age or something
const bach2 = ["Clicktopia", "Tootsie Roll Machine", "100% Sustainable", "Break the core", "Age of Internet", "Keynesian Cookinomics", "Balance of Faith", "Alakazamd", "Cosmic Mapping", "Polytranselementation", "H̶e̷ ̶C̶o̴m̵e̸s̵", "Thyme Pararegano", "New Standard Model of Cookie and Flour", "Total Enlightenment", "Devil\'s Gambit", "Apollonian Gasket", "Infinite Theorycraft", "Is there enough worlds?", "Cardinal Synapsis"];
const bach3 = ["Thumbs, Phalanges, Metacarpals", "Ruler of the Ancients", "Green Pasture lays live", "Dysonian Society", "Automatal Hysteria", "New Neohyperglobalization Order", "The Lord\'s Likeliness", "Shaspie Colupis", "Multiverse Ramble", "With matter comes Cookies", "I̸͕̽n̷̰͊ ̸͖̔ṭ̵͐h̶̺̓e̴̫͋ ̶͓͂e̸͔͘y̸̝͋e̵͓̚s̸̫̒ ̶̰̕ò̸̜f̶͖̕ ̶̻͒t̷̥͆ĥ̶̳é̵̗ ̷̦̉b̴̡̽e̶͚̿h̴̙̋o̸̩͝l̴̘͆d̷̠͠è̶͍ř̴͎", "Thyme Sagaporal Nutmegstant", "Unified Complete Theory of the Cookieverse", "O thy energy of sky, bring fourth the light rays", "Gamber\'s Last Bet", "C_n := (C_n-1 ∪ (2+C_n-1))/3, where C_0 := [0,1]", "I bring fourth reincarnation of reality", "Lost your Cosmic Cookies?", "I declare thee on all ye inferiors. Despair before me, I am the Ozymandias"];
const bach4 = ["Hands of fate lays bare their click upon thou", "Shrivel, today we rise", "Babylonian Conservatorium sits on the hill", "Breaking through omnirealitimetaplanes", "The perfect game of Factorio", "Money is just a human construct", "Caricature of the forgotten Deities", "Cookiera Avadra Creamdera", "Omniverse Realization", "Satiated in the gaudy mouths of Gold", "Bottom of the abyss", "Out of past, Out of future", "Hypersize my String and Gluten", "Neverending rays of bright brilliance shine on you all"];
const bachlump = ["A hand and them a some more", "Just like babies, but much more weird and terrifying", "Farmer\'s Heaven", "r/drillingmasterrace", "Overengineering Achieved", "Hypermetaflation", "Chief Artifact Curator", "Hours to pronounce, effects very pronounced", "You could make a chronicle out of those", "Truly a Mendeleev's Nightmare", "Is this reality or is it cookieverse?", "No more Thyme Pararegano", "Flavor Mathematics", "4th Cone", "Black Cat\'s Paw", "Quite nearly but not so full", "The \"C\" Language", "You need a new bluestack", "I am smart"];
const pach = ["See the Exponent", "Touch the Exponent", "Feel the Exponent", "Cherish the Exponent", "Forfeit all mortal possessions to the Exponent"];
const sach = ["Neophyte", "Acolyte", "Adept", "Harry Cookier", "Master of Spells", "Lazy Wizard", "Gambler Wizard", "Ascendant Wizard", "Mass Miner Wizard", "Explorer Wizard", "Mogul Wizard", "Impatient Wizard", "Very Sweet Wizard", "やれやれだぜ!"];
var featAchCat;
var superIdle, hyperIdle, speedBake1, speedBake2, speedBake3, speedBake4, speedBake5, speedBake6, nice, insipid,
    leetnice, sigmaCurseof, timeSpeed, timeOhNo, sugarAddict1, sugarAddict2, sugarAddict3, jackpot, indecisive, PVCRK;// actual
let templeJ = false, indecide = 0;// unlock


//==LORE==
var chapter = new Array(16);
var checkChapter = (c) => {
    if (c == 0) return cookie.value >= BigNumber.ZERO;
    else if (c == 1) return building[1].level >= 1;
    else if (c == 2) return cookie.value > BF(1e12);
    else if (c == 3) return building[6].level >= 1;
    else if (c >= 15) return cookie.value >= BF("1e750");
    else return building[c + 4].level >= 1;
};
const chapterName = [
    "Wake and Bake",
    "Grandma and her cats",
    "Knead for Speed",
    "Worshippers",
    "Beyond the Vanilla Cosmos",
    "Polymaterial Morphology",
    "Dimensionalize Cookie Breakdown",
    "To consume or not to consume",
    "Chocolate just isn't enough",
    "Spectroscopy",
    "Existence beyond logic",
    "Are you going deep enough?",
    "Realitarium Engineering",
    "Greedy",
    "Effortless",
    "Counter Conclusion",
];
const chapterLore = [
    "As a newly graduated student from the Gilles Academy with a penchant for cookies\nYou stumbled upon a peculiar metallic box\nOn its side there is a display displaying 0/750. On the top there's a big red button on it. Finally on the bottom inscribes G to which you can't figure the significance out of.\nYou're compelled to press this button, though you don't know why.\nMaybe you could use something to click for you...",
    "As you produced more and more cookies, the display seemingly slows down to 3/750, staying there for quite a while\nYou posted a flyer hiring people to bake cookies for you\nA few days later, a grandma comes knocking at your door\nYou let her in, and she starts to bake cookies for you, in return of her getting a set amount of your cookies\nBut that's not the only person that comes inside\nOn the far corner you heard a faint sound of cats purring for milk...",
    "The cookies are piling up, but the display won't budge further than 12\nThen, a new button emerges from the underside, labeled 'Publish'\nYou're tempted to press it, but the display warns you about resetting in exchange for an even larger amount of cookies...",
    "1e25 cookies, that's 25/750\nThe far reaches of your cookies spread far and wide\nYou notices certain groups of people are beginning to worship cookies\nSo you built a temple for them\nHopefully the prayers to the cookie god would satisfy them enough to zap even more cookies in...",
    "Resources are finite, and you're coming up close to the limit of planet Earth\nUsing your gains from your banks, you set out to fund a space project, in hopes of getting more resources for your ever-growing desire for cookies\nIt's one of the dreams of the many to explore the world beyond us\nThe vast world, limitless combinations of everything possible by physics\nYou'd really like it if some of them are all made out of cookies...\nBut the restless G grows",
    "Wandering around landfills, it's a place full of useless refuse human throws out\nWhy bother looking far and wide when there's always something to find near us\nYou commissioned your scientists from the space program to assist in changing the non-cookie into cookies\nEven with the hardest of matter to change, it can always be fed into cookies.\nJust let the mother nature take care of the rest...",
    "What naive thoughts do they think that the universe is the limit?\nCountless worlds exist beyond us, in perpetual chaos within infinite universes\nA place where laws and observation holds meaningless\nAt no sign, a red dimensional rift appears inside one of your cookie piles\nIt caused quite big damages to your cookie count, but your assistants have pointed out that the world is called 'Cookieverse', a perilous place full with unimaginable monsters and indescribable topology\nExploring this place sure looks to be dangerous, but for some reason, the other world is all cookies\nYou quickly hopped in the chance to rob the world of cookies, slaying monsters, mass terraforming the place you name it!",
    "They said that time can't be stopped nor reversed\nYou, a young person decided to go against it\nFrom all the exploitation you made in the Cookieverse\nThey found a very chaotic piece of cookie ore that seems to warp and distort itself\nYour assistants determined it was the time continuum that the ore is messing with\nIn hopes of getting cookies through time itself, you assigned the scientist to break the law of time.",
    "18\n18 types of elementary particles\nNow there's 19 of them\nBut that's still 18 left to turn into cookies\nYou decided to commission the largest of the largest of particle accelerators to convert those particles into cookie particles\nYou gonna leak a lot of money for this, so you made the world dependent of cookies.",
    "How long has it been since you last saw the light of the day?\nYou went outside(and touched grass), only to find the sun instantly making you sweat bullets\nComing back into your den(grand office) you looked into the mirror and find yourself splattered with cookies\nIt seems that light itself is being turned into cookies as well\nMight just as well focus all of them into a big burst of cookies\nAnd in the meantime spray a bit of radiance to those worshippers as well",
    "POOF! And there goes nothing!\nYou just saw one of your cookies disappear into nothingness\nThen you saw a black cat in the corner of your vision again\nIn a panic, you hastily read through the book on symbolisms, and found out that a black cat means bad luck\nWith your amounts of cookies, fearing that it might all be GONE the next day,\nYou improvised up a device from that book that would apparently bring in good luck to your entire existence\nAnd your local spellcasters might take an interest in that too",
    "Does your cookie look empty?\nI know that might sound like nonsense but how much of the matter is really matter\nUsing your sheer amount of knowledge you got from working with your past projects\nYou somehow managed to convert mattern't to matter and the cookie just splits into a whole lot more cookies\nPresenting the plan, you assigned the engineers to work on standardizing the device used to convert mattern't to matter\nDoes going too deep might reveal something you weren\'t supposed to see?",
    "Having lost your mind being overwhelmed with the thoughts of cookie\nYou went out on a ramage with your cookies, tearing down any and all signs of resistance, even the fabric of reality itself\nYou went mad, in search of something you can use to bend reality\nOne of the madness you did is parting some poor soul(Orteil?) of their laptop\nOn the laptop there's a console with the word 'Javascript' written on it\nYou of course, politely pressure the programmers to decipher the complicated syntax of 'Javascript'\nAnd they can become full again.....",
    "I love cookies, why don't we enslave other idle games to produce cookies for us\nBreaking through dimensions, hijacking other \"innocent\" idle game universes to produce cookies for us",
    "Nothing stops you anymore\nNot even getting the counter to 750(it's now 500/750)\nIn one of the everlasting days at the Cookie Megacorporation...\nYou managed to manifest your desire of cookies out of thin air\nSeeing this opportunity, you cleared your way through the legal system to get some subjects to perform something on\nIt was a success, seeing them thinking up cookies out of thin air\nWhy bother with all your buildings when you can just think up cookies...",
    "The counter hit 750, and the sky immediately turned itself red...\n(To be continued)",
];


var thyme;
// All Secondary Equations
// 1.Building CPS, 2.P formula, 3.Milk, 4.Cookie Power, 5.Covenant, 6.Yggdrasil, 7.Terra
/**
 * Returns a permanent upgrade object from the arguments given.
 * @param {number} id, The ID of the upgrade, must be unique.
 * @param {currency} cur, The currency for the cost of the upgrade.
 * @param {function} costModel, The function that returns the cost of the upgrade. Must return BigNumber
 * @param {function} desc, The function that returns the description(the name) of the upgrade. The function MUST return a string
 * @param {function} info, The function that returns the info of the upgrade. The function MUST return a string
 * @returns {PermanentUpgrade} The permanent upgrade from the given arguments.
 */
function shortPermaUpgrade(id, cur, costModel, desc, info) {
    var up = theory.createPermanentUpgrade(id, cur, costModel);
    up.getDescription = () => desc;
    up.getInfo = () => info;
    return up;
}

/**
 * Returns a permanent upgrade object from the arguments given a specified maxLevel.
 * @param {number} id, The ID of the upgrade, must be unique.
 * @param {currency} cur, The currency for the cost of the upgrade.
 * @param {function} costModel, The function that returns the cost of the upgrade. Must return BigNumber
 * @param {function} desc, The function that returns the description(the name) of the upgrade. The function MUST return a string
 * @param {function} info, The function that returns the info of the upgrade. The function MUST return a string
 * @param {number} maxLevel, The maximum level of the upgrade.
 * @returns {PermanentUpgrade} The permanent upgrade from the given arguments.
 */
function shortPermaUpgradeML(id, cur, costModel, desc, info, maxLevel) {
    var up = shortPermaUpgrade(id, cur, costModel, desc, info);
    up.maxLevel = maxLevel;
    return up;
}


var init = () => {
    // Variable Creation
    cookie = theory.createCurrency("C", "C");
    hc = theory.createCurrency("H", "H");
    lump = theory.createCurrency("L", "L");
    for (let i = 0; i < 9; i++) {
        elements[i] = theory.createCurrency(elemName[i], elemName[i]);
    }

    ///////////////////
    // Regular Upgrades
    // Shush
    {
        thyme = theory.createUpgrade(1e9, cookie, new ConstantCost(BF("1e1000")));
        thyme.isAvailable = false;
        thyme.maxLevel = 1262304000;// 1461 Days
        thyme.getDescription = () => "Time (time)";
        thyme.getInfo = () => "how the fuck did you managed to see it";
    }
    // Tasty Cookies
    {
        cookieT = theory.createUpgrade(0, cookie, new ExponentialCost(basect, ctr));
        cookieT.getDescription = (_) => {
            if (bInfo == 1) {
                return `\$ C_{1}(${cookieT.level + (crystalHoney.level * 10)}) = ${getCookieTP(cookieT.level)}, \\: CP(${cookieT.level})${superC.level > 0 ? "^{1.05}" : ""}=${getCookieP(cookieT.level)}\$`;
            }
            if (cookieT.level + 1 > cookieType.length) {
                return defaultcookieType;
            } else {
                return cookieType[cookieT.level];
            }
        };
        cookieT.getInfo = (amount) => (bInfo == 1) ? `\$ C_{1}(l) = \$ ${Utils.getMathTo(getCookieTP(cookieT.level), getCookieTP(cookieT.level + amount))}` : cookieInf;
        cookieT.bought = (amount) => calcCPS();
    }
    // Heavely Tasty Cookie
    {
        for (let i = 0; i < cookieTinName.length; i++) {
            cookiet[i] = theory.createUpgrade(1000100 + i, cookie, new ExponentialCost(cookietB[i], ML2(8775)));
            cookiet[i].maxLevel = cookietName[i].length;
            cookiet[i].getDescription = () => {
                if (bInfo == 1) {
                    return `\$ TP_{${i}}^{CT_{${i}}} = ${cookietP[i]}^{${cookiet[i].level}} = ${BigP(cookietP[i], cookiet[i].level)}\$`;
                }
                if (cookiet[i].level >= cookiet[i].maxLevel) {
                    return cookietName[i][cookietName[i].length - 1];
                } else {
                    return cookietName[i][cookiet[i].level];
                }
            };
            cookiet[i].getInfo = (amount) => (bInfo == 1) ? `\$ CT_{${i}} =\$ ${Utils.getMathTo(BigP(cookietP[i], cookiet[i].level), BigP(cookietP[i], cookiet[i].level + amount))}` : "Some nice Heavenly Cookies to boost CPS even more";
            cookiet[i].bought = (amount) => calcCPS();
        }
    }
    // Kitty
    {
        kitty = theory.createUpgrade(kittyID, cookie, new ExponentialCost(kittyCost, kittyExp));
        kitty.getDescription = (_) => {
            if (bInfo == 1) {
                return `\$K_{i} = ${kitty.level}, M = ${kittyPower(kitty.level)}\$`;
            }
            if (kitty.level >= kittyName.length) {
                return kittyDName;
            } else {
                return kittyName[kitty.level];
            }
        };
        kitty.getInfo = (amount) => (bInfo == 1) ? `\$ K_{i} = \$ ${Utils.getMathTo(kittyPower(kitty.level), kittyPower(kitty.level + amount))} ` : "You gain more CPS the more kittens you have";
        kitty.bought = (amount) => calcCPS();
    }
    // All 19 Buildings
    let LOG = ML2(1.15);
    for (let i = 0; i < 19; i++) {
        if (i == 0) {
            building[i] = theory.createUpgrade(1 + i, cookie, new FirstFreeCost(new ExponentialCost(baseCost[i], LOG)));
        } else {
            building[i] = theory.createUpgrade(1 + i, cookie, new ExponentialCost(baseCost[i], LOG));
        }
        building[i].getDescription = () => {
            let bi = `\$B[${BigTS(i)}]^{${(getExpn(i) > 1) ? getExpn(i).toString(10) : ""}}\$`;
            if (bInfo == 1) {
                return `${bi} = ${calcBuilding(i, 0)}`;
            } else {
                return `${bi} - ${buildingName[0 + Math.floor(bInfo / 2)][i]}`;
            }
        };
        building[i].getInfo = (amount) => `${getInf(i, amount)}, ${((bInfo == 1) ? `\$B(${i}) = ${arrcps[i]}\$` : "")}`;
        building[i].bought = (amount) => {
            if (building[i].level - amount == 0) {
                calcCPS();
            } else {
                universalBought(i);
            }
        };
        switch (i) {
            case 1:
                // Grandma's Covenant
                covenant = theory.createUpgrade(10001, cookie, new ExponentialCost(1e65, ML2(1e15)));
                covenant.getDescription = (_) => "Grandmother's Covenant $(C_{v})$";
                covenant.getInfo = () =>
                    "Synergyzing Grandmas together to boost their CPS depending on the buildings owned";
                covenant.maxLevel = 20;
                covenant.bought = (amount) => universalBought(1);
                break;
            case 2:
                // Yggdrasil
                ygg = theory.createUpgrade(10002, cookie, new ExponentialCost(1e110, ML2(1e25)));
                ygg.getDescription = () => yggName;
                ygg.getInfo = () => yggInfo;
                ygg.maxLevel = 4;
                ygg.bought = (amount) => universalBought(2);
                break;
            case 3:
                // Terra
                terra = theory.createUpgrade(10003, cookie, new ExponentialCost(1e130, ML2(1e10))
                );
                terra.maxLevel = 20;
                terra.getDescription = () => terraName;
                terra.getInfo = () => terraInfo;
                terra.bought = (amount) => getEquationOverlay();
                break;
            case 4:
                // Recombobulators
                recom = theory.createUpgrade(10004, cookie, new ExponentialCost(1e170, ML2(1e5)));
                recom.maxLevel = 50;
                recom.getDescription = () => recomName;
                recom.getInfo = () => recomInfo;
                recom.bought = (amount) => universalBought(4); //+e65, then +e3
                break;
            case 5:
                // Investment
                invest = theory.createUpgrade(10005, cookie, new ExponentialCost(1e190, ML2(1.05)));
                invest.getDescription = () => investName;
                invest.getInfo = () => investInfo;
                invest.bought = (amount) => {
                    let rand = 0;
                    if (amount > 24) {
                        for (let i = 0; i < Math.round(Math.pow(amount, 0.5)); i++) {
                            rand = Math.round((25 + invest.level / 250) * Math.random());
                            if (rand <= 18 && building[rand].level > 0) {
                                building[rand].level +=
                                    5 +
                                    ConjureBuild.level +
                                    Math.round(Math.pow(amount, 0.5));
                            }
                        }
                    } else {
                        for (let i = 0; i < amount; i++) {
                            rand = Math.round((25 + invest.level / 250) * Math.random());
                            if (rand <= 18 && building[rand].level > 0) {
                                building[rand].level += 5 + ConjureBuild.level;
                            }
                        }
                    }
                    if (amount < 10) {
                        updateMult();
                        lessPreciseCalcCPS();
                    } else {
                        calcCPS();
                    }
                };
                invest.maxLevel = 1000;
                break;
            case 6:
                art = theory.CreateUpgrade(10006, cookie, new ExponentialCost(1e255, 1));
                art.getInfo = () => (art.level > 0) ? artClue[artUnlock] : artInfo;
                art.getDescription = () => artName;
                art.maxLevel = 1000;
                artArt = theory.CreateUpgrade(10007, cookie, new ExponentialCost(1e250, ML2(1000)));
                artArt.getDescription = () => artArtName[artArt.level];
                artArt.getInfo = () => artArtDesc[artArt.level];
                artArt.maxLevel = artUnlock + 1;
                art.bought = (amount) => {
                    if (artCheck(artUnlock)) {
                        artUnlock++;
                        updateAvailability();
                    }
                    if (artArt.maxLevel < artArt.level) artArt.maxLevel = artArt.level;
                    if ((artArt.maxLevel >= artArt.level) && (artUnlock + 1 > artArt.maxLevel)) artArt.maxLevel = artUnlock + 1;
                    // Incentives
                    // sucks to sucks
                    // 1/3/5/10/15/30/60 minute CPS
                    // 1 prestige H
                    // 1000/1500/2000/2500/5000 tick lumps
                    // All of the above(JACKPOT)
                    for (let i = 0; i < amount; i++) {
                        let r = RandI(10000);
                        if ((spellCast[4] + (10 * templeLuckDur)) >= thyme.level) {
                            r += templeLuck;
                        }
                        let chance = [10000, 9995, 9945, 9845, 9735, 9615, 9565, 9555, 9530, 9430, 9320, 9200, 9100, 9000];
                        // bsearch to find slot
                        prize = bsearch(chance, r);
                        switch (prize) {
                            case 0:
                                minCookie(60);
                                pubH(1);
                                tickLump(2900);
                                templeJ = true;
                                break;
                            case 1:
                                tickLump(2400);
                                break;
                            case 2:
                                tickLump(1150);
                                break;
                            case 3:
                                tickLump(900);
                                break;
                            case 4:
                                tickLump(650);
                                break;
                            case 5:
                                tickLump(400);
                                break;
                            case 6:
                                pubH(1);
                                break;
                            case 7:
                                minCookie(60);
                                break;
                            case 8:
                                minCookie(30);
                                break;
                            case 9:
                                minCookie(15);
                                break;
                            case 10:
                                minCookie(10);
                                break;
                            case 11:
                                minCookie(5);
                                break;
                            case 12:
                                minCookie(3);
                                break;
                            case 13:
                                minCookie(1);
                                break;
                            default:
                                break;
                        }
                    }
                    if (artArt.maxLevel < artArt.level) artArt.maxLevel = artArt.level;
                };
                artArt.bought = (amount) => {
                    calcCPS();
                };
                break;
            case 7:
                SpellView = theory.createUpgrade(10008, cookie, new FreeCost());
                SpellView.getDescription = () => "Toggle Grimoire";
                SpellView.getInfo = () => "Open or close the grimoire by buying this upgrade";
                SpellView.isAutoBuyable = false;
                SpellView.bought = (amount) => {
                    SpellView.level = 0;
                    isSpellShown ^= 1;
                    updateAvailability();
                };
                for (let i = 0; i < Spell.length; i++) {
                    Spell[i] = theory.createUpgrade(i + 20000, lump, new ConstantCost(spellCost[i]));
                    Spell[i].getDescription = () => spellName[i];
                    Spell[i].getInfo = () => spellDesc[i];
                    Spell[i].isAutoBuyable = false;
                    Spell[i].maxLevel = 1;
                    Spell[i].bought = (amount) => {
                        for (let j = 0; j < amount; j++) {
                            castSpell(i);
                        }
                    };
                }
                break;
            case 9:
                aquaCrust = theory.createUpgrade(10009, elements[2], new ConstantCost(7.777e23));
                aquaCrust.getDescription = () => "Aqua Crustulae";
                aquaCrust.getInfo = () => "A fine drop of this mixture made from Buttergold empowers your alchemy lab by making them transmute gold into cookies(You commit to this by buying this upgrade until you pubbed).";
                aquaCrust.maxLevel = 1;
                aquaCrust.bought = (amount) => calcCPS();
                aquaCrust.isAutoBuyable = false;
                break;
            case 11:
                timeDilate = theory.createUpgrade(10011, cookie, new ExponentialCost(BF("1e325"), ML2(1e7)));
                timeDilate.maxLevel = 5;
                timeDilate.getDescription = () => timeDilateName;
                timeDilate.getInfo = () => timeDilateInfo;
                timeDilate.bought = (amount) => universalBought(11);
                break;
            case 12:
                accelerator = theory.createUpgrade(10012, cookie, new ExponentialCost(BF("1e375"), ML2(1e25)));
                accelerator.getDescription = () => (accelerator.level < accelerator.maxLevel) ? `Build ${elemFormalName[accelerator.level + 2]} Reactor` : `All Reactors Built!`;
                accelerator.getInfo = () => `Enables ${elemFormalName[accelerator.level + 2]} to be decayed into ${elemFormalName[accelerator.level + 1]} and ${elemFormalName[accelerator.level]}`;
                accelerator.maxLevel = 7;
                acceleratorMenu = theory.createUpgrade(11012, cookie, new FreeCost());
                acceleratorMenu.getDescription = () => "Open Reactor Control Panel";
                acceleratorMenu.getInfo = () => "Opens the reactor control panel for controlling the reactor to react which element";
                acceleratorMenu.maxLevel = 1;
                acceleratorMenu.isAutoBuyable = false;
                acceleratorMenu.bought = (amount) => {
                    reactorMenu.show();
                    acceleratorMenu.level = 0;
                };
        }

    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, cookie, 1e12);
    theory.createBuyAllUpgrade(1, cookie, 1e3);
    theory.createAutoBuyerUpgrade(2, cookie, 1e25);
    //==Heavenly Upgrade==
    {
        heavvis = theory.createPermanentUpgrade(999999, cookie, new FreeCost());
        heavvis.getDescription = () => "Toggle Heavenly Upgrades";
        heavvis.getInfo = () => "Toggles the visibility of heavenly upgrades";
        heavvis.isAutoBuyable = false;
        heavvis.bought = (amount) => {
            heavVis ^= 1;
            heavvis.level--;
            updateAvailability();
        };
    }
    // Heavenly Cookies
    let baseI = 1000000;
    {
        cookieTin = theory.createPermanentUpgrade(baseI, hc, new ExponentialCost(25, ML2(1e6)));
        cookieTin.getDescription = () =>
            (bInfo == 1) ? `Unlock \$TP_{${cookieTin.level}}\$` :
                cookieTinName[
                    cookieTin.level == cookieTinName.length
                        ? cookieTinName.length - 1
                        : cookieTin.level
                    ];
        cookieTin.getInfo = () => (bInfo == 1) ? `Unlocks an additional Heavely Cookie upgrade` : cookieTinInfo;
        cookieTin.maxLevel = cookieTinName.length;
    }
    // Others
    {
        CookieH = shortPermaUpgradeML(baseI + 1, hc, new ConstantCost(500), cookieHName, cookieHInfo, 1);
        CookieH.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        CookieS = shortPermaUpgradeML(baseI + 2, hc, new ConstantCost(15000), cookieSName, cookieSInfo, 1);
        CookieS.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        CookieC = shortPermaUpgradeML(baseI + 3, hc, new ConstantCost(1e13), cookieCName, cookieCInfo, 1);
        CookieC.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        DivineD = shortPermaUpgrade(baseI + 4, hc, new ExponentialCost(1e14, ML2(1e10)), divineDName, divineDInfo);
        DivineD.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        CookieTau = shortPermaUpgradeML(baseI + 5, hc, new ConstantCost(8e17), cookieTauName, cookieTauInfo, 1);
        CookieTau.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        TerraInf = shortPermaUpgradeML(baseI + 7, hc, new ExponentialCost(1e55, ML2(1e10)), terraInfName, terraInfInfo, 7);
        ChronosAge = shortPermaUpgradeML(baseI + 8, hc, new ConstantCost(2.5e57), chronosageName, chronosageInfo, 1);
        ChronosAge.bought = (amount) => calcCPS();
        ConjureBuild = shortPermaUpgradeML(baseI + 9, hc, new ExponentialCost(1e60, ML2(8)), conjurebuildName, conjurebulidInfo, 3, {});
        TwinGates = shortPermaUpgradeML(baseI + 10, hc, new ConstantCost(1e65), twingateName, twingateInfo, 1);
        TwinGates.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        R9Box = shortPermaUpgradeML(baseI + 11, hc, new ExponentialCost(1e80, ML2(1000)), boxrName, boxrInfo, 3);
        R9Box.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
        conGrow = shortPermaUpgradeML(baseI + 12, hc, new ExponentialCost(1e103, ML2(1e5)), congrowName, congrowInfo, 5);
        conGrow.bought = (amount) => calcCPS();
        SpellStack = shortPermaUpgradeML(baseI + 13, hc, new ExponentialCost(1e105, ML2(1e5)), "Spell Cast Layering", "Allows multiples of the same spell to be casted, cooldown all at once and slightly empowers the spell as well", 3);
        SpellStack.bought = (amount) => updateSpellLayer();
        Empower = shortPermaUpgradeML(baseI + 14, hc, new ExponentialCost(5e116, ML2(10 ^ 1.35)), "Empowerments of Buildings", "Increases how fast $P$ grows", 9);
        Empower.bought = (amount) => calcCPS();
        milkOil = shortPermaUpgradeML(baseI + 16, hc, new ExponentialCost(1e135, ML2(2e2)), "Milk-Flavored Drilling Fluids", "Milk-Power Drilling Fluids really helps with the constant loss of mining outputs", 10);
    }
    //==Building Upgrades==
    {
        clickp = theory.createPermanentUpgrade(3, cookie, new ExponentialCost(1000, ML2(10)));
        clickp.getDescription = () => clickpname;
        clickp.getInfo = () => "Improves how much more the cursor clicks $(P_{cp})$";
        clickp.bought = (amount) => {
            updateMult();
            lessPreciseCalcCPS();
        };
    }
    // Excavation + Elemental Upgrades
    excavate = shortPermaUpgradeML(11003, cookie, new ExponentialCost(BF("1e365"), ML2(5e4)), `Excavation Site`, `Allows you to mine elements`, 8);
    excavate.getInfo = () => {
        if (excavate.maxLevel == excavate.level) {
            return `You can mine every element except Astrofudge!`;
        } else {
            return `Allows you to mine ${elemFormalName[excavate.level]}`;
        }
    };
    excavate.getDescription = () => {
        if (excavate.maxLevel == excavate.level) {
            return `All excavation sites owned`;
        } else {
            return `Establish ${elemFormalName[excavate.level]} excavation site ${(excavate.level > 0) ? `(${BigTS(nextExcavateReq[excavate.level])}\$${elemName[excavate.level - 1]}\$)` : ""}`;
        }
    };
    excavate.bought = (amount) => {
        for (let i = 0; i < amount; i++) {
            if ((excavate.level - amount + i) == 0) {
                continue;
            }
            if (elements[excavate.level - (amount - i + 1)].value >= nextExcavateReq[excavate.level - (amount - i)]) {
                elements[excavate.level - (amount - i + 1)].value -= nextExcavateReq[excavate.level - (amount - i)];
            } else {
                cookie.value += BF("1e365") * BigP(5e4, excavate.level - 1);
                excavate.level -= amount - i;
                break;
            }
        }
    };

    moreExcavator = shortPermaUpgrade(11004, elements[0], new ExponentialCost(132500, ML2(1.15)), `Powered up Excavators $(E_{p})$`, `Excavation Power goes here`);
    moreExcavator.getInfo = () => `\$E_{f}\$ = \$1+0.2E_{p}^{1.4}\$ = ${(1 + (0.2 * BigP(moreExcavator.level, 1.4)))}`;

    crystalHoney = shortPermaUpgradeML(12004, elements[1], new ExponentialCost(BF(7.1e10), ML2(19.99)), "Crystallized Honey", "A heavenly shard of this honey adds 10 levels to $C_1$", 11);
    crystalHoney.bought = (amount) => calcCPS();

    sugarCoat = shortPermaUpgrade(13004, elements[3], new ExponentialCost(BF(1e6), ML2(11)), "Sugarmuck-Laced Sugar", "Adds 2.5 $\\dot{L}$ per lump of sugarmuck");
    sugarCoat.bought = (amount) => calcCPS();

    jetDrive = shortPermaUpgradeML(baseI + 15, elements[4], new ExponentialCost(2500, ML2(1.2658e5)), "Jetmint Battery Cell", "Electrifies your buildings by increasing $P_i$", 3);
    jetDrive.bought = (amount) => calcCPS();

    const b50 = 1000;
    // P🍪wer Upgrade
    for (let i = 0; i < 19; i++) {
        buildingP[i] = theory.createPermanentUpgrade(4 + i, cookie, new ExponentialCost(b50 * baseCost[i], ML2(b50)));
        buildingP[i].getInfo = (amount) => `\$P_{${i.toString(10)}}${(superP.level > 0) ? "^{1.02}" : ""} \\: = \\: \$${Utils.getMathTo(BigTS(getPower(i)), getPower2(i, buildingP[i].level + amount).toString(0))}`;
        buildingP[i].getDescription = () => `\$P_{${BigTS(i)}}${(superP.level > 0) ? "^{1.02}" : ""}\$ = ${BigTS(getPower(i))}`;
        buildingP[i].bought = (amount) => universalBought(i);
    }
    // Lumpy Upgrade
    for (let i = 0; i < 19; i++) {
        buildingUpgrade[i] = theory.createPermanentUpgrade(33 + i, lump, new LinearCost(i + 1, (i + 1) * ((i >= 13) ? (i - 1) * (i - 5) * 0.06 : 0.9)));
        buildingUpgrade[i].getDescription = (amount) => (bInfo == 1) ? `\$ ${buip}^{L[${i}]} = ${buip}^{${buildingUpgrade[i].level}} = ${BigP(buip, buildingUpgrade[i].level)}\$` : buildingUpgradeName[i];
        buildingUpgrade[i].getInfo = (amount) => {
            if (bInfo == 1) {
                return `\$ L[${i}] = \$ ${Utils.getMathTo(BigP(buip, buildingUpgrade[i].level), BigP(buip, buildingUpgrade[i].level + amount))}`;
            }
            return `Improves ${buildingName[0 + Math.floor(bInfo / 2)][i]}  by a factor of ${TS10(buip)}`;
        };
        buildingUpgrade[i].maxLevel = buildingPMax[i];
        buildingUpgrade[i].bought = (amount) => universalBought(i);
        buildingUpgrade[i].canBeRefunded = (amount) => buildingUpgrade[i].level - amount >= 0;
    }
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(30, 30));
    superP = theory.createMilestoneUpgrade(0, 1);
    superP.boughtOrRefunded = (amount) => {
        calcCPS();
        theory.invalidateSecondaryEquation();
    };
    superP.description = "Super Building Power";
    superP.info = "Increases $P_{i}$ exponent by $0.02$ for all values of $i$";
    superL = theory.createMilestoneUpgrade(1, 1);
    superL.description = "Super Lumps";
    superL.info = "Change $1.1$ in $L[i]$ to $1.11$";
    superL.boughtOrRefunded = (amount) => {
        buip = getbuip();
        calcCPS();
        theory.invalidateSecondaryEquation();
    };
    superC = theory.createMilestoneUpgrade(2, 1);
    superC.description = "Super Flavored Cookie";
    superC.info = "Increases $CP(l)$ exponent by $0.05$";
    superC.boughtOrRefunded = (amount) => {
        calcCPS();
        theory.invalidateSecondaryEquation();
    };

    /////////////////
    //// Achievements
    // Utils Achievement Checker
    var CheckAch1 = (i) => {
        if (BigL10((cookie.value).abs() + 1) >= BF(caReq[i])) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAch2 = (i) => {
        if (BigL10((CPS.abs()) + 1) - BigL10(1 + theory.publicationMultiplier) >= BF(cpsaReq[i])) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAch3 = (i) => {
        if (lumpTotal >= lumpAchReq[i]) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAchBui = (indx, lb) => {
        if (building[indx].level >= lb) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAchBui2 = (indx, lb) => {
        if (buildingUpgrade[indx].level >= lb) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAchFeat = (chk, cnt) => {
        if (chk()) {
            achCount += cnt;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    // 25 Layers of Cookies
    cookiesAchievement = theory.createAchievementCategory(0, cookiesAchievementCatName);
    var cookieADesc = (p) => `Reach e${BigTS(p)} cookies`;
    for (let i = 0; i < 25; i++) {
        ca[i] = theory.createAchievement(i, cookiesAchievement, caName[i], cookieADesc(caReq[i]), () => CheckAch1(i));
    }
    // 26 CPS
    CPSAchievement = theory.createAchievementCategory(1, "Cookies Per Second");
    var CPSDesc = (p) => {
        let result = "Reach e" + BF(p).toString(0) + " cookies per second without publication multipliers";
        if (p >= 751) {
            result += " finishing this theory in a single tick.";
        }
        return result;
    };
    for (let i = 0; i < 26; i++) {
        cpsa[i] = theory.createAchievement(100 + i, CPSAchievement, cpsaName[i], CPSDesc(cpsaReq[i]), () => CheckAch2(i));
    }
    // 10 Lumps
    lumpAchCat = theory.createAchievementCategory(2, "Others");
    var lumpDesc = (p) => {
        let res =
            `Get a total of ${BigTS(p)} sugar lump`;
        if (p != 1) {
            res += "s";
        }
        return res;
    };
    var perkDesc = (p) => {
        let res =
            `Forge ${BigTS(p)} Exponentium Bar`;
        if (p != 1) {
            res += "s";
        }
        return res;
    };
    for (let i = 0; i < 10; i++) {
        lumpAch[i] = theory.createAchievement(200 + i, lumpAchCat, lumpAchName[i], lumpDesc(lumpAchReq[i]), () => CheckAch3(i));
    }
    for (let i = 0; i < 5; i++) {
        perkAch[i] = theory.createAchievement(1000 + i, lumpAchCat, pach[i], perkDesc(perkAchReq[i]), () => CheckAchFeat(() => (perkPoint >= perkAchReq[i]), 1), () => (perkPoint / perkAchReq[i]));
    }
    for (let i = 0; i < 14; i++) {
        if (i <= 4) {
            spellAch[i] = theory.createAchievement(1100 + i, lumpAchCat, sach[i], `Cast a total of ${spellAchReq[i]} spells${(i == 4) ? "\nHaving this achievement will boost the power of every spell" : ""}`, () => CheckAchFeat(() => (spellCountCast.reduce((a, b) => a + b, 0) >= spellAchReq[i]), 1), () => (spellCountCast.reduce((a, b) => a + b, 0) / spellAchReq[i]));
        } else {
            spellAch[i] = theory.createAchievement(1200 + i, lumpAchCat, sach[i], `Cast ${spellName[i - 5]} ${spellAchReq[i]} times\nHaving this achievement will boost the power of this spell`, () => CheckAchFeat(() => (spellCountCast[i - 5] >= spellAchReq[i]), 1), () => (spellCountCast[i - 5] / spellAchReq[i]));
        }
    }
    // A lot of buildings
    BuildingAchievement = theory.createAchievementCategory(3, "Buildings");
    for (let i = 0; i < 19; i++) {
        // too lazy to add proper pluralization sorry not sorry
        let indx = 0 + Math.floor(bInfo / 2);
        buiAch1[i] = theory.createAchievement(300 + i, BuildingAchievement, bach1[i], `Have 100 ${buildingName[indx][i]}s`, () => CheckAchBui(i, 100));
        buiAch2[i] = theory.createAchievement(400 + i, BuildingAchievement, bach2[i], `Have 1,000 ${buildingName[indx][i]}s`, () => CheckAchBui(i, 1000));
        buiAch3[i] = theory.createSecretAchievement(500 + i, BuildingAchievement, bach3[i], `Have 5,000 ${buildingName[indx][i]}s`, `${buildingName[0 + Math.floor(bInfo / 2)][i]} by 5000`, () => CheckAchBui(i, 5000));
        if (i < 14) {
            buiAch4[i] = theory.createSecretAchievement(600 + i, BuildingAchievement, bach4[i], `Have 10,000 ${buildingName[indx][i]}s`, `${buildingName[indx][i]} by 10000`, () => CheckAchBui(i, 10000));
        }
        buiLumpAch[i] = theory.createAchievement(700 + i, BuildingAchievement, bachlump[i], `Upgrade ${buildingName[indx][i]} to level 100`, () => CheckAchBui2(i, 100));
    }
    // Feats
    {
        featAchCat = theory.createAchievementCategory(4, "Feats");
        superIdle = theory.createAchievement(800, featAchCat, "Super Idler", "(2) Have your cookies exceed 1 day worth of CPS while having 0 levels of terraform upgrade", () => CheckAchFeat(() => ((cookie.value).abs() > BF(86400) * CPS) && (terra.level == 0), 2));
        hyperIdle = theory.createSecretAchievement(801, featAchCat, "Hyper Idler", "(3) Have your cookies exceed 1 year worth of CPS while having 0 levels of terraform upgrade\nhow in the world did you even managed that anyway", "Gaseous", () => CheckAchFeat(() => ((cookie.value).abs() > BF(0x1e13380) * CPS) && (terra.level == 0), 3));
        speedBake1 = theory.createAchievement(802, featAchCat, "Speed Baking I", "(1) Get 1e25 CPS within 1 minute of publishing", () => CheckAchFeat(() => (CPS >= BF(1e25)) && (thyme.level <= 600), 1));
        speedBake2 = theory.createAchievement(803, featAchCat, "Speed Baking II", "(2) Get 1e50 CPS within 45 seconds of publishing", () => CheckAchFeat(() => (CPS >= BF(1e50)) && (thyme.level <= 450), 2));
        speedBake3 = theory.createAchievement(804, featAchCat, "Speed Baking III", "(3) Get 1e100 CPS within 30 seconds of publishing", () => CheckAchFeat(() => (CPS >= BF(1e100)) && (thyme.level <= 300), 3));
        speedBake4 = theory.createAchievement(805, featAchCat, "Speed Baking IV", "(3) Get 1e200 CPS within 15 seconds of publishing", () => CheckAchFeat(() => (CPS >= BF(1e200)) && (thyme.level <= 150), 3));
        speedBake5 = theory.createAchievement(806, featAchCat, "Speed Baking V", "(4) Get 1e300 CPS within 5 seconds of publishing\n\nhaha speed goes brrrrrr", () => CheckAchFeat(() => (CPS >= BF(1e300)) && (thyme.level <= 50), 4));
        speedBake6 = theory.createSecretAchievement(812, featAchCat, "Speed Baking VI", "(5) Get 1e500 CPS within 2.5 seconds of publishing\n\nwould you please just slow down?", "we fast as 5", () => CheckAchFeat(() => (CPS >= BF("1e500")) && (thyme.level <= 25), 5));
        sugarAddict1 = theory.createAchievement(814, featAchCat, "Sugar lump enjoyer", "(2) Have the dominant building have 50 levels of sugar lump upgrade", () => CheckAchFeat(() => (buildingUpgrade[dominate].level >= 50), 2));
        sugarAddict2 = theory.createAchievement(815, featAchCat, "Sugar lump addict", "(3) Have the dominant building have 100 levels of sugar lump upgrade\n\n you have issues", () => CheckAchFeat(() => (buildingUpgrade[dominate].level >= 100), 3));
        sugarAddict3 = theory.createAchievement(816, featAchCat, "Overpusher", "(4) Have the dominant building have 150 levels of sugar lump upgrade\n\n stop overpushing and get back to progressing, please", () => CheckAchFeat(() => (buildingUpgrade[dominate].level >= 150), 4));
        insipid = theory.createSecretAchievement(808, featAchCat, "Pure Chocolate Taste", "(2) Get e55 cookies without buying a single level of milk and cookie flavor", "Forget something?", () => CheckAchFeat(() => ((cookie.value).abs() >= BF(1e55)) && (kitty.level == 0) && (cookieT.level == 0), 2));
        PVCRK = theory.createSecretAchievement(819, featAchCat, "Pure Vanilla Taste", "(3) Get e250 cookies without a single level of milk, cookie flavors, and a LOT more....\n\nThis is NOT a CRK reference", "forgor something??? 💀", () => (CheckAchFeat(() => (((cookie.value).abs() >= BF(1e250)) && (kitty.level == 0) && (cookieT.level == 0) && (terra.level == 0) && (ygg.level == 0) && (art.level == 0) && (artArt.level == 0) && (invest.level == 0) && (recom.level == 0) && (covenant.level == 0)), 3)));
        nice = theory.createSecretAchievement(807, featAchCat, "nice", "(2) Get 6.9 heavenly chips in any order of magnitude (decimals accepted)", "nice", () => CheckAchFeat(() => {
            let temp = TS10(cookie.value);
            return (temp[0] == '6') && ((temp[2] == '9') || temp[1] == '9');
        }, 2));
        leetnice = theory.createSecretAchievement(809, featAchCat, "you won the internet", "(2) Have Temple+Alchemy Lab = 1337", "[ni] + [ce] = leet", () => CheckAchFeat(() => ((building[6].level + building[9].level) == 0x539), 2));
        sigmaCurseof = theory.createSecretAchievement(810, featAchCat, "Sigma Fingers", "(2) Have 1e100 Cursor CPS with only a single cursor\nThis feat also unlocks a special building display mode, find it out :)", "Doing so much with only a single one", () => CheckAchFeat(() => (arrcps[0] >= BF(1e100)) && (building[0].level == 1), 2));
        timeSpeed = theory.createSecretAchievement(811, featAchCat, "Time is speed", "(2) Dilate 15 whole seconds in a single tick", "Got any quarters to spare?", () => CheckAchFeat(() => (Dilate() >= 150), 2));
        timeOhNo = theory.createSecretAchievement(813, featAchCat, "Time is rickroll", "(6) Dilate an entire video of Rick Astley - Never Gonna Give You Up (Official Music Video) into a SINGLE tick (which is 312 seconds in a SINGLE tick)\n\nAlso check out https://www.youtube.com/watch?v=oHg5SJYRHA0, very cool video", "No Hint >:)", () => CheckAchFeat(() => (Dilate() >= 3120), 6));
        jackpot = theory.createSecretAchievement(817, featAchCat, "JJJJACKPOTTTTTTT", "(1) Get the biggest W for exploring an temple", "Just get lucky!", () => CheckAchFeat(() => {
            if (templeJ) {
                return true;
            } else {
                return false;
            }
        }, 1));
        indecisive = theory.createSecretAchievement(818, featAchCat, "Indecisive", "(1) 100 choices and yet you still can\'t decide on it", "Identity Crisis", () => (CheckAchFeat(() => (indecide >= 100), 1)));
    }
    //! Total sum of all feats : 53
    //! Latest Feat ID : 819

    ///////////////////
    //// Story chapters
    for (let i = 0; i < 16; i++) {
        chapter[i] = theory.createStoryChapter(i, chapterName[i], chapterLore[i], () => checkChapter(i));
    }
    buip = getbuip();
    // Finishing up stuffs
    for (let i = 0; i < 9; i++) {
        quartList[i] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{_{${elemName[i]}}}`, elements[i].value));
    }
    quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{\\dot{C}}`, null));
    quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
    quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T}`, null));
    quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_m}`, null));
    quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
    updateSpellLayer();
    updateAvailability();
};


var updateAvailability = () => {
    // Buildings
    for (let i = 0; i < 19; i++) {
        if (i >= 3) building[i].isAvailable = cookie.value >= baseCost[i - 1];
        buildingP[i].isAvailable = building[i].level > 0;
        buildingUpgrade[i].isAvailable = building[i].level > 10;
    }
    building[14].isAvailable = ((cookie.value >= baseCost[13]) && (artArt.level > 8));
    jetDrive.isAvailable = (artArt.level > 12) || (jetDrive.level > 0);
    crystalHoney.isAvailable = (artArt.level > 12) || (crystalHoney.level > 0);
    sugarCoat.isAvailable = (artArt.level > 12) || (sugarCoat.level > 0);
    // Unique Upgrade
    covenant.isAvailable = cookie.value >= BF(1e60);
    ygg.isAvailable = cookie.value >= BF(1e100);
    terra.isAvailable = cookie.value >= BF(1e125);
    recom.isAvailable = cookie.value >= BF(1e155);
    invest.isAvailable = cookie.value >= BF(1e180);
    art.isAvailable = cookie.value >= BF(1e250);
    artArt.isAvailable = ((artUnlock >= 1) || (art.level > 0));
    SpellView.isAvailable = artArt.level > 10;
    for (let i = 0; i < Spell.length; i++) {
        Spell[i].isAvailable = isSpellShown;
    }
    Spell[8].isAvailable = isSpellShown && (artArt.level > 11);
    updateSpellLayer();
    aquaCrust.isAvailable = (artArt.level > 12);
    timeDilate.isAvailable = artArt.level > 11;
    excavate.isAvailable = (artArt.level > 12) || (elements[0].value > 1);
    moreExcavator.isAvailable = (artArt.level > 12) || (moreExcavator.level > 0);
    accelerator.isAvailable = artArt.level > 12;
    acceleratorMenu.isAvailable = accelerator.level > 0;
    // Cookie Flavor
    cookieT.isAvailable = building[2].level > 0;
    for (let i = 0; i < cookieTinName.length; i++) {
        cookiet[i].isAvailable =
            cookieTin.level >= i + 1 &&
            cookie.value > BF(cookietB[i]);
    }
    kitty.isAvailable = achCount >= 5;
    // Heavenly Upgrade
    cookieTin.isAvailable = hc.value >= BF(10) && heavVis;
    CookieH.isAvailable = hc.value >= BF(500) && heavVis;
    CookieS.isAvailable = hc.value >= BF(10000) && heavVis;
    CookieC.isAvailable = hc.value >= BF(1e7) && heavVis;
    DivineD.isAvailable = hc.value >= BF(1e10) && heavVis;
    CookieTau.isAvailable = hc.value >= BF(1e12) && heavVis;
    TerraInf.isAvailable = hc.value >= BF(1e50) && heavVis;
    TwinGates.isAvailable = ChronosAge.level > 0 && heavVis;
    ChronosAge.isAvailable = ygg.level > 0 && heavVis;
    ConjureBuild.isAvailable = invest.level >= 10 && heavVis;
    R9Box.isAvailable = hc.value > BF(1e79) && heavVis;
    conGrow.isAvailable = hc.value > BF(1e100) && heavVis;
    SpellStack.isAvailable = hc.value > BF(1e100) && heavVis;
    Empower.isAvailable = hc.value > BF(1e115) && heavVis;
    milkOil.isAvailable = hc.value > BF(1e130) && heavVis;
};


//==CPS==
// Calculates Building Level
// id = ID, am = Offset Amount
let bc = BigNumber.ZERO;
var calcBuilding = (id, am) => {
    if (conGrow.level > 0 && id >= 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 2.4 + (0.2 * conGrow.level) + (0.011 * (id - 11)), 50 - conGrow.level, 1) - 1;
    } else if (conGrow.level > 1 && id < 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.2 + (0.07 * conGrow.level) + (0.021 * (id + 1)), 50 - conGrow.level, 1) - 1;
    } else {
        return BF(building[id].level + am);
    }
};
var getExpn = (index) => buiPerk[index] * buiexp + 1;
var getPower = (index) => BigP(Utils.getStepwisePowerSum(buildingP[index].level, buildingUpgradeMult[index] + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetDrive.level * 0.5), 5, 1), 1 + (superP.level * 0.02));
var getPower2 = (index, level) => BigP(Utils.getStepwisePowerSum(level, buildingUpgradeMult[index] + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetDrive.level * 0.5), 5, 1), 1 + (superP.level * 0.02));
var calcCPS = () => {
    if (!Number.isFinite(dominate)) {
        dominate = 0;
    }
    subconstant = BF(1);
    buip = getbuip();
    CPS = BigNumber.ZERO;
    bc = BigNumber.ZERO;
    milk = BigNumber.FIVE * achCount;
    HPS = BF(hc.value).pow(0.9) * (recom.level + ((artArt.level > 7) ? 10 : 0));
    LPS = (recom.level + ((artArt.level > 7) ? 10 : 0)) * 0.01;
    let kp = kittyPower(kitty.level) * BF(BF(100 + milk) / BF(100));
    for (let i = 0; i < 19; i++) {
        if (building[i].level == 0) {
            arrcps[i] = 0;
            continue;
        }
        arrcps[i] = BigNumber.ZERO;
        let step1 = BF(calcBuilding(i, 0) * BF(getPower(i)) * BF(bcps[i]));
        arrcps[i] = (step1 * kp * BF(buip).pow(buildingUpgrade[i].level)).pow(getExpn(i));
        // arrcps[i]=BF("1e180");
        bc += BigP(building[i].level, 0.8) * getPower(1).pow(0.9);
    }
    if (artArt.level > 0) {
        // Multiplies temple CPS by 8e57
        arrcps[6] *= BF(8e57);
        if (artArt.level > 1) {
            // Multiplies Temple CPS by the amount of prisms you have.
            // Multiplies Prism CPS by 55 and the amount of temples you have.
            arrcps[13] *= BF(1) + (BF(55) * building[6].level);
            arrcps[6] *= (building[13].level) + BF(1);
            if (artArt.level > 3) {
                // Multiplies Cursor CPS by 3.24e65
                arrcps[0] *= BF(3.24e65);
                if (artArt.level > 5) {
                    // Multiplies Farm CPS by 200
                    // Multiplies Prism CPS by 750
                    arrcps[13] *= BF(750);
                    arrcps[2] *= BF(200);
                    if (artArt.level > 6) {
                        // Multiplies Mine CPS by 3.5e63
                        arrcps[3] *= BF(3.5e63);
                        if (artArt.level > 7) {
                            // Multiplies Factory CPS by 1.08e18
                            arrcps[4] *= BF(1.08e18);
                            if (artArt.level > 8) {
                                // Multiplies Bank CPS by 4.08e68
                                arrcps[5] *= BF(4.08e68);
                            }
                        }
                    }
                }
            }
        }
    }
    if (ygg.level > 0 && thyme.level > 0) {
        arrcps[2] *= BF(getPower(2)).pow(1.175 + 0.05 * ygg.level) * BF(building[6].level + building[2].level).pow(BigP(ygg.level, 0.9) * 0.2 + 3) * (BigNumber.ONE + BF(thyme.level).pow(1.4)) * BF(5e10);
    }
    if (covenant.level > 0) {
        arrcps[1] *= bc.pow(BF(covenant.level).pow(0.45) * covDelta + covExp) * covenant.level;
    }
    if (recom.level > 0) {
        HPS = BF(hc.value).pow(0.9) * (recom.level + ((artArt.level > 7) ? 10 : 0));
        LPS = (recom.level + ((artArt.level > 7) ? 10 : 0)) * 0.01;
        arrcps[4] *= (recom.level > 1) ? (BF(1e54) * BigP(1.9, recom.level - 1)) : (BF(1e54));
    }
    LPS += sugarCoat.level * 2.5;
    lwC = Math.floor((BigL10(10 + (cookie.value).abs())) / lumpc) + LPS / 10;
    arrcps[14] = BigP(arrcps[14], RandR(1.01 + (0.00005 * buildingUpgrade[14].level), 0.99 + (0.00005 * buildingUpgrade[14].level)));

    // calculate the dominant building
    log(dominate);
    for (let i = 0; i < 19; i++) {
        CPS += arrcps[i];
        if (!Number.isFinite(mult) || Number.isNaN(mult) || mult == 0) {
            updateMult();
        }
        if (BF(arrcps[dominate]) / BF(mult) < BF(arrcps[i])) {
            // recalc constant then replace
            if (subconstant > BF(1)) {
                subconstant = ((arrcps[i] + (subconstant * arrcps[dominate])) / arrcps[i]);
            } else {
                subconstant = BF(1);
            }
            dominate = i;
            // log(dominate);
        } else if (arrcps[i] * BF(1000) > arrcps[dominate] && i != dominate) {// upper limit = 1/1000th of cps
            // it's in the ratios!
            subconstant += (BF(arrcps[dominate]) / BF(arrcps[i]));
        }
        arrcps[i] *= mult;
    }
    if ((spellCast[1] + (10 * effectCPSBDur)) >= thyme.level) {
        CPS *= effectCPSB;
    }
    if (artArt.level > 4) {
        // Multiplies the CPS from all buildings by the amount of grandmas you have to the power of 0.61
        CPS *= BigP(building[1].level, 0.61);
    }
    CPS *= (1 + (BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp)) * getCookieP(cookieT.level) * (1 + (CookieTau.level * game.tau.log10().log10().pow(2)));
    if (artArt.level > 9) {
        CPS *= BF(100);
    }
    if ((ChronosAge.level) > 0) {
        CPS *= BigNumber.ONE + BF(thyme.level).pow(0.5);
    }
    CPS *= (TwinGates.level > 0 ? hc.value.pow(0.03 * TwinGates.level) : 1) * theory.publicationMultiplier * (BigP(game.sigmaTotal, R9Box.level * 0.7));
};
var lessPreciseCalcCPS = () => {
    // basic
    let step1 = BF(calcBuilding(dominate, 0) * BF(getPower(dominate)) * BF(bcps[dominate]));
    arrcps[dominate] = (step1 * kittyPower(kitty.level) * BF(BF(100 + (BF(5) * achCount)) / BF(100)) * BF(buip).pow(buildingUpgrade[dominate].level)).pow(getExpn(dominate));
    LPS = (recom.level + ((artArt.level > 7) ? 10 : 0)) * 0.01;
    LPS += sugarCoat.level * 2.5;
    lwC = Math.floor((BigL10(10 + (cookie.value).abs())) / lumpc) + LPS / 10;
    switch (dominate) {
        case 0:
            if (artArt.level > 3) {
                arrcps[dominate] *= BF(3.24e65);
            }
            break;
        case 1:
            if (covenant.level > 0) {
                arrcps[1] *= bc.pow(BF(covenant.level).pow(0.45) * covDelta + covExp) * covenant.level;
            }
            break;
        case 2:
            if (ygg.level > 0 && thyme.level > 0) {
                arrcps[2] *= BF(getPower(2)).pow(1.175 + 0.05 * ygg.level) * BF(building[6].level + building[2].level).pow(BigP(ygg.level, 0.9) * 0.2 + 3) * (BigNumber.ONE + BF(thyme.level).pow(1.4)) * BF(5e10);
            }
            if (artArt.level > 5) {
                arrcps[2] *= BF(200);
            }
        case 3:
            if (artArt.level > 6) {
                arrcps[3] *= BF(3.5e63);
            }
            break;
        case 4:
            if (recom.level > 0) {
                arrcps[4] *= (recom.level > 1) ? (BF(1e54) * BigP(1.9, recom.level - 1)) : (BF(1e54));
            }
            if (artArt.level > 7) {
                arrcps[4] *= BF(1.08e18);
            }
            break;
        case 5:
            if (artArt.level > 8) {
                arrcps[5] *= BF(4.08e68);
            }
            break;
        case 6:
            if (artArt.level > 0) {
                arrcps[6] *= BF(8e57);
                if (artArt.level > 1) {
                    arrcps[6] *= (building[13].level) + BF(1);
                }
            }
            break;
        case 13:
            if (artArt.level > 1) {
                arrcps[13] *= BF(1) + (BF(55) * building[6].level);
                if (artArt.level > 5) {
                    arrcps[13] *= BF(750);
                }
            }
            break;
        case 14:
            arrcps[14] = BigP(arrcps[14], RandR(1.01 + (0.00005 * buildingUpgrade[14].level), 0.99 + (0.00005 * buildingUpgrade[14].level)));
            break;
    }
    arrcps[dominate] *= mult;
    CPS = arrcps[dominate] * subconstant;
};


//==TICK==
let lwC = 0;
let idle = false;
let xBegin = BigNumber.ZERO;
const lambda = BF("1e-6");
const yieldfactor = BF("5e-2");
const lossfactor = BF(25);
const mineRate = BF(150);
var tick = (elapsedTime, multiplier) => {
    // dt magic
    let dt = BF(elapsedTime * multiplier);
    if (aquaCrust.level > 0) {
        cookie.value += Math.min(BigNumber.ONE, BigP(elements[2].value, 0.99) * BF("1e-20")) * ((cookie.value * 12.59) / BF(36000));
        elements[2].value -= BigP(elements[2].value, 0.87);
    }
    if (game.isCalculatingOfflineProgress || idle) {
        xBegin = thyme.level - 300;
        if (CPS == 0) {
            updateMult();
            lessPreciseCalcCPS();
        }
        cookie.value += dt * (CPS * Logistic() * Dilate()) / BigNumber.TEN;
        hc.value += dt * HPS / 10;
        lump.value += dt * (BF(lwC) + (BigL10(cookie.value) / BF(lumpc)));
        lumpTotal += dt * (BF(lwC) + (BigL10(cookie.value) / BF(lumpc)));
        thyme.level += (thyme.level < thyme.maxLevel) ? 1 : 0;
        if (artArt.level > 13) {
            elements[8].value += dt * (BigL10(BF(10) + building[8].level) * BigL10(BF(10) + arrcps[8]) * 0.001);
        }
        return;
    } else {
        thyme.level += (thyme.level < thyme.maxLevel) ? 1 : 0;
        if (thyme.level == 0 || thyme.level % 200 == 0 || arrcps[dominate] == 0 || arrcps[0] == 0) {
            updateMult();
            if (arrcps[0] == 0) {
                calcCPS();
            }
            if (cookie.value > 1e50) {
                lessPreciseCalcCPS();
            } else if ((cookie.value <= 1e50) || thyme.level % 500 == 0) {
                calcCPS();
            }
        }

        if (artArt.level > 13) {
            elements[8].value += BigL10(BF(10) + building[8].level) * BigL10(BF(10) + arrcps[8]) * 0.001;
        }

        cookie.value += (CPS * Logistic() * Dilate()) / BigNumber.TEN;
        lump.value += lwC;
        lumpTotal += lwC;

        // Sugar Lump Incremental
        hc.value += HPS / 10;
        if (thyme.level % 10 == 0) {

            for (let i = 0; i < Spell.length; i++) {
                if ((spellCast[i] / 10) + spellCool[i] <= (thyme.level / 10)) {
                    Spell[i].level = 0;
                }
            }
            updateAvailability();

            if (cookie.value > 10 && Math.random() <= 1 / (lumpc / BigL10(cookie.value))) {
                lump.value += BigNumber.ONE;
                lumpTotal++;
            }
        }
        // elemental increase
        let realMRate = mineRate - ((10 + (5 * (kitty.level / (kitty.level + 1)))) * milkOil.level);
        let excRate = (1 + (0.2 * BigP(moreExcavator.level, 1.4)));
        for (let i = 0; i < excavate.level; i++) {
            elements[i].value += dt * BigL2(Logistic() + BF(2)) * building[3].level * BigP(getPower(3), 0.05) * BigP(buildingUpgrade[3].level, 1.15) * BigP(realMRate, -1 * (i + 1)) * excRate;

            if (i == reactorMode && (building[12].level > 0)) {
                let rate = building[12].level * lambda * elements[i + 2].value;

                if ((elements[i + 2].value) <= (rate * lossfactor)) {
                    elements[i + 2].value = rate * lossfactor;
                    continue;
                }

                elements[i + 1].value += dt * BigP(elements[i + 2].value, 0.35) * rate * (yieldfactor / lambda) * (elemWeight[i + 1] / elemWeight[i + 2]);
                elements[i].value += dt * BigP(elements[i + 2].value, 0.35) * rate * (yieldfactor / lambda) * (elemWeight[i] / elemWeight[i + 2]);
                cookie.value += dt * BigL10(rate + elemWeight[i + 2]) * BigP(cookie.value, 0.98) * (elemWeight[i] + elemWeight[i + 1] + elemWeight[i + 2]) / 228;
                elements[i + 2].value -= dt * rate * lossfactor;

            }
        }

        theory.invalidateQuaternaryValues();
        theory.invalidateTertiaryEquation();
    }
};
// Logistic funtion for Mine+
// Param -> midpoint=30*L, max=500*L - 1, min=0
// Display T, returns bignumber
var Logistic = () => {
    var maxL =
        (BF(terra.level).pow(2.4 + 0.05 * (TerraInf.level + ((artArt.level > 6) ? 1 : 0))) * 1500) +
        BF(building[3].level).pow(1.2 + 0.03 * TerraInf.level) * ((spellCast[3] + (10 * logBoostDue) >= thyme.level) ? logBoost : 1) * ((moreExcavator.level > 0) ? BigP((1 + (0.2 * BigP(moreExcavator.level, 1.4))), 1.5) : 1);

    return ((maxL.pow(1 + 0.005 * TerraInf.level)) / (BigNumber.ONE + (BigNumber.E.pow((thyme.level - (xBegin + terra.level * 600)))))) + ((TerraInf.level > 0) ? 1 + BigP(maxL, 0.2 + (TerraInf.level * 0.1)) : 1);
};
var Dilate = () => {
    if (timeDilate.level == 0) {return 1;}
    let res = building[10].level + building[12].level;// restricting buildings
    let factor = (building[11].level >= (res)) ? 1 - 1 / (2.125 - (0.125 * timeDilate.level)) : 1 - (building[11].level / (2 * res));
    return BF(1) + (BigP(building[11].level, 1 + 0.025 * timeDilate.level)) / BigP(1000, factor);
};


//==EQUATIONS==
const height = 60;
var quartList = new Array(9), quartList2 = new Array(5);
var PrimaryEquation = (col) => {
    return `\\color{#${eqColor[col]}}{\\dot{C} = P(B(0) + P_{cp}\\sum_{i=1}^{18}{B(i)})}`;
};
var secondaryCheck = (mode) => {
    switch (mode) {
        case 4:
            return covenant.level > 0;
            break;
        case 5:
            return ygg.level > 0;
            break;
        case 6:
            return terra.level > 0;
            break;
        case 7:
            return recom.level > 0;
            break;
        case 8:
            return artArt.level > 11;
            break;
        case 9:
            return excavate.level > 0;
            break;
        case 10:
            return accelerator.level > 0;
            break;
        default:
            return true;
    }
};
var secondaryEq = (mode, col) => {
    if (Number.isNaN(col)) {
        col = 0;
    }
    //\color{#E6DFCF}{B(i) = B[i]P_{i}1.1^{L[i]}(\log_{10}\log_{10}\tau)^{2}}
    switch (mode) {
        case 0:
            return `\\color{#${eqColor[col]}}{${(R9Box.level > 0) ? "\\dot{C} \\leftarrow \\dot{C}\\sigma^{0.7R_{9}}\\\\" : ""}B(i) = B[i]P_{i}${buip}^{L[i]}${(CookieTau.level > 0) ? "(\\log_{10}\\log_{10}\\tau)^{2}" : ""}${(building[14].level > 0) ? "\\\\B(14) \\leftarrow B(14)^{r(1.01+5\\cdot10^{-5}L[14],0.99+5\\cdot10^{-5}L[14])}" : ""}}`;
        case 1:
            return (
                `\\color{#${eqColor[col]}}{` +
                "P = M(CP(l)) \\\\" +
                (CookieS.level > 0 ? "(log_{2}(L + 2))^{1.5}" : "") +
                (CookieH.level > 0 ? "(log_{10}(H + 10))^{1.25}" : "") +
                (CookieC.level > 0 ? "\\\\(log_{10}(C + 10))^{0.9}" : "") + "}"
            );
        case 2:
            return `\\color{#${eqColor[col]}}{M = M_{i}K(0.2)+(K-10)(0.3)\\\\+(K-25)(0.4)+(K-50)(0.5)${(artArt.level > 2) ? "\\\\M \\leftarrow M^{1.5+0.01A_{c}}" : ""}}`;
        case 3:
            theory.secondaryEquationScale = 0.9;
            return (
                `\\color{#${eqColor[col]}}{` +
                `CP(l) = ${(DivineD.level > 0) ? "2^{D_{d}}" : ""}C_{1}(l)C_{2}()` +
                (invest.level > 0 ? "I_{o}^{1.01}" : "") +
                "\\\\C_{1}(l) = max_{l}:[0,25,50,75,100,150]\\\\ \\rightarrow [1.03,1.05,1.07,1.09,1.11,1.13]^{l}\\\\C_{2}() = \\prod_{i=0}^{8}{TP[i]^{CT[i]}}}"
            );
        case 4:// Cov
            let cp = " C_{v}";
            return (
                `\\color{#${eqColor[col]}}{B(2) \\leftarrow B(2)${cp}\\\\(\\sum_{i=0 \\: i\\neq 1}^{18}{P_{1}^{0.9}}{B[i]^{0.8}}${cp})^{${covDelta}${cp}^{0.45} + ${covExp}}}`
            );
        case 5:// Ygg + Chronos
            // theory.secondaryEquationScale = 0.925;
            let ys = " Y_{g}";
            return `\\color{#${eqColor[col]}}{B(2) \\leftarrow 5(10^{10})B(2)P_{2}^{1.175 + 0.05${ys}}\\\\(B[6]+B[2])^{3 + 0.2${ys}^{0.9}}(1+t)^{1.4}${(ChronosAge.level > 0) ? `\\\\ B(i) \\leftarrow B(i)(1+t^{0.5}), \\quad i \\neq 2` : ``}}`;
        case 6:// Terra
            let tr = " T_{r}";
            let tf = " T_{\\infty}";
            let tm = " T_{m}";
            return `\\color{#${eqColor[col]}}{${tm} = 1500${(moreExcavator.level > 0) ? "E_{f}^{1.5}" : ""}${tr}^{2.5+0.05${tf}}\\\\T = 1+${tm}^{0.2+0.1${tf}} + \\frac{${tm}^{1+0.005${tf}}}{1+e^{t-(X_{b}+600${tr})}}}`;
        case 7:// Recom
            let rc = " R_{c}";
            return `\\color{#${eqColor[col]}}{\\dot{H} = H^{0.9}(${rc})\\\\ \\dot{L} = 0.01${rc}\\\\ B(4) \\leftarrow B(4)10^{54}1.9^{${rc}-1}}`;
        case 8:// Dilation
            return `\\color{#${eqColor[col]}}{T_d = \\frac{B[11]^{1+0.025T_D}}{1000^{T_f}}\\\\T_f = 1-\\frac{min(B[11],B[10]+B[12])}{(2.125-0.125T_{D}))(B[10]+B[12])}}`;
        case 9:// Elements
            theory.secondaryEquationScale = 0.85;
            return `\\color{#${eqColor[col]}}{E=[Be,Ch,Bg,Su,Jm,Cs,Hz,Mn,As]\\\\ \\dot{E_{n}}=\\frac{E_{f}B[3]L[3]P_{3}^{0.05}log_2(T)}{150^{n+1}},\\: n \\neq 8${(artArt.level > 13) ? `\\\\ \\dot{E_{8}}=\\frac{log_{10}(B[8]+10)log_{10}(B(8)+10)}{1000}` : ``}}`;
        case 10:// Decay
            let ingre = (reactorMode == -1) ? "E_{n}" : `${elemName[reactorMode + 2]}`;
            let r1 = (reactorMode == -1) ? "E_{n-1}" : `${elemName[reactorMode + 1]}`;
            let r2 = (reactorMode == -1) ? "E_{n-2}" : `${elemName[reactorMode]}`;
            let b1 = (reactorMode == -1) ? "" : `${elemName[reactorMode + 2]}=${elemWeight[reactorMode + 2]}u`;
            let b2 = (reactorMode == -1) ? "" : `${elemName[reactorMode + 1]}=${elemWeight[reactorMode + 1]}u`;
            let b3 = (reactorMode == -1) ? "" : `${elemName[reactorMode]}=${elemWeight[reactorMode]}u`;
            return `\\color{#${eqColor[col]}}{${b1} \\quad ${b2} \\quad ${b3}\\\\${ingre} \\rightarrow ${ingre}(${r1}) + ${ingre}(${r2}) + \\frac{${(reactorMode == -1) ? "\\lambda " : elemWeight[reactorMode + 2] + elemWeight[reactorMode + 1] + elemWeight[reactorMode]}C^{0.98}}{228}\\\\\\dot{R} = B[12]\\lambda ${ingre}}`;
    }
};
var TertiaryEquation = (col) => {
    if (Number.isNaN(col)) {
        col = 0;
    }
    return `\\color{#${eqColor[col]}}{` + theory.latexSymbol + "=\\max C^{0.2}}";
};
var getPrimaryEquation = () => {
    theory.primaryEquationScale = 1.15;
    theory.primaryEquationHeight = height;
    if (Number.isNaN(eqC)) {
        eqC = 0;
    }
    return PrimaryEquation(eqC);
};
var getSecondaryEquation = () => {
    theory.secondaryEquationHeight = 90;
    theory.secondaryEquationScale = 1.1;
    return secondaryEq(eqType, eqC);
};
var getTertiaryEquation = () => {
    if (Number.isNaN(eqC)) {
        eqC = 0;
    }
    return TertiaryEquation(eqC);
};
var getQuaternaryEntries = () => {
    for (let i = 0; i < 9; i++) {
        quartList[i].value = (excavate.level >= (i + 1) || ((i == 8) && (artArt.level > 13)) || elements[i].value > 0) ? elements[i].value : null;
    }
    quartList2[0].value = CPS;
    quartList2[1].value = thyme.level / 10;
    quartList2[2].value = (terra.level > 0) ? Logistic() : null;
    quartList2[3].value = (terra.level > 0) ? ((BF(terra.level).pow(2.4 + 0.05 * (TerraInf.level + ((artArt.level > 6) ? 1 : 0))) * 1500) + BF(building[3].level).pow(1.2 + 0.03 * TerraInf.level) * ((spellCast[3] + (10 * logBoostDue) >= thyme.level) ? logBoost : 1) * ((moreExcavator.level > 0) ? BigP((1 + (0.2 * BigP(moreExcavator.level, 1.4))), 1.5) : 1)) : null;
    quartList2[4].value = (timeDilate.level > 0) ? Dilate() : null;
    if (quType == 0) {
        return quartList2;
    } else {
        return quartList;
    }
};


//==OTHER THEORY BACKBONE==
var elemBefore = new Array(9);
var get2DGraphValue = () => {
    if (vizType == 1)
        return (
            (milk >= 100 ? 100 : milk) +
            ((BigNumber.PI * BF(time)) / BigNumber.TEN).sin().abs()
        ).toNumber();
    else if (vizType == 0)
        return (
            cookie.value.sign *
            (BigNumber.ONE + cookie.value.abs()).log10().toNumber()
        );
};
var getPublicationMultiplier = (tau) => tau.pow(1.078);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{1.078}";
var postPublish = () => {
    lump.value = lumpbf;
    hc.value = hbf;
    CPS = BigNumber.ZERO;
    getEquationOverlay();
    updateAvailability();
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = elemBefore[i];
    }
};
var prePublish = () => {
    lumpbf = lump.value;
    hbf = hc.value;
    hbf += (cookie.value / BF("1e12")).pow(1 / 3);
    isSpellShown = 0;
    for (let i = 0; i < elements.length; i++) {
        elemBefore[i] = elements[i].value;
    }
};
var getTau = () => (cookie.value.abs()).pow(0.2);


//==UI==
//! The text is arranged as follows: Introduction, Exponents, Cookies and Milk, Special Upgrades, Terraform Powerup, Archaeology, Grimoire, SPOILERS:(((((Elements and Alchemy, Subgames, Bingo Research Facility)))))
//!1.1 : HELP MENU; Just a bunch of text that is used in the help menu and a placeholder for the REAL help menu, meanwhile enjoy this placeholder text
var getHelpText = () => {
    let ret = [];
    ret.push(ui.createLabel({
        text: "Welcome to a theory all about cookies and more cookies!!!\n You have 3 currencies, cookies(C), heavenly chips(H), and sugar lumps(L), which you'll be spending on upgrades located on both tabs.\n\nCookies(C) by far is the most important, as the majority of the gameplay revolves around it, from buildings to even tau! You can get your first batch of cookies by buying a cursor, which is gifted to you for free to kickstart your very own cookie empire! By maximizing CPS(C dot), you are sure to produce a whole lot of cookies.\n\nHeavenly Chips(H) are a special type of cookie that forms whenever you sacrificed everything material you own in exchange for greater power(called publications). They can be used for all sorts of special upgrades, and might even end up boosting your CPS if you know enough.\n\nSugar lumps(L) by far are the hardest to acquire, literally requiring luck in order to get some, but its powers of being able to outright boost your building's CPS by 10%, multiplicative! Rumor has it that it gets easier to acquire the more cookies you have.\n",
        fontSize: 15,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 10, 2, 10)
    }));
    if (cookie.value >= BF(500)) {
        ret.push(ui.createLabel({
            text: "Building Upgrades",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 10, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "In the permanent tab, you would find something like P1 = 1. These are upgrades that directly multiplies the CPS of a building by that amount(kinda like its power). It grows exponentially, like how the theory is supposed to be; but varying depending on what building P boosts. Later on they might grow even faster but I'll leave that up to you.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (cookieT.level > 0) {
        ret.push(ui.createLabel({
            text: "Milk and Flavors",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "In the main tab, there're 2 new upgrades that popped out: Milk and Cookie Flavor. Milk acts like a booster for having more achievements(the labors are all paid for by the felines). Cookie Flavor is exactly what it does, sprinkling more variance and flavor into your cookie empire which apparently makes more cookies for some reason.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (covenant.isAvailable) {
        ret.push(ui.createLabel({
            text: "Unique Upgrades",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "The Grandmother\'s Covenant is the first of the so-called \"Unique Upgrades\". They provide a massive boost to that building's CPS and potentially unlocks new strategies and game mechanics. In this case, the covenant boosts the grandma with P1, The total amount of buildings you own excluding grandmas,  mildly exponentiated as a bonus.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (terra.isAvailable) {
        ret.push(ui.createLabel({
            text: "Mass Terraforming",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Terraform Buff is unlocked when you have the Unique Upgrade for mines, it provides a short boost to your CPS(until it doesn't) through the magic of Logistic Function automatically ending this buff depending on your terraforming level. You'll have higher maximum boosts the more mines you own, along with the upgrade level itself.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (art.isAvailable) {
        ret.push(ui.createLabel({
            text: "Archaeology",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Archaeology is a new game mechanic revolving around exploring your very own temple in search for funny parts and upgrades that helps you later on. To find an artifact, a certain requirement must be completed(which I won't tell you!) through reading the clue for the next one by viewing the information on the Archaeology upgrade. Sometimes exploration might just not come back with upgrades, but something else...",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (SpellView.isAvailable) {
        ret.push(ui.createLabel({
            text: "Grimoire",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Grimoire allows you to cast spells through the tomes you had. It costs Sugar Lumps to cast a spell, and each spell can be casted once(until it doesn't) before needing to recharge. A spell is ready to be casted again when the level is set back to 0. Discover the effects of each spell yourself, that's the part of the surprise.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (excavate.isAvailable) {
        ret.push(ui.createLabel({
            text: "Elements",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Elements are a new thing that populated the world once you purchased the 12th artifact. There are 2 ways to get elements: Mining and Atomic Decay other heavier elements. You can mine elements by first establishing an excavation site for a certain elements, the first site doesn't use any element but later sites do. You can further the gain by improving the excavation efficiency. All progression related to elements persist between publishing. Elements can be used in a lot of permanent upgrades unlocked at the same time.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (acceleratorMenu.isAvailable) {
        ret.push(ui.createLabel({
            text: "Atomic Decay",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Atomic decaying elements are the most efficient way of obtaining elements. It allows for one heavy element to be decayed into smaller ones, including cookies. To begin: click on the \"Open Reactor Control Panel\" coming with the fist reactor to open the screen to set up the element for decay. In the menu, the cross button turns off the reactor, and the rest sets to whatever element it displays(If you don't have that the text won\'t change). You have to click confirm before the reactor would begin to decay that element.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    ret.push(ui.createLabel({
        text: "Check back later for more in-game information",
        fontSize: 15,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 15, 2, 15)
    }));
    return ret;
};
var InsPopup = ui.createPopup({
    title: "Instructions",
    content: ui.createStackLayout({
        children: [
            ui.createScrollView({
                heightRequest: 400,
                content: ui.createStackLayout({
                    children: [ui.createLabel({
                        text: "If you're seeing this then this theory borked",
                        fontSize: 18,
                        horizontalTextAlignment: TextAlignment.CENTER,
                        fontAttributes: FontAttributes.BOLD,
                        padding: Thickness(2, 15, 2, 15)
                    })]
                }),
            }),
            ui.createButton({
                text: "Close",
                onClicked: () => InsPopup.hide(),
            }),
        ],
    }),
});
//!1.2 : WHAT'S NEW
var getUpdateNotes = () => {
    let ret = [];
    ret.push(ui.createLabel({
        text: "Alpha Version 0.5.0 - Nuclear Elemental Physics",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t- ⚛ NEW MECHANIC : \"Elements\" AND \"Elemental Decay\", mine them at mines and decay them with antimatter condensers(don\'t ask how)! The Elements have come to your side, and it\'s your job to use them for you majestic cookie empire. \n\t- NEW BUILDINGS : FRACTAL ENGINES and JAVASCRIPT CONSOLES\n\t- ARTIFACTS : Who knows? Maybe you could use them i guess.\n\t- CUSTOMIZATION : Now the menu is truly up to your style! Get all the new and delicious colors by achieving enough and express your inner math with the new secondary equation for an experience that\'s truly YOURS\n\t- Balanced EVEN MORE things at every stage of the game progression until this point. \n\t- Achievements for all stages of the games.\n\t - All sorts of bugs, including the legendary one fixed \n\t Check back for more update notes.md as I gradually finish this update",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "Version 0.4.0 - Book of Spells",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t- 🧙‍♂️ Added a NEW unique upgrade : \"Grimoire\", available at your nearest temples! Cast spells to further your progression, build new strategy revolving them, or to get unlucky and [DATA EXPUNGED]. \n\t- UI OVERHAUL : Everything\'s changed! From the equation overlay to the brand NEW main menu. Explore a whole new dimension of interacting with the theory you love(hopefully so).\n\t- CHANCEMAKERS : Those things really do depend on luck. I mean, REALLY.\n\t- Balanced out a lot of things at every stage of the game progression until this point. Changed up some upgrades and adjusted P_i growth rate for some rowdy CPS and revolutionized milestone upgrades.\n\t- Added a whole lot of achievements and feats, go get them all. There\'s rewards for achieving them so get achieving.",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    return ret;
};
let whatsnewMenu = ui.createPopup({
    title: "What's New",
    isPeekable: true,
    content: ui.createStackLayout({
        children: [
            ui.createFrame({
                content: ui.createScrollView({
                    heightRequest: 350,
                    content: ui.createStackLayout({
                        children: getUpdateNotes(),
                    })
                })
            }),
            ui.createButton({
                text: "Close",
                onClicked: () => whatsnewMenu.hide()
            })
        ],
    })
});
//!1.3 : SECONDARY EQUATION + QUATERNARY
const eqName = ["Building CPS", "Building Power", "Milk", "Cookie Power", "Covenant", "Yggdrasil", "Mass Terraforming", "Recombobulators", "Time Dilation", "Elements", "Elemental Decay"];
const quName = ["Normal", "Elements"];
let quartButton = ui.createButton({
    text: `Quaternary Values\n${quName[quType]}`, row: 1, column: 1,
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () => {
        if ((artArt.level > 12) || (elements[0].value > 0)) {
            quType ^= 1;
            quartButton.text = `Quaternary Values\n${quName[quType]}`;
        } else {
            quType = 0;
        }
    }
});
//!1.4 : BUILDING DISPLAY
let binfoname = ["Normal", "Compressed", "Typw"];
let biButton = ui.createButton({
    text: `Building Display\n${binfoname[bInfo]}`, row: 1, column: 0,
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () => {
        if (sigmaCurseof.isUnlocked) {
            bInfo++;
            bInfo = bInfo % 3;
        } else {
            bInfo++;
            bInfo = bInfo % 2;
        }
        biButton.text = `Building Display\n${binfoname[bInfo]}`;
    }
});
//!1.5 : COLOR
const eqColor = ["FFFFFF", "E6DFCF", "A06846", "FFD4D8", "FE3246", "ABED6A", "EA8B01", "C48AE2", "F4E4BA", "FBF2D5", "AC6329", "E5BD46", "E71334", "E2DBD2", "83F2BC", "8F9098", "FF6D98", "AB5DF8", "F1398D", "50AB21", "00FFFF", "8800FF"];
const eqColorName = ["White", "Milk", "Chocolate", "Strawberry", "Raspberry", "Lime", "Pumpkin", "Blueberry", "Banana", "Vanilla", "Caramel", "Honey", "Cherry", "Coconut", "Mint", "Licorice", "Rose", "Blackcurrant", "Dragonfruit", "Black Forest", "Crystallized", "Pentallized"];
const eqColorAch = [0, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 85, 90, 100, 110, 120, 130, 140, 150, 194];
let visButton = ui.createButton({
    text: `Modify Visuals`, row: 0, column: 1,
    onClicked: () => {
        nexSec = eqType;
        nexCol = eqC;
        visualUI.content.children[2].text = `Chosen Equation : ${eqName[nexSec]}`;
        visualUI.content.children[5].text = `Chosen Color : ${eqColorName[nexCol]}`;
        visualUI.show();
    }
});
// complete image grid
let templateImage = {
    heightRequest: 91,
    source: ImageSource.ADD,
    aspect: Aspect.ASPECT_FIT,
    useTint: false
};
var nexCol = 0, nexSec = 0;
let templateFrame = {row: 0, column: 1, heightRequest: 91};
let completeSecGrid = [], completeColGrid = [];
let imagUpdate = () => {
    templateFrame.content = ui.createImage(templateImage);
    completeSecGrid.push(ui.createFrame(templateFrame));
    templateFrame.column += 1;
};
{
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052");// building cps
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/29/Heavenly_confectionery.png/revision/latest?cb=20160226201343");// building power
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/cd/Plain_milk.png/revision/latest?cb=20151230175349");// milk
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f1/Heavenly_cookies.png/revision/latest?cb=20180510065009");// cookie power
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/eb/One_mind.png/revision/latest?cb=20160220092603");// covenant
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/3/33/Keeper_of_the_conservatory.png/revision/latest?cb=20180416022615");// yggdrasil
    imagUpdate();
    templateFrame.row = 1;
    templateFrame.column = 1;
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/6f/CookieProduction39.png/revision/latest?cb=20200620182721");// terra
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/1/18/Chalcedhoney_factory.png/revision/latest?cb=20160213150047");// recom
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/0/06/Sugarmuck_time_machine.png/revision/latest?cb=20160213150709");// dilation
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/0/07/Plain_antimatter_condenser.png/revision/latest?cb=20160213150228");// elem
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/eb/Heavenly_chip.png/revision/latest?cb=20160226200959");// decay
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f4/Questionmark.png/revision/latest?cb=20200626021945");
    imagUpdate();
    for (let i = 0; i < 11; i++) {
        completeSecGrid[i].content.onTouched = (e) => {
            if (secondaryCheck(i)) {
                nexSec = i;
                indecide += 1;
                visualUI.content.children[2].text = `Chosen Equation : ${eqName[nexSec]}`;
            }
        };
    }
}
imagUpdate = () => {
    templateFrame.content = ui.createImage(templateImage);
    completeColGrid.push(ui.createFrame(templateFrame));
    templateFrame.column += 1;
};
{
    templateFrame = {row: 0, column: 1, heightRequest: 91};
    templateImage.source = ImageSource.MINUS;
    imagUpdate();// none
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/cd/Plain_milk.png/revision/latest?cb=20151230175349");
    imagUpdate();// milk
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/c1/Chocolate_milk.png/revision/latest?cb=20181024002025");
    imagUpdate();// chocolate
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/b/b8/Strawberry_milk.png/revision/latest?cb=20181024002158");
    imagUpdate();// strawberry
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/67/Raspberry_milk.png/revision/latest?cb=20181024002158");
    imagUpdate();// raspberry
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/a/a0/Lime_milk.png/revision/latest?cb=20181024002718");
    imagUpdate();// lime
    templateFrame.row += 1;
    templateFrame.column = 1;
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/4/40/Orange_milk.png/revision/latest?cb=20181024002718");
    imagUpdate();// pumpkin spice
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/0/04/Blueberry_milk.png/revision/latest?cb=20181024002025");
    imagUpdate();// blueberry
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/58/Banana_milk.png/revision/latest?cb=20181024002025");
    imagUpdate();// banana
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/26/Vanilla_milk.png/revision/latest?cb=20181024002158");
    imagUpdate();// vanilla
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/c5/Caramel_milk.png/revision/latest?cb=20181024002025");
    imagUpdate();// caramel
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/26/Honey_milk.png/revision/latest?cb=20181024002718");
    imagUpdate();// honey
    templateFrame.row += 1;
    templateFrame.column = 1;
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/c4/Cherry_milk.png/revision/latest?cb=20181024002025");
    imagUpdate();// cherry
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/3/38/Coconut_milk.png/revision/latest?cb=20181024002654");
    imagUpdate();// coconut
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/1/16/Mint_milk.png/revision/latest?cb=20190924042414");
    imagUpdate();// mint
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/9/96/Licorice_milk.png/revision/latest?cb=20200824174644");
    imagUpdate();// licorice
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/d/d4/Rose_milk.png/revision/latest?cb=20201030064717");
    imagUpdate();// rose
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/26/Blackcurrant_milk.png/revision/latest?cb=20211227060413");
    imagUpdate();// blackcurrant
    templateFrame.row += 1;
    templateFrame.column = 1;
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/ee/Dragonfruit_milk.png/revision/latest?cb=20201030074359");
    imagUpdate();// dragonfruit
    templateImage.source = ImageSource.fromUri("https://media.discordapp.net/attachments/572392960675545088/1031059256457306142/BlackForest_Milk.png");
    imagUpdate();// black forest
    templateImage.source = ImageSource.fromUri("https://media.discordapp.net/attachments/572392960675545088/1031059255454879855/Crystallized_Milk.png");
    imagUpdate();// crystallized
    templateImage.source = ImageSource.fromUri("https://media.discordapp.net/attachments/572392960675545088/1031059255991750706/Pentallized_Milk.png");
    imagUpdate();// pentallized
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f4/Questionmark.png/revision/latest?cb=20200626021945");
    imagUpdate();
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f4/Questionmark.png/revision/latest?cb=20200626021945");
    imagUpdate();// 2 ext milk flavors
    for (let i = 0; i < 22; i++) {
        completeColGrid[i].content.onTouched = (e) => {
            if (achCount >= eqColorAch[i]) {
                nexCol = i;
                indecide += 1;
                visualUI.content.children[6].text = `Chosen Color : ${eqColorName[nexCol]}`;
            }
        };
    }
}
let visualUI = ui.createPopup({
    title: "Visuals Editor",
    isPeekable: true,
    content: ui.createStackLayout({
        children: [
            ui.createLabel({
                text: "Secondary Equation",
                fontSize: 22,
                horizontalTextAlignment: TextAlignment.CENTER,
                fontAttributes: FontAttributes.BOLD
            }),
            ui.createScrollView({
                heightRequest: 250,
                children: [
                    ui.createGrid({
                        columnDefinitions: ["5*", "10*", "10*", "10*", "10*", "10*", "10*", "5*"],
                        rowSpacing: 8,
                        columnSpacing: 6,
                        padding: new Thickness(4, 4, 4, 4),
                        children: completeSecGrid
                    })
                ]
            }),
            ui.createLabel({
                horizontalTextAlignment: TextAlignment.CENTER,
                text: `Chosen Equation : ${eqName[nexSec]}`
            }),
            ui.createProgressBar({progress: 0}),
            ui.createLabel({
                text: "Equation Color",
                fontSize: 22,
                horizontalTextAlignment: TextAlignment.CENTER,
                fontAttributes: FontAttributes.BOLD
            }),
            ui.createScrollView({
                heightRequest: 250,
                children: [
                    ui.createGrid({
                        columnDefinitions: ["5*", "10*", "10*", "10*", "10*", "10*", "10*", "5*"],
                        rowSpacing: 8,
                        columnSpacing: 6,
                        padding: new Thickness(4, 4, 4, 4),
                        children: completeColGrid
                    })
                ]
            }),
            ui.createLabel({
                horizontalTextAlignment: TextAlignment.CENTER,
                text: `Chosen Color : ${eqColorName[nexCol]}`
            }),
            ui.createGrid({
                columnDefinitions: ["20*", "25*", "25*", "20*"],
                columnSpacing: 10,
                children: [
                    ui.createButton({
                        text: "Confirm", row: 0, column: 1,
                        fontSize: 18,
                        onClicked: () => {
                            if (eqC != nexCol) {
                                eqC = nexCol;
                                for (let i = 0; i < 9; i++) {
                                    quartList[i] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{_{${elemName[i]}}}`, elements[i].value));
                                }
                                quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{\\dot{C}}`, null));
                                quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
                                quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T}`, null));
                                quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_m}`, null));
                                quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
                                theory.invalidatePrimaryEquation();
                                theory.invalidateSecondaryEquation();
                            }
                            if (eqType != nexSec) {
                                eqType = nexSec;
                                theory.invalidateSecondaryEquation();
                            }
                            indecide = 0;
                            // theory.invalidateTertiaryEquation();
                            visualUI.hide();
                        }
                    }),
                    ui.createButton({
                        text: "Cancel", row: 0, column: 2,
                        fontSize: 18,
                        onClicked: () => {
                            indecide = 0;
                            visualUI.hide();
                        }
                    })
                ]
            })
        ]
    })
});
//!1.6 : PERKS
let calcCookieToPerk = (level) => {
    if (Number.isNaN(level)) {
        return calcCookieToPerk(0);
    }
    return BigP(10, 7.5 * (level + 1));
};
let perkLabel1 = ui.createLatexLabel({
    text: "You can forge your cookies into exponentium bars to exponentiate your buildings for faster cookie production here.\n\nEach bar you give to a building increases their exponent by 0.05",
    fontSize: 14,
    // padding: new Thickness(10,10,10,10),
    horizontalTextAlignment: TextAlignment.CENTER
});
let perkLabel2 = ui.createLatexLabel({
    text: `You have ${perkHas} exponentium bars`,
    fontSize: 14,
    // padding: new Thickness(1🍪,10,10,10),
    horizontalTextAlignment: TextAlignment.CENTER
});
let perkForgeButton = ui.createButton({
    text: `Forge another one (${calcCookieToPerk(perkPoint)} C)`,
    onClicked: () => {
        if (calcCookieToPerk(perkPoint) <= cookie.value) {
            cookie.value -= calcCookieToPerk(perkPoint);
            perkPoint++;
            perkHas++;
            perkForgeButton.text = `Forge another one (${calcCookieToPerk(perkPoint)} C)`;
            perkLabel2.text = `You have ${perkHas} exponentium bars`;
        }
    }
});
let perkAssign = (indx) => ui.createGrid({
    columnDefinitions: ["65*", "15*", "10*", "10*"],
    children: [
        ui.createLatexLabel({
            text: `B[${indx}] - ${buildingName[0 + Math.floor(bInfo / 2)][indx]}`, row: 0, column: 0,
            horizontalTextAlignment: TextAlignment.START,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: `${buiPerk[indx]} / ${(buiPerk[indx] < (indx == 2) ? 3 : 5)}`, row: 0, column: 1,
            horizontalTextAlignment: TextAlignment.CENTER,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createButton({
            text: `+`, row: 0, column: 2,
            onClicked: () => {
                if (perkHas > 0 && (buiPerk[indx] < maxbuiPerk(indx))) {
                    perkHas--;
                    buiPerk[indx]++;
                    perkLabel2.text = `You have ${perkHas} exponentium bars`;
                    perkMenu.content.children[3].children[0].children[indx].children[1].text = `${buiPerk[indx]} / ${maxbuiPerk(indx)}`;
                }
            }
        }),
        ui.createButton({
            text: `-`, row: 0, column: 3,
            onClicked: () => {
                if (buiPerk[indx] > 0) {
                    perkHas++;
                    buiPerk[indx]--;
                    perkLabel2.text = `You have ${perkHas} exponentium bars`;
                    perkMenu.content.children[3].children[0].children[indx].children[1].text = `${buiPerk[indx]} / ${maxbuiPerk(indx)}`;
                }
            }
        }),
    ]
});
let perkMenu = ui.createPopup({
    title: "Exponents",
    isPeekable: true,
    content: ui.createStackLayout({
        children: [
            perkLabel1,
            perkLabel2,
            perkForgeButton,
            ui.createScrollView({
                heightRequest: 400,
                children: [
                    ui.createStackLayout({
                        children: [
                            perkAssign(0),
                            perkAssign(1),
                            perkAssign(2),
                            perkAssign(3),
                            perkAssign(4),
                            perkAssign(5),
                            perkAssign(6),
                            perkAssign(7),
                            perkAssign(8),
                            perkAssign(9),
                            perkAssign(10),
                            perkAssign(11),
                            perkAssign(12),
                            perkAssign(13),
                            perkAssign(14),
                            perkAssign(15),
                            perkAssign(16),
                            perkAssign(17),
                            perkAssign(18)
                        ]
                    })
                ]
            })
        ]
    })
});
//!1.7 : SUBGAMES
let subPopup = ui.createPopup({
    title: "Subgames",
    isPeekable: true,
    content: ui.createLatexLabel({
        text: "\n\n\n\nComing Soon!\n\n\n\n\n\n",
        fontSize: 14,
        horizontalTextAlignment: TextAlignment.CENTER,
        verticalTextAlignment: TextAlignment.CENTER,
    })
});

//!1.8 : REACTOR CONTROL
function reactorChk(indx) {
    if (accelerator.level > indx) {
        reactorInterim = indx;
        reactorMenu.content.children[2].text = `Current Element : ${(reactorInterim > -1) ? elemFormalName[reactorInterim + 2] : "OFF"}`;
    } else {
        reactorInterim = reactorMode;
    }
};
let dummyImage = {
    heightRequest: 91,
    onTouched: (e) => reactorChk(-1),
    source: ImageSource.CLOSE,
    useTint: false
};
let dummyFrame = {row: 0, column: 0, heightRequest: 91};
let dummyGrid = [];
let dummyGridUpdate = () => {
    dummyFrame.content = ui.createImage(dummyImage);
    dummyGrid.push(ui.createFrame(dummyFrame));
    dummyFrame.column += 1;
};
{
    dummyGridUpdate();
    dummyImage.aspect = Aspect.ASPECT_FIT;
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/50/Buttergold_antimatter_condenser.png/revision/latest?cb=20160213145828");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/1/1b/Sugarmuck_antimatter_condenser.png/revision/latest?cb=20160213150649");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f5/Jetmint_antimatter_condenser.png/revision/latest?cb=20160213145241");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/0/0e/Cherrysilver_antimatter_condenser.png/revision/latest?cb=20160213150923");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/ff/Hazelrald_antimatter_condenser.png/revision/latest?cb=20220322001733");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f0/Mooncandy_antimatter_condenser.png/revision/latest?cb=20180411060228");
    dummyGridUpdate();
    dummyImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/9/9a/Astrofudge_antimatter_condenser.png/revision/latest?cb=20180808112310");
    dummyGridUpdate();
    for (let i = 1; i < 8; i++) {
        dummyGrid[i].content.onTouched = (e) => reactorChk(i - 1);
    }
}
let reactorMenu = ui.createPopup({
    title: "Reactor Control Center",
    isPeekable: true,
    content: ui.createStackLayout({
        children: [
            ui.createLatexLabel({
                text: "Set the mode for the reactor to decay what element",
                fontSize: 12,
                horizontalTextAlignment: TextAlignment.CENTER,
            }),
            ui.createGrid({
                columnDefinitions: ["10*", "10*", "10*", "10*", "10*", "10*", "10*", "10*"],
                rowSpacing: 4,
                columnSpacing: 6,
                padding: new Thickness(4, 25, 4, 4),
                children: dummyGrid
            }),
            ui.createLatexLabel({
                text: "Current Element : Not Selected",
                fontSize: 12,
                horizontalTextAlignment: TextAlignment.CENTER,
                margin: new Thickness(4, 5, 4, 25)
            }),
            ui.createButton({
                text: "Confirm",
                onClicked: () => {
                    reactorMode = reactorInterim;
                    theory.invalidateSecondaryEquation();
                    reactorMenu.hide();
                }
            })
        ]
    })
});
//!1.9 : MAIN MENU
let popup = ui.createPopup({
    title: "Main Menu",
    isPeekable: true,
    content: ui.createStackLayout({
        children: [
            ui.createGrid({
                columnDefinitions: ["50*", "50*"],
                rowSpacing: 8,
                children: [
                    ui.createButton({
                        text: "Instructions", row: 0, column: 0,
                        onClicked: () => {
                            InsPopup.content.children[0].content.children = getHelpText();
                            InsPopup.show();
                        },
                    }),
                    ui.createButton({
                        text: "Exponents", row: 0, column: 1,
                        onClicked: () => {
                            perkForgeButton.text = `Forge another one (${calcCookieToPerk(perkPoint)} C)`;
                            perkLabel2.text = `You have ${perkHas} exponentium bars`;
                            perkMenu.show();
                        }
                    }),
                    ui.createButton({
                        text: "Subgames", row: 1, column: 0,
                        onClicked: () => {
                            subPopup.show();
                        }
                    }),
                    ui.createButton({
                        text: "What\'s New", row: 1, column: 1,
                        onClicked: () => {
                            whatsnewMenu.show();
                        }
                    }),
                ]
            }),
            ui.createProgressBar({progress: 0}),
            ui.createGrid({
                columnDefinitions: ["50*", "50*"],
                rowSpacing: 8,
                children: [
                    ui.createButton({text: "Visualizer Type\nNormal", row: 0, column: 0}),
                    biButton,
                    visButton,
                    quartButton,
                ]
            }),
            ui.createProgressBar({progress: 0}),
            ui.createLabel({
                horizontalTextAlignment: TextAlignment.CENTER,
                fontSize: 15,
                padding: new Thickness(10, 10, 0, 0),
                text: "Cookie Idler - bf00adb\nv0.5.0a"
            })
        ]
    })
});
//!1.10 : OVERLAY
// ellipsis you're so epic for contributing to getEquationOverlay() function
var getEquationOverlay = () =>
    ui.createStackLayout({
        children: [
            ui.createImage({
                source: ImageSource.INFO,
                horizontalOptions: LayoutOptions.START,
                verticalOptions: LayoutOptions.END,
                heightRequest: 25,
                margin: new Thickness(9, 9, 0, 0),
                onTouched: (e) => {
                    if (e.type == TouchType.SHORTPRESS_RELEASED) {
                        popup.show();
                    }
                },
            }),
            ui.createLatexLabel({
                text: "Menu",
                fontSize: 10,
                padding: new Thickness(9, 4, 0, 0),
            }),
            terra.level > 0
                ? ui.createImage({
                    source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/6f/CookieProduction39.png/revision/latest?cb=20200620182721"),
                    horizontalOptions: LayoutOptions.START,
                    verticalOptions: LayoutOptions.END,
                    aspect: Aspect.ASPECT_FIT,
                    heightRequest: 30,
                    useTint: false,
                    margin: new Thickness(9, 0, 0, 0),
                    onTouched: (e) => {
                        if (e.type == TouchType.SHORTPRESS_RELEASED) {
                            log("Boost!");
                            xBegin = thyme.level;
                            calcCPS();
                        }
                    },
                })
                : ui.createImage({
                    source: ImageSource.LOCK,
                    horizontalOptions: LayoutOptions.START,
                    verticalOptions: LayoutOptions.END,
                    heightRequest: 25,
                    margin: new Thickness(9, 9, 0, 0),
                }),
            terra.level > 0
                ? ui.createLatexLabel({
                    text: "Terraform Buff",
                    fontSize: 10,
                    padding: new Thickness(9, 9, 0, 0),
                })
                : ui.createLatexLabel({
                    text: "Locked",
                    fontSize: 10,
                    padding: new Thickness(9, 9, 0, 0),
                }),
        ],
    });


init();