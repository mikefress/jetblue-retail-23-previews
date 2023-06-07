// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl, tl2;

////////////////////////////////////////////////////////////////////////
// @FT1 - code block start
//VARIABLE DECLARATIONS
var thisFeedLoaded=false;
var showDefault=false;
var ctURL = "";


var default_exit = myFT.$("#default_exit");

default_exit.on('click',function(){
  myFT.clickTag(1,ctURL);
});

function checkURL(u){
  if(u.indexOf("http://")==0||u.indexOf("https://")==0){return true}
  return false
}

myFT.on('instantads',function(){
      ctURL=myFT.instantAds.Retail_default_clickTag_URL
      myFT.dispatch('RL1_available');

    });
    myFT.on('theFeedLoaded', function(e) {
      console.log('RL1: Richload recieved feed from Base file)');
      feedLoaded(e.a);
    });
    myFT.on('RL1_play', function () {
      init();
    });
    /*
    ////////////////////////////////////////////////
       LOADING FEED START
    ////////////////////////////////////////////////

    Please note: JetBlue setup has feeds loading form the base file and then passed into richLoads via a custom event
    called 'theFeedLoaded'.
    */
    function feedLoaded(feedItems) {
      // adjust logo size and positioning for partner logo
      // change includes to be simple if(partner_logo_src=="n/a") and follow same logic below

      let partner_logo_src = feedItems[0].image_logo_300x250;

      //testing swap between layouts for partner logo
      // partner_logo_src = 'https://previews.cainandabelddb.com/clients/jetblue/Jetblue_resoucres/partner_logos_feed/sa-Stacked.png'

      if(partner_logo_src == "n/a"){
        //no partner logo included in feed, do nothing
        document.getElementById('partner_logo_container').style.height = '0px'
      }else{
        //partner logo included in feed
        console.log('partner logo included!')
        document.getElementById('logoHolder').style.justifyContent = 'space-between'
        document.getElementById('partner_logo_container').style.width = '77px'


        var partner_logo_img = myFT.$("#partner_logo_img");
        partner_logo_img[0].src=partner_logo_src;
      }

      if(!thisFeedLoaded){
        thisFeedLoaded=true;
        try {
          /*Setting variable values from loaded feed (FEED PASSED THROUGH THE --theFeedLoaded-- CUSTOM EVENT)*/
          /*For example: the following variable ctURL is used to pass a url from feed into a dynamic clickTag*/
          ctURL = checkURL(myFT.instantAds.Retail_dynamic_click_URL)?myFT.instantAds.Retail_dynamic_click_URL:feedItems[0]['url'];
          //This variable will be passed through clicktag (inside clickEvent handler below) as a parameter
          //myFT.clickTag(1, ctURL);
          //If using dynamic text, set variables values to feed or dynamic variables setup in manifest/versions within instandAd*/
        } catch (e) {
          showDefault = true;
        }
        setupContent();
      }
    }
    function setupContent() {
      //Populate dynamic text with feed and/or dynamic variable data here
      //Once all dynamic content has been populated, dispatch event to the base file to notify richload 1 ready to start playing
      myFT.dispatch('RL1_ready_to_play');
    }

// @FT1 - code block end
///////////////////////////////////////////////////////////////////////////////////////


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax();
  tl2 = new TimelineMax();

  animate();
  setRollover();

}

function animate() {
  //make parent (base file) border black
  window.parent.document.getElementById("border").style.borderColor="#000"

  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl.set(["#seatBase"], { scale: 1.15, force3D: true });

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')

  .addLabel('handAnimation', 1.5)
  .to('#armhandle', 1.6, { rotation: 0, y: 0, x: 0, ease: Power4.easeOut }, "handAnimation")
  .to('#arm', 1, { scale: 0.5, x: -60, y: 50, rotation: 20,  ease: Power1.easeIn }, "-=0.8")
  .to('#basketball', 0.9, { scale: 0.9, x: 75, y: 45, rotation: 50, ease: "none" }, "-=1.8")
  .to('#basketball', 1.1, { scale: 1, x: 55, y: 248, rotation: -60, ease: "none" }, "-=1.1")
  // .to('#arm', 1, { scale: 0.5, x: -60, y: 50, rotation: 20,  ease: "none" }, "-=0.6")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut})

  // // Move the inner blue box up
  .addLabel('seatAnimation', "+=1.5")
  .to('#seatBase', 0.6, { scale: 1,  ease: Power1.easeIn }, "seatAnimation")
  .to('#seatScreen', 0.6, { scale: 0.8,  ease: Power1.easeIn }, "seatAnimation")
  .to('#innerBox', 0.6, { y: -10,  ease: Power1.easeInOut }, "seatAnimation")
  .to('#seatOverlay', 0.6, { autoAlpha: 1,  ease: Power1.easeIn }, "seatAnimation")
  // .to('#net', 1, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation"); // should this fade out?
  .to('#net', 0.6, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation") // should this fade out?
  .to('#playIcon', 0.4, { autoAlpha: 1,  ease: Power1.easeIn }, "+=0")
  .to('#h1', 0.5, { autoAlpha: 0, ease: Power1.easeOut}, 'seatAnimation-=0.5')
  .to('#h3', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'seatAnimation')
  .to('#terms1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'seatAnimation')

  .addLabel('frame_END', "+=2")
  .to('#endframeBg', 0.6 ,{ top: 0, ease: Back.easeOut.config(.3)}, 'frame_END')
  .to('#terms1', 0.5, { autoAlpha: 0, ease: Power1.easeOut}, 'frame_END')


    ////////////////////////////////////////
    //@FT2 code block start
    .call(playEndframe, ["param1"], "frame_END")
    //@FT2 code block end
    ////////////////////////////////////////


}
////////////////////////////////////////
//@FT3 code block start
function playEndframe(param1){
  myFT.dispatch('init_RL2');
}
//@FT3 code block end
////////////////////////////////////////


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
////////////////////////////////////////
//@FT4 code block start

// End timer custom event listener (dispatched from RL2 when animation complete)
myFT.on('stopTimer',function(){
  // show total banner animation time in browser console.
  var endTime = new Date();
  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
})

//@FT4 code block end
////////////////////////////////////////
