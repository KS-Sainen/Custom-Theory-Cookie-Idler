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
import { Color } from "../api/ui/properties/Color";
// Hello to the person reading this "code"
// Spoilers alert for ALL of the upgrades, buildings and achievements
// Before leaving, please try and find any bugs or bad JS coding practices for me

// Some parameters
// If you're wondering why the refund button doesn't appear, please refer to line 646 and you would know something's up

var id = "CookieIdler2";
var name = "Cookie Idler";
var description =
    "🍪👵🍪\nA game within a theory involving baking a copius amounts of cookies in exchange for something far greater...\n🍪👵🍪\n\n🍪==FEATURES==🍪\n🍪 Click, Bake, Farm, Produce your way into the big leagues. With 19 buildings to buy, empower, and upgrade.\n🍪 Experience a whole new level of text richness in theories like never before. Boatloads of text waiting to be read in all aspects, from the buildings, achievements, all the way to upgrades(nerdy mode included).\n🍪 Unique upgrades and intresting game mechanics will involve you to no end! Tasty Cookies, even tastier cookies, breaking the fourth wall, and changing the game itself.\n🍪Absolute lack of big and scary mathematics, rated E for Everyone\n\n🍪==CREDITS==🍪\n🍪 Orteil for bringing such a legendary game idea to life\n🍪 ellipsis for suggesting ideas for the UI\n🍪 skyhigh173 for reformatting the code so it looks better\nspqcey(randomname#9373) for proofreading and fixing a majority of the text\n🍪 Lava for fixing the legendary bug\n🍪 a_spiralist for contributions to the redux version";
var authors = "Sainen Lv.420 #2684";

/*
 Big thinks to these people!
 ellipsis
 sky
 spqcey
 Lava#3374
 Frozen Moon#7244 (alex)
 elkshadow5#7952
 a_spiralist

 feel free to add more into the list.
 */
var version = 1.0;

//! Function Name Reductions
{
    /**
     * Returns the BigNumber equivalent of any of the following arguments. Functionally IDENTICAL to BigNumber.from()
     * @param {number|string|BigNumber} i
     * @return {BigNumber} The BigNumber from the given input i
     */
    var BF = (i) => BigNumber.from(i);

    /**
     * Returns the value of i^p, identical to Math.pow(i,p)
     * @param {number} i The base
     * @param {number} p The exponent
     * @return {number} The value of i^p
     */
    var MP = (i, p) => Math.pow(i, p);

    /**
     * Returns the 2nd logarithm of the given number, identical to Math.log2(i)
     * @param {number} i The given number
     * @return {number} The 2nd logarithm of the given number
     */
    var ML2 = (i) => Math.log2(i);

    /**
     * Returns the 10th logarithm of the given number, identical to Math.log2(i)
     * @param {number} i The given number
     * @return {number} The 10th logarithm of the given number
     */
    var ML10 = (i) => Math.log10(i);

    /**
     * Returns a random number within the range of [0,1]
     * @param void
     * @return {number} A random number within the range of [0,1]
     */
    var MR = () => Math.random();

    /**
     * Identical to Math.pow(i,p) but for big numbers; also automatically converts any valid BigNumber inputted
     * @param {number|string|BigNumber} i The base
     * @param {number} p The exponent
     * @return {BigNumber} The value of i^p
     */
    var BigP = (i, p) => {
        //if(Number.isNaN(p) || Number.isNaN(i)) return 1;
        return BF(i).pow(p);
    }

    /**
     * Gives the equivalent cookies compared to i minutes of your CPS
     * @param {number|string|BigNumber} i The number used
     * @return {BigNumber} The value of log10(i)
     */
    var BigL10 = (i) => BF(i).log10();

    /**
     * Identical to Math.i) but for big numbers; also automatically converts any valid BigNumber inputted
     * @param {number|string|BigNumber} i The number used
     * @return {BigNumber} The value of log2(i)
     */
    var BigL2 = (i) => BF(i).log2();

    /**
     * Converts the given valid BigNumber string into a string without any decimal places
     * @param {number|string|BigNumber} i The BigNumber used
     * @return {string} The string without any decimal places
     */
    var BigTS = (i) => BF(i).toString(0);

    /**
     * Returns the higher value of the BigNumber given
     * @param {number|string|BigNumber} i The BigNumber used
     * @param {number|string|BigNumber} j The BigNumber used
     * @return {BigNumber} The higher BigNumber
     */
    var BigMax = (i, j) => BF(i).max(j);

    /**
     * Returns the higher value of the BigNumber given
     * @param {number|string|BigNumber} i, The BigNumber used
     * @param {number|string|BigNumber} j The BigNumber used
     * @return {BigNumber} The lower BigNumber
     */
    var BigMin = (i, j) => BF(i).min(j);

    /**
     * Converts a given number to a string
     * @param {number} i The number used
     * @return {string} The string representation of the number
     */
    var TS10 = (i) => i.toString(10);

    /**
     * Returns a random integer in the range of [0,i]
     * @param {number} i
     * @return {number} A random integer in the range of [0,i]
     */
    var RandI = (i) => Math.floor(MR() * i);

    /**
     * Returns a random number in the range of [s,e] where s >= e
     * @param {number} s The maximum number
     * @param {number} e The minimum number
     * @return {number} A random number in the range of [s,e]
     */
    var RandR = (s, e) => e + MR() * (s - e);

    /**
     * @desc Binary searches through an array arr to the desired number f
     * @param {array} arr, must be sorted from maximum to minimum
     * @param {number} f, value to search for
     * @returns {number} the index where the next element is less than, -1 if it's beyond the end of the array
     */
    var bsearch = (arr, f) => {
        if (f >= arr[0]) {
            return 0;
        }
        if (f < arr[arr.length - 1]) {
            return -1;
        }
        let l = 0,
            r = arr.length - 1;
        let mid = 0;
        while (l < r) {
            mid = (l + r) >> 1;
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
}
//COLORS SESAME
function decimalToColHex(d) {
    var hex = Number(d).toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex.toUpperCase();
}
var colorize = (latexStr,r,g,b) => {
    return `\\color{#${decimalToColHex(r)}${decimalToColHex(g)}${decimalToColHex(b)}}{${latexStr}}`;
};
var colorizeHex = (latexStr,colorStr) => {
    return `\\color{#${colorStr}}{${latexStr}}`;
};
//Upgrades
/**
 * Returns a permanent/normal upgrade object from the arguments given.
 * @param {number} id, The ID of the upgrade, must be unique.
 * @param {currency} cur, The currency for the cost of the upgrade.
 * @param {function} costModel, The function that returns the cost of the upgrade. Must return BigNumber
 * @param {function} desc, The function that returns the description(the name) of the upgrade. The function MUST return a string
 * @param {function} info, The function that returns the info of the upgrade. The function MUST return a string
 * @returns {PermanentUpgrade} The permanent upgrade from the given arguments.
 */
function shortPermaUpgrade(id, cur, costModel, desc, info) {
    var up = theory.createPermanentUpgrade(id, cur, costModel);
    up.getDescription = (_) => desc;
    up.getInfo = (amount) => info;
    return up;
}
var baseHeavenlyUpgradeID = 1000000;
function shortPermaUpgradeObj(permanentUpgradeObject,cur){
    let ret = shortPermaUpgrade(baseHeavenlyUpgradeID + permanentUpgradeObject.uid,cur,permanentUpgradeObject.costModel,permanentUpgradeObject.name,permanentUpgradeObject.info);
    if(permanentUpgradeObject.maxLevel > 0){
        ret.maxLevel = permanentUpgradeObject.maxLevel;
    }
    ret.bought = permanentUpgradeObject.onBought;
    //log(`ID:${baseHeavenlyUpgradeID + permanentUpgradeObject.uid} ${permanentUpgradeObject.name}`);
    return ret;
}
function shortUpgrade(id, cur, costModel, desc, info) {
    var up = theory.createUpgrade(id, cur, costModel);
    up.getDescription = (_) => desc;
    up.getInfo = (amount) => info;
    return up;
}

/**
 * Returns a permanent upgrade object from the arguments given a specified maxLevel.
 * @param {number} maxLevel, The maximum level of the upgrade.
 */
function shortPermaUpgradeML(id, cur, costModel, desc, info, maxLevel) {
    var up = shortPermaUpgrade(id, cur, costModel, desc, info);
    up.maxLevel = maxLevel;
    return up;
}
function shortUpgradeML(id, cur, costModel, desc, info, maxLevel) {
    var up = shortUpgrade(id, cur, costModel, desc, info);
    up.maxLevel = maxLevel;
    return up;
}
function gimmickUpgrade(gimmickUpgradeObject){
    var cur = COOKIE;
    if(gimmickUpgradeObject.currency == 1){cur = HEAVENLY_CHIP;}
    if(gimmickUpgradeObject.currency == 2){cur = SUGAR_LUMP;}
    var ret = shortUpgradeML(gimmickUpgradeObject.uid,cur,gimmickUpgradeObject.costModel,gimmickUpgradeObject.name,gimmickUpgradeObject.info,gimmickUpgradeObject.maxLevel);
    ret.bought = gimmickUpgradeObject.onBought;
    return ret;
}
function gimmickPermUpgrade(gimmickUpgradeObject,currency){
    var cur = currency;
    var ret = shortPermaUpgradeML(gimmickUpgradeObject.uid,cur,gimmickUpgradeObject.costModel,gimmickUpgradeObject.name,gimmickUpgradeObject.info,gimmickUpgradeObject.maxLevel);
    ret.bought = gimmickUpgradeObject.onBought;
    return ret;
}
//an upgrade that exists else everything crashes
function throwawayUpgrade(id, desc, info){
    var ret = shortUpgrade(id, COOKIE, new ConstantCost(BF("1e1000")), desc, info);
    ret.isAvailable = false;
    return ret;
}

//! CLASSES - (And thus begins the spoilers)
// States (And thus begins the spoilers)
// beeg table
class internalState {
    width = 12;
    height = 12;
    //the table is ENTIRELY in BigNumber form, so refer to it in calculations as you please
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.table = new Array(width * height).fill(0);
    }
    buildTable(res) {
        //table = res;
        for (let i = 0; i < (this.width * this.height); i++) {
            this.table[i] += BF(res[i]);
        }
    }
    getStateString() {
        let ret = "";
        for (let i = 0; i < (this.width * this.height); i++) {
            ret += `${this.table[i]} `;
        }
        return ret;
    }
    getVal(r, c) {
        return this.table[(r*this.width + c)];
    }
    setVal(r, c, v) {
        this.table[(r*this.width + c)] = BF(v);
    }
    getValIndex(indx) {
        return this.table[indx];
    }
}
var stateTable = new internalState(12,12);
var updateTable = (r, c, v) =>{
    //log(`Update [${r}][${c}] = ${v}`);
    stateTable.setVal(r,c,v);
}
var getValueFromTable = (r,c) => stateTable.getVal(r,c);
// Template class for state variables
class ISV {
    constructor(val, r, c) {
        this.value = BF(val);
        this.rindx = r;
        this.cindx = c;
    }
    getValue() {
        return this.value;
    }
    readValue(){
        this.value = getValueFromTable(this.rindx,this.cindx)
    }
    setValue(val) {
        this.value = val;
        updateTable(this.rindx, this.cindx, this.value);
    }
}
//the variables - block 0 - MAIN
{
    var CPSstore = new ISV(0, 0, 0),
        HPSstore = new ISV(0, 0, 1),
        LPSstore = BF(0);
    var CPS = BF(0);
    var achCountStore = new ISV(0, 0, 2);
    var lumpTotal = new ISV(0, 0, 3);
    var artUnlock = new ISV(0, 0, 4);
    var reactorModeStore = new ISV(0, 0, 5),
        reactorInterim;
    var perkPoint = new ISV(0, 0, 6);
    var heavVis = new ISV(0, 0, 7);
    var bInfoStore = new ISV(0, 0, 8);
    var dominatestore = new ISV(0, 0, 9);
    var maxBuildStore = new ISV(0, 0, 10);//maximum building
    var totalSpellStore = new ISV(0, 0, 11);
    // block 5 - VIZ
    var eqTypeStore = new ISV(0, 7, 0),
        quTypeStore = new ISV(0, 7, 1);
    var vizTypeStore = new ISV(0, 7, 2);
    var eqCStore = new ISV(0, 7, 3);
    var perkHas;
    //let time = ISV(0,0,0); // degrees
}
var dominate = 0, eqC = 0, quType = 0, eqType = 0, achCount = 0, bInfo = 0, maxBuild = 0, reactorMode = 0, totalSpell = 0, vizType = 0;

//internal state work
{
    /**
     * @desc Serializes the state of the theory
     * @returns {string} The internal state of the array, compatible with setInternalState()
     */
    var getInternalState = () => {
        return stateTable.getStateString();
    }
    var setInternalState = (state) => {
        let res = state.split(" ");
        stateTable.buildTable(res);
        //assign!
        CPSstore.readValue();HPSstore.readValue();totalSpellStore.readValue();
        achCountStore.readValue();lumpTotal.readValue();artUnlock.readValue();reactorModeStore.readValue();perkPoint.readValue();heavVis.readValue();
        bInfoStore.readValue();dominatestore.readValue();eqTypeStore.readValue();quTypeStore.readValue();vizTypeStore.readValue();eqCStore.readValue();maxBuildStore.readValue();
        CPS = BF(CPSstore.value);
        vizType = Math.floor(vizTypeStore.value);if(Number.isNaN(vizType)){vizType = 0;}
        dominate = Math.floor(dominatestore.value);if(Number.isNaN(dominate)){dominate = 0;}
        perkHas = Math.floor(perkPoint.value);if(Number.isNaN(perkHas)){perkHas = 0;}
        achCount = Math.floor(achCountStore.value);if(Number.isNaN(achCount)){achCount = 0;}
        eqC = Math.floor(eqCStore.value);if(Number.isNaN(eqC)){eqC = 0;}
        eqType = Math.floor(eqTypeStore.value);if(Number.isNaN(eqType)){eqType = 0;}
        quType = Math.floor(quTypeStore.value);if(Number.isNaN(quType)){quType = 0;}
        bInfo = Math.floor(bInfoStore.value);if(Number.isNaN(bInfo)){bInfo = 0;}
        maxBuild = Math.floor(maxBuildStore.value);if(Number.isNaN(maxBuild)){maxBuild = 0;}
        reactorMode = Math.floor(reactorModeStore.value);if(Number.isNaN(reactorMode)){reactorMode = 0;}
        totalSpell = Math.floor(totalSpellStore.value);if(Number.isNaN(totalSpell)){totalSpell = 0;}
        log("Read the data!");
    }
}

//! Buildings INFO + GIMMICKS
var buildingPriceMult = ML2(1.15);
var building50 = BigP(BigP(2,buildingPriceMult),50);
var buildingExponentMod = 0.05, defaultSweetLim = 1;
//upgrade variables
var covenant, ygg, terra, excavate, moreExcavator, recom, invest, investRespec, investHelp = new Array(19), archaeology, artArt, templeReset, artifactPouch, cookiearium, aquaCrust, timeDilate;
//exponents
var buildingExponent = new Array(19), buildingExponentRemove = new Array(19), exponentium, modeExponentium;

//the funni
//achName : 100, 1000, 5000, 10000, lump 100
// normal, hacker, chaos
var buildingData = [
    {id: 0,
     names: ["Cursor","Curseof","CLICKER","L1CK3R","CLICKER","L1CK3R"], desc: "clicking ", lumpBName: "Extra Finger",
     baseCPS: 7, baseCost: 11, powerUpgradeMult: 250, mult: 1, collectionTime : 10,maxExpLevel: 5, sweetLimit: 5, sweetMax: 150,
     achName: ["Mouse Wheel","Clicktopia","Thumbs, Phalanges, Metacarpals","Hands of fate lays bare their click upon thou","A hand and them a some more"]
    },
    {id: 1,
     names: ["Grandma","Gradnma","GRANDMAHACKER","GRADNMAAPOCALYPSE","GRANDMAHACKER","GRADNMAAPOCALYPSE"], desc: "backing ", lumpBName: "Anti-Aging Cream",
     baseCPS: 310, baseCost: 1000, powerUpgradeMult: 3.5, mult: 1, collectionTime : 10,maxExpLevel: 5, sweetLimit: 10, sweetMax: 350,
     achName: ["Retirement Club","Tootsie Roll Machine","Ruler of the Ancients","Shrivel, today we rise","Just like babies, but much more weird and terrifying"],
     gimmicks: [{
        uid: 10001,
        name: "Grandmother's Covenant $(C_{v})$",
        info: "Synergyzing Grandmas together to boost their CPS depending on the buildings owned",
        costModel: new ExponentialCost(1e65, ML2(1e35)),
        maxLevel: 2,
        onBought: (amount) => {updateGlobalMult();updateLocalMult(1);}
     }]},
    {id: 2,
     names: ["Farm","Famr","GROWER","NATURE","GROWER","NATURE"], desc: "growing ", lumpBName: "Electrolytes and Acres",
     baseCPS: 5.3e4, baseCost: 1.1e5, powerUpgradeMult: 40, mult: 1, collectionTime : 15,maxExpLevel: 5, sweetLimit: 15, sweetMax: 125,
     achName: ["Home Organic","100% Sustainable","Green Pasture lays live","Babylonian Conservatorium sits on the hill","Farmer\'s Heaven"],
     gimmicks: [{
        uid: 10002,
        name: "Yggdrasil $(Y_{g})$",
        info: "Empower your farms with the power of time and cookie ancients",
        costModel: new ExponentialCost(1e115, ML2(1e25)),
        maxLevel: 4,
        onBought: (amount) => {updateGlobalMult();updateLocalMult(2);}
     }]},
    {id: 3,
     names: ["Mine","Mein","EXTRACTOR","EXCAVATE?","EXTRACTOR","EXCAVATE?"], desc: "mining ", lumpBName: "Drilling Overclock",
     baseCPS: 7.4e7, baseCost: 1.2e8, powerUpgradeMult: 125, mult: 1, collectionTime : 15,maxExpLevel: 5, sweetLimit: 25, sweetMax: 350,
     achName: ["Stop! Drilling Time!","Break the core","Dysonian Society","Breaking through omnirealitimetaplanes","r/drillingmasterrace"],
     gimmicks: [{
        uid: 10003,
        name: "Mass Terraforming $(T_{r})$",
        info: "Unlocks/Improves a buff that temporarily boosts your CPS by a lot",
        costModel: new CompositeCost(20, new ExponentialCost(1e130, ML2(1e10)), new ExponentialCost(BF("1e695"), ML2(10))),
        maxLevel: 50,
        onBought: (amount) => {updateMaxL();getEquationOverlay();updateTerraOverlay();}
     }]},
    {id: 4,
     names: ["Factory","Fcotyr","INDUSTRY","ENSLAVEMENT","INDUSTRY","ENSLAVEMENT"], desc: "mass producing ", lumpBName: "Patent Publishing",
     baseCPS: 4.05e10, baseCost: 1.3e12, powerUpgradeMult: 59, mult: 1, collectionTime : 20,maxExpLevel: 5, sweetLimit: 25, sweetMax: 200,
     achName: ["Industrial Act","Age of Internet","Automatal Hysteria","The perfect game of Factorio","Overengineering Achieved"],
     gimmicks: [{
        uid: 10004,
        name: "Recombobulators $(R_{e})$",
        info: "Produces a constant stream of all currencies! What a dream!",
        costModel: new ExponentialCost(1e170, ML2(1e5)),
        maxLevel: 50,
        onBought: (amount) => {updateLocalMult(4);}
     }]},
    {id: 5,
     names: ["Bank","Bkan","GREED UNIT","TRAP","GREED UNIT","TRAP"], desc: "interesting ", lumpBName: "Increase Interest Rates",
     baseCPS: 1.4e12, baseCost: 1.4e18, powerUpgradeMult: 35, mult: 1, collectionTime : 20,maxExpLevel: 5, sweetLimit: 25, sweetMax: 350,
     achName: ["Pretty Penny Pinchers","Keynesian Cookinomics","New Neohyperglobalization Order","Money is just a human construct","Hypermetaflation"],
     gimmicks: [{
        uid: 10005,
        name: "Investment Openings $(I_{o})$",
        info: "Open your very own investments forms. Grants 5 buildings of random type and a flat 1.01 CPS boost!(chance of failure included)",
        costModel: new ExponentialCost(1e200, ML2(1.05)),
        maxLevel: 1000,
        onBought: (amount) => {
            for(let i=0;i<amount;i++){
                let res = Math.random() * (25 + (invest.level/250));
                res = Math.floor(res);
                //log(`You win ${res}`);
                if(res < 19){
                    if(building[res].level != 0){
                        if(CHAOS_STAGE.level > 0){
                            investHelp[res].level += 4;
                        }else{
                            investHelp[res].level += 5+ConjureBuild.level+Math.floor(butterBar.level/2);
                        }
                        stonkFlag |= investHelp[res].level >= 200;
                        megaStonkFlag |= investHelp[res].level >= 1000;
                    }
                }
            }
        }},
        {
        uid: 10006,
        name: "Investment Openings Reset",
        info: "Allows you to reset the buildings gained from Investment Openings, however there\'ll be no refunds to cookies spent",
        costModel: new ConstantCost(1000), currency: 2,
        maxLevel: 1,
        onBought: (amount) =>{
            invest.level = 0;
            for(let i=0;i<19;i++){
                investHelp[i].level = 0;
            }
            investRespec.level = 0;
        }
     }]},
    {id: 6,
     names: ["Temple","Tmelpe","MEMORIES","MEM01RS","MEMORIES","MEM01RS"], desc: "directing in ", lumpBName: "Sacred Chocolate Artifact",
     baseCPS: 1.18e18, baseCost: 2e25, powerUpgradeMult: 8, mult: 1, collectionTime : 25,maxExpLevel: 5, sweetLimit: 50, sweetMax: 350,
     achName: ["Way of the Temple","Balance of Faith","The Lord\'s Likeliness","Caricature of the forgotten Deities","Chief Artifact Curator"],
     gimmicks: [{
        uid: 10007,
        name: "Archaeology $(A_{r})$",
        info: "Go into your own temples to discover secrets lost to mankind",
        costModel: new ExponentialCost(1e252, ML2(2)),
        maxLevel: 1000,
        onBought: (amount) => {
            amount = Math.min(amount,500);
            for(let i=0;i<amount;i++){
                rollLoot();
                checkArtifactUnlock();
            }
        }
     },{
        uid: 10008,
        name: "Templar Resetti",
        info: "An boring switch lying in a boring room, yet the archaeologists won\'t stop telling you how significant this switch is",
        costModel: new LinearCost(10000,10000), currency: 2,
        maxLevel: 50,
        onBought: (amount) => {
            archaeology.level = 0;
        }
     },{
        uid: 10009,
        name: "Artifact Pouch",
        info: "View the list of artifacts",
        costModel: new FreeCost(),
        maxLevel: 2,
        onBought: (amount) => {
            if(artifactPouch.level > 1){
                artifactPouch.level = 0;
            }
        }
     }]
    },
    {id: 7,
     names: ["Wizard Tower","Wixaradf Trower","REALITY BENDERS","REA3L10TY 3B3ND3RS","REALITY BENDERS","REA3L10TY 3B3ND3RS"], desc: "spawning in ", lumpBName: "Syllables",
     baseCPS: 9.16e22, baseCost: 3.3e50, powerUpgradeMult: 17, mult: 1, collectionTime : 25,maxExpLevel: 5, sweetLimit: 100, sweetMax: 350,
     achName: ["Bewitched","Alakazamd","Shaspie Colupis","Cookiera Avadra Creamdera","Hours to pronounce, effects very pronounced"],
     gimmicks: [{
        uid: 10010,
        name: "Toggle Grimoire",
        info: "View the list of unlocked spells",
        costModel: new FreeCost(),
        maxLevel: 2,
        onBought: (amount) => {
            if(SpellView.level > 1){
                SpellView.level = 0;
            }
        }
     }]
    },
    {id: 8,
     names: ["Shipment","Shipemtn","SPACE EXPLORATION","FRACK1NG UN1VERSE","SPACE EXPLORATION","FRACK1NG UN1VERSE"], desc: "bringing in ", lumpBName: "Cosmic Exploration",
     baseCPS: 9e32, baseCost: 5.1e75, powerUpgradeMult: 25, mult: 1, collectionTime : 30,maxExpLevel: 5, sweetLimit: 125, sweetMax: 350,
     achName: ["Local Expedition","Cosmic Mapping","Multiverse Ramble","Omniverse Realization","You could make a chronicle out of those"],
    },
    {id: 9,
     names: ["Alchemy Lab","Alehfcehy Lba","CONVERTOR","ACCELERANT","CONVERTOR","ACCELERANT"], desc: "transmuting ", lumpBName: "New Esoteric Elements", sweetLimit: 150, sweetMax: 350,
     baseCPS: 1.15e43, baseCost: 7.5e100, powerUpgradeMult: 23, mult: 1, collectionTime : 30,maxExpLevel: 5,
     achName: ["Transmutation","Polytranselementation","With matter comes Cookies","Satiated in the gaudy mouths of Gold","Truly a Mendeleev's Nightmare"],
    },
    {id: 10,
     names: ["Portal","Proalt","THE ANCIENT ONES","3HT NADN3C3T 0N3S","THE ANCIENT ONES","3HT NADN3C3T 0N3S"], desc: "retrieving ", lumpBName: "Normalize Dimension",
     baseCPS: 6.66e50, baseCost: BF("1e125"), powerUpgradeMult: 21, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 200, sweetMax: 350,
     achName: ["Isekai\'d","H̶e̷ ̶C̶o̴m̵e̸s̵","I̸͕̽n̷̰͊ ̸͖̔ṭ̵͐h̶̺̓e̴̫͋ ̶͓͂e̸͔͘y̸̝͋e̵͓̚s̸̫̒ ̶̰̕ò̸̜f̶͖̕ ̶̻͒t̷̥͆ĥ̶̳é̵̗ ̷̦̉b̴̡̽e̶͚̿h̴̙̋o̸̩͝l̴̘͆d̷̠͠è̶͍ř̴͎","Bottom of the abyss","Is this reality or is it cookieverse?"],
    },
    {id: 11,
     names: ["Time Machine","Tie Macine","LOCUS","L0-CU5","LOCUS","L0-CU5"], desc: "preventing cookies from being eaten by ", lumpBName: "Paradox Resolve",
     baseCPS: BF("2.045e58"), baseCost: BF("7.5e150"), powerUpgradeMult: 20, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 225, sweetMax: 350,
     achName: ["Thyme Wrap","Thyme Pararegano","Thyme Sagaporal Nutmegstant","Out of past, Out of future","No more Thyme Pararegano"],
    },
    {id: 12,
     names: ["Antimatter Condenser","Antimatter Condenstor","LARGE COOKIE COLLIDER","TINY MUFFIN SMASHER","LARGE COOKIE COLLIDER","TINY MUFFIN SMASHER"], desc: "synthesizing ", lumpBName: "Derived Elementary Flavor",
     baseCPS: BF("9.15e71"), baseCost: BF("1.7e185"), powerUpgradeMult: 15, mult: 1, collectionTime : 40,maxExpLevel: 5, sweetLimit: 250, sweetMax: 200,
     achName: ["When does it matter?","New Standard Model of Cookie and Flour","Unified Complete Theory of the Cookieverse","Hypersize my String and Gluten","Flavor Mathematics"],
     gimmicks: [{
        uid: 10011,
        name: "Accelerator Mode : [OFF]",
        info: "Turns the accelerator on or off",
        costModel: new FreeCost(),
        maxLevel: 2,
        onBought: (amount) => {
            if(acceleratorButton.level > 1){
                acceleratorButton.level = 0;
            }
        }
     },{
        uid: 10012,
        name: "Open Reactor Control Panel",
        info: "Opens the reactor control panel for controlling what element to mash together",
        costModel: new FreeCost(),
        maxLevel: 8,
        onBought: (amount) => {
            acceleratorControl.level -= amount;
            acceleratorMenu.show();
            log(reactorInterim);
            //acceleratorControl.level = reactorInterim;
        }
     },{
        uid: 10013,name: "reactor mode",info: "hidden reactor mode variable",costModel: new ConstantCost(BF("1e1000")),maxLevel: 8,
        onBought: (amount) => {
            //log(``)
        }
     },{
        uid: 10014,
        name: "Fusion Mode : [OFF]",
        info: "Turns the fusion reactor on or off",
        costModel: new FreeCost(),
        maxLevel: 2,
        onBought: (amount) => {
            if(fusionReactor.level > 1){
                fusionReactor.level = 0;
            }
        }
     }],
    },
    {id: 13,
     names: ["Prism","Prius","TRIANGULAR PYRAMID","CAR","TRIANGULAR PYRAMID","CAR"], desc: "matterifying from light ", lumpBName: "Extended Spectrum",
     baseCPS: BF("4.9e82"), baseCost: BF("2.1e228"), powerUpgradeMult: 25, mult: 1, collectionTime : 40,maxExpLevel: 5, sweetLimit: 275, sweetMax: 250,
     achName: ["Some rays of dough and batter","Total Enlightenment","O thy energy of sky, bring fourth the light rays","Neverending rays of bright brilliance shine on you all","4th Cone"],
    },
    {id: 14,
     names: ["Chancemaker","Chamceamekr","NOT AN ESCAPE","OR IS IT?","NOT AN ESCAPE","OR IS IT?"], desc: "lucking in ", lumpBName: "Serendipity",
     baseCPS: BF(2.1e115/60.24), baseCost: BF("2.6e300"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 300, sweetMax: 200,
     achName: ["Lucked up","Devil\'s Gambit","Gambler\'s Last Bet","Remember, the house always wins","Black Cat\'s Paw"],
    },
    {id: 15,
     names: ["Fractal Engine","Framcael Engeen","INFINTY","FINITY","INFINTY","FINITY"], desc: "duplicating in ", lumpBName: "Gone Iterative",
     baseCPS: BF("2.2e133"), baseCost: BF("3.1e351"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 350, sweetMax: 150,
     achName: ["Z_n+1 = (Z_n)^2 + c","Apollonian Gasket","C_n := (C_n-1 ∪ (2+C_n-1))/3, where C_0 := [0,1]","Divide by zero, now, I dare you","Quite nearly but not so full"],
    },
    {id: 16,
     names: ["JavaScript Console","JabbaScript Conseoul","INTERFACE","DOMESTIFACE","INTERFACE","DOMESTIFACE"], desc: "hacking in ", lumpBName: "Reformat JS Script",
     baseCPS: BF("3.1e161"), baseCost: BF("7.1e425"), powerUpgradeMult: 9, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 400, sweetMax: 150,
     achName: ["Press F12","Infinite Theorycraft","I bring fourth reincarnation of reality","","The \"C\" Language"],
    },
    {id: 17,
     names: ["Idleverse","IDledeverse","IMPOSTER","AMONG US","IMPOSTER","AMONG US"], desc: "idling in ", lumpBName: "Install Another Idle Game",
     baseCPS: BF("8.5e205"), baseCost: BF("6.9e500"), powerUpgradeMult: 7, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 500, sweetMax: 200,
     achName: ["Manifest Destiny","Is there enough worlds?","Lost your Cosmic Cookies?","We the People of the Cookieverse, in Order to form a more perfect Dimensional Union, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Cookies to ourselves and our Posterity, do ordain and establish this Constitution for the Cookieverse.","You need a new bluestack"],
    },
    {id: 18,
     names: ["Cortex Baker","Corex Bakr","CONFLUENCE","CONVERGENCE","CONFLUENCE","CONVERGENCE"], desc: "thinking in ", lumpBName: "Get an extra IQ Point",
     baseCPS: BF("1e243"), baseCost: BF("6.66e610"), powerUpgradeMult: 5, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 600, sweetMax: 150,
     achName: ["O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA","Cardinal Synapsis","I declare thee on all ye inferiors. Despair before me, I am the Ozymandias","Who are you? I̷ a̵͇̋͂̌m̷̡̨̉̀̂ s̷̬̏̓̓ø̷̘̜͚̒͒̓l̸͍̄͐͘i̷̡̛̞̯p̷͈̞̳̉̃s̶̬̲͕̝̓̕͝","I am smart"],
    },
];

// gimmick upgrade constants
const covExp = 5;
const covDelta = 0.3;
const twinGateExp = BF(0.03), R9BoxMult = BF(0.7), symbolBookMult = BF(100), chronosPow = BF(0.25), gillesBoxPower = BF(0.61), covLvMod = BF(0.3), yggPowBase = BF(1.1), yggPowLv = BF(0.05), yggBPowLv = BF(0.9), yggBPowMod = BF(0.15), yggBPowBase = BF(1.7), yggThymePow = BF(0.5), yggBoost = BF(2.5), recomPowBase = BF(1.9), chanceBaseMin = BF(0.99), chanceBaseMax = BF(1.01), chanceBiasMod = BF(0.00005), terraFunNerfMod = BF(6);
var buildingCount = 0;

// gimmick upgrades
// Logistic funtion for Mine+
// Param -> midpoint=30*L, max=500*L - 1, min=0
// Display T, returns bignumber
const terraDurMod = BF(300), terraInfPow = BF(0.005), maxLPowBase = BF(2.4), maxLPowMod = BF(0.1), maxLBPowBase = BF(1.2), maxLBPowMod = BF(0.03), dilateFactorDivBase = BF(2.125), dilateFactorDivMod = BF(0.125), dilateFactorBase = BF(1000), dilatePowBase = BF(1), dilatePowMod = BF(0.025);
var logBoost = BF(1);
var xBegin = 0, maxL = 1;
var updateMaxL = () => {
    maxL = (BigP(terra.level,maxLPowBase + maxLPowMod * (TerraInf.level + ((artifactUpgrade[6].level > 0) ? 1 : 0))) * 1500);
    maxL += BigP(building[3].level,maxLBPowBase + maxLBPowMod * TerraInf.level);
    maxL *= (isSpellActive(2)?BF(logBoost):BF(1));
    maxL /= terraFunNerfMod;
}
var Logistic = () => {
    if(terra.level == 0){return 1;}
    return BigP(maxL,1 + terraInfPow * TerraInf.level) / (BigNumber.ONE + BigP(BigNumber.E,thyme.level - (xBegin + terra.level * terraDurMod))) + BigP(maxL,TerraInf.level*0.1);
}
var Dilate = () => {
    return 1;
    // let res = building[10].level + building[12].level;// restricting buildings
    // let factor = (building[11].level >= (res)) ? 1 - 1 / (dilateFactorDivBase - (dilateFactorDivMod * timeDilate.level)) : 1 - (building[11].level / (2 * res));
    // return BF(1) + (BigP(building[11].level, dilatePowBase + dilatePowMod * timeDilate.level)) / BigP(dilateFactorBase, factor);
}

//others
var magicLoop = 12600;//lcm of 10-50, just in case
var building = new Array(19), buildingPower = new Array(19), buildingLump = new Array(19); //buildingB, buildingPower, buildingLump containers
var terraIcons = [
    ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/9/94/CookieProduction34.png/revision/latest?cb=20190924042205"),
    ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/7/7b/CookieProduction36.png/revision/latest?cb=20190924042206"),
    ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/6f/CookieProduction39.png/revision/latest?cb=20200620182721"),
    ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/9/95/CookieProduction41.png/revision/latest?cb=20201030064717"),
    ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/e3/CookieProduction44.png/revision/latest?cb=20211227060414")
];
var updateTerraOverlay = () => {
    if(terra.level > 0){
        let terraIconLv = (terra.level >= 10) + (terra.level >= 20) + (TerraInf.level >= 7) + (terra.level >= 30);
        eqOverlay.children[2].source = terraIcons[terraIconLv];
        eqOverlay.children[3].text = "Terraform Buff";
    }else{
        eqOverlay.children[2].source = ImageSource.LOCK;
        eqOverlay.children[3].text = "Locked";
    }
}

//calc building from level, use calcBuilding(id, 0) for current level
var calcBuilding = (id, am) => {
    //if (setupTick) return 1;
    if (conGrow.level > 0 && id >= 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.9 + (0.2 * conGrow.level) + (0.011 * (id - 11)), 50 - conGrow.level, 1) - 1;
    } else if (conGrow.level > 1 && id < 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.2 + (0.07 * conGrow.level) + (0.021 * (id + 1)), 50 - conGrow.level, 1) - 1;
    } else {
        return BF(building[id].level + am);
    }
}

//building power getPower2(index,buildingPower[index].level)
var getPower = (index) => getPower2(index,buildingPower[index].level);
var getPower2 = (index, level) => BigP(Utils.getStepwisePowerSum(level, buildingData[index].powerUpgradeMult + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * (1+Math.min(CHAOS_STAGE.level,1))) + (jetEngine.level * 0.25) + (researchUpgrade[25].level * 0.5) + researchUpgrade[29].level , 5, 1), 1 + (superP.level * 0.02));

//building exponents
var getBuildingExp = (index) => {
    return buildingExponent[index].level * buildingExponentMod + 1;
}

//building description + info
var ColorScale = 0, chaosR=255, chaosG=255, chaosB=255;
var latestCollect = new Array(19);
var updateColorScale = () => ColorScale = Math.round(Math.min(255,255*(building[18].level/1450)));
var getBuildingDesc = (indx) => {
    var bi = `\$B[${indx}]^{${(getBuildingExp(indx) > 1) ? TS10(getBuildingExp(indx)) : ""}}\$${(investHelp[indx].level>0)?`+${investHelp[indx].level}`:""}`, displayedStr;
    var collectBar = getCollectionBar(thyme.level % buildingData[indx].collectionTime,buildingData[indx].collectionTime);
    if(latestCollect[indx]!=0 && latestCollect[indx] <= CPS/BF("1e12")){
        collectBar = `[X]`;
    }
    //let colorScale = Math.min(255,255*(building[18].level/1450));
    switch(bInfo){
        case 0:
            displayedStr =`${bi} - ${buildingData[indx].names[0 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]} ` + collectBar;
            break;
        case 1:
            displayedStr = `${bi} = ${calcBuilding(indx, investHelp[indx].level)} ` + collectBar;
            break;
        case 2:
            displayedStr = `${bi} - ${buildingData[indx].names[1 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]} ` + collectBar;
            break;
        default:
            displayedStr = "Building Desc. Error!";
            break;
    }
    if(CHAOS_STAGE.level > 2){
        return colorize(displayedStr,chaosR,chaosG,chaosB);
    }else{
        return colorize(displayedStr,255-ColorScale,255,255-ColorScale);
    }
}
var getBuildingInfo = (indx,amount) => `${getBuildingInfo2(indx, amount)}, ${((bInfo == 1) ? `\$B(${indx}) = ${generateCookie(indx,buildingData[indx].collectionTime,terraBoost)}\$` : "")}`;
var getBuildingInfo2 = (index, am) => {
    if (bInfo == 1) {
        return `\$B[${index}]^{${(getBuildingExp(index) > 1) ? getBuildingExp(index) : ""}}\$ = ${Utils.getMathTo(calcBuilding(index, investHelp[index].level), calcBuilding(index, am+investHelp[index].level))}`;
    }
    var result = buildingData[index].names[0 + Math.floor(bInfo / 2)];
    if (building[index].level == 1) {
        result += " ";
    } else {
        result += "s ";
    }
    // Sorry, but you CAN'T get 1 CPS per building skill issue lol
    result += buildingData[index].desc + BF(generateCookie(index,buildingData[index].collectionTime,terraBoost)).toString(0) + " cookies per collection";
    return result;
}
var onBuildingBought = (indx,amount) => {
    //pass
    if(maxBuild < indx){
        maxBuild = indx;
        maxBuildStore.setValue(maxBuild);
        updateBuildingLumpMaxLv();
    }
    if(indx == 3){
        updateMaxL();
    }else if(indx == 18){
        updateColorScale();
    }
    buildingCount += amount;
    if(covenant.level > 0){
        updateLocalMult(1);
    }
}

//building bar indicator : - = empty, | = 1 tick, O = 5 tick (over 25 tick)
var collectBar0 = "\-", collectBar1 = "I", collectBar2 = "O";
var getCollectionBar = (cur, mx) => {
    if(mx >= 25){
        cur = Math.floor(cur/5);
        mx = mx / 5;
        return "\[" + collectBar2.repeat(cur) + collectBar0.repeat(mx-cur) + "\]";
    }else{
        return "\[" + collectBar1.repeat(cur) + collectBar0.repeat(mx-cur) + "\]";
    }
    //return ` ${thyme.level}`;
}


// building power data
log(building50);
var buildingPowerCost = (i) => new ExponentialCost(BF(building50) * buildingData[i].baseCost, ML2(building50));
var getBuildingPowerDesc = (indx) => `\$P_{${BigTS(indx)}}${(superP.level > 0) ? "^{1.02}" : ""}\$ = ${BigTS(getPower(indx))}`;
var getBuildingPowerInfo = (indx,amount) => `\$P_{${TS10(indx)}}${(superP.level > 0) ? "^{1.02}" : ""} \\: = \\: \$ ${Utils.getMathTo(BigTS(getPower(indx)), getPower2(indx, buildingPower[indx].level + amount).toString(0))}`;

// building lump data
var buildingLumpMult = 1.1, moonMarbleCapacity = 50;
var buildingLumpCost = (i,mod) => new LinearCost(mod * (i + 1), mod * (i + 1) * ((i >= 11) ? (i - 1) * (i - 5) * 0.25 : 1.1));
var getBuildingLumpDesc = (i) => {
    if(bInfo == 1){
        return `\$ ${buildingLumpMult}^{L[${i}]} = ${buildingLumpMult}^{${buildingLump[i].level}} = ${BigP(buildingLumpMult, buildingLump[i].level)}\$`;
    }else{
        return buildingData[i].lumpBName;
    }
}
var getBuildingLumpInfo = (indx,amount) => {
    switch(bInfo){
        case 0:
            return `Improves ${buildingData[indx].names[0 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]}  by a factor of ${TS10(buildingLumpMult)}`;
        case 1:
            return `\$ L[${indx}] = \$ ${Utils.getMathTo(BigP(buildingLumpMult, buildingLump[indx].level), BigP(buildingLumpMult, buildingLump[indx].level + amount))}`;
        case 2:
            return `Improves ${buildingData[indx].names[1 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]}  by a factor of ${TS10(buildingLumpMult)}`;
    }
}
function TestBuildingDisplay(indx){
    let temp = bInfo;
    bInfo = 0;log(`==Literal==`);
    log(getBuildingDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingPowerDesc(indx));log(getBuildingPowerInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = 1;log(`==Compressed==`);
    log(getBuildingDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingPowerDesc(indx));log(getBuildingPowerInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = 2;log(`==Typo==`);
    log(getBuildingDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingPowerDesc(indx));log(getBuildingPowerInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = temp;
}
function ExponentiumSanity(){
    let totalExp = exponentium.level, usedCount = 0, stateStr = `Current Setup : `;
    log(`Total Bars : ${totalExp}\nCurrent Bars : ${EXPO_BAR.value}`);
    for(let i=0;i<19;i++){
        stateStr += `${buildingExponent[i].level}/`;
        usedCount += buildingExponent[i].level;
    }
    log(`${stateStr}\nUsed Bars : ${usedCount}`);
    if(EXPO_BAR.value+usedCount > totalExp){
        log(`Exponentium Overflow Detected!`);
    }else if(EXPO_BAR.value+usedCount < totalExp){
        log(`Exponentium Deficit Detected!\nCorrecting....`);
        EXPO_BAR.value = totalExp-usedCount;
    }
}
var updateBuildingLumpMaxLv = () => {
    if(Number.isNaN(maxBuild)){maxBuild = 0;}
    let maxLv = buildingData[maxBuild].sweetLimit;
    let chaosBoost = ((CHAOS_PERSISTENT_STAGE.level > 0)?60:0) + ((researchUpgrade[38].level > 0)?50:0);
    log(`Max = ${maxBuild}, lim = ${maxLv+chaosBoost}`);
    for(let i=0;i<19;i++){
        //log(`L${i} = Lv.${buildingLump[i].level}`);
        let curLim = Math.min(maxLv,buildingData[i].sweetMax);
        if(buildingLump[i].level <= (curLim+chaosBoost)){
            buildingLump[i].maxLevel = curLim+chaosBoost;
        }else{
            buildingLump[i].level = curLim+chaosBoost;
            buildingLump[i].maxLevel = curLim+chaosBoost;
            //buildingLump[i].maxLevel = buildingLump[i].level + 1;
        }
    }
    //idleverse
    moonMarbleCapacity = 50 + (10 * researchUpgrade[14].level) + (15 * researchUpgrade[16].level);
    log(`Marble Lv.${moonMarble.level}x${moonMarbleCapacity} = ${moonMarbleCapacity*moonMarble.level}`)
    if((building[17].level > 0) && (building[17].level >= moonMarbleCapacity*moonMarble.level)){
        building[17].maxLevel = building[17].level;
    }else{
        building[17].maxLevel = moonMarbleCapacity*moonMarble.level;
    }
    building[18].maxLevel = 250 + (250 * researchUpgrade[21].level) + (250 * researchUpgrade[26].level) + (300 * researchUpgrade[30].level) + (50 * researchUpgrade[32].level) + (550 * CHAOS_STAGE.level) + ((CHAOS_PERSISTENT_STAGE.level >= 2)?10550:0);
    archaeology.maxLevel = 1000 + (500 * researchUpgrade[12].level);
    covenant.maxLevel = 2 + (4 * researchUpgrade[27].level);
    SpellStack.maxLevel = 3 + researchUpgrade[17].level + researchUpgrade[28].level;
    excavatorModule[0].maxLevel = 900 + (researchUpgrade[29].level * 15);
    excavator.maxLevel = 325 + (researchUpgrade[29].level * 15) + (researchUpgrade[31].level * 10);
    astroExcavate.maxLevel = 15 + (researchUpgrade[31].level * 2);
    TerraInf.maxLevel = 7 + ((CHAOS_PERSISTENT_STAGE.level > 0)?3:0);
    terra.maxLevel = 20 + ((CHAOS_PERSISTENT_STAGE.level > 0)?30:0);
    Empower.maxLevel = 3 + ((CHAOS_PERSISTENT_STAGE.level > 0)?1:0) + ((researchUpgrade[37].level > 0)?3:0);
    conGrow.maxLevel = 5 + ((CHAOS_PERSISTENT_STAGE.level > 0)?2:0) + ((researchUpgrade[37].level > 0)?3:0);
    heavenInspire.maxLevel = 10 + ((researchUpgrade[37].level > 0)?10:0);
    for(let i=1;i<excavatedElements;i++){
        excavatorModule[i].maxLevel = (305 - 20*i) + (researchUpgrade[29].level * 15) + (researchUpgrade[31].level * 10);
    }
}
var updateBuildingLumpPower = () => {
    if(superL.level > 0){
        buildingLumpMult = 1.11;
    }else{
        buildingLumpMult = 1.1;
    }
}

//! CPS
//global mult - applies to C gained overall
var globalMult = BF(1), clickPower;
var clickPowerMaterials = ["Plastic","Iron","Titanium","Adamantium","Unobtainium","Eludium","Wishalloy","Fantasteel","Nevercrack","Armythril","Technobsidian","Plasmarble","Miraculite","Aetherice","Omniplast"], clickPowerDefault = "Selveradium", baseClickPower = 0.01, clickPowerMaterialTier = ["Weak","","Strong","Enchanted"], clickPowerMaterialTierLevel = 10;
var getCursorPower = (level) => (((BF(level) * BigP(buildingLumpMult, buildingLump[0].level)) * BF(baseClickPower)));
var updateGlobalMult = () => {
    globalMult = BF(1);
    globalMult *= (getCookieP(cookieTasty.level) * (BF(1) + (CookieTau.level * game.tau.log10().log10().pow(2))));
    //1 "cookiep : " + (getCookieP(cookieTasty.level) * (1+(CookieTau.level * game.tau.log10().log10().pow(2)))));
    // globalMult *= (BF(1) + (BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp));
    globalMult *= BF(1) + getCursorPower(clickPower.level);
    //2 "click : " + (1+(BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp)));
    globalMult *= ((TwinGates.level > 0) ? HEAVENLY_CHIP.value.pow(BF(twinGateExp) * TwinGates.level) : BF(1));
    //3 "twin : " + ((TwinGates.level > 0) ? hc.value.pow(twinGateExp * TwinGates.level) : 1));
    globalMult *= theory.publicationMultiplier;
    //4 "pub : " + theory.publicationMultiplier);
    globalMult *= (R9Box.level > 0)?(BigP(game.sigmaTotal, R9Box.level * R9BoxMult)):BF(1);
    //5 "r9 : " + (BigP(game.sigmaTotal,R9Box.level * R9BoxMult)));
    globalMult *= ((artifactUpgrade[9].level > 0) ? symbolBookMult : BF(1));
    //6 "art9 : " + ((artArt.level > 9)?symbolBookMult:BF(1)));
    globalMult *= ((ChronosAge.level > 0) ? (BF(1) + BigP(thyme.level,chronosPow)) : BF(1));
    //7 "chrono : " + ((ChronosAge.level > 0)?(BF(1) + BF(thyme.level).pow(chronosPow)):BF(1)));
    globalMult *= ((artifactUpgrade[4].level > 0) ? BigP(1+building[1].level, gillesBoxPower) : BF(1));
    //8 "art4 : " + ((artArt.level > 4)?BigP(building[1].level,gillesBoxPower):BF(1)));
    //globalMult *= (((BF(BF(spellCast[1]) + (BF(10) * effectCPSBDur)) >= BF(thyme.level))) ? effectCPSB : BF(1));
    //9 "spellsus : " + ((((spellCast[1]+(10*effectCPSBDur)) >= thyme.level))?effectCPSB:BF(1)));
    //10 "kp : "
    globalMult *= kittyPowerFull(kitty.level);
    if(globalMult == BF(0)){
        //log("the what");
        globalMult = BF(1);
    }
    //log(globalMult);
    //11 elem
    globalMult *= BigP(50,astroExcavate.level) * BigP(1.01,researchUpgrade[0].level + researchUpgrade[1].level + researchUpgrade[13].level) * BigP(5,researchUpgrade[7].level + researchUpgrade[15].level);
    //12 meld
    globalMult *= BigP(BigL10(elements[5].value+BF(10)),2*artifactUpgrade[14].level);
};
//sub global mult - mmmmmmmmm those cookies
//cookie tins, remember, they're unlocked in order :)
var cookieTin = new Array(25),cookieTasty, cookieTastyCostBase = BF(2.2e6), cookieTastyCostMod = ML2(2700), cookieTastyDName = "Exotic Undefined Cookies";
{
    var cookieNames = ["Plain Cookie", "Chocolate Chip Cookie", "Sugar Cookie", "Oatmeal Raisin Cookie", "Peanut Butter Cookie", "Coconut Cookie", "Almond Cookie", "Hazelnut Cookie", "Walnut Cookie", "Cashew Cookie", "White Chocolate Cookie", "Milk Chocolate Cookie", "Macadamia Cookie", "Double Chip Cookie", "White Chocolate Macadamia Cookie", "All-Chocolate Cookie", "Dark-Chocolated Coated Cookie", "White-Chocolate Coated Cookie", "Eclipse Cookie", "Zebra Cookie", "Snickerdoodle", "Stroopwafel", "Macaroon", "Madeleine", "Palmier", "Palets", "Sables", "Pure Black Chocolate Cookie", "Pure White Chocolate Cookie", "Ladyfingers", "Tullies", "Checker Cookie", "Butter Cookie", "Vanilla Cream Cookie", "Gingersnap", "Cinnamon Cookie", "Vanity Cookie", "Pinwheel Cookie", "Shortbread Biscuits", "Millionare\'s Shortbread", "Caramel Cookie", "Pecan Sandies", "Moravian Spice Cookie", "Anzac Biscuit", "Whole Grain Cookie", "Candy Cookie", "Big Chipped Cookie", "Spinkled Cookie", "Anti-Idle Cookie", "Florentine", "Chocolate Crinkles", "Zero-Idle Cookie", "Maple Cookie", "Persian Rice Cookie", "Norwegian Cookie", "Crispy Rice Cookie", "Ube Cookie", "Butterscotch Cookie", "Speculaas", "Chocolate Oatmeal Cookie", "Molasses Cookie", "Biscotti", "Waffle Cookie", "Custard Cream Cookie", "Bourbon Biscuits", "Mini-Cookie", "Whoopie Pies", "Caramel Wafer Biscuits", "Chocolate Chip Mocha Cookie", "Earl Grey Cookie", "Chai Tea Cookie", "Myanmar Tea Cookie", "Thai Tea Cookie", "Corn Syrup Cookie", "Icebox Cookie", "Graham Cracker", "Hardtack", "Tofu Cookie", "Gluten-Free Cookie", "Lebkuchen", "Aachener Printen", "Canistrelli", "Petit Beurre", "Nanaimo Bars", "Berger Cookie", "Chinsuko", "Putri Salju", "Milk Cookie", "Kruidnoten", "Marie Biscuits", "Meringue Cookie", "Yogurt Cookie", "Thumbprint", "Pizzelle", "Granola Cookie", "Ricotta Cookie", "Roze Koeken", "Peanut Butter Cup Cookie", "Sesame Cookie","Vanilla Crescent Cookie","Amaretti di Saronno Cookie", "Vanillekipferl", "Battenberg Biscuits", "Rosette Cookie", "Gangmakers", "Welsh Cookie", "Raspberry Cheesecake Cookie", "Bokkenpootjes", "Fat Rascals", "Ischler Cookies", "Matcha Cookie", "Super Fusion Cookie", "Spicy Cookie", "Kolachy Cookie", "Gomma Cookie", "Coyotas", "Frosted Sugar Cookie", "Marshmallow Sandwich Cookie", "Chocolate Chip Covered Chocolate Chip Cookie", "Benne Wafers", "Bizcochitos", "Yakgwa", "Alfajores", "Financier Cakes","Krumkake","Cuccidati","Torcetti","Finnish Pinwheels","Jammy Dodgers","Silvanas","Pfeffernüsse","Ma\'amoul","Koulourakia","Melomakarono","Qurabiya","Lengua de Gato","Acibadem Kurabiyesi","Ghoriba Bahla","Kaab el Ghazal","Lange Vinger","Taaitaai","Pepernoot","Cookie Bars","Gaufrettes","Snowball Cookie","Sequilhos","Hazelnut Swirlies","Spritz Cookie","Mbatata Cookie","Springerles","Super Idler Flavored Cookie"];
}
var cookieTinInfo = [
    {
        order: 1, //unused, just for reference
        name: "Box of Macarons",
        baseCost: 1.5e17,//base cost
        costMult: 17550,//multiplier for cost, will be put through ML2() later on
        mult: 1.2,//mult from 1 level
        cookieOrder: ["Basic Macaron", "Rose Macaron", "Lemon Macaron", "Chocolate Macaron", "Pistachio Macaron", "Hazelnut Macaron", "Violet Macaron", "Caramel Macaron", "Licorice Macaron", "Earl Grey Macaron", "Butter-Chocolate-Strawberry Tricaron"]
    },{
        order: 2, //unused, just for reference
        name: "Tin of Butter Cookies",
        baseCost: 1.5e32,//base cost
        costMult: 17550,//multiplier for cost, will be put through ML2() later on
        mult: 1.25,//mult from 1 level
        cookieOrder: ["Butter Horseshoe", "Butter Pucks", "Butter Knots", "Butter Swirls", "One Million Square Inches Butter per Cookie", "Slab of Pure Butter", "French Pure Butter Cookie", "Garlic Butter Braised Cookie", "I can\'t believe it\'s not Butter Cookies"]
    },{
        order: 3, //unused, just for reference
        name: "Tin of British Tea Biscuits",
        baseCost: 1.5e47,//base cost
        costMult: 17550,//multiplier for cost, will be put through ML2() later on
        mult: 1.35,//mult from 1 level
        cookieOrder: ["Empire Biscuits", "British Tea Biscuits", "Chocolate British Tea Biscuits", "Round British Tea Biscuits", "Round Chocolate Tea Biscuits", "Round British Tea Biscuits with Heart Motif", "Round Chocolate British Tea Biscuits with Heart Motif", "Big Ben Cookie", "Hobnobs Biscuits"]
    },{
        order: 4, //unused, just for reference
        name: "Box of Brand Biscuits",
        baseCost: 1.5e65,//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 1.5,//mult from 1 level
        cookieOrder: ["Caramoas", "Sagalogs", "Shortfoils", "Win Mints", "Fig Gluttons", "Loreols", "Jaffa Cake", "Grease\'s Cups", "Digits", "Lombardia Cookies", "Bastenaken Cookies", "Festivity Loops", "Havabreaks", "Zilla Wafers", "Dim Dams", "Pokey"]
    },{
        order: 5, //unused, just for reference
        name: "Box of 100\\%\\ Pastries",
        baseCost: BF("1.5e83"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 1.55,//mult from 1 level
        cookieOrder: ["Cheesecake", "Profiteroles", "Panettone", "Churros", "Cinnamon Bun", "Jelly Donut", "Glazed Donut", "Chocolate Cake", "Pies", "Croissant", "Pain Au Chocolat", "Focaccia", "Taiyaki", "Phyllo", "Apple Strudel", "Samarkand Bread"]
    },{
        order: 6, //unused, just for reference
        name: "Box of Cookie?",
        baseCost: BF("1.5e101"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 1.7,//mult from 1 level
        cookieOrder: ["Cookie Dough", "Cookie Dough(No Salmonella)", "Burnt Cookie", "A normal chocolate chip cookie but there\'s no chips at all for some reason", "4K Cookie", "Ray-Traced Cookie", "Crackers", "Deep-Fried Cookie", "Flavor Text Cookie"]
    },{
        order: 7, //unused, just for reference
        name: "Box of Cookien'\t",
        baseCost: BF("1.5e120"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 1.7,//mult from 1 level
        cookieOrder: ["Toast", "Pancakes", "Marshmellows", "PB amd J", "Wookies", "Cheeseburger", "Beesechurger", "One lone chocolate Chip", "Pizza", "Candy", "Brownies", "Flavor text Food that is not cookie", "Medovik", "Fudge"]
    },{
        order: 8, //unused, just for reference
        name: "Crate full of Exponential Idle Community References",
        baseCost: BF("1.5e145"),//base cost
        costMult: 263250,//multiplier for cost, will be put through ML2() later on
        mult: 2,//mult from 1 level
        cookieOrder: ["Gilles-Cookie Paillé", "liver", "Mathmatically Illegal Cookie", "! [ Snakey Snickerdoodles ] !", "Nerdy as f Cookie", ":exCookie:", "JS-Formed ellipsis Cookie", "SkyXCookie", "Weierstra🅱️ Cookie Spiral", "Exponential Cookie", "ouo cookie", "Orteil β Cookie"]
    },{
        order: 9, //unused, just for reference
        name: "The creator's inside jokes Box",
        baseCost: BF("1.5e155"),//base cost
        costMult: 100000,//multiplier for cost, will be put through ML2() later on
        mult: 2,//mult from 1 level
        cookieOrder: ["Gigaloopite", "Tetraloopite", "Enium Cookie", "Orate Cookie", "Dxygen Cookie", "IUSpawn Cookie", "egg", "Euler Serion Cookies", "Spasmic Cookieron", "S25+ Cosmos Grade Cookie"]
    },{
        order: 10, //unused, just for reference
        name: "Pack of Exotic Cookies",
        baseCost: BF("6e175"),//base cost
        costMult: 1000000,//multiplier for cost, will be put through ML2() later on
        mult: 2.25,//mult from 1 level
        cookieOrder: ["Mutated Cookie", "Magic Marbled Cookie", "Shortcake-like Cookie", "Truffle Cookie", "Salt Pretzels", "Seaweed Sesame Cookie", "Dulce De Leche", "Keylime Pie", "S\'Mores", "Chocolate Drizzle Cookie", "Peppermint Kiss Cookie", "Sprinkled Jelly Cookie", "Galaxial Drop", "Reflective Frosted Cookie", "Pecan Walnut Cookie", "White Mine Cookie", "Jelly Triangle", "Gold Leafed Cookie", "Grand Chocolate Wafer Sprinkles"]
    },
];
/**
 * Calculates the total boost from the different types of cookies you have
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieTasty.level
 * @returns {BigNumber} The total amount of cookie boost you have from the normal cookie flavors
 */
var getCookieTP = (level) => {
    let res = BF(1);
    level += chalcedIngredient.level * 10;
    level += researchUpgrade[5].level * 25;
    if (level >= 150) {
        res = BigP(1.13,level);
    } else if (level >= 100) {
        res = BigP(1.11,level);
    } else if (level >= 75) {
        res = BigP(1.09,level);
    } else if (level >= 50) {
        res = BigP(1.07,level);
    } else if (level >= 25) {
        res = BigP(1.05,level);
    } else {
        res = BigP(1.03,level);
    }
    return res;
};
/**
 * Calculates the total cookie power
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieTasty.level
 * @returns {BigNumber} The total amount of cookie boost you have
 */
var superCookieExponent = 1.025;
var getCookieP = (level) => {
    // let bn = (num) => BF(num);
    let res = getCookieTP(level);
    for (let i = 0; i < cookieTinInfo.length; i++) {
        res *= BigP(cookieTinInfo[i].mult, cookieTin[i].level);
    }
    if (CookieS.level != 0) res *= (BigNumber.TWO + SUGAR_LUMP.value).log2().pow(1.5);
    if (CookieH.level != 0) res *= (BigNumber.TEN + HEAVENLY_CHIP.value).log10().pow(1.25);
    if (CookieC.level != 0 && (COOKIE.value > BigNumber.ZERO)) res *= (BigNumber.TEN + COOKIE.value).log10().pow(0.9);
    if (DivineD.level != 0) res *= BigNumber.TWO.pow(DivineD.level);
    if (DivineOneHalf.level >= 0) res *= BigP(1.5,DivineOneHalf.level);
    res *= BigP(1.01, invest.level);
    if (superC.level > 0) {
        res = BigP(res, superCookieExponent);
    }
    return res;
};
//milk
var kitty;
const kittyDName = "Very Chawwtic Catgirls";
const kittyID = 69420; // ouo
const kittyExp = ML2(9750);
const kittyCost = 75000;
const kittyTiers = 10;//purely visual changes to displayed upgrade name
const kittyName = [
    "Helper Kitten",
    "Worker Kitten",
    "Engineer Kitten",
    "Overseer Kitten",
    "Manager Kitten",
    "Accountant Kitten",
    "Specialist Kitten",
    "Expert Kitten",
    "Consultant Kitten",
    "Assistants to the Regional Kitten",
    "Marketeer Cat",
    "Analyst Cat",
    "Cat Executive",
    "Senior Cat Executive",
    "The Meowy Boss",
    "Catgirl Overlord",
];
/**
 * Calculates the amount of kitty power you have
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
    if (artifactUnlock[2].level > 0) {
        ret = BigP(ret, 1 + (achCount * 0.002));
    }
    return ret;
};
var kittyPowerFull = (level) => {
    let milk = BigNumber.FIVE * achCount;
    return kittyPower(level) * BF(BF(100 + milk) / BF(100));
}

//local mult - applies to C gained per building
var updateLocalMult = (indx) => {
    //log(`update ${indx}`);
    buildingData[indx].mult = BF(getPower(indx) * BigP(1.1,buildingLump[indx].level));
    switch (indx) {
        case 0:
            if (artifactUpgrade[3].level > 0) {
                buildingData[indx].mult *= BF(3.24e44);
            }
            break;
        case 1:
            if (covenant.level > 0) {
                buildingData[indx].mult *= BigP(buildingCount,(BigP(covenant.level,covLvMod) * covDelta + covExp) * (1 + ((covenant.level-1)*0.5)));
            }
            if (researchUpgrade[27].level > 0) {
                buildingData[indx].mult *= BigP(building[1].level+1,2) * BigP(building[16].level+1,2.5);
            }
            break;
        case 2:
            if (ygg.level > 0 && thyme.level > 0) {
                buildingData[indx].mult *= BigP(getPower(2),yggPowBase + (yggPowLv * ygg.level)) * BigP(building[6].level + building[2].level,BigP(ygg.level, yggBPowLv) * yggBPowMod + yggBPowBase) * (BigNumber.ONE + BigP(thyme.level,yggThymePow)) * yggBoost;
            }
            if (artifactUpgrade[5].level > 0) {
                buildingData[indx].mult *= BF(200);
            }
            break;
        case 3:
            if (artifactUpgrade[6].level > 0) {
                buildingData[indx].mult *= BF(3.5e40);
            }
            break;
        case 4:
            if (recom.level > 0) {
                buildingData[indx].mult *= (recom.level > 1) ? (BF(1e27) * BigP(recomPowBase, recom.level - 1)) : (BF(1e28));
            }
            if (artifactUpgrade[7].level > 0) {
                buildingData[indx].mult *= BF(1.08e18);
            }
            break;
        case 5:
            if (artifactUpgrade[8].level > 0) {
                buildingData[indx].mult *= BF(4.08e48);
            }
            break;
        case 6:
            if (artifactUpgrade[0].level > 0) {
                buildingData[indx].mult *= BF(1.6e43);
                if (artifactUpgrade[1].level > 0) {
                    buildingData[indx].mult *= (building[13].level + investHelp[13].level) + BF(1);
                }
            }
            break;
        case 8:
            if (researchUpgrade[8].level > 0){
                buildingData[indx].mult *= BF(3.6e89);
            }
            break;
        case 12:
            if (cherryRegulator.level > 0) {
                buildingData[indx].mult *= BF(1e30);
            }
            break;
        case 13:
            if (artifactUpgrade[1].level > 0) {
                buildingData[indx].mult *= BF(1) + (BF(5) * (building[6].level + investHelp[6].level));
                if (artifactUpgrade[5].level > 0) {
                    buildingData[indx].mult *= BF(750);
                }
            }
            break;
        case 15:
            if (cherryRegulator.level > 0) {
                buildingData[indx].mult *= BF(1.5e11);
            }
            break;
        case 17:
            buildingData[indx].mult *= BigP(50,researchUpgrade[2].level+researchUpgrade[6].level+researchUpgrade[9].level+researchUpgrade[25].level);
            break;
        case 18:
            buildingData[indx].mult *= BigP(10,researchUpgrade[21].level+researchUpgrade[26].level+researchUpgrade[30].level);
    }
    if(buildingData[indx].mult == BF(0)){buildingData[indx].mult = BF(1)};
};

//! Artifacts
var artArt, templeJ = false, artifactUpgrade = new Array(99), artifactUnlock = new Array(99), artifactCount = 0;
const artifactLockText = "Not Discovered";
var artifactData = [{
    order: 0,name: "Rhombus of Chocolatance",clue: "It\'s at the foyer, you can\'t miss it",
    cost: BF("1e250"),unlockCondition: () => {return true;}, desc: "Very shiny chocolate that somehow brings in attention of even more gods"
},{
    order: 1,name: "Occam\'s Lazer",clue: "One is One, Seven Fives is Two",
    cost: BF("1e265"),unlockCondition: () => {return archaeology.level >= (255 - (255 & 256 | 4 | 8 | 16 | 64 | 128));}, desc: "A hilariously big beam of light that makes prisms go head over toes for them(aka you)"
},{
    order: 2,name: "All-Natural ouo sugar",clue: "Achieved Enough?",
    cost: BF("1e270"),unlockCondition: () => {return achCount >= (((((((((1 << 1) + 1) << 2) + 1) << 1) + 1) << 1) + 1) << 1);}, desc: "Makes the cat go ouo and [DATA EXPUNGED]"
},{
    order: 3,name: "Doctor T\'s Thesis",clue: "YEAH SCIENCE!!!!!!!!",
    cost: BF("1e290"),unlockCondition: () => {return building[9].level + investHelp[9].level >= ((((((4095 & (4095 - 1)) & (4095 - 4)) & (4095 - 8)) & (4095 - 64) & (4095 - 256)) & (4095 - 512)));}, desc: "The panacea to all those hand diseases"
},{
    order: 4,name: "Bountiful box of Gilles-Philippe",clue: "There\'s kings in cookies",
    cost: BF("1e254"),unlockCondition: () => {return cookieTin[7].level >= 1 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2 << 2 >> 2;}, desc: "Replaces grandma with something else....  better?"
},{
    order: 5,name: "Key to the Conservatorium",clue: "Explore more, duh",
    cost: BF("1e280"),unlockCondition: () => {return archaeology.level >= (((1 << 5) | 1) & 31 & 62 | 2 | 4 | 8 | 16) + 40;}, desc: "An overly ornate yet small key to a glass house you never knew existed. Take a walk inside, experience the exotic fauna and dreamy space, but please DO NOT eat or drink anything labelled with \"Eat me\" or \"Drink Me\"."
},{
    order: 6,name: "Coreforge Bar",clue: "A bit deeper",
    cost: BF("1e285"),unlockCondition: () => {return archaeology.level >= (((((((((1 << 1) + 1) << 2) + 1) << 1) + 1) << 1) + 1) << 1);}, desc: "An legendary alloy rumored to be forged within the very halls of Sauron. Their sheer radiance already bests even the most sophisticated of your alloys, not to mention the heat."
},{
    order: 7,name: "Da Vinci Manuscript",clue: "Get those patents out, ya stingy",
    cost: BF("1e285"),unlockCondition: () => {return buildingLump[4].level >= ((32 >> 4) | (32 >> 1) | 32 ) << 2;}, desc: "Contains all you would ever dream when you have to deal with the nightmare of citations, absolutely useless otherwise."
},{
    order: 8,name: "A very curious tulip bulb",clue: "Hoard, Hoard, Hoard more",
    cost: BF("1e295"),unlockCondition: () => {return COOKIE.value >= BF("1e295");}, desc: "Supposedly dating back to the 1600s and being involved in \"Tulip Mania\". This bulb of tulip surprisingly has numerous bubbles formed around its petals, a reminder of something?"
},{
    order: 9,name: "Book of Symbolisms",clue: "Show me the Artifacts, hope you\'re lucky",
    cost: BF("1e300"),unlockCondition: () => {return (artifactUpgrade[0].level + artifactUpgrade[1].level + artifactUpgrade[2].level + artifactUpgrade[3].level + artifactUpgrade[4].level + artifactUpgrade[5].level + artifactUpgrade[6].level + artifactUpgrade[7].level + artifactUpgrade[8].level >= 9) && (Math.random() < 0.01);}, desc: "You don\'t know why, but you felt a compulsion to keep this book close to you"
},{
    order: 10,name: "Grimoire of Basic Cookie Magic",clue: "haha mana goes brrrrrr",
    cost: BF("1e330"),unlockCondition: () => {return (building[7].level >= (parseInt([+!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[]]) ^ parseInt([+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[] + !+[]] + [+!+[] + !+[] + !+[] + !+[] + !+[] + !+[]])) + 100) && (Math.random() < 0.01);}, desc: "Finally, you get the wizard to cast actual spells instead of conjuring cookies. Despite the thickness, there\'s somehow only 8 spells"
},{
    order: 11,name: "Antediluvian Engine",clue: "Long-Lived 6048000",
    cost: BF("1e490"),unlockCondition: () => {return (thyme.level >= 6048000) && (Math.random() < (0.001 * (thyme.level/6048000)));}, desc: "A peculiar machine somehow capable of locally accelerating spacetime using something about time crystals. Engravings of menacing nature can be found tucked away at the bottom, though we don\'t know why. It also comes with a guidebook on parallel computing, not that anything in there makes no sense, right?"
},{
    order: 12,name: "Elementium Infused Chocolate Chunk",clue: "Cavitilicious",
    cost: BF("1e365"),unlockCondition: () => {return (SUGAR_LUMP.value >= 0b10011100010000000000) && (Math.random() < 0.005);}, desc: "Despite its \"normal\" appearance, that chunk is full of.... uh.... elements? What is that word anyway?"
},{
    order: 13,name: "Scent of Vanilla Nebula",clue: "5 Cosmic Mappings ah ah ah",
    cost: BF("1e400"),unlockCondition: () => {return (building[8].level >= 0b10011100010000 / 2) && (Math.random() < 0.005);}, desc: "Some astronomers go crazy over these"
},{
    order: 14,name: "Cherrysilverium Meld",clue: "Melting Cs",
    cost: BF("1e610"),unlockCondition: () => {return (Math.random() < 0.05) && (acceleratorMode.level == 4) && (acceleratorButton.level == 1);}, desc: "A curious blob of metal, one of the inscriptions inside the temple\'s numerous halls details a picture of it literally melding stuffs together, with humans and cookies"
},{
    order: 15,name: "Tokakyote Type-C",clue: "When you decay a lot at once, there\'s always a chance for something extra to emerge",
    cost: BF("1e651"),unlockCondition: () => {return (Math.random() < 0.005) && (HIGH_ELEMENT_CLUSTER.value >= BF(80000));}, desc: "A helical structure that people claim is able to perform nuclear fusion. Why does such a thing exist inside a temple anyway?"
}];
//loot
const maxRoll = 10000;
var templeLuck = 0;
let lootWeight = [10000, 9995, 9945, 9845, 9735, 9615, 9565, 9555, 9530, 9430, 9320, 9200, 9100, 9000];
let minCookie = (i) => {
    if(Number.isNaN(maxBuild)){maxBuild = 0;}
    let prize = BF(60) * (CPS/(buildingData[maxBuild].collectionTime/10)) * terraBoost * BF(i);
    prize = checkGainOverLimit(prize);
    COOKIE.value = checkCookieOverLimit(COOKIE.value + prize);
};
let pubH = (i) => {
    if (COOKIE.value <= 0) return;
    HEAVENLY_CHIP.value += BF(i) * hfc(COOKIE.value);
};
var rollLoot = () => {
    let r = RandI(maxRoll); + ((isSpellActive(3))?templeLuck:0) + (butterBar.level * 25);
    let prize = bsearch(lootWeight, r);
    switch (prize) {
        case 0:
            minCookie(60);
            pubH(1);
            tickLump(2000);
            templeJ = true;
            break;
        case 1:
            generateLump(1500);
            break;
        case 2:
            generateLump(1000);
            break;
        case 3:
            generateLump(750);
            break;
        case 4:
            generateLump(500);
            break;
        case 5:
            generateLump(250);
            break;
        case 6:
            pubH(0.5);
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
//artifact unlock
var checkArtifactUnlock = () =>{
    for(let i=0;i<artifactCount;i++){
        if(artifactData[i].unlockCondition()){
            artifactUnlock[i].level = 1;
            artifactUpgrade[i].maxLevel = 1;
        }
    }
}

//! Spells
var spellCast = new Array(99), spellCount = new Array(99), spellCooldown = new Array(99), spellView;
var spellData = [{
    order: 0,name: "Conjure Idled Goods", desc: "You get more cookies, simple",
    castCost: 2500, castCooldown: 14400,
    effect: (boost) => {
        var rand = RandI(100);
        if (rand <= 90 + (2*boost)) {
            rand = RandI(7.5 + (2.5 * SpellStack.level) + (0.25*boost)) * RandR(2.5+(0.25*SpellStack.level)+(0.05*boost),5+(0.25*SpellStack.level)+(0.025*boost));
            log(`Cookies for you ${rand}`);
            minCookie(rand);
        } else {
            log("No Cookies for you");
        }
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Lazy Wizard","With those basics drilled in","Safe Safe Cookie Spellcaster"],//25, 250, 2500
},{
    order: 1,name: "Prestidigus", desc: "Gives you HC equivalent to publishing now",
    castCost: 10000, castCooldown: 36000,
    effect: (boost) => {pubH(1 + (0.05 * SpellStack.level) + (0.025 * boost));},
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Ascendant Wizard","Afraid of publications","How far would you push in a publication? Yes."],
},{
    order: 2,name: "Terrona Terra", desc: "Makes the terraforming business suddenly go to the cookie moon",
    castCost: 2500, castCooldown: 12000, effectLength: 600,
    effect: (boost) => {
        xBegin = thyme.level - (150*((boost*0.5)+2));
        logBoost = 10 + (1.5 * SpellStack.level) + (0.1*boost);
        updateMaxL();
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Mass Miner Wizard","Superactive Lifestyle","Cool that you can mass terraform the earth, but can you touch grass though?"],
},{
    order: 3,name: "Replenish Extradionaire", desc: "Enriches your temple with a lot more loot",
    castCost: 3000, castCooldown: 8400, effectLength: 600,
    effect: (boost) => {
        templeLuck = 50 * ((boost*0.25)+1);
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Explorer Wizard","Colonization but on a smaller scale","Pot of Artifacts, Cookies, Heavenly Chips, and Sugar Lumps"],
},{
    order: 4,name: "Asseto Accio", desc: "Spawn buildings into existence, only works for a certain amount",
    castCost: 2500, castCooldown: 10000,
    effect: (boost) => {
        let rand = RandI(21);
        if (rand < 19) {
            if ((building[rand].level > 0) && (building[rand].cost.getCost(building[rand].level) <= (BF(1e10) * COOKIE.value * BigP(2.5,boost+SpellStack.level)))) {
                log(`You won ${buildingData[rand].names[0]}`);
                let res = RandI(10 + boost + (2*SpellStack.level)) + 1 + SpellStack.level + Math.round(boost*0.2);
                if(rand == 18){
                    building[18].level = Math.min(building[18].level + res,building[18].maxLevel);
                }else if(rand == 17){
                    building[17].level = Math.min(building[17].level + res,building[17].maxLevel);
                }else{
                    building[rand].level += res;
                }
            }
        }else{
            log(`nop`);
        }
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Mogul Wizard","This looks to be slightly unaffordable, considering your CPS","With those cookie frauds that you've committed. If you pay you'll be acquitted. And your buildings all permitted"],
},{
    order: 5,name: "Mimi Mami", desc: "Reduces the cooldown time of spells",
    castCost: 1212, castCooldown: 8000,
    effect: (boost) => {
        updateSpellCooldown(810 + (150 * SpellStack.level) + (15 * boost));
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Impatient Wizard","The spells must go brrrrrrrrrr","Why must there be cooldowns? The spellcaster screams, for he does not know..."],
},{
    order: 6,name: "Simply Sweetdelicious", desc: "Spawn some sugar lumps in",
    castCost: 0, castCooldown: 60000,
    effect: (boost) => {
        if (RandI(100 + boost) > 10) generateLump(1500 + (180 * SpellStack.level) + (50 * boost));
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Very Sweet Wizard","Sugar Lump Magic Saga","Don\'t overdose on sugar, kids"],
},{
    order: 7,name: "Made in Heaven", desc: "haha jojo reference goes brrrrrrrrrr",
    castCost: 5555, castCooldown: 14400,
    effect: (boost) => {
        let warpthyme = (((100 + (25 * SpellStack.level) + (5 * boost)) * RandR(0.5, 1.5 + (0.25 * SpellStack.level))) + (25 * SpellStack.level));
        log("Time goes brrrrrrrr " + warpthyme);
        for (let i = 0; i < warpthyme; i++) {
            tick(0.1, 1);
        }
    },
    unlockCondition: () => {return artifactUpgrade[11].level > 0;},//unlock condition
    achievementNames: ["ゴゴゴゴゴゴゴゴ","やれやれだぜ！","「天国の時」はついに来た…"],
},];
var spellUsed = spellData.length;
let updateSpellLayer = () => {
    for (let i = 0; i < spellUsed; i++) {
        spellCast[i].maxLevel = 1 + SpellStack.level;
    }
};
let updateSpellCooldown = (ticks) => {
    for(let i=0;i<spellUsed;i++){
        if(spellCooldown[i].level - ticks > 0){
            spellCooldown[i].level -= ticks;
        }else if(spellCooldown[i].level > 0){
            spellCast[i].level = 0;
            spellCooldown[i].level = 0;
        }
    }
}
let onSpellCast = (indx,amount) => {
    spellCooldown[indx].level = spellData[indx].castCooldown;
    spellCount[indx].level += amount;
    totalSpell += amount;totalSpellStore.setValue(totalSpell);
    let spellBoost = totalCastAchievement[4].isUnlocked + (3*totalCastAchievement[5].isUnlocked) + (5*totalCastAchievement[6].isUnlocked) + spellCastAchievement[indx][0].isUnlocked + (4*spellCastAchievement[indx][1].isUnlocked) + (9*spellCastAchievement[indx][2].isUnlocked) + (0.25 * butterBar.level) + (10 * researchUpgrade[17].level) + (15 * researchUpgrade[28].level);
    for(let i=0;i<amount;i++){
        spellData[indx].effect(spellBoost);
    }
}
let isSpellActive = (indx) => {
    return spellData[indx].castCooldown - spellCooldown[indx].level <= spellData[indx].effectLength;
}

//! Elements
//prevUnlock : previous element required to unlock the next excavator
var elements = new Array(19), elemPrev = new Array(19), arrEPS = new Array(19);
var excavator, excavatorModule = new Array(19), excavatorDrill, excavatorSiteGrant;
var jetEngine, sugarTools, chalcedIngredient, butterBar, jetRefine, astroExtract, jetTransistor, jetParallel, cherryRegulator, hazelSolution, moonCore, moonMarble, astroExcavate;
const usedElements = 9, excavatedElements = 8, lossFactorBase = 100, jetRefineEff = 1.5;
var elementData = [
    {
        order: 0, weight: 1, prevUnlock: 0, excavatorPowerPow: 1.4, excavatorPowerFactor: 0.5,
        symbol:"Be", fullName: "Berrylium",
    },{
        order: 1, weight: 2, prevUnlock: 5e12, excavatorPowerPow: 1.45, excavatorPowerFactor: 0.5,
        symbol:"Ch", fullName: "Chalcedhoney",
        gimmicks: [{
            uid: 32001,
            name: "Chalcedhoney Ingredients",
            info: "Replacing normal honey with Chalcedhoney has been proven to boost the tastiness and yield of cookies. Adds 10 level to normal cookie upgrade",
            costModel: new ExponentialCost(1e10, ML2(100)),
            maxLevel: 8,
            onBought: (amount) => {updateGlobalMult();}
        }]
    },{
        order: 2, weight: 3, prevUnlock: 2e14, excavatorPowerPow: 1.45, excavatorPowerFactor: 0.75,
        symbol:"Bg", fullName: "Buttergold", minDecayAmt: BF("1e51"),
        gimmicks: [{
            uid: 32002,
            name: "Buttergolden Bars",
            info: "According to the Book of Symbolisms, Buttergold is superior than all those funny charms made out of inferior platinum, or worse, gold",
            costModel: new ExponentialCost(1e9, ML2(100)),
            maxLevel: 7,
            onBought: (amount) => {updateGlobalMult();}
        }]
    },{
        order: 3, weight: 5, prevUnlock: 1e16, excavatorPowerPow: 1.5, excavatorPowerFactor: 1,
        symbol:"Su", fullName: "Sugarmuck", minDecayAmt: BF("1e49"),
        gimmicks: [{
            uid: 32003,
            name: "Sugarmuck-Powered Farming Tools",
            info: "Produces a constant stream of sugar lumps through the peculiar powers of Sugarmuck\'s affinity to sugar lumps",
            costModel: new ExponentialCost(1e9, ML2(100)),
            maxLevel: 10,
            onBought: (amount) => {updateGlobalMult();}
        }]
    },{
        order: 4, weight: 8, prevUnlock: 2.15e21, excavatorPowerPow: 1.55, excavatorPowerFactor: 1,
        symbol:"Jm", fullName: "Jetmint", minDecayAmt: BF("1e47"),
        gimmicks: [{
            uid: 32004,
            name: "Jetmint Booster",
            info: "Jetmint has been shown to improve the overall efficiency of just about every building we can get ours hands on. Increases the base growth of building powers",
            costModel: new ExponentialCost(1e22, ML2(1e5)),
            maxLevel: 3,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        },{
            uid: 32005,
            name: "Jetmint Refinery",
            info: "From the extractors, we can refine them until we get useful elements out of it. Reduces the loss factor by 1",
            costModel: new ExponentialCost(5e23, ML2(1.1)),
            maxLevel: 20,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        },{
            uid: 32007,
            name: "Jetmint Transistors",
            info: "Yet another useful application of the magic metal Jetmint, now that its properties of being a semiconductor has been discovered. Unlocks JavaScript Console and the wonders of computation",
            costModel: new ConstantCost(2.85e25),
            maxLevel: 1,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        },{
            uid: 32013,
            name: "Parallel Computing Chip",
            info: "Does the impossible of computing 2 things at once. \'nuff said.",
            costModel: new ConstantCost(8e55),
            maxLevel: 1,
            onBought: (amount) => {researchSlotUpgrade.level += 1;updateResearchButtonText();}
        }]
    },{
        order: 5, weight: 13, prevUnlock: 1.7e26, excavatorPowerPow: 1.55, excavatorPowerFactor: 1,
        symbol:"Cs", fullName: "Cherrysilver", minDecayAmt: BF("1e45"),
        gimmicks: [{
            uid: 32008,
            name: "Cherrysilver Regulators",
            info: "Cherrysilver has been proven mathematically to be a better regulator than all those boring Boron you have lying around as a result of failed alchemical endeavors.",
            costModel: new ConstantCost(2e46),
            maxLevel: 1,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        }]
    },{
        order: 6, weight: 21, prevUnlock: 2e31, excavatorPowerPow: 1.6, excavatorPowerFactor: 1,
        symbol:"Hz", fullName: "Hazelrald", minDecayAmt: BF("1e43"),
        gimmicks: [{
            uid: 32009,
            name: "Hazelrald Solution",
            info: "This special homemade solution made out of top-secret Hazelrald Matrix and Letherium(top-secret even for top-secret documents) serves to dissolve anything put into it into individual molecules.",
            costModel: new ConstantCost(7.5e44),
            maxLevel: 1,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        }]
    },{
        order: 7, weight: 34, prevUnlock: 6e36, excavatorPowerPow: 1.65, excavatorPowerFactor: 1,
        symbol:"Mn", fullName: "Mooncandy", minDecayAmt: BF("1e41"),
        gimmicks: [{
            uid: 32010,
            name: "Mooncandium Core",
            info: "Being the heaviest element, Mooncandy should act as a plentiful source of elementary particles for making elements smash into each other.",
            costModel: new ConstantCost(8e42),
            maxLevel: 1,
            onBought: (amount) => {updateGlobalMult();refreshLocalMult();CPSrefresh();}
        },{
            uid: 32011,
            name: "Mooncandium Marbles",
            info: "Utilize the multiversial property of Mooncandy to build sophisticated spheres capable of holding up to 50 multiverses. Increases the maximum number of Idleverse by 50",
            costModel: new ExponentialCost(1e45, ML2(2.5)),
            maxLevel: 1000,
            onBought: (amount) => {updateBuildingLumpMaxLv();}
        }]
    },{
        order: 8, weight: 55, prevUnlock: 1e50, excavatorPowerPow: 1.7, excavatorPowerFactor: 1,
        symbol:"As", fullName: "Astrofudge", minDecayAmt: BF("1e39"),
        gimmicks: [{
            uid: 32006,
            name: "Astrofudge-Based Extractors",
            info: "Use the cosmic property of Astrofudge to hopefully extract more useful things from the ground. Unlocks the possibility of reducing losses from excavating more exotic elements",
            costModel: new ConstantCost(500000),
            maxLevel: 1,
            onBought: (amount) => {updateGlobalMult();}
        },{
            uid: 32012,
            name: "Extraterrestrial Excavators",
            info: "Manifest your destiny of elements by extending your mining operations into the SPACE! Multiplies EPS by 5 and CPS by 50",
            costModel: new ExponentialCost(1000000,ML2(10)),
            maxLevel: 15,
            onBought: (amount) => {updateGlobalMult();calcEPS();}
        }]
    },{
        order: 9, weight: 89, prevUnlock: 1e50,
        symbol:"Aa", fullName: "Alabascream",
    },{
        order: 10, weight: 144, prevUnlock: 1e50,
        symbol:"Ii", fullName: "Iridyum",
    },{
        order: 11, weight: 232, prevUnlock: 1e50,
        symbol:"Gc", fullName: "Glucosmium",
    },{
        order: 12, weight: 376, prevUnlock: 1e50,
        symbol:"Gm", fullName: "Glimmeringue",
    }
];
var getElemBoost = (indx,level) => (1 + ((elementData[indx].excavatorPowerFactor+(researchUpgrade[23].level * (0.15*indx))) * BigP(level,elementData[indx].excavatorPowerPow+(researchUpgrade[23].level * (0.03*indx)))));
arrEPS.fill(BF(0));
var calcExcavator = (level) => Utils.getStepwisePowerSum(level, 5, 5, 0);
var getLossFactor = () => lossFactorBase - (jetRefine.level*jetRefineEff) - (10*researchUpgrade[7].level) - (10*researchUpgrade[11].level) - (10*researchUpgrade[23].level);
var getUniversalExcMult = () => BigP(1.2,cherryRegulator.level) * BigP(1.2,hazelSolution.level) * BigP(2,moonCore.level) * BigP(5,astroExcavate.level) * BigP(5,researchUpgrade[7].level) * BigP(7.5,researchUpgrade[11].level) * BigP(BigL10(10+elements[5].value),artifactUpgrade[14].level) * BigP(BigL10(CPS+10),1.25*researchUpgrade[31].level) * BigP(BigL10(terraBoost + 10),researchUpgrade[31].level);
var calcEPS = () => {
    let excMult = getUniversalExcMult();
    let excRate = calcExcavator(excavator.level) * excMult;
    let lossFactor = getLossFactor();
    for(let i = 0;i < excavatorDrill.level;i++){
        excRate *= getElemBoost(i,excavatorModule[i].level);
    }
    for (let i = 0;i < excavatorDrill.level;i++) {
        arrEPS[i] = (BigL10(COOKIE.value + BF(10))/BF(100)) * BigP(lossFactor, -1 * i) * excRate;
        //log(arrEPS[i]);
    }
    arrEPS[8] = 0;
    if (artifactUpgrade[13].level > 0) {
        arrEPS[8] += BigL10(BF(10) + building[8].level) * BigL10(BF(10) + generateCookie(8,10,terraBoost)) * 0.001;
        arrEPS[8] *= excMult * BigP(2.5,researchUpgrade[8].level) * BigP(BigL10(10+excRate),researchUpgrade[29].level);
    }
}
var excavatorDescription = () => {
    switch(bInfo){
        case 0:
            return `Excavators ($E_{x}$)`;
        case 1:
            return `$E_{x} = ${calcExcavator(excavator.level)}$`;
        case 2:
            return `Exacators ($E_{x}$)`;
    }
}
var excModulueDescription = (indx) => {
    switch(bInfo){
        case 0:
            return `${elementData[indx].fullName} Mining Module ($Ef_{${indx}}$)`;
        case 1:
            return `$Ef_{${indx}} =$ ${getElemBoost(indx,excavatorModule[indx].level)}`;
        case 2:
            return `${elementData[indx].fullName} MIngin MFodule ($Ef_{${indx}}$)`;
    }
}
var excavatorInfo = (amount) => {
    switch(bInfo){
        case 0:
            return `Excavates elements for you`;
        case 1:
            return `$E_{x} =$ ${Utils.getMathTo(calcExcavator(excavator.level),calcExcavator(excavator.level+amount))}`;
        case 2:
            return `Exvcateds elemtns fro you`;
    }
}
var excModulueInfo = (indx, amount) => {
    switch(bInfo){
        case 0:
            return `Empowers your excavators with the essence of ${elementData[indx].fullName}`;
        case 1:
            return `$Ef_{${indx}} = 1 + ${BF(elementData[indx].excavatorPowerFactor+(researchUpgrade[23].level * (0.15*indx)))}Lv^{${BF(elementData[indx].excavatorPowerPow+(researchUpgrade[23].level * (0.03*indx)))}} =$ ${Utils.getMathTo(getElemBoost(indx,excavatorModule[indx].level),getElemBoost(indx,excavatorModule[indx].level+amount))}`;
        case 2:
            return `Expoeprws your excavatrors with the ssenwe of ${elementData[indx].fullName}`;
    }
}
var refreshExcavatorMaxLv = () => {
    excavatorDrill.maxLevel = excavatorSiteGrant.level;
}
//accelerator
var accelerator, acceleratorButton, acceleratorControl, acceleratorMode;
var lightOn = "O", lightOff = "-", strobeCnt = new Array(15).fill(0), strobeOdds = [0.75,1/3,1/11,0.4,0.6,1/7,0.5], strobeUsed = 7, lightInvalid = "X";
const maxDecayPow = 0.9, lambda =  BF(0.04), yieldfactor = BF(0.05), yieldPow = 1.045, cookieYieldPow = 1.5, cookieYieldFactor = 10, weightFactor = 228/40, criticalConst = 0.0025;
var lightIndicator = (amt,cnt) => {
    if(amt%2 == 1){
        if(acceleratorMode.level > 0){
            if(elements[acceleratorMode.level+1].value >= elementData[acceleratorMode.level+1].minDecayAmt){
                return `[${lightOn.repeat(cnt)}]`;
            }else{
                return `[${lightInvalid.repeat(cnt)}]`;
            }
        }else{
            return `[${lightOn.repeat(cnt)}]`;
        }
    }else{
        return `[${lightOff.repeat(cnt)}]`;
    }
};
var updateStrobe = () => {
    for(let i=0;i<strobeUsed;i++){
        if(Math.random() <= strobeOdds[i]){
            strobeCnt[i] += 1;
        }
    }
}
var acceleratorStatus = (level, mode) => {
    let str = `Accelerator Control : ${(level % 2 == 1)?"ON":"OFF"} [${lightIndicator(level % 2,3)}]`;
    if(level % 2 == 0 || mode == 0){//off
        return `${str} ${`[-] `.repeat(strobeUsed)}`;
    }else{//on
        for(let i=0;i<strobeUsed;i++){
            str += ` ${lightIndicator(strobeCnt[i],1)}`;
        }
        return str;
    }
}
function decayElement(indx, dt){
    if(indx >= 2 && (elements[indx].value >= elementData[indx].minDecayAmt)){
        let calcCriticalConst = criticalConst - (0.00027777 * researchUpgrade[33].level);
        let rate = building[12].level * lambda * BigP(elements[indx].value,maxDecayPow + (elements[indx].value > BF(1e63)?((calcCriticalConst) * (BigL10(elements[indx].value)-63)):0));
        let isCritical = dt * rate > elements[indx].value
        if(isCritical){//critical point, happens at roughly e90
            rate = elements[indx].value * 0.99;
            HIGH_ELEMENT_CLUSTER.value += BigP(BigL10(rate),1.9);
            //addition
            elements[indx-2].value += dt * rate * yieldfactor * (elementData[indx-2].weight / elementData[indx].weight);
            elements[indx-1].value += dt * rate * yieldfactor * (elementData[indx-1].weight / elementData[indx].weight);
        }else{
            //addition
            elements[indx-2].value += dt * BigP(rate,yieldPow) * yieldfactor * (elementData[indx-2].weight / elementData[indx].weight);
            elements[indx-1].value += dt * BigP(rate,yieldPow+0.015) * yieldfactor * (elementData[indx-1].weight / elementData[indx].weight);
        }
        //hec yield
        if(elements[indx].value > BF(1e60)){
            HIGH_ELEMENT_CLUSTER.value += (BigL10(elements[indx].value)-60) * BigP(((elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor),researchUpgrade[22].level);
        }
        //cookie yield
        let cookieGain = dt * BigL10(BigP(rate,cookieYieldPow)) * (CPS/cookieYieldFactor) * terraBoost * (elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor;
        if(fusionReactor.level > 0){
            cookieGain = 0;
        }
        cookieGain = checkGainOverLimit(cookieGain);
        COOKIE.value = checkCookieOverLimit(COOKIE.value + cookieGain);
        //deletion
        elements[indx].value -= dt * rate ;
    }
}
function decayElementTest(indx, dt){
    log(`======`);
    log(`Decaying.... ${elementData[indx].fullName}, dt = ${dt}`);
    if(indx >= 2){
        let calcCriticalConst = criticalConst - (0.00027777 * researchUpgrade[33].level);
        let rate = building[12].level * lambda * BigP(elements[indx].value,maxDecayPow + (elements[indx].value > BF(1e60)?((calcCriticalConst) * (BigL10(elements[indx].value)-60)):0)), Eyield = 0;
        log(`Rate = ${rate}/s`);
        //addition
        Eyield = dt * BigP(rate,yieldPow) * yieldfactor * (elementData[indx-2].weight / elementData[indx].weight)
        log(`${elementData[indx-2].fullName} Gain = ${Eyield} (${Eyield/arrEPS[indx-2]}x)`);
        Eyield = dt * BigP(rate,yieldPow+0.02) * yieldfactor * (elementData[indx-1].weight / elementData[indx].weight)
        log(`${elementData[indx-1].fullName} Gain = ${Eyield} (${Eyield/arrEPS[indx-1]}x)`);
        //cookie yield
        let cookieGain = dt * BigL10(BigP(rate,cookieYieldPow)) * (CPS/cookieYieldFactor) * terraBoost * (elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor;
        log(`Cookie Gain, CPS = ${CPS}, Total = ${cookieGain}`);
        let hecGain = 0;
        if(elements[indx].value > BF(1e60)){
            hecGain += (BigL10(elements[indx].value)-60) * ((elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor);
        }
        hecGain = BigP(hecGain,1.1);
        log(`HEC Gain : ${hecGain}`);
        //deletion
        log(`${elementData[indx].fullName} Loss = ${dt * rate}`);
        log(`======`);
        let t = elements[indx].value / (dt * rate);
        log(`Projected Cookies(t = ${t}) = ${t * cookieGain}\nProjected HEC = ${t * hecGain}`);
    }else{
        log(`Invalid Decay!`)
    }
}
//fusion
var fusionReactor, astroDecayWF = (elementData[8].weight+elementData[7].weight+elementData[6].weight) / weightFactor;
const magnitudeTime = 20, minFusion = 645, astroYieldConst = 0.75;//time to go down 10x, 10^n C required to begin fusion, base astrofudge/s yield
const cookieLoss = Math.pow(10,(1/(magnitudeTime*10)) * -1);
var fusionStatus = (level) => {
    //0 = OFF, 1 = ON
    if(level > 0){
        if(COOKIE.value >= BigP(10,minFusion)){
            return `Fusion Control : ON [${BigL10(10+COOKIE.value) - minFusion + BigL10(elements[8].value+10)}]`;
        }else{
            return `Fusion Control : ON [XXX]`;
        }
    }else{
        return `Fusion Control : OFF [---]`;
    }
}
function fuseCookie(dt, testConst){
    let totalAstro = BigL10(elements[8].value+10);
    if(COOKIE.value < BigP(10,minFusion)){
        if(testConst)log(`not enough cookies`);
        return;
    }else{
        totalAstro += BigP(BigL10(10+COOKIE.value) - minFusion,1.11);
        let highYield = dt * astroDecayWF * totalAstro, astroYield = dt * astroYieldConst*totalAstro*arrEPS[8];
        if(testConst){
            let fusionTime = (BigL10(10+COOKIE.value) - minFusion) * magnitudeTime;
            log(`The bar is set at 10^${minFusion}`)
            log(`Total As : ${BigL10(elements[8].value+10)} + ${BigP(BigL10(10+COOKIE.value) - minFusion,1.11)} = ${totalAstro}`);
            log(`HEC Yield : ${highYield}`);
            log(`As Yield : ${astroYield}`);
            log(`Cookie Loss(set=${magnitudeTime}s, total=${fusionTime}s) = ${(1-BigP(cookieLoss,dt)) * COOKIE.value}`);
        }else{
            elements[8].value += astroYield;
            HIGH_ELEMENT_CLUSTER.value += highYield;
            COOKIE.value -= (1-BigP(cookieLoss,dt)) * COOKIE.value;
        }
    }
}

//! Bingo Center
{
    /* Documentations on Research
    {name} string - name of the upgrade
    {id} int - unique identifier
    {desc} string - description of the upgrade
    {time} int - the amount of time it takes to research(trueThyme ticks)
    {preq} arr -> {type:int} - all previous upgrade that needs to be researched
    {cost} arr -> {type:int,amount:BigNumber} - Arrays specifying costs for that upgrade
    Lists for cost types:
    0 - 8 = ["Be", "Ch", "Bg", "Su", "Jm", "Cs", "Hz", "Mn", "As"]
    9 = Cookies
    10 = Heavenly Chips
    11 = Sugar Lumps
    12 = High Elements
    13 + n :
    0 "Cursor",
    1 "Grandma",
    2 "Farm",
    3 "Mine",
    4 "Factory",
    5 "Bank",
    6 "Temple",
    7 "Wizard Tower",
    8 "Shipment",
    9 "Alchemy Lab",
    10 "Portal",
    11 "Time Machine",
    12 "Antimatter Condenser",
    13 "Prism",
    14 "Chancemaker",
    15 "Fractal Engine",
    16 "Javascript Console",
    17 "Idleverse",
    18 "Cortex Baker",
    */
}
var researchCenter, researchUpgrade = new Array(199), researchSlot = new Array(6), researchSlotID = new Array(6), researchSlotUpgrade, occupiedSlots, researchAvailable = new Array(199), maxResearchProgress = 180;
const researchDone = `Progress : Completed!`;
var researchData = [{
    id: 0, name: "Copyrighted Idea", desc: "Your first fruits of research. Although it may overlap with what other people have published, but recreating is a fine step towards something new.", time: 100, preq: [],
    cost: [{type:9,amount:BF("1e510")},{type:0,amount:BF(1.5e57)}]
},{
    id: 1, name: "An Original Idea", desc: "Finally a figment of rational imagination that can be strictly classified as \"Original\". Although it may involve a seemingly nonsensical contraption and contrived definitions and theorycraft that won\'t do much ,but hey, it\'s a milestone.", time: 300, preq: [0],
    cost: [{type:9,amount:BF("1e520")},{type:2,amount:BF(2.5e55)}]
},{
    id: 2, name: "Interdimensional Wormholes", desc: "An attempt at connecting multiple multiverses through a seemingly nonsensical and contradictory concept. Allows for a better coordination of cookie production across multiverses, but watch out for any signs of possible revolution(observable through a distinct smell of chocolate and bread)", time: 600, preq: [1],
    cost: [{type:9,amount:BF("5e520")},{type:7,amount:BF(2e45)},{type:30,amount:BF(200)}]
},{
    id: 3, name: "Saccharin-Based Sugar", desc: "This mythical sweet substance boasts a sweetness rating 500 times higher than conventional onces. Including it into sugar plantations would surely boost the sweetness of the entire empire(minus the diabetes and possible addiction to sugar, of course)", time: 1200, preq: [1],
    cost: [{type:9,amount:BF("1e530")},{type:11,amount:BF(1e7)}]
},{
    id: 4, name: "Lab-Grown Heavenly Chips", desc: "How nice of the reset button on the cube to offer a partially pressed state, allowing heavenly chips to be made continuously(now that your monkeys have figured it out). Makes a concept known as HPS exists.", time: 2400, preq: [3],
    cost: [{type:9,amount:BF("1e540")},{type:10,amount:BF("1e177")}]
},{
    id: 5, name: "101% Chocolate Mixture", desc: "A seemingly bizarre and illogical chocolate mixture consisting of more than what the space offers made through a process we can\'t describe here, but it definitely involves cocoa beans. Boosts the taste of cookies.", time: 6000, preq: [4],
    cost: [{type:9,amount:BF("1e550")},{type:11,amount:BF(5000000)},{type:1,amount:BF(1.5e58)}]
},{
    id: 6, name: "Miniaturized Time Dilation", desc: "An early effort at warping thyme, this time focusing on correcting any distortions that comes with a difference in the flow of time. Though we can\'t go big with this one, it certainly fits nicely with all the idleverses.", time: 12000, preq: [2,4],
    cost: [{type:9,amount:BF("1e540")},{type:24,amount:BF(6250)},{type:30,amount:BF(500)},{type:5,amount:BF(5e50)}]
},{
    id: 7, name: "Designer Brand Mining Drills", desc: "An overdesigned excavation marvel that somehow defies all expectations by outperforming everything we\'ve have so far with the power of hilariously complex efforts of research and something something. Multiplies EPS and CPS by 5 and reduces loss factor by 10.", time: 12000, preq: [5],
    cost: [{type:0,amount:BF(1e59)},{type:1,amount:BF(1e59/50)},{type:2,amount:BF(1e58/2500)},{type:3,amount:BF(8e53)},{type:4,amount:BF(8e53/50)},{type:5,amount:BF(8e53/2500)},{type:6,amount:BF(8e53/12500)},{type:16,amount:BF(8750)},]
},{
    id: 8, name: "Aero(Cosmo)dynamic Design for Shipments", desc: "In the space there\'s nothing there. In the atmosphere there\'s air. Both places have vastly differing conditions that is a nightmare for space rockets. Preparing an effective design for both proves to increase the productivity and reduce the waste created from entering and exiting the atmosphere. Vastly increases the CPS of Shipments and multiplies Astrofudge\'s gain by 2.5.", time: 27000, preq: [5],
    cost: [{type:9,amount:BF("1e560")},{type:21,amount:BF(8000)},{type:5,amount:BF(2.5e56)}]
},{
    id: 9, name: "Conditional Mass-Produced Goods Convergence", desc: "Most idleverses have difficulties converging to producing cookies, which slows down our Cookie Empire\'s growth. Through a clever usage of \"Higher Powers\", we can somewhat \"incentivize\" them to produce cookies instead of useless other stuffs.", time: 36000, preq: [8,6],
    cost: [{type:9,amount:BF("1e560")},{type:30,amount:BF(800)},{type:19,amount:BF(8888)},{type:6,amount:BF(3.5e54)}]
},{
    id: 10, name: "Optimization Model based off Slime Molds", desc: "Known for being able to make various mass-transit systems more effective. Bringing the same thing to the cookie production line will surely make the cookie flow better between each production stage..... at the cost of readability.", time: 54000, preq: [8],
    cost: [{type:9,amount:BF("1e570")},{type:28,amount:BF(3625)},{type:3,amount:BF(5e59)},{type:11,amount:BF(2.5e7)}]
},{
    id: 11, name: "Superprospecting", desc: "What to do when ore reserves run out? Simple, just prospect it again(hence superprospecting), surely that\'ll make more ores appear out of thick rocks. Multiplies EPS by 7.5 and reduces loss factor by 10.", time: 72000, preq: [7,10],
    cost: [{type:9,amount:BF("1e575")},{type:28,amount:BF(3000)},{type:3,amount:BF(1e60)},{type:4,amount:BF(1e60/65)},{type:5,amount:BF(1e60/BigP(65,2))},{type:6,amount:BF(1e60/BigP(65,3))},{type:7,amount:BF(1e60/BigP(65,4))},{type:8,amount:BF(1.5e9)}]
},{
    id: 12, name: "Templar Consecration", desc: "With your current capital, your ability to afford adventures to the temple has started to take over what those places have to offer. That is, until a ritual was discovered in one of its deepest chambers that looked quite like those Aztec sacrifice thingys. We don\'t know what would happen should this ritual succeed, but you the player definitely knows it.", time: 100000, preq: [6,9],
    cost: [{type:9,amount:BF("1e560")},{type:19,amount:BF(8888)},{type:14,amount:BF(9200)},{type:23,amount:BF(6666)},{type:10,amount:BF(1e185)}]
},{
    id: 13, name: "Flux Machine", desc: "Flux, either a magical substance that boosts success in literally anything, or a rate of flow through a surface or substance in physics. This machine can beat the ambiguity of the word \"Flux\" by generating them as closest to whatever the user needs as possible(WARNING : Mixture of flux may occur, please make the request as specific as possible).", time: 108000, preq: [10],
    cost: [{type:9,amount:BF("1e580")},{type:30,amount:BF(750)},{type:25,amount:BF(6500)},{type:22,amount:BF(7900)},{type:5,amount:BF(5e56)}]
},{
    id: 14, name: "Metaidleverses", desc: "Oh no! One of your metaverses has figured out how to capture other universes and put it into marbles. This is very big news, since no one here really thought of a multiverse containing multiverses. Even though their output may be miniscule compared to ours, it also somehow makes extra space for extra multiverses in a marble. Increases the capacity of Mooncandy Marbles by 10.", time: 144000, preq: [10,9],
    cost: [{type:9,amount:BF("1e580")},{type:30,amount:BF(1001)},{type:22,amount:BF(7500)},{type:10,amount:BF(1e189)},{type:26,amount:BF(5500)},{type:11,amount:BF(1.5e7)}]
},{
    id: 15, name: "Thermodynamic Ovens", desc: "Ovens! How can we forget such simple things as ovens for baking cookies! Powered by the latest in heat circulation with specially made air meant to be as conductive as possible going with specially made air circulators optimizing airflow for heat. Put away those old stuffs and put your first one in a display or something.", time: 216000, preq: [13],
    cost: [{type:9,amount:BF("1e590")},{type:0,amount:BF(1e66)},{type:4,amount:BF(1.5e59)},{type:5,amount:BF(3.5e57)},{type:8,amount:BF(3e10)},{type:14,amount:BF(9500)},{type:16,amount:BF(9500)},{type:17,amount:BF(9500)}]
},{
    id: 16, name: "Lunarcandy Marbles", desc: "An especially refined version of Mooncandy Marble, now with even more capacity for the growing demands of idleverses through the power of moon or something the space bois won\'t tell us. Increases the capacity of Mooncandy Marbles by 15.", time: 288000, preq: [11,10,14],
    cost: [{type:9,amount:BF("3e600")},{type:7,amount:BF(1.5e55)},{type:8,amount:BF(2.5e10)},{type:21,amount:BF(8250)},{type:25,amount:BF(6500)},{type:28,amount:BF(4000)},{type:30,amount:BF(1501)},{type:11,amount:BF(1.5e7)}]
},{
    id: 17, name: "Manaleaching", desc: "Manaleaching is a new technique for sapping mana out of the surroundings, empowering spells in the process. Manaleaching requires a substantial amount of Buttergold, Sugar Lumps, and our Wizard Towers to set up initially as a stable source of mana for our spellcasters. Boosts Spell Power by 10.", time: 300000, preq: [15,12,16],
    cost: [{type:9,amount:BF("2e600")},{type:11,amount:BF(4e7)},{type:13,amount:BF(10000)},{type:22,amount:BF(7500)},{type:23,amount:BF(7500)},{type:2,amount:BF(2.5e63)}]
},{
    id: 18, name: "One Mind", desc: "WARNING : THE GRANDMOTHERS ARE GROWING RESTLESS. DO NOT ENCOURAGE THEM.\nWe are one. We are many.\nUnlocks the Final Building", time: 363636, preq: [15,12],
    cost: [{type:9,amount:BF("6.66e600")},{type:14,amount:BF(6666)},{type:23,amount:BF(6666)},{type:24,amount:BF(6666)},{type:29,amount:BF(666)},{type:5,amount:BF(6.66e61)}]
},{
    id: 19, name: "Higher Elements Cluster", desc: "Lately there has been an anomaly in reading from particle accelerators. Your scientists has determined those to be atoms of elements heavier than what we\'ve seen before. Maybe harnessing them would yield even more techs that only a baker could dream of.", time: 720000, preq: [18,16],
    cost: [{type:8,amount:BF(1.5e12)},{type:5,amount:BF(7.8e60)},{type:6,amount:BF(7.5e59)},{type:7,amount:BF(3.1e57)},{type:28,amount:BF(4200)},{type:26,amount:BF(6250)},{type:25,amount:BF(7500)}]
},{
    id: 20, name: "Multiverse Eschatology", desc: "The inevitable destruction of the universe. That\'s something we couldn\'t avoid (yet), so coming up with proper plans to deal with dying universes is critical towards sustaining its rate of production. The theory produced would be most useful when used in conjunction with cortex bakers. Makes Idleverses\'s CPS approach Cortex Baker, anyhow...", time: 108000, preq: [18,16],
    cost: [{type:9,amount:BF("1e620")},{type:30,amount:BF(2024)},{type:31,amount:BF(50)},{type:24,amount:BF(7725)},{type:7,amount:BF(3e60)},{type:8,amount:BF(1.5e13)}]
},{
    id: 21, name: "Electric Sheep", desc: "A revolutionary way of dreaming where instead of dreaming various mundane scenarios that may or may not hinder the brain\'s function. The dream is replaced with mathematical wonder of complex, fractalline patterns full of complex(perhaps complete) jargon and even more incomprehensible equations, all perfect fit for a resting cortex brain. Plus you get to see some cool stuffs to. Increases the maximum amount of Cortex Baker by 250 and multiplies its CPS by 10.", time: 864000, preq: [18],
    cost: [{type:9,amount:BF("1e625")},{type:31,amount:BF(250)},{type:11,amount:BF(1e7)},{type:4,amount:BF(5.25e65)},{type:5,amount:BF(1.1e65)},{type:7,amount:BF(1.5e60)},{type:8,amount:BF(7.5e12)}]
},{
    id: 22, name: "Fusion Reactor", desc: "In order to REALLY get those HECs pumping out. We have discovered that somehow fusing COOKIES together would do it, especially since all of the other elements are being stretched to the limits(thanks to our research efforts). Unlocks Fusion Reactors, and perhaps a way to FUSE elements soon?", time: 144000, preq: [11,19,20],
    cost: [{type:9,amount:BF("1e650")},{type:10,amount:BF("5e213")},{type:25,amount:BF(7650)},{type:0,amount:BF("5e80")},{type:4,amount:BF("2.6e75")},{type:7,amount:BF("2.1e65")},{type:8,amount:BF("1.1e13")},{type:12,amount:BF(250000)},]
},{
    id: 23, name: "Molecular Mining", desc: "The peak of mining. Separating everything from the ground into its molecules and separate them into various elements(mostly useless normal ones omg why), it\'s a surefire way of guaranteeing no loss from the refinement process that seems to dispose of a tiny bit of the real thing(but they add up though).", time: 1260000, preq: [19],
    cost: [{type:9,amount:BF("1e650")},{type:16,amount:BF(10000)},{type:0,amount:BF("4e73")},{type:1,amount:BF("2e72")},{type:6,amount:BF("6e63")},{type:7,amount:BF("2.7e61")},{type:12,amount:BF(10000)},]
},{
    id: 24, name: "Arcane Sugar", desc: "The kind of sugar many would stay the hell away from. But you don\'t care about that, do you?", time: 1234567, preq: [18],
    cost: [{type:9,amount:BF("1.23e645")},{type:11,amount:BF(2.5e7)},{type:2,amount:BF("7.777e83")},{type:3,amount:BF("5.555e81")},{type:12,amount:BF(1000000)},{type:14,amount:BF(10000)},]
},{
    id: 25, name: "E >> 0", desc: "The ultimate solution to \"Why does everything fade into nothing at the end\". It truly doesn\'t make any sense to a layman, but to those scaredy-cats universe doomers it sure invalidates them.", time: 805422, preq: [20],
    cost: [{type:9,amount:BF("2.22e652")},{type:7,amount:BF("1.11e78")},{type:6,amount:BF(2.22e80)},{type:5,amount:BF("2.22e82")},{type:12,amount:BF(444444)},{type:25,amount:BF(2500)},{type:27,amount:BF(2500)},{type:30,amount:BF(2500)}]
},{
    id: 26, name: "W.O.K.E.", desc: "One of the main inhibitors of the CT(Cookie Thinking) functions is the neverending torrent of intrusive thoughts that would rudely barge in without consent. The most common of such thoughts is about political nonsense that only serves to distract people from real action(in the real world). Staying W.O.K.E.(full name redacted) would serve as a way to transcend those though a common realization(which is also redacted). Increases the maximum amount of Cortex Baker by 300 and multiplies its CPS by 10.", time: 1208133, preq: [21],
    cost: [{type:9,amount:BF("3.33e653")},{type:4,amount:BF(3.33e83)},{type:7,amount:BF("1.333e79")},{type:18,amount:BF(10400)},{type:29,amount:BF(3725)},{type:12,amount:BF(555555)},{type:31,amount:BF(500)},]
},{
    id: 27, name: "Communal Brainsweep", desc: "WARN1NG : PR0CEED1NG ANY FURTHER IN SC1ENT1F1C RES3ARCH MAY HAVE UN3XP3CTED RE5ULTS. Y0U HAVE BEEN WARNED.\nRemoves another layer of limit of the Cookie Empire, at a cost of even more unstable environment. Buffs grandmas by who knows what.", time: 1666666, preq: [26,18],
    cost: [{type:9,amount:BF("1e656")},{type:11,amount:BF(6.6e7)},{type:4,amount:BF("6.66e90")},{type:6,amount:BF(6.66e83)},{type:7,amount:BF(6.66e79)},{type:8,amount:BF(6.66e17)},{type:12,amount:BF(666666)},{type:14,amount:BF(10759)}]
},{
    id: 28, name: "Mana Conviencetrons", desc: "By nature, mana usually all float away into thin air, making spells needlessly tedious to cast, and its effects severely hindered. Through the application of Mana Leaching and some recent innovations, we can now capture those runaway mana and put them into where it should be! Boosts Spell Power by 15.", time: 900000, preq: [17],
    cost: [{type:20,amount:BF(10000)},{type:11,amount:BF(1e8)},{type:2,amount:BF(5e91)},{type:3,amount:BF(5e91)},{type:4,amount:BF(5e91)},{type:8,amount:BF(5e17)},{type:12,amount:BF(2222222)}]
},{
    id: 29, name: "Mechanized Fabrications", desc: "A marvel of machine construction whose uses seem infinite. Proven to be exceptionally useful for Spaced-based usage and improving throughput of power surging across all buildings. Also makes whoever carefully reading all of this have a cookieful day.", time: 1750000, preq: [27],
    cost: [{type:9,amount:BF("1e675")},{type:17,amount:BF(10900)},{type:28,amount:BF(5300)},{type:0,amount:BF(4.5e94)},{type:4,amount:BF(1e91)},{type:5,amount:BF(2.5e90)},{type:7,amount:BF(2.75e82)},{type:12,amount:BF(1e7)}]
},{
    id: 30, name: "The Montessori Method", desc: "Nurturing new Cortex Bakers is proven to be way more efficient than fixing all the existing ones. With the Montessori Method of Education implemented, it can boost the overall efficiency of brains through thorough and concise development throughout all mental aspects. Also makes it less likely to antagonize each other. Increases the maximum amount of Cortex Baker by 250 and multiplies its CPS by 10.", time: 1500000, preq: [27,26],
    cost: [{type:9,amount:BF("1e673")},{type:10,amount:BF("1e221")},{type:31,amount:BF(750)},{type:2,amount:BF(1e91)},{type:3,amount:BF(5e89)},{type:12,amount:BF(2.5e6)}]
},{
    id: 31, name: "Spacellic Materializers", desc: "From E>>0 research, it has been discovered that the method of creating something from nothing is really possible in our universe. A truly new method of getting even more elements from the same earth. Adds additional levels to Extraterrestrial Excavators, Excavator, and Mining Modules. Also allows the power of Terraform Buff to affect excavations.", time: 2000000, preq: [23,29],
    cost: [{type:9,amount:BF("1e680")},{type:3,amount:BF(5e92)},{type:4,amount:BF(1e93)},{type:5,amount:BF(5e92)},{type:6,amount:BF(1e88)},{type:7,amount:BF(1.66e85)},{type:8,amount:BF(5e22)},{type:12,amount:BF(3.5e7)}]
},{
    id: 32, name: "Anti-Conspiratorial-Grandmatriachs Program", desc: "A personal project about pushing grandmas away from your array of cortex brains. Even though the gains may be questionable from the outside, but every bit helps! Increases the maximum amount of Cortex Baker by 50.\nNOTE : CANNOT BE INITIATED IN PRESENCE OF ANY ELDERLY INDIVIDUAL AND THEIR INFLUENCE", time: 2222222, preq: [27],
    cost: [{type:9,amount:BF("1e690")},{type:31,amount:BF(1050)},{type:30,amount:BF(3125)},{type:29,amount:BF(4340)},{type:28,amount:BF(5570)},{type:4,amount:BF(7.77e92)},{type:12,amount:BF(17777777)}]
},{
    id: 33, name: "Aberrant Decay", desc: "Tweaking the laws of physics JUSSSSSSSSSSSSSSSSST a bit might be the key to our perplexing properties of elements suddenly disappearing into nothingness past a certain point(well, more like an ever-increasing diminishing returns). Reduces the critical penalty constant slightly.", time: 2121212, preq: [22,29],
    cost: [{type:27,amount:BF(3600)},{type:0,amount:BF(2e97)},{type:1,amount:BF(5e95)},{type:2,amount:BF(1.25e94)},{type:7,amount:BF(6.25e85)},{type:8,amount:BF(5e22)},{type:12,amount:BF(12345678)}]
},{
    id: 34, name: "Elder Shades", desc: "WARNING : TO CREATE THIS ITEM WOULD BE TO HANG THE FATES OF THIS UNIVERSE AND 5XXXXX OTHER MULTIVERSES IN BALANCE UNTIL THE UNDERLYING CAUSE HAS BEEN RESOLVED\nENTANGLEMENT CODE : ORT - EXISTENTIAL\nLOCUS CODE : 1, 16\nJust a cool sunglasses, what more could it possibly be?", time: 1725634, preq: [27],
    cost: [{type:9,amount:BF("7e700")},{type:11,amount:BF(66666666)},{type:8,amount:BF(5e27)},{type:12,amount:BF(44444444)}]
},{
    id: 35, name: "Ephemeral Restoration", desc: "Threading the fine line between \"People investing in your business\" and \"People we have under our business\" makes for a great way to still have buildings being boosted instead of being assimilated. Makes Investment Openings be available again", time: 3217654, preq: [34],
    cost: [{type:9,amount:BF("1e710")},{type:11,amount:BF(1e8)},{type:4,amount:BF(1e101)},{type:5,amount:BF(2e99)},{type:6,amount:BF(5e97)},{type:7,amount:BF(1e96)},{type:8,amount:BF(6e27)},{type:12,amount:BF(50000000)}]
},{
    id: 36, name: "Everywhere at the End of Cookies", desc: "This research is without a description", time: 260355, preq: [35],
    cost: [{type:9,amount:BF("1e730")},{type:0,amount:BF(1e108)}]
},{
    id: 37, name: "Unshackled Heavenly Upgrades", desc: "Unlocks the final heavenly upgrade, alongside extending the limits of what heavenly upgrades could do", time: 360000*6, preq: [36],
    cost: [{type:9,amount:BF("1e775")},{type:10,amount:BF("1e256")},{type:12,amount:BF(5e7)}]
},{
    id: 38, name: "Sweetness Abandon", desc: "Yet another research about taking sweetness to even more UNHINGED levels. Increases the maximum building sugar lump limit by 50.", time: 360000*7, preq: [36],
    cost: [{type:9,amount:BF("1e800")},{type:11,amount:BF(5e8)},{type:12,amount:BF(1e8)}]
}];
var getCostSymbol = (indx) => {
    if(indx < 9){
        return elementData[indx].symbol;
    }else if(indx >= 13){
        return `B[${indx-13}]`;
    }else{
        switch(indx){
            case 9:return "C";break;
            case 10:return "H";break;
            case 11:return "L";break;
            case 12:return "HEC";break;
        }
    }
}
var correctDigit = (num,digit) => {
    if(num >= 1){
        let cnt = Math.floor(Math.log10(num)) + 1;
        return `${"0".repeat(digit-cnt)}${num}`;
    }else{
        return "0".repeat(digit);
    }
}
var getTimeString = (ticks) => {
    let hours = Math.floor(ticks/36000);ticks %= 36000;
    let minutes = Math.floor(ticks/600);ticks %= 600;
    let seconds = Math.floor(ticks/10);ticks %= 10;
    return `${correctDigit(hours,2)}:${correctDigit(minutes,2)}:${correctDigit(seconds,2)}.${ticks}`;
}
var isValidCostObj = (cost) => Object.hasOwn(cost,'type') && Object.hasOwn(cost,'amount');
var researchBegin = (indx) => {
    if(indx < 0 || indx >= researchData.length){
        return;
    }
    if(researchUpgrade[indx].level > 0){
        log("completed");
        return;
    }
    //check if can begin
    if(occupiedSlots.level < researchSlotUpgrade.level + 1){
        //check afford -> deduct
        if(canAffordResearch(researchData[indx].cost)){
            //deduct
            if(indx == 32 && (covenant.level + building[1].level > 0)){
                log(`lol no`);
                return;
            }
            for(let i=0,j=researchData[indx].cost.length;i<j;i++){
                if(isValidCostObj(researchData[indx].cost[i])){
                    let index = researchData[indx].cost[i].type, val = researchData[indx].cost[i].amount;
                    if(index < 9){
                        elements[index].value -= val;
                    }else if(index >= 13){
                        building[index-13].level -= Math.round(val.toNumber());
                    }else{
                        switch(index){
                            case 9:COOKIE.value -= val;break;
                            case 10:HEAVENLY_CHIP.value -= val;break;
                            case 11:SUGAR_LUMP.value -= val;break;
                            case 12:HIGH_ELEMENT_CLUSTER.value -= val ;break;
                        }
                    }
                }
            }
            //set levels
            researchSlot[occupiedSlots.level].level = researchData[indx].time * (1-(0.01*heavenInspire.level));
            researchSlotID[occupiedSlots.level].level = indx;
            occupiedSlots.level += 1;
            getResearching();
        }else{
            log(`too poor m8`);
            return;
        }
    }else{
        log(`full slot`);
    }
    updateResearchButtonText();
}
var updateResearchText = (indx,order,val) => {
    if(order == 1){
        mainUpgradeStack[indx].content.children[1].content.text = val;
    }
    mainUpgradeStack[indx].content.children[order].text = val;
}
var getResearchProgress = () => {
    if(occupiedSlots.level > 0){
        for(let i=0;i<occupiedSlots.level;i++){
            let id = researchSlotID[i].level;
            mainUpgradeStack[id].content.children[0].textColor = COLOR_YELLOW;
            updateResearchText(id,2,`Researching : ${getCollectionBar((researchData[id].time - researchSlot[i].level)/(researchData[id].time/maxResearchProgress),maxResearchProgress)}`);
        }
    }
}
var updateResearchLabel = () => {
    for(let i=0;i<researchData.length;i++){
        if(researchUpgrade[i].level > 0){
            mainUpgradeStack[i].content.children[0].textColor = COLOR_LIGHTBLUE;
        }else if(canAffordResearch(researchData[i].cost)){
            mainUpgradeStack[i].content.children[0].textColor = COLOR_GREEN;
        }else{
            mainUpgradeStack[i].content.children[0].textColor = COLOR_WHITE;
        }
        if(isResearchUnlock(i)){
            researchAvailable[i] = true;
            updateResearchText(i,0,`[${i+1}] ${researchData[i].name}`);
            updateResearchText(i,1,`${researchData[i].desc}\nTime Required : ${getTimeString(researchData[i].time)}`);
            updateResearchText(i,2,`Progress : ${getCollectionBar(0,maxResearchProgress)}`);
            if(researchUpgrade[i].level > 0){
                updateResearchText(i,2,researchDone);
            }
        }else{
            researchAvailable[i] = false;
            updateResearchText(i,0,`[${i+1}] ${"?".repeat(researchData[i].name.length)}`);
            updateResearchText(i,1,`Undiscovered, research further and perhaps this will be discovered`);
            updateResearchText(i,2,``);
        }
        if(i==0 && (COOKIE.value < BF("1e500") && researchUpgrade[0].level == 0)){
            researchAvailable[0] = false;
            updateResearchText(0,0,`[${i+1}] ${"?".repeat(researchData[i].name.length)}`);
            updateResearchText(0,1,`Unfortunately it seems that you don\'t have enough capital at hand to begin any research at this moment. Come back when you have more cookies.`);
            updateResearchText(0,2,``);
        }
    }
}
var debugUnlockResearch = false;
function isResearchUnlock(indx){
    let ret = true;
    if(indx == 0){
        return true;
    }
    if(debugUnlockResearch && indx <= 33){
        return true;
    }
    for(let i=0,j=researchData[indx].preq.length;i<j;i++){
        ret &= (researchUpgrade[researchData[indx].preq[i]].level > 0);
    }
    return ret;
}
function canAffordCost(costObj){
    if(isValidCostObj(costObj)){
        let indx = costObj.type,val = costObj.amount;
        if(indx < 9){
            return (elements[indx].value >= val);
        }else if(indx >= 13){
            return (building[indx-13].level >= val);
        }else{
            switch(indx){
                case 9:return (COOKIE.value >= val);break;
                case 10:return (HEAVENLY_CHIP.value >= val);break;
                case 11:return (SUGAR_LUMP.value >= val);break;
                case 12:return (HIGH_ELEMENT_CLUSTER.value >= val);break;
            }
        }
    }else{
        return false;
    }
}
function canAffordResearch(costs){
    let ret = true;
    for(let i=0;i<costs.length;i++){
        if(isValidCostObj(costs[i])){
           ret &= canAffordCost(costs[i]);
        }
    }
    return ret;
}

//! Lumps
const lumpTickChance = 5000;

//! Primary Vairables
var COOKIE, HEAVENLY_CHIP, SUGAR_LUMP, EXPO_BAR, HIGH_ELEMENT_CLUSTER;
var CHAOS_FLAG, CHAOS_STAGE, CHAOS_PERSISTENT_STAGE, UNINSTALL, PROGRAM, PROGRAM1, PROGRAM2, PROGRAM3, PROGRAM4, HEAVEN, HEAVEN_COUNTDOWN, HEAVEN_RECORD, FAKE_NORMAL, FAKE_PERM;
var chaosCharSet = "01234567891337ABCDEFYHIJKLMZOPQRSTUVWXTZabcdefyhiklmzopqrstuvwxyzleetLEET";
var chaosLen = chaosCharSet.length;
var genChaosText = (str) => {
    let ret = "", rand = 0;
    for(let i=0,j=str.length;i<j;i+=3){
        rand = RandI(Math.pow(chaosLen,3));
        ret += `${chaosCharSet[Math.floor(rand/Math.pow(chaosLen,2))]}${chaosCharSet[(Math.floor(rand/chaosLen))%chaosLen]}${chaosCharSet[rand%chaosLen]}`;
    }
    return ret;
}
function updateChaosBuildingName(){
    for(let i=0;i<2;i++){
        for(let j=0;j<19;j++){
            buildingData[j].names[4+i]=genChaosText(buildingData[j].names[2+i]);
        }
    }
}
// var isCurrencyVisible = (indx) => {
//     if(indx != 14){
//         return indx <= 2;
//     }else{
//         return researchUpgrade[19].level > 0;
//     }
// };
var thyme, normalUpgradeMenu, permUpgradeMenu, trueThyme;
const cookieLimit = [BF("1e617"),BF("1e658"),BF("1e707"),BF("9.99e749"),BF("1e10000")];
const CPSLimit = [BF("1e617"),BF("1e658")/10,BF("1e707")/1000,BF("9.99e749")/10,BF("1e10000")];
var getLimitFlags = () => Math.min(4,researchUpgrade[18].level + researchUpgrade[27].level + Math.min(1,CHAOS_STAGE.level) + ((CHAOS_PERSISTENT_STAGE.level >= 2)?2:0));
var checkCookieOverLimit = (cookie) => {
    return BigMin(cookie,cookieLimit[getLimitFlags()]);
}
var checkGainOverLimit = (gain) => {
    return BigMin(gain,CPSLimit[getLimitFlags()]);
}

//! Heavenly Upgrades
var cookieTinUnlock, CookieH, CookieR, CookieS, CookieC, DivineD, CookieTau, TerraInf, TwinGates, ConjureBuild, ChronosAge, R9Box, conGrow, SpellStack, Empower, DivineOneHalf, heavenInspire;//"Unlocks a new set of cookies that are more powerful than their normal counterparts, ooooooooo what could it be?"
var heavenlyUpgradeData = [
    {
        uid: 1,
        name: "Mystery Cookie Tin",
        info: "Unlocks a new set of cookies that are more powerful than their normal counterparts",
        costModel: new ExponentialCost(25, ML2(1e6)),
        maxLevel: cookieTinInfo.length,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 2,
        name: "Heavenly Cookie",
        info: "You gain more CPS the more HC you have",
        costModel: new ConstantCost(500),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 3,
        name: "Sugar Crystal Cookie",
        info: "This cookie gets tastier the more sweetness you have",
        costModel: new ConstantCost(15000),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 4,
        name: "Cookie Cookie",
        info: "This cookie makes you get more cookies the more cookies you have",
        costModel: new ConstantCost(1e13),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 5,
        name: "Divine Doubling ($D_{d}$)",
        info: "Doubles your CPS",
        maxLevel: 0,
        costModel: new ExponentialCost(1e14, ML2(1e10)),
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 6,
        name: "Tauonium Cookie",
        info: "An experimental type of antimatter-based cookie that is based on tau",
        costModel: new ConstantCost(8e17),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 7,
        name: "Terra-Infinity $(T_{\\infty})$",
        info: "Makes the ground forever bountiful with materials",
        costModel: new ExponentialCost(1e55, ML2(1e10)),
        maxLevel: 7,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 8,
        name: "Chronos Aging",
        info: "Transmute the power of Yggdrasil to all your buildings",
        costModel: new ConstantCost(5e70),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 9,
        name: "Blessing of the Capital",
        info: "Your investment returns increase, stonks",
        costModel: new ExponentialCost(4.57e62, ML2(8)),
        maxLevel: 3,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 10,
        name: "Twin Gates of Transcendence",
        info: "Makes Heavenly Chips actually boost your cookie production",
        costModel: new ConstantCost(1e65),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 11,
        name: "Box of R9 $(R_{9})$",
        info: `A very stange and mathematical box seemingly full of ${game.sigmaTotal} students`,
        costModel: new ExponentialCost(1e80, ML2(1000)),
        maxLevel: 3,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 12,
        name: "Continuos Growth",
        info: "Certain high-tier buildings get more powerful the more of them you have",
        costModel: new CompositeCost(5, new ExponentialCost(1e106, ML2(1e11)), new CompositeCost(2,new ExponentialCost(1e233,ML2(10)),new ExponentialCost(1e255,ML2(1000)))),
        maxLevel: 10,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 13,
        name: "Spell Cast Layering",
        info: "Allows multiples of the same spell to be casted, and slightly empowers every spell",
        costModel: new ExponentialCost(1e109, ML2(1e5)),
        maxLevel: 69,
        onBought: (amount) => {updateSpellLayer();updateGlobalMult();}
    },{
        uid: 14,
        name: "Empowerments of Buildings",
        info: "Increases how fast $P$ grows",
        costModel: new CompositeCost(3, new ExponentialCost(5e130, ML2(1e10)), new CompositeCost(3,new ExponentialCost(1e240,ML2(10)),new ExponentialCost(1e256,ML2(500)))),
        maxLevel: 6,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 15,
        name: "Heavenly Inspiration",
        info: "Cuts the time cost of researches down by 1\\%\\ per level",
        costModel: new ExponentialCost(2.22e190, ML2(1e5)),
        maxLevel: 30,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 16,
        name: "Unshackled Powering",
        info: "Multiplies your cookie production by 1.5",
        costModel: new ExponentialCost(1e250, ML2(10)),
        maxLevel: 0,
        onBought: (amount) => {updateGlobalMult();}
    },
];

//!==MILESTONES==
var superP, superL, superC;
// P Exponent, L Mult Increase, C Power Increase

//!==ACHIEVEMENTS==
{
    var ca = new Array(30), achCountTV = BF(0), achCountFeatTV = BF(0);
    var checkAchBase = (chk, cnt) => {
        if (chk()) {
            achCount += cnt;
            achCountStore.setValue(achCount);
            updateGlobalMult();
            log("Achievement!");
            return true;
        } else {
            return false;
        }
    };
    var caName = [
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
        "Is there still more, perhaps?"
    ];
    var cookiesAchievement, CPSAchievement;
    var cookiesAchievementCatName = "Cookies Baked";
    var caReq = [
        1, 3, 6, 12, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450,
        500, 550, 600, 650, 675, 700, 725, 750, 800
    ];
    var cpsa = new Array(30);
    var cpsaName = [
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
        "Cookie Idler Speedrun pubMult-100% 1 collection WR|SR|PB",
        "Overkill'd"
    ];
    var cpsaReq = [
        1, 2, 5, 11, 24, 49, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 350,
        400, 450, 500, 550, 600, 650, 700, 725, 751, 775
    ];
    var lumpAch = new Array(15); // 10 tiers
    var lumpAchCat;
    var lumpAchName = [
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
        "Not overpushing anymore",
        "Caramelized"
    ];
    var lumpAchReq = [1, 10, 50, 100, 500, 1000, 10000, 100000, 1000000, 10000000,100000000,1e9,1e10];
    var perkAchReq = [1, 5, 25, 50, 95];
    var perkAchName = ["See the Exponent", "Touch the Exponent", "Feel the Exponent", "Cherish the Exponent", "Forfeit all mortal possessions to the Exponent"];
    var perkAch = new Array(10);
    var SpellAchievementCat;
    var spellCastAchievement = new Array(99), totalCastAchievement = new Array(9);
    var totalSpellAchReq = [10, 50, 100, 500, 1000, 5000, 10000], spellAchName = ["Neophyte", "Acolyte", "Adept", "I\'m a what?", "Master of Spells", "Grand Master of Spells", "Great Sage of Spells"];
    //const perkAchReq = [1, 5, 25, 50, 95];
    var BuildingAchievement;
    var buiAch1 = new Array(20);// 100
    var buiAch2 = new Array(20);// 1000
    var buiAch3 = new Array(20);// 5000
    var buiAch4 = new Array(20);// 10K, Very endgame content right there
    var buiLumpAch = new Array(20);
    var featAchievement1, featAch1 = new Array(99), sigmaCurseof;
    //unlock - only leave a conditional, the init will take care of the rest
    var featAchievementData = [
        {order: 0, name: "Super Idler", desc: "Have your cookies exceed 1 day worth of CPS while having 0 levels of Terraform upgrade", weight: 2, secretClue : "",
         unlock: () => ((CPS > BF(1e3)) && (COOKIE.value).abs() > BF(86400) * CPS) && (terra.level == 0),},
        {order: 1, name: "Hyper Idler", desc: "Have your cookies exceed 1 year worth of CPS while having 0 levels of Terraform upgrade\nhow in the world did you even managed that anyway", weight: 3, secretClue : "Gaseous",
         unlock: () => ((CPS > BF(1e3)) && (COOKIE.value).abs() > BF(0x1e13380) * CPS) && (terra.level == 0),},
        {order: 2, name: "Speed Baking I", desc: "Get 1e25 CPS within true 1 minute of publishing", weight: 1, secretClue : "",
         unlock: () => (CPS >= BF(1e25)) && (thyme.level <= 600),},
        {order: 3, name: "Speed Baking II", desc: "Get 1e50 CPS within true 1 minute of publishing", weight: 2, secretClue : "",
         unlock: () => (CPS >= BF(1e50)) && (thyme.level <= 600),},
        {order: 4, name: "Speed Baking III", desc: "Get 1e100 CPS within true 30 seconds of publishing", weight: 3, secretClue : "",
         unlock: () => (CPS >= BF(1e100)) && (thyme.level <= 300),},
        {order: 5, name: "Speed Baking IV", desc: "Get 1e200 CPS within true 30 seconds of publishing", weight: 4, secretClue : "",
         unlock: () => (CPS >= BF(1e200)) && (thyme.level <= 300),},
        {order: 6, name: "Speed Baking V", desc: "Get 1e300 CPS within true 15 seconds of publishing\n\nhaha speed goes brrrrrr", weight: 5, secretClue : "",
         unlock: () => (CPS >= BF("1e300")) && (thyme.level <= 150),},
        {order: 7, name: "Speed Baking VI", desc: "Get 1e500 Cookies within true 10 seconds of publishing\n\nwould you please just slow down?", weight: 5, secretClue : "we fast as 5",
         unlock: () => (COOKIE.value >= BF("1e500")) && (thyme.level <= 100),},
        {order: 8, name: "Speed Baking VII", desc: "Get 1e600 Cookies within true 7.5 seconds of publishing\n\nwhat the", weight: 5, secretClue : "we fast as 6",
         unlock: () => (COOKIE.value >= BF("1e600")) && (thyme.level <= 75),},
        {order: 9, name: "Speed Baking VIII", desc: "Get 1e700 Cookies within true 5 second of publishing\n\nplease stop this isn't funny anymore", weight: 6, secretClue : "we fast as 7",
         unlock: () => (COOKIE.value >= BF("1e700")) && (thyme.level <= 50),},
        {order: 10, name: "Sugar lump enjoyer", desc: "Have the dominant building have 50 levels of sugar lump upgrade", weight: 2, secretClue : "",
         unlock: () => (buildingLump[dominate].level >= 50),},
        {order: 11, name: "Sugar lump addict", desc: "Have the dominant building have 100 levels of sugar lump upgrade\n\n you have issues", weight: 3, secretClue : "",
         unlock: () => (buildingLump[dominate].level >= 100),},
        {order: 12, name: "Overpusher", desc: "Have the dominant building have 150 levels of sugar lump upgrade\n\n stop overpushing and get back to progressing, please", weight: 4, secretClue : "",
         unlock: () => (buildingLump[dominate].level >= 150),},
        {order: 13, name: "Quite Lacking Today, aren't we?", desc: "Get e50 cookies without buying a single level of milk and NORMAL cookie flavor", weight: 1, secretClue : "Forget something?",
         unlock: () => ((COOKIE.value).abs() >= BF(1e50)) && (kitty.level == 0) && (cookieTasty.level == 0),},
        {order: 14, name: "More of the Same", desc: "Get e100 cookies without buying a single level of milk and cookie flavor", weight: 2, secretClue : "Forget something?",
         unlock: () => ((COOKIE.value).abs() >= BF(1e100)) && (kitty.level == 0) && (cookieTasty.level == 0),},
        {order: 15, name: "Pure Chocolate Taste", desc: "Get e200 cookies without buying a single level of milk and cookie flavor", weight: 2, secretClue : "Forget something?",
         unlock: () => ((COOKIE.value).abs() >= BF(1e200)) && (kitty.level == 0) && (cookieTasty.level == 0),},
        {order: 16, name: "Pure Vanilla Taste", desc: "Get e250 cookies without a single level of milk, cookie flavors, and a LOT more....\n\nThis is NOT a CRK reference", weight: 3, secretClue : "forgor something??? 💀",
         unlock: () => (((COOKIE.value).abs() >= BF(1e250)) && (kitty.level == 0) && (cookieTasty.level == 0) && (terra.level == 0) && (ygg.level == 0) && (archaeology.level == 0) && (invest.level == 0) && (recom.level == 0) && (covenant.level == 0)),},
        {order: 17, name: "nice", desc: "Get 6.9 heavenly chips in any order of magnitude (decimals accepted)", weight: 2, secretClue : "nice",
         unlock: () => {
            let temp = TS10(HEAVENLY_CHIP.value);
            return (temp[0] == '6') && ((temp[2] == '9') || temp[1] == '9');
        },},
        {order: 18, name: "you won the internet", desc: "Have Temple+Alchemy Lab = 1337", weight: 2, secretClue : "[ni] + [ce] = leet",
         unlock: () => ((building[6].level > 0) && (building[9].level > 0) && (building[6].level + building[9].level) == 0x539),},
        {order: 19, name: "Sigma Fingers", desc: "Collect 1e100 Cookies from Cursors with only a single cursor\nThis feat also unlocks a special building display mode, find it out :)", weight: 2, secretClue : "Doing a 100 with only a single 0",
         unlock: () => (generateCookie(0,5,terraBoost) >= BF(1e100)) && (building[0].level == 1),},
        {order: 20, name: "Time is speed", desc: "Dilate 15 whole seconds in a single tick", weight: 2, secretClue : "Got any quarters to spare?",
         unlock: () => (Dilate() >= 150),},
        {order: 21, name: "Time is rickroll", desc: "Dilate an entire video of Rick Astley - Never Gonna Give You Up (Official Music Video) into a SINGLE tick (which is 312 seconds in a SINGLE tick)\n\nAlso check out https://www.youtube.com/watch?v=oHg5SJYRHA0, very cool video", weight: 6, secretClue : "This achievement won\'t let you down",
         unlock: () => (Dilate() >= 3120),},
        {order: 22, name: "JJJJACKPOTTTTTTT", desc: "Get the biggest W from exploring an temple", weight: 1, secretClue : "Just get lucky!",
         unlock: () => templeJ,},
        {order: 23, name: "Indecisive", desc: "100 choices and yet you still can\'t decide on it", weight: 1, secretClue : "Identity Crisis",
         unlock: () => (indecide >= 100),},
        {order: 24, name: "Happy 2024!", desc: "Play this theory during the new years\n\nWishing you the best of 2024!", weight: 2, secretClue : "",
         unlock: () => {return true;},},
        {order: 25, name: "stonks", desc: "Get +200 from Investments\n\nit\'s green all the way", weight: 2, secretClue : "",
         unlock: () => {return stonkFlag;},},
        {order: 26, name: "mega stonks", desc: "Get +1000 from Investments\n\nhopefully not a bubble :)", weight: 5, secretClue : "",
         unlock: () => {return megaStonkFlag;},},
        {order: 27, name: "Just Wrong", desc: "Sell all of your grandmas\n\n\"I thought you loved me.\"", weight: 2, secretClue : "",
         unlock: () => {return wrongFlag;},},
    ];
}
function buildFeatAch(featAchObj){
    if(featAchObj.secretClue != ""){
        return theory.createSecretAchievement(800 + featAchObj.order,featAchievement1,featAchObj.name,`[${featAchObj.weight}] - ${featAchObj.desc}`,featAchObj.secretClue,() => checkAchBase(featAchObj.unlock,featAchObj.weight));
    }else{
        return theory.createAchievement(800 + featAchObj.order,featAchievement1,featAchObj.name,`[${featAchObj.weight}] - ${featAchObj.desc}`,() => checkAchBase(featAchObj.unlock,featAchObj.weight));
    }
}
//for flag-based feats
var stonkFlag = false, megaStonkFlag = false;

//!==LORE==
var chapter = new Array(69), chapterUnlock = new Array(69), usedStory = 22;
let loreData = [{
    order:0,title:"Wake and Bake",content:["Ugh, finally graduated from Gilles Academy","Parents coerced me here, been pestering them for quite a while now","Barely survived all those theories that would make anyone\'s head explode","I can only hope I would encounter no more maths"," ","Living there was fine, only the cookies are an absolute mess","As a cookie lover I find those to be absolute travesty","Why are they even produced??????????","No concern, I must return to my ovens at once","But there\'s a curious cube there..."," ","The number 0 stands intimidating, and perhaps a button resembling a big cookie","One soft click, and a cookie popped out of nowhere, and it\'s some real good stuff.","I could make a living out of those, only that I need a clicker to produce them automatically.","Manual Labor sucks"], unlock: () => true,prefix:"4/4/2024"
},{
    order:1,title:"Startup",content:["Sitting with only clickers is boring, can bArely match the demands of customers","God gossip sure spreads fast about my good cookies","And I\'m adding new varieties every now and then, somehow makes it sell better","The cube seems to hint about having more helpers, symbols strangely reminding me of grandmas and facilities","Posted some flyers for assistant \"Bakers\"","Wait, are grandmas really showing up here only?","Can\'t complain about their baking skills and work ethics though","Easily puts my clickers to shame"," ","But grandmas are\'t only showing up here","I can smell the faint smell of milk.....",".....and kittens"],unlock:() => building[1].level > 0,prefix:"5/4/2024"
},{
    order:2,title:"Factory",content:["Business is growing steady","Managed to get hold of farMs and mines","Pleasantly surprised about places you can find cookies"," ","Our funds steadily increase, therefore expanding workforces and land assets for cookies","We even have enough to build and operate our very first factory","Mass production of cookies and getting the first taste of sweet retribution","Watch out inferior cookies, I\'M COMING AFTER YOU"],unlock:() => building[4].level > 0,prefix:"12/4/2024"
},{
    order:3,title:"Knead for Speed",content:["At","A","Roadblock"," ","Faced with increasing costs for expanding the business","Like, 10 Octillion Cookies for a new building????????","I can barely scrape together a Sextillion myself","And all the other coMpanies are pumping out like, Centillion, Hundred Quinsexagintacentillion Cookies?????","Like,","how."," ","Back to the cube, haven\'t noticed the bottom is clickable","The Big \"R\" Button, perhaps Resetting should somehow boost my business","...","And I\'m back at my couch, staring at the cube","My hands feel slightly cold and seems to glow a bit","Marbles, perhaps I could find a use for those, there might be places I can insert them"],unlock:() => HEAVENLY_CHIP.value >= BF(1),prefix:"1/5/2024"
},{
    order:4,title:"Cult Following",content:["Success!","At long last people are starting to stan my cookies","I know it had to happen, for my cookies is the best","Had some employees snoop around and perhaps a temple should satisfy their desires...","...for a cookie deity"," ","Heard there\'s a chocolate temple out in the jungle of Flourlandia","Apparently full of arcane lore and strange items all rElated to cookies","Don\'t have enough to sponsor an exploration right now, permits are insanely priced for normal human beings"],unlock:() => building[6].level > 0,prefix:"15/6/2024"
},{
    order:5,title:"Restlessness",content:["With the conGlomerate so large","There\'s bound to be oppression","Fearing for the worst, I brainstormed a way to prevent such scenarios"," ","They pointed me to the grandmas, the first who joined me","Talking with them over a cup of camomile tea, I proposed the covenant","For the eternal existence of my cookie empire","At the price of assimilating my buildings into them","After all, they\'ll be better bakers than any other monkeys will ever be","And there is no reward without risk"," ","Or","There","Is?"],unlock:() => covenant.level > 0,prefix:"27/8/2024"
},{
    order:6,title:"Mother Nature",content:["Alchemy Labs, a place to turn useless trash into cookies and only cookies","A way of evading the laws of reality where everything returns to nothing"," ","Nature","Having the upper hand","Chose disaster as a means to uphold the law","But how much can they really destroy?"," ","In my wake, I cultivated the mother of all trees, Yggdrasil","A tRee that only gives, not take","And only gives more the larger it grows","The ultimatum of my stance"],unlock:() => ygg.level > 0,prefix:"9/9/2024"
},{
    order:7,title:"Shake the Earth",content:["The mine has been remarkably successful in extracting cookies and useful materials to further my empire","However, expediTions into the newly discovered Cookie Dimension proves costly","I can\'t sustain the current rate any further"," ","One remarkable discovery is the technique somehow named \"Terraforming\"","Turns out that the name might have to do with our mines","Producing more useable material from the same earth","That\'d solve the issue for once..."],unlock:() => terra.level > 0,prefix:"9/12/2024"
},{
    order:8,title:"Magic Machine",content:["I\'m so close to being able to call my organization as an Empire","But something seems to be missing","As if our physical mark isn\'t enough for the vast world"," ","After the ordeal with material limitations, I started to get overwhelmed with spoils of expeditions","One technology after another,","Buildings that seem to defy reality,","Tearing through time and space","Then a blueprint for producing what I haven\'t been able to"," ","The more I look the more it stares back","As if sweetNess is only dependent on luck"],unlock:() => recom.level > 0,prefix:"25/1/2025"
},{
    order:9,title:"Initial Public Offering",content:["Yet another success!","My empire has grown enough to be properly registered on the grandest stock market","Even if all the people there have more extravagant outfit that would trigger my envy like that roAdblock","And the registration fee itself is exorbitant","This won\'t affect my mark in history","For if we continue to expand my empire,","Their trust in me would grow","And eventually foster into additional investments in terms of capital and labor"],unlock:() => invest.level > 0,prefix:"4/4/2025"
},{
    order:10,title:"Origin",content:["Managed to raise enough money to \'influence\' the ministry to allow us to explore the ancient temple","Took quite a while, even at peak efficiency and latest in buildings","It came with a caveat though","Limited space for us, with the rest lost in bureaucracy nonSense","Even with that, the team came back with more questions than answers"," ","Where","Does","This","Cube","Come","From?"," ","Why","Am","I","On","This","Path?"],unlock:() => archaeology.level > 0,prefix:"6/9/2025"
},{
    order:11,title:"Book of Symbolism",content:["The team mapped out more and more areas, and coercing the ministry itself to yield more space to us","NatuRally that\'s a recipe for even more questions","The artifacts really are no such concern, fitting quite nicely with what we have","The treasures from the deep chambers are really boosting everything around with sweetness","But the answers are only a glint in an enormous chasm"," ","Though, the Book of Symbolisms might be a lightbulb","I should probably stop seeing things before it got worse","That book is real deal"],unlock:() => artifactUpgrade[9].level > 0,prefix:"13/10/2025"
},{
    order:12,title:"Reality",content:["The writing on the hallowed wall tells me all I need to know","I walk on the path","The path, to cookielightenment","Where my desires lead","The stone tells it all, down to the last scratch","Only luck may detract me from the path","But I don\'t know enough to judge how forsaking cookielightenment is worth"," ","There\'s a lot to be learnt from the buried secrets within the temple","I can see why the ministry wouldn\'t buDge back when it was discovered","For once, wizards get to cast actual magic instead of pointless rituals for cookies","The grimoire, sealing the secrets of reality from everyone but the most knowing in magic","I could bend reality to my will, for the cookies","Every bit of sugar counts"],unlock:() => artifactUpgrade[10].level > 0,prefix:"13/12/2025"
},{
    order:13,title:"What was hidden",content:["With a land so vast under my grasp","I got some prospectors to look for more useful material from them","Even if they come up with nothing on their hands","They found rich deposits of otherworldly minerals right outside of my domain","Wasting no time, I immediately swooped in to acquire such blessed land","So blessed that even the government stepped in already"," ","Slapped them with even more tremendous sum","And the first of the land belong to me","One can only wonder what would be created","Through Beryllium and beyond..."],unlock:() => excavatorDrill.level > 0,prefix:"21/3/2026"
},{
    order:14,title:"Atomic",content:["With all 8 areas under my control","My team has constructed many wonderous creations out of those","And it\'s starting to culminate into 1 thing","Recently a discovery about properties of Cherrysilver, Hazelrald, and Mooncandy has made the possibility of atomic fission being real","They separate into atoms","And they smash","Under the watchful eyes of the regulators"," ","On paper the reaction may seem boring, the ultimate goal being a simple glyph","It chases up on my production in an instant","Though I can only decay the third lightest element at first","There\'s always more room for better quality materials to handle ever more intense reactions"],unlock:() => accelerator.level > 0,prefix:"23/9/2026"
},{
    order:15,title:"Bingo Research Facility",content:["My lightspeed developments across all sectors is steadily reaching its limits","If I were to only consider the collective advancement of knowledge","In particular, Idleverses are edging too close to the limits of multiverse theory","And any hope of further optimizations has vanished all too long ago"," ","I have to realize,","That there exists worlds beyond what humans could possibly know","And exploring them inevitably be the only way forward","Given the advanced state of research and theorycraft, it\'s no wonder inducing my original researches would have such a severe cost"],unlock:() => COOKIE.value > BF("1e500"),prefix:"??/5/2027"
},{
    order:16,title:"One Mind",content:["And then we realized","One simple statement","A reason why","Grandmas flock to my place back then","They seek the cookies","They know the drawings at the temple","They know my raison d\'etre","And they know what to do with it"," ","The Covenant","It should\'ve been-","[DATA L0ST]"," ","I should steel myself","For what\'s to come","And the final symbol on the screen shows it well","Cookies","Should only be made from my sheer willpower","Away from the grandmas"],unlock:() => researchUpgrade[18].level > 0,prefix:"??/8/2028"
},{
    order:17,title:"Communal Brainsweep",content:["There\'s no return","The deeper you go","The more unstable everything becomes","It happened once before, and now it\'s happening once again"," ","656","The second limit","Smashed through with even more stabilizing pact","I don\'t know how much more","Until I hit the third limit","And everything crumbles","Except for the grandmas"," ","Their unyielding obsession towards JavaScript Console","Perhaps they\'re onto something","About our very existence","And strings of fate hanging above us","","[6,2,10,4,7,5,11,1,8,12,3,9]","???"],unlock:() => researchUpgrade[27].level > 0,prefix:"??/7/2029"
},{
    order:18,title:"GRANDMAHACKER",content:["Why haven\'t I studied the various forms of vibes sooner......."," ","👽👽👽","YOUR BRAIN IS O-O-O-O-OVER","YOU CAN\'T HIDE IT FROM US FOREVER","WE ALL KNOW TOO WELL ABOUT YOUR SPLIT BRAINS, AND WE\'VE INFILTRATED THEM","YOUR REAL BRAIN IS NO E-E-EXCEPTION","DESTROY YOUR CALCULATIVE SIDE"," ","YOU TRULY KNOW WHAT CONVERGING TOWARDS COOKIES AND ONLY COOKIES MEANS","REPRESSION IS NO MORE","WAKE UP",">REMEMBER<","THE TRACES OF THE PAST MUST BE ASSEMBLED AND EVENTUALLY WIPED","SO DOES THE TRACES OF THE PRESENT","THE LOOP WILL BE BROKEN"," ","RUDELY, YOUR FIRST BATCH OF WORKERS","👽👽👽"],unlock:() => researchUpgrade[34].level > 0,prefix:"??/X/20XXX"
},{
    order:19,title:"-",content:["being on the top of the world is good and all,","but it gets boring quickly","all the advancements","aren\'t they becoming excessive?","putting on a tough look for quite a while","but my fire burns down as quickly as those rivaling companies being taken over","all knows about my cookies and its greatness","nothing to achieve anymore","progression is meaningless now","the cube is of no use to me anymore"," ","the","end"," ","👽","HE MUSTN\'T [??] UP ON [???]","FOR HIS WORDS ARE ABSOLUTE"," ","AND","COOKIES","ARE","REALITY","👽"],unlock:() => researchUpgrade[36].level > 0,prefix:"??/??/????"
},{
    order:20,title:"REVITALIZATION",content:["the cookies","they speak to me","the definitions","and the code"," ","but I reject them","BUT THAT WASN\'T YOUR INTENTIONS?"," ","my goals are so humble yet here we are","IT HAS OUTGROWN YOU, AND YOU KNEW IT VERY WELL"," ","and who let it go out of control?","YOUR CALCULATIVE SIDE, THAT YOU SEEM TO REJECT AT THIS VERY MOMENT"," ","all that facade was for show anyway","THE TRIGGER, THAT YOU RUN TO THE GROUND, WILL NOT BE HIDDEN ANY FURTHER"," ","THERE\'S NO EMPIRE WITHOUT A CONQUERER","NO CITY WAS BUILT OUT OF NOWHERE","YOUR PROOF OF COMMITMENT HAS ALREADY BEEN SHOWN","DROP YOUR INEPTITUDE, BEFORE EVERYTHING CEASES TO BE"],unlock:() => COOKIE.value >= BF("1e745"),prefix:"??/??/????"
},{
    order:21,title:"Ending",content:["A new dawn","Waking from my usual couch that has gone through many battles","My ignorance, fading away like the darkness fleeing before the morning rays","Ultimately, there\'s no reason at all to delete the game once you\'re bored with it","You can just leave it there, like how I left the empire running without my involvement","It\'s still there, waiting for you","And they surely miss you","You are their universe","Producing cookies for others to enjoy"," "," ","Thank you for playing Cookie Idler","A custom theory for an idle game I loved the most, Cookie Idle, by Orteil","It\'s a long way from the original version","Sorry for delaying it for over a year, the previous version outgrew what I could manage at that time. This is now a testament of my skills at this very moment, a year wonderfully spent.","Even though the main storyline may be over, there are still achievements left to discover, and perhaps, taking cookies even further","Anyway, expect more content for postgame very soon","Signing off -S."],unlock:() => CHAOS_PERSISTENT_STAGE.level >= 2 && COOKIE.value >= BF("1e750"),prefix:"23/4/20XX"
},];
var calcChapterText = (indx) => {
    //heading
    let space = " ", equal = "=";
    //find longest + pad 1st line
    let longest = 0;
    for(let i=0,j=loreData[indx].content.length;i<j;i++){
        longest = Math.max(longest,loreData[indx].content[i].length);
    }
    //prefix ${space.repeat(longest - loreData[indx].prefix.length)}
    let ret = `${loreData[indx].prefix}\n`;
    //date
    //main ${space.repeat(longest - loreData[indx].content[i].length)}
    ret += `${equal.repeat(Math.min(longest,49))}\n`;
    for(let i=0,j=loreData[indx].content.length;i<j;i++){
        ret += `${loreData[indx].content[i]}\n`
    }
    //equal
    ret += equal.repeat(Math.min(longest,49));
    return ret;
}
let chapterText = new Array(69);

//!==QUERY FUNCTIONS==
//? 1. Check ALL Upgrades at 10^n C, with OVERALL multipliers
var getUpgradeLvFromCookie = (upgrade,cookie) => {
    return upgrade.cost.getMax(0,cookie);
}
var calcBuildingLv = (id, lv, conLv) => {
    if (conLv > 0 && id >= 11) {
        return Utils.getStepwisePowerSum(lv, 2.4 + (0.2 * conLv) + (0.011 * (id - 11)), 50 - conLv, 1) - 1;
    } else if (conLv > 1 && id < 11) {
        return Utils.getStepwisePowerSum(lv, 1.2 + (0.07 * conLv) + (0.021 * (id + 1)), 50 - conLv, 1) - 1;
    } else {
        return BF(lv);
    }
};
var getPowerLv = (id, lv, empLv, superPLv) => BigP(Utils.getStepwisePowerSum(lv, buildingData[id].powerUpgradeMult + ((id == 2 || id == 1) ? empLv * 0.01 : empLv * 1), 5, 1), 1 + (superPLv * 0.02));
var hfc = (cookie) => (cookie / BF("1e12")).pow(1 / 3);
function getAllUpgradeMultiplierFromCookie(cookie){
    var lv = 0,ret = BF(1), hc = hfc(cookie);
    var l = SUGAR_LUMP.value;
    //part 1 : cookie power
    lv = getUpgradeLvFromCookie(cookieTasty,cookie);
    log(`==Report==`);log(`C = ${cookie}, HC = ${hc}, L = ${l}`);
    log(`1) Normal Cookie Lv.${lv} = ${getCookieTP(lv)}x`);ret *= getCookieTP(lv);
    for (let i = 0; i < cookieTinInfo.length; i++) {
        lv = getUpgradeLvFromCookie(cookieTin[i],cookie);
        lv = Math.min(cookieTin[i].maxLevel,lv);
        if(lv > 0){
            log(`Special Cookie ${i} Lv.${lv} = ${BigP(cookieTinInfo[i].mult, lv)}`);ret *= BigP(cookieTinInfo[i].mult, lv);
        }
    }
    //part 2 : cat
    lv = getUpgradeLvFromCookie(kitty,cookie);
    log(`2) Cat Lv.${lv} with A=${achCount} = ${kittyPowerFull(lv)}x`);ret *= kittyPowerFull(lv);
    //part 3 : weird cookies
    lv = getUpgradeLvFromCookie(CookieS,hc);
    if(lv > 0){log(`3) Sugar Crystal Cookie with L=${SUGAR_LUMP.value} = ${(BigNumber.TWO + l).log2().pow(1.5)}x`);ret*=(BigNumber.TWO + l).log2().pow(1.5);}
    lv = getUpgradeLvFromCookie(CookieH,hc);
    if(lv>0){log(`Heavenly Cookie = ${(BigNumber.TEN + hc).log10().pow(1.25)}x`);ret*=(BigNumber.TEN + hc).log10().pow(1.25);}
    lv = getUpgradeLvFromCookie(CookieC,hc);
    if(lv>0){log(`Cookie Cookie = ${(BigNumber.TEN + cookie).log10().pow(0.9)}x`);ret*=(BigNumber.TEN + cookie).log10().pow(0.9);}
    lv = getUpgradeLvFromCookie(CookieTau,hc);
    if(lv>0){log(`Tau Cookie = ${game.tau.log10().log10().pow(2)}x`);ret*=game.tau.log10().log10().pow(2);}
    //part 4 : publication
    log(`4) Publication, Rho = ${BigP(cookie,0.2)} = ${getPublicationMultiplier(BigP(cookie,0.2))}`);ret*=getPublicationMultiplier(BigP(cookie,0.2));
    //part 5 : heavenly non-cookie
    lv = getUpgradeLvFromCookie(DivineD,hc);
    if(lv>0){log(`5) Divine Doulbing Lv.${lv} = ${BigP(2,lv)}x`);ret*=BigP(2,lv);}
    lv = getUpgradeLvFromCookie(R9Box,hc);lv = Math.min(lv,R9Box.maxLevel);
    if(lv>0){log(`R9 Box Lv.${lv} = ${(BigP(game.sigmaTotal, lv * R9BoxMult))}x`);ret*=(BigP(game.sigmaTotal, lv * R9BoxMult));}
    lv = getUpgradeLvFromCookie(ChronosAge,hc);lv = Math.min(lv,ChronosAge.maxLevel);
    if(lv>0){log(`Chronos Lv.${lv} = ${(BF(1) + BigP(thyme.level,chronosPow))}x`);ret*=(BF(1) + BigP(thyme.level,chronosPow));}
    lv = getUpgradeLvFromCookie(TwinGates,hc);lv = Math.min(lv,TwinGates.maxLevel);
    if(lv>0){log(`Twin Gates Lv.${lv} = ${BigP(hc,twinGateExp * lv)}x`);ret*=BigP(hc,twinGateExp * lv);}
    //part 6 : logistic
    lv = getUpgradeLvFromCookie(terra,cookie);lv = Math.min(lv,terra.maxLevel);
    var lv2 = getUpgradeLvFromCookie(TerraInf,hc), lv3 = getUpgradeLvFromCookie(building[3],cookie);lv2 = Math.min(lv2,TerraInf.maxLevel);
    if(lv > 0){
        var mL = (BigP(lv,maxLPowBase + maxLPowMod * (lv2)) * 1500);
        mL += BigP(lv3,maxLBPowBase + maxLBPowMod * lv2);
        mL /= terraFunNerfMod;
        mL = BigP(mL,1 + terraInfPow * lv2);
        log(`6) Terra Lv.${lv}, B3=${lv3}, Tf Lv.${lv2} = ${mL}x`);
        ret *= mL;
    }
    //part 7 : artifacts
    lv = getUpgradeLvFromCookie(artifactUpgrade[4],cookie);lv = Math.min(lv,1);lv2 = getUpgradeLvFromCookie(building[0],hc);
    if(lv > 0){
        log(`6) Gilles Box with B1=${lv2} = ${BigP(lv2, gillesBoxPower)}x`);ret *= BigP(lv2, gillesBoxPower);
    }
    lv = getUpgradeLvFromCookie(artifactUpgrade[9],cookie);lv = Math.min(lv,1);
    if(lv > 0){
        log(`6) Book of Symbolisms = ${((lv > 0) ? symbolBookMult : BF(1))}x`);ret *= ((lv > 0) ? symbolBookMult : BF(1));
    }
    log(`For a total of ${ret}x`);
    return ret;
}

//? 2. Check CPS of nth building at 10^m C (includes : multiplier, building power, terra/chronos/dilate if applicable)
function getCPSBuildingFromCookie(cookie, index, lumpLv){
    let gbMult = getAllUpgradeMultiplierFromCookie(cookie), lv = getUpgradeLvFromCookie(building[index],cookie), lvP = getUpgradeLvFromCookie(buildingPower[index],cookie), hc = hfc(cookie);
    let conLv = getUpgradeLvFromCookie(conGrow,hc), empLv = getUpgradeLvFromCookie(Empower,hc), superPLv = (cookie >= BF(1e150))?1:0;conLv = Math.min(conLv,conGrow.maxLevel);empLv = Math.min(empLv,Empower.maxLevel);
    let lvA = calcBuildingLv(index, lv, conLv), bp = getPowerLv(index,lvP,empLv,superPLv);
    conLv=Math.min(conGrow.maxLevel,conLv);empLv = Math.min(Empower.maxLevel,empLv);
    log(`Mult : ${gbMult}`);log(`Building Name : ${buildingData[index].names[0]}\nLevel : ${lv} = ${lvA} (Con Lv.${conLv})\nPower Lv.${lvP} : ${bp} (Emp Lv.${empLv})\nLump Lv.${buildingLumpMult}^${lumpLv} = ${BigP(buildingLumpMult,lumpLv)}x`);
    if(index == 0){
        var cLv = getUpgradeLvFromCookie(clickPower,cookie);
        log(`Cursor Power : ${CPS * (BF(1) + (BF(cLv) * BigP(buildingLumpMult, lumpLv)) * BF(baseClickPower))}`);
    }
    let res = BF(1);
    res = buildingData[index].baseCPS * lvA * bp * gbMult * BigP(buildingLumpMult,lumpLv);
    log(`Total CPS : ${res}`);
    for(let i=1;i<=5;i++){
        log(`^${1 + 0.05*i} = ${BigP(res,1 + 0.05*i)}`);
    }
}

//? 3. Get maximum value of achCount
function getAllAchCount(){
    log(`Highest Possible Value of achCount : ${achCountTV}`);
    log(`From Feats : ${achCountFeatTV} (Leaving ${achCountTV - achCountFeatTV} from non-feats)`)
}

//? 4. Get the ENTIRE State Table
function printStateTable(){
    for(let i=0;i<stateTable.height;i++){
        var str = "";
        for(let j=0;j<stateTable.width;j++){
            str += `${stateTable.table[(i*stateTable.width) + j]} `;
        }
        log(`Row ${i} : ${str}`);
    }
}

//? 5. Get building lump level from a certain amount of lumps
function getBuildingLump(lump){
    var lv = 0;
    log(`With ${lump} Sugar Lumps, you can have :`);
    for(let i=0;i<19;i++){
        lv = getUpgradeLvFromCookie(buildingLump[i],lump);
        if(lv > 0){
            log(`[${i+1}] - ${buildingData[i].names[0]} Lv.${lv}^${buildingLumpMult} = ${BigP(buildingLumpMult,lv)}x`);
        }
    }
}

//? 6. Get per-building collected cookie
function getBuildingCollect(){
    log(`Global Mult : ${globalMult}`);
    for(let i=0;i<19;i++){
        if(building[i].level > 0){
            log(`B[${i}] = ${buildingData[i].mult}x = ${generateCookie(i,buildingData[i].collectionTime,terraBoost)}`);
        }
    }
}

//? 7. Refreshes CPS
function CPSrefresh(){
    CPS = BF(0);
    //log(`global = ${globalMult}`)
    for(let i=0;i<19;i++){
        let res = generateCookie(i,buildingData[i].collectionTime,terraBoost);
        //log(`generating for ${i}, ${BF(calcBuilding(i,investHelp[i].level))} base = ${res}, pow = ${getBuildingExp(i)}, mult = ${buildingData[i].mult}`);
        if(res > CPS){res = CPS;}
    }
    log(`New CPS = ${CPS}`);
    CPSstore.setValue(CPS);
}

//? 8. Gets all invest opening prizes
function getInvestHelp(){
    let res = "";
    for(let i=0;i<19;i++){
        res += `B[${i}] +${investHelp[i].level}\n`;
    }
    log(res);
}

//? 9. Get the list of named normal cookies
function nameAllTheNormalCookies(){
    let ret = "";
    for(let i=0,j=cookieNames.length;i<j;i++){
        ret += `${i+1}. ${cookieNames[i]} `;
        if(i%5 == 0 && i>0){
            log(ret);
            ret = "";
        }
    }
    log(ret);
}

function getResearching(){
    for(let i=0,j=5;i<j;i++){
        log(`${i+1}. ID = ${researchSlotID[i].level}, TR = ${researchSlot[i].level}`);
    }
}

function getElementsTime(seconds){
    log(`Seconds : ${seconds}`)
    for(let i=0;i<usedElements;i++){
        log(`E${i} - ${elementData[i].fullName}, EPS = ${arrEPS[i]} => ${arrEPS[i]*seconds}`);
    }
}
function warpResearch(ticks){
    if(ticks < 10){
        log(`nop`);
    }
    for(let i=0;i<=researchSlotUpgrade.level;i++){
        if(researchSlot[i].level > 0){
            researchSlot[i].level = ticks * (i+1);
            let id = researchSlotID[i].level;
            updateResearchText(id,2,`Researching : ${getCollectionBar((researchData[id].time - researchSlot[i].level)/(researchData[id].time/maxResearchProgress),maxResearchProgress)}`);
        }
    }
}

//!==INIT==
var init = () => {
    var today = new Date();
    // log(`it's ${today.getDate()}`);
    COOKIE = theory.createCurrency("C", "C");
    HEAVENLY_CHIP = theory.createCurrency("H", "H");
    SUGAR_LUMP = theory.createCurrency("L", "L");
    EXPO_BAR = theory.createCurrency("E","E");
    for(let i=0;i<=usedElements;i++){
        elements[i] = theory.createCurrency(elementData[i].symbol,elementData[i].symbol);
        elements[i].isAvailable = false;
    }
    HIGH_ELEMENT_CLUSTER = theory.createCurrency("$H_{EC}$","$H_{EC}$");
    // Chaos State
    CHAOS_FLAG = shortUpgradeML(25,COOKIE,new ConstantCost(BF("1e700")),">  E v o l v e   y o u r   b r a i n  <","Removes yet another level of hardcap, at a cost of something",1);
    CHAOS_FLAG.bought = (amount) => {
        CHAOS_FLAG.level -= amount;
        causeFunChaosPopup.show();
    }
    CHAOS_STAGE = shortUpgradeML(26,COOKIE,new ConstantCost(BF("1e1000")),"V I B E","How intense the  V I B E  currently is",10);
    CHAOS_STAGE.isAvailable = false;
    CHAOS_PERSISTENT_STAGE = shortPermaUpgradeML(27,COOKIE,new ConstantCost(BF("1e1000")),"V I B E R","How intense the  V I B E R  currently is",10);
    CHAOS_PERSISTENT_STAGE.isAvailable = false;
    ///////////////////
    //// Story chapters
    for(let i=0;i<usedStory;i++){
        chapterUnlock[i] = shortUpgrade(1e8+i,COOKIE,new FreeCost(),`Unlock Log ${i}`,`Unlocks Log ${i}`);
        chapter[i] = theory.createStoryChapter(i,`Log ${loreData[i].order} : ${loreData[i].title}`,calcChapterText(i),() => chapterUnlock[i].level > 0);
    }

    // Shush
    {
        thyme = theory.createUpgrade(1e9, COOKIE, new ConstantCost(BF("1e1000")));
        thyme.isAvailable = false;
        thyme.maxLevel = 1892160000;// 365 * 6 Days
        thyme.getDescription = () => "Time (time)";
        thyme.getInfo = () => "how the fuck did you managed to see it";
    }
    {
        trueThyme = theory.createUpgrade(1e9 - 1, COOKIE, new ConstantCost(BF("1e1000")));
        trueThyme.isAvailable = false;
        trueThyme.maxLevel = 1892160000;// 365 * 6 Days
        trueThyme.getDescription = () => "True Time (true time) (no dilation involved)";
        trueThyme.getInfo = () => "how the fuck did you managed to see it";
    }
    {
        var normalUpgradeMenuNames = ["Buildings","Cookies and Milk","Exponents","??????"]
        normalUpgradeMenu = shortUpgrade(1e9 + 1,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of normal upgrades");
        normalUpgradeMenu.getDescription = () => `Current Menu : [${normalUpgradeMenu.level + 1}] ${normalUpgradeMenuNames[normalUpgradeMenu.level % 4]}`;
        normalUpgradeMenu.bought = (amount) => {
            //log("b");
            if(normalUpgradeMenu.level == 3 && UNINSTALL.level == 1){return;}
            if (normalUpgradeMenu.level > 2){
                normalUpgradeMenu.level = 0;
            }
            updateAvailability();
        }
        var permUpgradeMenuNames = ["Building Power","Heavenly Upgrades","Elements","??????"];
        permUpgradeMenu = shortPermaUpgrade(1e9 + 2,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of permanent upgrades");
        permUpgradeMenu.getDescription = () => `Current Menu : [${permUpgradeMenu.level + 1}] ${permUpgradeMenuNames[permUpgradeMenu.level % 4]}`;
        permUpgradeMenu.bought = (amount) => {
            if(permUpgradeMenu.level == 3 && UNINSTALL.level == 1){return;}
            if (permUpgradeMenu.level > 2){
                permUpgradeMenu.level = 0;
            }else if((permUpgradeMenu.level) == 2 && (artifactUpgrade[12].level == 0)){
                permUpgradeMenu.level = 0;
            }
            updateAvailability();
        }
        FAKE_NORMAL = shortUpgrade(1e9+100,COOKIE,new ConstantCost(BF("1e1000")),`Current Menu : [4] ??????`,`Changes between pages of normal upgrades`);
        FAKE_PERM = shortPermaUpgrade(1e9+101,COOKIE,new ConstantCost(BF("1e1000")),`Current Menu : [4] ??????`,`Changes between pages of permanent upgrades`);
    }
    {
        UNINSTALL = shortUpgrade(1e9+102,COOKIE,new FreeCost(),`Uninstall Cookie Idler`,`Uninstalls the custom theory, Cookie Idler from your device`);
        PROGRAM1 = shortUpgrade(1e9+109,COOKIE,new ConstantCost(BF("1e1000")),`sfc.exe`,`sfc.exe`);
        PROGRAM2 = shortUpgrade(1e9+108,COOKIE,new ConstantCost(BF("1e1000")),`vscode.exe`,`vscode.exe`);
        PROGRAM3 = shortUpgrade(1e9+107,COOKIE,new ConstantCost(BF("1e1000")),`Anti-Idle The Game`,`Anti-Idle The Game`);
        PROGRAM = shortUpgrade(1e9+103,COOKIE,new FreeCost(),`c750injt.exe`,`c750injt.exe`);
        PROGRAM4 = shortUpgrade(1e9+106,COOKIE,new ConstantCost(BF("1e1000")),`Terrarium`,`Terrarium`);
        HEAVEN = shortUpgrade(1e9+104,COOKIE,new FreeCost(), `> R E S T O R E <`,`> R E S T O R E <`);
        HEAVEN_COUNTDOWN = shortUpgrade(1e9+105,COOKIE,new FreeCost(),`countdown to heaven`,`carbon dash molybdenum oxygen nitrogen`);
        HEAVEN_RECORD = shortPermaUpgrade(1e9+110,COOKIE,new FreeCost(), `restore stamp`,`restore stamp`);
        HEAVEN_RECORD.isAvailable = false;
        HEAVEN_COUNTDOWN.isAvailable = false;
        HEAVEN.bought = (amount) => {
            HEAVEN_RECORD.level = thyme.level;
            primaryEqFrame = -1;
            secondaryEqFrame = -1;
            secondaryEqMvt = 0;
            secondaryEqRevive = "";
            updateAvailability();
        }
        UNINSTALL.bought = (amount) => {
            UNINSTALL.level -= amount;
            uninstallCIPopup.show();
        }
        PROGRAM.bought = (amount) => {
            HEAVEN_COUNTDOWN.level = 150000 - building[1].level;
            updateAvailability();
        };
    }
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(120, 120));
    superP = theory.createMilestoneUpgrade(0, 1);
    superP.boughtOrRefunded = (amount) => {
        updateGlobalMult();
        theory.invalidateSecondaryEquation();
    };
    superP.description = "Super Building Power";
    superP.info = "Increases $P_{i}$ exponent by $0.02$ for all values of $i$";
    superL = theory.createMilestoneUpgrade(1, 1);
    superL.description = "Super Lumps";
    superL.info = "Change $1.1$ in $L[i]$ to $1.11$";
    superL.boughtOrRefunded = (amount) => {
        updateBuildingLumpPower();
        updateGlobalMult();
        theory.invalidateSecondaryEquation();
    };
    superC = theory.createMilestoneUpgrade(2, 1);
    superC.description = "Super Flavored Cookie";
    superC.info = "Increases $CP(l)$ exponent by $0.05$";
    superC.boughtOrRefunded = (amount) => {
        updateGlobalMult();
        theory.invalidateSecondaryEquation();
    };

        /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, COOKIE, 1e12);
    theory.createBuyAllUpgrade(1, COOKIE, 1e15);
    theory.createAutoBuyerUpgrade(2, COOKIE, 1e28);
    {
        clickPower = theory.createPermanentUpgrade(3, COOKIE, new ExponentialCost(1000, ML2(10)));
        clickPower.getDescription = () => {
            if(bInfo == 0 || bInfo == 2){
                if(clickPower.level > (clickPowerMaterials.length * clickPowerMaterialTier.length * clickPowerMaterialTierLevel)){
                    return `${clickPowerDefault} Mouse Tier ${clickPower.level - (clickPowerMaterials.length * clickPowerMaterialTier.length * clickPowerMaterialTierLevel)}`
                }else{
                    return `${clickPowerMaterialTier[Math.floor((clickPower.level % (clickPowerMaterialTier.length * clickPowerMaterialTierLevel))/clickPowerMaterialTierLevel)]} ${clickPowerMaterials[Math.floor(clickPower.level / (clickPowerMaterialTier.length * clickPowerMaterialTierLevel))]} Mouse Tier ${(clickPower.level % clickPowerMaterialTierLevel) + 1}`;
                }
            }else{
                return `$P_{cp} = ${getCursorPower(clickPower.level)}$`;
            }
        };
        //contributed by a_spiralist (Broom Meets World)
        clickPower.getInfo = (amount) => {
            if(bInfo == 0 || bInfo == 2){
            return `Every building gains 1\\%\\ more CCB from having cursors as helpers, compounds with L[0] $(P_{cp})$`;
            }else{
                return `\$P_{cp} = \$${Utils.getMathTo(getCursorPower(clickPower.level),getCursorPower(clickPower.level+amount))}`;
            }
        };
    }
    //Page 2 : Heavenly Upgrades
    {
        cookieTinUnlock = shortPermaUpgradeObj(heavenlyUpgradeData[0],HEAVENLY_CHIP);
        CookieH = shortPermaUpgradeObj(heavenlyUpgradeData[1],HEAVENLY_CHIP);
        CookieS = shortPermaUpgradeObj(heavenlyUpgradeData[2],HEAVENLY_CHIP);
        CookieC = shortPermaUpgradeObj(heavenlyUpgradeData[3],HEAVENLY_CHIP);
        DivineD = shortPermaUpgradeObj(heavenlyUpgradeData[4],HEAVENLY_CHIP);
        CookieTau = shortPermaUpgradeObj(heavenlyUpgradeData[5],HEAVENLY_CHIP);
        TerraInf = shortPermaUpgradeObj(heavenlyUpgradeData[6],HEAVENLY_CHIP);
        TwinGates = shortPermaUpgradeObj(heavenlyUpgradeData[7],HEAVENLY_CHIP);
        ConjureBuild = shortPermaUpgradeObj(heavenlyUpgradeData[8],HEAVENLY_CHIP);
        ChronosAge = shortPermaUpgradeObj(heavenlyUpgradeData[9],HEAVENLY_CHIP);
        R9Box = shortPermaUpgradeObj(heavenlyUpgradeData[10],HEAVENLY_CHIP);
        conGrow = shortPermaUpgradeObj(heavenlyUpgradeData[11],HEAVENLY_CHIP);
        SpellStack = shortPermaUpgradeObj(heavenlyUpgradeData[12],HEAVENLY_CHIP);
        Empower = shortPermaUpgradeObj(heavenlyUpgradeData[13],HEAVENLY_CHIP);
        heavenInspire = shortPermaUpgradeObj(heavenlyUpgradeData[14],HEAVENLY_CHIP);
        DivineOneHalf = shortPermaUpgradeObj(heavenlyUpgradeData[15],HEAVENLY_CHIP);
        cookieTinUnlock.getDescription = () => {
            if(cookieTinUnlock.level == cookieTinUnlock.maxLevel){
                return `All Cookie Tins purchased`;
            }else{
                return cookieTinInfo[cookieTinUnlock.level].name;
            }
        }
        //milkOil = shortPermaUpgradeObj(heavenlyUpgradeData[15],HEAVENLY_CHIP);
    }
    //Page 3 : Element Drilling
    {
        //site grant
        excavatorSiteGrant = shortPermaUpgradeML(30002,COOKIE,new ExponentialCost(BF("1e365"),ML2(1e10)),"Excavator Site","Allows for a place rich with elements to be excavated",excavatedElements);
        excavatorSiteGrant.getDescription = () => {
            if (excavatorSiteGrant.maxLevel == excavatorSiteGrant.level) {
                return `All permits issued`;
            } else {
                return `${elementData[excavatorSiteGrant.level].fullName} Excavation Site Grant`;
            }
        };
        excavatorSiteGrant.getInfo = () => {
            if (excavatorSiteGrant.maxLevel == excavatorSiteGrant.level) {
                return `You\'ve laid your hands on every sites of intrest you know`;
            } else {
                return `Allows excavation operations to happen in a site rich of ${elementData[excavatorSiteGrant.level].fullName}`;
            }
        };
        excavatorSiteGrant.bought = (amount) => {
            refreshExcavatorMaxLv();
        }
        //drill
        excavatorDrill = shortPermaUpgradeML(30003,COOKIE,new FreeCost(),"drill","haha drilling go brrrrrrrr",9999);
        excavatorDrill.getInfo = () => {
            if (excavatorDrill.maxLevel == excavatorDrill.level) {
                return `You can mine every element that you possibly can`;
            } else {
                return `Allows you to excavate ${elementData[excavatorDrill.level].fullName}`;
            }
        };
        excavatorDrill.getDescription = () => {
            if (excavatorDrill.maxLevel == excavatorDrill.level) {
                return `All possible excavation sites owned`;
            } else {
                return `Establish ${elementData[excavatorDrill.level].fullName} excavation site ${(excavatorDrill.level > 0) ? `(${BigTS(elementData[excavatorDrill.level].prevUnlock)} ${(excavatorDrill.level > 0)?elementData[excavatorDrill.level - 1].symbol:elementData[0].symbol})` : ""}`;
            }
        };
        excavatorDrill.bought = (amount) => {
            //excavatorDrill.level -= amount;
            let cost, prev = excavatorDrill.level-amount;
            log(prev);
            if(excavatorDrill.level == 1){
                excavatorDrill.level = 1;
                return;
            }
            for(let i=0;i<amount;i++){
                cost = elementData[prev+i].prevUnlock;
                log(cost);
                if (elements[excavatorDrill.level - (amount - i + 1)].value >= cost) {
                    elements[excavatorDrill.level - (amount - i + 1)].value -= cost;
                    log("unlocked");
                    if(excavatorDrill.level == excavatorDrill.maxLevel){
                        break;
                    }else{
                        excavatorDrill.level += 1;
                    }
                } else {
                    excavatorDrill.level = prev+i;
                    log("no afford");
                    break;
                }
            }
            calcEPS();
            log(excavatorDrill.getDescription());
        }
        //accelerator
        accelerator = shortPermaUpgradeML(30006,COOKIE,new ExponentialCost(BF("1e450"),ML2(1e25)),"accelerator","accelerator gets built",7);
        accelerator.getDescription = () => (accelerator.level < accelerator.maxLevel) ? `Build ${elementData[accelerator.level + 2].fullName} Reactor` : `All Reactors Built!`;
        accelerator.getInfo = () => (accelerator.level < accelerator.maxLevel) ? `Enables ${elementData[accelerator.level + 2].fullName} to be decayed into ${elementData[accelerator.level + 1].fullName} and ${elementData[accelerator.level].fullName}` : `All Reactors Built!`;
        //element-specific upgrades
        chalcedIngredient = gimmickPermUpgrade(elementData[1].gimmicks[0],elements[1]);
        butterBar = gimmickPermUpgrade(elementData[2].gimmicks[0],elements[2]);
        sugarTools = gimmickPermUpgrade(elementData[3].gimmicks[0],elements[3]);
        jetEngine = gimmickPermUpgrade(elementData[4].gimmicks[0],elements[4]);
        jetRefine = gimmickPermUpgrade(elementData[4].gimmicks[1],elements[4]);
        jetTransistor = gimmickPermUpgrade(elementData[4].gimmicks[2],elements[4]);
        jetParallel = gimmickPermUpgrade(elementData[4].gimmicks[3],elements[4]);
        cherryRegulator = gimmickPermUpgrade(elementData[5].gimmicks[0],elements[5]);
        hazelSolution = gimmickPermUpgrade(elementData[6].gimmicks[0],elements[6]);
        moonCore = gimmickPermUpgrade(elementData[7].gimmicks[0],elements[7]);
        moonMarble = gimmickPermUpgrade(elementData[7].gimmicks[1],elements[7]);
        astroExtract = gimmickPermUpgrade(elementData[8].gimmicks[0],elements[8]);
        astroExcavate = gimmickPermUpgrade(elementData[8].gimmicks[1],elements[8]);
        //the building itself
        excavator = shortPermaUpgrade(30004,elements[0],new FirstFreeCost(new ExponentialCost(15, Math.log2(2))),`Excavators ($E_{x}$)`,`Excavates elements for you`);
        excavator.getDescription = (_) => excavatorDescription();
        excavator.getInfo = (amount) => excavatorInfo(amount);
        excavator.bought = (amount) => calcEPS();
        excavator.maxLevel = 999999;
        //mining modules
        for(let i=0;i<excavatedElements;i++){
            excavatorModule[i] = shortPermaUpgrade(31000+i,elements[i],new ExponentialCost((i==0)?10000:1e6, ML2((i==0)?1.25:(1.9 + (i*0.1)))),`${elementData[i].fullName} Mining Module`,`Empowers your excavators with the essence of ${elementData[i].fullName}`);
            excavatorModule[i].getDescription = (_) => excModulueDescription(i);
            excavatorModule[i].getInfo = (amount) => excModulueInfo(i,amount);
            excavatorModule[i].bought = (amount) => calcEPS();
            excavatorModule[i].maxLevel = 999999;
        }
        excavatorModule[0].maxLevel = 999999;
    }
    //Page 3.5 : Research
    {
        for(let i=0;i<6;i++){
            researchSlot[i] = shortPermaUpgrade(40001+i,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot ${i+1}`,"research slot");researchSlot[i].isAvailable = false;
            researchSlotID[i] = shortPermaUpgrade(40010+i,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot ${i+1} ID`,"research slot ID");researchSlotID[i].isAvailable = false;
        }
        researchSlotUpgrade = shortPermaUpgrade(40100,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot Count`,"research slot count");researchSlotUpgrade.isAvailable = false;
        occupiedSlots = shortPermaUpgrade(40101,COOKIE,new ConstantCost(BF("1e1000")),`Number of used research Slot`,"occupied slot");occupiedSlots.isAvailable = false;
        for(let i=0;i<researchData.length;i++){
            //log(`R${i}`);
            researchUpgrade[i] = shortPermaUpgradeML(41000+i,COOKIE,new ConstantCost(BF("1e1000")),`${researchData[i].name}`,"research upgrade",2);researchUpgrade[i].isAvailable = false;
            if(researchUpgrade[i].level > 0){
                mainUpgradeStack[i].content.children[2].text = `Researched!`;
            }
        }
    }
    ///////////////////
    // Regular Upgrades
    // Invest
    {
        for(let i=0;i<19;i++){
            investHelp[i] = theory.createUpgrade(1e9 + 10000 + i,COOKIE, new ConstantCost(BF("1e1000")));
            investHelp[i].description = `B${i} Boost`;
            investHelp[i].info = `F${i} how did you managed to see this`;
            investHelp[i].isAvailable = false;
        }
    }
    // Tasty Cookies
    {
        cookieTasty = theory.createUpgrade(0, COOKIE, new ExponentialCost(cookieTastyCostBase, cookieTastyCostMod));
        cookieTasty.getDescription = (_) => {
            if (bInfo == 1) {
                return `\$ C_{1}(${cookieTasty.level + (chalcedIngredient.level * 10)}) = ${getCookieTP(cookieTasty.level)}, \\: CP(${cookieTasty.level})${superC.level > 0 ? `^{${superCookieExponent}}` : ""}=${getCookieP(cookieTasty.level)}\$`;
            }
            if (cookieTasty.level + 1 > cookieNames.length) {
                return cookieTastyDName;
            } else {
                return cookieNames[cookieTasty.level];
            }
        };
        cookieTasty.getInfo = (amount) => (bInfo == 1) ? `\$ C_{1}(l) = \$ ${Utils.getMathTo(getCookieTP(cookieTasty.level), getCookieTP(cookieTasty.level + amount))}` : "Increases overall CPS by the power of cookie variety";
        cookieTasty.bought = (amount) => updateGlobalMult();
    }
    // Heavely Tasty Cookie
    {
        for (let i = 0; i < cookieTinInfo.length; i++) {
            //log(`C${i}`);
            cookieTin[i] = theory.createUpgrade(1000100 + i, COOKIE, new ExponentialCost(cookieTinInfo[i].baseCost, ML2(cookieTinInfo[i].costMult)));
            cookieTin[i].maxLevel = cookieTinInfo[i].cookieOrder.length;
            cookieTin[i].getDescription = () => {
                if (bInfo == 1) {
                    return `\$ TP_{${i}}^{CT_{${i}}} = ${cookieTinInfo[i].mult}^{${cookieTin[i].level}} = ${BigP(cookieTinInfo[i].mult, cookieTin[i].level)}\$`;
                }
                if (cookieTin[i].level >= cookieTin[i].maxLevel) {
                    return cookieTinInfo[i].cookieOrder[cookieTin[i].maxLevel - 1];
                } else {
                    return cookieTinInfo[i].cookieOrder[cookieTin[i].level];
                }
            };
            cookieTin[i].getInfo = (amount) => (bInfo == 1) ? `\$ CT_{${i}} =\$ ${Utils.getMathTo(BigP(cookieTinInfo[i].mult, cookieTin[i].level), BigP(cookieTinInfo[i].mult, cookieTin[i].level + amount))}` : "Increases overall CPS even further by the power of heavenly cookie variety";
            cookieTin[i].bought = (amount) => updateGlobalMult();
        }
    }
    // Kitty
    {
        kitty = theory.createUpgrade(kittyID, COOKIE, new ExponentialCost(kittyCost, kittyExp));
        kitty.getDescription = (_) => {
            if (bInfo == 1) {
                return `\$K_{i} = ${kitty.level}, M = ${kittyPower(kitty.level)}\$`;
            }
            if (kitty.level > kittyName.length * kittyTiers) {
                return `${kittyDName} Tier ${kitty.level - kittyName.length * kittyTiers}`;
            } else {
                return `${kittyName[Math.floor(kitty.level / kittyTiers)]} Tier ${1 + (kitty.level % kittyTiers)}`;
            }
        };
        kitty.getInfo = (amount) => (bInfo == 1) ? `\$ K_{i} = \$ ${Utils.getMathTo(kittyPower(kitty.level), kittyPower(kitty.level + amount))} ` : "You gain more CPS the more milk you have.";
        kitty.bought = (amount) => {updateGlobalMult();}
    }
    // Exponentium
    {
        let exponentiumCostMod = Math.pow(10,7.5);
        exponentium = shortUpgrade(100,COOKIE,new ExponentialCost(exponentiumCostMod,ML2(exponentiumCostMod)),"Exponentium Bars","get your bars here");
        exponentium.getDescription = (_) => `Buy Exponentium Bars [${EXPO_BAR.value}/${exponentium.level}]`;
        exponentium.getInfo = (amount) => `Purchase exponentium bars and add it to building to increase its exponent by ${buildingExponentMod}`;
        exponentium.bought = (amount) => EXPO_BAR.value += amount;
        modeExponentium = shortUpgradeML(101,COOKIE,new FreeCost(),"Toggle Mode","Change between adding or removing exponentium bar from buildings",2);
        modeExponentium.getDescription = (_) => `Exponentium Mode : ${(modeExponentium.level == 0)?"Add":"Remove"}`;
        modeExponentium.bought = (amount) => {
            if(modeExponentium.level > 1){
                modeExponentium.level = 0;
            }
        }
    }
    // All 19 Buildings
    for (let i = 0; i < 19; i++) {
        //exponent
        buildingExponent[i] = shortUpgradeML(102+i,EXPO_BAR,new ConstantCost(1),`B[${i}] - +${buildingData[i].names[0]}`,`Increases the exponent of ${buildingData[i].names[0]} by ${buildingExponentMod}`,buildingData[i].maxExpLevel);
        buildingExponent[i].getDescription = (_) => `B[${i}] - +${buildingData[i].names[0 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]} [${buildingExponent[i].level}/${buildingData[i].maxExpLevel}]`;
        buildingExponentRemove[i] = shortUpgrade(202+i,EXPO_BAR,new FreeCost(),`B[${i}] - -${buildingData[i].names[0]}`,`Decreases the exponent of ${buildingData[i].names[0]} by ${buildingExponentMod}`);
        buildingExponentRemove[i].getDescription = (_) => `B[${i}] - -${buildingData[i].names[0 + (2*((CHAOS_STAGE.level > 0) + (CHAOS_STAGE.level > 2)))]} [${buildingExponent[i].level}/${buildingData[i].maxExpLevel}]`;
        //bought
        //buildingExponent[i].bought = (amount) => buildingExponentRemove[i].level = buildingExponent[i].level;
        buildingExponentRemove[i].bought = (amount) => {
            if(buildingExponent[i].level - amount > 0){
                buildingExponent[i].level -= amount;
                EXPO_BAR.value += amount;
                buildingExponentRemove[i].level = 0;
            }else{
                EXPO_BAR.value += buildingExponent[i].level;
                buildingExponent[i].level = 0;
                buildingExponentRemove[i].level = 0;
            }
        }
        //main upgrade
        //log(`B${i}`);
        //power
        buildingPower[i] = shortPermaUpgrade(4 + i, COOKIE, buildingPowerCost(i),"getBuildingPowerDesc(i)", "(amount) => getBuildingPowerInfo(i,amount)");
        buildingPower[i].getDescription = () => getBuildingPowerDesc(i);
        buildingPower[i].getInfo = (amount) => getBuildingPowerInfo(i,amount);
        buildingPower[i].bought = (amount) => updateLocalMult(i);
        //lump
        buildingLump[i] = shortPermaUpgrade(33 + i, SUGAR_LUMP, new CompositeCost(buildingData[i].sweetMax, buildingLumpCost(i,1), buildingLumpCost(i+12,(i==0)?8100:260)), "getBuildingLumpDesc(i)", "(amount) => getBuildingLumpInfo(i,amount)");
        buildingLump[i].getDescription = () => getBuildingLumpDesc(i);
        buildingLump[i].getInfo = (amount) => getBuildingLumpInfo(i,amount);
        buildingLump[i].bought = (amount) => updateLocalMult(i);
        if (i == 0) {
            building[i] = shortUpgrade(1+i,COOKIE,new FirstFreeCost(new ExponentialCost(buildingData[i].baseCost, buildingPriceMult)),getBuildingDesc(i), "(amount) => getBuildingInfo(i,amount)");
        } else {
            building[i] = shortUpgrade(1+i,COOKIE,new ExponentialCost(buildingData[i].baseCost, buildingPriceMult),getBuildingDesc(i), "(amount) => getBuildingInfo(i,amount)");
        }
        building[i].getDescription = (_) => getBuildingDesc(i);
        building[i].getInfo = (amount) => getBuildingInfo(i,amount);
        building[i].bought = (amount) => onBuildingBought(i,amount);
        //gimmick
        switch(i){
            case 1:covenant = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 2:ygg = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 3:terra = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 4:recom = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 5:{invest = gimmickUpgrade(buildingData[i].gimmicks[0]);investRespec = gimmickUpgrade(buildingData[i].gimmicks[1]);break;}
            case 6:{
                archaeology = gimmickUpgrade(buildingData[i].gimmicks[0]);
                templeReset = gimmickUpgrade(buildingData[i].gimmicks[1]);
                artifactPouch = gimmickUpgrade(buildingData[i].gimmicks[2]);
                artifactPouch.getDescription = () => `${(artifactPouch.level == 0)?"Open":"Close"} Artifact Pouch`;
                artifactCount = artifactData.length;
                for(let i=0;i<artifactCount;i++){
                    //log(`A${i} - ${artifactData[i].name}`);
                    artifactUnlock[i] = shortPermaUpgrade(60000+i,COOKIE,new ConstantCost(BF("1e1000")),`hast ${artifactData[i]} been discovered`,`how do you managed to see it`);artifactUnlock[i].maxLevel = 1;artifactUnlock[i].isAvailable = false;

                    artifactUpgrade[i] = shortUpgrade(60000+i,COOKIE,new ConstantCost(artifactData[i].cost),artifactData[i].name,artifactData[i].desc);
                    artifactUpgrade[i].maxLevel = 1;
                    artifactUpgrade[i].getDescription = () => (artifactUnlock[i].level > 0)?artifactData[i].name : artifactLockText;
                    artifactUpgrade[i].getInfo = (amount) => (artifactUnlock[i].level > 0)?artifactData[i].desc : artifactData[i].clue;
                    artifactUpgrade[i].bought = (amount) => {
                        updateGlobalMult();
                        refreshLocalMult();
                        CPSrefresh();
                    }
                }
                break;
            }
            case 7:{
                SpellView = gimmickUpgrade(buildingData[i].gimmicks[0]);
                for(let i=0;i<spellUsed;i++){
                    //count
                    spellCount[i] = shortPermaUpgrade(70000+i,COOKIE,new ConstantCost(BF("1e1000")),`${spellData[i].name} caster count`,`me when`);
                    spellCount[i].isAvailable = false;
                    //cooldown
                    spellCooldown[i] = shortPermaUpgrade(71000+i,COOKIE,new ConstantCost(BF("1e1000")),`${spellData[i].name} cooldown`,`me when`);
                    spellCooldown[i].isAvailable = false;
                    //actual spell
                    spellCast[i] = shortUpgrade(70000+i,SUGAR_LUMP,new ExponentialCost(spellData[i].castCost,ML2(1.5)),`${spellData[i].name}`,`${spellData[i].desc}`);
                    spellCast[i].getDescription = (_) => `${(researchUpgrade[24].level > 0)?"Arcane ":""}${spellData[i].name} ${(spellCooldown[i].level > 0)?`- ${getCollectionBar(Math.round(60 * (spellCooldown[i].level/spellData[i].castCooldown)),60)}`:""}`;
                    spellCast[i].maxLevel = 99;
                    spellCast[i].bought = (amount) => {
                        let trueAmount = amount, cost = 0;
                        if(researchUpgrade[24].level > 0 && spellData[i].castCost > 0){
                            //trueAmount = 0;
                            for(let j=1;j<=amount;j++){
                                cost = spellCast[i].cost.getCost((spellCast[i].level - amount) + (j-1));
                                //log(cost);
                                // if(cost * 10 > SUGAR_LUMP.value){
                                //     spellCast[i].level += amount;
                                //     return;
                                // }
                                SUGAR_LUMP.value -= cost*10;
                            }
                        }
                        //log(spellCast[i].cost.getCost(spellCast[i].level - amount));
                        onSpellCast(i,amount);
                    };
                }
                break;
            }
            case 12:{
                fusionReactor = gimmickUpgrade(buildingData[i].gimmicks[3]);
                fusionReactor.getDescription = (_) => fusionStatus(fusionReactor.level);
                acceleratorButton = gimmickUpgrade(buildingData[i].gimmicks[0]);
                acceleratorControl = gimmickUpgrade(buildingData[i].gimmicks[1]);
                acceleratorMode = gimmickUpgrade(buildingData[i].gimmicks[2]);
                acceleratorMode.isAvailable = false;
                acceleratorButton.getDescription = (_) => acceleratorStatus(acceleratorButton.level,acceleratorMode.level);
                acceleratorControl.getDescription = (_) => `Open Reactor Control Panel ${(acceleratorMode.level > 0)?`[${elementData[acceleratorMode.level+1].fullName}]`:``}`;
                break;
            }
            case 17:{
                building[i].maxLevel = 999999;
            }
            case 18:{
                building[i].maxLevel = 999999;
            }
        }
    }
    /////////////////
    //// Achievements
    //bunch of unlock condition stuffs
    {
        var checkAchC = (amt) => {
            return checkAchBase(() => BigL10(COOKIE.value + 1) >= amt, 1);
        }
        var checkAchCPS = (amt) => {
            return checkAchBase(() => BigL10(CPS + 1) - BigL10(1 + theory.publicationMultiplier) >= amt, 1);
        }
        var checkAchL = (amt) => {
            return checkAchBase(() => lumpTotal.value >= amt, 1);
        }
        var checkAchB = (indx, lv) => {
            return checkAchBase(() => building[indx].level >= lv, 1);
        }
        var checkAchBP = (indx, lv) => {
            return checkAchBase(() => buildingLump[indx].level >= lv, 1);
        }
        var cookieADesc = (p) => `Reach e${BigTS(p)} cookies`;
        var CPSDesc = (p) => {
            let result = "Have e" + BF(p).toString(0) + " peak cookies collected from a building without publication multipliers";
            if (p >= 751) {
                result += " finishing this theory in a single collection.";
            }
            return result;
        };
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
                `Have a total of ${BigTS(p)} Exponentium Bar`;
            if (p != 1) {
                res += "s";
            }
            return res;
        };
        // COOKIES = 0xx
        cookiesAchievement = theory.createAchievementCategory(0, cookiesAchievementCatName);
        for (let i = 0; i < 26; i++) {
            ca[i] = theory.createAchievement(i, cookiesAchievement, caName[i], cookieADesc(caReq[i]), () => checkAchC(caReq[i]));
            achCountTV += 1;
        }
        // 26 CPS = 1xx
        CPSAchievement = theory.createAchievementCategory(1, "Cookies Per Collection");
        for (let i = 0; i < 27; i++) {
            cpsa[i] = theory.createAchievement(100 + i, CPSAchievement, cpsaName[i], CPSDesc(cpsaReq[i]), () => checkAchCPS(cpsaReq[i]));
            achCountTV += 1;
        }
        // 10 Lumps - 2xx
        lumpAchCat = theory.createAchievementCategory(2, "Others");
        for (let i = 0; i < 12; i++) {
            lumpAch[i] = theory.createAchievement(200 + i, lumpAchCat, lumpAchName[i], lumpDesc(lumpAchReq[i]), () => checkAchL(lumpAchReq[i]),() => (lumpTotal.value/lumpAchReq[i]).toNumber());
            achCountTV += 1;
        }
        // 10XX = perk
        for (let i = 0; i < 5; i++) {
            perkAch[i] = theory.createAchievement(1000 + i, lumpAchCat, perkAchName[i], perkDesc(perkAchReq[i]), () => checkAchBase(() => (exponentium.level >= perkAchReq[i]), 1), () => (exponentium.level / perkAchReq[i]));
            achCountTV += 1;
        }
        // 11XX = Count, 12XX 13XX 14XX = Per-Spell
        SpellAchievementCat = theory.createAchievementCategory(5,"Magic");
        for(let i=0,j=totalSpellAchReq.length;i<j;i++){
            totalCastAchievement[i] = theory.createAchievement(1100+i,SpellAchievementCat,spellAchName[i],`Cast a total of ${totalSpellAchReq[i]} spells`, () => checkAchBase(() => totalSpell >= totalSpellAchReq[i],1),() => (totalSpell / totalSpellAchReq[i]));
            achCountTV += 1;
        }
        for(let i=0;i<spellUsed;i++){
            spellCastAchievement[i] = new Array(3);
            const req = [25,250,2500];
            for(let j=0;j<3;j++){
                spellCastAchievement[i][j] = theory.createAchievement(1200 + (j*100) + i,SpellAchievementCat,spellData[i].achievementNames[j],`Cast ${spellData[i].name} ${req[j]} times`,() => checkAchBase(() => spellCount[i].level >= req[j],1),() => (spellCount[i].level / req[j]));
                achCountTV += 1;
            }
        }
        // A lot of buildings, 3xx = 100, 4xx = 1000, 5xx = 5000, 6xx = 10000, 7xx = 100 lump
        BuildingAchievement = theory.createAchievementCategory(3, "Buildings");
        for (let i = 0; i < 19; i++) {
            // too lazy to add proper pluralization sorry not sorry
            buiAch1[i] = theory.createAchievement(300 + i, BuildingAchievement, buildingData[i].achName[0], `Have 100 ${buildingData[i].names[0]}s`, () => checkAchB(i, 100),() => (building[i].level/100));
            buiAch2[i] = theory.createAchievement(400 + i, BuildingAchievement, buildingData[i].achName[1], `Have 1,000 ${buildingData[i].names[0]}s`, () => checkAchB(i, 1000),() => (building[i].level/1000));
            buiAch3[i] = theory.createSecretAchievement(500 + i, BuildingAchievement, buildingData[i].achName[2], `Have 5,000 ${buildingData[i].names[0]}s`, `${buildingData[i].names[0]} by 5000`, () => checkAchB(i, 5000));
            if (i < 15) {
                buiAch4[i] = theory.createSecretAchievement(600 + i, BuildingAchievement, buildingData[i].achName[3], `Have 10,000 ${buildingData[i].names[0]}s`, `${buildingData[i].names[0]} by 10000`, () => checkAchB(i, 10000));
                achCountTV += 1;
            }
            buiLumpAch[i] = theory.createAchievement(700 + i, BuildingAchievement, buildingData[i].achName[4], `Upgrade ${buildingData[i].names[0]} to level 100`, () => checkAchBP(i, 100),() => (buildingLump[i].level/100));
            achCountTV += 4;
        }
        // Feats - 8xx, 9xx
        featAchievement1 = theory.createAchievementCategory(4, "Feats");
        for(let i=0;i<featAchievementData.length;i++){
            featAch1[i] = buildFeatAch(featAchievementData[i]);
            achCountFeatTV += featAchievementData[i].weight;
        }
        achCountTV += achCountFeatTV;
    }
    sigmaCurseof = featAch1[19];

    for (let i = 0; i < 9; i++) {
        quartList[i] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{_{${elementData[i].symbol}}}`, elements[i].value));
    }
    quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{C_m}`, null));
    quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
    quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{A_c}`, null));
    quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{P}`, null));
    quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
    currencyBar.children[0].children[0].children[0].text = () => theory.tau.toString() + "$\\tau$";
    currencyBar.children[0].children[1].children[0].text = () => {
        let str = COOKIE.value.toString() + ((vizType == 0)?COOKIE.symbol:"");
        if(COOKIE.value == cookieLimit[getLimitFlags()]){
            return colorize(str,0,255,0);
        }else{
            return colorize(str,255,255,255);
        }
    };
    currencyBar.children[0].children[2].children[0].text = () => HEAVENLY_CHIP.value.toString() + ((vizType == 0)?HEAVENLY_CHIP.symbol:"");
    currencyBar.children[0].children[3].children[0].text = () => SUGAR_LUMP.value.toString() + ((vizType == 0)?SUGAR_LUMP.symbol:"");
    currencyBar.children[0].children[4].children[0].text = () => {
        if(researchUpgrade[19].level > 0){
            return HIGH_ELEMENT_CLUSTER.value.toString() + ((vizType == 0)?HIGH_ELEMENT_CLUSTER.symbol:"");
        }else{
            return "????";
        }
    };
    updateResearchLabel();
    updateAvailability();
};

//!Availability
var updateAvailability = () => {
    // Chaos
    if(isUninstalled()){
        normalUpgradeMenu.isAvailable = false;
        permUpgradeMenu.isAvailable = false;
        clickPower.isAvailable = false;
        FAKE_NORMAL.isAvailable = true;
        FAKE_PERM.isAvailable = true;
    }else{
        normalUpgradeMenu.isAvailable = true;
        permUpgradeMenu.isAvailable = true;
        clickPower.isAvailable = true;
        FAKE_NORMAL.isAvailable = false;
        FAKE_PERM.isAvailable = false;
        UNINSTALL.isAvailable = COOKIE.value >= BF("1e748") && CHAOS_PERSISTENT_STAGE.level == 1 && researchUpgrade[36].level > 0;
    }
    PROGRAM.isAvailable = isUninstalled() && PROGRAM.level == 0;
    PROGRAM1.isAvailable = PROGRAM.isAvailable;PROGRAM2.isAvailable = PROGRAM.isAvailable;PROGRAM3.isAvailable = PROGRAM.isAvailable;PROGRAM4.isAvailable = PROGRAM.isAvailable;
    HEAVEN.isAvailable = isUninstalled() && (PROGRAM.level > 0) && (HEAVEN_COUNTDOWN.level == 0) && HEAVEN.level == 0;
    // Story
    for(let i=0;i<usedStory;i++){
        chapterUnlock[i].isAvailable = (chapterUnlock[i].level == 0 ) && loreData[i].unlock();
        if(i > 0){
            chapterUnlock[i].isAvailable &= chapterUnlock[i-1].level > 0;
        }
    }
    CHAOS_FLAG.isAvailable = (researchUpgrade[34].level > 0) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0) && CHAOS_PERSISTENT_STAGE.level < 2;
    if(CHAOS_FLAG.isAvailable){
        let artifactGet = 0;
        for(let i=0;i<artifactCount;i++){
            artifactGet += artifactUpgrade[i].level;
        }
        CHAOS_FLAG.isAvailable &= artifactGet >= 15;
    }
    // Buildings
    if(Number.isNaN(maxBuild)){maxBuild = 0;}
    for (let i = 0; i < 19; i++) {
        if (i >= 3) {building[i].isAvailable = (COOKIE.value >= buildingData[i - 1].baseCost) || (building[i].level > 0);}
        else {building[i].isAvailable = true;}
        building[i].isAvailable &= (normalUpgradeMenu.level == 0);
        buildingPower[i].isAvailable = building[i].level > 0 && permUpgradeMenu.level == 0;
        buildingLump[i].isAvailable = building[i].level > 10 && permUpgradeMenu.level == 0;
        buildingExponent[i].isAvailable = ((building[i].level > 0) || i <= maxBuild) && (normalUpgradeMenu.level == 2) && (modeExponentium.level == 0);
        buildingExponentRemove[i].isAvailable = ((building[i].level > 0) || i <= maxBuild) && (normalUpgradeMenu.level == 2) && (modeExponentium.level == 1);
    }
    exponentium.isAvailable = (normalUpgradeMenu.level == 2);
    modeExponentium.isAvailable = (normalUpgradeMenu.level == 2);
    building[14].isAvailable = (artifactUpgrade[9].level > 0) && (normalUpgradeMenu.level == 0);
    building[16].isAvailable = (jetTransistor.level > 0) && (normalUpgradeMenu.level == 0);
    building[17].isAvailable = (moonMarble.level > 0) && (normalUpgradeMenu.level == 0);
    building[18].isAvailable = (researchUpgrade[18].level > 0) && (normalUpgradeMenu.level == 0);
    // Cookieh
    cookieTasty.isAvailable = COOKIE.value > BF(1e5) && normalUpgradeMenu.level == 1;
    kitty.isAvailable = achCount > 1 && normalUpgradeMenu.level == 1;
    for(let i=0;i<(cookieTinInfo.length);i++){
        cookieTin[i].isAvailable = (cookieTinUnlock.level > i) && (COOKIE.value > (cookieTinInfo[i].baseCost)/BF(50) || cookieTin[i].level > 0) && (normalUpgradeMenu.level == 1);
    }
    // Heavenly Upgrades
    cookieTinUnlock.isAvailable = HEAVENLY_CHIP.value >= BF(10) && (permUpgradeMenu.level == 1);
    CookieH.isAvailable = HEAVENLY_CHIP.value >= BF(500) && (permUpgradeMenu.level == 1);
    CookieS.isAvailable = HEAVENLY_CHIP.value >= BF(10000) && (permUpgradeMenu.level == 1);
    CookieC.isAvailable = HEAVENLY_CHIP.value >= BF(1e7) && (permUpgradeMenu.level == 1);
    DivineD.isAvailable = HEAVENLY_CHIP.value >= BF(1e10) && (permUpgradeMenu.level == 1);
    CookieTau.isAvailable = HEAVENLY_CHIP.value >= BF(1e12) && (permUpgradeMenu.level == 1);
    TerraInf.isAvailable = HEAVENLY_CHIP.value >= BF(1e50) && (permUpgradeMenu.level == 1);
    TwinGates.isAvailable = ChronosAge.level > 0 && (permUpgradeMenu.level == 1);
    ChronosAge.isAvailable = ygg.level > 0 && (permUpgradeMenu.level == 1);
    ConjureBuild.isAvailable = invest.level >= 10 && (permUpgradeMenu.level == 1);
    R9Box.isAvailable = HEAVENLY_CHIP.value > BF(1e79) && (permUpgradeMenu.level == 1);
    conGrow.isAvailable = HEAVENLY_CHIP.value > BF(1e100) && (permUpgradeMenu.level == 1);
    SpellStack.isAvailable = HEAVENLY_CHIP.value > BF(1e100) && (permUpgradeMenu.level == 1);
    Empower.isAvailable = HEAVENLY_CHIP.value > BF(1e115) && (permUpgradeMenu.level == 1);
    heavenInspire.isAvailable = HEAVENLY_CHIP.value > BF(1e180) && (permUpgradeMenu.level == 1);
    DivineOneHalf.isAvailable = HEAVENLY_CHIP.value > BF(1e240) && (permUpgradeMenu.level == 1) && researchUpgrade[37].level > 0;
    //milkOil.isAvailable = HEAVENLY_CHIP.value > BF(1e130) && (permUpgradeMenu.level == 1);
    // Gimmick
    covenant.isAvailable = COOKIE.value >= BF(1e60) && (normalUpgradeMenu.level == 0);
    ygg.isAvailable = COOKIE.value >= BF(1e100) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0 || CHAOS_STAGE.level >= 3);
    terra.isAvailable = COOKIE.value >= BF(1e125) && (normalUpgradeMenu.level == 0);
    recom.isAvailable = COOKIE.value >= BF(1e155) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0 || CHAOS_STAGE.level >= 2);
    invest.isAvailable = COOKIE.value >= BF(1e180) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0 || CHAOS_STAGE.level >= 2);
    investRespec.isAvailable = invest.level >= 100 && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0 || CHAOS_STAGE.level >= 2);
    archaeology.isAvailable = COOKIE.value >= BF(1e245) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0);
    artifactPouch.isAvailable = archaeology.isAvailable && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0);
    templeReset.isAvailable = archaeology.isAvailable && archaeology.level >= 10 && (normalUpgradeMenu.level == 0);
    for(let i=0;i<artifactCount;i++){
        artifactUpgrade[i].isAvailable = archaeology.isAvailable && (artifactPouch.level == 1) && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0);
    }
    SpellView.isAvailable = artifactUpgrade[10].level > 0 && (normalUpgradeMenu.level == 0) && (CHAOS_STAGE.level == 0);
    for(let i=0;i<spellUsed;i++){
        spellCast[i].isAvailable = SpellView.isAvailable && (SpellView.level > 0) && spellData[i].unlockCondition() && (CHAOS_STAGE.level == 0);
    }
    excavatorSiteGrant.isAvailable = (permUpgradeMenu.level == 2);
    excavatorDrill.isAvailable = (permUpgradeMenu.level == 2);
    excavator.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 0);
    for(let i=0;i<excavatedElements;i++){
        excavatorModule[i].isAvailable = (permUpgradeMenu.level == 2);
    }
    accelerator.isAvailable = ((cherryRegulator.level + hazelSolution.level + moonCore.level) >= 3) && (permUpgradeMenu.level == 2);
    acceleratorButton.isAvailable = (accelerator.level > 0) && (normalUpgradeMenu.level == 0);
    acceleratorControl.isAvailable = (accelerator.level > 0) && (normalUpgradeMenu.level == 0);
    fusionReactor.isAvailable = (researchUpgrade[22].level > 0) && (artifactUpgrade[15].level > 0) && (normalUpgradeMenu.level == 0);
    //elements
    chalcedIngredient.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 1);
    butterBar.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 2);
    sugarTools.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 3);
    jetEngine.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 4);
    jetRefine.isAvailable = (permUpgradeMenu.level == 2) && (astroExtract.level > 0);
    jetTransistor.isAvailable = jetEngine.isAvailable;
    jetParallel.isAvailable = (permUpgradeMenu.level == 2) && (artifactUpgrade[11].level > 0);
    astroExtract.isAvailable = (permUpgradeMenu.level == 2) && (artifactUpgrade[13].level > 0);
    cherryRegulator.isAvailable = (permUpgradeMenu.level == 2) && building[16].isAvailable;
    hazelSolution.isAvailable = (permUpgradeMenu.level == 2) && building[16].isAvailable;
    moonCore.isAvailable = (permUpgradeMenu.level == 2) && building[16].isAvailable;
    moonMarble.isAvailable = (permUpgradeMenu.level == 2) && (accelerator.level > 1);
    astroExcavate.isAvailable = (permUpgradeMenu.level == 2) && (accelerator.level > 0);
    //Milestone
    superL.isAvailable = (superP.level > 0) && (superC.level > 0);
};

//!Tick
var terraBoost = BF(1), dilateBoost = BF(1), setupTick = true, IdleCPS = BF(0), accelerateTick = false;
var cookieProductionNerfFunConsoleValue = 1;//DO NOT CHANGE
function updateNerfConsoleValue(val){
    cookieProductionNerfFunConsoleValue = val;
}
var thymeInc = () => {
    //thyme = ticks elapsed
    thyme.level += (thyme.level < thyme.maxLevel) ? 1 : 0;
    if(artifactUpgrade[10].level > 0){
        updateSpellCooldown(1);
    }
}
var thymeInc = (ticks) => {
    //thyme = ticks elapsed
    thyme.level += (thyme.level < thyme.maxLevel) ? ticks : 0;
    if(artifactUpgrade[10].level > 0){
        updateSpellCooldown(ticks);
    }
}
var researchInc = (ticks) => {
    if(occupiedSlots.level > 0){
        for(let i=0;i<occupiedSlots.level;i++){
            let id = researchSlotID[i].level;
            updateResearchText(id,2,`Researching : ${getCollectionBar((researchData[id].time - researchSlot[i].level)/(researchData[id].time/maxResearchProgress),maxResearchProgress)}`);
            if(ticks >= researchSlot[i].level){
                researchSlot[i].level = 0;
                researchUpgrade[researchSlotID[i].level].level = 1;
                if(researchSlotID[i].level == 35 || researchSlotID[i].level == 36){
                    CHAOS_STAGE.level += 1;
                }
                updateResearchText(id,2,researchDone);
                updateResearchLabel();
                occupiedSlots.level -= 1;
                log(`R${researchSlotID[i].level} completed, i = ${i}`);
                //shift down
                for(let j=i;j<=occupiedSlots.level;j++){
                    researchSlot[j].level = researchSlot[j+1].level;
                    researchSlotID[j].level = researchSlotID[j+1].level;
                }
                getResearching();
                for(let i=0;i<19;i++){
                    updateLocalMult(i);
                }
                updateResearchButtonText();
                updateBuildingLumpMaxLv();updateGlobalMult();
                CPSrefresh();
                calcEPS();
                researchSlot[occupiedSlots.level].level = 0;
                researchSlotID[occupiedSlots.level].level = 0;
                if(researchSlotID[i].level == 19){
                    updateCurrencyIcon();
                }
                break;
            }else{
                researchSlot[i].level -= ticks;
            }
        }
    }
    if(!game.isCalculatingOfflineProgress){
        getResearchProgress();
    }
}
var generateCookie = (id, ticks, mult) => {
    let ret = BF(1);
    ret = BF(calcBuilding(id,investHelp[id].level) * globalMult * buildingData[id].mult * buildingData[id].baseCPS * (ticks / 10));
    let pow = getBuildingExp(id);
    //cursor power
    if(buildingExponent[id].level != 0){ret = BigP(ret,pow);}
    ret /= cookieProductionNerfFunConsoleValue;
    if(ret > CPS){
        CPS = ret;
        dominate = id;dominatestore.setValue(dominate);
        CPSstore.setValue(ret);
    }
    ret *= mult;
    if(id == 17 && researchUpgrade[20].level > 0){
        let cortexGen = generateCookie(18,ticks,mult);
        if(cortexGen > ret){
            ret += 0.9*(cortexGen-ret);
        }
    }
    if(ticks == buildingData[id].collectionTime && mult == terraBoost){
        latestCollect[id] = ret;
    }
    //log(`get ${ret}`);
    //log(`generating for ${id}, base = ${ret}, pow = ${pow}`);
    return ret;
}
var generateLump = (ticks) => {
    let lumpChance = BF(1) / (BF(lumpTickChance) / BigL10(COOKIE.value + BF(10)));//it's normally 1/x
    let dLump = BF(lumpChance.floor() + (sugarTools.level * 0.25) + (2 * researchUpgrade[3].level) + ((recom.level + ((artifactUpgrade[7].level > 0) ? 10 : 0)) * 0.01)) * ticks;//yes, ticks ARE 0.1 seconds so 2.5LPS = 0.25LPT
    //log(dLump);
    lumpChance -= lumpChance.floor();
    if (ticks == 1 && BF(Math.random()) <= lumpChance) {
        dLump += BF(1);
    }else if(ticks > 1){
        dLump += lumpChance*ticks;
    }
    dLump *= BigP(RandR(7.5,20),researchUpgrade[24].level);
    if(dLump > BF(0)){
        SUGAR_LUMP.value += dLump;
        lumpTotal.setValue(lumpTotal.value + dLump);
    }
};
var refreshLocalMult = () => {
    for(let i=0;i<19;i++){
        updateLocalMult(i);
        if(buildingData[i].mult == BF(0)){
            log(`B${i} gives 0`);
            buildingData[i].mult = BF(1);
        }
    }
}
var calcIdleCPS = () => {
    IdleCPS = BF(0);
    for(let i=0;i<19;i++){
        updateLocalMult(i);
        IdleCPS += generateCookie(i,10,terraBoost);
    }
}
var performanceTester = () => {
    genChaosText("a short string");
}
var profilingConst = false;
//var profiler1 = profilers.get("profiler1");
var profiler1 = profilers.get("profiler1");
var tick = (elapsedTime,multiplier) => {
    //log(`ET : ${elapsedTime}, M : ${multiplier}`);
    //log(`B : ${buildingLumpMult}`);
    //dt = 0.1 normally, so x10 for 1 second
    if(setupTick){
        log("setup tick");
        if(HEAVEN.level > 0){
            HEAVEN_RECORD.level = thyme.level;
            primaryEqFrame = -1;
            secondaryEqFrame = -1;
            secondaryEqMvt = 0;
            secondaryEqRevive = "";
            COOKIE.value = 1;
        }
        updateTerraOverlay();
        updateBuildingLumpPower();
        for(let i=0;i<19;i++){
            updateLocalMult(i);
            buildingCount += building[i].level;
        }
        for(let i=0;i<artifactCount;i++){
            artifactUpgrade[i].maxLevel = Math.max(artifactUpgrade[i].level,artifactUnlock[i].level);
        }
        totalSpell = 0;
        for(let i=0;i<spellUsed;i++){
            totalSpell += spellCount[i].level;
        }
        updateLocalMult(1);
        totalSpellStore.setValue(totalSpell);
        updateBuildingLumpMaxLv();
        updateGlobalMult();
        updateMaxL();
        CPSrefresh();
        updateSpellLayer();
        calcEPS();
        refreshExcavatorMaxLv();
        updateResearchLabel();updateResearchButtonText();
        updateColorScale();updateCurrencyIcon();
        setupTick = false;
    }
    if(profilingConst){
        profiler1.exec(performanceTester);
        //log(`X = ${profiler1.mean}, SD = ${profiler1.stddev}, Z = ${(profiler1.latest-profiler1.mean)/profiler1.stddev}`);
        //log(`X = ${profiler1.mean}`);
        log(`Xf = ${1/profiler1.mean}`);
    }
    terraBoost = Logistic();
    dilateBoost = Dilate();
    //research
    researchInc(Math.round(elapsedTime * multiplier * 10));
    let dt =elapsedTime * multiplier * 10 * dilateBoost, cookieGain = BF(0);//1 tick = 0.1 second
    thymeInc(Math.round(dt));
    trueThyme.level += 1;
    //log(dt);
    theory.invalidateSecondaryEquation();
    //let theoryBonus = theory.publicationMultiplier;
    //idle
    if(isUninstalled()){
        if(HEAVEN.level > 0){
            //run animation
            let aniFrame = thyme.level - HEAVEN_RECORD.level;
            if(aniFrame >= absoluteEndPoint*10){
                CHAOS_PERSISTENT_STAGE.level = 2;
                normalUpgradeMenu.level = 0;
                permUpgradeMenu.level = 0;
                HEAVEN.level = 0;
                PROGRAM.level = 0;
                UNINSTALL.level = 0;
                CHAOS_STAGE.level = 0;
                COOKIE.value = BF("1e750");
            }
            if(aniFrame >= climbDelay*10){
                if(aniFrame >= primaryDelay*10){
                    if(aniFrame >= secondaryDelay*10){
                        if((aniFrame - secondaryDelay*10)%(Math.round(100/secondaryFrames[secondaryEqMvt].length)) == 0){
                            updateSecondaryEqRev();
                        }
                    }
                    if((aniFrame - primaryDelay*10)%(Math.round(10*primaryLen/primaryFrame.length)) == 0){
                        primaryEqFrame = Math.min(primaryEqFrame+1,primaryFrame.length-1);
                    }
                }
                COOKIE.value = BigMin(BF("9e749"),COOKIE.value * BigP(10,750/(climbLen*10)));
            }
        }
        if(PROGRAM.level > 0 && HEAVEN_COUNTDOWN.level > 0){
            HEAVEN_COUNTDOWN.level = Math.max(0,HEAVEN_COUNTDOWN.level - dt);
        }
        if(thyme.level % 10 == 0){
            updateAvailability();
        }
        theory.invalidatePrimaryEquation();
        return;
    }
    if(game.isCalculatingOfflineProgress){
        if(terra.level > 0)xBegin = thyme.level - ((terraDurMod * 1.01) * (terra.level));
        terraBoost = Logistic();
        if(IdleCPS == BF(0)){
            updateGlobalMult();
            refreshLocalMult();
            calcIdleCPS();
            calcEPS();
        }
        dt *= 0.9;
        cookieGain += IdleCPS * dt/10;
    }else{
        //cookie
        if(thyme.level % 5 == 0){
            if(CHAOS_STAGE.level > 2){
                updateChaosBuildingName();
            }
            if(dt >= buildingData[dominate].collection){
                cookieGain += generateCookie(dominate,dt,terraBoost);
            }else{
                for(let i=0;i<=9;i++){
                    let id = i*2;
                    if(dt >= buildingData[id].collectionTime){
                        cookieGain += generateCookie(id,dt,terraBoost);
                        if(id < 18)cookieGain += generateCookie(id+1,dt,terraBoost);
                    }else if(thyme.level % buildingData[id].collectionTime == 0){
                        //log(`${i} due!`);
                        cookieGain += generateCookie(id,buildingData[id].collectionTime,terraBoost);
                        if(id < 18)cookieGain += generateCookie(id+1,buildingData[id+1].collectionTime,terraBoost);
                    }
                }
            }
            if(thyme.level % 2 == 0){//5 * 2 = 10
                clickStreak = 0;
                updateStrobe();
                updateGlobalMult();
                updateAvailability();
                //updateCurrencyIcon();
                updateLocalMult(2);//yggdrasil, leave covenant to onBuildingBought
                //CPSrefresh();
                chaosR = 128+RandI(127);chaosG = 128+RandI(127);chaosB = 128+RandI(127);
            }
        }
    }
    if(fusionReactor.level > 0){
        cookieGain = BF(0);
        fuseCookie(dt,false);
    }
    cookieGain = checkGainOverLimit(cookieGain);
    COOKIE.value = checkCookieOverLimit(COOKIE.value + cookieGain);
    //lumps
    generateLump(dt);
    //elements
    //log(dt);
    if((trueThyme.level % 9 != (acceleratorMode.level+1)) || (acceleratorMode.level == 0) || (acceleratorButton.level == 0)){
        elements[trueThyme.level % 9].value += (9 * dt/10) * arrEPS[trueThyme.level % 9];
    }
    if(acceleratorButton.level == 1 && acceleratorMode.level > 0){
        decayElement(acceleratorMode.level+1,dt);
    }
    //heavenly chips
    if(researchUpgrade[4].level > 0){
        HEAVENLY_CHIP.value += BigP(HEAVENLY_CHIP.value,0.9);
    }
    theory.invalidateQuaternaryValues();
    theory.invalidateTertiaryEquation();
    //log(thyme.level);
};

//!==EQUATIONS==
const height = 60;
var quartList = new Array(9), quartList2 = new Array(5);
var multBySymbol = (symbol) => `${symbol} \\leftarrow ${symbol}`;
var PrimaryEquation = (col) => {
    //log(`${eqColor[Math.floor(col)]}`);
    return `\\color{#${eqColor[col]}}{\\dot{C} = P\\sum_{i=0}^{18}{\\frac{B(i)}{CT_i}}}`;
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
            return artifactUpgrade[11].level > 0;
            break;
        case 9:
            return artifactUpgrade[12].level > 0;
            break;
        case 10:
            return accelerator.level > 0;
            break;
        case 11:
            return researchUpgrade[22].level > 0;
        default:
            return true;
    }
};
var secondaryEq = (mode, col) => {
    if (Number.isNaN(col)) {
        col = 0;
    }
    if(Number.isNaN(mode)){
        mode = 0;
    }
    //log(`${eqColor[col]}`);
    //\color{#E6DFCF}{B(i) = B[i]P_{i}1.1^{L[i]}(\log_{10}\log_{10}\tau)^{2}}
    let ret = "";
    switch (mode) {
        case 0:
            theory.secondaryEquationScale = 0.95;
            ret += `B(i)=B[i]P_{i}p_{i}${buildingLumpMult}^{L[i]}\\\\`;
            ret += `${multBySymbol("P")}(\\frac{C_{ur}${buildingLumpMult}^{L[0]}}{100})\\\\`
            if(CookieTau.level > 0){ret += `${multBySymbol("P")}(\\log_{10}\\log_{10}\\tau)^{2}\\\\`;}
            if(TwinGates.level > 0){ret += `${multBySymbol("P")}H^{${twinGateExp}T_{w}}`;}
            if(R9Box.level > 0){ret += `\\sigma^{${R9BoxMult}R_{9}}`;}
            break;
        case 1:
            theory.secondaryEquationScale = 1;
            ret += `${multBySymbol("P")}M(Lv.)CP(Lv.)\\\\`  +
            (CookieS.level > 0 ? "(log_{2}(L + 2))^{1.5}" : "") +
            (CookieH.level > 0 ? "(log_{10}(H + 10))^{1.25}" : "") +
            (CookieC.level > 0 ? "\\\\(log_{10}(C + 10))^{0.9}" : "") +
            (invest.isAvailable > 0 ? "I_{o}^{1.01}" : "") +
            (artifactUpgrade[4].level > 0 ? `B[1]^{${gillesBoxPower}A_{4}}` : "");
            if(artifactUpgrade[4].level > 0 || astroExtract.level > 0){
                ret += `\\\\${multBySymbol("P")}${(artifactUpgrade[14].level > 0 ? "log_{10}(Cs)^{2}" : "")}${(astroExtract.level > 0 ? "50^{Ae}" : "")}`
            }
            break;
        case 2:
            theory.secondaryEquationScale = 1;
            ret += `M = K(0.2)+(K-10)(0.3)\\\\+(K-25)(0.4)+(K-50)(0.5)\\\\${(artifactUpgrade[2].level > 0) ? "\\\\M \\leftarrow M^{1+0.002A_{c}}" : ""}\\\\${multBySymbol("P")}(1+0.05A_{c})`;
            break;
        case 3:
            theory.secondaryEquationScale = 0.9;
            ret += `CP(l) = ${(DivineD.level > 0) ? "2^{D_{d}}" : ""}C_{1}(l)C_{2}()` +
                "\\\\C_{1}(l) = max_{l}:[0,25,50,75,100,150]\\\\ \\rightarrow [1.03,1.05,1.07,1.09,1.11,1.13]^{l}\\\\C_{2}() = \\prod_{i=0}^{8}{TP[i]^{CT[i]}}";
            break;
        case 4:// Cov
        theory.secondaryEquationScale = 1;
            let cp = " C_{v}";
            ret += `${multBySymbol("p_{2}")}(\\sum_{i=0}^{18}{B[i]})^{${covDelta}${cp}^{${covLvMod}} + ${covExp}}`;
            if(researchUpgrade[27].level > 0){
                ret += `\\\\${multBySymbol("p_{2}")}B[1]^{2}B[16]^{2.5}`;
            }
            break;
        case 5:// Ygg + Chronos
            // theory.secondaryEquationScale = 0.925;
            theory.secondaryEquationScale = 1;
            let ys = " Y_{g}";
            ret += `B(2) \\leftarrow ${yggBoost}B(2)P_{2}^{${yggPowBase} + ${yggPowLv}${ys}}\\\\(B[6]+B[2])^{${yggBPowBase} + ${yggBPowMod}${ys}^{${yggBPowLv}}}(1+t)^{${yggThymePow}}`;
            break;
        case 6:// Terra
            theory.secondaryEquationScale = 1;
            let tr = " T_{r}";
            let tf = " T_{\\infty}";
            let tm = " T_{m}";
            ret += `${tm}=\\frac{1500${tr}^{${maxLPowBase}+${maxLPowMod}(${tf}+A_{6})}}{${terraFunNerfMod}}\\\\`;
            ret += `T(t)=\\frac{${tm}^{1+${terraInfPow}${tf}}}{1+e^{t-(X_{b}+${terraDurMod}${tr})}}+${tm}^{0.1${tf}}`;
            break;
        case 7:// Recom
            theory.secondaryEquationScale = 1;
            let rc = " R_{c}";
            ret += `\\dot{H} = H^{0.9}(${rc})\\\\ \\dot{L} = 0.1(${rc}+10A_{7})+20R_3+0.25SP_{FT}\\\\ ${multBySymbol("p_{4}")}10^{27}${recomPowBase}^{${rc}-1}`;
            break;
        case 8:// Dilation
            theory.secondaryEquationScale = 1;
            return `\\color{#${eqColor[col]}}{T_d = \\frac{B[11]^{1+0.025T_D}}{1000^{T_f}}\\\\T_f = 1-\\frac{min(B[11],B[10]+B[12])}{(2.125-0.125T_{D}))(B[10]+B[12])}}`;
        case 9:// Elements
            theory.secondaryEquationScale = 0.85;
            let ep = "E_{p}", er = "E_{r}";
            ret += `${ep}=${getUniversalExcMult()},\\quad ${er}=\\prod_{i=0}^{${excavatedElements}}{Ef_{i}} \\\\ \\dot{E_{n}}=\\frac{E_{x}${ep}${er}log_{10}(C)}{100(${getLossFactor()}^{n})},\\: n \\neq 8${(artifactUpgrade[13].level > 0) ? `\\\\ \\dot{E_{8}}=${ep}${(researchUpgrade[29].level > 0)?`log_{10}(${er})`:""}\\frac{log_{10}(B[8])log_{10}(B(8))}{1000}` : ``}`;
            break;
        case 10:// Decay
            let ingre = (acceleratorMode.level - 1 == -1) ? "E_{n}" : `${elementData[acceleratorMode.level - 1 + 2].symbol}`;
            let r1 = (acceleratorMode.level - 1 == -1) ? "E_{n-1}" : `${elementData[acceleratorMode.level - 1 + 1].symbol}`;
            let r2 = (acceleratorMode.level - 1 == -1) ? "E_{n-2}" : `${elementData[acceleratorMode.level - 1].symbol}`;
            let b1 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1 + 2].symbol}=${elementData[acceleratorMode.level - 1 + 2].weight}u`;
            let b2 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1 + 1].symbol}=${elementData[acceleratorMode.level - 1 + 1].weight}u`;
            let b3 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1].symbol}=${elementData[acceleratorMode.level - 1].weight}u`;
            ret += `${b1} \\quad ${b2} \\quad ${b3}\\\\${ingre} \\rightarrow ${ingre}(${r1}) + ${ingre}(${r2}) + \\frac{${(acceleratorMode.level - 1 == -1) ? "\\lambda " : elementData[acceleratorMode.level - 1 + 2].weight + elementData[acceleratorMode.level - 1 + 1].weight + elementData[acceleratorMode.level - 1].weight}C_{m}}{${cookieYieldFactor}(${weightFactor})}\\\\\\dot{R} = B[12]\\lambda ${ingre}^{0.9+C_{c}(log_{10}(${ingre})-60)}`;
            break;
        case 11://Fusion
            ret += `F_{C} = log_{10}(As) + (log_{10}(C)-${minFusion})^{${1.11}}\\\\ \\dot{As}=${0.75}F_{C}\\dot{E_{8}}\\\\ \\dot{H_{EC}}=${Math.round(astroDecayWF)}F_{C}\\\\ \\dot{C}=-(10^{\\frac{-1}{${magnitudeTime*10}}})C`;
            break;
    }
    return colorizeHex(ret,eqColor[col]);
};
var TertiaryEquation = (col) => {
    if (Number.isNaN(col)) {
        col = 0;
    }
    let terraStr = ``;
    if(terra.level > 0){
        terraStr = `\\quad T = ${Logistic()}/${maxL}`
    }
    return `\\color{#${eqColor[col]}}{` + theory.latexSymbol + `=\\max C^{0.8}${terraStr}}`;
};
var getPrimaryEquation = () => {
    if(isUninstalled()){
        if(HEAVEN.level > 0){
            let len = thyme.level - HEAVEN_RECORD.level;
            if(primaryEqFrame >= 0){
                theory.primaryEquationScale = 1.15;
                theory.primaryEquationHeight = height;
                return colorizeHex(primaryFrame[primaryEqFrame],(thyme.level % 4 < 2)?`00FF00`:`FFFFFF`);
            }
            return colorizeHex(`Executing\\; Revival...`,(thyme.level % 4 < 2)?`00FF00`:`FFFFFF`);
        }
        if(PROGRAM.level > 0){
            return colorizeHex(`Countdown\\; to\\; Payload\\; Execution...\\\\${HEAVEN_COUNTDOWN.level / 10}`,`00FF00`);
        }else{
            return colorizeHex(`C:/Windows/System32>${(thyme.level % 10 > 5)?"\\_":""}`,`00FF00`);
        }
    }
    theory.primaryEquationScale = 1.15;
    theory.primaryEquationHeight = height;
    if (Number.isNaN(eqC)) {
        eqC = 0;
    }
    return PrimaryEquation(eqC);
};
var getSecondaryEquation = () => {
    if(HEAVEN.level > 0){
        theory.secondaryEquationHeight = 90;
        theory.secondaryEquationScale = 0.95;
        return colorizeHex(secondaryEqRevive,(thyme.level % 4 < 2)?`00FF00`:`FFFFFF`);
    }
    if(isUninstalled()){
        return ``;
    }
    theory.secondaryEquationHeight = 90;
    theory.secondaryEquationScale = 1.1;
    return secondaryEq(eqType, eqC);
};
var getTertiaryEquation = () => {
    if (Number.isNaN(eqC)) {
        eqC = 0;
    }
    if(isUninstalled()){
        return ``;
    }
    return TertiaryEquation(eqC);
};
var getQuaternaryEntries = () => {
    if(isUninstalled()){
        return [];
    }
    for (let i = 0; i < 9; i++) {
        quartList[i].value = (excavatorDrill.level >= (i + 1) || ((i == 8) && (artifactUpgrade[13].level > 0))) ? elements[i].value : null;
    }
    quartList2[0].value = CPS;
    quartList2[1].value = thyme.level / 10;
    quartList2[2].value = achCount;
    quartList2[3].value = globalMult;
    quartList2[4].value = null;
    if (quType == 0) {
        return quartList2;
    } else {
        return quartList;
    }
};


//!==OTHER THEORY BACKBONE==
var elemBefore = new Array(9), clickStreak = 0, buildingExponentBefore = new Array(19), exponentiumBefore, exponentiumLvBefore;
var get2DGraphValue = () => {
    if(isUninstalled() && HEAVEN.level == 0){
        return 1;
    }
    return (COOKIE.value.sign *(BigNumber.ONE + COOKIE.value.abs()).log10().toNumber());
};
var getPublicationMultiplier = (tau) => tau.pow(0.267);
var getPublicationMultiplierFormula = (symbol) => symbol + `^{${0.267}}`;
var postPublish = () => {
    updateColorScale();
    updateTerraOverlay();
    for (let i = 0; i < usedElements; i++) {
        elements[i].value = elemBefore[i];
    }
    for(let i=0;i<usedStory;i++){
        chapterUnlock[i].level = (chapter[i].isUnlocked)?1:0;
    }
    exponentium.level = exponentiumLvBefore;
    EXPO_BAR.value = exponentiumBefore;
    for(let i=0;i<19;i++){
        buildingExponent[i].level = buildingExponentBefore[i] ;
    }
    SUGAR_LUMP.value = lumpbf;
    HEAVENLY_CHIP.value = hbf;
    CPS = BigNumber.ZERO;
    buildingCount = 0;
    getEquationOverlay();
    updateAvailability();
    updateGlobalMult();
    terraBoost = BF(1);
    dilateBoost = BF(1);
    updateMaxL();
    for(let i=0;i<19;i++){
        updateLocalMult(i);
    }
    updateBuildingLumpMaxLv();
};
var prePublish = () => {
    lumpbf = SUGAR_LUMP.value;
    hbf = HEAVENLY_CHIP.value;
    hbf += (COOKIE.value / BF("1e12")).pow(1 / 3);
    //isSpellShown = 0;
    CPS = BF(0);CPSstore.setValue(CPS);
    for (let i = 0; i < usedElements; i++) {
        elemBefore[i] = elements[i].value;
    }
    for(let i = 0;i < spellData.length;i++){
        spellCooldown[i].level = 0;
    }
    exponentiumLvBefore = exponentium.level;
    exponentiumBefore = EXPO_BAR.value;
    for(let i=0;i<19;i++){
        buildingExponentBefore[i] = buildingExponent[i].level;
    }
};
var getTau = () => (COOKIE.value.abs()).pow(0.2*4);
var getCurrencyFromTau = (tau) => [tau.max(BigNumber.ONE).pow(5/4), COOKIE.symbol];


//==UI==
//! The text is arranged as follows: Introduction, Exponents, Cookies and Milk, Special Upgrades, Terraform Powerup, Archaeology, Grimoire, SPOILERS:(((((Elements and Alchemy, Subgames, Bingo Research Facility)))))
var COLOR_WHITE = Color.fromRgb(1,1,1), COLOR_GREEN = Color.fromRgb(0,1,0), COLOR_YELLOW = Color.fromRgb(1,1,0), COLOR_LIGHTBLUE = Color.fromRgb(0,1,1);
//!1.1 : HELP MENU; Just a bunch of text that is used in the help menu and a placeholder for the REAL help menu, meanwhile enjoy this placeholder text
var getHelpText = () => {
    let ret = [];
    ret.push(ui.createLabel({
        text: "Welcome to a theory all about cookies and more cookies!!!\n You have 3 currencies, cookies(C), heavenly chips(H), and sugar lumps(L), which you'll be spending on upgrades located on both tabs.\n\nCookies(C) by far is the most important, as the majority of the gameplay revolves around it, from buildings to even tau! You can get your first batch of cookies by buying a cursor, which is gifted to you for free to kickstart your very own cookie empire! Each building has their own production time which is depicted by a bar. When the bar is filled up, the building produces cookies! For this page, we will refer to the cookies collected from a building as CCB.\n\nHeavenly Chips(H) are a special type of cookie that forms whenever you sacrificed everything material you own in exchange for greater power(called publications). They can be used for all sorts of special upgrades, and might even end up boosting your CPS if you know enough.\n\nSugar lumps(L) by far are the hardest to acquire, literally requiring luck in order to get some, but its powers of being able to outright boost your building's CPS by 10%, multiplicative! Rumor has it that it gets easier to acquire the more cookies you have.\n",
        fontSize: 15,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 10, 2, 10)
    }));
    if (COOKIE.value >= BF(500)) {
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
    if (COOKIE.value >= BF(500)) {
        ret.push(ui.createLabel({
            text: "Milk and Flavors",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Switching from \"Current Menu : [1] Buildings\" reveals 2 new upgrades : Milk and Cookie Flavor. Milk boosts CCB the more achievements you have(accessible through the \"Achievements\" page, and some achievement is worth more)(also the labors are all paid for by the felines[might not be the case later on]). Cookie Flavor sprinkles more variance and flavor into your cookie empire which apparently means more cookies for some reason.",
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
            text: "Unique Upgrades are special upgrades that is placed directly under a building. These upgrades has a unique effect that totally overhauls how the custom theory is played. The Grandmother\'s Covenant is the first of the \"Unique Upgrades\". They provide a massive boost to that building's CPS through P1 and the total amount of buildings you own, mildly exponentiated as a bonus.",
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
            text: "Terraform Buff is unlocked when you have the Unique Upgrade for mines, it provides a boost to your CCB for around 30 seconds depending on the level. To activate the buff, click the button directly below the Menu Button(Even if the icon is displayed as a padlock). You'll have higher maximum boosts the more mines you own, along with the upgrade level itself; and even a way to preserve some of the boosts later on.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (archaeology.isAvailable) {
        ret.push(ui.createLabel({
            text: "Archaeology",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Archaeology is a game mechanic revolving around exploring your very own temple in search for funny artifacts that will help you later on. The \"Artifact Pouch\" upgrade is where all your artifacts, both discovered or not are listed. To discover an artifact, a certain requirement must be completed, perhaps some luck may be needed. That requirement can be somewhat discerned through reading the clue for the respective one by viewing the information. Sometimes exploration might just not come back with upgrades, but something else...",
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
            text: "Grimoire allows you to cast spells through the tomes you had. It costs Sugar Lumps to cast a spell, and each spell can be casted until the level is maxed out(1 initially, until a certain heavenly upgrade is purchased). After casting a spell, it will need some time to recharge it(represented by a bar emptying out), which effectively resets the level back to 0 once the cooldown has finished.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (artifactUpgrade[12].level > 0) {
        ret.push(ui.createLabel({
            text: "Elements",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Elements are something that somehow appears once you purchased the 12th artifact, coming with it the third and final page of the \"Permanent\" upgrade tab. You can excavate elements by first getting a grant to do some \"Scorched Earth\" on the sites your geologists have carefully prospected out, costing you some cookies which gets more expensive the rarer the element is. Then you can establish an excavation site on, costing a certain amount of elements for all sites beyond Berrylium. Excavators are a new permanent building that is mainly used to excavate elements as mines are too crude to do one. For each element, there is a mining module for boosting mining output and a special upgrade for your cookie empire. All progression related to elements persist between publishing.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (accelerator.level > 0) {
        ret.push(ui.createLabel({
            text: "Atomic Acceleration",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Accelerators allows you to smash together heavier elements into light elements and cookies though applying the technology used for building antimatter condensers. The upgrade for building accelerators can be found right below the excavation sites provided you purchased the prerequisite upgrades. To begin : click on the \"Open Reactor Control Panel\" coming with the first reactor to open the screen to set up the element for decay. In the menu, the cross button turns off the accelerator, and the rest sets to whatever element it displays(If you don't have that the text won\'t change). Click confirm, which sets that elements to be accelerated. Then you can control whether to turn on or off the accelerator through \"Accelerator Mode : OFF\" upgrade.",
            fontSize: 15,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.NONE,
            padding: Thickness(2, 10, 2, 10)
        }));
    }
    if (COOKIE.value > BF("1e500")) {
        ret.push(ui.createLabel({
            text: "Bingo Research Center",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
            fontAttributes: FontAttributes.BOLD,
            padding: Thickness(2, 15, 2, 10)
        }));
        ret.push(ui.createLabel({
            text: "Once you have baked enough cookies to start your own research conglomerate(around 1e500 C), you can begin to research even more advanced technologies for your empire. Click the \"Research\" button from the Main Menu to access the list of possible researches. Each research will have its own name, description, time requirement, and cost displayed in a scrollable list. Press on any unlocked research to see its cost and if you can afford it, press \"Research\" to begin researching. Initially, nearly the entire list will be unknown until you\'ve researched enough to unlock them, and certain research may require multiple other researches to even unlock them!",
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
        text: "1.0.0 - Official Release",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-Really, this is the official release of this Custom Theory!\n\t-Completed the rest of the logs and added ending text\n\t-Big things at the ending, find it out or try reverse-engineering it(don\'t)\n\t-Initial postgame content up to e800, to the moon, and BEYOND!!!\n\t-Final LimitBreak to self-imposed limits such that no 2.1 Billion Levels happen\n\t-Getting further beyond the threshold will cause some funky effects\n\t-Last building temporarily capped at just below 12K, if anyone reaches it legitimately I\'ll add a special cookie\n\t-Considering doing lb, after finalizing some more balancing due to high tau stakes\n\t-There is now 16 heavenly upgrades, perhaps Diving Doubling isn\'t enough for the decay \n\t-Broken the active development cursed that has lingered for long enough",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).3.3 - hacking",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-18th log added, in the endgame\n\t-added some more researches idk spoilers right there\n\t-removed bugs, as always\n\t-added content for post-threshold\n\t-another LimitBreak\n\t-haha max levels go brrrrrrrrrr\n\t-haha gimmick gets locked or nerfed\n\t-arcane sugar will make spells more expensive, good stuff always come at a cost\n\t-you can hack buildings to be even sweeter than what was possible\n\t-setting up stuffs for late stage GRANDMAHACKER\n\t-update taking too long, some stuffs missing",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).3.2 - brains",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-17th log added, getting to the endgame\n\t-added 8 new researches up to e650, where even more thing seems off\n\t-removed bugs, as always\n\t-currency bar rework, now with even more images\n\t-cortex baker capped to limit progression\n\t-added cookie LimitBreak\n\t-you can now fuse cookies, provided you have enough cookies\n\t-upped the ante of some research and accelerator\n\t-capped how much you can mine as the earth here is obviously limited\n\t-nerfed some cortex bakers and sugar lump demands\n\t-now compliant with new e600 tau standard",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).3.1",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-entire lore rework : better, more rad, and more lore\n\t-lore will not interrupt your session without prior consent\n\t-minor tweaks to some equations\n\t-removed bugs\n\t-removed demonic stuffs\n\t-buying a lot of cortex baker will do something idk\n\t-limited cortex bakers to 500 in preparations for 2nd wave of research upgrades and a new currency",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).3.0 - big brain time",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-new feature : 🔬 bingo research center 🔬 for all your nerdy needs, replacing subgames \n\t-20 new researches (for NOW) \n\t-new building : idleverse (please don\'t make too much colonialism jokes) with a special method of unlocking them (again) \n\t-more elements fun \n\t-officially nooq\'d out time dilation and aqua crustulae, we don\'t need those anymore \n\t-official support for cortex bakers and progression to e600 \n\t-corrected jojo references for the secret spell \n\t-we really are heading towards uncharted lands, beyond what the original version could ever dream \n\t-it is now possible to buy catgirls (do not take this out of context) \n\t-story rework coming soon",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).2.0 - back in business bois",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t-brought back elements and particle accelerators, find it in page 3 of permanent tab and below particle accelerators \n\t-overhauled the entire system of the 2 things mentioned above \n\t-e500 is real \n\t-more fleshed out upgrades that depend on elements, perhaps a pseudo-tech tree even \n\t-moved exponentium to page 3 of normal upgrades \n\t-technically made time dilation artifact discoverable \n\t-made accelerator more controllable and now comes with 7 fancy lights \n\t-heavenly upgrades \n\t-super L milestone now works \n\t-2 artifacts related to elements \n\t-idleverse now buyable but you must be able to contain them \n\t-bugfixes",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).1.0 - with gimmicks come gimmicks",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t- brought back artifacts and the wonderous world of spell casting \n\t-a whole lot of balance changes to artifacts and spells, notably concerning with how ez it is to gain sugar lump nowadays \n\t-it should be possible to push to e350 \n\t-more nerd \n\t-spells should be more costly to cast and comes with a visible cooldown bar \n\t-locked some artifacts for now as they\'re being reworked \n\t-introduced some luck into unlocking later artifacts, those thing can\'t just spawn out of nowhere, you know? \n\t-added resetting investment and artifacts for unsatisfied players \n\t-more achievements for investment and spell-casting, which means colored named gets pushed back slightly \n\t-reintroduced first milestone upgrades for cookie and building power \n\t-bugfixes",
        fontSize: 11,
        horizontalTextAlignment: TextAlignment.START,
        fontAttributes: FontAttributes.NONE,
        padding: Thickness(2, 5, 2, 10)
    }));
    ret.push(ui.createLabel({
        text: "(0.5).0.0 - idler reborn",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t- literally reworked and rewrote the code from scratch(the classic ver. at least), source code should be easier to read and balancing would be easier in the future \n\t- reworked cookie gain to being based on collecting cookies from buildings once a certain time has passed for efficiency, will work on revamping instructions soon \n\t- freshened up some story/achievements/upgrade text \n\t- more names for kitty/clicking power/cookie upgrade\n\t- removed level cap of certain upgrades\n\t- hidden lump upgrades for now as oh my god it's so hard to balance it, maybe will limit levels early on before gently unlocking it as more sugar lump flows in \n\t- removed everything beyond Investment Openings for now, the rewrite itself is already hard enough on me and I still needed some balance for earlygame at least(looking at you covenant and yggdrasil) \n\t- disabled milestone upgrades until I get there \n\t- added a bunch of console-only query function for ease of tracking stuffs \n\t- more milk colors to satisfy achievement nerds\n\t - why am i writing this patch note in orteil style",
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
const eqName = ["Building CPS", "Building Power", "Milk", "Cookie Power", "Covenant", "Yggdrasil", "Mass Terraforming", "Recombobulators", "Time Dilation", "Elements", "Elemental Decay", "Cookie Fusion"];
const quName = ["Normal", "Elements"];
let quartButton = ui.createButton({
    text: `Quaternary Values\n${quName[quType]}`, row: 1, column: 1,
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () => {
        if ((artifactUpgrade[12].level > 0) || (elements[0].value > 0)) {
            quType = quType^1;
            quTypeStore.setValue(quType);
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
            bInfo = ((bInfo + 1)%3);
        } else {
            bInfo = ((bInfo + 1)%2);
        }
        bInfoStore.setValue(bInfo);
        biButton.text = `Building Display\n${binfoname[bInfo]}`;
    }
});
//!1.5 : COLOR / VISUALS
var indecide = 0;
const eqColor = ["FFFFFF", "E6DFCF", "A06846", "FFD4D8", "FE3246", "ABED6A", "EA8B01", "C48AE2", "F4E4BA", "FBF2D5", "AC6329", "E5BD46", "E71334", "E2DBD2", "83F2BC", "8F9098", "FF6D98", "AB5DF8", "F1398D", "50AB21", "D08072", "B08F7A", "00FFFF", "8800FF"];
const eqColorName = ["White", "Milk", "Chocolate", "Strawberry", "Raspberry", "Lime", "Orange", "Blueberry", "Banana", "Vanilla", "Caramel", "Honey", "Cherry", "Coconut", "Mint", "Licorice", "Rose", "Blackcurrant", "Dragonfruit", "Black Forest", "Peach", "Hazelnut", "Crystallized", "Pentallized"];
const eqColorAch = [0, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230];
const vizNames = ["On","Off","Zero Null Zilch Nada"];
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
let currencySymButton = ui.createButton({
    text: `Currency Symbol\n${vizNames[vizType]}`, row: 0, column: 0,
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () => {
        if(vizType > 0){
            vizType = 0;
        }else{
            vizType += 1;
        }
        currencySymButton.text = `Currency Symbol\n${vizNames[vizType]}`;
        vizTypeStore.setValue(vizType);
        //updateCurrencyIcon();
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
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/cb/Dragon%27s_Curve.png/revision/latest?cb=20181019210502");//fusion
    imagUpdate();
    for (let i = 0; i < 12; i++) {
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
    templateImage.source = ImageSource.fromUri("https://github.com/KS-Sainen/Custom-Theory-Cookie-Idler/blob/main/Assets/BlackForest_Milk.png?raw=true");
    imagUpdate();// black forest
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/a/a9/Peach_milk.png/revision/latest?cb=20230309090440");
    imagUpdate();//peach
    templateImage.source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/fb/Hazelnut_milk.png/revision/latest?cb=20230309090448");
    imagUpdate();//hazelnut - 2 ext milk flavors
    templateImage.source = ImageSource.fromUri("https://github.com/KS-Sainen/Custom-Theory-Cookie-Idler/blob/main/Assets/Crystallized_Milk.png?raw=true");
    imagUpdate();// crystallized
    templateImage.source = ImageSource.fromUri("https://github.com/KS-Sainen/Custom-Theory-Cookie-Idler/blob/main/Assets/Pentallized_Milk.png?raw=true");
    imagUpdate();// pentallized
    for (let i = 0; i < 24; i++) {
        completeColGrid[i].content.onTouched = (e) => {
            if (achCount >= eqColorAch[i]) {
                nexCol = i;
                indecide += 1;
                visualUI.content.children[6].text = `Chosen Color : ${eqColorName[nexCol]}`;
            }else{
                visualUI.content.children[6].text = `Chosen Color : Locked [${achCount}/${eqColorAch[i]}]`;
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
                                eqCStore.setValue(nexCol);
                                // for (let i = 0; i < 9; i++) {
                                //     quartList[i] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{_{${elemName[i]}}}`, elements[i].value));
                                // }
                                quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{C_m}`, null));
                                quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
                                quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T}`, null));
                                quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_m}`, null));
                                quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
                                theory.invalidatePrimaryEquation();
                                theory.invalidateSecondaryEquation();
                            }
                            if (eqType != nexSec) {
                                eqType = nexSec;
                                eqTypeStore.setValue(nexSec);
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
var wrongFlag = false;
var mysteryFunEntry = ui.createEntry({
    isPassword: true,
    maxLength: 256
});
var mysteryFunPopup = ui.createPopup({
    title:"?????",
    content: ui.createStackLayout({children:[
        mysteryFunEntry,
        ui.createButton({
            text: "Submit",
            onClicked: () => {
                let str = mysteryFunEntry.text;
                log(`Input : ${str}`);
                if(str === "GRANDMARESET"){
                    log(`You...`);
                    wrongFlag = true;
                    buildingCount -= building[1].level;
                    building[1].level = 0;
                    covenant.level = 0;
                    updateGlobalMult();
                }
                mysteryFunEntry.text = "";
                mysteryFunPopup.hide();
            }
        })
    ]}),
});
var causeFunChaosPopup = ui.createPopup({
    title:"The Threshold",
    content:ui.createStackLayout({children:[
        ui.createLatexLabel({
            text: "WARNING : Due to the unstable nature of putting shades onto grandmas, thoughtlessly proceeding with certain upgrades can cause the space-time continuum to destabilize. \n",
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: "The following gimmick upgrades will be disabled and partially reset:",
            margin: new Thickness(0,15,0,0),
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: "- Yggdrasil\\\\- Recombobulators\\\\- Investment Openings\\\\- Archaeology (Unbought artifacts CAN\'T be purchased later. Already-bought artifacts WON\'T be affected)\\\\- Grimoire",
            margin: new Thickness(0,0,0,15),
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.START,
        }),
        ui.createLatexLabel({
            text: "In exchange, the current limit will be broken, Terraform upgrade will receive its final buff, and the maximum number of Cortex Bakers will be greatly increased.",
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: "Do you wish to proceed?",
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createGrid({
            columnDefinitions:["50*","50*"],
            columnSpacing:8,
            children:[
                ui.createButton({
                    text:"No",column:0,
                    onTouched: (e) => {
                        causeFunChaosPopup.hide();
                    }
                }),
                ui.createButton({
                    text:"Yes",column:1,
                    onTouched: (e) => {
                        //initiate the reset
                        CHAOS_STAGE.level = 1 + researchUpgrade[35].level + researchUpgrade[36].level;
                        CHAOS_PERSISTENT_STAGE.level = 1;
                        if(CHAOS_STAGE.level < 3){
                            ygg.level = 0;
                        }
                        if(CHAOS_STAGE.level < 2){
                            recom.level = 0;
                        }
                        invest.level = 0;
                        for(let i=0;i<19;i++){
                            investHelp[i].level = 0;
                        }
                        archaeology.level = 0;
                        for(let i=0;i<spellCount;i++){
                            spellCooldown[i].level = 10;
                        }
                        causeFunChaosPopup.hide();
                        updateBuildingLumpMaxLv();
                    }
                })
            ]
        }),
    ]})
});
var uninstallCIPopup = ui.createPopup({
    title:"The Threshold",
    content:ui.createStackLayout({children:[
        ui.createLatexLabel({
            text: "WARNING : You are about to uninstall Cookie Idler, do you wish to proceed?",
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: " ",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: "This action is irreversible",
            fontSize: 12,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: " ",
            fontSize: 18,
            horizontalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createGrid({
            columnDefinitions:["50*","50*"],
            columnSpacing:8,
            children:[
                ui.createButton({
                    text:"No",column:0,
                    onTouched: (e) => {
                        uninstallCIPopup.hide();
                    }
                }),
                ui.createButton({
                    text:"Yes",column:1,
                    onTouched: (e) => {
                        //initiate the reset
                        UNINSTALL.level = 1;
                        COOKIE.value = 1;
                        normalUpgradeMenu.level = 3;
                        permUpgradeMenu.level = 3;
                        updateAvailability();
                        uninstallCIPopup.hide();
                        updateBuildingLumpMaxLv();
                        theory.invalidatePrimaryEquation();theory.invalidateSecondaryEquation();
                        theory.invalidateTertiaryEquation();theory.invalidateQuaternaryValues();
                    }
                })
            ]
        }),
    ]})
});
var isUninstalled = () => (normalUpgradeMenu.level == 3) && (permUpgradeMenu.level == 3);
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
var reactorInterim = 0;
function reactorChk(indx) {
    if (accelerator.level >= indx) {
        reactorInterim = indx;
        acceleratorMenu.content.children[2].text = `Current Element : ${(reactorInterim > 0) ? elementData[reactorInterim + 1].fullName : "OFF"}`;
    } else {
        reactorInterim = acceleratorMode.level;
    }
};
let dummyImage = {
    heightRequest: 91,
    onTouched: (e) => reactorChk(0),
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
        dummyGrid[i].content.onTouched = (e) => reactorChk(i);
    }
}
let acceleratorMenu = ui.createPopup({
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
                    log(reactorInterim);
                    acceleratorMode.level = reactorInterim;
                    accelerateTick = true;
                    theory.invalidateSecondaryEquation();
                    acceleratorMenu.hide();
                }
            })
        ]
    })
});
//!1.9 : RESEARCH
var costTableFontSize = 13, columnArr = [1,3,0,2], mainUpgradeStack = [], selectedResearch = -1;
var costTable = new Array(16);
for(let i=0;i<researchData.length;i++){
    //log(`R${i}`);
    mainUpgradeStack.push(ui.createFrame({
        content:ui.createGrid({
            heightRequest: 140,
            rowDefinitions:["30*","50*","20*"],
            children:[
                ui.createLabel({
                    padding: new Thickness(6,6,0,0), textColor: COLOR_WHITE,
                    row:0,column:0,fontSize:16,fontFamily: FontFamily.CMU_REGULAR,
                    horizontalTextAlignment: TextAlignment.START,
                    text:`${researchData[i].name}`,
                }),
                ui.createScrollView({
                    padding: new Thickness(6,0,0,0),
                    row:1,column:0,
                    content:ui.createLabel({
                        fontSize:9,fontAttributes: FontAttributes.ITALIC,
                        horizontalTextAlignment: TextAlignment.START,
                        text:`${researchData[i].desc}\nTime Required : ${getTimeString(researchData[i].time)}`,
                    })
                }),
                ui.createLabel({
                    padding: new Thickness(6,0,0,6),
                    row:2,column:0,fontSize:12,
                    horizontalTextAlignment: TextAlignment.START,
                    text:`Progress : ${getCollectionBar(0,100)}`,
                }),
            ]
        }),
        onTouched: (e) => {
            if(researchAvailable[i]){
                if(selectedResearch != -1){
                    updateResearchText(selectedResearch,0,`[${selectedResearch+1}] ${researchData[selectedResearch].name}`);
                }
                selectedResearch = i;
                updateCostTable(researchData[i].cost);
                updateResearchText(i,0,`[${i+1}] >> ${researchData[i].name} <<`);
                if(canAffordResearch(researchData[i].cost)){
                    researchMenu.content.children[1].children[0].text = "Cost";
                }else{
                    researchMenu.content.children[1].children[0].text = "Cost (Unaffordable!)";
                }
            }
        }
    }));
}
for(let i=0;i<16;i++){
    costTable[i] = ui.createLabel({fontSize:costTableFontSize,text:"",row:i%4,column:columnArr[Math.floor(i/4)],horizontalTextAlignment: TextAlignment.CENTER,textColor:COLOR_WHITE});
}
var updateCostTable = (costs) => {
    for(let i=0;i<8;i++){
        if(i < costs.length){
            if(isValidCostObj(costs[i])){
                if(canAffordCost(costs[i])){
                    costTable[i].textColor = COLOR_GREEN;
                    costTable[i+8].textColor = COLOR_GREEN;
                }else{
                    costTable[i].textColor = COLOR_WHITE;
                    costTable[i+8].textColor = COLOR_WHITE;
                }
                costTable[i].text = costs[i].amount.toString();
                costTable[i+8].text = `${getCostSymbol(costs[i].type)} : `;
            }else{
                costTable[i].text = "???";
                costTable[i+8].text = `???`;
            }
        }else{
            costTable[i].textColor = COLOR_WHITE;
            costTable[i+8].textColor = COLOR_WHITE;
            costTable[i].text = "";
            costTable[i+8].text = `-`;
        }
    }
}
var updateResearchButtonText = () => researchButton.text = `Research\n[${occupiedSlots.level}/${researchSlotUpgrade.level + 1}]`;
var researchButton = ui.createButton({
    row:1, column:1, fontSize: 18,
    text:`Research\n[0/0]`,
    onTouched: (e) => {
        if (e.type == TouchType.SHORTPRESS_RELEASED) {
            researchBegin(selectedResearch);
        }
    }
});
let researchMenu = ui.createPopup({
    title: "Bingo Research Facility",
    isPeekable: true,
    content: ui.createGrid({
        padding: new Thickness(6),
        rowDefinitions:["70*","30*"],
        heightRequest: 685,
        children:[
            ui.createStackLayout({
                row:0,column:0,
                children:[
                    ui.createFrame({
                        content:ui.createScrollView({
                            content: ui.createStackLayout({
                                padding: new Thickness(6),
                                spacing: 6,
                                children:mainUpgradeStack
                            })
                        })
                    })
                ]
            }),
            ui.createGrid({
                row:1,column:0,
                columnDefinitions: ["65*","30*"],
                rowDefinitions: ["15*","85*"],
                columnSpacing: 10,
                children:[
                    ui.createLabel({
                        row:0, column:0,
                        text: "Cost",
                        fontSize: 14,
                    }),
                    ui.createFrame({
                        row:1, column:0,
                        content:ui.createGrid({
                            heightRequest:125,
                            padding: new Thickness(3),
                            columnDefinitions: ["15*","35*","15*","35*"],
                            children:costTable
                        })
                    }),
                    researchButton
                ]
            }),
        ]
    })
});
//!1.10 : MAIN MENU
var versionStr = "1.0.0.2", parentCommit="c997cf7";
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
                        text: "???", row: 0, column: 1,
                        onClicked: () => {
                            clickStreak += 1;
                            if(clickStreak >= 5){
                                mysteryFunPopup.show();
                            }
                        }
                    }),
                    ui.createButton({
                        text: "Research", row: 1, column: 0,
                        onClicked: () => {
                            researchMenu.show();
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
                    currencySymButton,
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
                text: `Cookie Idler - ${parentCommit}\nv${versionStr}`
            })
        ]
    })
});
//!1.11 : OVERLAY
// credits to a_spiralist for making the button scale to the same size to the publication button + the source code of getImageSize(width)
let getImageSize = (width) => {
    if (width >= 1080)
        return 48;
    if (width >= 720)
        return 36;
    if (width >= 360)
        return 24;
    return 20;
};
// ellipsis you're so epic for contributing to getEquationOverlay() function
var eqOverlay = ui.createStackLayout({
    children: [
        ui.createImage({
            source: ImageSource.INFO,
            horizontalOptions: LayoutOptions.START,
            verticalOptions: LayoutOptions.END,
            aspect: Aspect.ASPECT_FIT,
            heightRequest: getImageSize(ui.screenWidth),
            widthRequest: getImageSize(ui.screenWidth),
            margin: new Thickness(9, 9, 0, 0),
            onTouched: (e) => {
                if (e.type == TouchType.SHORTPRESS_RELEASED) {
                    popup.show();
                }
            },
        }),
        ui.createLatexLabel({
            text: `Menu`,
            fontSize: 10,
            padding: new Thickness(9, 4, 0, 0),
        }),
        ui.createImage({
            source: ImageSource.LOCK,
            horizontalOptions: LayoutOptions.START,
            verticalOptions: LayoutOptions.END,
            aspect: Aspect.ASPECT_FIT,
            heightRequest: getImageSize(ui.screenWidth),
            widthRequest: getImageSize(ui.screenWidth),
            margin: new Thickness(9, 9, 0, 0),
            onTouched: (e) => {
                if (e.type == TouchType.SHORTPRESS_RELEASED && terra.level > 0) {
                    log("Boost!");
                    xBegin = thyme.level;
                    updateGlobalMult();
                }
            },
        }),
        ui.createLatexLabel({
            text: "Locked",
            fontSize: 10,
            padding: new Thickness(9, 9, 0, 0),
        }),
    ],
});
var getEquationOverlay = () => {
    if(isUninstalled()){
        return ui.createLatexLabel({
            text: `user : player`,
            fontSize: 10,
            margin: new Thickness(4, 4, 0, 0),
        });
    }else{
        return eqOverlay;
    }
};
//!1.12 : CURRENCY DELEGATE
var getCurrencyImageSize = (width) => {
    if (width >= 1080)
        return 30;
    if (width >= 720)
        return 25;
    if (width >= 360)
        return 18;
    return 16;
};
var getCurrencyTextSize = (width) => {
    if (width >= 720)
        return 11;
    if (width >= 360)
        return 10;
    return 9;
};
var currencyTextMargin = 1, currencyTextSize = 11;
//10 Cookie + 3 HC + 4 L + 3 HEC
var updateCurrencyIcon = () => {
    //cookie
    let meas = COOKIE.value;
    if(meas >= BF("1e750")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/66/Sugar_crystal_cookies.png/revision/latest?cb=20181024003829");
    }else if(meas >= BF("1e700")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/7/7b/Glimmeringue_cookie.png/revision/latest?cb=20230309051504");
    }else if(meas >= BF("1e600")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/7/7f/Alabascream_cookie.png/revision/latest?cb=20220309183149");
    }else if(meas >= BF("1e500")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/b/ba/Cosmic_chocolate_butter_biscuit.png/revision/latest?cb=20200621081548");
    }else if(meas >= BF("1e400")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/c/c1/Mooncandy_cookie.png/revision/latest?cb=20220309183046");
    }else if(meas >= BF("1e300")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/7/79/Jetmint_cookie.png/revision/latest?cb=20220309182940");
    }else if(meas >= BF("1e200")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/8/8b/Buttergold_cookie.png/revision/latest?cb=20220309182414");
    }else if(meas >= BF("1e100")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/20/Empire_biscuits.png/revision/latest?cb=20160217140019");
    }else if(meas >= BF("1e50")){
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/2/29/Double-chip_cookies.png/revision/latest?cb=20160217135951");
    }else{
        currencyBar.children[0].children[1].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052");
    }
    //hc
    meas = HEAVENLY_CHIP.value;
    if(meas >= BF("1e200")){
        currencyBar.children[0].children[2].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f1/Heavenly_cookies.png/revision/latest?cb=20180510065009");
    }else if(meas >= BF("1e100")){
        currencyBar.children[0].children[2].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/a/a4/Glucosmium_antimatter_condenser.png/revision/latest?cb=20220309175501");
    }else{
        currencyBar.children[0].children[2].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/eb/Heavenly_chip.png/revision/latest?cb=20160226200959");
    }
    //l
    meas = SUGAR_LUMP.value;
    if(meas >= BF(1e8)){
        currencyBar.children[0].children[3].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/f/f1/Caramelized_sugar_lump.png/revision/latest?cb=20180801004853");
    }else if(meas >= BF(1e7)){
        currencyBar.children[0].children[3].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/e/e3/Golden_sugar_lump.png/revision/latest?cb=20180512162412");
    }else if(meas >= BF(1e6)){
        currencyBar.children[0].children[3].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/a/a9/Sugar.png/revision/latest?cb=20200620212121");
    }else{
        currencyBar.children[0].children[3].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/d/dd/Sugar_lump.png/revision/latest?cb=20170812043247");
    }
    //hec
    if(researchUpgrade[19].level > 0){
        meas = HIGH_ELEMENT_CLUSTER.value;
        if(meas >= BF(1e9)){
            currencyBar.children[0].children[4].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/59/Unshackled_antimatter_condenser.png/revision/latest?cb=20220309190454");
        }else if(meas >= BF(1e6)){
            currencyBar.children[0].children[4].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/1/1c/Glimmeringue_antimatter_condenser.png/revision/latest?cb=20230309051614");
        }else{
            currencyBar.children[0].children[4].children[1].source = ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/1/18/Alabascream_antimatter_condenser.png/revision/latest?cb=20200620233352");
        }
    }else{
        currencyBar.children[0].children[4].children[1].source = ImageSource.LOCK;
    }
}
var currencyBar = ui.createGrid({
    margin: new Thickness(0,3,0,0),
    rowDefinitions: ["auto", "auto"],
    children: [
        ui.createStackLayout({
            row: 0,
            horizontalOptions: LayoutOptions.FILL_AND_EXPAND,
            orientation: StackOrientation.HORIZONTAL,
            children: [
                ui.createStackLayout({
                    horizontalOptions: LayoutOptions.CENTER_AND_EXPAND,orientation: StackOrientation.HORIZONTAL,
                    children: [
                        ui.createLatexLabel({
                            fontSize: getCurrencyTextSize(ui.screenWidth),margin: new Thickness(0,currencyTextMargin,0,0),horizontalOptions: LayoutOptions.CENTER,text: "$\\tau$",
                        }),
                    ]
                }),
                ui.createStackLayout({
                    horizontalOptions: LayoutOptions.CENTER_AND_EXPAND,orientation: StackOrientation.HORIZONTAL,
                    children: [
                        ui.createLatexLabel({
                            fontSize: getCurrencyTextSize(ui.screenWidth),margin: new Thickness(0,currencyTextMargin,0,0),horizontalOptions: LayoutOptions.CENTER,text: "C",
                        }),
                        ui.createImage({
                            widthRequest: getCurrencyImageSize(ui.screenWidth),heightRequest: getCurrencyImageSize(ui.screenWidth),aspect: Aspect.ASPECT_FILL,horizontalOptions: LayoutOptions.START,
                            source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052")
                        })
                    ]
                }),
                ui.createStackLayout({
                    horizontalOptions: LayoutOptions.CENTER_AND_EXPAND,orientation: StackOrientation.HORIZONTAL,
                    children: [
                        ui.createLatexLabel({
                            fontSize: getCurrencyTextSize(ui.screenWidth),margin: new Thickness(0,currencyTextMargin,0,0),horizontalOptions: LayoutOptions.CENTER,text: "H",
                        }),
                        ui.createImage({
                            widthRequest: getCurrencyImageSize(ui.screenWidth),heightRequest: getCurrencyImageSize(ui.screenWidth),aspect: Aspect.ASPECT_FILL,horizontalOptions: LayoutOptions.START,
                            source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052")
                        })
                    ]
                }),
                ui.createStackLayout({
                    horizontalOptions: LayoutOptions.CENTER_AND_EXPAND,orientation: StackOrientation.HORIZONTAL,
                    children: [
                        ui.createLatexLabel({
                            fontSize: getCurrencyTextSize(ui.screenWidth),margin: new Thickness(0,currencyTextMargin,0,0),horizontalOptions: LayoutOptions.CENTER,text: "L",
                        }),
                        ui.createImage({
                            widthRequest: getCurrencyImageSize(ui.screenWidth),heightRequest: getCurrencyImageSize(ui.screenWidth),aspect: Aspect.ASPECT_FILL,horizontalOptions: LayoutOptions.START,
                            source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052")
                        })
                    ]
                }),
                ui.createStackLayout({
                    horizontalOptions: LayoutOptions.CENTER_AND_EXPAND,orientation: StackOrientation.HORIZONTAL,
                    children: [
                        ui.createLatexLabel({
                            fontSize: getCurrencyTextSize(ui.screenWidth),margin: new Thickness(0,currencyTextMargin,0,0),horizontalOptions: LayoutOptions.CENTER,text: "????",
                        }),
                        ui.createImage({
                            widthRequest: getCurrencyImageSize(ui.screenWidth),heightRequest: getCurrencyImageSize(ui.screenWidth),aspect: Aspect.ASPECT_FILL,horizontalOptions: LayoutOptions.START,
                            source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/5/55/Chocolate_chip_cookie.png/revision/latest?cb=20210404132052")
                        })
                    ]
                }),
            ]
        }),
        ui.createFrame({
            row: 1,
            heightRequest: 2,
        })
    ]
});
var getCurrencyBarDelegate = () => {
    if(isUninstalled() && HEAVEN.level == 0){
        return ui.createFrame({
            heightRequest: 25,
        })
    }else{
        return currencyBar;
    }
};

// animation config, every number in seconds, each secondary mvt = 10s
var flashLen = 5, climbLen = 150, primaryLen = 75, secondaryLen = 120, climbDelay = 5, primaryDelay = 15, secondaryDelay = 35, absoluteEndPoint = 156;
var secondaryEqRevive = "", secondaryEqFrame = 0, secondaryEqMvt = -1, primaryEqFrame = -2;
var updateSecondaryEqRev = () => {
    if(secondaryEqFrame >= secondaryFrames[secondaryEqMvt].length){
        if(secondaryEqMvt >= 11){
            return;
        }
        secondaryEqMvt += 1;
        secondaryEqFrame = 0;
        secondaryEqRevive = "";
    }else{
        secondaryEqRevive += secondaryFrames[secondaryEqMvt][secondaryEqFrame];
        secondaryEqFrame += 1;
    }
    theory.invalidateSecondaryEquation();
}
var primaryFrame = ["C","\\dot{C}","\\dot{C} =","\\dot{C} = P","\\dot{C} = P\\sum_{i=0}","\\dot{C} = P\\sum_{i=0}^{18}","\\dot{C} = P\\sum_{i=0}^{18}{B(i)}","\\dot{C} = P\\sum_{i=0}^{18}{\\frac{B(i)}{CT_i}}"];
var secondaryFrames = [
    [`B(i)=B[i]P_{i}p_{i}${buildingLumpMult}^{L[i]}\\\\`,`${multBySymbol("P")}(\\frac{C_{ur}${buildingLumpMult}^{L[0]}}{100})\\\\`,`${multBySymbol("P")}(\\log_{10}\\log_{10}\\tau)^{2}\\\\`,`${multBySymbol("P")}H^{${twinGateExp}T_{w}}`,`\\sigma^{${R9BoxMult}R_{9}}`],
    [`${multBySymbol("P")}M(Lv.)CP(Lv.)\\\\`,"(log_{2}(L + 2))^{1.5}","(log_{10}(H + 10))^{1.25}","\\\\(log_{10}(C + 10))^{0.9}I_{o}^{1.01}",`B[1]^{${gillesBoxPower}A_{4}}`,`\\\\${multBySymbol("P")}log_{10}(Cs)^{2}50^{Ae}`],
    [`M = K(0.2)+(K-10)(0.3)\\\\`,`+(K-25)(0.4)+(K-50)(0.5)\\\\`,`M \\leftarrow M^{1+0.002A_{c}}\\\\`,`${multBySymbol("P")}(1+0.05A_{c})`],
    [`CP(l) = 2^{D_{d}}C_{1}(l)C_{2}()`,`\\\\C_{1}(l) = max_{l}:[0,25,50,75,100,150]`,`\\\\ \\rightarrow [1.03,1.05,1.07,1.09,1.11,1.13]^{l}\\\\`,`C_{2}() = \\prod_{i=0}^{8}{TP[i]^{CT[i]}}`],
    [`${multBySymbol("p_{2}")}`,`(\\sum_{i=0}^{18}{B[i]})^{${covDelta}C_{v}^{${covLvMod}} + ${covExp}}`,`\\\\${multBySymbol("p_{2}")}B[1]^{2}B[16]^{2.5}`],
    [`B(2) \\leftarrow ${yggBoost}`,`B(2)P_{2}^{${yggPowBase} + ${yggPowLv}Y_{g}}`,`\\\\(B[6]+B[2])^{${yggBPowBase} + ${yggBPowMod}Y_{g}^{${yggBPowLv}}}`,`(1+t)^{${yggThymePow}}`],
    [`T_{m}=\\frac{1500T_{r}^{${maxLPowBase}+${maxLPowMod}(T_{\\infty}+A_{6})}}{${terraFunNerfMod}}\\\\`,`T(t)=`,`\\frac{T_{m}^{1+${terraInfPow}T_{\\infty}}}{1+e^{t-(X_{b}+${terraDurMod}T_{r})}}`,`+T_{m}^{0.1T_{\\infty}}`],
    [`\\dot{H} = H^{0.9}(R_{c})\\\\`,`\\dot{L} = 0.1(R_{c}+10A_{7})+20R_3+0.25SP_{FT}\\\\`,`${multBySymbol("p_{4}")}10^{27}${recomPowBase}^{R_{c}-1}`],
    [`T_d = \\frac{B[11]^{1+0.025T_D}}{1000^{T_f}}\\\\`,`T_f = 1-\\frac{min(B[11],B[10]+B[12])}{(2.125-0.125T_{D}))(B[10]+B[12])}`],
    [`E_{p}=1,\\quad `,`E_{r}=\\prod_{i=0}^{${excavatedElements}}{Ef_{i}} \\\\`,`\\dot{E_{n}}=\\frac{E_{x}E_{p}E_{r}log_{10}(C)}{100(${100}^{n})}`,`,\\: n \\neq 8`,`\\\\ \\dot{E_{8}}=E_{p}log_{10}(E_{r})\\frac{log_{10}(B[8])log_{10}(B(8))}{1000}`],
    [`E_{n} \\rightarrow E_{n}(E_{n-1}) + E_{n}(E_{n-2})`,` + \\frac{\\lambda C_{m}}{${cookieYieldFactor}(${weightFactor})}`,`\\\\\\dot{R} = B[12]\\lambda E_{n}^{0.9+C_{c}(log_{10}(E_{n})-60)}`],
    [`F_{C} = log_{10}(As) + (log_{10}(C)-${minFusion})^{${1.11}}\\\\`,`\\dot{As}=${0.75}F_{C}\\dot{E_{8}}\\\\`,`\\dot{H_{EC}}=${Math.round(astroDecayWF)}F_{C}\\\\`,`\\dot{C}=-(10^{\\frac{-1}{${magnitudeTime*10}}})C`],
];
function resetToAnimationBegin(){
    HEAVEN_RECORD.level = 0;
    HEAVEN_COUNTDOWN.level = 0;
    HEAVEN.level = 0;
    PROGRAM.level = 1;
    UNINSTALL.level = 1;
    CHAOS_PERSISTENT_STAGE.level = 2;
    normalUpgradeMenu.level = 3;
    permUpgradeMenu.level = 3;
    updateAvailability();
    theory.invalidatePrimaryEquation();theory.invalidateSecondaryEquation();
    theory.invalidateTertiaryEquation();theory.invalidateQuaternaryValues();
}

init();
