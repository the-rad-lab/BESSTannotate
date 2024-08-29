// /* ANNOTATION CONTROLS */

// first canvas
var canvas = document.getElementById('canvas');
    // canvas.setHeight(400);
    // canvas.setWidth(600);
var ctx = canvas.getContext('2d',{willReadFrequently: true}); // delete option willReadFrequently if too slow

var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var width = canvas.width
var height = canvas.height
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
const removedObjList = new Array();

var columnWidth = 30;

let line_points = Array(height).fill().map(() => Array(width).fill(0));

var line, isDown,mode, rectangle;
mode = "staff_mode";
document.getElementById("clear").style.background='#d6d6d6';
document.getElementById("draw").style.background='#d6d6d6';
document.getElementById("select").style.background='#d6d6d6';
document.getElementById("delete").style.background='#d6d6d6';
document.getElementById('delete').style.visibility = 'hidden';
document.getElementById("columns").style.background='#2BB6F6';
document.getElementById('excel').style.visibility = 'hidden';
document.getElementById('addColumsArea').style.visibility = 'hidden';
document.getElementById('miniAddColumsArea').style.visibility = 'hidden';

// canvas for annotation
var canvas2 = new fabric.Canvas('canvas2');
    canvas2.setHeight(400);
    canvas2.setWidth(600);
    canvas2.perPixelTargetFind = true;
    canvas2.targetFindTolerance = 4;
    canvas2.hasRotatingPoint = false;
    canvas2.uniScaleTransform = true;
    canvas2.willReadFrequently = true; // delete line if too slow

// canvas for symbols
var canvas3 = new fabric.Canvas('canvas3');
    canvas3.setHeight(40);
    canvas3.setWidth(600);
var ctx3 = canvas3.getContext('2d',{willReadFrequently: true}); // delete option willReadFrequently if too slow

var canvas4 = document.getElementById('canvas4');
ctx4 = canvas4.getContext('2d',{willReadFrequently: true}); // delete option willReadFrequently if too slow

var imgSym = new Image();

var imgSymAll = new Array();
    for (var i=0; i<164; i++){
        imgSymAll[i] = new Image();
    }
    imgSymAll[0].src = "assets/symbols/Accumulation.svg";
    imgSymAll[1].src = "assets/symbols/Action.svg";
    imgSymAll[2].src = "assets/symbols/Addressing.svg";
    imgSymAll[3].src = "assets/symbols/Advancing.svg";
    imgSymAll[4].src = "assets/symbols/Ankle L.svg";
    imgSymAll[5].src = "assets/symbols/Ankle R.svg";
    imgSymAll[6].src = "assets/symbols/Arc-like.svg";
    imgSymAll[7].src = "assets/symbols/Awake.svg";
    imgSymAll[8].src = "assets/symbols/Awareness.svg";
    imgSymAll[9].src = "assets/symbols/Axis of Length.svg";
    imgSymAll[10].src = "assets/symbols/Back High.svg";
    imgSymAll[11].src = "assets/symbols/Back Low.svg";
    imgSymAll[11].src = "assets/symbols/Back Middle.svg";
    imgSymAll[12].src = "assets/symbols/Back Zone.svg";
    imgSymAll[13].src = "assets/symbols/Ball.svg";
    imgSymAll[14].src = "assets/symbols/Becoming.svg";
    imgSymAll[15].src = "assets/symbols/Bound.svg";
    imgSymAll[16].src = "assets/symbols/Breath.svg";
    imgSymAll[17].src = "assets/symbols/Canon.svg";
    imgSymAll[18].src = "assets/symbols/Center of Gravity.svg";
    imgSymAll[19].src = "assets/symbols/Center of Levity.svg";
    imgSymAll[20].src = "assets/symbols/Central.svg";
    imgSymAll[21].src = "assets/symbols/Change of Support.svg";
    imgSymAll[22].src = "assets/symbols/Change of Support (series).svg";
    imgSymAll[23].src = "assets/symbols/Concave.svg";
    imgSymAll[24].src = "assets/symbols/Convex.svg";
    imgSymAll[25].src = "assets/symbols/Condense.svg";
    imgSymAll[26].src = "assets/symbols/Contact.svg";
    imgSymAll[27].src = "assets/symbols/Core.svg";
    imgSymAll[28].src = "assets/symbols/Core-Distal.svg";
    imgSymAll[29].src = "assets/symbols/Cross-lateral.svg";
    imgSymAll[30].src = "assets/symbols/Diminishing.svg";
    imgSymAll[31].src = "assets/symbols/Direct.svg";
    imgSymAll[32].src = "assets/symbols/Directional.svg";
    imgSymAll[33].src = "assets/symbols/Distal.svg";
    imgSymAll[34].src = "assets/symbols/Dream.svg";
    imgSymAll[35].src = "assets/symbols/Echoing.svg";
    imgSymAll[36].src = "assets/symbols/Elbow L.svg";
    imgSymAll[37].src = "assets/symbols/Elbow R.svg";
    imgSymAll[38].src = "assets/symbols/Emphasis.svg";
    imgSymAll[39].src = "assets/symbols/Enclosing.svg";
    imgSymAll[40].src = "assets/symbols/Even.svg";
    imgSymAll[41].src = "assets/symbols/Exhale.svg";
    imgSymAll[42].src = "assets/symbols/Expand.svg";
    imgSymAll[43].src = "assets/symbols/Far.svg";
    imgSymAll[44].src = "assets/symbols/Fingers L.svg";
    imgSymAll[45].src = "assets/symbols/Fingers R.svg";
    imgSymAll[46].src = "assets/symbols/Flow-sensing.svg";
    imgSymAll[47].src = "assets/symbols/Focus.svg";
    imgSymAll[48].src = "assets/symbols/Forward High.svg";
    imgSymAll[49].src = "assets/symbols/Forward Low.svg";
    imgSymAll[50].src = "assets/symbols/Forward Middle.svg";
    imgSymAll[51].src = "assets/symbols/Free.svg";
    imgSymAll[52].src = "assets/symbols/Front Zone.svg";
    imgSymAll[53].src = "assets/symbols/Gather.svg";
    imgSymAll[54].src = "assets/symbols/Gesture.svg";
    imgSymAll[55].src = "assets/symbols/Head.svg";
    imgSymAll[56].src = "assets/symbols/Head-Tail.svg";
    imgSymAll[57].src = "assets/symbols/High Zone.svg";
    imgSymAll[58].src = "assets/symbols/High.svg";
    imgSymAll[59].src = "assets/symbols/Hip L.svg";
    imgSymAll[60].src = "assets/symbols/Hip R.svg";
    imgSymAll[61].src = "assets/symbols/Hold.svg";
    imgSymAll[62].src = "assets/symbols/Horizontal.svg";
    imgSymAll[63].src = "assets/symbols/Impactive.svg";
    imgSymAll[64].src = "assets/symbols/Impulsive.svg";
    imgSymAll[65].src = "assets/symbols/Indirect.svg";
    imgSymAll[66].src = "assets/symbols/Inhale.svg";
    imgSymAll[67].src = "assets/symbols/Inner Shaping.svg";
    imgSymAll[68].src = "assets/symbols/Jump.svg";
    imgSymAll[69].src = "assets/symbols/Knee L.svg";
    imgSymAll[70].src = "assets/symbols/Knee R.svg";
    imgSymAll[71].src = "assets/symbols/Left Back High.svg";
    imgSymAll[72].src = "assets/symbols/Left Back Low.svg";
    imgSymAll[73].src = "assets/symbols/Left Back Middle.svg";
    imgSymAll[74].src = "assets/symbols/Left Forward High.svg";
    imgSymAll[75].src = "assets/symbols/Left Forward Low.svg";
    imgSymAll[76].src = "assets/symbols/Left Forward Middle.svg";
    imgSymAll[77].src = "assets/symbols/Left High.svg";
    imgSymAll[78].src = "assets/symbols/Left Low.svg";
    imgSymAll[79].src = "assets/symbols/Left Middle.svg";
    imgSymAll[80].src = "assets/symbols/Left Zone.svg";
    imgSymAll[81].src = "assets/symbols/Left.svg";
    imgSymAll[82].src = "assets/symbols/Light.svg";
    imgSymAll[83].src = "assets/symbols/Low Zone.svg";
    imgSymAll[84].src = "assets/symbols/Low.svg";
    imgSymAll[85].src = "assets/symbols/Lower.svg";
    imgSymAll[86].src = "assets/symbols/Mid.svg";
    imgSymAll[87].src = "assets/symbols/Middle.svg";
    imgSymAll[88].src = "assets/symbols/Midline.svg";
    imgSymAll[89].src = "assets/symbols/Mobile.svg";
    imgSymAll[90].src = "assets/symbols/Near.svg";
    imgSymAll[92].src = "assets/symbols/Nearby.svg";
    imgSymAll[93].src = "assets/symbols/Out-of-step.svg";
    imgSymAll[94].src = "assets/symbols/Passion.svg";
    imgSymAll[95].src = "assets/symbols/Peripheral.svg";
    imgSymAll[96].src = "assets/symbols/Pin.svg";
    imgSymAll[97].src = "assets/symbols/Posture.svg";
    imgSymAll[98].src = "assets/symbols/Proximal.svg";
    imgSymAll[99].src = "assets/symbols/Radial Symmetry.svg";
    imgSymAll[100].src = "assets/symbols/Release.svg";
    imgSymAll[101].src = "assets/symbols/Remote.svg";
    imgSymAll[102].src = "assets/symbols/Repetition.svg";
    imgSymAll[103].src = "assets/symbols/Retreating.svg";
    imgSymAll[104].src = "assets/symbols/Retrograde.svg";
    imgSymAll[105].src = "assets/symbols/Reversal.svg";
    imgSymAll[106].src = "assets/symbols/Rhythm.svg";
    imgSymAll[107].src = "assets/symbols/Right Back High.svg";
    imgSymAll[108].src = "assets/symbols/Right Back Low.svg";
    imgSymAll[109].src = "assets/symbols/Right Back Middle.svg";
    imgSymAll[110].src = "assets/symbols/Right Forward High.svg";
    imgSymAll[111].src = "assets/symbols/Right Forward Low.svg";
    imgSymAll[112].src = "assets/symbols/Right Forward Middle.svg";
    imgSymAll[113].src = "assets/symbols/Right High.svg";
    imgSymAll[114].src = "assets/symbols/Right Low.svg";
    imgSymAll[115].src = "assets/symbols/Right Middle.svg";
    imgSymAll[116].src = "assets/symbols/Right Zone.svg";
    imgSymAll[117].src = "assets/symbols/Right.svg";
    imgSymAll[118].src = "assets/symbols/Right-Left.svg";
    imgSymAll[119].src = "assets/symbols/Rising.svg";
    imgSymAll[120].src = "assets/symbols/Roll.svg";
    imgSymAll[121].src = "assets/symbols/Rotate.svg";
    imgSymAll[122].src = "assets/symbols/Run.svg";
    imgSymAll[123].src = "assets/symbols/Sagittal.svg";
    imgSymAll[124].src = "assets/symbols/Scatter.svg";
    imgSymAll[125].src = "assets/symbols/Screw.svg";
    imgSymAll[126].src = "assets/symbols/Shape Flow.svg";
    imgSymAll[127].src = "assets/symbols/Shaping.svg";
    imgSymAll[128].src = "assets/symbols/Shoulder L.svg";
    imgSymAll[129].src = "assets/symbols/Shoulder R.svg";
    imgSymAll[130].src = "assets/symbols/Sinking.svg";
    imgSymAll[131].src = "assets/symbols/Slide.svg";
    imgSymAll[132].src = "assets/symbols/Spell.svg";
    imgSymAll[133].src = "assets/symbols/Spinal.svg";
    imgSymAll[134].src = "assets/symbols/Spoke-like.svg";
    imgSymAll[135].src = "assets/symbols/Spreading.svg";
    imgSymAll[136].src = "assets/symbols/Stable.svg";
    imgSymAll[137].src = "assets/symbols/Strong.svg";
    imgSymAll[138].src = "assets/symbols/Sudden.svg";
    imgSymAll[139].src = "assets/symbols/Support.svg";
    imgSymAll[140].src = "assets/symbols/Sustained.svg";
    imgSymAll[141].src = "assets/symbols/Swing.svg";
    imgSymAll[142].src = "assets/symbols/Symbol.svg";
    imgSymAll[143].src = "assets/symbols/Tetrahedron.svg";
    imgSymAll[144].src = "assets/symbols/Theme and variation.svg";
    imgSymAll[145].src = "assets/symbols/Toes L.svg";
    imgSymAll[146].src = "assets/symbols/Toes R.svg";
    imgSymAll[147].src = "assets/symbols/Touch.svg";
    imgSymAll[148].src = "assets/symbols/Transverse.svg";
    imgSymAll[149].src = "assets/symbols/Travel.svg";
    imgSymAll[150].src = "assets/symbols/Upper.svg";
    imgSymAll[151].src = "assets/symbols/Upper-Lower.svg";
    imgSymAll[152].src = "assets/symbols/Vertical.svg";
    imgSymAll[153].src = "assets/symbols/Vibratory.svg";
    imgSymAll[154].src = "assets/symbols/Vision.svg";
    imgSymAll[155].src = "assets/symbols/Vocalize.svg";
    imgSymAll[156].src = "assets/symbols/Waist.svg";
    imgSymAll[157].src = "assets/symbols/Walk.svg";
    imgSymAll[158].src = "assets/symbols/Wall.svg";
    imgSymAll[159].src = "assets/symbols/Weight-sensing.svg";
    imgSymAll[160].src = "assets/symbols/Wrist L.svg";
    imgSymAll[161].src = "assets/symbols/Wrist R.svg";
    imgSymAll[162].src = "assets/symbols/Vertical.svg";
    imgSymAll[163].src = "assets/symbols/Passive-weight.svg";
    // the order of this list and size of this array doesn't matter, it is never used again, just needed to initialize these paths for some reason


var imgSymHappy = new Array();
    for (var i=0; i<8; i++){
        imgSymHappy[i] = new Image();
    }
    imgSymHappy[0].src = "assets/symbols/Rotate.svg";
    imgSymHappy[1].src = "assets/symbols/Jump.svg";
    imgSymHappy[2].src = "assets/symbols/Light.svg";
    imgSymHappy[3].src = "assets/symbols/Free.svg";
    imgSymHappy[4].src = "assets/symbols/High.svg";
    imgSymHappy[5].src = "assets/symbols/Rising.svg";
    imgSymHappy[6].src = "assets/symbols/Spreading.svg";
    imgSymHappy[7].src = "assets/symbols/Repetition.svg";

var imgSymAngry = new Array();
    for (var i=0; i<4; i++){
        imgSymAngry[i] = new Image();
    }
    imgSymAngry[0].src = "assets/symbols/Strong.svg";
    imgSymAngry[1].src = "assets/symbols/Sudden.svg";
    imgSymAngry[2].src = "assets/symbols/Advancing.svg";
    imgSymAngry[3].src = "assets/symbols/Direct.svg";

var imgSymSadness = new Array();
    for (var i=0; i<7; i++){
        imgSymSadness[i] = new Image();
    }
    imgSymSadness[0].src = "assets/symbols/Passive-weight.svg";
    imgSymSadness[1].src = "assets/symbols/Condense.svg";
    imgSymSadness[2].src = "assets/symbols/Sinking.svg";
    imgSymSadness[3].src = "assets/symbols/Head.svg";
    imgSymSadness[4].src = "assets/symbols/Low.svg";
    imgSymSadness[5].src = "assets/symbols/Near.svg";
    imgSymSadness[6].src = "assets/symbols/Hold.svg";

var imgSymFear = new Array();
    for (var i=0; i<5; i++){
        imgSymFear[i] = new Image();
    }
    imgSymFear[0].src = "assets/symbols/Retreating.svg";
    imgSymFear[1].src = "assets/symbols/Condense.svg";
    imgSymFear[2].src = "assets/symbols/Bound.svg";
    imgSymFear[3].src = "assets/symbols/Back Zone.svg";
    imgSymFear[4].src = "assets/symbols/Enclosing.svg";



$("#clear").click(function(){ //doesn't work
    if (confirm("Are you sure you want to restart?")) {
        location.reload();
    }
    else {
        return;
    }
});
$("#select").click(function(){
    setEditMode();
});
$("#draw").click(function(){
    setDrawMode();
});
$("#delete").click(function(){
    mode="delete_mode";
    canvas2.selection=true;
    deleteObjects();
});
$("#columns").click(function(){
    // currently does nothing because we cannot delete columns
    // mode="columns_mode";
    // canvas2.selection=false;
    // document.getElementById("columns").style.background='#2BB6F6';
    // document.getElementById("draw").style.background='#d6d6d6';
    // document.getElementById("select").style.background='#d6d6d6';
    // document.getElementById('select').style.visibility = 'hidden';
    // document.getElementById("delete").style.background='#d6d6d6';
    // document.getElementById('delete').style.visibility = 'hidden';
    //make columns buttons visible
});
// $("#getinfo").click(function(){
//     getCoordsFromLine();
// });

// NEW RECTANGLE DRAWING (FOR SNAP BEHAVIOR AND BETTER RENDERING)

// Adding objects to the canvas...
var firstX = 0;
let firstY = 0;
var itemNumber = -1;
let prior_tr_x;
let prior_tl_x;
let prior_mb_y;
let prior_mt_y;
let stroke_initial =  10;

canvas2.on('mouse:down', function(o){
  isDown = true;
  var pointer = canvas2.getPointer(o.e);
  var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
	firstX = pointer.x;
  firstY = pointer.y;
  if(mode=="draw_mode"){
    itemNumber +=1;
    // line = new fabric.Line(points, {
    //   strokeWidth: 10,
    //   fill: 'black',
    //   stroke: 'black',
    //   originX: 'left',//'center',
    //   originY: 'bottom', //'center',
    //   //strokeLineCap: 'square',
    // });
    rectangle = new fabric.Rect({
      width: Math.abs(stroke_initial),
      height: Math.abs(firstY-pointer.y),
      left: firstX,
      top: firstY,
      fill: 'black',
      stroke: 'black',
      // strokeWidth: 5,
      // originX: 'left',
      // originY: 'bottom',
      lockRotation: true,
    });
    // canvas2.add(line);
    canvas2.add(rectangle);
  }
  // prior_tr_x = canvas2.item(itemNumber).oCoords.tr.x;
  // prior_tl_x = canvas2.item(itemNumber).oCoords.tl.x;
  // prior_mb_y = canvas2.item(itemNumber).oCoords.mb.y;
  // prior_mt_y = canvas2.item(itemNumber).oCoords.mt.y;
});

canvas2.on('mouse:move', function(o){
  if (!isDown) return;
  if(mode=="select_mode"){
   canvas2.item(itemNumber).lockRotation = true;

   // canvas2.item(itemNumber).lockScalingX = true;
 }

  var pointer = canvas2.getPointer(o.e);
  if(mode=="draw_mode"){
    // sets initial width as 15
	  //line.set({ x2: firstX, y2: pointer.y });
    rectangle.set({ width: Math.abs(stroke_initial), height: Math.abs(firstY- pointer.y) });
    canvas2.item(itemNumber).selectable = false;

	  canvas2.renderAll(); }

});

canvas2.on('mouse:up', function(o){
  isDown = false;
  // line.setCoords();
  console.log(o);
  rectangle.setCoords();

  // if(mode=="select_mode"){
  //
  // }
});

// SNAP TO GRID
canvas2.on('object:modified', function(o) { 
  let anchor_direction = "right";
  let thickness = o.target.oCoords.tr.x - o.target.oCoords.tl.x;

  let stroke1 = 10;
  let stroke2 = 20;
  let stroke3 = 30;
  if(thickness < stroke2){
    // console.log("lower bound");
    o.target.set({ scaleX: 1});
  } else if (thickness < stroke3) {
    o.target.set({ scaleX: 2 });
  } else {
    o.target.set({ scaleX: 3 });
  }
});

// old semi-working function for line
// canvas2.on('object:modified', function(o) {
//   let anchor_direction = "right";
//   let thickness = o.target.oCoords.tr.x - o.target.oCoords.tl.x;
//   // console.log("tr.X should be " + o.target.oCoords.tr.x);
//   // console.log("tl.X should be " + o.target.oCoords.tl.x);
//   // console.log(o);
//   // console.log("Thickness is        " + thickness);
//   // This condition is if the right side is changing
//   if(prior_tr_x != o.target.oCoords.tr.x &&
//      prior_tl_x == o.target.oCoords.tl.x &&
//      prior_mb_y == o.target.oCoords.mb.y &&
//      prior_mt_y == o.target.oCoords.mt.y){
//     anchor_direction = "left";
//     anchor_x = o.target.oCoords.tl.x;
//     anchor_y_b =  o.target.y1;
//     anchor_y_t =  o.target.y2;
//   } else if(prior_tr_x != o.target.oCoords.tr.x &&
//             prior_tl_x == o.target.oCoords.tl.x &&
//             prior_mb_y != o.target.oCoords.mb.y &&
//             prior_mt_y == o.target.oCoords.mt.y){
//     anchor_direction = "left";
//     console.log("Anchor left and top");
//     anchor_x = o.target.oCoords.tl.x;
//     anchor_y_b =  o.target.oCoords.mb.y;
//     anchor_y_t =  o.target.y2;
//   } else if(prior_tr_x != o.target.oCoords.tr.x && prior_tl_x == o.target.oCoords.tl.x && prior_mb_y == o.target.oCoords.mb.y && prior_mt_y != o.target.oCoords.mt.y){
//     anchor_direction = "left";
//     console.log("Anchor left and bottom");
//     anchor_x = o.target.oCoords.tl.x;
//     anchor_y_b =  o.target.y1;
//     anchor_y_t =  o.target.oCoords.mt.y;
//   } else if(prior_tr_x == o.target.oCoords.tr.x && prior_tl_x != o.target.oCoords.tl.x&& prior_mb_y == o.target.oCoords.mb.y && prior_mt_y == o.target.oCoords.mt.y) {
//     anchor_direction = "right";
//     anchor_x = o.target.oCoords.tr.x;
//     anchor_y_b =  o.target.y1;
//     anchor_y_t =  o.target.y2;
//   } else if(prior_tr_x == o.target.oCoords.tr.x && prior_tl_x != o.target.oCoords.tl.x&& prior_mb_y != o.target.oCoords.mb.y && prior_mt_y == o.target.oCoords.mt.y) {
//     anchor_direction = "right";
//     console.log("Anchor right and top");
//     anchor_x = o.target.oCoords.tr.x;
//     anchor_y_b =  o.target.oCoords.mb.y;
//     anchor_y_t =  o.target.y2;
//   }else if(prior_tr_x == o.target.oCoords.tr.x && prior_tl_x != o.target.oCoords.tl.x&& prior_mb_y == o.target.oCoords.mb.y && prior_mt_y != o.target.oCoords.mt.y) {
//     anchor_direction = "right";
//     console.log("Anchor right and bottom");
//     anchor_x = o.target.oCoords.tr.x;
//     anchor_y_b =  o.target.y1;
//     anchor_y_t =  o.target.oCoords.mt.y;
//   } else if(prior_tr_x == o.target.oCoords.tr.x && prior_tl_x == o.target.oCoords.tl.x&& prior_mb_y != o.target.oCoords.mb.y && prior_mt_y == o.target.oCoords.mt.y) {
//     anchor_direction = "center";
//     console.log("Anchor center and top");
//     anchor_x = o.target.oCoords.tl.x + (o.target.oCoords.tr.x-o.target.oCoords.tl.x)/2;
//     anchor_y_b =  o.target.oCoords.mb.y;
//     anchor_y_t =  o.target.y2;
//   } else if(prior_tr_x == o.target.oCoords.tr.x && prior_tl_x == o.target.oCoords.tl.x&& prior_mb_y == o.target.oCoords.mb.y && prior_mt_y != o.target.oCoords.mt.y) {
//     anchor_direction = "center";
//     console.log("Anchor center and bottom");
//     anchor_x = o.target.oCoords.tl.x + (o.target.oCoords.tr.x-o.target.oCoords.tl.x)/2;
//     anchor_y_b =  o.target.y1;
//     anchor_y_t =  o.target.oCoords.mt.y;
//   } else{
//     anchor_direction = "center";
//     console.log("Anchor center");
//     anchor_x = o.target.oCoords.tl.x + (o.target.oCoords.tr.x-o.target.oCoords.tl.x)/2;
//     anchor_y_b =  o.target.oCoords.mb.y;
//     anchor_y_t =  o.target.oCoords.mt.y;
//   }
//   console.log("prior_tr_x, current: " + prior_tr_x + "," +o.target.oCoords.tr.x);
//   console.log("prior_tl_x, current: " + prior_tl_x + "," +o.target.oCoords.tl.x);
//   console.log("prior_mb_y, current: " + prior_mb_y + "," +o.target.oCoords.mb.y);
//   console.log("prior_mt_y, current: " + prior_mt_y + "," +o.target.oCoords.mt.y);
//   let stroke1 = 10;
//   let stroke2 = 20;
//   let stroke3 = 30;
//   if(thickness < stroke2){
//     // console.log("lower bound");
//     o.target.set({ scaleX: 1,scaleY: 1, strokeWidth : stroke1, originX: anchor_direction,  x1: anchor_x,x2: anchor_x, y1: anchor_y_b, y2: anchor_y_t });
//   } else if (thickness < stroke3) {
//     o.target.set({ scaleX: 1,scaleY: 1, strokeWidth : stroke2, originX: anchor_direction, x1: anchor_x, x2: anchor_x, y1: anchor_y_b, y2: anchor_y_t });
//   } else {
//     o.target.set({ scaleX: 1,scaleY: 1, strokeWidth : stroke3, originX: anchor_direction, x1: anchor_x,x2: anchor_x,  y1: anchor_y_b, y2: anchor_y_t });
//   }
//   prior_tr_x = o.target.oCoords.tr.x;
//   prior_tl_x = o.target.oCoords.tl.x;
//   prior_mb_y = o.target.oCoords.mb.y;
//   prior_mt_y = o.target.oCoords.mt.y;
// });

function getCoordsFromLine(){
  var lma_col_cnt = 0;
  var lma_col_max = lmaSelectedCols.length;
  // blank array with size canvas height x number of lma columns
  let condensedArray = Array(height+1).fill().map(() => Array(lma_col_max).fill(0));
  // window.alert(lmaSelectedCols);
  // window.alert(lma_col_max);
  for(j=0; j <lma_col_max; j++){
    condensedArray[0][j] = lmaSelectedCols[j];
  // for each item, check which column it is in and add to array
    // window.alert(itemNumber);
    for(i=0; i <=itemNumber; i++){
      // oCoords.tl.x, oCoords.tl.y // top left corner
      // oCoords.tr.x, oCoords.tr.y // top right corner
      // oCoords.bl.x, oCoords.bl.y // bottom left corner
      // oCoords.br.x, oCoords.br.y // bottom right corner
        //window.alert(i);
if (!(removedObjList.includes(i))){ // skip items that have been deleted
      if (parseInt(canvas2.item(i).oCoords.tr.x) <= parseInt(columnBoundaries[j+1]) && parseInt(canvas2.item(i).oCoords.tr.x) > parseInt  (columnBoundaries[j])){
        // if the top right corner is within the bound of the lma column
        top_y_coord = canvas2.item(i).oCoords.tr.y;
        if (top_y_coord<1){
          // window.alert(top_y_coord);
          top_y_coord=1;
        }
        bottom_y_coord = canvas2.item(i).oCoords.br.y;
        thickness = parseInt(canvas2.item(i).oCoords.tr.x) - parseInt(canvas2.item(i).oCoords.tl.x);
        // window.alert(top_y_coord);
        // window.alert(bottom_y_coord);

        for(n=parseInt(top_y_coord); n<=canvas2.height;n++){
     // for(n=parseInt(top_y_coord); n<=parseInt(bottom_y_coord);n++){
        // make intensity equal 1, 2, or 3
        //     //window.alert(thickness)
        //   if (thickness <= 10){
        //     // window.alert("HERE1");
        //     condensedArray[n][j] = 1;

        //   }
        //   else if (thickness <= 20) {
        //     condensedArray[n][j] = 2;
        //   }
        //   else{
        //     // window.alert("HERE3");
        //     condensedArray[n][j] = 3;
        //   }

        condensedArray[n][j] = Math.round(thickness/10);
        
        // continuous intensity
        // condensedArray[n][j] = Math.round((thickness/10 + Number.EPSILON) * 10) / 10; // normalize by initial width; default intensity = 1; one decimal place
     }

      }
}
    }
  }
    // window.alert(condensedArray);
    return condensedArray;
}


// select all objects
function deleteObjects(){
    var activeObject = canvas2.getActiveObject(),
    activeGroup = canvas2.getActiveGroup();
    if (activeObject) {
        if (confirm('Are you sure you want to delete the selected stroke?')) {
            mode="select_mode";
            document.getElementById("draw").style.background='#d6d6d6';
            document.getElementById("select").style.background='#2BB6F6';
            document.getElementById("delete").style.background='#d6d6d6';
            document.getElementById("columns").style.background='#d6d6d6';
            //window.alert(itemNumber);
            removedObjList.push(itemNumber);
            canvas2.remove(activeObject);
            canvas2.renderAll();
        }
    }
    else if (activeGroup) {
        if (confirm('Are you sure you want to delete the selected stroke?')) {
            mode="select_mode";
            document.getElementById("draw").style.background='#d6d6d6';
            document.getElementById("select").style.background='#2BB6F6';
            document.getElementById("delete").style.background='#d6d6d6';
            document.getElementById("columns").style.background='#d6d6d6';
            var objectsInGroup = activeGroup.getObjects();
            canvas2.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas2.remove(object);
            canvas2.renderAll();
            });
        }
    }
}

// under construction
function colorObjects(){
    var activeObject = canvas2.getActiveObject();
    // activeGroup = canvas2.getActiveGroup();
    activeObject.borderColor = "#b3b1b1";
    // thickness = parseInt(activeObject.oCoords.tr.x) - parseInt(activeObject.oCoords.tl.x);
    // if (thickness <= 10){
    //         // window.alert("HERE1");
    //         activeObject.strokeStyle = "#b3b1b1";
    //       }
    //       else if (thickness <= 20) { //might be able to add snap to behavior here
    //         activeObject.strokeStyle = "#616161";
    //       }
    //       else{
    //         // window.alert("HERE3");
    //         activeObject.strokeStyle = "#0a0a0a";
    //       }

    // else if (activeGroup) {
    //     if (confirm('Are you sure?')) {
    //         var objectsInGroup = activeGroup.getObjects();
    //         canvas2.discardActiveGroup();
    //         objectsInGroup.forEach(function(object) {
    //         canvas2.remove(object);
    //         });
    //     }
    // }
}

// /* SETUP FUNCTIONS */

// this is a dictionary in javascript; no longer in use
var lmaObject = {
    "Body": {
        "Parts": ["Head","Center of Levity","Waist","Center of Gravity","Shoulder L","Shoulder R","Elbow L","Elbow R","Wrist L","Wrist R","Fingers L","Fingers R","Hip L","Hip R","Knee L","Knee R","Ankle L","Ankle R","Toes L","Toes R"],
        "Basic Body Actions": ["Change of Support","Change of Support (series)","Posture","Gesture","Condense","Expand","Rotate","Hold","Focus","Vocalize","Touch","Travel","Roll","Slide","Walk","Run","Jump"],
		"Features": ["Axis of Length", "Upper","Lower","Midline","Left","Right","Core","Proximal","Distal","Face"],
		"Breath": ["Breath", "Inhale","Exhale"],
		"Sensing": ["Weight-sensing", "Flow-sensing", "Passive-weight"],
		"Patterns": ["Radial Symmetry","Spinal","Core-Distal","Head-Tail","Upper-Lower","Right-Left","Cross-lateral"]
    },
    "Space": {
        "Zones": ["High Zone","Low Zone","Right Zone","Left Zone","Front Zone","Back Zone"],
        "Reach Space": ["Near","Mid","Far"],
		"Planes": ["Vertical","Sagittal","Horizontal"],
		"Pathways": ["Central","Peripheral","Transverse"],
		"Spatial Direction": ["Middle","Forward Middle","Left Middle","Right Middle","Back Middle","Place Middle","Left Forward Middle","Right Forward Middle","Left Back Middle","Right Back Middle","Low","Forward Low","Left Low","Right Low","Back Low","Place Low","Left Forward Low","Right Forward Low","Left Back Low","Right Back Low","High","Forward High","Left High","Right High","Back High","Place High","Left Forward High","Right Forward High","Left Back High","Right Back High"]
    },
    "Time": {
      "Sequencing": ["Repetition", "Reversal", "Retrograde", "Accumulation", "Theme and variation", "Canon", "Echoing", "Out-of-step"],
      "Emphasis": ["Emphasis"],
      "Phrasing": ["Even","Impulsive","Impactive","Swing","Becoming","Diminishing","Vibratory"]
        },
	"Shape": {
		"Still Shape Forms": ["Pin","Ball","Wall","Tetrahedron","Screw"],
		"Primary Shape Patterns": ["Concave","Convex","Gather","Scatter"],
		"Modes of Shape Change": ["Shape Flow","Directional","Arc-like","Spoke-like","Shaping","Inner Shaping"],
		"Shape Qualities": ["Rising","Spreading","Enclosing","Retreating","Advancing","Sinking"]
		},
	"Effort": {
		"Factors": ["Sudden", "Sustained","Strong","Light","Direct","Indirect","Free","Bound"],
        "States": ["Mobile", "Remote","Dream","Stable","Rhythm","Awake"],
        "Drives": ["Action", "Passion","Spell","Vision"]
		},
    // "Context": {
    //         "Situational": ["Emergency", "Holiday","Celebration","Culture"],
    //         "Environmental": ["Indoors", "Outdoors","Urban","Wilderness","Home","Office"],
    //         "Appearance": ["Race", "Age","Gender","Status"]
    // }
    // "Context": {
    //         "Addressing": ["Other Actor", "Prop","Environment"],
    //         "Environment": ["Indoors", "Outdoors","Urban","Wilderness","Home","Office"],
    //         "Appearance": ["Race", "Age","Gender","Status"]
    "Relationship": {
        "Counterpart": ["Awareness", "Addressing","Nearby", "Contact", "Support"],
        "Environment": ["Awareness", "Addressing","Nearby", "Contact", "Support"],
        "Termination of": ["Hold", "Release"]
    }
}

//no longer using to select video
var videoObject = {"video1_angry_subject0":[], "video1_dejected_subject1":[],
                    "video2_annoyed_subject0":[], "video2_annoyed_subject1":[],
                    "video3_happy_subject0":[], "video3_happy_subject1":[], "video3_happy_subject2":[], "video3_happy_subject3":[],
                    "video4_surprised_subject0":[]}

// for drawing the dotted lines
function makeTimeColumn(){
	var num_rows=video.duration;
	var increment = 5;
	var spacing = canvas.height/(increment*num_rows);
	ctx.setLineDash([5, 10]);
	for(let i = 0; i < increment*num_rows+1; i++){

		ctx.beginPath();
		ctx.strokeStyle = "#7a7a7a"; //Change Line Color
		ctx.lineWidth = 2; //Change Line Width/Thickness
		ctx.moveTo(0,i*spacing);
		ctx.lineTo(width,i*spacing);
		// ctx.endPath();
		ctx.stroke();
	}
	ctx.setLineDash([0, 0])
	ctx.beginPath();
	ctx.strokeStyle = "#7a7a7a"; //Change Line Color
	ctx.lineWidth = 2; //Change Line Width/Thickness
	ctx.moveTo(40,0);
	ctx.lineTo(40,height);
	ctx.stroke();
	addFixedLineToArray(40,0,height);
	var j =0;
	while(j< increment*num_rows+1){
		// window.alert(j);
		ctx.textAlign ="right";
		ctx.font = "13px serif";
		ctx.fillStyle = "black";
		ctx.fillText((num_rows-(j/increment)).toFixed(1), 25, (j*spacing)+15,500);
		j+=1;
		// window.alert(j);
	}

}

// THE START OF THE MAIN CODE

var lmaSel;
var videoSel;

window.onload = function () {
	makeTimeColumn()

    // old lmaSel generator
    // var componentSel = document.getElementById("componentSel"),
    //     categorySel = document.getElementById("categorySel"),
    //     elementSel = document.getElementById("elementSel");
    // for (var component in lmaObject) {
    //     componentSel.options[componentSel.options.length] = new Option(component, component);
    // }
    // componentSel.onchange = function () {
    //     categorySel.length = 1; // remove all options bar first
    //     elementSel.length = 1; // remove all options bar first
    //     if (this.selectedIndex < 1) return; // done
    //     for (var category in lmaObject[this.value]) {
    //         categorySel.options[categorySel.options.length] = new Option(category, category);
    //     }
    // }
    // componentSel.onchange(); // reset in case page is reloaded
    // categorySel.onchange = function () {
    //     elementSel.length = 1; // remove all options bar first
    //     if (this.selectedIndex < 1) return; // done
    //     var elements = lmaObject[componentSel.value][this.value];
    //     for (var i = 0; i < elements.length; i++) {
    //         elementSel.options[elementSel.options.length] = new Option(elements[i], elements[i]);
    //     }
    // }
	// 	componentSel.onchange(); // reset in case page is reloaded
	// 	elementSel.onchange = function () {
	// 		lmaSel = this.value;
	// 		// window.alert(lmaSel);
	// 	}

    // new lmaSel generator (under construction)
    // var bodySel = document.getElementById("bodySel"),
    //     spaceSel = document.getElementById("spaceSel"),
    //     timeSel = document.getElementById("timeSel");
    //     shapeSel = document.getElementById("shapeSel");
    //     effortSel = document.getElementById("effortSel");
    
    // bodySel.onchange = function () {
    //     lmaSel = this.value;
    //     // window.alert(lmaSel);
    // }
    // spaceSel.onchange = function () {
    //     lmaSel = this.value;
    //     // window.alert(lmaSel);
    // }
    // timeSel.onchange = function () {
    //     lmaSel = this.value;
    //     // window.alert(lmaSel);
    // }
    // shapeSel.onchange = function () {
    //     lmaSel = this.value;
    //     // window.alert(lmaSel);
    // }
    // effortSel.onchange = function () {
    //     lmaSel = this.value;
    //     // window.alert(lmaSel);
    // }

    // single menu, newest selector
    var elSel = document.getElementById("elSel");
        
    elSel.onchange = function () {
        lmaSel = this.value;
        // window.alert(lmaSel);
    }

    // video select
    var videoSel = document.getElementById("videoSel1");
    for (var video1 in videoObject) {
        videoSel.options[videoSel.options.length] = new Option(video1, video1);
    }
    videoSel.onchange = function () {
        videoSel = this.value;
        }

    // var videoSel = document.getElementById('video');
    // // videoSel.length = new Option(video, video)
    // for (var video1 in videoObject) {
    //     videoSel.options[videoSel.options.length] = new Option(video1, video1);
    // }
    // videoSel.onchange = function () {
    //     videoSel = this.value;
    //     }

    }


// drawing the vertical lines for adding columns
function addFixedLineToArray(x,starty,endy){
	// window.alert("Fixed Line to Array");
	for(let i=starty; i < endy; i++){
		// window.alert(i);
  line_points[i][x] = 2;}
    }

var columnCount = 1;
var hLinePlace = 30;
var lmaSelectedCols = [];
var columnBoundaries = [30];
var selectedVideo;


function pickVideo(){
    selectedVideo=document.getElementById("videoSel1").value;
    if (selectedVideo == "") {
        window.alert("Please select or upload a video.")
        return;
    }
    timerange.setAttribute("src", "assets/videos/"+selectedVideo+".png");
    video.setAttribute("src", "assets/videos/"+selectedVideo+".mp4");
    video.onloadedmetadata = function() {
        clearAllButton();
    }

    document.getElementById('videoInfoArea').style.visibility = 'hidden';
    document.getElementById('addColumsArea').style.visibility = 'visible';
    document.getElementById('miniAddColumsArea').style.visibility = 'visible';
}

// code for custom video upload
vidFile.onchange = function(e){
  var sound = document.getElementById('video');
  sound.src = URL.createObjectURL(this.files[0]);
  // not really needed in this exact case, but since it is really important in other cases,
  // don't forget to revoke the blobURI when you don't need it
  sound.onend = function(e) {
    URL.revokeObjectURL(this.src);
  }
  timerange.setAttribute("src", "assets/videos/default.png");
  selectedVideo="annotation";
  video.onloadedmetadata = function() {
        clearAllButton();
    }
  document.getElementById('videoInfoArea').style.visibility = 'hidden';
  document.getElementById('addColumsArea').style.visibility = 'visible';
  document.getElementById('miniAddColumsArea').style.visibility = 'visible';
}


// old version
function addLMAColumn(){
	ctx.setLineDash([0, 0])
	ctx.beginPath();
	ctx.strokeStyle = "#7a7a7a"; //Change Line Color
	ctx.lineWidth = 2; //Change Line Width/Thickness
	//var columnWidth = 30;
	ctx.textAlign ="middle";
	ctx.font = "13px serif";
	ctx.fillStyle = "black";
	hLinePlace += 70;//(lmaSel.toString().length*10);
	ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
	ctx.moveTo(hLinePlace,0);
	ctx.lineTo(hLinePlace,height);
	ctx.stroke();
	addFixedLineToArray(hLinePlace,0,height);
    columnBoundaries.push(hLinePlace);
	line_points[0][hLinePlace] = lmaSel;
	lmaSelectedCols.push(lmaSel);
	// columnCount+=1;
    document.getElementById('miniAddColumsArea').style.visibility = 'hidden';
}

// new version with images
function addLMAColumn2(){
    if (lmaSel != undefined) {
    ctx.setLineDash([0, 0])
    ctx.beginPath();
    ctx.strokeStyle = "#7a7a7a"; //Change Line Color
    ctx.lineWidth = 2; //Change Line Width/Thickness
    //var columnWidth = 30;
    //ctx.textAlign ="middle";
    //ctx.font = "13px serif";
    //ctx.fillStyle = "black";
    hLinePlace += 70;//(lmaSel.toString().length*10);
    //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
    ctx.moveTo(hLinePlace,0);
    ctx.lineTo(hLinePlace,height);
    ctx.stroke();
    addFixedLineToArray(hLinePlace,0,height);
    columnBoundaries.push(hLinePlace);
    line_points[0][hLinePlace] = lmaSel;
    lmaSelectedCols.push(lmaSel);
    // columnCount+=1;
    var symPath = "assets/symbols/";
    var symExt = ".svg";
    //window.alert(lmaSel)
    imgSym.src = symPath.concat(lmaSel.toString(),symExt);
    //window.alert(imgSym.src)
    ctx3.drawImage(imgSym, hLinePlace-50, 0);
    document.getElementById('miniAddColumsArea').style.visibility = 'hidden';
}
}


//under construction, trying to make SVGs less blurry
function addLMAColumn3(){
    if (lmaSel != undefined) {
    ctx.setLineDash([0, 0])
    ctx.beginPath();
    ctx.strokeStyle = "#7a7a7a"; //Change Line Color
    ctx.lineWidth = 2; //Change Line Width/Thickness
    //var columnWidth = 30;
    //ctx.textAlign ="middle";
    //ctx.font = "13px serif";
    //ctx.fillStyle = "black";
    hLinePlace += 70;//(lmaSel.toString().length*10);
    //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
    ctx.moveTo(hLinePlace,0);
    ctx.lineTo(hLinePlace,height);
    ctx.stroke();
    addFixedLineToArray(hLinePlace,0,height);
    columnBoundaries.push(hLinePlace);
    line_points[0][hLinePlace] = lmaSel;
    lmaSelectedCols.push(lmaSel);
    // columnCount+=1;
    var symPath = "assets/symbols/";
    var symExt = ".svg";
    //window.alert(lmaSel)
    imgSym.src = symPath.concat(lmaSel.toString(),symExt);
    //window.alert(imgSym.src)

    fabric.loadSVGFromURL('assets/symbols/Rotate.svg', function(objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);
    //obj.scale(0.5);
    canvas3.add(obj,hLinePlace-50, 0);
});
    //ctx3.drawImage(imgSym, hLinePlace-50, 0);
    document.getElementById('miniAddColumsArea').style.visibility = 'hidden';
}
}



lmaSelhappy = ["Rotate", "Jump", "Light", "Free", "High", "Rising", "Spreading", "Repetition"];
lmaSelangry = ["Strong", "Sudden", "Advancing", "Direct"];
lmaSelsadness = ["Passive-weight", "Condense", "Sinking", "Head", "Low", "Near", "Hold"];
lmaSelfear = ["Retreating", "Condense", "Bound", "Back", "Enclosing"];

function addHappyColumns(){
    for (var i = 0; i<8; i++){
        ctx.setLineDash([0, 0])
        ctx.beginPath();
        ctx.strokeStyle = "#7a7a7a"; //Change Line Color
        ctx.lineWidth = 2; //Change Line Width/Thickness
        //var columnWidth = 30;
        //ctx.textAlign ="middle";
        //ctx.font = "13px serif";
        //ctx.fillStyle = "black";
        hLinePlace += 70;//(lmaSel.toString().length*10);
        //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
        ctx.moveTo(hLinePlace,0);
        ctx.lineTo(hLinePlace,height);
        ctx.stroke();
        addFixedLineToArray(hLinePlace,0,height);
        columnBoundaries.push(hLinePlace);
        line_points[0][hLinePlace] = lmaSelhappy;
        lmaSelectedCols.push(lmaSelhappy[i]);
        // columnCount+=1;

        ctx3.drawImage(imgSymHappy[i], hLinePlace-50, 0);

        setDrawMode();

    }
}

function addAngryColumns(){
    for (var i = 0; i<4; i++){
        ctx.setLineDash([0, 0])
        ctx.beginPath();
        ctx.strokeStyle = "#7a7a7a"; //Change Line Color
        ctx.lineWidth = 2; //Change Line Width/Thickness
        //var columnWidth = 30;
        //ctx.textAlign ="middle";
        //ctx.font = "13px serif";
        //ctx.fillStyle = "black";
        hLinePlace += 70;//(lmaSel.toString().length*10);
        //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
        ctx.moveTo(hLinePlace,0);
        ctx.lineTo(hLinePlace,height);
        ctx.stroke();
        addFixedLineToArray(hLinePlace,0,height);
        columnBoundaries.push(hLinePlace);
        line_points[0][hLinePlace] = lmaSelangry;
        lmaSelectedCols.push(lmaSelangry[i]);
        // columnCount+=1;

        ctx3.drawImage(imgSymAngry[i], hLinePlace-50, 0);

        setDrawMode();

    }
}

function addSadnessColumns(){
    for (var i = 0; i<7; i++){
        ctx.setLineDash([0, 0])
        ctx.beginPath();
        ctx.strokeStyle = "#7a7a7a"; //Change Line Color
        ctx.lineWidth = 2; //Change Line Width/Thickness
        //var columnWidth = 30;
        //ctx.textAlign ="middle";
        //ctx.font = "13px serif";
        //ctx.fillStyle = "black";
        hLinePlace += 70;//(lmaSel.toString().length*10);
        //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
        ctx.moveTo(hLinePlace,0);
        ctx.lineTo(hLinePlace,height);
        ctx.stroke();
        addFixedLineToArray(hLinePlace,0,height);
        columnBoundaries.push(hLinePlace);
        line_points[0][hLinePlace] = lmaSelsadness;
        lmaSelectedCols.push(lmaSelsadness[i]);
        // columnCount+=1;

        ctx3.drawImage(imgSymSadness[i], hLinePlace-50, 0);

        setDrawMode();

    }
}

function addFearColumns(){
    for (var i = 0; i<5; i++){
        ctx.setLineDash([0, 0])
        ctx.beginPath();
        ctx.strokeStyle = "#7a7a7a"; //Change Line Color
        ctx.lineWidth = 2; //Change Line Width/Thickness
        //var columnWidth = 30;
        //ctx.textAlign ="middle";
        //ctx.font = "13px serif";
        //ctx.fillStyle = "black";
        hLinePlace += 70;//(lmaSel.toString().length*10);
        //ctx.fillText(lmaSel.toString(), hLinePlace-5, 10,500);
        ctx.moveTo(hLinePlace,0);
        ctx.lineTo(hLinePlace,height);
        ctx.stroke();
        addFixedLineToArray(hLinePlace,0,height);
        columnBoundaries.push(hLinePlace);
        line_points[0][hLinePlace] = lmaSelfear;
        lmaSelectedCols.push(lmaSelfear[i]);
        // columnCount+=1;

        ctx3.drawImage(imgSymFear[i], hLinePlace-50, 0);

        setDrawMode();

    }
}

function showCustomCols(){
    document.getElementById('addColumsArea').style.visibility = 'visible';
    document.getElementById('miniAddColumsArea').style.visibility = 'hidden';
}

// FOR OLD VERSION OF LINES
// function getRidBlankColumns(array_name){
// 	var numFilledCols = 0;
// 	var colsToSave = [];
// 	for (var i=0; i<array_name[0].length; i++){
// 		columnCheck=0;
// 		for (var j=0; j<array_name.length; j++){
// 			columnCheck += array_name[j][i];
// 		}
// 		if (columnCheck > 0 && columnCheck < height+2){
// 			numFilledCols += 1;
// 			colsToSave.push(i)
//       /* window.alert(i) */;
//       //window.alert(colsToSave);
// 		}
// 	}
// 	let condensedArray = Array(height+1).fill().map(() => Array(numFilledCols).fill(0));
//   for (var k=0; k<numFilledCols; k++){
//   columnNumber = colsToSave[k];
//   for (var i=0; i<height; i++){
//   condensedArray[i][k] = array_name[i][columnNumber];
// 	condensedArray[0][k] = lmaSelectedCols[k];
//   }
//   }
//   return condensedArray;
// }


// not used as a button but used in various places to clear canvas (not quite correctly yet)
function clearAllButton(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas2.clear();
  canvas3.clear();
  // canvas2.clearRect(0, 0, canvas.width, canvas.height);
    makeTimeColumn();

    // // eventually need to reset these modes... not working currently 
    // document.getElementById("draw").style.background='#2BB6F6';
    // document.getElementById("select").style.background='#d6d6d6';
    // document.getElementById('select').style.visibility = 'visible';
    // document.getElementById("delete").style.background='#d6d6d6';
    // document.getElementById('delete').style.visibility = 'hidden';
    // document.getElementById("columns").style.background='#ededed';
    // document.getElementById("columns").style.color='#cfcfcf';
    // document.getElementById('addColumsArea').style.visibility = 'visible';
    // document.getElementById('miniAddColumsArea').style.visibility = 'visible';
    // document.getElementById('excel').style.visibility = 'hidden';
}

// /* CSV EXPORT */

function exportToCsv(filename, rows) {
        // setDrawMode();

        var processRow = function (row) {
          // window.alert("row: " + row);
            var finalVal = '';
            // window.alert("row length " + row.length);
            for (var j = 0; j < row.length; j++) {
                // window.alert("in processROw");
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
                // window.alert(finalVal);
            }
            return finalVal + '\n';
        };
        // window.alert(rows.length);
        var csvFile = '';

        var flipped_rows = [];
        flipped_rows.push(rows[0]);
        // window.alert(rows.length);
        for (var n=1; n < rows.length-1; n++){
          flipped_rows.push(rows[rows.length-n]);
        //   // flip rows and add time column
        };
        var csv_time_col = ['Time (s)'];

        // variable time step
        // for (var t=0; t< flipped_rows.length; t++ ){
        //   time_step = video.duration/flipped_rows.length;
        //   time_step_a = time_step*t;
        //   time_step_a = Math.round((time_step_a + Number.EPSILON) * 100) / 100;
        //   //time_step = parseFloat(time_step.toFixed(4));
        //   csv_time_col.push(time_step_a);
        // }

        // fixed time step
        var time_step;
        time_step = 0.05;

        var duration_fixed = Math.round(video.duration/time_step);
        // window.alert(duration_fixed);

        var time_step_a;

        for (var t=0; t<=duration_fixed; t++){
          time_step_a = (time_step*t).toFixed(2);
          // window.alert(time_step_a);
          csv_time_col.push(time_step_a);
        };
        // window.alert(csv_time_col);

        // variable time step
        for (var i = 0; i < csv_time_col.length; i++) {
          // window.alert(flipped_rows[i]);

            var time_added_row = [csv_time_col[i]];
            for (var k = 0; k < flipped_rows[i].length; k++) {
              var skip_increment = Math.floor(flipped_rows.length/csv_time_col.length);
              time_added_row.push(flipped_rows[parseInt(i*skip_increment)][k]);
            }
            // window.alert(time_added_row);
            csvFile += processRow(time_added_row);
            // window.alert(csvFile);
        }


        // for (var i = 0; i < flipped_rows.length; i++) {
        //   // window.alert(flipped_rows[i]);
        //
        //     var time_added_row = [csv_time_col[i]];
        //     for (var k = 0; k < flipped_rows[i].length; k++) {
        //       time_added_row.push(flipped_rows[i][k]);
        //     }
        //     // window.alert(time_added_row);
        //     csvFile += processRow(time_added_row);
        //     // window.alert(csvFile);
        // }


        // for (var i = 0; i<csv_time_col.length; i++){
        //   var time_added_row = [csv_time_col[i]];
        //   for (var k = 0; k < flipped_rows[i].length; k++){
        //     // figure out which increment to grab
        //     skip_increment = Math.round(flipped_rows.length/csv_time_col.length);
        //     // window.alert(skip_increment);
        //     j = i*skip_increment;
        //     time_added_row.push(flipped_rows[j][k]);
        //   };
        //   // window.alert(time_added_row);
        //   csvFile += processRow(time_added_row);
        //   // window.alert(csvFile);
        //   // window.alert(i);
        // };

        // window.alert("HERE");
        //window.alert(csvFile);

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+

            navigator.msSaveBlob(blob, filename);
        } else {

            var link = document.createElement("a");

            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }


function downloadCSV(){
    var timestamp = new Date();
  // exportToCsv('export.csv',condensedArray)}
var filenameFancy = selectedVideo+'.csv';
  exportToCsv(filenameFancy,getCoordsFromLine());}
// exportToCsv('export.csv', getRidBlankColumns(line_points))}


// /* MODE CONTROLS */

function setDrawMode(){
    mode="draw_mode";
    canvas2.discardActiveObject().renderAll();
    canvas2.selection=false;


    for(i=0; i <=itemNumber; i++){
        if (!(removedObjList.includes(i))){ // skip items that have been deleted
            canvas2.item(i).selectable = false;
        }
    }

    document.getElementById("draw").style.background='#2BB6F6';
    document.getElementById("select").style.background='#d6d6d6';
    document.getElementById('select').style.visibility = 'visible';
    document.getElementById("delete").style.background='#d6d6d6';
    document.getElementById('delete').style.visibility = 'hidden';
    document.getElementById("columns").style.background='#ededed';
    document.getElementById("columns").style.color='#cfcfcf';
    document.getElementById('addColumsArea').style.visibility = 'hidden';
    document.getElementById('miniAddColumsArea').style.visibility = 'hidden';
    document.getElementById('excel').style.visibility = 'visible';
}

function setEditMode(){
    mode="select_mode";
    canvas2.selection=true;
    canvas2.renderAll();


    for(i=0; i <=itemNumber; i++){
        if (!(removedObjList.includes(i))){ // skip items that have been deleted
            canvas2.item(i).selectable = true;
        }
    }

    document.getElementById("select").style.background='#2BB6F6';
    document.getElementById("draw").style.background='#d6d6d6';
    document.getElementById("delete").style.background='#d6d6d6';
    document.getElementById('delete').style.visibility = 'visible';
    document.getElementById("columns").style.background='#ededed';

}


// /* VIDEO CONTROLS */

const video = document.querySelector(".video");
const toggleButton = document.querySelector(".toggleButton");
const muteButton = document.querySelector(".muteButton");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const progress2 = document.querySelector(".progress2");
const progressBar2 = document.querySelector(".progress__filled2");

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function mutePlay() {
  if (video.muted) {
    video.muted=false;
  } else {
    video.muted=true;
  }
}

function updateToggleButton() {
    // toggleButton.innerHTML = video.paused ? "▶️" : "⏸️";
    // toggleButton.innerHTML = video.paused ? "&nbsp;Play&nbsp;" : "Pause";
    toggleButton.innerHTML = video.paused ? "Play" : "Pause";
}

function handleProgress() {
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  const progressPercentage = (video.currentTime / video.duration) * 100;
  progressBar.style.height = `${progressPercentage}%`;
  progressBar2.style.height = `${progressPercentage}%`;

// ADD HORIZONTAL LINE FOR TRACKING
  const heightPercentage = canvas.height- ((video.currentTime / video.duration) * canvas.height);
  ctx4.setLineDash([0, 0])
    ctx4.beginPath();
    ctx4.strokeStyle = "#ff0000"; //Change Line Color
    ctx4.lineWidth = 2; //Change Line Width/Thickness
    ctx4.moveTo(40,heightPercentage);
    ctx4.lineTo(canvas.width,heightPercentage);
    ctx4.stroke();
}


// function scrub(e) {
//   const scrubTime = (e.offsetY / progress.offsetHeight) * video.duration;
//   video.currentTime = scrubTime;
// }
//
toggleButton.addEventListener("click", togglePlay);
muteButton.addEventListener("click", mutePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggleButton);
video.addEventListener("pause", updateToggleButton);

video.addEventListener("timeupdate", handleProgress);
//progress.addEventListener("click", scrub);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") togglePlay();
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    });

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('componentSel','categorySel','elementSel');
//     var instances = M.FormSelect.init(elems, lmaObject);
//     });



const skipBtns = document.querySelectorAll("[data-skip]");

function handleSliderUpdate() {
  video[this.name] = this.value;
}

function handleSkip() {
  video.currentTime += +this.dataset.skip;
}

skipBtns.forEach((btn) => {
  btn.addEventListener("click", handleSkip);
});


// SCREENSHOT, under construction

function takeScreenshot() {
    var screenshot = document.documentElement
        .cloneNode(true);
    // screenshot.style.pointerEvents = 'none';
    // screenshot.style.overflow = 'hidden';
    // screenshot.style.webkitUserSelect = 'none';
    // screenshot.style.mozUserSelect = 'none';
    // screenshot.style.msUserSelect = 'none';
    // screenshot.style.oUserSelect = 'none';
    // screenshot.style.userSelect = 'none';
    // screenshot.dataset.scrollX = window.scrollX;
    // screenshot.dataset.scrollY = window.scrollY;
    var blob = new Blob([screenshot.outerHTML], {
        type: 'image/png'
    });
    return blob;
}

function generate() {
    window.URL = window.URL || window.webkitURL;
    window.open(window.URL
        .createObjectURL(takeScreenshot()));
}
