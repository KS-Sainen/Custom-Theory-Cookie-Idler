import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";
import { UI } from "./api/ui/UI";
import { Game } from "./api/Game";
//Hello to the person reading this "code"
//Spoilers alert for ALL of the upgrades, buildings and achievements
//Before leaving, please try and find any bugs or bad JS coding practices for me

//Some parameters
//If you're wondering why the refund button doesn't appear, please refer to line 646 and you would know something's up

var id = "CookieIdler";
var name = "Cookie Idler";
var description =
  "A ungodly large mess and nonmathematical of a theory involving copius amounts of cookies, tau, and other stuffs (NOT grandmas). A BIG credits to Orteil for bringing such a legendary game idea to life, elipsis for suggesting ideas for the UI; and skyhigh173#3120 for reformatting the code so it looks better.\nThis \"theory\" contains: All Cookie Clicker Buildings, a looot of upgrades, a loot of achievements, no scary maths, [DATA EXPUNGED], not thousands of lines of raw text because I\'m too lazy to encrypt it, bad JS coding, and e150 tau!\nWARNING : In ALL Circumstances, DO NOT attempt to purchase level 4 of the cookie tin upgrade, doing so may crash your game INSTANTLY(hang in there until you can afford level 5)";
var authors = "Sainen Lv.420 #2684";
//Improvement : sky
var version = 1.1;






//States (And thus begins the spoilers)
let achCount = 0;
let vizType = 0;
let lumpTotal = 0;
let eqType = 0
var getInternalState = () =>`${achCount} ${vizType} ${lumpTotal} ${eqType}`;
var setInternalState = (state) =>{
	let res = state.split();
	if(res.length > 0){
		achCount = parseInt(res[0]);
	}
	if(res.length > 1){
		vizType = parseInt(res[1]);
	}
	if(res.length > 2){
		lumpTotal = parseInt(res[2]);
	}
	if(res.length > 3){
		eqType = parseInt(res[3]);
	}
};


//End States

//UtilVariables
let nccps = BigNumber.ZERO;
let CPS = BigNumber.ZERO,HPS=BigNumber.ZERO,LPS=BigNumber.ZERO;
let arrcps = new Array(21);
let time = BigNumber.ZERO;//degrees
//let cpsqs = new Array (19); COMING SOON
const lumpc = 5000;
const buip = 1.1;
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
  11, 1e3, 1.1e5, 1.2e8, 1.3e12, 1.4e18, 2e25, 3.3e50, 5.1e75, 7.5e100, 1e125, 1.4e150,
  BigNumber.from("1.7e180"), BigNumber.from("2.1e215"), BigNumber.from("2.6e260"), BigNumber.from("3.1e300"), BigNumber.from("7.1e350"), BigNumber.from("1.2e400"), BigNumber.from("1.9e500"),
];
//Ideally, 1/100 base
let bcps = [
  7, 310, 5.3e4, 7.4e7, 4.05e10, 1.4e12, 5.8e17, 4.4e32, 2.6e39, 5.6e51, 6.66e60, 6.5e74, 3.15e85,
  BigNumber.from("4.9e97"), BigNumber.from("2.1e160"), BigNumber.from("1.5e170"), BigNumber.from("1.1e185"), BigNumber.from("8.3e200"), BigNumber.from("6.4e250"),
];
//Types of Cookies
var cookieT;
const basect = 2.2e6;
const ctr = Math.log2(2700);
var getCookieP = (level) =>{
	let res = BigNumber.ONE;
	if(level >= 150){
		res = (BigNumber.from(1.13)).pow(level);
	}else if(level >= 100){
		res = (BigNumber.from(1.11)).pow(level);
	}else if(level >= 75){
		res = (BigNumber.from(1.09)).pow(level);
	}else if(level >= 50){
		res = (BigNumber.from(1.07)).pow(level);
	}else if(level >= 25){
		res = (BigNumber.from(1.05)).pow(level);
	}else{
		res = (BigNumber.from(1.03)).pow(level);
	}
	for(let i=0;i<cookieTinName.length;i++){
		res *= (BigNumber.from(cookietP[i])).pow(cookiet[i].level);
	}
	if(CookieS.level != 0)res *= (BigNumber.TWO + lump.value).log2().pow(2);
	if(CookieH.level != 0)res *= (BigNumber.TEN + hc.value).log10().pow(1.5);
	if(CookieC.level != 0)res *= (BigNumber.TEN + cookie.value).log10();
	if(DivineD.level != 0)res *= BigNumber.TWO.pow(DivineD.level);
	res *= BigNumber.from(1.01).pow(invest.level);
	return res;
};
let cookieType = ["Plain Cookie","Chocolate Chip Cookie","Sugar Cookie","Oatmeal Rasin Cookie","Peanut Butter Cookie","Coconut Cookie","Almond Cookie","Hazelnut Cookie","Walnut Cookie","Cashew Cookie","White Chocolate Cookie","Milk Chocholate Cookie","Macadamia Cookie","Double Chip Cookie","White Chocolate Macadamia Cookie","All-Chocolate Cookie","Dark-Chocolated Coated Cookie","White-Chocolate Coated Cookie","Eclipse Cookie","Zebra Cookie","Snickerdoodle","Stroopwafel","Macaroon","Madeleine","Palmier","Palets","Sables","Pure Black Chocolate Cookie","Pure White Chocolate Cookie","Ladyfingers","Tullies","Checker Cookie","Butter Cookie","Vanilla Cream Cookie","Gingersnap","Cinnamon Cookie","Vanity Cookie","Pinwheel Cookie","Shortbread Biscuits","Millionare\'s Shortbread","Caramel Cookie","Pecan Sandies","Moravian Spice Cookie","Anzac Biscuit","Whole Grain Cookie","Candy Cookie","Big Chipped Cookie","Spinkled Cookie","Anti-Idle Cookie","Florentine","Chocolate Crinkles","Zero-Idle Cookie","Maple Cookie","Persian Rice Cookie","Norwegian Cookie","Crispy Rice Cookie","Ube Cookie","Butterscotch Cookie","Speculaas","Chocolate Oatmeal Cookie","Molasses Cookie","Biscotti","Waffle Cookie","Custard Cream Cookie","Bourbon Biscuits","Mini-Cookie","Whoopie Pies","Caramel Wafer Biscuits","Chocolate Chip Mocha Cookie","Earl Grey Cookie","Chai Tea Cookie","Myanmar Tea Cookie","Thai Tea Cookie","Corn Syrup Cookie","Icebox Cookie","Graham Cracker","Hardtack","Tofu Cookie","Gluten-Free Cookie","Lebkuchen","Aachener Printen","Canistrelli","Petit Beurre","Nanaimo Bars","Berger Cookie","Chinsuko","Putri Salju","Milk Cookie","Kruidnoten","Marie Biscuits","Meringue Cookie","Yogurt Cookie","Thumbprint","Pizzelle","Granola Cookie","Ricotta Cookie","Roze Koeken","Peanut Butter Cupe Cookie","Sesame Cookie","Vanillekipferl","Battenberg Biscuits","Rosette Cookie","Gangmakers","Welsh Cookie","Raspberry Cheesecake Cookies","Bokkenpootjes","Fat Rascals","Ischler Cookies","Matcha Cookie","Super Fusion Cookie","Spicy Cookie","Kolachy Cookie","Gomma Cookie","Coyotas","Frosted Sugar Cookie","Marshmallow Sandwich Cookie","Chocolate Chip Covered Chocolate Chip Cookie","Super Idler Flavored Cookie"];
const defaultcookieType = "Exotic Undefined Cookies";
const cookieInf = "Increases overall CPS by making your cookie taste better.";

//GRANDMA - Covenant Upgrade (Shipment -> Alchemy Lab)
var covenant;
const covExp = 5.1;
const covDelta = 0.7;
const covEq = "B_{2} *=  \\sum_{i=0 \\: i\\neq 1}^{18}{P_{2}}{C_{i}}^{"+BigNumber.from(covExp).toString(1)+" + COV_{L}}"; 
//FARM - Yggdrasil
var ygg;
const yggName = "Yggdrasil";
const yggInfo = "Empower your farms with the power of time and cookie ancients";
//MINE - Terra
var terra;
const terraName = "Mass Terraforming";
const terraInfo = "Unlocks/Improves a buff that temporarily boosts your CPS by a lot";
//FACTORY - Recombobulators
var recom;
const recomName = "Recombobulators";
const recomInfo = "Produces a constant stream of all currencies! What a dream!";
//BANK - Investment
var invest;
const investName = "Investment Openings";
const investInfo = "Open your very own investments forms. Grants 5 buildings of random type and a flat 1.01 CPS boost!(chance of failure included)";
//Visualizer
var viz;
const vizTypeM = 1;
const vizID = 99000;
const vizName = ["Classic","Milk"];

//Upgrades
var clickp; //Click Power relative to CPS
let clickpname = "Tougher Mouse";
let buildingUpgrade = new Array(19);
let buildingPower = new Array(19);
let buildingP = new Array(19);
let buildingPMax = [
1000,1000,1000,1000,1000,1000,
1000,1000,1000,1000,1000,1000,
1000,900,800,750,500,500,250
];
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
let buildingUpgradeMult = [250,4,100,150,100,79,55,34,17,9,8,5,3,2,2,2,2,2,2,2];
var kitty;
const kittyID = 69420;
let kittyName = ["Helper Kittens","Worker Kittens","Engineer Kittens","Overseer Kittens","Manager Kittens","Accountant Kittens","Specialist Kittens","Expert Kittens","Consultant Kittens","Assistants to the Regional Kittens","Marketeer Kittens","Analyst Kittens","Kitten Executive","Senior Kitten Executive","The meowy boss"];
let kittyDName = "Very Chawwtic Kitty";
let kittyExp = Math.log2(9750);
let kittyCost = 75000;
var kittyPower = (level) =>{
	let ret = 1;
	if(level >= 50){
		ret += (level-49) * 0.3;
	}
	if(level >= 25){
		ret += (level-24) * 0.25;
	}
	if(level >= 10){
		ret += (level-9) * 0.2;
	}
	ret += level * 0.15;
	return ret;
};

//HC Upgrade
var cookieTin,CookieH,CookieR,CookieS,CookieC,DivineD,CookieTau,ResidualLuck,TerraInf,TwinGates,ConjureBuild,ChronosAge;
let cookieTinInfo = "Heavenly cookies that boosts your CPS more than normal cookie.";
let cookieTinName = ["Box of Macarons","Tin of Butter Cookies","Tin of British Tea Biscuits","Box of Brand Biscuits","Box of 100% Pastries","Box of Cookie?","Box of Cookien'\t","Crate full of Exponential Idle Community References","The creator\'s inside jokes Box","Pack of Exotic Cookies"];
let cookieHName = "Heavenly Cookie";
let cookieHInfo = "You gain more CPS the more HC you have";
let cookieRName = "[REDACTED] Cookie";
let cookieRInfo = "A very [REDACTED] cookie that [DATA EXPUNGED]";
let cookieSName = "Sugar Crystal Cookie";
let cookieSInfo = "This cookie gets tastier the more sugar you have";
let cookieCName = "Cookie Cookie";
let cookieCInfo = "This cookie increases CPS by the amount of cookies you own";
let divineDName = "Divine Doubling";
let divineDInfo = "Doubles your CPS";
let cookieTauName = "Tauonium Cookie";
let cookieTauInfo = "An experimental type of antimatter-based cookie that is based on tau";
let residualLuckName = "Distilled Residual Essence of Luck";
let residualLuckInfo = "You have an extremely low chance of getting another level of building for free";
let terraInfName = "Terra-Infinity";
let terraInfInfo = "Using the your devotion, the gods grant you an everlasting source of cookieverse materials";
let twingateName = "Twin Gates of Transcendence";
let twingateInfo = "Unwind the secrets of heveanly chips to empower your empire";
let conjurebuildName = "Blessing of the Capital";
let conjurebulidInfo = "Blessed with the money power, you investments rewards gets higher";
let chronosageName = "Chronos Ageing";
let chronosageInfo = "Transmute the power of yggdrasil to all your buildings";

//Conseq. HC Upgrade
var cookiet = new Array(9);
var cookietP = [1.15,1.25,1.35,1.5,1.5,1.75,1.75,2,2.25,2.5];
var cookietB = [1.5e17,1.5e32,1.5e47,1.5e65,BigNumber.from("1.5e83"),BigNumber.from("1.5e101"),BigNumber.from("1.5e119"),BigNumber.from("1.5e137"),BigNumber.from("1.5e155"),BigNumber.from("6e175")];
var cookietName = [
["Basic Macaron","Rose Macaron","Lemon Macaron","Chocolate Macaron","Pistachio Macaron","Hazelnut Macaron","Violet Macaron","Caramel Macaron","Licorice Macaron","Earl Grey Macaron"],["Butter Horseshoe","Butter Pucks","Butter Knots","Butter Swirls","One Million Square Inches Butter per Cookie","Slab of Pure Butter","French Pure Butter Cookie"],
["Empire Biscuits","British Tea Biscuits","Chocolate British Tea Biscuits","Round British Tea Biscuits","Round Chocolate Tea Biscuits","Round British Tea Biscuits with Heart Motif","Round Chocolate British Tea Biscuits with Heart Motif","Big Ben Cookie"],
["Caramoas","Sagalogs","Shortfoils","Win Mints","Fig Gluttons","Loreols","Jaffa Cake","Grease\'s Cups","Digits","Lombardia Cookies","Bastenaken Cookies","Festivity Loops","Havabreaks","Zilla Wafers","Dim Dams","Pokey"],
["Cheesecake","Profiteroles","Panettone","Cinnamon Bun","Jelly Donut","Glazed Donut","Chocolate Cake","Pies","Croissant","Pain Au Chocolat","Focaccia","Taiyaki","Phyllo","Samarkand Bread"],
["Cookie Dough","Cookie Dough(No Salmonella)","Burnt Cookie","A normal chocolate chip cookie but there\'s no chips at all for some reason","4K Cookie","Ray-Traced Cookie","Crackers","Deep-Fried Cookie","Flavor Text Cookie"],
["Toast","Marshmellows","PB amd J","Wookies","Cheeseburger","Beesechurger","One lone chocolate Chip","Pizza","Candy","Brownies","Flavor text Food that is not cookie","Fudge"],
["Gilles-Cookie Paille","liver","Mathmatically Illegal Cookie","! [ Snakey Snickerdoodles ] !","Nerdy as f Cookie",":exCookie:","JS-Formed ellipsis Cookie","SkyXCookie","Weierstra🅱️ Cookie Spiral", "Exponential Cookie"], //just added one
["Gigaloopite","Tetraloopite","Enium Cookie","Orate Cookie","Dxygen Cookie","IUSpawn Cookie"],
["Mutated Cookie","Magic Marbled Cookie","Shortcake-like Cookie","Truffle Cookie","Salt Pretzels","Seaweed Sesame Cookie","Dulce De Leche","Keylime Pie","S\'Mores","Chocolate Drizzle Cookie","Peppermint Kiss Cookie","Sprinkled Jelly Cookie","Galaxial Drop","Reflective Frosted Cookie","Pecan Walnut Cookie","White Mine Cookie","Jelly Triangle","Gold Leafed Cookie","Grand Chocolate Wafer Sprinkles"]
];
//Want your self insert? DM me your very own cookie name and I might add it!

//Milestone Upgrade
let buildingExp = new Array(19);

//Achievements
let ca = new Array(25);
let caName = ["Wake and Bake",
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
"I think it\'s safe to say you\'ve got it made",
"Horn O\' Plenty",
"Hypersize me",
"Overdrive",
"There's nothing else other than my pleasure with cookies",
"Naught as slowing down",
"Idleborn",
"I cookie, therefore I am",
"Closing the end",
"How?",];
var cookiesAchievement,CPSAchievement;
const cookiesAchievementCatName = "Cookies Baked";
let caReq = [1,3,6,12,25,
50,75,100,125,150,
175,200,250,300,350,
400,450,500,550,600,
650,675,700,725,750];
let cpsa = new Array(26);
let cpsaName = [
"Casual Bakedling",
"Hardcore Bakedling",
"Cookie Vortex",
"Cookie Monster",
"Let\'s bake some more",
"The world full with cookies",
"Fast and Delicious",
"Cookiehertz : a really, really tasty hertz",
"Baking cookies but really really really REALLY REALLY REALLY FAST",
"Turbopuns",
"Still hungry for more?",
"The Abakening",
"The Antidisestablishmentarianbakeningism",
"Knead for speed 2 : Fast and Doughrious",
"Well the cookies start coming and they don\'t stop coming",
"The proof of cookie is in the baking",
"What did we even eat before these",
"Keep going until I say stop",
"Green cookies sleep furiously",
"Go ahead, try to comprehend the sheer amounts",
"The problem of being faster than light is that you can onlly live in cookies",
"Blazing Flamin\' Bakery",
"A cookie is a baked or cooked snack or dessert that is typically small, flat and sweet. It usually contains flour, sugar, egg, and some type of oil, fat, or butter. It may include other ingredients such as raisins, oats, chocolate chips, nuts, etc. In most English-speaking countries except for the United States, crunchy cookies are called biscuits. Many Canadians also use this term. Chewier biscuits are sometimes called cookies even in the United Kingdom. Some cookies may also be named by their shape, such as date squares or bars.",
"Someone go stop him, he\'s TOO FAST AAAAAAAAAAAAAAAAAAAAAAAA",
". . . dot dot dot . . .",
"Cookie Idler Speedrun pubMult-100% 1 tick[0.1s] WR|SR|PB",
];
let cpsaReq = [1,2,5,11,24,
49,75,100,125,150,
175,200,225,250,275,
300,350,400,450,500,
550,600,650,700,725,751];
var lumpAch = new Array(10);//10 tiers
var lumpAchCat
let lumpAchName=[
"Dude, Sweet",
"Caramelized",
"Sugar Rush",
"Sugar Sugar",
"Type 1 Diabetes, ah ah ah",
"TYPE 2 Diabetes, ah ah ahhh",
"I love cavities",
"Sweetness Overload!!!!",
"Scrumptiosllionare",
"Congratz on having enough Sugar that you don\'t even need it anymore!"
];
let lumpAchReq=[1,10,50,100,500,1000,10000,100000,1000000,7795400];
//Misc.
var otherAch;
//LORE
var chapter = new Array(16);
let chapterName = ["Wake and Bake",
"Grandma and her cats",
"Knead for Speed",
"Worshippers",
"Beyond the Vanilla Cosmos",
"Polymaterial Morphology",
"Dimensionalize Cookie Breakdown",
"To consume or not to consume",
"Chocolate just isn\'t enough",
"Spectroscopy",
"Existence beyond logic",
"Are you going deep enough?",
"Realitarium Engineering",
"Greedy",
"Effortless",
"Counter Conclusion"
];
let chapterLore = ["As a newly graduated student from the Gilles Academy with a penchant for cookies\nYou stumbled upon a peculier metallic box\nOn its side there are a display displaying 0/750. On the top there\'s a big red button on it. Finally on the bottom inscribes G to which you can\'t figure the significance out of.\nYou\'re compelled to press this button, though you don\'t know why.\nMaybe you could use something to click for you...",
"As you produced more and more cookies, the display seemingly slows down to 3/750, staying there for quite a while\nYou posted a flyer hiring people to bake cookies for you\nA few days later, a grandma comes knocking at your door\nYou let her in, and she starts to bake cookies for you, in return of her getting a set amount of your cookies\nBut that\'s not the only person that comes inside\nOn the far corner you heard a faint sound of cats purring for milk...",
"The cookies are pililing up, but the display won\'t budge furhter than 12\nThen, a new button emerges from the underside, labelling \'Publish\'\nYou\'re tempted to press it, but the display warns you about resetting in exchange for even a greater amount of cookies...",
"1e25 cookies, that\'s 25/750\nThe far reaches of your cookies spread far and wide\nYou notices certain groups of people are beginning to worship cookies\nSo you built a temple for them\nHopefully the prayers to the cookie god would satisfy them enough to zap even more cookies in...",
"Resources are finite, and you\'re coming up close to the limit of planet Earth\nUsing your gains from your banks, you set out to fund for a space project, in hopes of getting more resources for your ever growing desire for cookies\nIt\'s one of the dreams of the many to explore the world beyond us\nThe vast world, limitless combinations of everything possible by physics\nYou\'d really like it if some of them are all made out of cookies...\nBut the restless G grows",
"Wandering around landfills, it\'s a place full of useless refuse human throws out\nWhy bother looking far and wide when there\'s always something to find near us\nYou comissoined your scientists from the space program to assist in changing the non-cookie into cookies\nEven with the hardest of matter to change, it can always be fed into cookies.\nJust let the mother nature take care of the rest...",
"What naive thoughts do they think that the universe is the limit?\nCountless worlds exist beyond us, in perpetual chaotic world of infinte universes\nA place where laws and observation holds meaningless\nAt no sign, a red dimensional rift appears inside one of your cookie piles\nIt caused quite big damages to your cookie count, but your assistants have pointed out that the world is called \'Cookieverse\', a very dangerous place full with unimaginable monsters and indescriable topology\nExploring this place sure looks to be dangerours, but for some reason the other world is all cookies\nYou quickly hopped in the chance to rob the world of cookies, slaying monsters, mass terraforming the place you name it!",
"They said that time can\'t be stopped nor reversed\nYou, a young person decided to go against it\nFrom all the exploitation you made in the Cookieverse\nThey found a very chaotic piece of cookie ore that seems to warp and distort itself\nYour assistants determined it was the time continuum that the ore is messing with\nIn hopes of getting cookies thourgh time itself, you assigned the scienst to break the law of time.",
"18\n18 types of elementary particles\nNow there\'s 19 of them\nBut that\'s still 18 left to turn into cookies\nYou decided to comission the largest of the largest of particle accelerators to convert those particles into cookie particles\nYou gonna leak a lot of money for this, so you made the world dependent of cookies.",
"How long has it been since you last saw the light of the day?\nYou went outside(and touched grass), only to find the sun instantly making you sweat bullets\nComing back into your den(grand office) you looked into the mirror and find yourself splattered with cookies\nIt seems that light itself is being turned into cookies as well\nMight just as well focus all of them into a big burst of cookies\nAnd in the meantime spray a bit of radiance to those worshippers as well",
"POOF! and there goes nothing!\nYou just saw one of your cookie disappear into nothingness\nThen you saw a black cat in the corner of your vision again\nIn a panic, you hastily read though the book on symbolisms, and found out that black cat means bad luck\nWith your amounts of cookies, fearing that it might all be GONE the next day,\nYou improvised up a device from that book that would apprantly bring in good luck to your entire existence\nAnd your local spellcasters might take an intrest in that too",
"Does your cookie look empty?\nI know that might sounds like nonsense but how much of the matter is really matter\nUsing your sheet amount of knowledge you got from working with your past projects\nYou somehow managed to convert mattern\'t to matter and the cookie just splits into a whole lot more cookies\nPresenting the plan, you assigned the engineers to work on standardizing the deviced used to convert mattern\'t to matter, although the material used might have been too exotic",
"Having lost your mind being overwhelmed with the thoughts of cookie\nYou went out on a ramage with your cookies, tearing down any and all signs of resistance, even the fabric of reality itself\nYou went mad, in search of something you can use to bend reality\nOne of the madness you did is parting some poor soul(Orteil?) of their laptop\nOn the laptop there\'s a console with the word \'Javascript\' written on it\nYou of course, politely pressued the programmers into decipher the complicated syntax of \'Javascript\'",
"I love cookies, why don\'t we slave other idle games to produce cookies for us",
"Nothing stops you anymore\nNot even getting the counter to 750(it\'s now 500/750)\nIn one of the everlasting days at the Cookie Megacorporation...\nYou managed to manifest your desire of cookies out of thin air\nSeeing this opportunity, you just cleared your way though the legal system to get some subjects to perform something on\nIt was a success, seeing them thinking up cookies out of thin air\nWhy bother with all your buildings when you can just think up cookies...",
"The counter hit 750, and the sky immediately turned itself red...\n(To be continued)"
];
var checkChapter = (c) =>{
	if(c==0)return cookie.value >= BigNumber.ZERO;
	else if(c==1)return building[1].level >= 1;
	else if(c==2)return cookie.value > BigNumber.from(1e12);
	else if(c==3)return building[6].level >= 1;
	else if(c>=15)return (cookie.value) >= BigNumber.from("1e750");
	else return building[c+4].level >= 1;
	
};
//All Secondary Equations
//1.Building CPS, 2.P formula, 3.Milk, 4.Cookie Power, 5.Covenant, 6.Yggdrasil, 7.Terra

var init = () => {
  cookie = theory.createCurrency("C","C");
  hc = theory.createCurrency("H","H");
  lump = theory.createCurrency("L","L");

  ///////////////////
  // Regular Upgrades

  //Tasty Cookies
	{
	  cookieT = theory.createUpgrade(0,cookie,new ExponentialCost(basect,ctr));
	  cookieT.getDescription = (_) => {if(cookieT.level > cookieType.length){return defaultcookieType}else{return cookieType[cookieT.level]}};
	  cookieT.getInfo = () => cookieInf;
	  cookieT.bought = (amount) => calcCPS();
	}
	//Heavely Tasty Cookie
	{
		for(let i=0;i<cookieTinName.length;i++){
			cookiet[i] = theory.createUpgrade(1000100+i,cookie,new ExponentialCost(cookietB[i],Math.log2(8775)));
			cookiet[i].maxLevel = cookietName[i].length;
			cookiet[i].getDescription = () => {
				if(cookiet[i].level >= cookiet[i].maxLevel){
					return cookietName[i][cookietName[i].length - 1];
				}else{
					return cookietName[i][cookiet[i].level];
				}
			};
			cookiet[i].getInfo = () => "Some nice Heavenly Cookies to boost CPS even more";
			cookiet[i].bought = (amount) => calcCPS();
		}
	}
	//Kitty
	{
		kitty = theory.createUpgrade(kittyID,cookie,new ExponentialCost(kittyCost,kittyExp));
		kitty.getDescription = (_) => {
			if(kitty.level > kittyName.length){
				return kittyDName;
			}else{
				return kittyName[kitty.level];
			}
		}
		kitty.getInfo = () => "You gain more CPS the more kittens you have";
		kitty.bought = (amount) => calcCPS();
	}
	//Grandma's Covenant
	{
		covenant = theory.createUpgrade(10001,cookie,new ExponentialCost(1e65,Math.log2(1e15)));
		covenant.getDescription = (_) => "Grandmother\'s Covenant";
		covenant.getInfo = () => "Synergyzing Grandmas together to boost their CPS depending on the buildings owned";
		covenant.maxLevel = 25;
		covenant.bought = (amount) => calcCPS();
	}
	//Yggdrasil
	{
		ygg = theory.createUpgrade(10002,cookie,new ExponentialCost(1e110,Math.log2(1e25)));
		ygg.getDescription = () => yggName;
		ygg.getInfo = () => yggInfo;
		ygg.maxLevel = 5;
		ygg.bought = (amount) => calcCPS();
	}
	//Terra
	{
		terra = theory.createUpgrade(10003,cookie,new ExponentialCost(1e130,Math.log2(1e10)));
		terra.maxLevel = 10;
		terra.getDescription = () => terraName;
		terra.getInfo = () => terraInfo;
		terra.bought = (amount) => getEquationOverlay();
	}
	//Recombobulators
	{
		recom = theory.createUpgrade(10004,cookie,new ExponentialCost(1e170,Math.log2(1e5)));
		recom.maxLevel = 50;
		recom.getDescription = () => recomName;
		recom.getInfo = () => recomInfo;
		recom.bought = (amount) => calcCPS();//+e65, then +e3
	}
	//Investment
	{
		invest = theory.createUpgrade(10005,cookie,new ExponentialCost(1e190,Math.log2(1.05)));
		invest.getDescription = () => investName;
		invest.getInfo = () => investInfo;
		invest.bought = (amount) => {
			let rand = 0;
			if(amount > 99){
				for(let i=0;i<Math.round(Math.pow(amount,0.5));i++){
					rand = Math.round((25 + invest.level/250) * Math.random());
					if(rand <= 18 && building[rand].level > 0){
						building[rand].level += 5+ConjureBuild.level+(Math.round(Math.pow(amount,0.5)));
					}
				}
			}else{
				for(let i=0;i<amount;i++){
					rand = Math.round((25 + invest.level/250) * Math.random());
					if(rand <= 18 && building[rand].level > 0){
						building[rand].level += 5+ConjureBuild.level;
					}
				}
			}
			
			calcCPS();
		}
		invest.maxLevel = 1000;
	}
  // All 19 Buildings
  for (let i = 0; i < 19; i++) {
    if (i == 0) {
      building[i] = theory.createUpgrade(
        1+i,
        cookie,
        new FirstFreeCost(new ExponentialCost(baseCost[i], Math.log2(1.15)))
      );
    } else {
      building[i] = theory.createUpgrade(
        1+i,
        cookie,
        new ExponentialCost(baseCost[i], Math.log2(1.15))
      );
    }
    building[i].getDescription = () => buildingName[i];
    building[i].getInfo = () => getInf(i);
	building[i].bought = (amount) => calcCPS();
  }

  /////////////////////
  // Permanent Upgrades
  theory.createPublicationUpgrade(0, cookie, 1e12);
  theory.createBuyAllUpgrade(1, cookie, 1e3);
  theory.createAutoBuyerUpgrade(2, cookie, 1e25);
  //Heavenly Upgrade
  {
	  cookieTin = theory.createPermanentUpgrade(1000000,hc,new ExponentialCost(25,Math.log2(1e6)));
	  cookieTin.getDescription = () => cookieTinName[(cookieTin.level==cookieTinName.length)?cookieTinName.length - 1:cookieTin.level];
	  cookieTin.getInfo = () => cookieTinInfo;
	  cookieTin.maxLevel = cookieTinName.length;
  }
  {
	  CookieH = theory.createPermanentUpgrade(1000001,hc,new ConstantCost(500));
	  CookieH.getDescription = () => cookieHName;
	  CookieH.getInfo = () => cookieHInfo;
	  CookieH.maxLevel = 1;
	  CookieH.bought = (amount) => calcCPS();
  }
  {
	  CookieS = theory.createPermanentUpgrade(1000002,hc,new ConstantCost(15000));
	  CookieS.getDescription = () => cookieSName;
	  CookieS.getInfo = () => cookieSInfo;
	  CookieS.maxLevel = 1;
	  CookieS.bought = (amount) => calcCPS();
  }
  {
	  CookieC = theory.createPermanentUpgrade(1000003,hc,new ConstantCost(1e7));
	  CookieC.getDescription = () => cookieCName;
	  CookieC.getInfo = () => cookieCInfo;
	  CookieC.maxLevel = 1;
	  CookieC.bought = (amount) => calcCPS();
  }
  {
	  DivineD = theory.createPermanentUpgrade(1000004,hc,new ExponentialCost(1e10,Math.log2(1e10)));
	  DivineD.getDescription = () => divineDName;
	  DivineD.getInfo = () => divineDInfo;
	  DivineD.maxLevel = 25;
	  DivineD.bought = (amount) => calcCPS();
  }
  {
	  CookieTau = theory.createPermanentUpgrade(1000005,hc,new ConstantCost(1e25));
	  CookieTau.getDescription = () => cookieTauName;
	  CookieTau.getInfo = () => cookieTauInfo;
	  CookieTau.maxLevel = 1;
	  CookieTau.bought = (amount) => calcCPS();
  }
  {
	  ResidualLuck = theory.createPermanentUpgrade(1000006,hc,new ExponentialCost(1e40,Math.log2(1e5)));
	  ResidualLuck.maxLevel = 5;
	  ResidualLuck.getDescription = () => residualLuckName;
	  ResidualLuck.getInfo = () => residualLuckInfo;
  }
  {
	  TerraInf = theory.createPermanentUpgrade(1000007,hc,new ExponentialCost(1e55,Math.log2(1e10)));
	  TerraInf.getDescription = () => terraInfName;
	  TerraInf.getInfo = () => terraInfInfo; 
	  TerraInf.maxLevel = 7;
  }
  {
	  ChronosAge = theory.createPermanentUpgrade(1000008,hc,new ConstantCost(2.5e57));
	  ChronosAge.getDescription = () => chronosageName;
	  ChronosAge.getInfo = () => chronosageInfo;
	  ChronosAge.maxLevel = 1;
  }
  {
	  ConjureBuild = theory.createPermanentUpgrade(1000009,hc,new ExponentialCost(1e60,Math.log2(8)));
	  ConjureBuild.maxLevel = 3;
	  ConjureBuild.getDescription = () => conjurebuildName;
	  ConjureBuild.getInfo = () => conjurebulidInfo;
  }
  {
	  TwinGates = theory.createPermanentUpgrade(1000010,hc,new ConstantCost(1e65));
	  TwinGates.maxLevel=1;
	  TwinGates.getDescription = () => twingateName;
	  TwinGates.getInfo = () => twingateInfo;
  }
  //Cursor Upgrade
  {
    clickp = theory.createPermanentUpgrade(
      3,
      cookie,
      new ExponentialCost(1000, Math.log2(10))
    );
    clickp.getDescription = () => clickpname;
    clickp.getInfo = () => "Improves how much more the cursor clicks $(P_{cp})$";
	clickp.bought = (amount) => calcCPS();
  }
  //Building Power Upgrade
  const b50 = 1000;
  for (let i = 0; i < 19; i++) {
    buildingP[i] = theory.createPermanentUpgrade(
      4 + i,
      cookie,
      new ExponentialCost(b50*baseCost[i], Math.log2(b50))
    );
		buildingP[i].getInfo = (amount) => "$P_{" + i.toString(10) + "} \\: = $ \\:" + Utils.getMathTo(getPower2(i,buildingP[i].level).toString(0),getPower2(i,buildingP[i].level+amount).toString(0));
		buildingP[i].getDescription = () => "$P_{" + i.toString(10) + "}$ = " + getPower(i).toString(0);
		buildingP[i].bought = (amount) => calcCPS();
  }
  for (let i = 0; i < 19; i++) {
    buildingUpgrade[i] = theory.createPermanentUpgrade(
      33 + i,
      lump,
      new LinearCost(1, 1)
    );
    buildingUpgrade[i].getDescription = () => buildingUpgradeName[i];
    buildingUpgrade[i].getInfo = () => 
      "Improves " + buildingName[i] + " by a factor of " + buip.toString(10);
	buildingUpgrade[i].maxLevel = buildingPMax[i];
	buildingUpgrade[i].bought = (amount) => calcCPS();
	buildingUpgrade[i].canBeRefunded = (amount) => buildingUpgrade[i].level-amount >= 0;
  }
  ///////////////////////
  //// Milestone Upgrades
  theory.setMilestoneCost(new LinearCost(1.5, 1.5));
  for (let i = 0; i < 19; i++) {
    buildingExp[i] = theory.createMilestoneUpgrade(i, (i==2)?3:5);
    buildingExp[i].description = Localization.getUpgradeIncCustomExpDesc(
      buildingName[i],
      buiexp.toString(10)
    );
    buildingExp[i].info = Localization.getUpgradeIncCustomExpInfo(
      buildingName[i],
      buiexp.toString(10)
    );
	buildingExp[i].bought = (amount) => calcCPS();
  }

  /////////////////
  //// Achievements
	//Utils Achievement Checker
	var CheckAch1 = (i) => {
		if(Math.log10(cookie.value) >= caReq[i]){
			achCount++;
			calcCPS();
			return true;
		}else{
			return false;
		}
	};
	var CheckAch2 = (i) => {
		if(Math.log10(CPS) >= cpsaReq[i]){
			achCount++;
			calcCPS();
			return true;
		}else{
			return false;
		}
	};
	var CheckAch3 = (i) => {
		if(lumpTotal >= lumpAchReq[i]){
			achCount++;
			calcCPS();
			return true;
		}else{
			return false;
		}
	};
	//25 Layers of Cookies
	cookiesAchievement=theory.createAchievementCategory(0, cookiesAchievementCatName);
	var cookieADesc = (p) => {
		let result = "Reach e";
		result += BigNumber.from(p).toString(0);
		result += " cookies";
		return result;
	};
	for(let i=0;i<25;i++){
		ca[i]=theory.createAchievement(i,cookiesAchievement,caName[i],cookieADesc(caReq[i]),() => CheckAch1(i));
	}
	//26 CPS
	CPSAchievement=theory.createAchievementCategory(1,"Cookies Per Second");
	var CPSDesc = (p) => {
		let result = "Reach e" + BigNumber.from(p).toString(0) + " cookies per second without publication multipliers";
		if(p>=751){
			result += " finishing this theory in a single tick.";
		}
		return result;
	}
	for(let i=0;i<26;i++){
		cpsa[i]=theory.createAchievement(100+i,CPSAchievement,cpsaName[i],CPSDesc(cpsaReq[i]),() => CheckAch2(i));
	}
	//10 Lumps
	lumpAchCat=theory.createAchievementCategory(2,"Sugar Lumps");
	var lumpDesc = (p) => {
		let res = "Get a total of " + BigNumber.from(p).toString(0) + " sugar lump";
		if(p!=1){
			res+="s";
		}
		return res;
	}
	for(let i=0;i<10;i++){
		lumpAch[i]=theory.createAchievement(200+i,lumpAchCat,lumpAchName[i],lumpDesc(lumpAchReq[i]),() => CheckAch3(i));
	}
	//Misc.
	
  ///////////////////
  //// Story chapters
  for(let i=0;i<16;i++){
	  chapter[i] = theory.createStoryChapter(i,chapterName[i],chapterLore[i],() => checkChapter(i));
  }

  updateAvailability();
  calcCPS();
};

var updateAvailability = () => {
  //something related to milestone upgrades and building specific
	let BF = (num) => BigNumber.from(num);
	covenant.isAvailable = cookie.value >= BF(1e60);
	kitty.isAvailable = achCount >= 5;
	cookieT.isAvailable = building[3].level > 0;
	CookieH.isAvailable = hc.value >= BF(500);
	CookieS.isAvailable = hc.value >= BF(10000);
	cookieTin.isAvailable = hc.value >= BF(10);
	CookieC.isAvailable = hc.value >= BF(1e7);
	DivineD.isAvailable = hc.value >= BF(1e10);
	ResidualLuck.isAvailable = hc.value >= BF(1e38) && (CookieH.level + CookieS.level + CookieC.level >= 3);
	CookieTau.isAvailable = hc.value >= BF(1e20);
	ygg.isAvailable = cookie.value >= BF(1e100);
	terra.isAvailable = cookie.value >= BF(1e125);
	recom.isAvailable = cookie.value >= BF(1e155);
	invest.isAvailable = cookie.value >= BF(1e180);
	TerraInf.isAvailable = hc.value >= BF(1e50);
	TwinGates.isAvailable = ChronosAge.level > 0;
	ChronosAge.isAvailable = ygg.level > 0;
	ConjureBuild.isAvailable = invest.level >= 10;
	for(let i=0;i<cookieTinName.length;i++){
		cookiet[i].isAvailable = (cookieTin.level >= (i+1))&&(cookie.value > BigNumber.from(cookietB[i]));
	}
	for(let i=0;i<19;i++){
		if(i>=3)building[i].isAvailable = cookie.value >= baseCost[i-1];
		buildingP[i].isAvailable = building[i].level > 0;
		buildingUpgrade[i].isAvailable = building[i].level > 10;
		if(i>=3)buildingExp[i].isAvailable = building[i-1].isAvailable;
	}
};
//TODO : Move the ENTIRE CPS calculation elsewhere because calculating it per fucking tick is too fucking expensive, even for my standard
var calcCPS = () => {
	CPS = BigNumber.ZERO;
	nccps=BigNumber.ZERO;
	let bc = BigNumber.ZERO;
	milk=BigNumber.FIVE * achCount;
	HPS = BigNumber.from(hc.value).pow(0.5) * recom.level;
	LPS = recom.level * 0.01;
	let kp = kittyPower(kitty.level) * BigNumber.from((100+milk)/100);
	for (let i = 0; i < 19; i++) {
		let step1 = BigNumber.from(building[i].level) * BigNumber.from(getPower(i)) * BigNumber.from(bcps[i]);
		arrcps[i] = (step1 * kp * (BigNumber.from(buip).pow(buildingUpgrade[i].level))).pow(getExpn(i));
		//arrcps[i]=BigNumber.from("1e180");
		if(i==2 && ygg.level!=0 && time>BigNumber.ZERO)arrcps[i]*=BigNumber.from(getPower(i)).pow(1.6 + 0.1*ygg.level) * BigNumber.from(building[6].level + building[2].level).pow(ygg.level*0.2 + 3.2) * (BigNumber.ONE + BigNumber.from(time).pow(1.4));
		
		if(i==4 && recom.level > 0){
			arrcps[i]*=(recom.level > 1)?BigNumber.from(1e54) * (recom.level-1)*BigNumber.from(1e2):BigNumber.from(1e54);
		}
		if(CookieTau.level > 0){
			arrcps[i]*=(game.tau).log10().log10().pow(2);
		}
		if(ChronosAge.level > 0)arrcps[i]*=(BigNumber.ONE + BigNumber.from(time).pow(1.25));
		
		if(i!=0){
			nccps+=arrcps[i];
		}
		if(i!=1){
			bc+=building[i].level * getPower(1);
		}
	}
	nccps-=arrcps[1];
	arrcps[0]+=BigNumber.from(clickp.level) * bcp * nccps * bcps[0] * Math.pow(buip, buildingUpgrade[0].level);
	if(covenant.level != 0)arrcps[1]*=(bc).pow((BigNumber.from(covenant.level).pow(0.5)*covDelta) + covExp)*covenant.level;
	nccps+=arrcps[1];
	CPS=(arrcps[0] + nccps)*getCookieP(cookieT.level)*((TwinGates.level > 0)?((hc.value).pow(0.05*TwinGates.level)):1);
};

var tick = (multiplier) => {
	if(time==0){calcCPS();calcCPS();}
	let bonus = theory.publicationMultiplier;
	
	cookie.value += (bonus * CPS * Logistic()) / BigNumber.from(0.1);
	
        //Sugar Lump Incremental
	hc.value += HPS/10;
	if(cookie.value > 1e50){
		let lwC = Math.wfloor(cookie.value.log10()/lumpc) + LPS/10;
		lump.value += lC;
		lumpTotal += lwC;
	}
	if (cookie.value > 1000 && Math.random() <= 1 / (lumpc/(cookie.value.log10()))) {
		lump.value += BigNumber.ONE;
		lumpTotal++;
	}
	time++;
	if(ResidualLuck.level > 0 && Math.random() <= 1/(100000 - ResidualLuck.level*10000)){
		let tempnum = Math.round(Math.random()*18);
		if(building[tempnum].level > 0){
			log("You won a "+buildingName[tempnum]);
			building[tempnum].level++;
			calcCPS();
		}
	}
	updateAvailability();
	theory.invalidateTertiaryEquation();
	theory.invalidateSecondaryEquation();
};
//Logistic funtion for Mine+
//Param -> midpoint=30*L, max=500*L - 1, min=0
//Display T, returns bignumber
let xBegin = BigNumber.from("-1e100");
var Logistic = () => {
	var maxL = BigNumber.from(terra.level).pow(1.2 + 0.05*TerraInf.level)*1500 + BigNumber.from(building[3].level).pow(1.2 + 0.03*TerraInf.level);
	return BigNumber.ONE + maxL - ((maxL.pow(0.99999 - 0.01*TerraInf.level))/(BigNumber.ONE + BigNumber.E.pow(-1 * (time-(xBegin + (terra.level * 300))))));
};
const height = 60;
var getPrimaryEquation = () => {
	theory.primaryEquationScale = 1.15;
    theory.primaryEquationHeight = height;
    let result = "\\dot{C} = P(B(0) + P_{cp}\\sum_{i=1}^{18}{B(i)})";
    return result;
}
var getTertiaryEquation = () =>
  theory.latexSymbol + "=\\max C^{0.2}" + " \\quad " + "\\dot{C} = " + BigNumber.from(CPS).toString(0) + ((terra.level > 0)?"\\quad T = " + Logistic().toString(10):"");
var getSecondaryEquation = () => {
	theory.secondaryEquationHeight = 90;
	theory.secondaryEquationScale = 1.1;
	return secondaryEq(eqType);
};
    var getInf = (index) => {
      let result = buildingName[index];
      if (building[index].level == 1) {
        result += " ";
      } else {
        result += "s ";
      }
	  //Sorry, but you CAN'T get 1 CPS per building skill issue lol
      result += buildingDesc[index] + BigNumber.from(arrcps[index]).toString(0) + " cookies per second";
      return result;
    };
var getPublicationMultiplier = (tau) => tau.pow(1.095);
var getPublicationMultiplierFormula = (symbol) => symbol + "^{1.095}";
var getTau = () => (cookie.value).pow(0.2);
var get2DGraphValue = () =>{
	if(vizType==1)return (((milk>=100)?100:milk)+((BigNumber.PI * BigNumber.from(time)/BigNumber.TEN).sin()).abs()).toNumber();
	else if(vizType==0)return cookie.value.sign * (BigNumber.ONE + cookie.value.abs()).log10().toNumber();
};
  
var postPublish = () => {
	lump.value=lumpbf;
	hc.value=hbf;
	CPS=BigNumber.ZERO;
	getEquationOverlay();
	updateAvailability();
};
let lumpbf=BigNumber.ZERO;
let hbf = BigNumber.ZERO;
var prePublish = () => {
	lumpbf=lump.value;
	hbf=hc.value;
	hbf+=((cookie.value)/(BigNumber.from("1e12"))).pow(1/3);
};

var getExpn = (index) => (buildingExp[index].level * buiexp) + 1;
var getPower = (index) => (Utils.getStepwisePowerSum(buildingP[index].level, buildingUpgradeMult[index], 5, 1));
var getPower2 = (index,level) => (Utils.getStepwisePowerSum(level, buildingUpgradeMult[index], 5, 1));
var InsPopup = ui.createPopup({
    title: "Instructions",
    content: ui.createStackLayout({
        children: [
           ui.createScrollView({
                heightRequest: 300,
                content: ui.createLabel({text: "Welcome to a theory all about cookies and more cookies!!!\n You have 3 currencies, cookies(C), heavenly chips(H), and sugar lumps(L), which you\'ll be spending on upgrades located on both tabs.\nCookies by far is the most important, as majority of the gameplay revolves around it, from buildings to even tau! You can get your first batch of cookies by buying a cursor, which is gifted to you for free to kickstart your very own cookie empire! By maximizing CPS(C dot), you are sure to produce a whole lot of cookies.\nHeavenly Chips are a special type of cookie that forms whenever you sacrificed everything material you own in exchange for greater power(called publications). They can be used for all sorts of special upgrades, and might even end up boosting your CPS if you know enough.\nSugar lumps by far are the hardest to accquire, literally requiring luck in order to get some, but its powers of being able to outright boost your building\'s CPS by 10%, multiplicative! Rumors has it that it gets easier to accquire the more cookies you have.\n I will leave that up to you to decide. And you are not supposed to see this during normal gameplay >:(",
					horizontalTextAlignment: TextAlignment.CENTER,
                    padding: Thickness(10, 2, 10, 2),
                    fontSize: 14,
		     maxLines: 100
                })
            }),
            ui.createButton({text: "Close", onClicked: () => InsPopup.hide()})
        ]
    })
});
//ellipsis you're so epic for contibuting to getEquationOverlay() function
var getEquationOverlay = () =>
	ui.createGrid({
		columnDefinitions: ["90*", "auto"],
        children: [
			ui.createStackLayout({
			children:[
			ui.createImage({
				source: ImageSource.CHANGE,
				horizontalOptions: LayoutOptions.START,
				verticalOptions: LayoutOptions.END,
				heightRequest: 25,
				margin: new Thickness(10,10,0,0),
				onTouched: (e) => {
					if(e.type == TouchType.SHORTPRESS_RELEASED){
						log("It works!");
						vizType=(vizType==0)?1:0;
						theory.invalidateSecondaryEquation();
						theory.clearGraph();
					}
				}
			}),
			ui.createLatexLabel({
				text: "Change Visualizer",
				fontSize: 10,
				padding: new Thickness(10,10,0,0)
			}),
			(terra.level > 0)?ui.createImage({
				source: ImageSource.FAST_FORWARD,
				horizontalOptions: LayoutOptions.START,
				verticalOptions: LayoutOptions.END,
				heightRequest: 25,
				margin: new Thickness(10,10,0,0),
				onTouched: (e) => {
					if(e.type == TouchType.SHORTPRESS_RELEASED){
						log("Boost!");
						xBegin = time;
						calcCPS();
					}
				}
			}):ui.createImage({
				source: ImageSource.LOCK,
				horizontalOptions: LayoutOptions.START,
				verticalOptions: LayoutOptions.END,
				heightRequest: 25,
				margin: new Thickness(10,10,0,0)
			}),
			(terra.level > 0)?ui.createLatexLabel({
				text: "Terraform Buff",
				fontSize: 10,
				padding: new Thickness(10,10,0,0)
			}):ui.createLatexLabel({
				text: "Locked",
				fontSize: 10,
				padding: new Thickness(10,10,0,0)
			}),
			]}),
		ui.createStackLayout({
			children:[
			ui.createImage({
				source: ImageSource.CHANGE,
				horizontalOptions: LayoutOptions.END,
				verticalOptions: LayoutOptions.START,
				heightRequest: 20,
				margin: new Thickness(10,10,0,0),
				onTouched: (e) => {
					if (e.type == TouchType.SHORTPRESS_RELEASED){
						log("Equation Change!");
						eqType++;
						eqType=eqType%(5);
						theory.invalidateSecondaryEquation();
						theory.clearGraph();
					}
				}
			}),
			//ui.createLatexLabel({
			//	text: "Secondary Equation", //bad, temp removed
			//	displacementX: 280,
			//	fontSize: 10,
			//	horizontalOptions: LayoutOptions.END,
			//	padding: new Thickness(10,10,0,0)
			//}),
			ui.createImage({
				source: ImageSource.INFO,
				horizontalOptions: LayoutOptions.END,
				verticalOptions: LayoutOptions.END,
				heightRequest: 20,
				margin: new Thickness(10,10,0,0),
				onTouched: (e) => {
					if (e.type == TouchType.SHORTPRESS_RELEASED){
						log("Help Menu");
						InsPopup.show()
					}
				}
			}),
		]})
        ]
    });

init();
calcCPS();
var secondaryEq = (mode) => {
	switch (mode) {
		case 0:
		        return ("B(i) = B[i]P_{i}(1.01)^{L[i]}" + ((CookieTau.level > 0)?"(\\log_{10}\\log_{10}\\tau)^{2}":"") + ((ChronosAge.level > 0)?"(1+t)^{1.5}":""));
			break;
		case 1:
		        return ("P = M(CP(l)) \\\\" + ((CookieS.level > 0)?"(log_{2}(L + 2))^{2}":"") + ((CookieH.level > 0)?"(log_{10}(H + 10))^{1.5}":"") + ((CookieC.level > 0)?"(log_{10}(C + 10))":""));
			break;
		case 2:
                        return ("M = M_{i}K(0.15)+(K-10)(0.2)\\\\+(K-25)(0.25)+(K-50)(0.3)");
			break;
		case 3:
		        theory.secondaryEquationScale = 0.9;
	        	return ("CP(l) = C_{1}(l)C_{2}()"+((invest.level > 0)?"I^{1.01}":"")+"\\\\C_{1}(l) = max_{l}:[0,25,50,75,100,150]\\\\ \\rightarrow [1.03,1.05,1.07,1.09,1.11,1.13]^{l}\\\\C_{2}() = \\prod_{i=0}^{8}{TP[i]^{CT[i]}}");
			break;
		case 4:
	        	return "B_{2} *=  \\sum_{i=0 \\: i\\neq 1}^{18}{P_{2}}{C_{i}}^{"+BigNumber.from(covExp).toString(1)+" + COV_{L}}";
			break;
	}
};
