
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

function windowResized() {
  resizeCanvas(windowWidth, 550, WEBGL);
}


function setup() {
  canvas=createCanvas(windowWidth,550,WEBGL);
  // canvas.position(0,0);
  write_texts();
  Reset();
  document.getElementById("lihtsam").style.visibility = "hidden";
  document.getElementById("latex").style.visibility = "hidden";
    stroke(100,180,200);
    strokeWeight(4);
    let fov= PI/3;
    let cameraZ=(height/2.0)/tan(fov/2.0);
    perspective(fov, width/height, cameraZ/10000.0, cameraZ*10000);
}

function draw() {
  
  background(230,245,255);
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  MathQuill_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  
  // console.log(tex_vorrand.size)
  if(lopetamise_tingimus==true){
    background(15,30,60);
    new_step();
    orbitControl(4,4,0.01);
    rotateY(angle);
    rotateZ(angle*0.5);
    beginShape(POINTS);
    for (i=0;i<=empty_vec.length-1;i++){
      vertex(empty_vec[i].x,empty_vec[i].y, empty_vec[i].z);
      }
      endShape();
  angle=angle+0.01;
  camera(0, 0, 300 - sin(frameCount * 0.001) * 200, 0, 0, 0, 0, 1, 0);
  if (empty_vec.length >=100000){
      empty_vec=[];
      X=0;
      Y=0;
      Z=0;
    }
  }
  
}


function Reset(){
  
  if(ylesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
  }
  
  Ylesanne();
  tulemus.html("");

  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+300);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+300);
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  
  ylesannete_loendur=ylesannete_loendur+1;
}


function Ylesanne(){

  mudel=["korrutamine","jagamine"];
  mudeli_valik=random(mudel);
  
  arv1=int(random(-20,20));
  arv2=int(random(-20,20));
  arvuline_vastuse_massiiv=[arv1,arv2];
  laiendaja=int(random(1,10));
  arv1_laiendatud=arv1*laiendaja;
  arv2_laiendatud=arv2*laiendaja;
  
  asteX1=int(random(-35,35));
  asteX2=int(random(-35,35));
  asteY1=int(random(-35,35));
  asteY2=int(random(-35,35));
  // astmed=[[asteX1,asteX2],[asteY1,asteY2]];
  
  console.log(asteX1,asteX2,asteY1,asteY2)
  
  liikme_tahed1=["","x","y","x^{"+str(asteX1)+"}","y^{"+str(asteY1)+"}","x^{"+str(asteX1)+"}y^{"+str(asteY1)+"}"];
  liikme_tahed2=["","x","y","x^{"+str(asteX2)+"}","y^{"+str(asteY2)+"}","x^{"+str(asteX2)+"}y^{"+str(asteY2)+"}"];
  
  if (mudeli_valik=="korrutamine"){
    tahed1_index=int(random(0,6));
    tahed2_index=int(random(0,6));
    symbolic_esimene = str(arv1)+liikme_tahed1[tahed1_index];
    symbolic_teine =str(arv2)+liikme_tahed2[tahed2_index];
    if (arv2<0){
      symbolic_teine ="("+str(arv2)+liikme_tahed2[tahed2_index]+")";
    }
    antav_ylesanne=symbolic_esimene +"\\cdot"+symbolic_teine;
   
    console.log(tahed1_index,tahed2_index)
   
    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 36 tingimust.
    if (tahed1_index==0 && tahed2_index==0){
      vastus_kontrolliks = str(arv1*arv2);
    } else if ((tahed1_index==0 && tahed2_index==1) || (tahed1_index==1 && tahed2_index==0)) {
      vastus_kontrolliks = str(arv1*arv2)+"*x";
    } else if ((tahed1_index==0 && tahed2_index==2) || (tahed1_index==2 && tahed2_index==0)) {
      vastus_kontrolliks = str(arv1*arv2)+"*y";
    } else if (tahed1_index==0 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2);
    } else if (tahed1_index==0 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*y^"+str(asteY2);
    } else if (tahed1_index==0 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2)+"*y^"+str(asteY2);
    } else if (tahed1_index==1 && tahed2_index==1) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^2";
    } else if ((tahed1_index==1 && tahed2_index==2) || (tahed1_index==2 && tahed2_index==1)) {
      vastus_kontrolliks = str(arv1*arv2)+"*x*y";
    } else if (tahed1_index==1 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2+1)+"";
    } else if (tahed1_index==1 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*x"+"*y^"+str(asteY2)+"";
    } else if (tahed1_index==1 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2+1)+"*y^"+str(asteY2)+"";
    } else if (tahed1_index==2 && tahed2_index==2){
      vastus_kontrolliks = str(arv1*arv2)+"*y^2";
    } else if (tahed1_index==2 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2)+"*y";
    } else if (tahed1_index==2 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*y^"+str(asteY2+1)+"";
    } else if (tahed1_index==2 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2)+"*y^"+str(asteY2+1)+"";
    } else if (tahed1_index==3 && tahed2_index==0) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+"";
    } else if (tahed1_index==3 && tahed2_index==1) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+1)+"";
    } else if (tahed1_index==3 && tahed2_index==2) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+"*y";
    } else if (tahed1_index==3 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+asteX2)+"";
    } else if (tahed1_index==3 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+""+"*y^"+str(asteY2)+"";
    } else if (tahed1_index==3 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+asteX2)+""+"*y^"+str(asteY2)+"";
    } else if (tahed1_index==4 && tahed2_index==0) {
      vastus_kontrolliks = str(arv1*arv2)+"*y^"+str(asteY1)+"";
    } else if (tahed1_index==4 && tahed2_index==1) {
      vastus_kontrolliks = str(arv1*arv2)+"*x*y^"+str(asteY1)+"";
    } else if (tahed1_index==4 && tahed2_index==2) {
      vastus_kontrolliks = str(arv1*arv2)+"*y^"+str(asteY1+1)+"";
    } else if (tahed1_index==4 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2)+""+"*y^"+str(asteY1)+"";
    } else if (tahed1_index==4 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*y^"+str(asteY1+asteY2)+""
    } else if (tahed1_index==4 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX2)+"*y^"+str(asteY2+asteY1)+""
    } else if (tahed1_index==5 && tahed2_index==0) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+"*y^"+str(asteY1)+"";
    } else if (tahed1_index==5 && tahed2_index==1) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+1)+"*y^"+str(asteY1)+"";
    } else if (tahed1_index==5 && tahed2_index==2) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+"*y^"+str(asteY1+1)+"";
    } else if (tahed1_index==5 && tahed2_index==3) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+asteX2)+"*y^"+str(asteY1)+"";
    } else if (tahed1_index==5 && tahed2_index==4) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1)+"*y^"+str(asteY1+asteY2)+"";
    } else if (tahed1_index==5 && tahed2_index==5) {
      vastus_kontrolliks = str(arv1*arv2)+"*x^"+str(asteX1+asteX2)+"*y^"+str(asteY1+asteY2)+"";
    }
    
    if( arv1*arv2==0){
      vastus_kontrolliks="0";
    }
    
  }
  
  if (mudeli_valik=="jagamine"){
    tahed1_index=int(random(0,6));
    tahed2_index=int(random(0,6));
    symbolic_esimene = str(arv1_laiendatud)+liikme_tahed1[tahed1_index];
    symbolic_teine =str(arv2_laiendatud)+liikme_tahed2[tahed2_index];
    if (arv2_laiendatud<0){
      symbolic_teine ="("+str(arv2_laiendatud)+liikme_tahed2[tahed2_index]+")";
    }

    antav_ylesanne=symbolic_esimene +":"+symbolic_teine;
    console.log(tahed1_index,tahed2_index);
    
    for (i=20; i>=0;i=i-1){
      if (arv1%i==0 && arv2%i==0){
        arv1=arv1/i;
        arv2=arv2/i;
      }
    }
    
    konstant="("+str(abs(arv1))+")/("+str(abs(arv2))+")";
    
    if (abs(arv2)==1){
      konstant=abs(arv1);
    }
    
    // Nüüd, et saada string, millega vastust võrrelda, tuleb kirjutada 36 tingimust.
    if (tahed1_index==0 && tahed2_index==0){
      vastus_kontrolliks = konstant;
    } else if ((tahed1_index==0 && tahed2_index==1)) {
      vastus_kontrolliks = konstant+"*x^-1";
    } else if ( tahed1_index==1 && tahed2_index==0){
      vastus_kontrolliks =konstant+"*x";
    } else if ((tahed1_index==0 && tahed2_index==2)) {
      vastus_kontrolliks = konstant+"*y^-1";
    } else if (tahed1_index==2 && tahed2_index==0 ) {
      vastus_kontrolliks =konstant+"*y";
    } else if (tahed1_index==0 && tahed2_index==3) {
      vastus_kontrolliks = konstant+"*x^"+str(-asteX2);
    } else if (tahed1_index==0 && tahed2_index==4) {
      vastus_kontrolliks =  konstant+"*y^"+str(-asteY2);
    } else if (tahed1_index==0 && tahed2_index==5) {
      vastus_kontrolliks = konstant+"*x^"+str(-asteX2)+"*y^"+str(-asteY2);
    } else if (tahed1_index==1 && tahed2_index==1) {
      vastus_kontrolliks = konstant;
    } else if ((tahed1_index==1 && tahed2_index==2)) {
      vastus_kontrolliks = konstant+"*x*y^-1";
    } else if (tahed1_index==2 && tahed2_index==1){
      vastus_kontrolliks = konstant+"*x^-1*y";
    } else if (tahed1_index==1 && tahed2_index==3) {
      vastus_kontrolliks = konstant+"*x^"+str(1-asteX2);
            if (1-asteX2 == 0){
        vastus_kontrolliks = konstant;
      }
    } else if (tahed1_index==1 && tahed2_index==4) {
      vastus_kontrolliks = konstant+"*x"+"*y^"+str(-asteY2)+"";
    } else if (tahed1_index==1 && tahed2_index==5) {
      vastus_kontrolliks = konstant+"*x^"+str(1-asteX2)+"*y^"+str(-asteY2);
      if (1-asteX2==0){
        vastus_kontrolliks = konstant+"*y^"+str(-asteY2);
      }
    } else if (tahed1_index==2 && tahed2_index==2){
      vastus_kontrolliks =konstant;
    } else if (tahed1_index==2 && tahed2_index==3) {
      vastus_kontrolliks = konstant+"*x^"+str(-asteX2)+"*y";
    } else if (tahed1_index==2 && tahed2_index==4) {
      vastus_kontrolliks =  konstant+"*y^"+str(1-asteY2);
      if (1-asteY2==0){
        vastus_kontrolliks =  konstant;
      }
    } else if (tahed1_index==2 && tahed2_index==5) {
      vastus_kontrolliks =  konstant+"*x^"+str(-asteX2)+"*y^"+str(1-asteY2);
      if (1-asteY2==0){
        vastus_kontrolliks =  konstant+"*x^"+str(-asteX2);
      }
    } else if (tahed1_index==3 && tahed2_index==0) {
      vastus_kontrolliks =konstant+"*x^"+str(asteX1);
    } else if (tahed1_index==3 && tahed2_index==1) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1-1);
      if (asteX1-1==0){
        vastus_kontrolliks = konstant;
      }
    } else if (tahed1_index==3 && tahed2_index==2) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1)+"*y^-1";
    } else if (tahed1_index==3 && tahed2_index==3) {
      vastus_kontrolliks =konstant+"*x^"+str(asteX1-asteX2);
    } else if (tahed1_index==3 && tahed2_index==4) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1)+""+"*y^"+str(-asteY2);
    } else if (tahed1_index==3 && tahed2_index==5) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1-asteX2)+""+"*y^"+str(-asteY2);
      if (asteX1-asteX2==0){
        vastus_kontrolliks = konstant+"*y^"+str(-asteY2);
      }
    } else if (tahed1_index==4 && tahed2_index==0) {
      vastus_kontrolliks = konstant+"*y^"+str(asteY1);
    } else if (tahed1_index==4 && tahed2_index==1) {
      vastus_kontrolliks = konstant+"*x^-1*y^"+str(asteY1);
    } else if (tahed1_index==4 && tahed2_index==2) {
      vastus_kontrolliks = konstant+"*y^"+str(asteY1-1);
      if (asteY1-1==0){
        vastus_kontrolliks = konstant;
      }
    } else if (tahed1_index==4 && tahed2_index==3) {
      vastus_kontrolliks = konstant+"*x^"+str(-asteX2)+""+"*y^"+str(asteY1);
    } else if (tahed1_index==4 && tahed2_index==4) {
      vastus_kontrolliks = konstant+"*y^"+str(asteY1-asteY2);
    } else if (tahed1_index==4 && tahed2_index==5) {
      vastus_kontrolliks = konstant+"*x^"+str(-asteX2)+"*y^"+str(asteY1-asteY2);
      if (asteY1-asteY2==0){
        vastus_kontrolliks = konstant+"*x^"+str(-asteX2);
      }
    } else if (tahed1_index==5 && tahed2_index==0) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1)+"*y^"+str(asteY1);
    } else if (tahed1_index==5 && tahed2_index==1) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1-1)+"*y^"+str(asteY1);
      if (asteX1-1==0){
        vastus_kontrolliks = konstant+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==5 && tahed2_index==2) {
      vastus_kontrolliks =konstant+"*x^"+str(asteX1)+"*y^"+str(asteY1-1);
      if (asteY1-1==0) {
        vastus_kontrolliks =konstant+"*x^"+str(asteX1);
      }
    } else if (tahed1_index==5 && tahed2_index==3) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1-asteX2)+"*y^"+str(asteY1);
      if (asteX1-asteX2==0){
        vastus_kontrolliks = konstant+"*y^"+str(asteY1);
      }
    } else if (tahed1_index==5 && tahed2_index==4) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1)+"*y^"+str(asteY1-asteY2);
      if (asteY1-asteY2==0){
        vastus_kontrolliks = konstant+"*x^"+str(asteX1);
      }
    } else if (tahed1_index==5 && tahed2_index==5) {
      vastus_kontrolliks = konstant+"*x^"+str(asteX1-asteX2)+"*y^"+str(asteY1-asteY2);
      if (asteX1-asteX2==0){
        vastus_kontrolliks = konstant+"*y^"+str(asteY1-asteY2);
      }
      if (asteY1-asteY2==0){
        vastus_kontrolliks = konstant+"*x^"+str(asteX1-asteX2);
      }
      if ((asteY1-asteY2==0) && (asteX1-asteX2==0)){
        vastus_kontrolliks = konstant;
      }
    }
    
    // KUI LUGEJA NULL, SIIS VASTUS ON NULL.
    if (Math.sign(arv1)==0){
      vastus_kontrolliks="0";
    }
    
  // KUI NIMETAJA ON NULL, SIIS JAGADA EI SAA.  
  if (arv2_laiendatud==0){
      vastus_kontrolliks="-";
    }
    // KUI LUGEJA NIMETAJA VAHELINE KORRUTIS ON NEGATIIVNE, SIIS TULEB KONSTANDI ETTE MIINUSMÄRK.
      if (Math.sign(arv1*arv2)==-1){
    vastus_kontrolliks="-"+vastus_kontrolliks;
  }
    
  }
  
   console.log(antav_ylesanne)
    // console.log(vastus_kontrolliks)
   tex_string=antav_ylesanne+"=";
   katex.render( tex_string, tex_vorrand.elt);
   yl_text.html("Korruta või jaga üksliikmed. Võimalusel taanda arvkordaja.");
}


function write_texts(){
  
  tex_vorrand=createP("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_vorrand.parent("test");
  MathQuill_vorrand=select("#answer");
  // MathQuill_vorrand.parent(tex_vorrand)
  // MathQuill_vorrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  MathQuill_vorrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px;")
  MathQuill_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
  console.log("KONTROLL: ")
  console.log("MQ sisu: ", sisu);
  console.log("Vastus võrdlemiseks: ", vastus_kontrolliks)
  
           if (str(sisu) == vastus_kontrolliks && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              oige_vastus=oige_vastus+1;
            } else {
              tulemus.html("Viga!");
              tulemus.style("color","red");
            }
    

}


function Lopp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_vorrand.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  lopetamise_tingimus=true;
}



function round_0(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)) )
}

function round_1(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10)/10 )
}

function round_2(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*100)/100 )
}

function round_3(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*1000)/1000 )
}

function round_4(v) {
    return (Math.sign(v) * Math.round(Math.abs(v)*10000)/10000 )
}

function liikmete_SUM(massiiv){
  temp_summa=0;
  for (i=0; i<=massiiv.length-1; i++){
    temp_summa=temp_summa+massiiv[i];
  }
    return temp_summa
}




// for end screen
empty_vec=[]
function new_step(){
  
    direction=random(["up","down","left","right","forward","back"]);
    if (direction=="up"){
      X=X+step;
    } else if (direction == "down"){
      X=X-step;
    } else if (direction=="left"){
      Y=Y-step;
    } else if (direction=="right"){
      Y=Y+step;
    } else if (direction=="forward"){
      Z=Z+step;
    } else if (direction=="back"){
      Z=Z-step;
    }
  vek=createVector(X,Y,Z);
  empty_vec.push(vek);
}
