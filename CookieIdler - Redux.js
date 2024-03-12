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
    var vizType = new ISV(0, 7, 2);
    var eqCStore = new ISV(0, 7, 3);
    var perkHas;
    //let time = ISV(0,0,0); // degrees
}
var dominate = 0, eqC = 0, quType = 0, eqType = 0, achCount = 0, bInfo = 0, maxBuild = 0, reactorMode = 0, totalSpell = 0;

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
        bInfoStore.readValue();dominatestore.readValue();eqTypeStore.readValue();quTypeStore.readValue();vizType.readValue();eqCStore.readValue();maxBuildStore.readValue();
        CPS = BF(CPSstore.value);
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
var buildingData = [
    {id: 0,
     names: ["Cursor","Curseof"], desc: "clicking ", lumpBName: "Extra Finger",
     baseCPS: 7, baseCost: 11, powerUpgradeMult: 250, mult: 1, collectionTime : 10,maxExpLevel: 5, sweetLimit: 5, sweetMax: 150,
     achName: ["Mouse Wheel","Clicktopia","Thumbs, Phalanges, Metacarpals","Hands of fate lays bare their click upon thou","A hand and them a some more"]
    },
    {id: 1,
     names: ["Grandma","Gradnma"], desc: "backing ", lumpBName: "Anti-Aging Cream",
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
     names: ["Farm","Famr"], desc: "growing ", lumpBName: "Electrolytes and Acres",
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
     names: ["Mine","Mein"], desc: "mining ", lumpBName: "Drilling Overclock",
     baseCPS: 7.4e7, baseCost: 1.2e8, powerUpgradeMult: 125, mult: 1, collectionTime : 15,maxExpLevel: 5, sweetLimit: 25, sweetMax: 350,
     achName: ["Stop! Drilling Time!","Break the core","Dysonian Society","Breaking through omnirealitimetaplanes","r/drillingmasterrace"],
     gimmicks: [{
        uid: 10003,
        name: "Mass Terraforming $(T_{r})$",
        info: "Unlocks/Improves a buff that temporarily boosts your CPS by a lot",
        costModel: new ExponentialCost(1e130, ML2(1e10)),
        maxLevel: 20,
        onBought: (amount) => {updateMaxL();getEquationOverlay();}
     }]},
    {id: 4,
     names: ["Factory","Fcotyr"], desc: "mass producing ", lumpBName: "Patent Publishing",
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
     names: ["Bank","Bkan"], desc: "interesting ", lumpBName: "Increase Interest Rates",
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
                        investHelp[res].level += 5+ConjureBuild.level+Math.floor(butterBar.level/2);
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
     names: ["Temple","Tmelpe"], desc: "directing in ", lumpBName: "Sacred Chocolate Artifact",
     baseCPS: 1.18e18, baseCost: 2e25, powerUpgradeMult: 8, mult: 1, collectionTime : 25,maxExpLevel: 5, sweetLimit: 50, sweetMax: 350,
     achName: ["Way of the Temple","Balance of Faith","The Lord\'s Likeliness","Caricature of the forgotten Deities","Chief Artifact Curator"],
     gimmicks: [{
        uid: 10007,
        name: "Archaeology $(A_{r})$",
        info: "Go into your own temples to discover secrets lost to mankind",
        costModel: new ExponentialCost(1e252, ML2(2)),
        maxLevel: 1000,
        onBought: (amount) => {
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
     names: ["Wizard Tower","Wixaradf Trower"], desc: "spawning in ", lumpBName: "Syllables",
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
     names: ["Shipment","Shipemtn"], desc: "bringing in ", lumpBName: "Cosmic Exploration",
     baseCPS: 9e32, baseCost: 5.1e75, powerUpgradeMult: 25, mult: 1, collectionTime : 30,maxExpLevel: 5, sweetLimit: 125, sweetMax: 350,
     achName: ["Local Expedition","Cosmic Mapping","Multiverse Ramble","Omniverse Realization","You could make a chronicle out of those"],
    },
    {id: 9,
     names: ["Alchemy Lab","Alehfcehy Lba"], desc: "transmuting ", lumpBName: "New Esoteric Elements", sweetLimit: 150, sweetMax: 350,
     baseCPS: 1.15e43, baseCost: 7.5e100, powerUpgradeMult: 23, mult: 1, collectionTime : 30,maxExpLevel: 5,
     achName: ["Transmutation","Polytranselementation","With matter comes Cookies","Satiated in the gaudy mouths of Gold","Truly a Mendeleev's Nightmare"],
    },
    {id: 10,
     names: ["Portal","Proalt"], desc: "retrieving ", lumpBName: "Normalize Dimension",
     baseCPS: 6.66e50, baseCost: BF("1e125"), powerUpgradeMult: 21, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 200, sweetMax: 350,
     achName: ["Isekai\'d","H̶e̷ ̶C̶o̴m̵e̸s̵","I̸͕̽n̷̰͊ ̸͖̔ṭ̵͐h̶̺̓e̴̫͋ ̶͓͂e̸͔͘y̸̝͋e̵͓̚s̸̫̒ ̶̰̕ò̸̜f̶͖̕ ̶̻͒t̷̥͆ĥ̶̳é̵̗ ̷̦̉b̴̡̽e̶͚̿h̴̙̋o̸̩͝l̴̘͆d̷̠͠è̶͍ř̴͎","Bottom of the abyss","Is this reality or is it cookieverse?"],
    },
    {id: 11,
     names: ["Time Machine","Tie Macine"], desc: "preventing cookies from being eaten by ", lumpBName: "Paradox Resolve",
     baseCPS: BF("2.045e58"), baseCost: BF("7.5e150"), powerUpgradeMult: 20, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 225, sweetMax: 350,
     achName: ["Thyme Wrap","Thyme Pararegano","Thyme Sagaporal Nutmegstant","Out of past, Out of future","No more Thyme Pararegano"],
    },
    {id: 12,
     names: ["Antimatter Condenser","Antimatter Condenstor"], desc: "synthesizing ", lumpBName: "Derived Elementary Flavor",
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
     }],
    },
    {id: 13,
     names: ["Prism","Prius"], desc: "matterifying from light ", lumpBName: "Extended Spectrum",
     baseCPS: BF("4.9e82"), baseCost: BF("2.1e228"), powerUpgradeMult: 25, mult: 1, collectionTime : 40,maxExpLevel: 5, sweetLimit: 275, sweetMax: 250,
     achName: ["Some rays of dough and batter","Total Enlightenment","O thy energy of sky, bring fourth the light rays","Neverending rays of bright brilliance shine on you all","4th Cone"],
    },
    {id: 14,
     names: ["Chancemaker","Chamceamekr"], desc: "lucking in ", lumpBName: "Serendipity",
     baseCPS: BF(2.1e115/60.24), baseCost: BF("2.6e300"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 300, sweetMax: 200,
     achName: ["Lucked up","Devil\'s Gambit","Gambler\'s Last Bet","Remember, the house always wins","Black Cat\'s Paw"],
    },
    {id: 15,
     names: ["Fractal Engine","Framcael Engeen"], desc: "duplicating in ", lumpBName: "Gone Iterative",
     baseCPS: BF("2.2e133"), baseCost: BF("3.1e351"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 350, sweetMax: 150,
     achName: ["Z_n+1 = (Z_n)^2 + c","Apollonian Gasket","C_n := (C_n-1 ∪ (2+C_n-1))/3, where C_0 := [0,1]","Divide by zero, now, I dare you","Quite nearly but not so full"],
    },
    {id: 16,
     names: ["JavaScript Console","JabbaScript Conseoul"], desc: "hacking in ", lumpBName: "Reformat JS Script",
     baseCPS: BF("3.1e161"), baseCost: BF("7.1e425"), powerUpgradeMult: 9, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 400, sweetMax: 150,
     achName: ["Press F12","Infinite Theorycraft","I bring fourth reincarnation of reality","","The \"C\" Language"],
    },
    {id: 17,
     names: ["Idleverse","IDledeverse"], desc: "clicking ", lumpBName: "Install Another Idle Game",
     baseCPS: BF("8.5e205"), baseCost: BF("6.9e500"), powerUpgradeMult: 7, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 450, sweetMax: 250,
     achName: ["Manifest Destiny","Is there enough worlds?","Lost your Cosmic Cookies?","We the People of the Cookieverse, in Order to form a more perfect Dimensional Union, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Cookies to ourselves and our Posterity, do ordain and establish this Constitution for the Cookieverse.","You need a new bluestack"],
    },
    {id: 18,
     names: ["Cortex Baker","Corex Bakr"], desc: "clicking ", lumpBName: "Get an extra IQ Point",
     baseCPS: 69420, baseCost: BF("6.9e1337"), powerUpgradeMult: 5, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 500, sweetMax: 200,
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
const terraDurMod = BF(300), terraInfPow = BF(0.005), maxLPowBase = BF(2.4), maxLPowMod = BF(0.1), maxLBPowBase = BF(1.2), maxLBPowMod = BF(0.03), dilateFactorDivBase = BF(2.125), dilateFactorDivMod = BF(0.125), dilateFactorBase = BF(1000), dilatePowBase = BF(1), dilatePowMod = BF(0.025), logBoot = BF(1);
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
    if (timeDilate.level == 0) {return 1;}
    let res = building[10].level + building[12].level;// restricting buildings
    let factor = (building[11].level >= (res)) ? 1 - 1 / (dilateFactorDivBase - (dilateFactorDivMod * timeDilate.level)) : 1 - (building[11].level / (2 * res));
    return BF(1) + (BigP(building[11].level, dilatePowBase + dilatePowMod * timeDilate.level)) / BigP(dilateFactorBase, factor);
}

//others
var magicLoop = 12600;//lcm of 10-50, just in case
var building = new Array(19), buildingPower = new Array(19), buildingLump = new Array(19); //buildingB, buildingPower, buildingLump containers

//calc building from level, use calcBuilding(id, 0) for current level
var calcBuilding = (id, am) => {
    if (conGrow.level > 0 && id >= 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.9 + (0.2 * conGrow.level) + (0.011 * (id - 11)), 50 - conGrow.level, 1) - 1;
    } else if (conGrow.level > 1 && id < 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.2 + (0.07 * conGrow.level) + (0.021 * (id + 1)), 50 - conGrow.level, 1) - 1;
    } else {
        return BF(building[id].level + am);
    }
}

//building power
var getPower = (index) => BigP(Utils.getStepwisePowerSum(buildingPower[index].level, buildingData[index].powerUpgradeMult + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetEngine.level * 0.25), 5, 1), 1 + (superP.level * 0.02));
var getPower2 = (index, level) => BigP(Utils.getStepwisePowerSum(level, buildingData[index].powerUpgradeMult + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetEngine.level * 0.25), 5, 1), 1 + (superP.level * 0.02));

//building exponents
var getBuildingExp = (index) => {
    return buildingExponent[index].level * buildingExponentMod + 1;
}

//building description + info
var getBuildingDesc = (indx) => {
    var bi = `\$B[${indx}]^{${(getBuildingExp(indx) > 1) ? TS10(getBuildingExp(indx)) : ""}}\$${(investHelp[indx].level>0)?`+${investHelp[indx].level}`:""}`;
    switch(bInfo){
        case 0:
            return `${bi} - ${buildingData[indx].names[0]} ` + getCollectionBar(thyme.level % buildingData[indx].collectionTime,buildingData[indx].collectionTime);
        case 1:
            return `${bi} = ${calcBuilding(indx, investHelp[indx].level)} ` + getCollectionBar(thyme.level % buildingData[indx].collectionTime,buildingData[indx].collectionTime);
        case 2:
            return `${bi} - ${buildingData[indx].names[1]} ` + getCollectionBar(thyme.level % buildingData[indx].collectionTime,buildingData[indx].collectionTime);
        default:
            return "Building Desc. Error!";
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
var buildingLumpCost = (i) => new LinearCost(i + 1, (i + 1) * ((i >= 11) ? (i - 1) * (i - 5) * 0.25 : 1.1));
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
            return `Improves ${buildingData[indx].names[0]}  by a factor of ${TS10(buildingLumpMult)}`;
        case 1:
            return `\$ L[${indx}] = \$ ${Utils.getMathTo(BigP(buildingLumpMult, buildingLump[indx].level), BigP(buildingLumpMult, buildingLump[indx].level + amount))}`;
        case 2:
            return `Improves ${buildingData[indx].names[1]}  by a factor of ${TS10(buildingLumpMult)}`;
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
var updateBuildingLumpMaxLv = () => {
    if(Number.isNaN(maxBuild)){maxBuild = 0;}
    let maxLv = buildingData[maxBuild].sweetLimit;
    log(`Max = ${maxBuild}, lim = ${maxLv}`);
    for(let i=0;i<19;i++){
        //log(`L${i} = Lv.${buildingLump[i].level}`);
        if(buildingLump[i].level <= maxLv){
            buildingLump[i].maxLevel = Math.min(maxLv,buildingData[i].sweetMax);
        }else{
            buildingLump[i].level = buildingLump[i].maxLevel;
            //buildingLump[i].maxLevel = buildingLump[i].level + 1;
        }
    }
    //idleverse
    log(`Marble Lv.${moonMarble.level}x${moonMarbleCapacity} = ${moonMarbleCapacity*moonMarble.level}`)
    if((building[17].level > 0) && (building[17].level >= moonMarbleCapacity*moonMarble.level)){
        building[17].maxLevel = building[17].level;
    }else{
        building[17].maxLevel = moonMarbleCapacity*moonMarble.level;
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
    globalMult *= ((artifactUpgrade[4].level > 0) ? BigP(building[1].level, gillesBoxPower) : BF(1));
    //8 "art4 : " + ((artArt.level > 4)?BigP(building[1].level,gillesBoxPower):BF(1)));
    //globalMult *= (((BF(BF(spellCast[1]) + (BF(10) * effectCPSBDur)) >= BF(thyme.level))) ? effectCPSB : BF(1));
    //9 "spellsus : " + ((((spellCast[1]+(10*effectCPSBDur)) >= thyme.level))?effectCPSB:BF(1)));
    //10 "kp : "
    globalMult *= kittyPowerFull(kitty.level);
    if(globalMult == BF(0)){
        log("the what");
        globalMult = BF(1);
    }
    //log(globalMult);
    //11 elem
    globalMult *= BigP(50,astroExcavate.level) * BigP(1.01,researchUpgrade[0].level + researchUpgrade[1].level) * BigP(5,researchUpgrade[7].level);
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
            buildingData[indx].mult *= BigP(50,researchUpgrade[2].level+researchUpgrade[6].level+researchUpgrade[9].level);
            break;
    }
    if(buildingData[indx].mult == BF(0)){buildingData[indx].mult = BF(1)};
};

//! Artifacts
var artArt, templeJ = false, artifactUpgrade = new Array(99), artifactUnlock = new Array(99), artifactCount = 0;
const artifactLockText = "Not Discovered";
var artifactData = [{
    order: 0,name: "Rhombus of Chocolatance",clue: "it\'s at the foyer, you can\'t miss it",
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
    cost: BF("1e285"),unlockCondition: () => {return ((32 >> 4) | (32 >> 1) | 32 ) << 2;}, desc: "Contains all you would ever dream when you have to deal with the nightmare of citations, absolutely useless otherwise."
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
    cost: BF("1e510"),unlockCondition: () => {return (thyme.level >= 6048000) && (Math.random() < (0.001 * (thyme.level/6048000)));}, desc: "A peculiar machine somehow capable of locally accelerating spacetime using something about time crystals. Engravings of menacing nature can be found tucked away at the bottom, though we don\'t know why."
},{
    order: 12,name: "Elementium Infused Chocolate Chunk",clue: "Cavitilicious",
    cost: BF("1e365"),unlockCondition: () => {return (SUGAR_LUMP.value >= 0b10011100010000000000) && (Math.random() < 0.005);}, desc: "Despite its \"normal\" appearance, that chunk is full of.... uh.... elements? What is that word anyway?"
},{
    order: 13,name: "Scent of Vanilla Nebula",clue: "5 Cosmic Mappings ah ah ah",
    cost: BF("1e400"),unlockCondition: () => {return (building[8].level >= 0b10011100010000 / 2) && (Math.random() < 0.005);}, desc: "Some astronomers go crazy over these"
},{
    order: 14,name: "Cherrysilverium Meld",clue: "15$(^=)$1.268e30, 16=117.39, 8E=500,000, Cs",
    cost: BF("1e300"),unlockCondition: () => {return false;}, desc: "A curious blob of metal, one of the inscriptions inside the temple\'s numerous halls details a picture of it literally melding buildings together, with humans"
}];
//loot
const maxRoll = 10000;
var templeLuck = 0;
let lootWeight = [10000, 9995, 9945, 9845, 9735, 9615, 9565, 9555, 9530, 9430, 9320, 9200, 9100, 9000];
let minCookie = (i) => {
    COOKIE.value += BF(60) * CPS * terraBoost * BF(i);
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
            rand = RandI(10 + (2 * SpellStack.level)) + boost;
            log(`Cookies for you ${rand * 10}`);
            minCookie(rand * 10);
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
        xBegin = thyme.level - (150*(boost+2));
        logBoost = 10 + (2.5 * SpellStack.level) + boost;
        updateMaxL();
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Mass Miner Wizard","Superactive Lifestyle","Cool that you can mass terraform the earth, but can you touch grass though?"],
},{
    order: 3,name: "Replenish Extradionaire", desc: "Enriches your temple with a lot more loot",
    castCost: 3000, castCooldown: 8400, effectLength: 600,
    effect: (boost) => {
        templeLuck = 50 * (boost+1);
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Explorer Wizard","Colonization but on a smaller scale","Pot of Artifacts, Cookies, Heavenly Chips, and Sugar Lumps"],
},{
    order: 4,name: "Asseto Accio", desc: "Spawn buildings into existence, only works for a certain amount",
    castCost: 2500, castCooldown: 9600,
    effect: (boost) => {
        let rand = RandI(20);
        if (rand < 19) {
            if ((building[rand].level > 0) && (building[rand].cost.getCost(building[rand].level) <= (BF(1e10) * COOKIE.value * BigP(5,boost)))) {
                log(`You won ${buildingData[rand].names[0]}`);
                building[rand].level += RandI(10 + boost) + 1 + SpellStack.level + Math.round(boost);
            }
        }
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Mogul Wizard","This looks to be slightly unaffordable, considering your CPS","With those cookie frauds that you've committed. If you pay you'll be acquitted. And your buildings all permitted"],
},{
    order: 5,name: "Mimi Mami", desc: "Reduces the cooldown time of spells",
    castCost: 1212, castCooldown: 7200,
    effect: (boost) => {
        updateSpellCooldown(900 + (150 * SpellStack.level) + (60 * boost));
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Impatient Wizard","The spells must go brrrrrrrrrr","Why must there be cooldowns? The spellcaster screams, for he does not know..."],
},{
    order: 6,name: "Simply Sweetdelicious", desc: "Spawn some sugar lumps in",
    castCost: 0, castCooldown: 60000,
    effect: (boost) => {
        if (RandI(100 + boost) > 10) generateLump(1500 + (150 * SpellStack.level) + (100 * boost));
    },
    unlockCondition: () => {return true;},//unlock condition
    achievementNames: ["Very Sweet Wizard","Sugar Lump Magic Saga","Don\'t overdose on sugar, kids"],
},{
    order: 7,name: "Made in Heaven", desc: "haha jojo reference goes brrrrrrrrrr",
    castCost: 5555, castCooldown: 14400,
    effect: (boost) => {
        let warpthyme = ((100 + (10 * SpellStack.level)) * RandR(0.9, 1.1 + (0.05 * SpellStack.level)) + (15 * SpellStack.level)) + (10 * boost);
        //log("Time goes brrrrrrrr " + warpthyme);
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
    let spellBoost = totalCastAchievement[4].isUnlocked + totalCastAchievement[5].isUnlocked + totalCastAchievement[6].isUnlocked + spellCastAchievement[indx][0].isUnlocked + spellCastAchievement[indx][1].isUnlocked + spellCastAchievement[indx][2].isUnlocked + (0.25 * butterBar.level);
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
var jetEngine, sugarTools, chalcedIngredient, butterBar, jetRefine, astroExtract, jetTransistor, cherryRegulator, hazelSolution, moonCore, moonMarble, astroExcavate;
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
        }]
    },{
        order: 5, weight: 13, prevUnlock: 1.7e26, excavatorPowerPow: 1.55, excavatorPowerFactor: 1,
        symbol:"Cs", fullName: "Cherrysilver", minDecayAmt: BF("1e45"),
        gimmicks: [{
            uid: 32008,
            name: "Cherrysilver Regulators",
            info: "Cherrysilver has been proven mathematically to be a better regulators than all those boring Boron you have lying around as a result of failed alchemical endeavors.",
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
            maxLevel: 10,
            onBought: (amount) => {updatreGlobalMult();calcEPS();}
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
var getElemBoost = (indx,level) => (1 + (elementData[indx].excavatorPowerFactor * BigP(level,elementData[indx].excavatorPowerPow)));
arrEPS.fill(BF(0));
var calcExcavator = (level) => Utils.getStepwisePowerSum(level, 5, 5, 0);
var getLossFactor = () => lossFactorBase - (jetRefine.level*jetRefineEff) - (10*researchUpgrade[7].level);
var calcEPS = () => {
    let excRate = calcExcavator(excavator.level) * BigP(1.2,cherryRegulator.level) * BigP(1.2,hazelSolution.level) * BigP(2,moonCore.level) * BigP(5,astroExcavate.level) * BigP(5,researchUpgrade[7].level);
    let lossFactor = getLossFactor();
    for(let i = 0;i < excavatorDrill.level;i++){
        excRate *= getElemBoost(i,excavatorModule[i].level);
    }
    for (let i = 0;i < excavatorDrill.level;i++) {
        arrEPS[i] = (BigL10(COOKIE.value + BF(10))/BF(100)) * BigP(lossFactor, -1 * i) * excRate;
        //log(arrEPS[i]);
    }
    if (artifactUpgrade[13].level > 0) {
        arrEPS[8] += BigL10(BF(10) + building[8].level) * BigL10(BF(10) + generateCookie(8,10,terraBoost)) * 0.001;
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
            return `$E_{f${indx}} = 1 + ${elementData[indx].excavatorPowerFactor}Lv^{${elementData[indx].excavatorPowerPow}} =$ ${Utils.getMathTo(getElemBoost(indx,excavatorModule[indx].level),getElemBoost(indx,excavatorModule[indx].level+amount))}`;
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
const maxDecayPow = 0.9, lambda =  BF(0.04), yieldfactor = BF(0.05), yieldPow = 1.05, cookieYieldPow = 1.5, cookieYieldFactor = 10, weightFactor = 228/40;
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
        let rate = building[12].level * lambda * BigP(elements[indx].value,maxDecayPow);
        //addition
        elements[indx-2].value += dt * BigP(rate,yieldPow) * yieldfactor * (elementData[indx-2].weight / elementData[indx].weight);
        elements[indx-1].value += dt * BigP(rate,yieldPow+0.02) * yieldfactor * (elementData[indx-1].weight / elementData[indx].weight);
        //cookie yield
        COOKIE.value += dt * BigL10(BigP(rate,cookieYieldPow)) * (CPS/cookieYieldFactor) * terraBoost * (elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor;
        //deletion
        elements[indx].value -= dt * rate ;
    }
}
function decayElementTest(indx, dt){
    log(`======`);
    log(`Decaying.... ${elementData[indx].fullName}, dt = ${dt}`);
    if(indx >= 2){
        let rate = building[12].level * lambda * BigP(elements[indx].value,maxDecayPow);
        log(`Rate = ${rate}/s`);
        //addition
        log(`${elementData[indx-2].fullName} Gain = ${dt * BigP(rate,yieldPow) * yieldfactor * (elementData[indx-2].weight / elementData[indx].weight)}`);
        log(`${elementData[indx-1].fullName} Gain = ${dt * BigP(rate,yieldPow+0.01) * yieldfactor * (elementData[indx-1].weight / elementData[indx].weight)}`);
        //cookie yield
        let cookieGain = dt * BigL10(BigP(rate,cookieYieldPow)) * (CPS/cookieYieldFactor) * terraBoost * (elementData[indx-2].weight+elementData[indx-1].weight+elementData[indx].weight) / weightFactor;
        log(`Cookie Gain, CPS = ${CPS}, Total = ${cookieGain}`);
        //deletion
        log(`${elementData[indx].fullName} Loss = ${dt * rate}`);
        log(`======`);
        let t = BigP(elements[indx].value,1-maxDecayPow);
        log(`Projected Cookies(t = ${t}) = ${t * cookieGain}`);
    }else{
        log(`Invalid Decay!`)
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
var researchCenter, researchUpgrade = new Array(199), researchSlot = new Array(5), researchSlotID = new Array(5), researchSlotUpgrade, occupiedSlots, researchAvailable = new Array(199), maxResearchProgress = 180;
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
    cost: [{type:9,amount:BF("1e540")},{type:24,amount:BF(6250)},{type:30,amount:BF(500)},{type:5,amount:BF(1e49)}]
},{
    id: 7, name: "Designer Brand Mining Drills", desc: "An overdesigned excavation marvel that somehow defies all expectations by outperforming everything we\'ve have so far with the power of hilariously complex efforts of research and something something. Multiplies EPS and CPS by 5 and reduces loss factor by 10.", time: 12000, preq: [5],
    cost: [{type:0,amount:BF(1e59)},{type:1,amount:BF(1e59/50)},{type:2,amount:BF(1e58/2500)},{type:3,amount:BF(8e53)},{type:4,amount:BF(8e53/50)},{type:5,amount:BF(8e53/2500)},{type:6,amount:BF(8e53/12500)},{type:16,amount:BF(8750)},]
},{
    id: 8, name: "Aero(Cosmo)dynamic Design for Shipments", desc: "In the space there\'s nothing there. In the atmosphere there\'s air. Both places have vastly differing conditions that is a nightmare for space rockets. Preparing an effective design for both proves to increase the productivity and reduce the waste created from entering and exiting the atmosphere. Vastly increases the CPS of Shipments and multiplies EPS by 2.5.", time: 27000, preq: [5],
    cost: [{type:9,amount:BF("1e560")},{type:21,amount:BF(8000)},{type:5,amount:BF(2.5e51)}]
},{
    id: 9, name: "Conditional Mass-Produced Goods Convergence", desc: "Most idleverses have difficulties converging to producing cookies, which slows down our Cookie Empire\'s growth. Through a clever usage of \"Higher Powers\", we can somewhat \"incentivize\" them to produce cookies instead of useless other stuffs.", time: 36000, preq: [8,6],
    cost: [{type:9,amount:BF("1e560")},{type:30,amount:BF(800)},{type:19,amount:BF(8888)},{type:6,amount:BF(6e49)}]
},];
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
    if(researchUpgrade[indx].level > 0){
        log("completed");
        return;
    }
    //check if can begin
    if(occupiedSlots.level < researchSlotUpgrade.level + 1){
        //check afford -> deduct
        if(canAffordResearch(researchData[indx].cost)){
            //deduct
            for(let i=0,j=researchData[indx].cost.length;i<j;i++){
                if(isValidCostObj(researchData[indx].cost[i])){
                    let index = researchData[indx].cost[i].type, val = researchData[indx].cost[i].amount;
                    if(index < 9){
                        elements[index].value -= val;
                    }else if(index >= 13){
                        building[index-13].level -= val;
                    }else{
                        switch(index){
                            case 9:COOKIE.value -= val;break;
                            case 10:HEAVENLY_CHIP.value -= val;break;
                            case 11:SUGAR_LUMP.value -= val;break;
                            //case 12:ret &= ;break;
                        }
                    }
                }
            }
            //set levels
            researchSlot[occupiedSlots.level].level = researchData[indx].time;
            researchSlotID[occupiedSlots.level].level = indx;
            occupiedSlots.level += 1;
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
    }
}
function isResearchUnlock(indx){
    let ret = true;
    if(indx == 0){
        return true;
    }
    for(let i=0,j=researchData[indx].preq.length;i<j;i++){
        ret &= (researchUpgrade[researchData[indx].preq[i]].level > 0);
    }
    return ret;
}
function canAffordResearch(costs){
    let ret = true;
    for(let i=0;i<costs.length;i++){
        if(isValidCostObj(costs[i])){
            let indx = costs[i].type,val = costs[i].amount;
            if(indx < 9){
                ret &= (elements[indx].value >= val);
            }else if(indx >= 13){
                ret &= (building[indx-13].level >= val);
            }else{
                switch(indx){
                    case 9:ret &= (COOKIE.value >= val);break;
                    case 10:ret &= (HEAVENLY_CHIP.value >= val);break;
                    case 11:ret &= (SUGAR_LUMP.value >= val);break;
                    //case 12:ret &= ;break;
                }
            }
        }
    }
    return ret;
}

//! Lumps
const lumpTickChance = 5000;

//! Primary Vairables
var COOKIE, HEAVENLY_CHIP, SUGAR_LUMP, EXPO_BAR;
var isCurrencyVisible = (indx) => indx <= 2;
var thyme, normalUpgradeMenu, permUpgradeMenu, trueThyme;

//! Heavenly Upgrades
var cookieTinUnlock, CookieH, CookieR, CookieS, CookieC, DivineD, CookieTau, TerraInf, TwinGates, ConjureBuild, ChronosAge, R9Box, conGrow, SpellStack, Empower, milkOil;//"Unlocks a new set of cookies that are more powerful than their normal counterparts, ooooooooo what could it be?"
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
        costModel: new ExponentialCost(1e106, ML2(1e11)),
        maxLevel: 5,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 13,
        name: "Spell Cast Layering",
        info: "Allows multiples of the same spell to be casted, and slightly empowers every spell",
        costModel: new ExponentialCost(1e109, ML2(1e5)),
        maxLevel: 3,
        onBought: (amount) => {updateSpellLayer();updateGlobalMult();}
    },{
        uid: 14,
        name: "Empowerments of Buildings",
        info: "Increases how fast $P$ grows",
        costModel: new ExponentialCost(5e130, ML2(1e10)),
        maxLevel: 3,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 15,
        name: "empty",
        info: "empty",
        costModel: new ExponentialCost(1000, ML2(10)),
        maxLevel: 69420,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 16,
        name: "Milk-Flavored Drilling Fluids",
        info: "Milk-Power Drilling Fluids really helps with the constant loss of mining outputs",
        costModel: new ExponentialCost(1e135, ML2(2e2)),
        maxLevel: 10,
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
    ];
    var lumpAchReq = [1, 10, 50, 100, 500, 1000, 10000, 100000, 1000000, 10000000];
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
        {order: 6, name: "Speed Baking V", desc: "Get 1e300 CPS within true 10 seconds of publishing\n\nhaha speed goes brrrrrr", weight: 5, secretClue : "",
         unlock: () => (CPS >= BF("1e300")) && (thyme.level <= 100),},
        {order: 7, name: "Speed Baking VI", desc: "Get 1e500 Cookies within true 10 seconds of publishing\n\nwould you please just slow down?", weight: 5, secretClue : "we fast as 5",
         unlock: () => (COOKIE.value >= BF("1e500")) && (thyme.level <= 100),},
        {order: 8, name: "Speed Baking VII", desc: "Get 1e600 Cookies within true 5 seconds of publishing\n\nwhat the", weight: 5, secretClue : "we fast as 6",
         unlock: () => (COOKIE.value >= BF("1e600")) && (thyme.level <= 50),},
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
var chapter = new Array(16);
var checkChapter = (c) => {
    if (c == 0) return COOKIE.value >= BigNumber.ZERO;
    else if (c == 1) return building[1].level >= 1;
    else if (c == 2) return COOKIE.value > BF(1e12);
    else if (c == 3) return building[6].level >= 1;
    else if (c >= 15) return COOKIE.value >= BF("1e750");
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
    "As you produced more and more cookies, the display seemingly freezes at 3/750, staying there for quite a while\nYou posted a flyer hiring people to bake cookies for you\nA few days later, a grandma comes knocking at your door\nYou let her in, and she starts to bake cookies for you, in return of her getting a set amount of your cookies\nBut that's not the only person that comes inside\nOn the far corner you heard a faint sound of cats purring for milk...",
    "The cookies are piling up, but the display won't budge further than 12\nThen, a new button emerges from the underside, labeled 'Reset'\nYou're tempted to press it, but the display warns you about resetting in exchange for an even larger amount of cookies...",
    "1e25 cookies, that's 25/750\nThe far reaches of your cookies spread far and wide\nYou notices certain groups of people are beginning to worship cookies\nSo you built a temple for them\nHopefully the prayers to the cookie god would satisfy them enough to will even more cookies in...",
    "Resources are finite, and you're coming up close to the limit of planet Earth\nUsing your gains from your banks, you set out to fund a space project, in hopes of getting more resources for your ever-growing desire for cookies\nIt's one of the dreams of the many to explore the world beyond us\nThe vast world, limitless combinations of everything possible by physics\nYou'd really like it if some of them are all made out of cookies...\nBut the restless G grows",
    "Wandering around landfills, it's a place full of useless refuse human throws out\nWhy bother looking far and wide when there's always something to find near us\nYou commissioned your scientists from the space program to assist in changing from non-cookies into cookies\nEven with the hardest of matter to change, it can always be turned into cookies.\nJust let the mother nature take care of the rest...",
    "What naive thoughts do they think that the universe is the limit?\nCountless worlds exist beyond us, in perpetual chaos within infinite universes\nA place where laws and observation holds meaningless\nAt no sign, a red dimensional rift appears inside one of your cookie piles\nIt caused quite a big damage to your cookie treasury, but your assistants have pointed out that the world is called 'Cookieverse', a perilous place teeming with unimaginable monsters and indescribable topology\nExploring this place sure looks to be dangerous, but for some reason, the other world is all cookies\nYou quickly hopped in the chance to rob the world of cookies, slaying monsters, mass terraforming the place you name it!",
    "They said that time can't be stopped nor reversed\nYou, a young(perhaps daring) person decided to go against it\nFrom all the exploitation you made in the Cookieverse\nThere's a very chaotic piece of cookie ore that seems to warp and distort itself\nYour assistants determined it was the time continuum that the ore is messing with, and aptly named it 'thyme'\nIn hopes of getting cookies through time itself, you now assign ever more scientists to break the laws of time.",
    "18\n18 types of elementary particles\nNow there's 19 of them\nBut that's still 18 left to turn into cookies\nYou decided to commission the largest of the largest of particle accelerators to convert those particles into cookie particles\nYou gonna leak a lot of money for this, so you made the world dependent on cookies.",
    "How long has it been since you last saw the light of the day?\nYou went outside(and touched grass), only to find the sun instantly making you sweat bullets\nComing back into your den(grand office) you looked into the mirror and find yourself splattered with cookies\nIt seems that light itself is being turned into cookies as well\nMight just as well focus all of them into a big burst of cookies\nAnd in the meantime spray a bit of radiance to those worshippers as well",
    "POOF! And there goes nothing!\nYou just saw one of your cookies disappear into nothingness\nThen you saw a black cat in the corner of your vision again\nIn a panic, you hastily read through the book on symbolisms, and found out that a black cat means bad luck\nWith your amounts of cookies, fearing that it might all be GONE the next day,\nYou improvised up a device from that book that would apparently bring in good luck to your entire existence\nAnd your local spellcasters might take an interest in that too",
    "Does your cookie look empty?\nI know that might sound like nonsense but how much of the cookie is really cookie?\nUsing your sheer amount of knowledge you got from working with your past projects\nYou somehow managed to 'convert mattern't to matter' and the cookie just splits into a whole lot more cookies\nPresenting the plan, you assigned the engineers to work on standardizing the device used to 'convert mattern't to matter'\nDoes going too deep might reveal something you weren\'t supposed to see?",
    "Having lost your mind being overwhelmed with the thoughts of cookie\nYou went out on a quite little rampage with your cookies, tearing down any and all signs of resistance, even the fabric of reality itself\nYou definitely went mad, in search of something you can use to bend reality\nOne of the madness you did is parting some poor soul(Orteil?) of their laptop\nOn the laptop there's a console with the word 'Javascript' written on it\nYou of course, politely pressure your programmers to decipher the complicated syntax of 'Javascript'\nAnd they can become full again.....",
    "I love cookies, why don't we enslave other idle games to produce cookies for us\nBreaking through dimensions, hijacking other \"innocent\" idle game universes to produce cookies for us",
    "Nothing stops you anymore\nNot even getting the counter to 750(it's now 500/750)\nIn one of the everlasting days at the Cookie Megacorporation...\nYou managed to manifest your desire of cookies out of thin air\nSeeing this opportunity, you cleared your way through the legal system to get some subjects to perform something on\nIt was a success, seeing them thinking up cookies out of thin air\nWhy bother with all your buildings when you can just think up cookies...",
    "The counter hit 750, and the sky immediately turned itself red...\n(To be continued)",
];

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

//!==INIT==
var init = () => {
    COOKIE = theory.createCurrency("C", "C");
    HEAVENLY_CHIP = theory.createCurrency("H", "H");
    SUGAR_LUMP = theory.createCurrency("L", "L");
    EXPO_BAR = theory.createCurrency("E","E");
    for(let i=0;i<=usedElements;i++){
        elements[i] = theory.createCurrency(elementData[i].symbol,elementData[i].symbol);
        elements[i].isAvailable = false;
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
        var normalUpgradeMenuNames = ["Buildings","Cookies and Milk","Exponents"]
        normalUpgradeMenu = shortUpgrade(1e9 + 1,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of normal upgrades");
        normalUpgradeMenu.getDescription = () => `Current Menu : [${normalUpgradeMenu.level + 1}] ${normalUpgradeMenuNames[normalUpgradeMenu.level % 3]}`;
        normalUpgradeMenu.bought = (amount) => {
            //log("b");
            if (normalUpgradeMenu.level > 2){
                normalUpgradeMenu.level = 0;
            }
            updateAvailability();
        }
        var permUpgradeMenuNames = ["Building Power","Heavenly Upgrades","Elements"];
        permUpgradeMenu = shortPermaUpgrade(1e9 + 2,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of permanent upgrades");
        permUpgradeMenu.getDescription = () => `Current Menu : [${permUpgradeMenu.level + 1}] ${permUpgradeMenuNames[permUpgradeMenu.level % 3]}`;
        permUpgradeMenu.bought = (amount) => {
            if (permUpgradeMenu.level > 2){
                permUpgradeMenu.level = 0;
            }else if((permUpgradeMenu.level) == 2 && (artifactUpgrade[12].level == 0)){
                permUpgradeMenu.level = 0;
            }
            updateAvailability();
        }
    }
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(30, 30));
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
        //mining modules
        for(let i=0;i<excavatedElements;i++){
            excavatorModule[i] = shortPermaUpgrade(31000+i,elements[i],new ExponentialCost((i==0)?10000:1e6, ML2((i==0)?1.25:(1.9 + (i*0.1)))),`${elementData[i].fullName} Mining Module`,`Empowers your excavators with the essence of ${elementData[i].fullName}`);
            excavatorModule[i].getDescription = (_) => excModulueDescription(i);
            excavatorModule[i].getInfo = (amount) => excModulueInfo(i,amount);
            excavatorModule[i].bought = (amount) => calcEPS();
        }
    }
    //Page 3.5 : Research
    {
        for(let i=0;i<5;i++){
            researchSlot[i] = shortPermaUpgrade(40001+i,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot ${i+1}`,"research slot");researchSlot[i].isAvailable = false;
            researchSlotID[i] = shortPermaUpgrade(40010+i,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot ${i+1} ID`,"research slot ID");researchSlotID[i].isAvailable = false;
        }
        researchSlotUpgrade = shortPermaUpgrade(40100,COOKIE,new ConstantCost(BF("1e1000")),`Research Slot Count`,"research slot count");researchSlotUpgrade.isAvailable = false;
        occupiedSlots = shortPermaUpgrade(40101,COOKIE,new ConstantCost(BF("1e1000")),`Number of used research Slot`,"occupied slot");occupiedSlots.isAvailable = false;
        for(let i=0;i<researchData.length;i++){
            log(`R${i}`);
            researchUpgrade[i] = shortPermaUpgradeML(41000+i,COOKIE,new ConstantCost(BF("1e1000")),`${researchData[i].name}`,"research upgrade",2);researchUpgrade[i].isAvailable = false;
            if(researchUpgrade[i].level > 0){
                mainUpgradeStack[i].content.children[2].text = `Researched!`;
            }
        }
    }
    ///////////////////
    // Regular Upgrades
    // Throwaway
    {
        artArt = throwawayUpgrade(1e9 + 3,"Artifacts","how did you managed to see this");
        moreExcavator = throwawayUpgrade(1e9 + 4,"Artifacts","how did you managed to see this");
        cookiearium = throwawayUpgrade(1e9 + 6,"Artifacts","how did you managed to see this");
        aquaCrust = throwawayUpgrade(1e9 + 7,"Artifacts","how did you managed to see this");
        timeDilate = throwawayUpgrade(1e9 + 8,"Artifacts","how did you managed to see this");
        excavate = throwawayUpgrade(1e9 + 15,"Artifacts","how did you managed to see this");
    }
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
        buildingExponent[i].getDescription = (_) => `B[${i}] - +${buildingData[i].names[0]} [${buildingExponent[i].level}/${buildingData[i].maxExpLevel}]`;
        buildingExponentRemove[i] = shortUpgrade(202+i,EXPO_BAR,new FreeCost(),`B[${i}] - -${buildingData[i].names[0]}`,`Decreases the exponent of ${buildingData[i].names[0]} by ${buildingExponentMod}`);
        buildingExponentRemove[i].getDescription = (_) => `B[${i}] - -${buildingData[i].names[0]} [${buildingExponent[i].level}/${buildingData[i].maxExpLevel}]`;
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
        buildingLump[i] = shortPermaUpgrade(33 + i, SUGAR_LUMP, buildingLumpCost(i), "getBuildingLumpDesc(i)", "(amount) => getBuildingLumpInfo(i,amount)");
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
                    spellCast[i].getDescription = (_) => `${spellData[i].name} ${(spellCooldown[i].level > 0)?`- ${getCollectionBar(Math.round(60 * (spellCooldown[i].level/spellData[i].castCooldown)),60)}`:""}`;
                    spellCast[i].maxLevel = 99;
                    spellCast[i].bought = (amount) => {
                        onSpellCast(i,amount);
                    };
                }
                break;
            }
            case 12:{
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
        for (let i = 0; i < 10; i++) {
            lumpAch[i] = theory.createAchievement(200 + i, lumpAchCat, lumpAchName[i], lumpDesc(lumpAchReq[i]), () => checkAchL(lumpAchReq[i]),() => (lumpTotal.value/lumpAchReq[i]));
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
    ///////////////////
    //// Story chapters
    for (let i = 0; i < 16; i++) {
        chapter[i] = theory.createStoryChapter(i, chapterName[i], chapterLore[i], () => checkChapter(i));
    }
    for (let i = 0; i < 9; i++) {
        quartList[i] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{_{${elementData[i].symbol}}}`, elements[i].value));
    }
    quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{C_m}`, null));
    quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
    quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T}`, null));
    quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_m}`, null));
    quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
    updateResearchLabel();
    updateAvailability();
};

//!Availability
var updateAvailability = () => {
    // Buildings
    for (let i = 0; i < 19; i++) {
        if (i >= 3) {building[i].isAvailable = (COOKIE.value >= buildingData[i - 1].baseCost) || (building[i].level > 0);}
        else {building[i].isAvailable = true;}
        building[i].isAvailable &= (normalUpgradeMenu.level == 0);
        buildingPower[i].isAvailable = building[i].level > 0 && permUpgradeMenu.level == 0;
        buildingLump[i].isAvailable = building[i].level > 10 && permUpgradeMenu.level == 0;
        buildingExponent[i].isAvailable = (building[i].level > 0) && (normalUpgradeMenu.level == 2) && (modeExponentium.level == 0);
        buildingExponentRemove[i].isAvailable = (building[i].level > 0) && (normalUpgradeMenu.level == 2) && (modeExponentium.level == 1);
    }
    exponentium.isAvailable = (normalUpgradeMenu.level == 2);
    modeExponentium.isAvailable = (normalUpgradeMenu.level == 2);
    building[14].isAvailable &= (artifactUpgrade[9].level > 0);
    building[16].isAvailable &= (jetTransistor.level > 0);
    building[17].isAvailable &= (moonMarble.level > 0);
    // Cookieh
    cookieTasty.isAvailable = COOKIE.value > BF(1e5) && normalUpgradeMenu.level == 1;
    kitty.isAvailable = achCount > 1 && (normalUpgradeMenu.level % 2) == 1;
    for(let i=0;i<(cookieTinInfo.length);i++){
        cookieTin[i].isAvailable = (cookieTinUnlock.level > i) && (COOKIE.value > (cookieTinInfo[i].baseCost)/BF(50) || cookieTin[i].level > 0) && (normalUpgradeMenu.level % 2) == 1;
    }
    // Heavenly Upgrades
    cookieTinUnlock.isAvailable = HEAVENLY_CHIP.value >= BF(10) && (permUpgradeMenu.level % 2) == 1;
    CookieH.isAvailable = HEAVENLY_CHIP.value >= BF(500) && (permUpgradeMenu.level % 2) == 1;
    CookieS.isAvailable = HEAVENLY_CHIP.value >= BF(10000) && (permUpgradeMenu.level % 2) == 1;
    CookieC.isAvailable = HEAVENLY_CHIP.value >= BF(1e7) && (permUpgradeMenu.level % 2) == 1;
    DivineD.isAvailable = HEAVENLY_CHIP.value >= BF(1e10) && (permUpgradeMenu.level % 2) == 1;
    CookieTau.isAvailable = HEAVENLY_CHIP.value >= BF(1e12) && (permUpgradeMenu.level % 2) == 1;
    TerraInf.isAvailable = HEAVENLY_CHIP.value >= BF(1e50) && (permUpgradeMenu.level % 2) == 1;
    TwinGates.isAvailable = ChronosAge.level > 0 && (permUpgradeMenu.level % 2) == 1;
    ChronosAge.isAvailable = ygg.level > 0 && (permUpgradeMenu.level % 2) == 1;
    ConjureBuild.isAvailable = invest.level >= 10 && (permUpgradeMenu.level % 2) == 1;
    R9Box.isAvailable = HEAVENLY_CHIP.value > BF(1e79) && (permUpgradeMenu.level % 2) == 1;
    conGrow.isAvailable = HEAVENLY_CHIP.value > BF(1e100) && (permUpgradeMenu.level % 2) == 1;
    SpellStack.isAvailable = HEAVENLY_CHIP.value > BF(1e100) && (permUpgradeMenu.level % 2) == 1;
    Empower.isAvailable = HEAVENLY_CHIP.value > BF(1e115) && (permUpgradeMenu.level % 2) == 1;
    //milkOil.isAvailable = HEAVENLY_CHIP.value > BF(1e130) && (permUpgradeMenu.level % 2) == 1;
    // Gimmick
    covenant.isAvailable = COOKIE.value >= BF(1e60) && (normalUpgradeMenu.level == 0);
    ygg.isAvailable = COOKIE.value >= BF(1e100) && (normalUpgradeMenu.level == 0);
    terra.isAvailable = COOKIE.value >= BF(1e125) && (normalUpgradeMenu.level == 0);
    recom.isAvailable = COOKIE.value >= BF(1e155) && (normalUpgradeMenu.level == 0);
    invest.isAvailable = COOKIE.value >= BF(1e180) && (normalUpgradeMenu.level == 0);
    investRespec.isAvailable = invest.level >= 100 && (normalUpgradeMenu.level == 0);
    archaeology.isAvailable = COOKIE.value >= BF(1e245) && (normalUpgradeMenu.level == 0);
    artifactPouch.isAvailable = archaeology.isAvailable && (normalUpgradeMenu.level == 0);
    templeReset.isAvailable = archaeology.isAvailable && archaeology.level >= 10 && (normalUpgradeMenu.level == 0);
    for(let i=0;i<artifactCount;i++){
        artifactUpgrade[i].isAvailable = archaeology.isAvailable && (artifactPouch.level == 1) && (normalUpgradeMenu.level == 0);
    }
    SpellView.isAvailable = artifactUpgrade[10].level > 0 && (normalUpgradeMenu.level == 0);
    for(let i=0;i<spellUsed;i++){
        spellCast[i].isAvailable = SpellView.isAvailable && (SpellView.level > 0) && spellData[i].unlockCondition();
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
    //elements
    chalcedIngredient.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 1);
    butterBar.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 2);
    sugarTools.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 3);
    jetEngine.isAvailable = (permUpgradeMenu.level == 2) && (excavatorDrill.level > 4);
    jetRefine.isAvailable = (permUpgradeMenu.level == 2) && (astroExtract.level > 0);
    jetTransistor.isAvailable = jetEngine.isAvailable;
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
                updateResearchText(id,2,researchDone);
                updateResearchLabel();
                occupiedSlots.level -= 1;
                //shift down
                for(j=i;j>occupiedSlots.level;j++){
                    researchSlot[j].level = researchSlot[j+1].level;
                    researchSlotID[j].level = researchSlotID[j+1].level;
                }
                updateResearchButtonText();
                researchSlot[occupiedSlots.level].level = 0;
                researchSlotID[occupiedSlots.level].level = 0;
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
    //log(`get ${ret}`);
    //log(`generating for ${id}, base = ${ret}, pow = ${pow}`);
    return ret;
}
var generateLump = (ticks) => {
    let lumpChance = BF(1) / (BF(lumpTickChance) / BigL10(COOKIE.value + BF(10)));//it's normally 1/x
    let dLump = BF(lumpChance.floor() + (sugarTools.level * 0.25) + (5 * researchUpgrade[3].level) + ((recom.level + ((artifactUpgrade[7].level > 0) ? 10 : 0)) * 0.01)) * ticks;//yes, ticks ARE 0.1 seconds so 2.5LPS = 0.25LPT
    //log(dLump);
    lumpChance -= lumpChance.floor();
    if (ticks == 1 && BF(Math.random()) <= lumpChance) {
        dLump += BF(1);
    }else if(ticks > 1){
        dLump += lumpChance*ticks;
    }
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
    updateGlobalMult();
    refreshLocalMult();
    calcIdleCPS();
    calcEPS();
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
        setupTick = false;
    }
    if(profilingConst){
        profiler1.exec(performanceTester);
        //log(`X = ${profiler1.mean}, SD = ${profiler1.stddev}, Z = ${(profiler1.latest-profiler1.mean)/profiler1.stddev}`);
        log(`X = ${profiler1.mean}`);
    }
    terraBoost = Logistic();
    dilateBoost = Dilate();
    //research
    researchInc(Math.round(elapsedTime * multiplier * 10));
    let dt =elapsedTime * multiplier * 10 * dilateBoost;//1 tick = 0.1 second
    thymeInc(Math.round(dt));
    trueThyme.level += 1;
    //log(dt);
    theory.invalidateSecondaryEquation();
    //let theoryBonus = theory.publicationMultiplier;
    //idle
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
        COOKIE.value += IdleCPS * dt/10;
    }else{
        //cookie
        if(thyme.level % 5 == 0){
            if(dt >= buildingData[dominate].collection){
                COOKIE.value += generateCookie(dominate,dt,terraBoost);
            }else{
                for(let i=0;i<=9;i++){
                    let id = i*2;
                    if(dt >= buildingData[id].collectionTime){
                        COOKIE.value += generateCookie(id,dt,terraBoost);
                        if(id < 18)COOKIE.value += generateCookie(id+1,dt,terraBoost);
                    }else if(thyme.level % buildingData[id].collectionTime == 0){
                        //log(`${i} due!`);
                        COOKIE.value += generateCookie(id,buildingData[id].collectionTime,terraBoost);
                        if(id < 18)COOKIE.value += generateCookie(id+1,buildingData[id+1].collectionTime,terraBoost);
                    }
                }
            }
            if(thyme.level % 2 == 0){//5 * 2 = 10
                clickStreak = 0;
                updateStrobe();
                updateGlobalMult();
                updateAvailability();
                updateLocalMult(2);//yggdrasil, leave covenant to onBuildingBought
                //CPSrefresh();
            }
        }
    }
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
var PrimaryEquation = (col) => {
    //log(`${eqColor[Math.floor(col)]}`);
    return `\\color{#${eqColor[col]}}{\\dot{C} = P(B(0) + \\sum_{i=1}^{18}{B(i)})}`;
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
    switch (mode) {
        case 0:
            return `\\color{#${eqColor[col]}}{${(R9Box.level > 0) ? `\\dot{C} \\leftarrow \\dot{C}\\sigma^{${R9BoxMult}R_{9}}\\\\` : ""}B(i) = B[i]P_{i}${buildingLumpMult}^{L[i]}${(CookieTau.level > 0) ? "(\\log_{10}\\log_{10}\\tau)^{2}" : ""}${(building[14].level > 0) ? `\\\\B(14) \\leftarrow B(14)^{r(${chanceBaseMax}+5\\cdot10^{-5}L[14],${chanceBaseMin}+5\\cdot10^{-5}L[14])}` : ""}}`;
        case 1:
            return (
                `\\color{#${eqColor[col]}}{` +
                "P = M(CP(l)) \\\\" +
                (CookieS.level > 0 ? "(log_{2}(L + 2))^{1.5}" : "") +
                (CookieH.level > 0 ? "(log_{10}(H + 10))^{1.25}" : "") +
                (CookieC.level > 0 ? "\\\\(log_{10}(C + 10))^{0.9}" : "") + "}"
            );
        case 2:
            return `\\color{#${eqColor[col]}}{M = M_{i}K(0.2)+(K-10)(0.3)\\\\+(K-25)(0.4)+(K-50)(0.5)${(artifactUpgrade[2].level > 0) ? "\\\\M \\leftarrow M^{1.5+0.01A_{c}}" : ""}}`;
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
                `\\color{#${eqColor[col]}}{B(2) \\leftarrow B(2)(\\sum_{i=0}^{18}{B[i]})^{${covDelta}${cp}^{${covLvMod}} + ${covExp}}}`
            );
        case 5:// Ygg + Chronos
            // theory.secondaryEquationScale = 0.925;
            let ys = " Y_{g}";
            return `\\color{#${eqColor[col]}}{B(2) \\leftarrow ${yggBoost}B(2)P_{2}^{${yggPowBase} + ${yggPowLv}${ys}}\\\\(B[6]+B[2])^{${yggBPowBase} + ${yggBPowMod}${ys}^{${yggBPowLv}}}(1+t)^{${yggThymePow}}${(ChronosAge.level > 0) ? `\\\\ B(i) \\leftarrow B(i)(1+t^{${chronosPow}}), \\quad i \\neq 2` : ``}}`;
        case 6:// Terra
            let tr = " T_{r}";
            let tf = " T_{\\infty}";
            let tm = " T_{m}";
            return `\\color{#${eqColor[col]}}{${tm} = 1500${(moreExcavator.level > 0) ? "E_{f}^{1.5}" : ""}${tr}^{2.5+0.05${tf}}\\\\T = 1+${tm}^{0.2+0.1${tf}} + \\frac{${tm}^{1+0.005${tf}}}{1+e^{t-(X_{b}+300${tr})}}}`;
        case 7:// Recom
            let rc = " R_{c}";
            return `\\color{#${eqColor[col]}}{\\dot{H} = H^{0.9}(${rc})\\\\ \\dot{L} = 0.01${rc}\\\\ B(4) \\leftarrow B(4)10^{54}${recomPowBase}^{${rc}-1}}`;
        case 8:// Dilation
            return `\\color{#${eqColor[col]}}{T_d = \\frac{B[11]^{1+0.025T_D}}{1000^{T_f}}\\\\T_f = 1-\\frac{min(B[11],B[10]+B[12])}{(2.125-0.125T_{D}))(B[10]+B[12])}}`;
        case 9:// Elements
            theory.secondaryEquationScale = 0.85;
            return `\\color{#${eqColor[col]}}{E=[Be,Ch,Bg,Su,Jm,Cs,Hz,Mn,As]\\\\ \\dot{E_{n}}=\\frac{E_{x}\\prod_{i=0}^{${excavatedElements}}{Ef_{i}}}{${getLossFactor()}^{n}},\\: n \\neq 8${(artifactUpgrade[13].level > 0) ? `\\\\ \\dot{E_{8}}=\\frac{log_{10}(B[8]+10)log_{10}(B(8)+10)}{1000}` : ``}}`;
        case 10:// Decay
            let ingre = (acceleratorMode.level - 1 == -1) ? "E_{n}" : `${elementData[acceleratorMode.level - 1 + 2].symbol}`;
            let r1 = (acceleratorMode.level - 1 == -1) ? "E_{n-1}" : `${elementData[acceleratorMode.level - 1 + 1].symbol}`;
            let r2 = (acceleratorMode.level - 1 == -1) ? "E_{n-2}" : `${elementData[acceleratorMode.level - 1].symbol}`;
            let b1 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1 + 2].symbol}=${elementData[acceleratorMode.level - 1 + 2].weight}u`;
            let b2 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1 + 1].symbol}=${elementData[acceleratorMode.level - 1 + 1].weight}u`;
            let b3 = (acceleratorMode.level - 1 == -1) ? "" : `${elementData[acceleratorMode.level - 1].symbol}=${elementData[acceleratorMode.level - 1].weight}u`;
            return `\\color{#${eqColor[col]}}{${b1} \\quad ${b2} \\quad ${b3}\\\\${ingre} \\rightarrow ${ingre}(${r1}) + ${ingre}(${r2}) + \\frac{${(acceleratorMode.level - 1 == -1) ? "\\lambda " : elementData[acceleratorMode.level - 1 + 2].weight + elementData[acceleratorMode.level - 1 + 1].weight + elementData[acceleratorMode.level - 1].weight}C_{m}}{${cookieYieldFactor}(${weightFactor})}\\\\\\dot{R} = B[12]\\lambda ${ingre}}`;
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
        quartList[i].value = (excavatorDrill.level >= (i + 1) || ((i == 8) && (artifactUpgrade[13].level > 0))) ? elements[i].value : null;
    }
    quartList2[0].value = CPS;
    quartList2[1].value = thyme.level / 10;
    quartList2[2].value = (terra.level > 0) ? Logistic() : null;
    quartList2[3].value = (terra.level > 0) ? maxL : null;
    quartList2[4].value = (timeDilate.level > 0) ? Dilate() : null;
    if (quType == 0) {
        return quartList2;
    } else {
        return quartList;
    }
    return quartList2;
};


//!==OTHER THEORY BACKBONE==
var elemBefore = new Array(9), clickStreak = 0, buildingExponentBefore = new Array(19), exponentiumBefore, exponentiumLvBefore;
var get2DGraphValue = () => {
    if (vizType.value == 1)
        return (
            (milk >= 100 ? 100 : milk) +
            ((BigNumber.PI * BF(time)) / BigNumber.TEN).sin().abs()
        ).toNumber();
    else if (vizType.value == 0)
        return (
            COOKIE.value.sign *
            (BigNumber.ONE + COOKIE.value.abs()).log10().toNumber()
        );
};
var getPublicationMultiplier = (tau) => tau.pow(1.07);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{1.07}";
var postPublish = () => {
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
    for (let i = 0; i < usedElements; i++) {
        elements[i].value = elemBefore[i];
    }
    exponentium.level = exponentiumLvBefore;
    EXPO_BAR.value = exponentiumBefore;
    for(let i=0;i<19;i++){
        buildingExponent[i].level = buildingExponentBefore[i] ;
    }
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
var getTau = () => (COOKIE.value.abs()).pow(0.2);
var getCurrencyFromTau = (tau) => [tau.max(BigNumber.ONE).pow(5), COOKIE.symbol];


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
        text: "(0.5).2.0 - back in business bois",
        fontSize: 18,
        horizontalTextAlignment: TextAlignment.CENTER,
        fontAttributes: FontAttributes.BOLD,
        padding: Thickness(2, 10, 2, 5)
    }));
    ret.push(ui.createLabel({
        text: "\t- brought back elements and particle accelerators, find it in page 3 of permanent tab and below particle accelerators \n\t-overhauled the entire system of the 2 things mentioned above \n\t-e500 is real \n\t-more fleshed out upgrades that depend on elements, perhaps a pseudo-tech tree even \n\t-moved exponentium to page 3 of normal upgrades \n\t-technically made time dilation artifact discoverable \n\t-made accelerator more controllable and now comes with 7 fancy lights \n\t-heavenly upgrades \n\t-super L milestone now works \n\t-2 artifacts related to elements \n\t-idleverse now buyable but you must be able to contain them \n\t-bugfixes",
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
const eqName = ["Building CPS", "Building Power", "Milk", "Cookie Power", "Covenant", "Yggdrasil", "Mass Terraforming", "Recombobulators", "Time Dilation", "Elements", "Elemental Decay"];
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
//!1.5 : COLOR
var indecide = 0;
const eqColor = ["FFFFFF", "E6DFCF", "A06846", "FFD4D8", "FE3246", "ABED6A", "EA8B01", "C48AE2", "F4E4BA", "FBF2D5", "AC6329", "E5BD46", "E71334", "E2DBD2", "83F2BC", "8F9098", "FF6D98", "AB5DF8", "F1398D", "50AB21", "D08072", "B08F7A", "00FFFF", "8800FF"];
const eqColorName = ["White", "Milk", "Chocolate", "Strawberry", "Raspberry", "Lime", "Orange", "Blueberry", "Banana", "Vanilla", "Caramel", "Honey", "Cherry", "Coconut", "Mint", "Licorice", "Rose", "Blackcurrant", "Dragonfruit", "Black Forest", "Peach", "Hazelnut", "Crystallized", "Pentallized"];
const eqColorAch = [0, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 225];
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
let mysteryFunPopup = ui.createPopup({
    title:"?????",
    content: ui.createStackLayout({children:[
        ui.createEntry({
            isPassword: true,
            maxLength: 256,
            text:""
        }),
        ui.createButton({
            text: "Submit",
            onClicked: () => {
                //let str = mysteryFunPopup.content.children[0].text;
                //log(mysteryFunPopup.content.children[0].text);
                mysteryFunPopup.hide();
            }
        })
    ]}),
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
    costTable[i] = ui.createLabel({fontSize:costTableFontSize,text:"",row:i%4,column:columnArr[Math.floor(i/4)],horizontalTextAlignment: TextAlignment.CENTER});
}
var updateCostTable = (costs) => {
    for(let i=0;i<8;i++){
        if(i < costs.length){
            if(isValidCostObj(costs[i])){
                costTable[i].text = costs[i].amount.toString();
                costTable[i+8].text = `${getCostSymbol(costs[i].type)} : `;
            }else{
                costTable[i].text = "???";
                costTable[i+8].text = `???`;
            }
        }else{
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
                columnDefinitions: ["65*","45*"],
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
                text: "Cookie Idler - 8222e8b\nv(0.5).2.0"
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
var getEquationOverlay = () =>
    ui.createStackLayout({
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
            terra.level > 0
                ? ui.createImage({
                    source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/6f/CookieProduction39.png/revision/latest?cb=20200620182721"),
                    horizontalOptions: LayoutOptions.START,
                    verticalOptions: LayoutOptions.END,
                    aspect: Aspect.ASPECT_FIT,
                    heightRequest: getImageSize(ui.screenWidth),
                    widthRequest: getImageSize(ui.screenWidth),
                    useTint: false,
                    margin: new Thickness(9, 0, 0, 0),
                    onTouched: (e) => {
                        if (e.type == TouchType.SHORTPRESS_RELEASED) {
                            log("Boost!");
                            xBegin = thyme.level;
                            updateGlobalMult();
                        }
                    },
                })
                : ui.createImage({
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
