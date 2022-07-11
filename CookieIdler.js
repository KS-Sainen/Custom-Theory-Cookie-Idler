import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
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
//Hello to the person reading this "code"
//Spoilers alert for ALL of the upgrades, buildings and achievements
//Before leaving, please try and find any bugs or bad JS coding practices for me

//Some parameters
//If you're wondering why the refund button doesn't appear, please refer to line 646 and you would know something's up

var id = "CookieIdler";
var name = "Cookie Idler";
var description = "🍪👵🍪\nA game within a theory involving baking a copius amounts of cookies in exchange for something far greater...\n🍪👵🍪\n\n🍪==FEATURES==🍪\n🍪 Click, Bake, Farm, Produce your way into the big leagues. With 19 buildings to buy, empower, and upgrade.\n🍪 Experience a whole new level of text richness in theories like never before. Boatloads of text waiting to be read in all aspects, from the buildings, achievements, all the way to upgrades(nerdy mode included).\n🍪 Unique upgrades and intresting game mechanics will involve you to no end! Tasty Cookies, even tastier cookies, breaking the fourth wall, and changing the game itself.\n🍪Absolute lack of big and scary mathematics, rated E for Everyone\n\n🍪==CREDITS==🍪\n🍪 Orteil for bringing such a legendary game idea to life\n🍪 ellipsis for suggesting ideas for the UI\n🍪 skyhigh173 for reformatting the code so it looks better\nspqcey(randomname#9373) for proofreading and fixing a majority of the text\n\n⚠WARNING⚠ : In ALL Circumstances, DO NOT attempt to purchase level 4 of the cookie tin upgrade, doing so may crash your game INSTANTLY(hang in there until you can afford level 5)";
var authors = "Sainen Lv.420 #2684";

/*
Big thinks to these people!
ellipsis
sky
spqcey

feel free to add more into the list.
*/
var version = 1.3;

//Function Name Reductions
/**
 * Returns the BigNumber equivalent of any of the following arguments. Functionally IDENTICAL to BigNumber.from()
 * @param {number|string|BigNumber} i
 * @return {BigNumber} The BigNumber from the given input i
 */
let BF = (i) => BigNumber.from(i);

/**
 * Returns the value of i^p, identical to to Math.pow(i,p)
 * @param {number} i The base
 * @param {number} p The exponent
 * @return {number} The value of i^p
*/
let MP = (i,p) => Math.pow(i,p);

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
let BigP = (i,p) => BF(i).pow(p);

/**
 * Gives the equivalent cookies compared to i minutes of your CPS
 * @param {number|string|BigNumber} i The number used
 * @return {BigNumber} The value of log10(i)
 */
let BigL10 = (i) => BF(i).log10();

/**
 * Identical to Math.log(i) but for big numbers; also automatically converts any valid BigNumber inputted
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
let RandI = (i) => Math.floor(MR()*i);

/**
 * Returns a random number in the range of [s,e] where s >= e
 * @param {number} s The maximum number
 * @param {number} e The minimum number
 * @return {number} A random number in the range of [s,e]
 */
let RandR = (s,e) => e+(MR()*(s-e));



//Prize Functions
let prize=0;
/**
 * @desc Gives the equivalent cookies compared to i minutes of your CPS
 * @param {number} i
 */
let minCookie = (i) => {
    cookie.value += BF(60) * CPS * BF(i) * Logistic();
}

/**
 * @desc Gives the equivalent heavenly chips if you pubbed at this moment
 * @param {number} i 
 */
let pubH = (i) => {
    if(cookie.value <= 0)return;
    hc.value += BF(i) * (cookie.value / BF("1e12")).pow(1 / 3);
}

/**
 * @desc Gives the equivalent amount of lumps for i ticks
 * @param {number} i 
 */
let tickLump = (i) => {
    let dL = (BF(i)*LPS) + (1 / (lumpc / BigL10(BF(10)+cookie.value)))*BF(i);
    lump.value += dL;
    lumpTotal += dL;
}

/**
 * @desc Binary searches through an array arr to the desired number f
 * @param {array} arr, must be sorted from maximum to minimum
 * @param {number} f, value to search for
 * @returns {number} the index where the next element is less than, -1 if it's beyond the end of the array
 */
let bsearch = (arr,f) => {
    let l=0;
    let r=arr.length;
    let mid = 0;
    let ret = -1;
    while(l<r){
        mid=(l+r)/2;
        if(arr[mid] > f){
            l=mid+1;
        }else if(arr[mid] <= f){
            ret=mid;
            r=mid-1;
        }
    }
    return ret;
}

//States (And thus begins the spoilers)
/**
 * @desc Serializes the state of the theory
 * @returns {string} The internal state of the array, compatible with setInternalState()
 */
var getInternalState = () => {
    let st = `${achCount} ${vizType} ${lumpTotal} ${eqType} ${artUnlock} ${BigTS(CPS)} ${BigTS(HPS)} `;
    for(let i=0;i<8;i++){
        st += `${spellCast[i]} `;
    }
    st += `${heavVis} ${bInfo} ${perkPoint} `;
    for(let i=0;i<19;i++){
        st += `${buiPerk[i]} `
    }
    st += `${eqC} `;
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
        seqButton.text = `Secondary Equation\n${eqName[eqType]}`;
    }
    if (res.length > 4) {
        artUnlock = parseInt(res[4]);
    }
    if (res.length > 5){
        CPS = BF(res[5]);
    }
    if (res.length > 6){
        HPS = BF(res[6]);
    }
    for(let i=0;i<8;i++){
        if(res.length > (7+i)){
            spellCast[i] = parseInt(res[7+i]);
        }
    }
    if(res.length > 15){
        heavVis = parseInt(res[15]);
    }
    if(res.length > 16){
        bInfo = parseInt(res[16]);
        biButton.text = `Building Display\n${binfoname[bInfo]}`;
    }
    if(res.length > 17){
        perkPoint = parseInt(res[17]);
    }
    if(Number.isNaN(perkPoint)){
        perkPoint=0;
    }
    perkHas = perkPoint;
    for(let i=0;i<19;i++){
        if(res.length > (18+i)){
            buiPerk[i] = parseInt(res[18+i]);
            perkHas -= buiPerk[i];
        }else{
            buiPerk[i]=0;
        }
        perkMenu.content.children[3].children[0].children[i].children[1].text = `${buiPerk[i]} / ${maxbuiPerk(i)}`;
    }
    if(res.length > 37){
        eqC = parseInt(res[37]);
    }else{
        eqC = 0;
    }
    colorButton.text = `Equation Color\n${eqColorName[eqC]}`;
};
//Initializes the variables for the serialized string(the scope is global)
let CPS = BigNumber.ZERO,
    HPS = BigNumber.ZERO,
    LPS = BigNumber.ZERO;
let achCount = 0;
let vizType = 0;
let lumpTotal = 0;
let eqType = 0;
let artUnlock = 0;
let time = 0; //degrees
let spellCast = [0,0,0,0,0,0,0,0];
let heavVis = 0;
let bInfo = 0;
let buiPerk = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let maxbuiPerk = (indx) => (indx==2)?3:5;
let perkPoint = 0;
let perkHas = 0;
let eqC = 0;

//End States

//Profiling things for performance and optimizations
var profiler1 = profilers.get("profiler1");

//Dealing with perks
let calcCookieToPerk = (level) => {
    if(Number.isNaN(level)){
        return calcCookieToPerk(0);
    }
    return BigP(10,7.5*(level+1));
}

//UtilVariables
let arrcps = new Array(21);
//let cpsqs = new Array (19); COMING SOON
const lumpc = 500;
const buipb = 1.1;
var buip;
let getbuip = () => buipb+(0.01*superL.level);
const buiexp = 0.05;
const bcp = 0.01;
//Primary Vairables
var cookie, hc, lump, milk;
//Buildings
let building = new Array(21);
//Buildings Attributes
let buildingName = [
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
    11,
    1e3,
    1.1e5,
    1.2e8,
    1.3e12,
    1.4e18,
    2e25,
    3.3e50,
    5.1e75,
    7.5e100,
    1e125,
    1.4e150,
    BF("1.7e180"),
    BF("2.1e215"),
    BF("2.6e300"),
    BF("3.1e351"),//15
    BF("7.1e1400"),//BREAK
    BF("1.2e1450"),
    BF("1.9e1500"),
];
//Ideally, 1/100 base
let bcps = [
    7,//0
    310,//1
    5.3e4,//2
    7.4e7,//3
    4.05e10,//4
    1.4e12,//5
    1.6e18,//6
    4.4e28,//7
    1.58e38,//8
    5.6e49,//9
    6.66e58,//10
    6.5e72,//11
    9.15e79,//12
    BF("4.9e96"),//13
    BF("2.1e123"),//14
    BF("2.2e150"),//15
    BF("1.1e170"),//16
    BF("8.3e183"),//17
    BF("6.4e188"),//18
];
//Types of Cookies
var cookieT;
const basect = 2.2e6;
const ctr = ML2(2700);
/**
 * Calculates the total boost from the different types of cookies you have
 * @param {BigNumber} level, The amount of cookie upgrade level you have from the cookieT.level
 * @returns {BigNumber} The total amount of cookie boost you have
 */
var getCookieTP = (level) => {
    let res = BF(1);
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
var getCookieP = (level) => {
    //let bn = (num) => BF(num);
    let res = getCookieTP(level);
    for (let i = 0; i < cookieTinName.length; i++) {
        res *= BigP(cookietP[i],cookiet[i].level);
    }
    if (CookieS.level != 0) res *= (BigNumber.TWO + lump.value).log2().pow(1.5);
    if (CookieH.level != 0) res *= (BigNumber.TEN + hc.value).log10().pow(1.25);
    if (CookieC.level != 0 && (cookie.value > BigNumber.ZERO)) res *= (BigNumber.TEN + cookie.value).log10().pow(0.9);
    if (DivineD.level != 0) res *= BigNumber.TWO.pow(DivineD.level);
    res *= BigP(1.01,invest.level);
    if (superC.level > 0){
        res = BigP(res,1.05);
    }
    return res;
};
//An array of strings containing every single cookies types for use in displaying the name
let cookieType = ["Plain Cookie","Chocolate Chip Cookie","Sugar Cookie","Oatmeal Raisin Cookie","Peanut Butter Cookie","Coconut Cookie","Almond Cookie","Hazelnut Cookie","Walnut Cookie","Cashew Cookie","White Chocolate Cookie","Milk Chocolate Cookie","Macadamia Cookie","Double Chip Cookie","White Chocolate Macadamia Cookie","All-Chocolate Cookie","Dark-Chocolated Coated Cookie","White-Chocolate Coated Cookie","Eclipse Cookie","Zebra Cookie","Snickerdoodle","Stroopwafel","Macaroon","Madeleine","Palmier","Palets","Sables","Pure Black Chocolate Cookie","Pure White Chocolate Cookie","Ladyfingers","Tullies","Checker Cookie","Butter Cookie","Vanilla Cream Cookie","Gingersnap","Cinnamon Cookie","Vanity Cookie","Pinwheel Cookie","Shortbread Biscuits","Millionare\'s Shortbread","Caramel Cookie","Pecan Sandies","Moravian Spice Cookie","Anzac Biscuit","Whole Grain Cookie","Candy Cookie","Big Chipped Cookie","Spinkled Cookie","Anti-Idle Cookie","Florentine","Chocolate Crinkles","Zero-Idle Cookie","Maple Cookie","Persian Rice Cookie","Norwegian Cookie","Crispy Rice Cookie","Ube Cookie","Butterscotch Cookie","Speculaas","Chocolate Oatmeal Cookie","Molasses Cookie","Biscotti","Waffle Cookie","Custard Cream Cookie","Bourbon Biscuits","Mini-Cookie","Whoopie Pies","Caramel Wafer Biscuits","Chocolate Chip Mocha Cookie","Earl Grey Cookie","Chai Tea Cookie","Myanmar Tea Cookie","Thai Tea Cookie","Corn Syrup Cookie","Icebox Cookie","Graham Cracker","Hardtack","Tofu Cookie","Gluten-Free Cookie","Lebkuchen","Aachener Printen","Canistrelli","Petit Beurre","Nanaimo Bars","Berger Cookie","Chinsuko","Putri Salju","Milk Cookie","Kruidnoten","Marie Biscuits","Meringue Cookie","Yogurt Cookie","Thumbprint","Pizzelle","Granola Cookie","Ricotta Cookie","Roze Koeken","Peanut Butter Cup Cookie","Sesame Cookie","Vanillekipferl","Battenberg Biscuits","Rosette Cookie","Gangmakers","Welsh Cookie","Raspberry Cheesecake Cookies","Bokkenpootjes","Fat Rascals","Ischler Cookies","Matcha Cookie","Super Fusion Cookie","Spicy Cookie","Kolachy Cookie","Gomma Cookie","Coyotas","Frosted Sugar Cookie","Marshmallow Sandwich Cookie","Chocolate Chip Covered Chocolate Chip Cookie","Yakgwa","Super Idler Flavored Cookie"];
//The default value of the cookie flavor displayed
const defaultcookieType = "Exotic Undefined Cookies";
const cookieInf = "Increases overall CPS by making your cookie taste better.";

//GRANDMA - Covenant Upgrade (Shipment -> Alchemy Lab)
var covenant;
const covExp = 5.1;
const covDelta = 0.6;
//const covEq = `B_{2} *=  \\sum_{i=0 \\: i\\neq 1}^{18}{P_{2}}{C_{i}}^{ ${BF(covExp).toString(1)} + COV_{L}}`;

//FARM - Yggdrasil
var ygg;
const yggName = "Yggdrasil $(Y_{g})$";
const yggInfo = "Empower your farms with the power of time and cookie ancients";

//MINE - Terra
var terra;
const terraName = "Mass Terraforming $(T_{r})$";
const terraInfo =
    "Unlocks/Improves a buff that temporarily boosts your CPS by a lot";

    //FACTORY - Recombobulators
var recom;
const recomName = "Recombobulators $(R_{e})$";
const recomInfo = "Produces a constant stream of all currencies! What a dream!";

//BANK - Investment
var invest;
const investName = "Investment Openings $(I_{o})$";
const investInfo =
    "Open your very own investments forms. Grants 5 buildings of random type and a flat 1.01 CPS boost!(chance of failure included)";

    //TEMPLE - Archaeology
var art;
var artArt;
let artName = "Archaeology $(A_{r})$";
let artInfo = "Go into your own temples to discover some secrets lost to mankind";
let artArtName = [
    "Rhombus of Chocolatance",//Temple CPS goes up
    "Occam\'s Lazer",//Prism CPS goes up
    "All-Natural ouo sugar",//Cats become CPS
    "Doctor T\'s Thesis",//Cursor CPS
    "Bountiful box of Gilles-Philippe",//Grandma CPS
    "Key to the Conservatorium",//Farm CPS
    "Coreforge Bar",//Terra-Finity + Mine CPS
    "Da Vinci Manuscript",//Factory CPS
    "A very curious tulip bulb",//Bank CPS
    "Book of Symbolisms",//Chancemaker Unlock
    "Grimoire of Basic Cookie Magic",//Grimoire
    "More artifacts coming soon",
];
let artClue = [
    "One is One, Five is Two",//0-1
    "Achieved Enough?",//1-2
    "YEAH SCIENCE!!!!!!!!",//2-3
    "There\'s kings in cookies",//3-4
    "Explore more, duh",//4-5
    "A bit deeper",//5-6
    "Get those patents out, ya stingy",//6-7
    "Hoard, Hoard, Hoard more",//7-8
    "Am I lucky? enough?",//8-9
    "haha mana goes brrrrrr",//9-10
    "You have all artifacts, yay",
];
let artArtDesc = [
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
    "Finally, you get the wizard to cast actual spells instead of conjuring cookies. Despite the thickness, there\'s somehow only 3 spells",
    "The temple is currently empty and fully explored for artifacts, but not for long....",
];

//WIZARD TOWER - Grimoire
var isSpellShown = 0;
var mana;
var Spell = new Array (8);
var SpellView;
let spellName = [
    "Conjure Idled Goods",
    "Force the Hand of Cookies",
    "Prestidigus",
    "Terrona Terra",
    "Replenish Extradionaire",
    "Asseto Accio",
    "Mimi Mami",
    "Simply Sweetdelicious"
];
let spellDesc = [
    "You get more cookies, simple",
    "Something good or bad happens to you, find out what happens!",
    "Gives you HC equivalent to publishing now",
    "Makes the terraforming business suddenly go to the cookie moon",
    "Enriches your temple with a lot more loot",
    "Spawn buildings into existence, only works for a certain amounts",
    "Reduces the cooldown time of certain spells",
    "Spawn some sugar lumps in",
];
let effectCPSB=1;
let templeLuck = 1000;
let spellCost = [15,20,75,25,30,100,10,0];
//! SECONDS ONLY
let spellCool = [720,420,3600,600,420,900,660,1200];
let effectCPSBDur = 37;
let templeLuckDur = 30;
let logBoost = 1;
let logBoostDue = 0;

let updateSpellLayer = () => {
    for(let i=0;i<8;i++){
        Spell[i].maxLevel = 1 + SpellStack.level;
    }
};

let castSpell = (index) => {
    spellCast[index]=thyme.level;
    switch(index){
        case 0:
            var rand = RandI(100);
            if(rand <= 90){
                log("Cookies for you");
                rand = RandI(15+(2*SpellStack.level));
                minCookie(rand*30);
            }else{
                log("No Cookies for you");
            }
            break;
        case 1:
            var rand = RandI(200+(7*SpellStack.level));
            if(rand >= 200){
                log("Sweet");
                tickLump(100+(50*SpellStack.level));
            }else if(rand >= 100){
                log("Lucky");
                minCookie(17+(3.5*SpellStack.level));
            }else if(rand >= 60){
                log("Frenzy");
                effectCPSB=7+(0.5*SpellStack.level);
            }else if(rand >= 50){
                log("Clot");
                minCookie(-6 + (0.1*SpellStack.level));
            }else if(rand >= 40){
                log("Bleed");
                effectCPSB = 0.6 + (0.05*SpellStack.level);
            }else{
                log("Nothing Happened");
            }
            break;
        case 2:
            log("Get your chips");
            pubH(1+(0.05*SpellStack.level));
            break;
        case 3:
            log("That\'s to the moon");
            xBegin=time;
            logBoost=50 + (2.5*SpellStack.level);
            logBoostDue=terra.level * 30;
            break;
        case 4:
            log("HERE COMES THE LOOT");
            break;
        case 5:
            let rand = RandI(20);
            if(rand < 19){
                if((building[rand].level > 0) && (building[rand].cost <= (BF(1e9)*cookie.value))){
                    //log("Buildings For You!");
                    building[rand].level += RandI(10)+1+SpellStack.level;
                }
            }
            break;
        case 6:
            for(let i=0;i<Spell.length;i++){
                spellCast[i]-=600+(150*SpellStack.level);
            }
            log("It works!");
            break;
        case 7:
            log("Sweet Anyone?");
            if(RandI(100) > 5)tickLump(500+(25*SpellStack.level));
            break;
    }
};
//Visualizer
var viz;
const vizTypeM = 1;
const vizID = 99000;
const vizName = ["Classic", "Milk"];

//Upgrades
var clickp; //Click Power relative to CPS
let clickpname = "Tougher Mouse";
let buildingUpgrade = new Array(19);
let buildingPower = new Array(19);
let buildingP = new Array(19);
let buildingPMax = [
    150, 350, 250, 500, 500, 500, 500, 500, 500, 500, 450, 400,
    350, 350, 350, 350, 300, 250, 200,
];
let buildingUpgradeName = [
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
var kitty;
const kittyID = 69420; //ouo
let kittyName = [
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
let kittyDName = "Very Chawwtic Kitty";
let kittyExp = ML2(9750);
let kittyCost = 75000;
var kittyPower = (level) => {
    let ret = 1;
    if (level >= 50) {
        ret += (level - 49) * 0.5;
    }
    if (level >= 25) {
        ret += (level - 24) * 0.4;
    }
    if (level >= 10) {
        ret += (level - 9) * 0.3;
    }
    ret += level * 0.2;
    if(artArt.level > 2){
        ret=MP(ret,1.5+(achCount * 0.01));
    }
    return ret;
};

//HC Upgrade
var cookieTin,
    CookieH,
    CookieR,
    CookieS,
    CookieC,
    DivineD,
    CookieTau,
    TerraInf,
    TwinGates,
    ConjureBuild,
    ChronosAge,
    R9Box,
    conGrow,
    SpellStack,
    Empower;
var heavvis;
let cookieTinInfo =
    "Heavenly cookies that boosts your CPS more than normal cookie.";
let cookieTinName = [
    "Box of Macarons",
    "Tin of Butter Cookies",
    "Tin of British Tea Biscuits",
    "Box of Brand Biscuits",
    "Box of 100% Pastries",
    "Box of Cookie?",
    "Box of Cookien'\t",
    "Crate full of Exponential Idle Community References",
    "The creator's inside jokes Box",
    "Pack of Exotic Cookies",
];
let cookieHName = "Heavenly Cookie";
let cookieHInfo = "You gain more CPS the more HC you have";
let cookieRName = "[REDACTED] Cookie";
let cookieRInfo = "A very [REDACTED] cookie that [DATA EXPUNGED]";
let cookieSName = "Sugar Crystal Cookie";
let cookieSInfo = "This cookie gets tastier the more sugar you have";
let cookieCName = "Cookie Cookie";
let cookieCInfo = "This cookie increases CPS by the amount of cookies you own";
let divineDName = "Divine Doubling ($D_{d}$)";
let divineDInfo = "Doubles your CPS";
let cookieTauName = "Tauonium Cookie";
let cookieTauInfo =
    "An experimental type of antimatter-based cookie that is based on tau";
let terraInfName = "Terra-Infinity $(T_{\\infty})$";
let terraInfInfo =
    "Using your devotion, the gods grant you an everlasting source of cookieverse materials";
let twingateName = "Twin Gates of Transcendence";
let twingateInfo =
    "Unwind the secrets of heveanly chips to empower your empire";
let conjurebuildName = "Blessing of the Capital";
let conjurebulidInfo =
    "Blessed with the money power, you investments rewards increase";
let chronosageName = "Chronos Aging";
let chronosageInfo = "Transmute the power of yggdrasil to all your buildings";
let boxrName = "Box of R9";
let boxrInfo = `A very stange and mathematical box seemingly full of ${game.sigmaTotal} students`;
let congrowName = "Continuos Growth";
let congrowInfo = "Certain high-tech buildings gets more powerful the more of them you have";


//Conseq. HC Upgrade
var cookiet = new Array(9);
var cookietP = [1.2, 1.25, 1.35, 1.5, 1.55, 1.75, 1.8, 2, 2.25, 2.5];
var cookietB = [
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
var cookietName = [
	["Basic Macaron","Rose Macaron","Lemon Macaron","Chocolate Macaron","Pistachio Macaron","Hazelnut Macaron","Violet Macaron","Caramel Macaron","Licorice Macaron","Earl Grey Macaron"],
    ["Butter Horseshoe","Butter Pucks","Butter Knots","Butter Swirls","One Million Square Inches Butter per Cookie","Slab of Pure Butter","French Pure Butter Cookie","Garlic Butter Braised Cookie"],
	["Empire Biscuits","British Tea Biscuits","Chocolate British Tea Biscuits","Round British Tea Biscuits","Round Chocolate Tea Biscuits","Round British Tea Biscuits with Heart Motif","Round Chocolate British Tea Biscuits with Heart Motif","Big Ben Cookie","Hobnobs Biscuits"],
	["Caramoas","Sagalogs","Shortfoils","Win Mints","Fig Gluttons","Loreols","Jaffa Cake","Grease\'s Cups","Digits","Lombardia Cookies","Bastenaken Cookies","Festivity Loops","Havabreaks","Zilla Wafers","Dim Dams","Pokey"],
	["Cheesecake","Profiteroles","Panettone","Churros","Cinnamon Bun","Jelly Donut","Glazed Donut","Chocolate Cake","Pies","Croissant","Pain Au Chocolat","Focaccia","Taiyaki","Phyllo","Apple Strudel","Samarkand Bread"],
	["Cookie Dough","Cookie Dough(No Salmonella)","Burnt Cookie","A normal chocolate chip cookie but there\'s no chips at all for some reason","4K Cookie","Ray-Traced Cookie","Crackers","Deep-Fried Cookie","Flavor Text Cookie"],
	["Toast","Pancakes","Marshmellows","PB amd J","Wookies","Cheeseburger","Beesechurger","One lone chocolate Chip","Pizza","Candy","Brownies","Flavor text Food that is not cookie","Medovik","Fudge"],
	["Gilles-Cookie Paillé","liver","Mathmatically Illegal Cookie","! [ Snakey Snickerdoodles ] !","Nerdy as f Cookie",":exCookie:","JS-Formed ellipsis Cookie","SkyXCookie","Weierstra🅱️ Cookie Spiral","Exponential Cookie","ouo cookie","Orteil β Cookie"],
	["Gigaloopite","Tetraloopite","Enium Cookie","Orate Cookie","Dxygen Cookie","IUSpawn Cookie","egg","Euler Serion Cookies"],
	["Mutated Cookie","Magic Marbled Cookie","Shortcake-like Cookie","Truffle Cookie","Salt Pretzels","Seaweed Sesame Cookie","Dulce De Leche","Keylime Pie","S\'Mores","Chocolate Drizzle Cookie","Peppermint Kiss Cookie","Sprinkled Jelly Cookie","Galaxial Drop","Reflective Frosted Cookie","Pecan Walnut Cookie","White Mine Cookie","Jelly Triangle","Gold Leafed Cookie","Grand Chocolate Wafer Sprinkles"]
];
//Want your self insert? DM me your very own cookie name and I might add it!

//Milestone Superpowers and random stuffs
var superP,superL,superC;
//P Exponent, L Mult Increase, C Power Increase

//Achievements
let ca = new Array(25);
let caName = [
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
let caReq = [
    1, 3, 6, 12, 25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450,
    500, 550, 600, 650, 675, 700, 725, 750,
];
let cpsa = new Array(26);
let cpsaName = [
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
    "A cookie is a baked or cooked snack or dessert that is typically small, flat and sweet. It usually contains flour, sugar, egg, and some type of oil, fat, or butter. It may include other ingredients such as raisins, oats, chocolate chips, nuts, etc. In most English-speaking countries except for the United States, crunchy cookies are called biscuits. Many Canadians also use this term. Chewier biscuits are sometimes called cookies even in the United Kingdom. Some cookies may also be named by their shape, such as date squares or bars.",
    "Someone go stop him, he's TOO FAST AAAAAAAAAAAAAAAAAAAAAAAA",
    ". . . dot dot dot . . .",
    "Cookie Idler Speedrun pubMult-100% 1 tick[0.1s] WR|SR|PB",
];
let cpsaReq = [
    1, 2, 5, 11, 24, 49, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 350,
    400, 450, 500, 550, 600, 650, 700, 725, 751,
];
var lumpAch = new Array(10); //10 tiers
var lumpAchCat;
let lumpAchName = [
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
var BuildingAchievement;
var buiAch1 = new Array(19);
var buiAch2 = new Array(19);
var buiAch3 = new Array(19);
var buiAch4 = new Array(14);//Very endgame content right there
var buiLumpAch = new Array(19);
const bach1 = ["Mouse Wheel","Retirement Club","Home Organic","Stop! Drilling Time!","Industrial Act","Pretty Penny Pinchers","Way of the Temple","Bewitched","Local Expedition","Transmutation","Isekai\'d","Thyme Wrap","When does it matter?","Some rays of dough and batter","Lucked up","A while loop out and then true","Press F12","Manifest Destiny","Big Brain Thyme"];//not to be confused with a famous composer from the romantic age or something
const bach2 = ["Clicktopia","Tootsie Roll Machine","100% Sustainable","Break the core","Age of Internet","Keynesian Cookinomics","Balance of Faith","Alakazamd","Cosmic Mapping","Polytranselementation","H̶e̷ ̶C̶o̴m̵e̸s̵","Thyme Pararegano","New Standard Model of Cookie and Flour","Total Enlightenment","Devil\'s Gambit","Apollonium Gasket","Infinite Theorycraft","Is there enough worlds?","Cardinal Synapsis"];
const bach3 = ["Thumbs, Phalanges, Metacarpals","Ruler of the Ancients","Green Pasture lays live","Dysonian Society","Automatal Hysteria","New Neohyperglobalization Order","The Lord\'s Likeliness","Shaspie Colupis","Multiverse Ramble","With matter comes Cookies","I̸͕̽n̷̰͊ ̸͖̔ṭ̵͐h̶̺̓e̴̫͋ ̶͓͂e̸͔͘y̸̝͋e̵͓̚s̸̫̒ ̶̰̕ò̸̜f̶͖̕ ̶̻͒t̷̥͆ĥ̶̳é̵̗ ̷̦̉b̴̡̽e̶͚̿h̴̙̋o̸̩͝l̴̘͆d̷̠͠è̶͍ř̴͎","Thyme Sagaporal Nutmegstant","Unified Complete Theory of the Cookieverse","O thy energy of sky, bring fourth the light rays","Gamber\'s Last Bet","Superliminal","I bring fourth reincarnation of reality","Lost your Cosmic Cookies","I declare thee on all ye inferiors. Despait before me, I am the Ozymandias"];
const bach4 = ["Hands of fate lays bare their click upon thou","Shrivel, today we rise","Babylonian Conservatorium sits on the hill","Breaking through reality","The perfect game of Factorio","Money is just a human construct","Caricature of the forgotten Deities","Cookiera Avadra Creamdera","Omniverse Realization","Satiated in the gaudy mouths of Gold","Bottom of the abyss","Out of past, Out of future","Hypersize my String and Gluten","Neverending rays of bright brilliance shine on you all"];
const bachlump = ["A hand and them a some more","Just like babies, but much more weird and terrifying","Farmer\'s Heaven","r/drillingmasterrace","Like the Japanese Inventors!","Hypermetaflation","Chief Artifact Curator","Hours to pronounce, effects very pronounced","A fleet of expeditors","Periodic Table","Is this reality or is it cookieverse?","No more Thyme Pararegano","Flavor Mathematics","4th Cone","Black Cat\'s Paw","Quite nearly but not so full","The \"C\" Language","You need a new bluestack","I am smart"];
var featAchCat;
var superIdle,hyperIdle,speedBake1,speedBake2,speedBake3,speedBake4,speedBake5,nice,insipid,leetnice;

let lumpAchReq = [1, 10, 50, 100, 500, 1000, 10000, 100000, 1000000, 10000000];
//Misc.
var otherAch;
//LORE
var chapter = new Array(16);
let chapterName = [
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
let chapterLore = [
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
    "POOF! and there goes nothing!\nYou just saw one of your cookies disappear into nothingness\nThen you saw a black cat in the corner of your vision again\nIn a panic,you hastily read through the book on symbolisms, and found out that black cat means bad luck\nWith your amounts of cookies, fearing that it might all be GONE the next day,\nYou improvised up a device from that book that would apparently bring in good luck to your entire existence\nAnd your local spellcasters might take an interest in that too",
    "Does your cookie look empty?\nI know that might sound like nonsense but how much of the matter is really matter\nUsing your sheet amount of knowledge you got from working with your past projects\nYou somehow managed to convert mattern't to matter and the cookie just splits into a whole lot more cookies\nPresenting the plan, you assigned the engineers to work on standardizing the device used to convert mattern't to matter, although the material used might have been too exotic",
    "Having lost your mind being overwhelmed with the thoughts of cookie\nYou went out on a ramage with your cookies, tearing down any and all signs of resistance, even the fabric of reality itself\nYou went mad, in search of something you can use to bend reality\nOne of the madness you did is parting some poor soul(Orteil?) of their laptop\nOn the laptop there's a console with the word 'Javascript' written on it\nYou of course, politely pressure the programmers to decipher the complicated syntax of 'Javascript'",
    "I love cookies, why don't we enslave other idle games to produce cookies for us",
    "Nothing stops you anymore\nNot even getting the counter to 750(it's now 500/750)\nIn one of the everlasting days at the Cookie Megacorporation...\nYou managed to manifest your desire of cookies out of thin air\nSeeing this opportunity, you cleared your way through the legal system to get some subjects to perform something on\nIt was a success, seeing them thinking up cookies out of thin air\nWhy bother with all your buildings when you can just think up cookies...",
    "The counter hit 750, and the sky immediately turned itself red...\n(To be continued)",
];
var checkChapter = (c) => {
    if (c == 0) return cookie.value >= BigNumber.ZERO;
    else if (c == 1) return building[1].level >= 1;
    else if (c == 2) return cookie.value > BF(1e12);
    else if (c == 3) return building[6].level >= 1;
    else if (c >= 15) return cookie.value >= BF("1e750");
    else return building[c + 4].level >= 1;
};
var thyme;
//All Secondary Equations
//1.Building CPS, 2.P formula, 3.Milk, 4.Cookie Power, 5.Covenant, 6.Yggdrasil, 7.Terra
/**
 * Returns a permanent upgrade object from the arguments given.
 * @param {number} id, The ID of the upgrade, must be unique.
 * @param {currency} cur, The currency for the cost of the upgrade.
 * @param {function} costModel, The function that returns the cost of the upgrade. Must return BigNumber
 * @param {function} desc, The function that returns the description(the name) of the upgrade. The function MUST return a string
 * @param {function} info, The function that returns the info of the upgrade. The function MUST return a string
 * @returns {PermanentUpgrade} The permanent upgrade from the given arguments.
 */
function shortPermaUpgrade(id, cur, costModel, desc, info){
    var up = theory.createPermanentUpgrade(id,cur,costModel);
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
function shortPermaUpgradeML(id, cur, costModel, desc, info, maxLevel){
    var up = shortPermaUpgrade(id, cur, costModel, desc, info);
    up.maxLevel = maxLevel;
    return up;
}


var init = () => {
    eqC=0;
    cookie = theory.createCurrency("C", "C");
    hc = theory.createCurrency("H", "H");
    lump = theory.createCurrency("L", "L");

    ///////////////////
    // Regular Upgrades
    //Shush
    {
        thyme = theory.createUpgrade(1e9,cookie,new ConstantCost(BF("1e1000")));
        thyme.isAvailable = false;
        thyme.maxLevel = 1262304000;//1461 Days
        thyme.getDescription = () => "Time (time)";
        thyme.getInfo = () => "how the fuck did you managed to see it";
    }
    //Tasty Cookies
    {
        cookieT = theory.createUpgrade(
            0,
            cookie,
            new ExponentialCost(basect, ctr)
        );
        cookieT.getDescription = (_) => {
            if(bInfo){
                return `\$ C_{1}(${cookieT.level}) = ${getCookieTP(cookieT.level)}, \\: CP(${cookieT.level})${superC.level > 0?"^{1.05}":""}=${getCookieP(cookieT.level)}\$`;
            }
            if (cookieT.level > cookieType.length) {
                return defaultcookieType;
            } else {
                return cookieType[cookieT.level];
            }
        };
        cookieT.getInfo = (amount) => (bInfo)?`\$ l = \$ ${Utils.getMathTo(cookieT.level,cookieT.level+amount)}`:cookieInf;
        cookieT.bought = (amount) => calcCPS();
    }
    //Heavely Tasty Cookie
    {
        for (let i = 0; i < cookieTinName.length; i++) {
            cookiet[i] = theory.createUpgrade(
                1000100 + i,
                cookie,
                new ExponentialCost(cookietB[i], ML2(8775))
            );
            cookiet[i].maxLevel = cookietName[i].length;
            cookiet[i].getDescription = () => {
                if(bInfo){
                    return `\$ TP_{${i}}^{CT_{${i}}} = ${cookietP[i]}^{${cookiet[i].level}} = ${BigP(cookietP[i],cookiet[i].level)}\$`;
                }
                if (cookiet[i].level >= cookiet[i].maxLevel) {
                    return cookietName[i][cookietName[i].length - 1];
                } else {
                    return cookietName[i][cookiet[i].level];
                }
            };
            cookiet[i].getInfo = (amount) => (bInfo)?`\$ CT_{${i}} =\$ ${Utils.getMathTo(cookiet[i].level,cookiet[i].level+amount)}`:
                "Some nice Heavenly Cookies to boost CPS even more";
            cookiet[i].bought = (amount) => calcCPS();
        }
    }
    //Kitty
    {
        kitty = theory.createUpgrade(
            kittyID,
            cookie,
            new ExponentialCost(kittyCost, kittyExp)
        );
        kitty.getDescription = (_) => {
            if(bInfo){
                return `\$K_{i} = ${kitty.level}, M = ${kittyPower(kitty.level)}\$`;
            }
            if (kitty.level > kittyName.length) {
                return kittyDName;
            } else {
                return kittyName[kitty.level];
            }
        };
        kitty.getInfo = (amount) => (bInfo)?`\$ K_{i} = \$ ${Utils.getMathTo(kitty.level,kitty.level+amount)} `:"You gain more CPS the more kittens you have";
        kitty.bought = (amount) => calcCPS();
    }
    // All 19 Buildings
    let LOG = ML2(1.15);
    for (let i = 0; i < 19; i++) {
        if (i == 0) {
            building[i] = theory.createUpgrade(
                1 + i,
                cookie,
                new FirstFreeCost(new ExponentialCost(baseCost[i], LOG))
            );
        } else {
            building[i] = theory.createUpgrade(
                1 + i,
                cookie,
                new ExponentialCost(baseCost[i], LOG)
            );
        }
        building[i].getDescription = () => {
            let bi = `\$B[${BigTS(i)}]^{${(getExpn(i)>1)?getExpn(i).toString(10):""}}\$`;
            if(bInfo){
                return `${bi} = ${calcBuilding(i,0)}`;
            }else{
                return `${bi} - ${buildingName[i]}`
            }
        };
        building[i].getInfo = (amount) => `${getInf(i,amount)}, ${((bInfo)?`\$B(${i}) = ${arrcps[i]}\$`:"")}`;
        building[i].bought = (amount) => calcCPS();
        switch(i){
            case 1:
                //Grandma's Covenant
                covenant = theory.createUpgrade(10001,cookie,new ExponentialCost(1e65, ML2(1e15)));
                covenant.getDescription = (_) => "Grandmother's Covenant $(C_{v})$";
                covenant.getInfo = () =>
                    "Synergyzing Grandmas together to boost their CPS depending on the buildings owned";
                covenant.maxLevel = 25;
                covenant.bought = (amount) => calcCPS();
                break;
            case 2:
                //Yggdrasil
                ygg = theory.createUpgrade(10002,cookie,new ExponentialCost(1e110, ML2(1e25)));
                ygg.getDescription = () => yggName;
                ygg.getInfo = () => yggInfo;
                ygg.maxLevel = 4;
                ygg.bought = (amount) => calcCPS();
                break; 
            case 3:
                //Terra
                terra = theory.createUpgrade(10003,cookie,new ExponentialCost(1e130, ML2(1e10))
                );
                terra.maxLevel = 20;
                terra.getDescription = () => terraName;
                terra.getInfo = () => terraInfo;
                terra.bought = (amount) => getEquationOverlay();
                break;
            case 4:
                //Recombobulators
                recom = theory.createUpgrade(10004,cookie,new ExponentialCost(1e170, ML2(1e5)));
                recom.maxLevel = 50;
                recom.getDescription = () => recomName;
                recom.getInfo = () => recomInfo;
                recom.bought = (amount) => calcCPS(); //+e65, then +e3
                break;
            case 5:
                //Investment
                invest = theory.createUpgrade(10005,cookie,new ExponentialCost(1e190, ML2(1.05)));
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
                    calcCPS();
                };
                invest.maxLevel = 1000;
                break;
            case 6:
                art = theory.CreateUpgrade(10006,cookie,new ExponentialCost(1e255,1));
                art.getInfo = () => (art.level > 0)?artClue[artUnlock]:artInfo;
                art.getDescription = () => artName;
                art.maxLevel = 1000;
                artArt = theory.CreateUpgrade(10007,cookie,new ExponentialCost(1e250,ML2(1000)));
                artArt.getDescription = () => artArtName[artArt.level];
                artArt.getInfo = () => artArtDesc[artArt.level];
                artArt.maxLevel = artUnlock+1;
                art.bought = (amount) => {
                    if(artCheck(artUnlock)){
                        artUnlock++;
                        updateAvailability();
                    }
                    if(artArt.maxLevel < artArt.level)artArt.maxLevel = artArt.level;
                    if((artArt.maxLevel >= artArt.level) && (artUnlock+1 > artArt.maxLevel))artArt.maxLevel=artUnlock+1;
                    //Incentives
                    //sucks to sucks
                    //1/2/3/5/10/15/30/60 minute CPS
                    //1 prestige H
                    //1000/1500/2000/2500/5000 tick lumps
                    //All of the above(JACKPOT)
                    let r = RandI(10000);
                    if((spellCast[5]+(10*templeLuckDur)) >= thyme.level){
                        r+=templeLuck;
                    }
                    let chance = [10000,9995,9945,9845,9735,9615,9565,9555,9530,9430,9320,9200,9100,9000];
                    //bsearch to find slot
                    prize = bsearch(chance,r);
                    switch(prize){
                        case 0:
                            minCookie(60);
                            pubH(1);
                            tickLump(5000);
                            break;
                        case 1:
                            tickLump(5000);
                            break;
                        case 2:
                            tickLump(2500);
                            break;
                        case 3:
                            tickLump(2000);
                            break;
                        case 4:
                            tickLump(1500);
                            break;
                        case 5:
                            tickLump(1000);
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
                    }
                    if(artArt.maxLevel < artArt.level)artArt.maxLevel = artArt.level;
                };
                artArt.bought = (amount) => {
                    calcCPS();
                }
                break;
            case 7:
                SpellView = theory.createUpgrade(10008,cookie,new FreeCost());
                SpellView.getDescription = () => "Toggle Grimoire";
                SpellView.getInfo = () => "Open or close the grimoire by buying this upgrade";
                SpellView.isAutoBuyable = false;
                SpellView.bought = (amount) => {
                    SpellView.level=0;
                    isSpellShown ^= 1;
                    updateAvailability();
                }
                for(let i=0;i<Spell.length;i++){
                    Spell[i] = theory.createUpgrade(i+20000,lump,new ConstantCost(spellCost[i]));
                    Spell[i].getDescription = () => spellName[i];
                    Spell[i].getInfo = () => spellDesc[i];
                    Spell[i].isAutoBuyable = false;
                    Spell[i].maxLevel = 1;
                    Spell[i].bought = (amount) => {
                        castSpell(i);
                    };
                }
        }

    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, cookie, 1e12);
    theory.createBuyAllUpgrade(1, cookie, 1e3);
    theory.createAutoBuyerUpgrade(2, cookie, 1e25);
    //Heavenly Upgrade
    {
        heavvis = theory.createPermanentUpgrade(999999,cookie,new FreeCost());
        heavvis.getDescription = () => "Toggle Heavenly Upgrades";
        heavvis.getInfo = () => "Toggles the visibility of heavenly upgrades";
        heavvis.isAutoBuyable = false;
        heavvis.bought = (amount) => {
            heavVis ^= 1;
            heavvis.level--;
            updateAvailability();
        };
    }
    //Heavenly Cookies
    let baseI = 1000000;
    {
        cookieTin = theory.createPermanentUpgrade(
            baseI,
            hc,
            new ExponentialCost(25, ML2(1e6))
        );
        cookieTin.getDescription = () =>
            (bInfo)?`Unlock \$TP_{${cookieTin.level}}\$`:
            cookieTinName[
                cookieTin.level == cookieTinName.length
                    ? cookieTinName.length - 1
                    : cookieTin.level
            ];
        cookieTin.getInfo = () => (bInfo)?`Unlocks an additional Heavely Cookie upgrade`:cookieTinInfo;
        cookieTin.maxLevel = cookieTinName.length;
    }
    //Others
    {
        CookieH = shortPermaUpgradeML(baseI + 1,hc,new ConstantCost(500),cookieHName,cookieHInfo,1);
        CookieH.bought = (amount) => calcCPS();
        CookieS = shortPermaUpgradeML(baseI + 2,hc,new ConstantCost(15000),cookieSName,cookieSInfo,1);
        CookieS.bought = (amount) => calcCPS();
        CookieC = shortPermaUpgradeML(baseI + 3,hc,new ConstantCost(1e13),cookieCName,cookieCInfo,1);
        CookieC.bought = (amount) => calcCPS();
        DivineD = shortPermaUpgrade(baseI + 4,hc,new ExponentialCost(1e14, ML2(1e10)),divineDName,divineDInfo);
        DivineD.bought = (amount) => calcCPS();
        CookieTau = shortPermaUpgradeML(baseI + 5,hc,new ConstantCost(8e17),cookieTauName,cookieTauInfo,1);
        CookieTau.bought = (amount) => calcCPS();
        TerraInf = shortPermaUpgradeML(baseI + 7,hc,new ExponentialCost(1e55, ML2(1e10)),terraInfName,terraInfInfo,7);
        TerraInf.bought = (amount) => calcCPS();
        ChronosAge = shortPermaUpgradeML(baseI + 8,hc,new ConstantCost(2.5e57),chronosageName,chronosageInfo,1);
        ChronosAge.bought = (amount) => calcCPS();
        ConjureBuild = shortPermaUpgradeML(baseI + 9,hc,new ExponentialCost(1e60, ML2(8)),conjurebuildName,conjurebulidInfo,3,{});
        TwinGates = shortPermaUpgradeML(baseI + 10,hc,new ConstantCost(1e65),twingateName,twingateInfo,1);
        TwinGates.bought = (amount) => calcCPS();
        R9Box = shortPermaUpgradeML(baseI+11,hc,new ExponentialCost(1e80,ML2(1000)),boxrName,boxrInfo,3);
        R9Box.bought = (amount) => calcCPS();
        conGrow = shortPermaUpgradeML(baseI+12,hc,new ExponentialCost(1e103,ML2(1e5)),congrowName,congrowInfo,5);
        conGrow.bought = (amount) => calcCPS();
        SpellStack = shortPermaUpgradeML(baseI+13,hc,new ExponentialCost(1e105,ML2(1e5)),"Spell Cast Layering","Allows multiples of the same spell to be casted, cooldown all at once and slightly empowers the spell as well",3);
        SpellStack.bought = (amount) => updateSpellLayer();
        Empower = shortPermaUpgradeML(baseI+14,hc,new ExponentialCost(5e116,ML2(10^1.35)),"Empowerments of Buildings","Increases how fast $P$ grows",50);
        Empower.bought = (amount) => calcCPS();
    }
    //Cursor Upgrade
    {
        clickp = theory.createPermanentUpgrade(
            3,
            cookie,
            new ExponentialCost(1000, ML2(10))
        );
        clickp.getDescription = () => clickpname;
        clickp.getInfo = () =>
            "Improves how much more the cursor clicks $(P_{cp})$";
        clickp.bought = (amount) => calcCPS();
    }
    //Building Power Upgrade
    const b50 = 1000;
    //Power Upgrade
    for (let i = 0; i < 19; i++) {
        buildingP[i] = theory.createPermanentUpgrade(
            4 + i,
            cookie,
            new ExponentialCost(b50 * baseCost[i], ML2(b50))
        );
        buildingP[i].getInfo = (amount) =>
        `\$P_{${i.toString(10)}}${(superP.level > 0)?"^{1.02}":""} \\: = \\: \$${Utils.getMathTo(getPower2(i, buildingP[i].level).toString(0),getPower2(i, buildingP[i].level + amount).toString(0))}`;
        buildingP[i].getDescription = () =>
            `\$P_{${BigTS(i)}}${(superP.level > 0)?"^{1.02}":""}\$ = ${BigTS(getPower(i))}`;
            //"$P_{" + i.toString(10) + "}$ = " + getPower(i).toString(0);
        buildingP[i].bought = (amount) => calcCPS();
    }
    //Lumpy Upgrade
    for (let i = 0; i < 19; i++) {
        buildingUpgrade[i] = theory.createPermanentUpgrade(
            33 + i,
            lump,
            new LinearCost(i+1, i+1)
        );
        buildingUpgrade[i].getDescription = (amount) => (bInfo)?`\$ ${buip}^{L[${i}]} = ${buip}^{${buildingUpgrade[i].level}} = ${BigP(buip,buildingUpgrade[i].level)}\$`:buildingUpgradeName[i];
        buildingUpgrade[i].getInfo = (amount) => {
            if(bInfo){
                return `\$ L[${i}] = \$ ${Utils.getMathTo(buildingUpgrade[i].level,buildingUpgrade[i].level+amount)}`;
            }
            return `Improves ${buildingName[i]}  by a factor of ${TS10(buip)}`
        };
        buildingUpgrade[i].maxLevel = buildingPMax[i];
        buildingUpgrade[i].bought = (amount) => calcCPS();
        buildingUpgrade[i].canBeRefunded = (amount) =>
            buildingUpgrade[i].level - amount >= 0;
    }
    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(30, 30));
    superP = theory.createMilestoneUpgrade(0,1);
    superP.boughtOrRefunded = (amount) => calcCPS();
    superP.description = "Increases $P_{i}$ exponent by $0.02$ for all values of $i$";
    superP.info = superP.description;
    superL = theory.createMilestoneUpgrade(1,1);
    superL.description = "Change $1.1$ in $L[i]$ to $1.11$";
    superL.info = superL.description;
    superL.boughtOrRefunded = (amount) => calcCPS();
    superC = theory.createMilestoneUpgrade(2,1);
    superC.description = "Increases $CP(l)$ exponent by $0.05$";
    superC.info = superC.description;
    superC.boughtOrRefunded = (amount) => calcCPS();

    /////////////////
    //// Achievements
    //Utils Achievement Checker
    var CheckAch1 = (i) => {
        if (BigL10(cookie.value+1) >= BF(caReq[i])) {
            achCount++;
            calcCPS();
            return true;
        } else {
            return false;
        }
    };
    var CheckAch2 = (i) => {
        if (BigL10(CPS+1)-BigL10(1+theory.publicationMultiplier) >= BF(cpsaReq[i])) {
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
        if(building[indx].level >= lb){
            achCount++;
            calcCPS();
            return true;
        }else{
            return false;
        }
    };
    var CheckAchBui2 = (indx, lb) => {
        if(buildingUpgrade[indx].level >= lb){
            achCount++;
            calcCPS();
            return true;
        }else{
            return false;
        }
    };
    //Very Custom and Experimental Logic Check
    var CheckAchFeat = (chk, cnt) => {
        if(chk()){
            achCount+=cnt;
            calcCPS();
            return true;
        }else{
            return false;
        }
    };
    //25 Layers of Cookies
    cookiesAchievement = theory.createAchievementCategory(
        0,
        cookiesAchievementCatName
    );
    var cookieADesc = (p) => `Reach e${BigTS(p)} cookies`;
    for (let i = 0; i < 25; i++) {
        ca[i] = theory.createAchievement(
            i,
            cookiesAchievement,
            caName[i],
            cookieADesc(caReq[i]),
            () => CheckAch1(i)
        );
    }
    //26 CPS
    CPSAchievement = theory.createAchievementCategory(1, "Cookies Per Second");
    var CPSDesc = (p) => {
        let result =
            "Reach e" +
            BF(p).toString(0) +
            " cookies per second without publication multipliers";
        if (p >= 751) {
            result += " finishing this theory in a single tick.";
        }
        return result;
    };
    for (let i = 0; i < 26; i++) {
        cpsa[i] = theory.createAchievement(
            100 + i,
            CPSAchievement,
            cpsaName[i],
            CPSDesc(cpsaReq[i]),
            () => CheckAch2(i)
        );
    }
    //10 Lumps
    lumpAchCat = theory.createAchievementCategory(2, "Sugar Lumps");
    var lumpDesc = (p) => {
        let res =
            `Get a total of ${BigTS(p)} sugar lump`;
        if (p != 1) {
            res += "s";
        }
        return res;
    };
    for (let i = 0; i < 10; i++) {
        lumpAch[i] = theory.createAchievement(
            200 + i,
            lumpAchCat,
            lumpAchName[i],
            lumpDesc(lumpAchReq[i]),
            () => CheckAch3(i)
        );
    }
    //A lot of buildings
    BuildingAchievement = theory.createAchievementCategory(3,"Buildings");
    for(let i=0;i<15;i++){
        buiAch1[i] = theory.createAchievement(300+i,BuildingAchievement,bach1[i],`Get ${buildingName[i]} to level 100`,()=>CheckAchBui(i,100));
        buiAch2[i] = theory.createAchievement(400+i,BuildingAchievement,bach2[i],`Get ${buildingName[i]} to level 1000`,()=>CheckAchBui(i,1000));
        buiAch3[i] = theory.createSecretAchievement(500+i,BuildingAchievement,bach3[i],`Get ${buildingName[i]} to level 5000`,`${buildingName[i]} by 5000`,()=>CheckAchBui(i,5000));
        /*if(i < 14){
            buiAch3[i] = theory.createSecretAchievement(600+i,BuildingAchievement,bach4[i],`Get ${buildingName[i]} to level 10000`,`${buildingName[i]} by 10000`,()=>CheckAchBui(i,10000));
        }*/
        buiLumpAch = theory.createAchievement(700+i,BuildingAchievement,bachlump[i],`Upgrade ${buildingName[i]} to level 100`,()=>CheckAchBui2(i,100));
    }
    //Feats
    {
        featAchCat = theory.createAchievementCategory(4,"Feats");
        superIdle = theory.createAchievement(800,featAchCat,"Super Idler","(2) Have your cookie exceeds 1 day worth of CPS while having 0 levels of terraform upgrade",()=>CheckAchFeat(() => (cookie.value > BF(86400)*CPS)&&(terra.level==0),2));
        hyperIdle = theory.createSecretAchievement(801,featAchCat,"Hyper Idler","(3) Have your cookie exceeds 1 year worth of CPS while having 0 levels of terraform upgrade\nhow in the world did you even managed that anyway","Gaseous",()=>CheckAchFeat(() => (cookie.value > BF(0x1e13380)*CPS)&&(terra.level==0),3));
        speedBake1 = theory.createAchievement(802,featAchCat,"Speed Bake I","(1) Get 1e25 CPS within 1 minute of publishing",()=>CheckAchFeat(() => (CPS >= BF(1e25))&&(thyme.level <= 600),1));
        speedBake2 = theory.createAchievement(803,featAchCat,"Speed Bake II","(2) Get 1e50 CPS within 45 seconds of publishing",()=>CheckAchFeat(() => (CPS >= BF(1e50))&&(thyme.level <= 450),2));
        speedBake3 = theory.createAchievement(804,featAchCat,"Speed Bake III","(3) Get 1e100 CPS within 30 seconds of publishing",()=>CheckAchFeat(() => (CPS >= BF(1e100))&&(thyme.level <= 300),3));
        speedBake4 = theory.createAchievement(805,featAchCat,"Speed Bake IV","(3) Get 1e200 CPS within 15 seconds of publishing",()=>CheckAchFeat(() => (CPS >= BF(1e200))&&(thyme.level <= 150),3));
        speedBake5 = theory.createAchievement(806,featAchCat,"Speed Bake V","(4) Get 1e300 CPS within 5 seconds of publishing\n\nhaha speed goes brrrrrr",()=>CheckAchFeat(() => (CPS >= BF(1e300))&&(thyme.level <= 50),4));
        nice = theory.createSecretAchievement(807,featAchCat,"nice","(1) Get exactly 69 heavenly lumps(decimals accepted)","nice",()=>CheckAchFeat(() => (0x46 > hc.value)&&(hc.value > 0x44),1));
        insipid = theory.createAchievement(808,featAchCat,"Bland Taste","(2) Get to e55 without buying a single level of milk and cookie flavor",()=>CheckAchFeat(() => (cookie.value >= BF(1e55))&&(milk.level==0)&&(cookieT.level==0),2));
        leetnice = theory.createSecretAchievement(809,featAchCat,"leet nice","(3) Have Temple+Alchemy Lab = 1337","[ni] + [ce] = leet",()=>CheckAchFeat(() => ((building[6].level + building[9].level) == 0x539),3));
    }
    //! Total sum of all feats : 22
    //Misc.

    ///////////////////
    //// Story chapters
    for (let i = 0; i < 16; i++) {
        chapter[i] = theory.createStoryChapter(
            i,
            chapterName[i],
            chapterLore[i],
            () => checkChapter(i)
        );
    }
    buip = getbuip();
    //Finishing up stuffs
    updateSpellLayer();
    updateAvailability();
    //calcCPS();
};

var updateAvailability = () => {
    //something related to milestone upgrades and building specific
    //let BF = (num) => BF(num);
    covenant.isAvailable = cookie.value >= BF(1e60);
    kitty.isAvailable = achCount >= 5;
    cookieT.isAvailable = building[3].level > 0;
    CookieH.isAvailable = hc.value >= BF(500) && heavVis;
    CookieS.isAvailable = hc.value >= BF(10000) && heavVis;
    cookieTin.isAvailable = hc.value >= BF(10) && heavVis;
    CookieC.isAvailable = hc.value >= BF(1e7) && heavVis;
    DivineD.isAvailable = hc.value >= BF(1e10) && heavVis;
    CookieTau.isAvailable = hc.value >= BF(1e12) && heavVis;
    ygg.isAvailable = cookie.value >= BF(1e100);
    terra.isAvailable = cookie.value >= BF(1e125);
    recom.isAvailable = cookie.value >= BF(1e155);
    invest.isAvailable = cookie.value >= BF(1e180);
    TerraInf.isAvailable = hc.value >= BF(1e50) && heavVis;
    TwinGates.isAvailable = ChronosAge.level > 0 && heavVis;
    ChronosAge.isAvailable = ygg.level > 0 && heavVis;
    ConjureBuild.isAvailable = invest.level >= 10 && heavVis;
    art.isAvailable = cookie.value >= BF(1e250);
    R9Box.isAvailable = hc.value > BF(1e79) && heavVis;
    artArt.isAvailable = ((artUnlock >= 1) || (art.level > 0));
    conGrow.isAvailable = hc.value > BF(1e100) && heavVis;
    SpellStack.isAvailable = hc.value > BF(1e100) && heavVis;
    Empower.isAvailable = hc.value > BF(1e115) && heavVis;
    for (let i = 0; i < cookieTinName.length; i++) {
        cookiet[i].isAvailable =
            cookieTin.level >= i + 1 &&
            cookie.value > BF(cookietB[i]);
    }
    for(let i=0;i<Spell.length;i++){
        Spell[i].isAvailable=isSpellShown;
    }
    for (let i = 0; i < 19; i++) {
        if (i >= 3) building[i].isAvailable = cookie.value >= baseCost[i - 1];
        buildingP[i].isAvailable = building[i].level > 0;
        buildingUpgrade[i].isAvailable = building[i].level > 10;
    }
    building[14].isAvailable = ((cookie.value >= baseCost[13]) && (artArt.level > 8));
};

//CPS Zone
//Calculates Building Level
//id = ID, am = Offset Amount
var calcBuilding = (id,am) => {
    if(conGrow.level > 0 && id >= 11){
        return Utils.getStepwisePowerSum(building[id].level+am,2.4+(0.2*conGrow.level)+(0.011*(id-11)),50-conGrow.level,1)-1;
    }else if(conGrow.level > 1 && id < 11){
        return Utils.getStepwisePowerSum(building[id].level+am,1.2+(0.07*conGrow.level)+(0.021*(id+1)),50-conGrow.level,1)-1;
    }else{
        return BF(building[id].level+am)
    }
};
function Expensive1(){
    kittyPower(100);
}
function Expensive2(){
    getCookieP(cookieT.level);
}
function Expensive3(){
    if(recom.level > 0){
        HPS = BF(hc.value).pow(0.9) * (recom.level+((artArt.level > 7)?10:0));
        LPS = (recom.level+((artArt.level > 7)?10:0)) * 0.01;
        arrcps[4] *= (recom.level > 1)?(BF(1e54) * BigP(2,recom.level - 1)):(BF(1e54));
        lwC = Math.floor((BigL10(10+cookie.value)) / lumpc) + LPS / 10;
    }
}

var calcCPS = () => {
    buip = getbuip();
    CPS = BigNumber.ZERO;
    let bc = BigNumber.ZERO;
    milk = BigNumber.FIVE * achCount;
    HPS = BF(hc.value).pow(0.9) * (recom.level+((artArt.level > 7)?10:0));
    LPS = (recom.level+((artArt.level > 7)?10:0)) * 0.01;
    let kp = kittyPower(kitty.level) * BF(BF(100 + milk) / BF(100));
    for (let i = 0; i < 19; i++) {
        if(building[i].level == 0){
            arrcps[i]=0;
            continue;
        }
        let step1 = BF(calcBuilding(i,0)*BF(getPower(i))*BF(bcps[i]));
        arrcps[i] = (
            step1 *
            kp *
            BF(buip).pow(buildingUpgrade[i].level)
        ).pow(getExpn(i));
        //arrcps[i]=BF("1e180");
        arrcps[i] *= (getCookieP(cookieT.level) * (1+(CookieTau.level * game.tau.log10().log10().pow(2))));
        bc += BigP(building[i].level,0.8) * getPower(1).pow(0.9);
    }
    if(artArt.level > 0){
        //Multiplies temple CPS by 8e57
        arrcps[6]*=BF(8e57);
        if(artArt.level > 1){
            //Multiplies Temple CPS by the amount of prisms you have.
            //Multiplies Prism CPS by 55 and the amount of temples you have.
            arrcps[13]*=BF(1) + (BF(55)*building[6].level);
            arrcps[6]*=(building[13].level) + BF(1);
            if(artArt.level > 3){
                //Multiplies Cursor CPS by 3.24e65
                arrcps[0]*=BF(3.24e65);
                if(artArt.level > 5){
                    //Multiplies Farm CPS by 200
                    //Multiplies Prism CPS by 750
                    arrcps[13]*=BF(750);
                    arrcps[2]*=BF(200);
                    if(artArt.level > 6){
                        //Multiplies Mine CPS by 3.5e63
                        arrcps[3]*=BF(3.5e63);
                        if(artArt.level > 7){
                            //Multiplies Factory CPS by 1.08e18
                            arrcps[4]*=BF(1.08e18);
                            if(artArt.level > 8){
                                //Multiplies Bank CPS by 4.08e68
                                arrcps[5]*=BF(4.08e68);
                            }
                        }
                    }
                }
            }
        }
    }
    if(ygg.level > 0 && thyme.level > 0){
        arrcps[2] *= BF(getPower(2)).pow(1.175 + 0.05 * ygg.level) * BF(building[6].level + building[2].level).pow(BigP(ygg.level,0.9) * 0.2 + 3) * (BigNumber.ONE + BF(thyme.level).pow(1.4)) * BF(5e10);
    }
    if (covenant.level > 0){
        arrcps[1] *= bc.pow(BF(covenant.level).pow(0.45) * covDelta + covExp) * covenant.level;
    }
    if(recom.level > 0){
        HPS = BF(hc.value).pow(0.9) * (recom.level+((artArt.level > 7)?10:0));
        LPS = (recom.level+((artArt.level > 7)?10:0)) * 0.01;
        arrcps[4] *= (recom.level > 1)?(BF(1e54) * BigP(1.9,recom.level - 1)):(BF(1e54));
        lwC = Math.floor((BigL10(10+cookie.value)) / lumpc) + LPS / 10;
    }
    arrcps[14] = BigP(arrcps[14],RandR(1.01+(0.00005*buildingUpgrade[14].level),0.99+(0.00005*buildingUpgrade[14].level)));
    CPS = arrcps.reduce((pre,cur) => pre+cur,BigNumber.ZERO);
    if((spellCast[1]+(10*effectCPSBDur)) >= thyme.level){
        CPS *= effectCPSB;
    }
    if(artArt.level > 4){
        //Multiplies the CPS from all buildings by the amount of grandmas you have to the power of 0.61
        CPS*=BigP(building[1].level,0.61);
    }
    CPS *= 1+(BF(clickp.level) * BigP(buip, buildingUpgrade[0].level) * BF(bcp));
    if(artArt.level > 9){
        CPS*=BF(100);
    }
    if ((ChronosAge.level) > 0){
        CPS *= BigNumber.ONE + BF(thyme.level).pow(0.5);
    }
    CPS *= (TwinGates.level > 0 ? hc.value.pow(0.03 * TwinGates.level) : 1) * theory.publicationMultiplier * (BigP(game.sigmaTotal,R9Box.level*0.7));
};
let lwC = 0;
let idle = false;
var tick = (multiplier) => {
    if(game.isCalculatingOfflineProgress || idle){
        if(CPS == 0){
            calcCPS();
        }
        cookie.value += (CPS * Logistic()) / BigNumber.TEN;
        hc.value += HPS / 10;
        lump.value += lwC + (BigL10(cookie.value) / lumpc);
        lumpTotal += lwC + (BigL10(cookie.value) / lumpc);
        thyme.level++;
        return;
    }
    if(thyme.level < thyme.maxLevel){
        thyme.level++;
    }
    if (thyme.level == 0 || thyme.level%200 == 0) {
        calcCPS();
    }

    cookie.value += (CPS * Logistic()) / BigNumber.TEN;
    lump.value += lwC;
    lumpTotal += lwC;

    //Sugar Lump Incremental
    hc.value += HPS / 10;
    if(thyme.level % 10 == 0){
        for(let i=0;i<Spell.length;i++){
            if((spellCast[i]/10)+spellCool[i] <= (thyme.level/10)){
                Spell[i].level=0;
            }
        }
        if(thyme.level%11 == 0)updateSpellLayer();
        updateAvailability();
        if (cookie.value > 10 && Math.random() <= 1 / (lumpc / BigL10(cookie.value))) {
            lump.value += BigNumber.ONE;
            lumpTotal++;
        }
    }

    theory.invalidateTertiaryEquation();
};
//Logistic funtion for Mine+
//Param -> midpoint=30*L, max=500*L - 1, min=0
//Display T, returns bignumber

let xBegin = BF("-1e100");
var Logistic = () => {
    var maxL =
        BF(terra.level).pow(2.4 + 0.05 * (TerraInf.level + ((artArt.level > 6)?1:0))) * 1500 +
        BF(building[3].level).pow(1.2 + 0.03 * TerraInf.level) * ((spellCast[3]+(10*logBoostDue) >= thyme.level)?logBoost:1);
    return (
        BigNumber.ONE +
        maxL.pow(1 + 0.005*TerraInf.level) -
        maxL.pow(0.99999 - 0.01 * TerraInf.level) /
            (BigNumber.ONE +
                BigNumber.E.pow(-1 * (time - (xBegin + terra.level * 300))))
    );
};

const height = 60;
let eqColor = ["FFFFFF","E6DFCF","A06846","FFD4D8","FE3246","ABED6A","C48AE2","F4E4BA","FBF2D5","AC6329","E5BD46","E71334","E2DBD2","83F2BC","8F9098","FF6D98","AB5DF8","F1398D","00FFFF"];
let eqColorName = ["White","Milk","Chocolate","Strawberry","Raspberry","Lime","Blueberry","Banana","Vanilla","Caramel","Honey","Cherry","Coconut","Mint","Licorice","Rose","Blackcurrant","Dragonfruit","Crystallized"];
let eqColorAch = [0,10,15,20,25,30,40,50,60,70,75,80,85,90,100,110,120,130,140];
var PrimaryEquation = (col) => {
    return `\\color{#${eqColor[col]}}{\\dot{C} = P(B(0) + P_{cp}\\sum_{i=1}^{18}{B(i)})}`;
};
var getPrimaryEquation = () => {
    theory.primaryEquationScale = 1.15;
    theory.primaryEquationHeight = height;
    if(Number.isNaN(eqC)){
        eqC = 0;
    }
    return PrimaryEquation(eqC);
};
var TertiaryEquation = (col) => {
    if(Number.isNaN(col)){
        col = 0;
    }
    return `\\color{#${eqColor[col]}}{` +
    theory.latexSymbol +
    "=\\max C^{0.2}" +
    " \\quad " +
    "\\dot{C} = " +
    BF(CPS).toString(0) +
    (terra.level > 0 ? "\\quad T = " + Logistic().toString(10) : "") + "}";
}
var getTertiaryEquation = () =>{
    if(Number.isNaN(eqC)){
        eqC = 0;
    }
    return TertiaryEquation(eqC);
}

var getSecondaryEquation = () => {
    theory.secondaryEquationHeight = 90;
    theory.secondaryEquationScale = 1.1;
    return secondaryEq(eqType,eqC);
};

var getInf = (index,am) => {
    if(bInfo){
        return `\$B[${index}]^{${(getExpn(index)>1)?getExpn(index):""}}\$ = ${Utils.getMathTo(calcBuilding(index,0),calcBuilding(index,am))}`
    }
    let result = buildingName[index];
    if (building[index].level == 1) {
        result += " ";
    } else {
        result += "s ";
    }
    //Sorry, but you CAN'T get 1 CPS per building skill issue lol
    result +=
        buildingDesc[index] +
        BF(arrcps[index]).toString(0) +
        " cookies per second";
    return result;
};
var getPublicationMultiplier = (tau) => tau.pow(1.078);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{1.078}";
var getTau = () => cookie.value.pow(0.2);
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

var postPublish = () => {
    lump.value = lumpbf;
    hc.value = hbf;
    CPS = BigNumber.ZERO;
    getEquationOverlay();
    updateAvailability();
};
let lumpbf = BigNumber.ZERO;
let hbf = BigNumber.ZERO;
var prePublish = () => {
    lumpbf = lump.value;
    hbf = hc.value;
    hbf += (cookie.value / BF("1e12")).pow(1 / 3);
};

var getExpn = (index) => buiPerk[index] * buiexp + 1;
var getPower = (index) => BigP(Utils.getStepwisePowerSum(
        buildingP[index].level,
        buildingUpgradeMult[index] + ((index==2 || index==1)?Empower.level*0.01:Empower.level*1),
        5,
        1
    ),1+(superP.level * 0.02));

var getPower2 = (index, level) => BigP(Utils.getStepwisePowerSum(level, buildingUpgradeMult[index] + ((index==2 || index==1)?Empower.level*0.01:Empower.level*2), 5, 1),1+(superP.level * 0.02));
//! The text is arranged as follows: Introduction, Exponents, Cookies and Milk, Special Upgrades, Terraform Powerup, Archaeology, Grimoire, SPOILERS:(((((Cosmic Trade, Chemistry Laboratory, Bingo Research Facility)))))
const helpText = [];
//Just a bunch of text that is used in the help menu and a placeholder for the REAL help menu, meanwhile enjoy this placeholder text
var getHelpText = () => {
    let ret = [];
    ret.push(ui.createLabel({text:"Welcome to a theory all about cookies and more cookies!!!\n You have 3 currencies, cookies(C), heavenly chips(H), and sugar lumps(L), which you'll be spending on upgrades located on both tabs.\n\nCookies(C) by far is the most important, as the majority of the gameplay revolves around it, from buildings to even tau! You can get your first batch of cookies by buying a cursor, which is gifted to you for free to kickstart your very own cookie empire! By maximizing CPS(C dot), you are sure to produce a whole lot of cookies.\n\nHeavenly Chips(H) are a special type of cookie that forms whenever you sacrificed everything material you own in exchange for greater power(called publications). They can be used for all sorts of special upgrades, and might even end up boosting your CPS if you know enough.\n\nSugar lumps(L) by far are the hardest to acquire, literally requiring luck in order to get some, but its powers of being able to outright boost your building's CPS by 10%, multiplicative! Rumor has it that it gets easier to acquire the more cookies you have.\n",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    if(cookie.value >= BF(500)){
        ret.push(ui.createLabel({text:"Building Upgrades",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,10,2,10)}));
        ret.push(ui.createLabel({text:"In the permanent tab, you would find something like P1 = 1. These are upgrades that directly multiplies the CPS of a building by that amount(kinda like its power). It grows exponentially, like how the theory is supposed to be; but varying depending on what building P boosts. Later on they might grow even faster but I'll leave that up to you.",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    if(cookieT.level > 0){
        ret.push(ui.createLabel({text:"Milk and Flavors",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,10)}));
        ret.push(ui.createLabel({text:"In the main tab, there're 2 new upgrades that popped out: Milk and Cookie Flavor. Milk acts like a booster for having more achievements(the labors are all paid for by the felines). Cookie Flavor is exactly what it does, sprinkling more variance and flavor into your cookie empire which apparently makes more cookies for some reason.",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    if(covenant.isAvailable){
        ret.push(ui.createLabel({text:"Unique Upgrades",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,10)}));
        ret.push(ui.createLabel({text:"The Grandmother\'s Covenant is the first of the so-called \"Unique Upgrades\". They provide a massive boost to that building's CPS and potentially unlocks new strategies and game mechanics. In this case, the covenant boosts the grandma with P1, The total amount of buildings you own excluding grandmas,  mildly exponentiated as a bonus.",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    if(terra.isAvailable){
        ret.push(ui.createLabel({text:"Mass Terraforming",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,10)}));
        ret.push(ui.createLabel({text:"Terraform Buff is unlocked when you have the Unique Upgrade for mines, it provides a short boost to your CPS(until it doesn't) through the magic of Logistic Function automatically ending this buff depending on your terraforming level. You'll have higher maximum boosts the more mines you own, along with the upgrade level itself.",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    if(art.isAvailable){
        ret.push(ui.createLabel({text:"Archaeology",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,10)}));
        ret.push(ui.createLabel({text:"Archaeology is a new game mechanic revolving around exploring your very own temple in search for funny parts and upgrades that helps you later on. To find an artifact, a certain requirement must be completed(which I won't tell you!) through reading the clue for the next one by viewing the information on the Archaeology upgrade. Sometimes exploration might just not come back with upgrades, but something else...",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    if(SpellView.isAvailable){
        ret.push(ui.createLabel({text:"Grimoire",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,10)}));
        ret.push(ui.createLabel({text:"Grimoire allows you to cast spells through the tomes you had. It costs Sugar Lumps to cast a spell, and each spell can be casted once(until it doesn't) before needing to recharge. A spell is ready to be casted again when the level is set back to 0. Discover the effects of each spell yourself, that's the part of the surprise.",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,10,2,10)}));
    }
    ret.push(ui.createLabel({text:"Check back later for more in-game information",fontSize:15,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.NONE,padding:Thickness(2,15,2,15)}));
    return ret;
}

var InsPopup = ui.createPopup({
    title: "Instructions",
    content: ui.createStackLayout({
        children: [
            ui.createScrollView({
                heightRequest: 400,
                content: ui.createStackLayout({
                    children: [ui.createLabel({text:"If you're seeing this then this theory borked",fontSize:18,horizontalTextAlignment:TextAlignment.CENTER,fontAttributes:FontAttributes.BOLD,padding:Thickness(2,15,2,15)})]
                }),
            }),
            ui.createButton({
                text: "Close",
                onClicked: () => InsPopup.hide(),
            }),
        ],
    }),
});
//ellipsis you're so epic for contributing to getEquationOverlay() function
let eqName = ["Building CPS","Building Power","Milk","Cookie Power","Covenant","Yggdrasil","Terra","Recombobulators"];
let binfoname = ["Normal","Compressed"];
let seqButton = ui.createButton({
    text: `Secondary Equation\n${eqName[eqType]}`, row: 1, column: 0, 
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () => {
        eqType++;
        eqType = eqType % 8;
        while(!secondaryCheck(eqType)){
            eqType++;
            eqType = eqType % 8;
        }
        seqButton.text = `Secondary Equation\n${eqName[eqType]}`;
        theory.invalidateSecondaryEquation();
    },
});
let biButton = ui.createButton({
    text: `Building Display\n${binfoname[bInfo]}`, row: 0, column: 1,
    fontFamily: FontFamily.CMU_REGULAR,
    onClicked: () =>{
        bInfo ^= 1;
        biButton.text = `Building Display\n${binfoname[bInfo]}`;
    }
});
let colorButton = ui.createButton({
    text: `Equation Color\n${eqColorName[eqC]}`, row: 0, column: 1,
    onClicked: () =>{
        if (achCount >= eqColorAch[eqC] && (eqC < eqColor.length - 1)) {
            eqC++;
        }else{
            eqC=0;
        }
        colorButton.text = `Equation Color\n${eqColorName[eqC]}`;
        theory.invalidatePrimaryEquation();
        theory.invalidateSecondaryEquation();
        theory.invalidateTertiaryEquation();
    }
})

let perkLabel1 = ui.createLatexLabel({
    text:"You can forge your cookies into exponentium bars to exponentiate your buildings for faster cookie production here.\n\nEach bar you give to a building increases their exponent by 0.05",
    fontSize: 14,
    //padding: new Thickness(10,10,10,10),
    horizontalTextAlignment: TextAlignment.CENTER
});
let perkLabel2 = ui.createLatexLabel({
    text:`You have ${perkHas} exponentium bars`,
    fontSize: 14,
    //padding: new Thickness(10,10,10,10),
    horizontalTextAlignment: TextAlignment.CENTER
});
let perkForgeButton = ui.createButton({
    text:`Forge another one (${calcCookieToPerk(perkPoint)} C)`,
    onClicked: () =>{
        if(calcCookieToPerk(perkPoint) <= cookie.value){
            cookie.value-=calcCookieToPerk(perkPoint);
            perkPoint++;
            perkHas++;
            perkForgeButton.text = `Forge another one (${calcCookieToPerk(perkPoint)} C)`;
            perkLabel2.text = `You have ${perkHas} exponentium bars`;
        }
    }
});
let perkAssign = (indx) => ui.createGrid({
    columnDefinitions: ["65*","15*","10*","10*"],
    children: [
        ui.createLatexLabel({
            text:`B[${indx}] - ${buildingName[indx]}`,row:0,column:0,
            horizontalTextAlignment: TextAlignment.START,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createLatexLabel({
            text:`${buiPerk[indx]} / ${(buiPerk[indx] < (indx==2)?3:5)}`,row:0,column:1,
            horizontalTextAlignment: TextAlignment.CENTER,
            verticalTextAlignment: TextAlignment.CENTER,
        }),
        ui.createButton({
            text:`+`,row:0,column:2,
            onClicked:() => {
                if(perkHas > 0 && (buiPerk[indx] < maxbuiPerk(indx))){
                    perkHas--;
                    buiPerk[indx]++;
                    perkLabel2.text = `You have ${perkHas} exponentium bars`;
                    perkMenu.content.children[3].children[0].children[indx].children[1].text = `${buiPerk[indx]} / ${maxbuiPerk(indx)}`;
                }
            }
        }),
        ui.createButton({
            text:`-`,row:0,column:3,
            onClicked:() => {
                if(buiPerk[indx] > 0){
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
        children:[
            perkLabel1,
            perkLabel2,
            perkForgeButton,
            ui.createScrollView({
                heightRequest: 400,
                children:[
                    ui.createStackLayout({
                        children:[
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
let subPopup = ui.createPopup({
    title: "Subgames",
    isPeekable: true,
    content:ui.createLatexLabel({
        text:"\n\n\n\nComing Soon!\n\n\n\n\n\n",
        fontSize: 14,
        horizontalTextAlignment: TextAlignment.CENTER,
        verticalTextAlignment: TextAlignment.CENTER,
    })
});
let whatsnewMenu = ui.createPopup({
    title: "What's New",
    isPeekable: true,
    content:ui.createStackLayout({
        children:[
            ui.createFrame({
                heightRequest: 309,
                cornerRadius: 0,
                content:ui.createLabel({
                    text: "When the grimoire update this will show the entire changelog!",
                    fontSize: 14,
                    padding: new Thickness(12, 6, 12, 6),
                })
            }),
            ui.createButton({
                text:"Close",
                onClicked: () => whatsnewMenu.hide()
            })
        ],
    })
});
let popup = ui.createPopup({
    title: "Main Menu",
    isPeekable: true,
    content: ui.createStackLayout({
        children:[
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
                            perkForgeButton.text=`Forge another one (${calcCookieToPerk(perkPoint)} C)`;
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
                    seqButton,
                    ui.createButton({text: "???", row: 1, column: 1}),
                ]
            }),
            ui.createGrid({
                columnDefinitions: ["25*", "50*","25*"],
                children: [
                    colorButton
                ]
            }),
            ui.createProgressBar({progress: 0}),
            ui.createLabel({
                horizontalTextAlignment: TextAlignment.CENTER,
                fontSize: 15,
                padding: new Thickness(10, 10, 0, 0),
                text:"Cookie Idler GRIMOIRE BETA\nv0.1.3a"
            })
        ]
    })
});

var getEquationOverlay = () =>
    ui.createStackLayout({
        children: [
            ui.createImage({
                source: ImageSource.INFO,
                horizontalOptions: LayoutOptions.START,
                verticalOptions: LayoutOptions.END,
                heightRequest: 30,
                margin: new Thickness(10, 10, 0, 10),
                onTouched: (e) => {
                    if (e.type == TouchType.SHORTPRESS_RELEASED) {
                        popup.show();
                    }
                },
            }),
            terra.level > 0
                ? ui.createImage({
                      source: ImageSource.fromUri("https://static.wikia.nocookie.net/cookieclicker/images/6/6f/CookieProduction39.png/revision/latest?cb=20200620182721"),
                      horizontalOptions: LayoutOptions.START,
                      verticalOptions: LayoutOptions.END,
                      heightRequest: 30,
                      margin: new Thickness(10, 0, 0, 0),
                      onTouched: (e) => {
                          if (e.type == TouchType.SHORTPRESS_RELEASED) {
                              log("Boost!");
                              xBegin = time;
                              calcCPS();
                          }
                      },
                  })
                : ui.createImage({
                      source: ImageSource.LOCK,
                      horizontalOptions: LayoutOptions.START,
                      verticalOptions: LayoutOptions.END,
                      heightRequest: 25,
                      margin: new Thickness(10, 10, 0, 0),
                  }),
            terra.level > 0
                ? ui.createLatexLabel({
                      text: "Terraform Buff",
                      fontSize: 10,
                      padding: new Thickness(10, 10, 0, 0),
                  })
                : ui.createLatexLabel({
                      text: "Locked",
                      fontSize: 10,
                      padding: new Thickness(10, 10, 0, 0),
                  }),
        ],
    });

var artCheck = (cond) => {
    switch(cond){
        case 0:
            return art.level >= 532 - (532&512|1|2|4|8);
            break;
        case 1:
            return achCount >= (((((((1<<1)+1)<<1)+1)<<1)+1)<<1);
            break;
        case 2:
            return building[9].level >= (((((((4095&(4095-1))&(4095-2))&(4095-16))&(4095-32))&(4095-64))&(4095-256))&(4095-1024));
            break;
        case 3:
            return cookiet[7].level >= 1<<2>>2<<2>>2<<2>>2<<2>>2<<2>>2<<2>>2;
            break;
        case 4:
            return art.level >= (((1<<5)|1)&31&62|2|4|8|16);
            break;
        case 5:
            return art.level >= (((((((1<<1)+1)<<1)+1)<<1)+1)<<1)+((1<<3)+10);
            break; 
        case 6:
            return buildingUpgrade[4].level >= (32>>4)|(32>>1)|32;
            break;
        case 7:
            return cookie.value >= BF(1e280);
            break;
        case 8:
            return Math.random() < 0.9999999;
            break;
        case 9:
            return building[7].level >= (parseInt([+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]+!+[]+!+[]]+[+!+[]+!+[]+!+[]+!+[]]+[+!+[]+!+[]])^parseInt([+!+[]+!+[]+!+[]]+[+!+[]+!+[]+!+[]]+[+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]))+50;
            break;
        default:
            return false;
    }
};
init();
calcCPS();
var secondaryCheck = (mode) => {
    switch(mode){
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
        default:
            return true;
    }
};
var secondaryEq = (mode,col) => {
    if(Number.isNaN(col)){
        col = 0;
    }
    //\color{#E6DFCF}{B(i) = B[i]P_{i}1.1^{L[i]}(\log_{10}\log_{10}\tau)^{2}}
    switch (mode) {
        case 0:
            return `\\color{#${eqColor[col]}}{B(i) = B[i]P_{i}1.1^{L[i]}${(CookieTau.level > 0)?"(\\log_{10}\\log_{10}\\tau)^{2}":""}${(building[14].level > 0)?"\\\\B(14) \\leftarrow B(14)^{r(1.01+5\\cdot10^{-5}L[14],0.99+5\\cdot10^{-5}L[14])}":""}}`;
            break;
        case 1:
            return (
                `\\color{#${eqColor[col]}}{` +
                "P = M(CP(l)) \\\\" +
                (CookieS.level > 0 ? "(log_{2}(L + 2))^{2}" : "") +
                (CookieH.level > 0 ? "(log_{10}(H + 10))^{1.5}" : "") +
                (CookieC.level > 0 ? "(log_{10}(C + 10))" : "") + "}"
            );
            break;
        case 2:
            return `\\color{#${eqColor[col]}}{M = M_{i}K(0.2)+(K-10)(0.3)\\\\+(K-25)(0.4)+(K-50)(0.5)${(artArt.level > 2)?"\\\\M \\leftarrow M^{1.5+0.01A_{c}}":""}}`;
            break;
        case 3:
            theory.secondaryEquationScale = 0.9;
            return (
                `\\color{#${eqColor[col]}}{` +
                `CP(l) = ${(DivineD.level > 0)?"2^{D_{d}}":""}C_{1}(l)C_{2}()` +
                (invest.level > 0 ? "I_{o}^{1.01}" : "") +
                "\\\\C_{1}(l) = max_{l}:[0,25,50,75,100,150]\\\\ \\rightarrow [1.03,1.05,1.07,1.09,1.11,1.13]^{l}\\\\C_{2}() = \\prod_{i=0}^{8}{TP[i]^{CT[i]}}}"
            );
            break;
        case 4://Cov
            let cp = " C_{v}";
            return (
                `\\color{#${eqColor[col]}}{B(2) \\leftarrow B(2)${cp}(\\sum_{i=0 \\: i\\neq 1}^{18}{P_{1}^{0.9}}{B[i]^{0.8}}${cp})^{${covDelta}${cp}^{0.45} + ${covExp}}}`
            );
            break;
        case 5://Ygg + Chronos
            theory.secondaryEquationScale = 0.9;
            let ys = " Y_{g}"
            return `\\color{#${eqColor[col]}}{B(3) \\leftarrow 5(10^{10})B(3)P_{3}^{1.175 + 0.05${ys}}(B[6]+B[2])^{3.2 + 0.2${ys}^{0.9}}(1+t)^{1.4}${(ChronosAge.level > 0)?`\\\\ B(i) \\leftarrow B(i)(1+t^{0.5}), \\quad i \\neq 2`:``}}`;
            break;
        case 6://Terra
            let tr = " T_{r}";
            let tf = " T_{\\infty}";
            let tm = " T_{m}"
            return `\\color{#${eqColor[col]}}{${tm} = 1500${tr}^{2.5+0.05${tf}}\\\\T = \\frac{1+${tm}^{1+0.005${tf}}-${tm}^{0.99999-0.01${tf}}}{1+e^{-(t-(X_{b}+300${tr}))}}}`;
            break;
        case 7://Recom
            let rc = " R_{c}";
            return `\\color{#${eqColor[col]}}{\\dot{H} = H^{0.9}(${rc})\\\\ \\dot{L} = 0.01${rc}\\\\ B(4) \\leftarrow B(4)10^{54}1.9^{${rc}-1}}`;
            break;
    }
}