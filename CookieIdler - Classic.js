import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
//This is the classic version of the thoery that I'm working on. Contains the 10th logarirhm of the current version of the theorem. Extraordinarly unbalanced with a not so off chance of divergence.
//I won't be fixing this theory unless the theory TRULY breaks

var id = "CookieIdlerC";
var name = "Cookie Idler Classic";
var description =
  'A ungodly large mess and nonmathematical of a theory involving copius amounts of cookies, tau, and other stuffs (NOT grandmas). A BIG credits to Orteil for bringing such a legendary game idea to life.\nThis "theory" contains: All Cookie Clicker Buildings, a looot of upgrades, a loot of achievements, no scary maths, and [DATA EXPUNGED], not thousands of lines of raw text because I\'m too lazy to encrypt it, bad JS coding, and e150 tau!';
var authors = "Sainen Lv.420";
var version = 1;

//UtilVariables
var nccps;
let CPS = BigNumber.ZERO;
let arrcps = new Array(19);
//let cpsqs = new Array (19); COMING SOON
const lumpc = 5000;
const buip = 1.02;
const buiexp = 0.05;
//Primary Vairables
var cookie, hc, lump;
//Buildings
let building = new Array(19);
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
  "intresting ",
  "directing in ",
  "spwaning in ",
  "bringing in ",
  "transmuting ",
  "retrieving ",
  "preventing cookies from being eaten by ",
  "synthesizing ",
  "matterifying from light ",
  "lucking in",
  "duplicating in ",
  "hacking in ",
  "hijacking ",
  "thinking up ",
];
let baseCost = [
  15, 100, 1100, 12000, 130000, 1.4e6, 2e7, 3.3e8, 5.1e9, 7.5e10, 1e12, 1.4e13,
  1.7e14, 2.1e15, 2.6e16, 3.1e17, 7.1e18, 1.2e21, 1.9e24,
];
let bcps = [
  1, 2.5, 16, 47, 260, 1400, 7800, 44000, 260000, 1.6e6, 1e7, 6.5e7, 4.3e8,
  2.9e9, 2.1e10, 1.5e11, 1.1e12, 8.3e12, 6.4e13,
];
//Upgrades
var clickp; //Click Power relative to CPS
let clickpname = "Tougher Mouse";
let buildingUpgrade = new Array(19);
let buildingUpgradeName = [
  "Extra Finger",
  "Anti-Aging Cream",
  "Electrolytes and Acres",
  "Drilling Overclock",
  "Patent Publishing",
  "Increase Intrest Rates",
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
  "Instal Another Idle Game",
  "Get an extra IQ Point",
];
//Milestone Upgrade
let buildingExp = new Array(19);
//Achievements
let ca = new Array(25);
let cpsa = new Array(25);
//LORE
var chapter1, chapter2;

var init = () => {
  cookie = theory.createCurrency();
  hc = theory.createCurrency();
  lump = theory.createCurrency();

  ///////////////////
  // Regular Upgrades

  // All 19 Buildings
  for (let i = 0; i < 19; i++) {
    if (i == 0) {
      building[i] = theory.createUpgrade(
        i,
        cookie,
        new FirstFreeCost(new ExponentialCost(baseCost[i], Math.log2(1.15)))
      );
    } else {
      building[i] = theory.createUpgrade(
        i,
        cookie,
        new ExponentialCost(baseCost[i], Math.log2(1.15))
      );
    }
    let getInf = (index) => {
      let result = buildingName[index];
      if (building[index].level == 1) {
        result += " ";
      } else {
        result += "s ";
      }
      result +=
        buildingDesc[i] + arrcps[index].toString(10) + " cookies per second";
      return result;
    };
    building[i].getDescription = () => buildingName[i];
    building[i].getInfo = () => getInf(i);
  }

  /////////////////////
  // Permanent Upgrades
  theory.createPublicationUpgrade(0, cookie, 1e12);
  theory.createBuyAllUpgrade(1, cookie, 1e15);
  theory.createAutoBuyerUpgrade(2, cookie, 1e28);
  {
    clickp = theory.createPermanentUpgrade(
      3,
      cookie,
      new ExponentialCost(1000, Math.log2(10))
    );
    clickp.getDescription = () => clickpname;
    clickp.getInfo = () => "Improves how much more the cursor clicks";
  }
  for (let i = 0; i < 19; i++) {
    buildingUpgrade[i] = theory.createPermanentUpgrade(
      4 + i,
      lump,
      new LinearCost(1, 1)
    );
    buildingUpgrade[i].getDescription = () => buildingUpgradeName[i];
    buildingUpgrade[i].getInfo = () => 
      "Improves " + buildingName[i] + " by a factor of " + buip.toString(10);
  }
  ///////////////////////
  //// Milestone Upgrades
  theory.setMilestoneCost(new LinearCost(10, 10));
  for (let i = 0; i < 19; i++) {
    buildingExp[i] = theory.createMilestoneUpgrade(i, 5);
    buildingExp[i].description = Localization.getUpgradeIncCustomExpDesc(
      buildingName[i],
      buiexp.toString(10)
    );
    buildingExp[i].info = Localization.getUpgradeIncCustomExpInfo(
      buildingName[i],
      buiexp.toString(10)
    );
  }

  /////////////////
  //// Achievements

  ///////////////////
  //// Story chapters

  updateAvailability();
};

var updateAvailability = () => {
  //something related to milestone upgrades
};

var tick = (multiplier) => {
  CPS = BigNumber.ZERO;
  for (let i = 0; i < 19; i++) {
    arrcps[i] =
      building[i].level * bcps[i] * Math.pow(buip, buildingUpgrade[i].level);
    CPS += arrcps[i];
  }
  theory.invalidateSecondaryEquation();
  let bonus = theory.publicationMultiplier;
  cookie.value += bonus * CPS * BigNumber.from(0.1);
  if (Math.random() <= 1 / (lumpc / Math.log10(cookie.value))) {
    lump.value += BigNumber.ONE;
  }
};
const height = 55;
var getPrimaryEquation = () => {
    theory.primaryEquationHeight = height;
    let result = "CPS = \\sum_{i=0}^{18}{C_{i}B_{i}}";
    return result;
}
var getSecondaryEquation = () =>
  theory.latexSymbol + "=\\max\\rho" + " \\quad " + "CPS = " + CPS.toString(10);
var getPublicationMultiplier = (tau) => tau.pow(0.25);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{0.25}";
var getTau = () => cookie.value;
var get2DGraphValue = () =>
  cookie.value.sign * (BigNumber.ONE + cookie.value.abs()).log10().toNumber();

init();
