
var asukoha_nr=10;
var ülesannete_loendur=0;
var õige_vastus=0;
var lõpetamise_tingimus=false;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function setup() {
  canvas=createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  write_texts();
  Reset();
  
}

function draw() {
  background(230,245,255);
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  if(str(lugeja_murrus_1).length==1 && str(nimetaja_murrus_1).length==1 && str( lugeja_murrus_2).length==1 && str(nimetaja_murrus_2).length==1){
        lugeja.position(width/asukoha_nr+96,height/asukoha_nr+55);  // @@@@@@@@@@@@@@@@@@@@@ KUI MÕLEMAD MURRUD ON ÜHEKOHALISED ARVUD @@@@@@@@@@@@@@@@@@@@@@@@@
      nimetaja.position(width/asukoha_nr+96,height/asukoha_nr+90);
  } else if (    ( (str(lugeja_murrus_1).length==2 || str(nimetaja_murrus_1).length==2) && ( str(lugeja_murrus_2).length==1 && str(nimetaja_murrus_2).length==1 ) )  || ( (str(lugeja_murrus_2).length==2 || str(nimetaja_murrus_2).length==2) && ( str(lugeja_murrus_1).length==1 && str(nimetaja_murrus_1).length==1 ) )  ) {
        lugeja.position(width/asukoha_nr+108,height/asukoha_nr+55); // @@@@@@@@@@@@@@@@@@@@@@ KUI KUMBKI MURDUDEST ON KAHEKOHALINE JA ÜKS ÜHEKOHALINE @@@@@@@@@
      nimetaja.position(width/asukoha_nr+108,height/asukoha_nr+90);
  } else if ( (str(lugeja_murrus_1).length==2 && str(lugeja_murrus_2).length==2) || ( str(nimetaja_murrus_1).length==2 && str(nimetaja_murrus_2).length==2) || ( str(lugeja_murrus_1).length==2 && str(nimetaja_murrus_2).length==2) || ( str(lugeja_murrus_2).length==2 && str(nimetaja_murrus_1).length==2)  ){
        lugeja.position(width/asukoha_nr+120,height/asukoha_nr+55); // @@@@@@@@@@@@@@@@@@@@@@ KUI MÕLEMAD ON KAHEKOHALISED @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      nimetaja.position(width/asukoha_nr+120,height/asukoha_nr+90);
  }
  
  tex_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tulemus.position(width/asukoha_nr+195,height/asukoha_nr+15);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+150);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+150);
  RESET_NUPP.mousePressed(Reset);
  
  
  LÕPETA_NUPP.mousePressed(Lõpp);
  LÕPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+220);
  
  // console.log(tex_võrrand.size)
  if(lõpetamise_tingimus==true){
    
    push();
    fill(22, 56, 50);
    rect(0,0,width,height);
    pop();
    

    
    push();
    fill(48, 25, 52);
    strokeWeight(0);
    circle(width,0,mouseY*2);
    pop();
    
    push();
    fill(220, 120, 52);
    strokeWeight(0);
    circle(0,height, mouseY-70);
    pop();
    
    push();
    fill(22,56,50);
    strokeWeight(0);
    circle(width,0,mouseX)
    pop();
  }
  
//   console.log(lugeja.value(),nimetaja.value(), lugeja.value()/nimetaja.value(), kymnendmurd);
  
}


function Reset(){
  
  if(ülesannete_loendur>0){
    
    lugeja.remove();
    nimetaja.remove();
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LÕPETA_NUPP.remove();
  }
  
  Ylesanne();
  tulemus.html("");
  
  lugeja=createInput();
  // lugeja.position(width/asukoha_nr+78,height/asukoha_nr+50);
  lugeja.size(45,20);
  nimetaja=createInput();
  // nimetaja.position(width/asukoha_nr+78,height/asukoha_nr+85);
  nimetaja.size(45,20);

  
  KONTROLL_NUPP=createButton("Kontroll");
  KONTROLL_NUPP.style('padding','10px 20px');
  KONTROLL_NUPP.style('background-color','MidNightBlue');
  KONTROLL_NUPP.style('color','white');
  KONTROLL_NUPP.style('border-radius','30px');
  KONTROLL_NUPP.style('margin-top','30px');
  KONTROLL_NUPP.style('margin-left','100px');
  KONTROLL_NUPP.position(width/asukoha_nr-50,height/asukoha_nr+200);
  
  RESET_NUPP=createButton("Uus ülesanne");
  RESET_NUPP.style('padding','10px 20px');
  RESET_NUPP.style('background-color','#508bc3');
  RESET_NUPP.style('color','white');
  RESET_NUPP.style('border-radius','30px');
  RESET_NUPP.style('margin-top','30px');
  RESET_NUPP.style('margin-left','20px');
  RESET_NUPP.position(width/asukoha_nr+130,height/asukoha_nr+200);
  
  LÕPETA_NUPP=createButton("Lõpeta test");
  LÕPETA_NUPP.style('padding','10px 20px');
  LÕPETA_NUPP.style('background-color','LightSteelBlue');
  LÕPETA_NUPP.style('color','black');
  LÕPETA_NUPP.style('font-weight','bold');
  LÕPETA_NUPP.style('border-radius','30px');
  LÕPETA_NUPP.style('margin-top','30px');
  LÕPETA_NUPP.style('margin-left','80px');
  LÕPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+200);
  
  ülesannete_loendur=ülesannete_loendur+1;
}


function Ylesanne(){
  lugeja_murrus_1= int(random(1,15));
  nimetaja_murrus_1 = int(random(1,20));
  lugeja_murrus_2= int(random(1,15));
  nimetaja_murrus_2 = int(random(1,20));

  vastus_kontrollimiseks = ((lugeja_murrus_1*lugeja_murrus_2)/(nimetaja_murrus_1*nimetaja_murrus_2))
  
  
  tex_string="\\dfrac{"+str(lugeja_murrus_1)+"}{"+str(nimetaja_murrus_1 )+"} \\cdot \\dfrac{"+str(lugeja_murrus_2)+ "}{"+str(nimetaja_murrus_2)+"}= \\dfrac{ \\hspace{10mm}}{\\hspace{10mm}}";
   katex.render( tex_string, tex_võrrand.elt);
  yl_text.html("Arvuta.");
  
  // console.log(vastus_kontrollimiseks)
}


function write_texts(){
  tex_võrrand=createDiv("");
  tex_võrrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_võrrand.style("font-family","'Roboto',sans-serif");
  tex_võrrand.style("font-size","1.25rem");
  tex_võrrand.style("line-height","140%")
  
  yl_text=createDiv("");
  yl_text.style("font-size","1.25rem");
  yl_text.style("line-height","140%")
  yl_text.style("font-family","'Roboto',sans-serif");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createDiv("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family","'Roboto',sans-serif");
  tulemus.style("font-size","1.00rem");
  tulemus.style("line-height","140%")
}

function kontroll(){
  
  if(typeof float(lugeja.value()) == 'number' && !isNaN(float(lugeja.value())) && typeof float(nimetaja.value()) == 'number' && !isNaN(float(nimetaja.value()))){
    
        // check if integer
        if (Number.isInteger(float(lugeja.value())) && Number.isInteger(float(nimetaja.value()))) {
           if (lugeja.value()/nimetaja.value() == vastus_kontrollimiseks ){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              KONTROLL_NUPP.attribute("disabled","");
              õige_vastus=õige_vastus+1;
            } else {
              tulemus.html("Valesti teisendatud!");
              tulemus.style("color","red");
            }
        }
        else {
            tulemus.html("Komaga arvud ei tohi nimetajas ega lugejas olla!");
            tulemus.style("color","red");
        }
    
    } else {
        tulemus.html("Puuduvad numbrid!");
        tulemus.style("color","red");
    }

}


function Lõpp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LÕPETA_NUPP.attribute("disabled","");
  
  tex_võrrand.remove();
  lugeja.remove();
  nimetaja.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LÕPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  
  
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
