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

var id = "CookieIdler2";
var name = "Cookie Idler";
var description =
    "🍪👵🍪\nA game within a theory involving baking a copius amounts of cookies in exchange for something far greater...\n🍪👵🍪\n\n🍪==FEATURES==🍪\n🍪 Click, Bake, Farm, Produce your way into the big leagues. With 19 buildings to buy, empower, and upgrade.\n🍪 Experience a whole new level of text richness in theories like never before. Boatloads of text waiting to be read in all aspects, from the buildings, achievements, all the way to upgrades(nerdy mode included).\n🍪 Unique upgrades and intresting game mechanics will involve you to no end! Tasty Cookies, even tastier cookies, breaking the fourth wall, and changing the game itself.\n🍪Absolute lack of big and scary mathematics, rated E for Everyone\n\n🍪==CREDITS==🍪\n🍪 Orteil for bringing such a legendary game idea to life\n🍪 ellipsis for suggesting ideas for the UI\n🍪 skyhigh173 for reformatting the code so it looks better\nspqcey(randomname#9373) for proofreading and fixing a majority of the text\n🍪 Lava for fixing the legendary bug";
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
    up.getDescription = () => desc;
    up.getInfo = () => info;
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
    up.getDescription = () => desc;
    up.getInfo = () => info;
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
    var ret = shortUpgradeML(gimmickUpgradeObject.uid,COOKIE,gimmickUpgradeObject.costModel,gimmickUpgradeObject.name,gimmickUpgradeObject.info,gimmickUpgradeObject.maxLevel);
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
    width = 16;
    height = 16;
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
        return this.table[(r*16 + c)];
    }
    setVal(r, c, v) {
        this.table[(r*16 + c)] = BF(v);
    }
    getValIndex(indx) {
        return this.table[indx];
    }
}
var stateTable = new internalState(16,16);
var updateTable = (r, c, v) =>{
    log(`Update [${r}][${c}] = ${v}`);
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
    var reactorMode = new ISV(0, 0, 5),
        reactorInterim;
    var perkPoint = new ISV(0, 0, 6);
    var heavVis = new ISV(0, 0, 7);
    var bInfoStore = new ISV(0, 0, 8);
    var dominatestore = new ISV(0, 0, 9);
    var maxBuildStore = new ISV(0, 0, 10);//maximum building
    // block 5 - VIZ
    var eqTypeStore = new ISV(0, 7, 0),
        quTypeStore = new ISV(0, 7, 1);
    var vizType = new ISV(0, 7, 2);
    var eqCStore = new ISV(0, 7, 3);
    var buildingExponentLvStore = new Array(19), buildingExponentLv = new Array(19);
    for(let i=0;i<16;i++){
        buildingExponentLvStore[i] = new ISV(0,1,i);
    }
    for(let i=16;i<19;i++){
        buildingExponentLvStore[i] = new ISV(0,2,i-16);
    }
    var perkHas;
    //let time = ISV(0,0,0); // degrees
}
var dominate = 0, eqC = 0, quType = 0, eqType = 0, achCount = 0, bInfo = 0, maxBuild = 0;

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
        CPSstore.readValue();HPSstore.readValue();
        achCountStore.readValue();lumpTotal.readValue();artUnlock.readValue();reactorMode.readValue();perkPoint.readValue();heavVis.readValue();
        bInfoStore.readValue();dominatestore.readValue();eqTypeStore.readValue();quTypeStore.readValue();vizType.readValue();eqCStore.readValue();maxBuildStore.readValue();
        for(let i=0;i<19;i++){
            buildingExponentLvStore[i].readValue();
        }
        CPS = BF(CPSstore.value);
        dominate = Math.floor(dominatestore.value);
        perkHas = perkPoint.value;
        for (let i = 0; i < 19; i++) {
            buildingExponentLv[i] = Math.floor(buildingExponentLvStore[i].value);
            //log(buildingExponentLv[i]);
            perkHas -= buildingExponentLv[i];
            perkMenu.content.children[3].children[0].children[i].children[1].text = `${buildingExponentLv[i]} / ${maxbuiPerk(i)}`;
        }
        achCount = Math.floor(achCountStore.value);if(Number.isNaN(achCount)){achCount = 0;}
        eqC = Math.floor(eqCStore.value);if(Number.isNaN(eqC)){eqC = 0;}
        eqType = Math.floor(eqTypeStore.value);if(Number.isNaN(eqType)){eqType = 0;}
        quType = Math.floor(quTypeStore.value);if(Number.isNaN(quType)){quType = 0;}
        bInfo = Math.floor(bInfoStore.value);if(Number.isNaN(bInfo)){bInfo = 0;}
        maxBuild = Math.floor(maxBuildStore.value);if(Number.isNaN(maxBuild)){maxBuild = 0;}
        log("Read the data!");
    }
}

//! Buildings INFO + GIMMICKS
var buildingPriceMult = ML2(1.15);
var building50 = BigP(BigP(2,buildingPriceMult),50);
var buildingExponent = 0.05, defaultSweetLim = 1;

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
     baseCPS: 5.3e4, baseCost: 1.1e5, powerUpgradeMult: 60, mult: 1, collectionTime : 15,maxExpLevel: 5, sweetLimit: 15, sweetMax: 250,
     achName: ["Home Organic","100% Sustainable","Green Pasture lays live","Babylonian Conservatorium sits on the hill","Farmer\'s Heaven"],
     gimmicks: [{
        uid: 10002,
        name: "Yggdrasil $(Y_{g})$",
        info: "Empower your farms with the power of time and cookie ancients",
        costModel: new ExponentialCost(1e110, ML2(1e25)),
        maxLevel: 4,
        onBought: (amount) => {updateGlobalMult();updateLocalMult(2);}
     }]},
    {id: 3,
     names: ["Mine","Mein"], desc: "mining ", lumpBName: "Drilling Overclock",
     baseCPS: 7.4e7, baseCost: 1.2e8, powerUpgradeMult: 125, mult: 1, collectionTime : 15,maxExpLevel: 5, sweetLimit: 25, sweetMax: 500,
     achName: ["Stop! Drilling Time!","Break the core","Dysonian Society","Breaking through omnirealitimetaplanes","r/drillingmasterrace"],
     gimmicks: [{
        uid: 10003,
        name: "Mass Terraforming $(T_{r})$",
        info: "Unlocks/Improves a buff that temporarily boosts your CPS by a lot",
        costModel: new ExponentialCost(1e130, ML2(1e10)),
        maxLevel: 20,
        onBought: (amount) => {getEquationOverlay();}
     }]},
    {id: 4,
     names: ["Factory","Fcotyr"], desc: "mass producing ", lumpBName: "Patent Publishing",
     baseCPS: 4.05e10, baseCost: 1.3e12, powerUpgradeMult: 59, mult: 1, collectionTime : 20,maxExpLevel: 5, sweetLimit: 25, sweetMax: 500,
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
     baseCPS: 1.4e12, baseCost: 1.4e18, powerUpgradeMult: 35, mult: 1, collectionTime : 20,maxExpLevel: 5, sweetLimit: 25, sweetMax: 500,
     achName: ["Pretty Penny Pinchers","Keynesian Cookinomics","New Neohyperglobalization Order","Money is just a human construct","Hypermetaflation"],
     gimmicks: [{
        uid: 10005,
        name: "Investment Openings $(I_{o})$",
        info: "Open your very own investments forms. Grants 5 buildings of random type and a flat 1.01 CPS boost!(chance of failure included)",
        costModel: new ExponentialCost(1e190, ML2(1.05)),
        maxLevel: 1000,
        onBought: (amount) => {updateGlobalMult();updateLocalMult(5);}
     }]},
    {id: 6,
     names: ["Temple","Tmelpe"], desc: "directing in ", lumpBName: "Sacred Chocolate Artifact",
     baseCPS: 1.18e18, baseCost: 2e25, powerUpgradeMult: 8, mult: 1, collectionTime : 25,maxExpLevel: 5, sweetLimit: 50, sweetMax: 500,
     achName: ["Way of the Temple","Balance of Faith","The Lord\'s Likeliness","Caricature of the forgotten Deities","Chief Artifact Curator"],
    },
    {id: 7,
     names: ["Wizard Tower","Wixaradf Trower"], desc: "spawning in ", lumpBName: "Syllables",
     baseCPS: 9.16e22, baseCost: 3.3e50, powerUpgradeMult: 17, mult: 1, collectionTime : 25,maxExpLevel: 5, sweetLimit: 100, sweetMax: 500,
     achName: ["Bewitched","Alakazamd","Shaspie Colupis","Cookiera Avadra Creamdera","Hours to pronounce, effects very pronounced"],
    },
    {id: 8,
     names: ["Shipment","Shipemtn"], desc: "bringing in ", lumpBName: "Cosmic Exploration",
     baseCPS: 1.079e34, baseCost: 5.1e75, powerUpgradeMult: 25, mult: 1, collectionTime : 30,maxExpLevel: 5, sweetLimit: 125, sweetMax: 500,
     achName: ["Local Expedition","Cosmic Mapping","Multiverse Ramble","Omniverse Realization","You could make a chronicle out of those"],
    },
    {id: 9,
     names: ["Alchemy Lab","Alehfcehy Lba"], desc: "transmuting ", lumpBName: "New Esoteric Elements", sweetLimit: 150, sweetMax: 500,
     baseCPS: 1.15e50, baseCost: 7.5e100, powerUpgradeMult: 23, mult: 1, collectionTime : 30,maxExpLevel: 5,
     achName: ["Transmutation","Polytranselementation","With matter comes Cookies","Satiated in the gaudy mouths of Gold","Truly a Mendeleev's Nightmare"],
    },
    {id: 10,
     names: ["Portal","Proalt"], desc: "retrieving ", lumpBName: "Normalize Dimension",
     baseCPS: 6.66e58, baseCost: BF("1e125"), powerUpgradeMult: 21, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 200, sweetMax: 450,
     achName: ["Isekai\'d","H̶e̷ ̶C̶o̴m̵e̸s̵","I̸͕̽n̷̰͊ ̸͖̔ṭ̵͐h̶̺̓e̴̫͋ ̶͓͂e̸͔͘y̸̝͋e̵͓̚s̸̫̒ ̶̰̕ò̸̜f̶͖̕ ̶̻͒t̷̥͆ĥ̶̳é̵̗ ̷̦̉b̴̡̽e̶͚̿h̴̙̋o̸̩͝l̴̘͆d̷̠͠è̶͍ř̴͎","Bottom of the abyss","Is this reality or is it cookieverse?"],
    },
    {id: 11,
     names: ["Time Machine","Tie Macine"], desc: "preventing cookies from being eaten by ", lumpBName: "Paradox Resolve",
     baseCPS: BF("6.5e72"), baseCost: BF("1.4e150"), powerUpgradeMult: 20, mult: 1, collectionTime : 35,maxExpLevel: 5, sweetLimit: 225, sweetMax: 400,
     achName: ["Thyme Wrap","Thyme Pararegano","Thyme Sagaporal Nutmegstant","Out of past, Out of future","No more Thyme Pararegano"],
    },
    {id: 12,
     names: ["Antimatter Condenser","Antimatter Condenstor"], desc: "synthesizing ", lumpBName: "Derived Elementary Flavor",
     baseCPS: BF("9.15e79"), baseCost: BF("1.7e180"), powerUpgradeMult: 15, mult: 1, collectionTime : 40,maxExpLevel: 5, sweetLimit: 250, sweetMax: 350,
     achName: ["When does it matter?","New Standard Model of Cookie and Flour","Unified Complete Theory of the Cookieverse","Hypersize my String and Gluten","Flavor Mathematics"],
    },
    {id: 13,
     names: ["Prism","Prius"], desc: "matterifying from light ", lumpBName: "Extended Spectrum",
     baseCPS: BF("4.9e96"), baseCost: BF("2.1e215"), powerUpgradeMult: 25, mult: 1, collectionTime : 40,maxExpLevel: 5, sweetLimit: 275, sweetMax: 350,
     achName: ["Some rays of dough and batter","Total Enlightenment","O thy energy of sky, bring fourth the light rays","Neverending rays of bright brilliance shine on you all","4th Cone"],
    },
    {id: 14,
     names: ["Chamceamekr","Cursof"], desc: "lucking in ", lumpBName: "Serendipity",
     baseCPS: BF("2.1e123"), baseCost: BF("2.6e300"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 300, sweetMax: 350,
     achName: ["Lucked up","Devil\'s Gambit","Gambler\'s Last Bet","Remember, the house always wins","Black Cat\'s Paw"],
    },
    {id: 15,
     names: ["Fractal Engine","Framcael Engeen"], desc: "duplicating in ", lumpBName: "Gone Iterative",
     baseCPS: BF("2.2e150"), baseCost: BF("3.1e351"), powerUpgradeMult: 10, mult: 1, collectionTime : 45,maxExpLevel: 5, sweetLimit: 350, sweetMax: 350,
     achName: ["Z_n+1 = (Z_n)^2 + c","Apollonian Gasket","C_n := (C_n-1 ∪ (2+C_n-1))/3, where C_0 := [0,1]","Divide by zero, now, I dare you","Quite nearly but not so full"],
    },
    {id: 16,
     names: ["Javascript Console","Jacascipr Conseoul"], desc: "hacking in ", lumpBName: "Reformat JS Script",
     baseCPS: BF("3.1e187"), baseCost: BF("7.1e425"), powerUpgradeMult: 9, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 400, sweetMax: 300,
     achName: ["Press F12","Infinite Theorycraft","I bring fourth reincarnation of reality","","The \"C\" Language"],
    },
    {id: 17,
     names: ["Idleverse","IDledeverse"], desc: "clicking ", lumpBName: "Install Another Idle Game",
     baseCPS: 69420, baseCost: BF("6.9e1337"), powerUpgradeMult: 7, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 450, sweetMax: 250,
     achName: ["Manifest Destiny","Is there enough worlds?","Lost your Cosmic Cookies?","We the People of the Cookieverse, in Order to form a more perfect Dimensional Union, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Cookies to ourselves and our Posterity, do ordain and establish this Constitution for the Cookieverse.","You need a new bluestack"],
    },
    {id: 18,
     names: ["Cortex Baker","Corex Bakr"], desc: "clicking ", lumpBName: "Get an extra IQ Point",
     baseCPS: 69420, baseCost: BF("6.9e1337"), powerUpgradeMult: 5, mult: 1, collectionTime : 50,maxExpLevel: 5, sweetLimit: 500, sweetMax: 200,
     achName: ["O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A- JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA","Cardinal Synapsis","I declare thee on all ye inferiors. Despair before me, I am the Ozymandias","Who are you? I̷ a̵͇̋͂̌m̷̡̨̉̀̂ s̷̬̏̓̓ø̷̘̜͚̒͒̓l̸͍̄͐͘i̷̡̛̞̯p̷͈̞̳̉̃s̶̬̲͕̝̓̕͝","I am smart"],
    },
];

// gimmick upgrade constants
var covenant, ygg, terra, excavate, moreExcavator, recom, invest, art, artArt, cookiearium, aquaCrust, timeDilate, accelerator, acceleratorMenu,synergy;
var jetDrive, sugarCoat, crystalHoney;
const covExp = 5;
const covDelta = 0.3;
const twinGateExp = BF(0.03), R9BoxMult = BF(0.7), symbolBookMult = BF(100), chronosPow = BF(0.5), gillesBoxPower = BF(0.61), covLvMod = BF(0.3), yggPowBase = BF(1.175), yggPowLv = BF(0.05), yggBPowLv = BF(0.9), yggBPowMod = BF(0.2), yggBPowBase = BF(3), yggThymePow = BF(1.4), yggBoost = BF(5e10), recomPowBase = BF(1.9), chanceBaseMin = BF(0.99), chanceBaseMax = BF(1.01), chanceBiasMod = BF(0.00005);
var buildingCount = 0;

// gimmick upgrades
// Logistic funtion for Mine+
// Param -> midpoint=30*L, max=500*L - 1, min=0
// Display T, returns bignumber
const terraDurMod = BF(600), terraInfPow = BF(0.005), maxLPowBase = BF(2.4), maxLPowMod = BF(0.05), maxLBPowBase = BF(1.2), maxLBPowMod = BF(0.03), dilateFactorDivBase = BF(2.125), dilateFactorDivMod = BF(0.125), dilateFactorBase = BF(1000), dilatePowBase = BF(1), dilatePowMod = BF(0.025);
var Logistic = () => {
    if(terra.level == 0){return 1;}
    var maxL = (BF(terra.level).pow(maxLPowBase + maxLPowMod * (TerraInf.level + ((artArt.level > 6) ? 1 : 0))) * 1500);
    maxL += BF(building[3].level).pow(maxLBPowBase + maxLBPowMod * TerraInf.level) * ((spellCast[3] + (10 * logBoostDue) >= thyme.level) ? logBoost : 1);

    return ((maxL.pow(1 + terraInfPow * TerraInf.level)) / (BigNumber.ONE + (BigNumber.E.pow((thyme.level - (xBegin + terra.level * terraDurMod))))));
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
        return Utils.getStepwisePowerSum(building[id].level + am, 2.4 + (0.2 * conGrow.level) + (0.011 * (id - 11)), 50 - conGrow.level, 1) - 1;
    } else if (conGrow.level > 1 && id < 11) {
        return Utils.getStepwisePowerSum(building[id].level + am, 1.2 + (0.07 * conGrow.level) + (0.021 * (id + 1)), 50 - conGrow.level, 1) - 1;
    } else {
        return BF(building[id].level + am);
    }
}

//building power
var getPower = (index) => BigP(Utils.getStepwisePowerSum(buildingPower[index].level, buildingData[index].powerUpgradeMult + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetDrive.level * 0.5), 5, 1), 1 + (superP.level * 0.02));
var getPower2 = (index, level) => BigP(Utils.getStepwisePowerSum(level, buildingData[index].powerUpgradeMult + ((index == 2 || index == 1) ? Empower.level * 0.01 : Empower.level * 1) + (jetDrive.level * 0.5), 5, 1), 1 + (superP.level * 0.02));

//building exponents
var getBuildingExp = (index) => {
    if(Number.isNaN(buildingExponentLv[index])){
        buildingExponentLv[index] = 0;
        return 1;
    }
    return buildingExponentLv[index] * buildingExponent + 1;
}

//building description + info
var getBuildingDesc = (indx) => {
    var bi = `\$B[${BigTS(indx)}]^{${(getBuildingExp(indx) > 1) ? getBuildingExp(indx).toString(10) : ""}}\$`;
    switch(bInfo){
        case 0:
            return `${bi} - ${buildingData[indx].names[0]} ` + getCollectionBar(indx,thyme.level % buildingData[indx].collectionTime);
        case 1:
            return `${bi} = ${calcBuilding(indx, 0)} ` + getCollectionBar(indx,thyme.level % buildingData[indx].collectionTime);
        case 2:
            return `${bi} - ${buildingData[indx].names[1]} ` + getCollectionBar(indx,thyme.level % buildingData[indx].collectionTime);
        default:
            return "Building Desc. Error!";
    }
}
var getBuildingInfo = (indx,amount) => `${getBuildingInfo2(indx, amount)}, ${((bInfo == 1) ? `\$B(${indx}) = ${generateCookie(indx,buildingData[indx].collectionTime,1)}\$` : "")}`;
var getBuildingInfo2 = (index, am) => {
    if (bInfo == 1) {
        return `\$B[${index}]^{${(getBuildingExp(index) > 1) ? getBuildingExp(index) : ""}}\$ = ${Utils.getMathTo(calcBuilding(index, 0), calcBuilding(index, am))}`;
    }
    var result = buildingData[index].names[0 + Math.floor(bInfo / 2)];
    if (building[index].level == 1) {
        result += " ";
    } else {
        result += "s ";
    }
    // Sorry, but you CAN'T get 1 CPS per building skill issue lol
    result += buildingData[index].desc + BF(generateCookie(index,buildingData[index].collectionTime,1)).toString(0) + " cookies per collection";
    return result;
}
var onBuildingBought = (indx,amount) => {
    //pass
    if(maxBuild < indx){
        maxBuild = indx;
        maxBuildStore.setValue(maxBuild);
        updateBuildingLumpMaxLv();
    }
    buildingCount += amount;
}

// building power data
log(building50);
var buildingPowerCost = (i) => new ExponentialCost(BF(building50) * buildingData[i].baseCost, ML2(building50));
var getBuildingPowerDesc = (indx) => `\$P_{${BigTS(indx)}}${(superP.level > 0) ? "^{1.02}" : ""}\$ = ${BigTS(getPower(indx))}`;
var getBuildingPowerInfo = (indx,amount) => `\$P_{${TS10(indx)}}${(superP.level > 0) ? "^{1.02}" : ""} \\: = \\: \$${Utils.getMathTo(BigTS(getPower(indx)), getPower2(indx, buildingPower[indx].level + amount).toString(0))}`;

// building lump data
var buildingLumpMult = 1.1
var buildingLumpCost = (i) => new LinearCost(i + 1, (i + 1) * ((i >= 13) ? (i - 1) * (i - 5) * 0.06 : 0.9));
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
    log(getBuildingPowerDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = 1;log(`==Compressed==`);
    log(getBuildingDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingPowerDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = 2;log(`==Typo==`);
    log(getBuildingDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingPowerDesc(indx));log(getBuildingInfo(indx,1));
    log(getBuildingLumpDesc(indx));log(getBuildingLumpInfo(indx,1));
    bInfo = temp;
}
var updateBuildingLumpMaxLv = () => {
    if(Number.isNaN(maxBuild)){maxBuild = 0;}
    let maxLv = buildingData[maxBuild].sweetLimit;
    log(`Max = ${maxBuild}, lim = ${maxLv}`);
    for(let i=0;i<19;i++){
        //log(`L${i} = Lv.${buildingLump[i].level}`);
        if(buildingLump[i].level < maxLv){
            buildingLump[i].maxLevel = Math.min(maxLv,buildingData[i].sweetMax);
        }else{
            buildingLump[i].maxLevel = buildingLump[i].level + 1;
        }
    }
}

//! CPS
// let arrcps = new Array(19);//raw values
// let fenwick = new Array(255);//the fun
// // getSum(18) gets the cps sun
// function getSum(index) {
//     let ret = 0;
//     index = index + 1;//fenwick index magick
//     while (index > 0) {
//         sum += fenwick[index];
//         index -= index & -index;
//     }
//     return ret;
// }
// function updateFen(n, index, delta) {
//     index = index + 1;
//     while (index <= n) {
//         fenwick[index] += delta;
//         index += index & -index;
//     }
// }

// funni building
function constructFen(arr, n) {
    for (let i = 1; i <= n; i++) fenwick[i] = 0;
    for (let i = 0; i < n; i++) updateFen(n, i, arr[i]);
}

//global mult - applies to C gained overall
var globalMult = BF(1), clickPower;
var clickPowerMaterials = ["Plastic","Iron","Titanium","Adamantium","Unobtainium","Eludium","Wishalloy","Fantasteel","Nevercrack","Armythril","Technobsidian","Plasmarble","Miraculite","Aetherice","Omniplast"], clickPowerDefault = "Selveradium", baseClickPower = 0.01, clickPowerMaterialTier = ["Weak","","Strong","Enchanted"], clickPowerMaterialTierLevel = 10;
var updateGlobalMult = () => {
    globalMult = BF(1);
    globalMult *= (getCookieP(cookieTasty.level) * (BF(1) + (CookieTau.level * game.tau.log10().log10().pow(2))));
    //1 "cookiep : " + (getCookieP(cookieTasty.level) * (1+(CookieTau.level * game.tau.log10().log10().pow(2)))));
    // globalMult *= (BF(1) + (BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp));
    //2 "click : " + (1+(BF(clickp.level) * BigP(buip, buildingUpgrade[0].level)) * BF(bcp)));
    globalMult *= ((TwinGates.level > 0) ? HEAVENLY_CHIP.value.pow(BF(twinGateExp) * TwinGates.level) : BF(1));
    //3 "twin : " + ((TwinGates.level > 0) ? hc.value.pow(twinGateExp * TwinGates.level) : 1));
    globalMult *= theory.publicationMultiplier;
    //4 "pub : " + theory.publicationMultiplier);
    globalMult *= (BigP(game.sigmaTotal, R9Box.level * R9BoxMult));
    //5 "r9 : " + (BigP(game.sigmaTotal,R9Box.level * R9BoxMult)));
    globalMult *= ((artArt.level > 9) ? symbolBookMult : BF(1));
    //6 "art9 : " + ((artArt.level > 9)?symbolBookMult:BF(1)));
    globalMult *= ((ChronosAge.level > 0) ? (BF(1) + BF(thyme.level).pow(chronosPow)) : BF(1));
    //7 "chrono : " + ((ChronosAge.level > 0)?(BF(1) + BF(thyme.level).pow(chronosPow)):BF(1)));
    globalMult *= ((artArt.level > 4) ? BigP(building[1].level, gillesBoxPower) : BF(1));
    //8 "art4 : " + ((artArt.level > 4)?BigP(building[1].level,gillesBoxPower):BF(1)));
    //globalMult *= (((BF(BF(spellCast[1]) + (BF(10) * effectCPSBDur)) >= BF(thyme.level))) ? effectCPSB : BF(1));
    //9 "spellsus : " + ((((spellCast[1]+(10*effectCPSBDur)) >= thyme.level))?effectCPSB:BF(1)));
    //10 "kp : "
    globalMult *= kittyPowerFull(kitty.level);
    if(globalMult == BF(0)){
        log("the what");
        globalMult = BF(1);
    }
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
        mult: 1.75,//mult from 1 level
        cookieOrder: ["Cookie Dough", "Cookie Dough(No Salmonella)", "Burnt Cookie", "A normal chocolate chip cookie but there\'s no chips at all for some reason", "4K Cookie", "Ray-Traced Cookie", "Crackers", "Deep-Fried Cookie", "Flavor Text Cookie"]
    },{
        order: 7, //unused, just for reference
        name: "Box of Cookien'\t",
        baseCost: BF("1.5e119"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 1.8,//mult from 1 level
        cookieOrder: ["Toast", "Pancakes", "Marshmellows", "PB amd J", "Wookies", "Cheeseburger", "Beesechurger", "One lone chocolate Chip", "Pizza", "Candy", "Brownies", "Flavor text Food that is not cookie", "Medovik", "Fudge"]
    },{
        order: 8, //unused, just for reference
        name: "Crate full of Exponential Idle Community References",
        baseCost: BF("1.5e137"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 2,//mult from 1 level
        cookieOrder: ["Gilles-Cookie Paillé", "liver", "Mathmatically Illegal Cookie", "! [ Snakey Snickerdoodles ] !", "Nerdy as f Cookie", ":exCookie:", "JS-Formed ellipsis Cookie", "SkyXCookie", "Weierstra🅱️ Cookie Spiral", "Exponential Cookie", "ouo cookie", "Orteil β Cookie"]
    },{
        order: 9, //unused, just for reference
        name: "The creator's inside jokes Box",
        baseCost: BF("1.5e155"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 2.25,//mult from 1 level
        cookieOrder: ["Gigaloopite", "Tetraloopite", "Enium Cookie", "Orate Cookie", "Dxygen Cookie", "IUSpawn Cookie", "egg", "Euler Serion Cookies", "Spasmic Cookieron", "S25+ Cosmos Grade Cookie"]
    },{
        order: 10, //unused, just for reference
        name: "Pack of Exotic Cookies",
        baseCost: BF("6e175"),//base cost
        costMult: 8775,//multiplier for cost, will be put through ML2() later on
        mult: 2.5,//mult from 1 level
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
    //level += crystalHoney.level * 10;
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
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieTasty.level
 * @returns {BigNumber} The total amount of cookie boost you have
 */
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
        res = BigP(res, 1.05);
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
    if (artArt.level > 2) {
        ret = BigP(ret, 1.5 + (achCount * 0.01));
    }
    return ret;
};
var kittyPowerFull = (level) => {
    let milk = BigNumber.FIVE * achCount;
    return kittyPower(level) * BF(BF(100 + milk) / BF(100));
}

//local mult - applies to C gained per building
var updateLocalMult = (indx) => {
    buildingData[indx].mult = BF(getPower(indx) * BigP(1.1,buildingLump[indx].level));
    switch (indx) {
        case 0:
            if (artArt.level > 3) {
                buildingData[indx].mult *= BF(3.24e65);
            }
            break;
        case 1:
            if (covenant.level > 0) {
                buildingData[indx].mult *= BigP(buildingCount,(BF(covenant.level).pow(covLvMod) * covDelta + covExp) * covenant.level);
            }
            break;
        case 2:
            if (ygg.level > 0 && thyme.level > 0) {
                buildingData[indx].mult *= BF(getPower(2)).pow(yggPowBase + yggPowLv * ygg.level) * BF(building[6].level + building[2].level).pow(BigP(ygg.level, yggBPowLv) * yggBPowMod + yggBPowBase) * (BigNumber.ONE + BF(thyme.level).pow(yggThymePow)) * yggBoost;
            }
            if (artArt.level > 5) {
                buildingData[indx].mult *= BF(200);
            }
            break;
        case 3:
            if (artArt.level > 6) {
                buildingData[indx].mult *= BF(3.5e63);
            }
            break;
        case 4:
            if (recom.level > 0) {
                buildingData[indx].mult *= (recom.level > 1) ? (BF(1e54) * BigP(recomPowBase, recom.level - 1)) : (BF(1e54));
            }
            if (artArt.level > 7) {
                buildingData[indx].mult *= BF(1.08e18);
            }
            break;
        case 5:
            if (artArt.level > 8) {
                buildingData[indx].mult *= BF(4.08e68);
            }
            break;
        case 6:
            if (artArt.level > 0) {
                buildingData[indx].mult *= BF(8e57);
                if (artArt.level > 1) {
                    buildingData[indx].mult *= (building[13].level) + BF(1);
                }
            }
            break;
        case 13:
            if (artArt.level > 1) {
                buildingData[indx].mult *= BF(1) + (BF(55) * building[6].level);
                if (artArt.level > 5) {
                    buildingData[indx].mult *= BF(750);
                }
            }
            break;
        case 14:
            //buildingData[indx].mult *= BigP(arrcps[14], RandR(chanceBaseMax + (chanceBiasMod * buildingUpgrade[14].level), chanceBaseMin + (chanceBiasMod * buildingUpgrade[14].level)));
            break;
    }
    if(buildingData[indx].mult == BF(0)){buildingData[indx].mult = BF(1)};
};

//building bar indicator : - = empty, | = 1 tick, O = 5 tick (over 25 tick)
var collectBar0 = "-", collectBar1 = "|", collectBar2 = "O";
var getCollectionBar = (indx, cur) => {
    if(buildingData[indx].collectionTime >= 25){
        cur = Math.floor(cur/5);
        let mx = buildingData[indx].collectionTime / 5;
        return "[" + collectBar2.repeat(cur) + collectBar0.repeat(mx-cur) + "]";
    }else{
        return "[" + collectBar1.repeat(cur) + collectBar0.repeat(buildingData[indx].collectionTime-cur) + "]";
    }
    // return ` ${thyme.level}`;
}

//! Artifacts
var artArt, templeJ = false;

//! Spells

//! Lumps
const lumpTickChance = 5000;
const buip = 1.02;
const buiexp = 0.05;

//! Primary Vairables
var COOKIE, HEAVENLY_CHIP, SUGAR_LUMP;
var thyme, normalUpgradeMenu, permUpgradeMenu;

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
        costModel: new ConstantCost(2.5e57),
        maxLevel: 1,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 9,
        name: "Blessing of the Capital",
        info: "Your investment returns increase, stonks",
        costModel: new ExponentialCost(1e60, ML2(8)),
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
        costModel: new ExponentialCost(1e80, ML2(10)),
        maxLevel: 3,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 12,
        name: "Continuos Growth",
        info: "Certain high-tier buildings get more powerful the more of them you have",
        costModel: new ExponentialCost(1e103, ML2(1e5)),
        maxLevel: 5,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 13,
        name: "Spell Cast Layering",
        info: "Allows multiples of the same spell to be casted, and slightly empowers every spell",
        costModel: new ExponentialCost(1e105, ML2(1e5)),
        maxLevel: 3,
        onBought: (amount) => {updateGlobalMult();}
    },{
        uid: 14,
        name: "Empowerments of Buildings",
        info: "Increases how fast $P$ grows",
        costModel: new ExponentialCost(5e116, ML2(10 ^ 1.35)),
        maxLevel: 9,
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
         unlock: () => (((COOKIE.value).abs() >= BF(1e250)) && (kitty.level == 0) && (cookieTasty.level == 0) && (terra.level == 0) && (ygg.level == 0) && (art.level == 0) && (artArt.level == 0) && (invest.level == 0) && (recom.level == 0) && (covenant.level == 0)),},
        {order: 17, name: "nice", desc: "Get 6.9 heavenly chips in any order of magnitude (decimals accepted)", weight: 2, secretClue : "nice",
         unlock: () => {
            let temp = TS10(HEAVENLY_CHIP.value);
            return (temp[0] == '6') && ((temp[2] == '9') || temp[1] == '9');
        },},
        {order: 18, name: "you won the internet", desc: "Have Temple+Alchemy Lab = 1337", weight: 2, secretClue : "[ni] + [ce] = leet",
         unlock: () => ((building[6].level > 0) && (building[9].level > 0) && (building[6].level + building[9].level) == 0x539),},
        {order: 19, name: "Sigma Fingers", desc: "Collect 1e100 Cookies from Cursors with only a single cursor\nThis feat also unlocks a special building display mode, find it out :)", weight: 2, secretClue : "Doing a 100 with only a single 0",
         unlock: () => (generateCookie(0,5,kittyPowerFull(kitty.level)) >= BF(1e100)) && (building[0].level == 1),},
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
    ];
}
function buildFeatAch(featAchObj){
    if(featAchObj.secretClue != ""){
        return theory.createSecretAchievement(800 + featAchObj.order,featAchievement1,featAchObj.name,`[${featAchObj.weight}] - ${featAchObj.desc}`,featAchObj.secretClue,() => checkAchBase(featAchObj.unlock,featAchObj.weight));
    }else{
        return theory.createAchievement(800 + featAchObj.order,featAchievement1,featAchObj.name,`[${featAchObj.weight}] - ${featAchObj.desc}`,() => checkAchBase(featAchObj.unlock,featAchObj.weight));
    }
}

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
    if(lv>0){log(`5) Divine Doulbing Lv.${lv} = ${BigNumber.TWO.pow(lv)}x`);ret*=BigNumber.TWO.pow(lv);}
    lv = getUpgradeLvFromCookie(R9Box,hc);lv = Math.min(lv,R9Box.maxLevel);
    if(lv>0){log(`R9 Box Lv.${lv} = ${(BigP(game.sigmaTotal, lv * R9BoxMult))}x`);ret*=(BigP(game.sigmaTotal, lv * R9BoxMult));}
    lv = getUpgradeLvFromCookie(ChronosAge,hc);lv = Math.min(lv,ChronosAge.maxLevel);
    if(lv>0){log(`Chronos Lv.${lv} = ${(BF(1) + BF(thyme.level).pow(chronosPow))}x`);ret*=(BF(1) + BF(thyme.level).pow(chronosPow));}
    lv = getUpgradeLvFromCookie(TwinGates,hc);lv = Math.min(lv,TwinGates.maxLevel);
    if(lv>0){log(`Twin Gates Lv.${lv} = ${hc.pow(twinGateExp * TwinGates.level)}x`);ret*=hc.pow(twinGateExp * TwinGates.level);}
    //part 6 : logistic
    lv = getUpgradeLvFromCookie(terra,cookie);lv = Math.min(lv,terra.maxLevel);
    var lv2 = getUpgradeLvFromCookie(TerraInf,hc), lv3 = getUpgradeLvFromCookie(building[3],cookie);lv2 = Math.min(lv2,TerraInf.maxLevel);
    if(lv > 0){
        var maxL = (BF(lv).pow(maxLPowBase + maxLPowMod * (lv2 )) * 1500);
        maxL += BF(lv3).pow(maxLBPowBase + maxLBPowMod * lv2);
        maxL = maxL.pow(1 + terraInfPow * lv2);
        log(`6) Terra Lv.${lv}, B3=${lv3}, Tf Lv.${lv2} = ${maxL}x`);
        ret *= maxL;
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
            str += `${stateTable.table[(i*16) + j]} `;
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
            log(`B[${i}] = ${buildingData[i].mult}x = ${generateCookie(i,buildingData[i].collectionTime,1)}`);
        }
    }
}

//? 7. Refreshes CPS
function CPSrefresh(){
    CPS = BF(0);
    for(let i=0;i<19;i++){
        let res = generateCookie(i,buildingData[i].collectionTime,1);
        if(res > CPS){res = CPS;}
    }
    log(`New CPS = ${CPS}`);
    CPSstore.setValue(CPS);
}

//!==INIT==
var init = () => {
    COOKIE = theory.createCurrency("C", "C");
    HEAVENLY_CHIP = theory.createCurrency("H", "H");
    SUGAR_LUMP = theory.createCurrency("L", "L");
    // Shush
    {
        thyme = theory.createUpgrade(1e9, COOKIE, new ConstantCost(BF("1e1000")));
        thyme.isAvailable = false;
        thyme.maxLevel = 1262304000;// 1461 Days
        thyme.getDescription = () => "Time (time)";
        thyme.getInfo = () => "how the fuck did you managed to see it";
    }
    {
        normalUpgradeMenu = shortUpgrade(1e9 + 1,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of normal upgrades");
        normalUpgradeMenu.getDescription = () => `Current Menu : ${((normalUpgradeMenu.level % 2) == 0)?"Buildings":"Cookies and Milk"}`;
        normalUpgradeMenu.bought = (amount) => {
            log("b");
            if (normalUpgradeMenu.level > 1){
                normalUpgradeMenu.level = 0;
            }
            updateAvailability();
        }
        permUpgradeMenu = shortPermaUpgrade(1e9 + 2,COOKIE,new FreeCost(),`Current Menu : `,"Changes between pages of permanent upgrades");
        permUpgradeMenu.getDescription = () => `Current Menu : ${((permUpgradeMenu.level % 2) == 0)?"Building Power":"Heavenly Upgrades"}`;
        permUpgradeMenu.bought = (amount) => {
            if (permUpgradeMenu.level > 1){
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
        buildingLumpMult = 1.1;
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
            if(clickPower.level > (clickPowerMaterials.length * clickPowerMaterialTier.length * clickPowerMaterialTierLevel)){
                return `${clickPowerDefault} Mouse Tier ${clickPower.level - (clickPowerMaterials.length * clickPowerMaterialTier.length * clickPowerMaterialTierLevel)}`
            }else{
                return `${clickPowerMaterialTier[Math.floor((clickPower.level % (clickPowerMaterialTier.length * clickPowerMaterialTierLevel))/clickPowerMaterialTierLevel)]} ${clickPowerMaterials[Math.floor(clickPower.level / (clickPowerMaterialTier.length * clickPowerMaterialTierLevel))]} Mouse Tier ${(clickPower.level % clickPowerMaterialTierLevel) + 1}`;
            }
        };
        clickPower.getInfo = () => "Cursors gain 1% more of your highest cookie collected from a building, compounds with L[0] $(P_{cp})$";
    }
    //Heavenly Upgrades
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
        milkOil = shortPermaUpgradeObj(heavenlyUpgradeData[15],HEAVENLY_CHIP);
    }

    ///////////////////
    // Regular Upgrades
    // Throwaway
    {
        artArt = throwawayUpgrade(1e9 + 3,"Artifacts","how did you managed to see this");
        moreExcavator = throwawayUpgrade(1e9 + 4,"Artifacts","how did you managed to see this");
        art = throwawayUpgrade(1e9 + 5,"Artifacts","how did you managed to see this");
        cookiearium = throwawayUpgrade(1e9 + 6,"Artifacts","how did you managed to see this");
        aquaCrust = throwawayUpgrade(1e9 + 7,"Artifacts","how did you managed to see this");
        timeDilate = throwawayUpgrade(1e9 + 8,"Artifacts","how did you managed to see this");
        accelerator = throwawayUpgrade(1e9 + 9,"Artifacts","how did you managed to see this");
        acceleratorMenu = throwawayUpgrade(1e9 + 10,"Artifacts","how did you managed to see this");
        synergy = throwawayUpgrade(1e9 + 11,"Artifacts","how did you managed to see this");
        jetDrive = throwawayUpgrade(1e9 + 12,"Artifacts","how did you managed to see this");
        sugarCoat = throwawayUpgrade(1e9 + 13,"Artifacts","how did you managed to see this");
        crystalHoney = throwawayUpgrade(1e9 + 14,"Artifacts","how did you managed to see this");
    }
    // Tasty Cookies
    {
        cookieTasty = theory.createUpgrade(0, COOKIE, new ExponentialCost(cookieTastyCostBase, cookieTastyCostMod));
        cookieTasty.getDescription = (_) => {
            if (bInfo == 1) {
                return `\$ C_{1}(${cookieTasty.level + (crystalHoney.level * 10)}) = ${getCookieTP(cookieTasty.level)}, \\: CP(${cookieTasty.level})${superC.level > 0 ? "^{1.05}" : ""}=${getCookieP(cookieTasty.level)}\$`;
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
    // All 19 Buildings
    for (let i = 0; i < 19; i++) {
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
        building[i].getInfo = (amount) => getBuildingInfo(i,amount);
        building[i].bought = (amount) => onBuildingBought(i,amount);
        //gimmick
        switch(i){
            case 1:covenant = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 2:ygg = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 3:terra = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 4:recom = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
            case 5:invest = gimmickUpgrade(buildingData[i].gimmicks[0]);break;
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
            lumpAch[i] = theory.createAchievement(200 + i, lumpAchCat, lumpAchName[i], lumpDesc(lumpAchReq[i]), () => checkAchL(lumpAchReq[i]));
            achCountTV += 1;
        }
        // A lot of buildings, 3xx = 100, 4xx = 1000, 5xx = 5000, 6xx = 10000, 7xx = 100 lump
        BuildingAchievement = theory.createAchievementCategory(3, "Buildings");
        for (let i = 0; i < 19; i++) {
            // too lazy to add proper pluralization sorry not sorry
            buiAch1[i] = theory.createAchievement(300 + i, BuildingAchievement, buildingData[i].achName[0], `Have 100 ${buildingData[i].names[0]}s`, () => checkAchB(i, 100));
            buiAch2[i] = theory.createAchievement(400 + i, BuildingAchievement, buildingData[i].achName[1], `Have 1,000 ${buildingData[i].names[0]}s`, () => checkAchB(i, 1000));
            buiAch3[i] = theory.createSecretAchievement(500 + i, BuildingAchievement, buildingData[i].achName[2], `Have 5,000 ${buildingData[i].names[0]}s`, `${buildingData[i].names[0]} by 5000`, () => checkAchB(i, 5000));
            if (i < 15) {
                buiAch4[i] = theory.createSecretAchievement(600 + i, BuildingAchievement, buildingData[i].achName[3], `Have 10,000 ${buildingData[i].names[0]}s`, `${buildingData[i].names[0]} by 10000`, () => checkAchB(i, 10000));
                achCountTV += 1;
            }
            buiLumpAch[i] = theory.createAchievement(700 + i, BuildingAchievement, buildingData[i].achName[4], `Upgrade ${buildingData[i].names[0]} to level 100`, () => checkAchBP(i, 100));
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
    sigmaCurseof = featAch1[18];
    ///////////////////
    //// Story chapters
    for (let i = 0; i < 16; i++) {
        chapter[i] = theory.createStoryChapter(i, chapterName[i], chapterLore[i], () => checkChapter(i));
    }
    quartList2[0] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{C_m}`, null));
    quartList2[1] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{t}`, null));
    quartList2[2] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T}`, null));
    quartList2[3] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_m}`, null));
    quartList2[4] = (new QuaternaryEntry(`\\color{#${eqColor[eqC]}}{T_d}`, null));
    updateAvailability();
};

//!Availability
var updateAvailability = () => {
    // Buildings
    for (let i = 0; i < 19; i++) {
        if (i >= 3) {building[i].isAvailable = (COOKIE.value >= buildingData[i - 1].baseCost) || (building[i].level > 0);}
        else {building[i].isAvailable = true;}
        building[i].isAvailable &= (normalUpgradeMenu.level % 2) == 0;
        buildingPower[i].isAvailable = building[i].level > 0 && (permUpgradeMenu.level % 2) == 0;
        buildingLump[i].isAvailable = building[i].level > 10 && (permUpgradeMenu.level % 2) == 0;
    }
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
    milkOil.isAvailable = HEAVENLY_CHIP.value > BF(1e130) && (permUpgradeMenu.level % 2) == 1;
    // Gimmick
    covenant.isAvailable = COOKIE.value >= BF(1e60) && (normalUpgradeMenu.level % 2) == 0;
    ygg.isAvailable = COOKIE.value >= BF(1e100) && (normalUpgradeMenu.level % 2) == 0;
    terra.isAvailable = COOKIE.value >= BF(1e125) && (normalUpgradeMenu.level % 2) == 0;
    recom.isAvailable = COOKIE.value >= BF(1e155) && (normalUpgradeMenu.level % 2) == 0;
    invest.isAvailable = COOKIE.value >= BF(1e180) && (normalUpgradeMenu.level % 2) == 0;
};

//!Tick
var terraBoost = BF(1), dilateBoost = BF(1), setupTick = true;
var thymeInc = () => {
    //thyme = ticks elapsed
    thyme.level += (thyme.level < thyme.maxLevel) ? 1 : 0;
}
var thymeInc = (ticks) => {
    //thyme = ticks elapsed
    thyme.level += (thyme.level < thyme.maxLevel) ? ticks : 0;
}
var generateCookie = (id, ticks, mult) => {
    let ret = calcBuilding(id,0) * globalMult * buildingData[id].mult * buildingData[id].baseCPS * (ticks / 10) * mult;
    let pow = getBuildingExp(id);
    if(Number.isNaN(pow)){
        pow = 1;
        buildingExponentLv[id] = 0;
    }
    //log(`generating for ${id}, base = ${ret}, pow = ${pow}`);
    //cursor power
    if(!setupTick && buildingExponentLv[id] != 0){ret = BigP(ret,pow);}
    if(ret > CPS){
        CPS = ret;
        dominate = id;dominatestore.setValue(dominate);
        CPSstore.setValue(ret);
    }
    if(id == 0 && clickPower.level > 0){
        ret += Math.max(CPS,BF(1)) * (((BF(clickPower.level) * BigP(buildingLumpMult, buildingLump[0].level)) * BF(baseClickPower)));
        //failsafe, only really triggers if values get ABSURDLY BIG
        if(ret > (COOKIE.value*BF(1e100)) && COOKIE.value > BF(1e25)){
            ret -= Math.max(CPS,BF(1)) * (((BF(clickPower.level) * BigP(buildingLumpMult, buildingLump[0].level)) * BF(baseClickPower)));
            ret += COOKIE.value/BF(500);
        }else if(ret > (COOKIE.value*BF(1e100)) && COOKIE.value <= BF(1e25)){
            ret = 1000;//get a grandma and GO
        }
    }
    //log(`${id} generated ${ret}`);
    //log(`get ${ret}`);
    return ret;
}
var refreshLocalMult = () => {
    for(let i=0;i<19;i++){
        updateLocalMult(i);
        if(buildingData[i].mult == BF(0)){
            log(`B${i} gives 0`);
            buildingData[i].mult = BF(1);
        }
    }
}
var tick = (elapsedTime,multiplier) => {
    //log(`ET : ${elapsedTime}, M : ${multiplier}`);
    //log(`B : ${buildingLumpMult}`);
    if(setupTick){
        log("setup tick");
        for(let i=0;i<19;i++){
            updateLocalMult(i);
            buildingCount += building[i].level;
        }
        updateBuildingLumpMaxLv();
        updateGlobalMult();
        setupTick = false;
    }
    terraBoost = Logistic();
    dilateBoost = Dilate();
    let dt =elapsedTime * multiplier * 10;//we'll see about this later
    thymeInc(Math.round(dt * dilateBoost));
    theory.invalidateSecondaryEquation();
    //let theoryBonus = theory.publicationMultiplier;
    //cookie
    if(thyme.level % 5 == 0){
        updateAvailability();
        for(let i=0;i<19;i++){
            if(dilateBoost >= buildingData[i].collectionTime){
                COOKIE.value += generateCookie(i,dilateBoost,1);
            }else if(building[i].level > 0 && thyme.level % buildingData[i].collectionTime == 0){
                //log(`${i} due!`);
                COOKIE.value += generateCookie(i,buildingData[i].collectionTime,1);
            }
        }
    }
    if(thyme.level % 10 == 0){
        refreshLocalMult();
    }
    //lumps
    let dLump = BF(0) + (sugarCoat.level * 2.5) + ((recom.level + ((artArt.level > 7) ? 10 : 0)) * 0.01);
    if (Math.random() <= 1 / (lumpTickChance / Math.log10(COOKIE.value))) {
        dLump += BF(1);
    }
    if(dLump > BF(0)){
        SUGAR_LUMP.value += dLump;
        lumpTotal.setValue(lumpTotal.value + dLump);
    }
    //heavenly chips
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
                `\\color{#${eqColor[col]}}{B(2) \\leftarrow B(2)(\\sum_{i=0}^{18}{B[i]})^{${covDelta}${cp}^{${covLvMod}} + ${covExp}}}`
            );
        case 5:// Ygg + Chronos
            // theory.secondaryEquationScale = 0.925;
            let ys = " Y_{g}";
            return `\\color{#${eqColor[col]}}{B(2) \\leftarrow 5(10^{10})B(2)P_{2}^{${yggPowBase} + ${yggPowLv}${ys}}\\\\(B[6]+B[2])^{${yggBPowBase} + ${yggBPowMod}${ys}^{${yggBPowLv}}}(1+t)^{${yggThymePow}}${(ChronosAge.level > 0) ? `\\\\ B(i) \\leftarrow B(i)(1+t^{${chronosPow}}), \\quad i \\neq 2` : ``}}`;
        case 6:// Terra
            let tr = " T_{r}";
            let tf = " T_{\\infty}";
            let tm = " T_{m}";
            return `\\color{#${eqColor[col]}}{${tm} = 1500${(moreExcavator.level > 0) ? "E_{f}^{1.5}" : ""}${tr}^{2.5+0.05${tf}}\\\\T = 1+${tm}^{0.2+0.1${tf}} + \\frac{${tm}^{1+0.005${tf}}}{1+e^{t-(X_{b}+600${tr})}}}`;
        case 7:// Recom
            let rc = " R_{c}";
            return `\\color{#${eqColor[col]}}{\\dot{H} = H^{0.9}(${rc})\\\\ \\dot{L} = 0.01${rc}\\\\ B(4) \\leftarrow B(4)10^{54}${recomPowBase}^{${rc}-1}}`;
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
    // for (let i = 0; i < 9; i++) {
    //     quartList[i].value = (excavate.level >= (i + 1) || ((i == 8) && (artArt.level > 13)) || elements[i].value > 0) ? elements[i].value : null;
    // }
    quartList2[0].value = CPS;
    quartList2[1].value = thyme.level / 10;
    quartList2[2].value = (terra.level > 0) ? Logistic() : null;
    quartList2[3].value = (terra.level > 0) ? ((BF(terra.level).pow(2.4 + 0.05 * (TerraInf.level + ((artArt.level > 6) ? 1 : 0))) * 1500) + BF(building[3].level).pow(1.2 + 0.03 * TerraInf.level) * ((moreExcavator.level > 0) ? BigP((1 + (0.2 * BigP(moreExcavator.level, 1.4))), 1.5) : 1)) : null;
    quartList2[4].value = (timeDilate.level > 0) ? Dilate() : null;
    // if (quType.value == 0) {
    //     return quartList2;
    // } else {
    //     return quartList;
    // }
    return quartList2;
};


//!==OTHER THEORY BACKBONE==
var elemBefore = new Array(9);
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
var getPublicationMultiplier = (tau) => tau.pow(1.078);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{1.078}";
var postPublish = () => {
    SUGAR_LUMP.value = lumpbf;
    HEAVENLY_CHIP.value = hbf;
    CPS = BigNumber.ZERO;
    buildingCount = 0;
    getEquationOverlay();
    updateAvailability();
    updateGlobalMult();
    for(let i=0;i<19;i++){
        updateLocalMult(i);
    }
    // for (let i = 0; i < elements.length; i++) {
    //     elements[i].value = elemBefore[i];
    // }
};
var prePublish = () => {
    lumpbf = SUGAR_LUMP.value;
    hbf = HEAVENLY_CHIP.value;
    hbf += (COOKIE.value / BF("1e12")).pow(1 / 3);
    //isSpellShown = 0;
    CPS = BF(0);CPSstore.setValue(CPS);
    // for (let i = 0; i < elements.length; i++) {
    //     elemBefore[i] = elements[i].value;
    // }
};
var getTau = () => (COOKIE.value.abs()).pow(0.2);
var getCurrencyFromTau = (tau) => [tau.max(BigNumber.ONE).pow(5), COOKIE.symbol];


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
    if (cookieTasty.level > 0) {
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
    if (false) {
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
    if (false) {
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
    if (false) {
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
        if ((artArt.level > 12) || (elements[0].value > 0)) {
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
const eqColorAch = [0, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 80, 85, 90, 100, 110, 120, 130, 140, 150, 160, 170, 194];
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
let maxbuiPerk = (indx) => buildingData[indx].maxExpLevel;
let perkLabel2 = ui.createLatexLabel({
    text: `You have ${perkHas} exponentium bars`,
    fontSize: 14,
    // padding: new Thickness(1🍪,10,10,10),
    horizontalTextAlignment: TextAlignment.CENTER
});
let perkForgeButton = ui.createButton({
    text: `Forge another one (${calcCookieToPerk(perkPoint.value)} C)`,
    onClicked: () => {
        if (calcCookieToPerk(perkPoint.value) <= COOKIE.value) {
            COOKIE.value -= calcCookieToPerk(perkPoint.value);
            perkPoint.setValue(perkPoint.value+1);
            perkHas++;
            perkForgeButton.text = `Forge another one (${calcCookieToPerk(perkPoint.value)} C)`;
            perkLabel2.text = `You have ${perkHas} exponentium bars`;
        }
    }
});
let perkAssign = (indx) => ui.createGrid({
    columnDefinitions: ["65*", "15*", "10*", "10*"],
    children: [
        ui.createLatexLabel({
            text: `B[${indx}] - ${buildingData[indx].names[0]}`, row: 0, column: 0,
            horizontalTextAlignment: TextAlignment.START,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text: `${buildingExponentLv[indx]} / ${(maxbuiPerk(indx))}`, row: 0, column: 1,
            horizontalTextAlignment: TextAlignment.CENTER,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createButton({
            text: `+`, row: 0, column: 2,
            onClicked: () => {
                if (perkHas > 0 && (buildingExponentLv[indx] < maxbuiPerk(indx))) {
                    perkHas--;
                    buildingExponentLv[indx]+=1;
                    buildingExponentLvStore[indx].setValue(buildingExponentLv[indx]);
                    perkLabel2.text = `You have ${perkHas} exponentium bars`;
                    perkMenu.content.children[3].children[0].children[indx].children[1].text = `${buildingExponentLv[indx]} / ${maxbuiPerk(indx)}`;
                }
            }
        }),
        ui.createButton({
            text: `-`, row: 0, column: 3,
            onClicked: () => {
                if (buildingExponentLv[indx] > 0) {
                    perkHas++;
                    buildingExponentLv[indx]-=1;
                    buildingExponentLvStore[indx].setValue(buildingExponentLv[indx]);
                    perkLabel2.text = `You have ${perkHas} exponentium bars`;
                    perkMenu.content.children[3].children[0].children[indx].children[1].text = `${buildingExponentLv[indx]} / ${maxbuiPerk(indx)}`;
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
                            perkForgeButton.text = `Forge another one (${calcCookieToPerk(perkPoint.value)} C)`;
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