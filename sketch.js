
//Módulos 
const Engine=Matter.Engine;
  const World=Matter.World;
const Bodies=Matter.Bodies;

//Variáveis
var world;
  var engine;
var chao;
  var fundoimg;
var torre;
  var torreimg;
var canhao;
  var angle=10;
var bala;
  var barco;
var barco_sprite_data;      //Contêm o arquivo "json"
  var barco_spritesheet;        //Contêm as imagens

//Matriz
var m_balas=[];
  var m_barcos=[];
var m_a_barcos=[];


//Preload
function preload(){

  fundoimg=loadImage("./assets/background.gif");
  torreimg=loadImage("./assets/tower.png");
  barco_spritesheet=loadImage("./assets/animacao_barco/barcos_animacao.png");
  barco_sprite_data=loadJSON("./assets/animacao_barco/barco.json");


}


//Setup
function setup(){

  //Canvas
  createCanvas(1200,600);

    //Motor de Física
    engine=Engine.create();
      world=engine.world;

      //Definindo ângulo em graus
      angleMode(DEGREES);

//-------------Corpos------------

  //Chão
  
    //Propriedades
    var pr_chao={

      isStatic:true
    }

      //Criando corpo
      chao=Bodies.rectangle(0,height-1,width*2,10,pr_chao);

        //Adicionando ao mundo
        World.add(world,chao);

  //Torre

    //Propriedades
    var pr_torre={

      isStatic:true
    }

      //Criando corpo
      torre=Bodies.rectangle(160,350,160,310,pr_torre);

        //Adicionando ao mundo
        World.add(world,torre);


  //Canhão
  canhao = new c_canhao(180,110,130,100,angle);

  //Animação barcos
  var quadros_barcos = barco_sprite_data.frames

  for(var indice=0;indice<quadros_barcos.length;indice=indice+1){
    var posicao_barcos = quadros_barcos[indice].position
    var imgbarcos = barco_spritesheet.get(posicao_barcos.x,posicao_barcos.y,posicao_barcos.w,posicao_barcos.h)
      m_a_barcos.push(imgbarcos)


  }
}

//Draw
function draw(){

  //Fundo
  background(fundoimg)

    //Atualizando motor de física
    Engine.update(engine);





    //Desenhando corpos

      //Chão
      rect(chao.position.x,chao.position.y,width*2,10);

      //Torre
      push();
        imageMode(CENTER);
          image(torreimg,torre.position.x,torre.position.y,160,310);
      pop();


        //Chamando funções

          //Mostrar balas
          for (var indice=0;indice<m_balas.length;indice=indice+1){   //.length é o número de elementos em uma matriz

            mostrar_balas(m_balas[indice],indice);
            colisao(indice);
          }           

      //Canhão
      canhao.show();

      //Barcos
      mostrar_barcos()

}

  //==================================== Funções Personalizadas ===================================================


  //Atirando com a tecla para baixo
    function keyReleased(){

      if(keyCode==DOWN_ARROW){

        m_balas[m_balas.length-1].atirar();
      }
    }

  //Criar nova bola
    function keyPressed(){

      if(keyCode==DOWN_ARROW){

        //Bala
        bala = new c_bala(canhao.x,canhao.y);
          //Adicionando a matriz
          m_balas.push(bala)

      } 
    }

  //Mostrar balas na tela
    function mostrar_balas(bala,indice){

      if(bala){

        bala.show()

          if(bala.body.position.x>=width||bala.body.position.y>=height-50){

            bala.remove(indice)

          }
      }
    }

  //Mostrar barcos na tela
  function mostrar_barcos(){

    if(m_barcos.length>0){

      //Posições aleatórias
      if(m_barcos[m_barcos.length-1]==undefined||m_barcos[m_barcos.length-1].body.position.x<width-300){

        var m_posicoes=[-40,-60,-70,-20]
          var posicoes_rnd=random(m_posicoes)

        barco = new c_barcos(width,height-60,170,170,posicoes_rnd,m_a_barcos);
        m_barcos.push(barco)
      }


        for (var indice=0;indice<m_barcos.length;indice=indice+1){ 
          
          if(m_barcos[indice]){

            //Adicionando velocidade
            Matter.Body.setVelocity(m_barcos[indice].body,{x:-1.55,y:0})

            //Barcos
            m_barcos[indice].show();
            m_a_barcos[indice].aceleracao();

        }
      }     
    }
    else{

      //Barcos
      barco = new c_barcos(width,height-60,170,170,-60);

      //Adicionando a matrix
      m_barcos.push(barco);
    }
  }

  //Colisão
  function colisao(index){

    for(var indice=0;indice<m_barcos.length;indice=indice+1){

      if(m_balas[index]!==undefined && m_barcos[indice]!==undefined){

      var v_colisao=Matter.SAT.collides(m_balas[index].body,m_barcos[indice].body);
      
        if (v_colisao.collided){

          m_barcos[indice].remove(indice);
          Matter.World.remove(world,m_balas[index].body);
          delete m_balas[index];

        }
      }
    }
  }
