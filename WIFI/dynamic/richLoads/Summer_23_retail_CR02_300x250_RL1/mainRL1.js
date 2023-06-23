// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl;

////////////////////////////////////////////////////////////////////////
// @FT1 - code block start
//VARIABLE DECLARATIONS
var thisFeedLoaded=false;
var showDefault=false;
var ctURL = "";
let partner_logo_src;


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

      partner_logo_src = feedItems[0].image_logo_300x250;

      //testing swap between layouts for partner logo
      partner_logo_src = 'https://previews.cainandabelddb.com/clients/jetblue/Jetblue_resoucres/partner_logos_feed/sa-Horiz.png'
      
      if(partner_logo_src == "n/a"){
      }else{
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

  animate();

}

function animate() {
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')
  .from('#plane', 1.5, { x: -300, ease: "none"}, 'frame1')
  // distant clouds move
  .to(['.backgroundCloud'], 11, { x: -400, ease: "none" }, 'frame1')
  .to(['.foregroundCloud'], 11, { x: -800, ease: "none" }, 'frame1')

  .from('#emojiA', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=0.2')
  .from('#emojiB', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=4.0')
  .from('#emojiC', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=8.0')
  // .from('#emojiD', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=10')

  .from('#emojiL', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=1.0')
  .from('#emojiM', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=2.5')
  .from('#emojiN', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=5.6')
  .from('#emojiO', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=8.5')

  .addLabel('frame2', "frame1+=1")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame2')

  .addLabel('frame3', "frame2+=2")
  .to('#h1', 0.5, { autoAlpha: 0, ease: Power1.easeOut}, 'frame3')

  .to(['#h3', '#terms1'], 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame3+=1')

  .addLabel('frame_END', "frame3+=3.5")
  .to('#endframeBg', 0.6 ,{ top: 0, ease: Back.easeOut.config(.3)}, 'frame_END')
  .to('#terms1', 0.5, { autoAlpha: 0, ease: Power1.easeOut}, 'frame_END')

  ////////////////////////////////////////
  //@FT2 code block start
  .call(playEndframe, ["param1"], 'frame_END');
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
