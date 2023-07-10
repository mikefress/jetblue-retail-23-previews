// Var Declarations
var tl;
var tl2;
var container = myFT.$("#container");
var default_exit = myFT.$("#default_exit");
var endframe = myFT.$("#endframe")
var endframe_headline = myFT.$("#endframe_headline")
// var myVid=myFT.$("#video1");
var clickTag1_url="";
// var vid_time_triggered=false;

//
default_exit.on('click',function(){
  myFT.clickTag(1,clickTag1_url)
})
// wait for instantads to load before initializing creative animation
myFT.on('instantads',function(){

  clickTag1_url=myFT.instantAds.clickTag1_url;

})

// myVid.on("canplay", function() {
//   init();	
// }); 

init()

function animate() {
  const cardBounce = CustomEase.create("custom", "M0,0,C0,0,0.05,0.228,0.09,0.373,0.12,0.484,0.139,0.547,0.18,0.654,0.211,0.737,0.235,0.785,0.275,0.864,0.291,0.896,0.303,0.915,0.325,0.944,0.344,0.97,0.356,0.989,0.38,1.009,0.413,1.039,0.441,1.18,0.48,1.08,0.496,1.089,0.51,1.091,0.53,1.095,0.552,1.099,0.582,1.1,0.6,1.1,0.716,1.1,0.716,1.064,0.8,1.024,0.865,0.992,1,1,1,1");

  tl.set("#container", { autoAlpha: 0, force3D: true });
  // tl.set("#cta", { autoAlpha: 0, force3D: true, rotation: .001 });
  // tl.set("#card", { autoAlpha: 0, scale: 0.3 });
  // tl.set(['#terms'], { autoAlpha: 0})

  // let video play
  tl.addLabel('start', 0)
  .to('#container', 0.5, { autoAlpha: 1 }, 'start+=0.5')
  .to(['#copy1', '#copy2'], 1, { autoAlpha: 1, y: '-=200', ease: "expo.out" }, '+=0')
    .to('#endframe', 1.5, { y: '-=670', ease: "expo.out" }, '+=2')
    .to('#pink-bar-1', 0, { autoAlpha: 0 }, '-=1.4')
    
    tl.to(['#man'], 9, { transform: "translate3d(0, 0, 1px) scale(1.2)", ease: Power1.easeInOut }, 0)
    tl.to(['#bkg'], 9, { transform: "translate3d(0, 0, 1px) scale(1.2)", ease: Power1.easeInOut }, 0)


}

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.1, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}



function init() {

  tl = new TimelineMax();

  animate();
  setRollover();


  //Using inbuilt time update function
  // myVid.on('timeupdate', function(){
  //   // console.log(myVid[0].currentTime)
  //   if(myVid[0].currentTime>5.5){
  //     if(!vid_time_triggered){
  //       vid_time_triggered=true;
  //       showEndframe();	
  //     }
  //   }
  // });						
  // Fade in creative/ad
  // container[0].style.transition = "opacity .5s";
  // container[0].style.opacity = 1;				
}
