
var step=5;
let X=0;
let Y=0;
let Z=0;
let angle=0;

var asukoha_nr=10;
var ülesannete_loendur=0;
var õige_vastus=0;
var lõpetamise_tingimus=false;

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
  MathQuill_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  tex_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+60);
  tulemus.position(width/asukoha_nr+0,height/asukoha_nr+230);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+250);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+250);
  RESET_NUPP.mousePressed(Reset);
  
  
  LÕPETA_NUPP.mousePressed(Lõpp);
  LÕPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+320);
  
  // console.log(tex_võrrand.size)
  if(lõpetamise_tingimus==true){
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
  
  if(ülesannete_loendur>0){
    
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LÕPETA_NUPP.remove();
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
  
  LÕPETA_NUPP=createButton("Lõpeta test");
  LÕPETA_NUPP.style('padding','10px 20px');
  LÕPETA_NUPP.style('background-color','LightSteelBlue');
  LÕPETA_NUPP.style('color','black');
  LÕPETA_NUPP.style('font-weight','bold');
  LÕPETA_NUPP.style('border-radius','30px');
  LÕPETA_NUPP.style('margin-top','30px');
  LÕPETA_NUPP.style('margin-left','80px');
  LÕPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+300);
  
  ülesannete_loendur=ülesannete_loendur+1;
}


function Ylesanne(){
   esimene_tegur_korras=false;
      teine_tegur_korras=false;
      kolmas_tegur_korras=false;
  mudel=["täht","astmed"];
  mudeli_valik=random(mudel);
  
  
//   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TÄHTAVALDISED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
if (mudeli_valik=="täht"){
    while (true){
      esimene_tegur_korras=false;
      teine_tegur_korras=false;
      kolmas_tegur_korras=false;
      
      // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
      esimese_liikme_vastus=int(random(-30,30)); //  X
      teise_liikme_vastus=int(random(-30,30));  // Y
      kolmanda_liikme_vastus=int(random(-30,30)); // arv
      
      esimene_vastus_str=str(esimese_liikme_vastus);
      
      if (Math.sign(teise_liikme_vastus)==1 || Math.sign(teise_liikme_vastus)==0){
        teine_vastus_str="+"+str(teise_liikme_vastus);
      } else if (Math.sign(teise_liikme_vastus)==-1){
        teine_vastus_str=str(teise_liikme_vastus);
      }
        if (Math.sign(kolmanda_liikme_vastus)==1 || Math.sign(kolmanda_liikme_vastus)==0){
        kolmas_vastus_str="+"+str(kolmanda_liikme_vastus);
      } else if (Math.sign(kolmanda_liikme_vastus)==-1){
        kolmas_vastus_str=str(kolmanda_liikme_vastus);
      }
      
      vastus_massiiv=[esimene_vastus_str+"*x",teine_vastus_str+"*y",kolmas_vastus_str];
      vastus_massiiv_kontrolliks=[];
      if (esimese_liikme_vastus != 0){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[0]);
      }
      if (teise_liikme_vastus != 0){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[1]);
      }
      if (kolmanda_liikme_vastus !=0 ){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[2]);
      }
      
      vastus_kontrolliks=vastus_massiiv_kontrolliks.join("");
      if (vastus_kontrolliks[0]=="+"){
        vastus_kontrolliks=vastus_kontrolliks.substring(1);
      }
      
      if (vastus_kontrolliks==""){
        vastus_kontrolliks=0;
      }
      
      esimese_jaotaja = int(random(-19,19));
      if (esimese_jaotaja==0){
        esimese_jaotaja = int(random(2,19));
      }
      esimese_liikme_komponendid_tegurdamata=[esimese_liikme_vastus-esimese_jaotaja, esimese_jaotaja];
      teise_jaotaja=int(random(-19,19));
      if (teise_jaotaja==0){
        teise_jaotaja = int(random(2,19));
      }
      teise_liikme_komponendid_tegurdamata=[teise_liikme_vastus-teise_jaotaja, teise_jaotaja];
      kolmanda_jaotaja=int(random(-19,19));
      if (kolmanda_jaotaja==0){
        kolmanda_jaotaja = int(random(2,19));
      }
      kolmanda_liikme_komponendid_tegurdamata=[kolmanda_liikme_vastus-kolmanda_jaotaja, kolmanda_jaotaja];
      
      tegurdamata_liikmete_maatriks=[esimese_liikme_komponendid_tegurdamata,teise_liikme_komponendid_tegurdamata, kolmanda_liikme_komponendid_tegurdamata ];
    
      for (i=2;i<=15;i=i+1){
        if (tegurdamata_liikmete_maatriks[0][0]%i==0 && tegurdamata_liikmete_maatriks[1][1]%i==0 ){
          var esimese_sulu_tegur=i;
          esimene_tegur_korras=true;
          break;
        } else {
          esimene_tegur_korras=false;
        }
      }
        
      for (j=-15;j<=-2;j=j+1){
        if (tegurdamata_liikmete_maatriks[1][0]%j==0 && tegurdamata_liikmete_maatriks[2][1]%j==0 ){
          var teise_sulu_tegur=j;
          teine_tegur_korras=true;
          break;
        } else {
          teine_tegur_korras=false;
        }
      }
    
      for (k=2;k<=15;k=k+1){
        if (tegurdamata_liikmete_maatriks[2][0]%k==0 && tegurdamata_liikmete_maatriks[0][1]%k==0 ){
          var kolmanda_sulu_tegur=k;
          kolmas_tegur_korras=true;
          break;
        } else {
          kolmas_tegur_korras=false;
        }
      }
        
        if (esimene_tegur_korras==true &&  teine_tegur_korras==true && kolmas_tegur_korras==true ){
          break;
        }
      }
        tegurdatud_maatriks=[[tegurdamata_liikmete_maatriks[0][0]/esimese_sulu_tegur, tegurdamata_liikmete_maatriks[0][1]/kolmanda_sulu_tegur],[tegurdamata_liikmete_maatriks[1][0]/teise_sulu_tegur, tegurdamata_liikmete_maatriks[1][1]/esimese_sulu_tegur],[tegurdamata_liikmete_maatriks[2][0]/kolmanda_sulu_tegur,tegurdamata_liikmete_maatriks[2][1]/teise_sulu_tegur]];

        
    tegurdatud_maatriks_str=[[,],[,],[,]];
    for(var i = 0; i < tegurdatud_maatriks.length; i++) {
      for(var j = 0; j < tegurdatud_maatriks[i].length; j++) {
             if (Math.sign(tegurdatud_maatriks[i][j])==1 || Math.sign(tegurdatud_maatriks[i][j])==0){
               tegurdatud_maatriks_str[i][j]="+"+str(tegurdatud_maatriks[i][j]);
             } else if (Math.sign(tegurdatud_maatriks[i][j])==-1){
               tegurdatud_maatriks_str[i][j]=str(tegurdatud_maatriks[i][j]);
             }
      }
    }
      sulu_ees_tegurid=[esimese_sulu_tegur,teise_sulu_tegur, kolmanda_sulu_tegur];
      sulu_ees_tegurid_str=[,,];
      for (var i=0; i<sulu_ees_tegurid.length; i++ ){
        if (Math.sign(sulu_ees_tegurid[i])==1){
               sulu_ees_tegurid_str[i]="+"+str(sulu_ees_tegurid[i]);
             } else if (Math.sign(sulu_ees_tegurid[i])==-1){
               sulu_ees_tegurid_str[i]=str(sulu_ees_tegurid[i]);
             }
      }
        
        // ESIMENE SULG
        ülesande_sulud_eraldi_1=[tegurdatud_maatriks_str[0][0]+"x",tegurdatud_maatriks_str[1][1]+"y"];
        ülesande_sulud_eraldi_1_shuffled=shuffle(ülesande_sulud_eraldi_1);
        ülesande_sulg_seest_1=ülesande_sulud_eraldi_1_shuffled.join("");
        if (ülesande_sulg_seest_1[0]=="+"){
          ülesande_sulg_seest_1=ülesande_sulg_seest_1.substring(1);
        }
        ülesande_sulg_1=sulu_ees_tegurid_str[0]+"("+ülesande_sulg_seest_1+")";
        
        //TEINE SULG
        ülesande_sulud_eraldi_2=[tegurdatud_maatriks_str[1][0]+"y",tegurdatud_maatriks_str[2][1]];
        ülesande_sulud_eraldi_2_shuffled=shuffle(ülesande_sulud_eraldi_2);
        ülesande_sulg_seest_2=ülesande_sulud_eraldi_2_shuffled.join("");
        if (ülesande_sulg_seest_2[0]=="+"){
          ülesande_sulg_seest_2=ülesande_sulg_seest_2.substring(1);
        }
        ülesande_sulg_2=sulu_ees_tegurid_str[1]+"("+ülesande_sulg_seest_2+")";
        
        //KOLMAS SULG
        ülesande_sulud_eraldi_3=[tegurdatud_maatriks_str[2][0],tegurdatud_maatriks_str[0][1]+"x"];
        ülesande_sulud_eraldi_3_shuffled=shuffle(ülesande_sulud_eraldi_3);
        ülesande_sulg_seest_3=ülesande_sulud_eraldi_3_shuffled.join("");
        if (ülesande_sulg_seest_3[0]=="+"){
          ülesande_sulg_seest_3=ülesande_sulg_seest_3.substring(1);
        }
        ülesande_sulg_3=sulu_ees_tegurid_str[2]+"("+ülesande_sulg_seest_3+")";

        
        
        antav_ülesanne_massiiv_unshuffled=[ülesande_sulg_1, ülesande_sulg_2, ülesande_sulg_3];
        antav_ülesanne=(shuffle(antav_ülesanne_massiiv_unshuffled)).join("");
        if (antav_ülesanne[0]=="+"){
          antav_ülesanne=antav_ülesanne.substring(1);
        }
        // console.log("lahend 1: "+esimese_liikme_vastus)
        // console.log("lahend 2: "+teise_liikme_vastus)
        // console.log("lahend 3: "+kolmanda_liikme_vastus)
        // console.log("Tegurid sulgude ees: "+sulu_ees_tegurid_str)
        // console.log("Esimene sulg: "+ülesande_sulg_1);
        // console.log("Teine sulg: "+ülesande_sulg_2);
        // console.log("Kolmas sulg: "+ülesande_sulg_3);
        // console.log("Tegurdamata maatriks: "+tegurdamata_liikmete_maatriks);
        // console.log("Tegurdatud maatriks: "+tegurdatud_maatriks);
        // console.log(antav_ülesanne);
        // console.log("Vastus: "+vastus_kontrolliks)
        
    }
  
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ASTMETEGA @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  if (mudeli_valik=="astmed"){
    while (true){
      esimene_tegur_korras=false;
      teine_tegur_korras=false;
      kolmas_tegur_korras=false;
      
      // ------------------------------ GENEREERIME KOLM SUVALIST ÜKSLIIGET ------------------------------
      esimese_liikme_vastus=int(random(-30,30)); //  X2
      teise_liikme_vastus=int(random(-30,30));  // X
      kolmanda_liikme_vastus=int(random(-30,30)); // arv
      
      esimene_vastus_str=str(esimese_liikme_vastus);
      
      if (Math.sign(teise_liikme_vastus)==1 || Math.sign(teise_liikme_vastus)==0){
        teine_vastus_str="+"+str(teise_liikme_vastus);
      } else if (Math.sign(teise_liikme_vastus)==-1){
        teine_vastus_str=str(teise_liikme_vastus);
      }
        if (Math.sign(kolmanda_liikme_vastus)==1 || Math.sign(kolmanda_liikme_vastus)==0){
        kolmas_vastus_str="+"+str(kolmanda_liikme_vastus);
      } else if (Math.sign(kolmanda_liikme_vastus)==-1){
        kolmas_vastus_str=str(kolmanda_liikme_vastus);
      }
      
      vastus_massiiv=[esimene_vastus_str+"*x^2",teine_vastus_str+"*x",kolmas_vastus_str];
      vastus_massiiv_kontrolliks=[];
      if (esimese_liikme_vastus != 0){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[0]);
      }
      if (teise_liikme_vastus != 0){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[1]);
      }
      if (kolmanda_liikme_vastus !=0 ){
        vastus_massiiv_kontrolliks.push(vastus_massiiv[2]);
      }
      
      vastus_kontrolliks=vastus_massiiv_kontrolliks.join("");
      if (vastus_kontrolliks[0]=="+"){
        vastus_kontrolliks=vastus_kontrolliks.substring(1);
      }
      
      if (vastus_kontrolliks==""){
        vastus_kontrolliks=0;
      }
      
      esimese_jaotaja = int(random(-19,19));
      if (esimese_jaotaja==0){
        esimese_jaotaja = int(random(2,19));
      }
      esimese_liikme_komponendid_tegurdamata=[esimese_liikme_vastus-esimese_jaotaja, esimese_jaotaja];
      teise_jaotaja=int(random(-19,19));
      if (teise_jaotaja==0){
        teise_jaotaja = int(random(2,19));
      }
      teise_liikme_komponendid_tegurdamata=[teise_liikme_vastus-teise_jaotaja, teise_jaotaja];
      kolmanda_jaotaja=int(random(-19,19));
      if (kolmanda_jaotaja==0){
        kolmanda_jaotaja = int(random(2,19));
      }
      kolmanda_liikme_komponendid_tegurdamata=[kolmanda_liikme_vastus-kolmanda_jaotaja, kolmanda_jaotaja];
      
      tegurdamata_liikmete_maatriks=[esimese_liikme_komponendid_tegurdamata,teise_liikme_komponendid_tegurdamata, kolmanda_liikme_komponendid_tegurdamata ];
    
      for (i=2;i<=15;i=i+1){
        if (tegurdamata_liikmete_maatriks[0][0]%i==0 && tegurdamata_liikmete_maatriks[1][1]%i==0 ){
          var esimese_sulu_tegur=i;
          esimene_tegur_korras=true;
          break;
        } else {
          esimene_tegur_korras=false;
        }
      }
        
      for (j=-15;j<=-2;j=j+1){
        if (tegurdamata_liikmete_maatriks[1][0]%j==0 && tegurdamata_liikmete_maatriks[2][1]%j==0 ){
          var teise_sulu_tegur=j;
          teine_tegur_korras=true;
          break;
        } else {
          teine_tegur_korras=false;
        }
      }
    
      for (k=2;k<=15;k=k+1){
        if (tegurdamata_liikmete_maatriks[2][0]%k==0 && tegurdamata_liikmete_maatriks[0][1]%k==0 ){
          var kolmanda_sulu_tegur=k;
          kolmas_tegur_korras=true;
          break;
        } else {
          kolmas_tegur_korras=false;
        }
      }
        
        if (esimene_tegur_korras==true &&  teine_tegur_korras==true && kolmas_tegur_korras==true ){
          break;
        }
      }
        tegurdatud_maatriks=[[tegurdamata_liikmete_maatriks[0][0]/esimese_sulu_tegur, tegurdamata_liikmete_maatriks[0][1]/kolmanda_sulu_tegur],[tegurdamata_liikmete_maatriks[1][0]/teise_sulu_tegur, tegurdamata_liikmete_maatriks[1][1]/esimese_sulu_tegur],[tegurdamata_liikmete_maatriks[2][0]/kolmanda_sulu_tegur,tegurdamata_liikmete_maatriks[2][1]/teise_sulu_tegur]];

        
    tegurdatud_maatriks_str=[[,],[,],[,]];
    for(var i = 0; i < tegurdatud_maatriks.length; i++) {
      for(var j = 0; j < tegurdatud_maatriks[i].length; j++) {
             if (Math.sign(tegurdatud_maatriks[i][j])==1 || Math.sign(tegurdatud_maatriks[i][j])==0){
               tegurdatud_maatriks_str[i][j]="+"+str(tegurdatud_maatriks[i][j]);
             } else if (Math.sign(tegurdatud_maatriks[i][j])==-1){
               tegurdatud_maatriks_str[i][j]=str(tegurdatud_maatriks[i][j]);
             }
      }
    }
      sulu_ees_tegurid=[esimese_sulu_tegur,teise_sulu_tegur, kolmanda_sulu_tegur];
      sulu_ees_tegurid_str=[,,];
      for (var i=0; i<sulu_ees_tegurid.length; i++ ){
        if (Math.sign(sulu_ees_tegurid[i])==1){
               sulu_ees_tegurid_str[i]="+"+str(sulu_ees_tegurid[i]);
             } else if (Math.sign(sulu_ees_tegurid[i])==-1){
               sulu_ees_tegurid_str[i]=str(sulu_ees_tegurid[i]);
             }
      }
        
        // ESIMENE SULG
        ülesande_sulud_eraldi_1=[tegurdatud_maatriks_str[0][0]+"x",tegurdatud_maatriks_str[1][1]];
        ülesande_sulud_eraldi_1_shuffled=shuffle(ülesande_sulud_eraldi_1);
        ülesande_sulg_seest_1=ülesande_sulud_eraldi_1_shuffled.join("");
        if (ülesande_sulg_seest_1[0]=="+"){
          ülesande_sulg_seest_1=ülesande_sulg_seest_1.substring(1);
        }
        ülesande_sulg_1=sulu_ees_tegurid_str[0]+"x"+"("+ülesande_sulg_seest_1+")";
        
        //TEINE SULG
        ülesande_sulud_eraldi_2=[tegurdatud_maatriks_str[1][0]+"x",tegurdatud_maatriks_str[2][1]];
        ülesande_sulud_eraldi_2_shuffled=shuffle(ülesande_sulud_eraldi_2);
        ülesande_sulg_seest_2=ülesande_sulud_eraldi_2_shuffled.join("");
        if (ülesande_sulg_seest_2[0]=="+"){
          ülesande_sulg_seest_2=ülesande_sulg_seest_2.substring(1);
        }
        ülesande_sulg_2=sulu_ees_tegurid_str[1]+"("+ülesande_sulg_seest_2+")";
        
        //KOLMAS SULG
        ülesande_sulud_eraldi_3=[tegurdatud_maatriks_str[2][0],tegurdatud_maatriks_str[0][1]+"x^{2}"];
        ülesande_sulud_eraldi_3_shuffled=shuffle(ülesande_sulud_eraldi_3);
        ülesande_sulg_seest_3=ülesande_sulud_eraldi_3_shuffled.join("");
        if (ülesande_sulg_seest_3[0]=="+"){
          ülesande_sulg_seest_3=ülesande_sulg_seest_3.substring(1);
        }
        ülesande_sulg_3=sulu_ees_tegurid_str[2]+"("+ülesande_sulg_seest_3+")";

        
        
        antav_ülesanne_massiiv_unshuffled=[ülesande_sulg_1, ülesande_sulg_2, ülesande_sulg_3]
        antav_ülesanne=(shuffle(antav_ülesanne_massiiv_unshuffled)).join("");
        if (antav_ülesanne[0]=="+"){
          antav_ülesanne=antav_ülesanne.substring(1);
        }
        // console.log("lahend 1: "+esimese_liikme_vastus)
        // console.log("lahend 2: "+teise_liikme_vastus)
        // console.log("lahend 3: "+kolmanda_liikme_vastus)
        // console.log("Tegurid sulgude ees: "+sulu_ees_tegurid_str)
        // console.log("Esimene sulg: "+ülesande_sulg_1);
        // console.log("Teine sulg: "+ülesande_sulg_2);
        // console.log("Kolmas sulg: "+ülesande_sulg_3);
        // console.log("Tegurdamata maatriks: "+tegurdamata_liikmete_maatriks);
        // console.log("Tegurdatud maatriks: "+tegurdatud_maatriks);
        // console.log(antav_ülesanne);
        // console.log("Vastus: "+vastus_kontrolliks)
        
    }

   tex_string=antav_ülesanne+"=";
   katex.render( tex_string, tex_võrrand.elt);
   yl_text.html("Ava sulud, koonda sarnased liikmed ning vii avaldis normaalkujule.");

}


function write_texts(){
  
  tex_võrrand=createP("");
  tex_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_võrrand.style("font-family: 'Roboto',sans-serif; font-size: 1.25rem; line-height: 140%; width: 100%; float: left ")
  
  // tex_võrrand.parent("test");
  MathQuill_võrrand=select("#answer");
  // MathQuill_võrrand.parent(tex_võrrand)
  // MathQuill_võrrand.style("width: 80%; float: right; font-size: 24px; margin: 30px auto;");
  MathQuill_võrrand.style(" width: 80%; margin-top: 70px auto; font-size: 24px;")
  MathQuill_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+190);
  
  yl_text=createP("");
  yl_text.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.25rem ");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createP("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family: 'Roboto',sans-serif;line-height: 140%; font-size: 1.00rem ");
}

function kontroll(){
  sisu=document.getElementById("lihtsam").textContent;
//   console.log("KONTROLL: ")
// console.log("MQ sisu: ", sisu);
//   console.log("Vastus võrdlemiseks: ", vastus_kontrollimiseks)
  
  
           if (str(sisu) == vastus_kontrolliks && str(sisu).length>0){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              õige_vastus=õige_vastus+1;
            } else {
              tulemus.html("Valesti koondatud!");
              tulemus.style("color","red");
            }
    

}


function Lõpp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LÕPETA_NUPP.attribute("disabled","");
  
  tex_võrrand.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LÕPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  MathQuill_võrrand.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((õige_vastus/ülesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ülesannete_loendur)+"<br>Õigeid lahendusi: "+str(õige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  Tulemus.style("font-family","'Roboto',sans-serif");
  lõpetamise_tingimus=true;
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
