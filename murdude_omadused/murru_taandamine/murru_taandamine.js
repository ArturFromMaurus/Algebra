
var asukoha_nr=10;
var ylesannete_loendur=0;
var oige_vastus=0;
var lopetamise_tingimus=false;

window.onload = function() {
// ----------------------------------------- HTML ToolTip -------------------------------------------

 tooltip = document.createElement("div");
tooltip.style.backgroundColor = "rgba(9,9,96,0.95)"
tooltip.style.color = "white";
tooltip.style.borderRadius="25px";
tooltip.style.padding = "10px";
tooltip.style.position = "absolute";
tooltip.style.display = "none";
tooltip.style.zIndex="1";
tooltip.style.border="solid 2px black";
tooltip.style.width="540px"
document.body.appendChild(tooltip);

regularText = document.createElement("div");
regularText.innerHTML = "Murru taandamiseks leia suurim arv, millega nii lugeja kui ka nimetaja jaguvad. Seejärel jaga nimetaja ning lugeja eraldi selle arvuga läbi.<br><br>";
regularText.style.fontFamily="Computer Modern";
regularText.style.fontSize="20px";
tooltip.appendChild(regularText);


KaTeX_EQ="\\text{Näiteks. } \\dfrac{21}{77}=\\dfrac{21:7}{77:7}=\\dfrac{3}{11}."
 katexEquation = document.createElement("div");
tooltip.appendChild(katexEquation);


// Info nuppu funktsionaalsus
 infoNupp = document.createElement("button");
infoNupp.innerHTML = "i";
infoNupp.style.position = "absolute";
infoNupp.style.margin="20px";
infoNupp.style.padding="5px 12px";
infoNupp.style.top="12px";
infoNupp.style.left="5px";
infoNupp.style.fontSize="20px";
infoNupp.style.fontWeight="bold";
infoNupp.style.fontFamily="Hoefler Text";
infoNupp.style.fontStyle="italic";
infoNupp.style.background="transparent";
infoNupp.style.border="solid 2px black";
infoNupp.style.borderRadius="50%";
infoNupp.style.zIndex="1";
document.body.appendChild(infoNupp);

infoNupp.addEventListener("mouseenter", function() {
  tooltip.style.left = (infoNupp.offsetLeft + infoNupp.offsetWidth) + "px";
  tooltip.style.top = (infoNupp.offsetTop + infoNupp.offsetHeight) + "px";
  infoNupp.style.background="darkgrey"
  tooltip.style.display = "block";
});

infoNupp.addEventListener("mouseleave", function() {
  tooltip.style.display = "none";
  infoNupp.style.background="transparent"
});

// ----------------------------------------- HTML ToolTip -------------------------------------------
};



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
  clear();
  background(251,253,255);
  katex.render(KaTeX_EQ, katexEquation);

  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  lugeja.position(width/asukoha_nr+70,height/asukoha_nr+55);
  nimetaja.position(width/asukoha_nr+70,height/asukoha_nr+90);
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60);
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  
  KONTROLL_NUPP.position(width/asukoha_nr-110,height/asukoha_nr+150);
  KONTROLL_NUPP.mousePressed(kontroll);
  
  RESET_NUPP.position(width/asukoha_nr+70,height/asukoha_nr+150);
  RESET_NUPP.mousePressed(Reset);
  
  
  LOPETA_NUPP.mousePressed(Lopp);
  LOPETA_NUPP.position(width/asukoha_nr+20,height/asukoha_nr+220);
  
  if(lopetamise_tingimus==true){
    
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
  
  if(ylesannete_loendur>0){
    
    lugeja.remove();
    nimetaja.remove();
    KONTROLL_NUPP.remove();
    RESET_NUPP.remove();
    LOPETA_NUPP.remove();
  }
  
  Ylesanne();
  tulemus.html("");
  
  lugeja=createInput();
  lugeja.position(width/asukoha_nr+58,height/asukoha_nr+50);
  lugeja.size(35,20);
  nimetaja=createInput();
  nimetaja.position(width/asukoha_nr+58,height/asukoha_nr+85);
  nimetaja.size(35,20);

  
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
  
  LOPETA_NUPP=createButton("Lõpeta test");
  LOPETA_NUPP.style('padding','10px 20px');
  LOPETA_NUPP.style('background-color','LightSteelBlue');
  LOPETA_NUPP.style('color','black');
  LOPETA_NUPP.style('font-weight','bold');
  LOPETA_NUPP.style('border-radius','30px');
  LOPETA_NUPP.style('margin-top','30px');
  LOPETA_NUPP.style('margin-left','80px');
  LOPETA_NUPP.position(width/asukoha_nr+200,height/asukoha_nr+200);
  
  ylesannete_loendur=ylesannete_loendur+1;
}


function Ylesanne(){
  lugeja_vastus = int(random(1,10));
  nimetaja_vastus = int(random(1,10));
  laiendaja = int(random(1,10));
  //console.log(lugeja_vastus, nimetaja_vastus, laiendaja)
  
  
  
  lugeja_displayed = lugeja_vastus * laiendaja;
  nimetaja_displayed = nimetaja_vastus * laiendaja;
  
  
  tex_string="\\dfrac{"+str(lugeja_displayed)+"}{"+str(nimetaja_displayed)+"}= \\dfrac{ \\hspace{10mm}}{\\hspace{10mm}}";
   katex.render( tex_string, tex_vorrand.elt);
  yl_text.html("Taanda murd täielikult.");
  
  // kontrollin, et ega esialgu genereeritud arvud ise ei taandu. Kui taanduvad, siis taandan siin ära ja kasutan Kontroll funktsioonis.
  taandamata_arvude_kontrollimiseks = [10,9,8,7,6,5,4,3,2];
  for (let i = 0; i<taandamata_arvude_kontrollimiseks.length; i++  ){
    if ((lugeja_vastus % taandamata_arvude_kontrollimiseks[i] ) == 0  && (nimetaja_vastus % taandamata_arvude_kontrollimiseks[i] ) == 0 ){
      lugeja_vastus=lugeja_vastus/taandamata_arvude_kontrollimiseks[i];
      nimetaja_vastus=nimetaja_vastus/taandamata_arvude_kontrollimiseks[i];
    }
  }
  //console.log(lugeja_vastus, nimetaja_vastus, laiendaja)
}


function write_texts(){
  tex_vorrand=createDiv("");
  tex_vorrand.position(width/asukoha_nr+0,height/asukoha_nr+60)
  tex_vorrand.style("font-family","'Roboto',sans-serif");
  tex_vorrand.style("font-size","1.25rem");
  tex_vorrand.style("line-height","140%")
  
  yl_text=createDiv("");
  yl_text.style("font-size","1.25rem");
  yl_text.style("line-height","140%");
  yl_text.style("font-family","'Roboto',sans-serif");
  yl_text.position(width/asukoha_nr,height/asukoha_nr);
  
  tulemus=createDiv("");
  tulemus.position(width/asukoha_nr+155,height/asukoha_nr+65);
  tulemus.style("font-family","'Roboto',sans-serif");
  tulemus.style("font-size","1.00rem");
  tulemus.style("line-height","140%");
}

function kontroll(){
  
  if(typeof float(lugeja.value()) == 'number' && !isNaN(float(lugeja.value())) && typeof float(nimetaja.value()) == 'number' && !isNaN(float(nimetaja.value()))){
    
        // check if it is integer
        if (Number.isInteger(float(lugeja.value())) && Number.isInteger(float(nimetaja.value()))) {
           if (lugeja.value() == lugeja_vastus && nimetaja.value() == nimetaja_vastus){
              tulemus.html("Õige!");
              tulemus.style("color","green");
              oige_vastus=oige_vastus+1;
            } else {
              tulemus.html("Valesti taandatud!");
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


function Lopp(){
  
  KONTROLL_NUPP.attribute("disabled","");
  RESET_NUPP.attribute("disabled","");
  LOPETA_NUPP.attribute("disabled","");
  
  tex_vorrand.remove();
  lugeja.remove();
  nimetaja.remove();
  yl_text.remove();
  tulemus.remove();
  
  RESET_NUPP.remove();
  LOPETA_NUPP.remove();
  KONTROLL_NUPP.remove();
  infoNupp.remove();
  
  Tulemus=createP("Tulemus: "+str(round_2((oige_vastus/ylesannete_loendur)*100))+"%<br>Kogu ülesannete arv: "+str(ylesannete_loendur)+"<br>Õigeid lahendusi: "+str(oige_vastus));
  Tulemus.position(width/4-100,height/4-100);
  Tulemus.style("font-size","28px");
  Tulemus.style("color",color(255,255,255));
  Tulemus.style("line-height","140%");
  
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
