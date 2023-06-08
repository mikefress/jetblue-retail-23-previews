var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
// var startTime;

// Timeline reference
var tl;

//@FT VARIABLE DECLARATIONS
var showDefault=true,
    thisFeedLoaded=false,
    ctURL = "",
    defaultPrice = "69",
    origin_longform="",
    lowestfare_faredollaramount="",
    destination_longform="";

var price = myFT.$("#price"),
    startingAt = myFT.$("#starting_at"),
    priceText = myFT.$("#priceText"),
    dollarSign = myFT.$("#dollar"),
    subhead = myFT.$("#subhead"),
    terms = myFT.$("#terms"),
    oneWay = myFT.$(".one_way"),
    default_exit = myFT.$("#default_exit"),
    h4 = myFT.$("#h4");

//@FT Setting local variable values using FT dynamic variables (instantAds)
ctURL           = myFT.instantAds.Retail_default_clickTag_URL
headline_color  = myFT.instantAds.headline_color;
subhead_color   = myFT.instantAds.subhead_color;
price_color     = myFT.instantAds.price_color;
oneWay_color    = myFT.instantAds.oneWay_color;
legal_color     = myFT.instantAds.legal_color;
oneWay_txt      = myFT.instantAds.one_way_text;
terms_txt       = myFT.instantAds.restrictions_text;

headline1_txt   = myFT.instantAds.headline1_text + myFT.instantAds.headline2_text;

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) { 
    return true
  } else {
    return false
  }
}

function setupContent() {

  oneWay[0].innerHTML = oneWay_txt; // - Populates the 'one-way' text
  terms[0].innerHTML = terms_txt; // - Populates the 'Restrictions Apply.' text

  // //  Longest possible places names
  // origin_longform = 'Providenciales, Turks and Caicos (PLS)'
  // destination_longform = 'Providenciales, Turks and Caicos (PLS)'

  // //  Median places names
  // origin_longform = 'Sacramento, CA (SMF)'
  // destination_longform = 'Sacramento, CA (SMF)'

  // // Shortest possible places
  // origin_longform = 'Miami area'
  // destination_longform = 'Miami area'

  if (showDefault) {
    h4[0].innerHTML = 'Enjoy free live TV and<br>sports at every seat.<span class="asterisk">&ast;</span>'; // - Populates main headline
    h4[0].classList.add('defaultEndframe')
    terms[0].innerHTML = '<span class="asterisk">&ast;</span>Coverage may vary by aircraft.'
    price[0].style.display = 'none';
    startingAt[0].style.display = 'none';

  } else {
    h4[0].innerHTML = "Nonstop flights from <br><span id='origin' class='city'>" + origin_longform + "</span> <span class='to'>to</span> <span id='destination' class='city'>" + destination_longform + "</span>";
    // h4[0].innerHTML = "Nonstop flights from <br><span id='origin' class='city'>" + "NYC" + "</span> <span class='to'>to</span> <span id='destination' class='city'>" + "Reno" + "</span>";

    const myH4 = document.getElementById('h4')
    const myCity = document.getElementsByClassName('city')
    // myCity[0].style.fontSize = "30px"
    console.log(myCity[0].innerText)
  
    const myCityOriginLength = myCity[0].innerHTML.split('&')[0].length
    const myCityDestLength = myCity[1].innerHTML.length
    console.log(myCityOriginLength)
    console.log(myCityDestLength)
  
    const myCityCharLength = myCityOriginLength > myCityDestLength ? myCityOriginLength : myCityDestLength;
  
    console.log("myCityCharLength", myCityCharLength)
    if (myCityCharLength > 22) {
      // with line break
      h4[0].innerHTML = "Nonstop flights from <br><span class='city cityLineBreak' style='font-size: 12px; letter-spacing: -0.3px'>" + origin_longform + "</span><br> <span class='to'>to</span> <span class='city cityLineBreak' style='font-size: 12px; letter-spacing: -0.3px'>" + destination_longform + "</span>";
      myH4.style.lineHeight = "18px";


    } else if (myCityCharLength > 17) {
      // with line break
      h4[0].innerHTML = "Nonstop flights from <br><span class='city cityLineBreak'>" + origin_longform + "</span><br> <span class='to'>to</span> <span class='city cityLineBreak'>" + destination_longform + "</span>";
      myH4.style.lineHeight = "18px";

    } else {
      myCity[0].style.fontSize = "15px"
      myCity[1].style.fontSize = "15px"
      myH4.style.lineHeight = "1.056";
    }

  }
  // + " <span class='startingAt'>starting at</span>"
  // if (showDefault) {
  //     lowestfare_faredollaramount = defaultPrice;
  //     h4[0].innerHTML = headline1_txt; // - Populates main headline
  //     h4[0].innerHTML += "Discover fares from";
  //     // price[0].style.top = '97px';
  //     // oneWay[0].style.top = '166px';

  // }
  //hard code price for local testing
  //comment out before uploading
  // lowestfare_faredollaramount="4444"

  // Alternate text style classes for 3 and 4 characters prices
  // e.g. $30, vs $250 vs. $1000
  priceText[0].innerHTML = lowestfare_faredollaramount;

  var price_num_length=lowestfare_faredollaramount.length;

  if(lowestfare_faredollaramount.length> 3){
    price_num_length=4;
    startingAt[0].className += " startingAt_"+price_num_length+"_char";
    dollarSign[0].className += " dollar_"+price_num_length+"_char";
    priceText[0].className += " number_"+price_num_length+"_char";
    oneWay[0].className += " one_way_"+price_num_length+"_char";
  }

  // console.log('origin_longform ' + origin_longform.length)
  // console.log('destination_longform' + destination_longform.length)

  myFT.dispatch('RL2_ready_to_play');

}

//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

//@FT Feed data callback function
function feedLoaded(feed){
  if(!thisFeedLoaded){
    thisFeedLoaded=true;
    try{
        lowestfare_faredollaramount = feed[0].lowestfare_faredollaramount;
        origin_longform = feed[0].origin_formatted;
        destination_longform = feed[0].destination_formatted;        
        ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feedItems[0]['url'];

        if(lowestfare_faredollaramount == "0"){
            //console.log('load default');
            showDefault = true;
        }
    }catch(error){
        //Feed error handling done within base file
        //If no feed available, show default content
        showDefault = true;
    }
    setupContent();
  }
}

myFT.on('RL2_play' , function(){
  //console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  // startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  animate();
  setRollover();

}
function animate() {
  myFT.dispatch('show_RL2');
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true })
  .set(["#cta"], { force3D: true, rotation: .001 })
    .addLabel('frame_4')
    .staggerTo(['#h4', '#priceHolder', '#cta', '#terms', '#terms_container'], 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, 0.3, 'frame_4')
}


// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}

// End timer
function endTime() {
  //dispatch event to notify RL1 (where timer resides) to stop and console.log
  //banner duration time
  myFT.dispatch('stopTimer')
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/
