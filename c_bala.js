
//Criando a classe
class c_bala{

    //Constructor
    constructor(x,y){
   
        //Criando r
        this.r=28.5

            //Propriedades
            var propriedades_bala={

            isStatic:true
            }

                //Variáveis bala
                this.body=Bodies.circle(x,y,this.r,propriedades_bala)
                this.balaimg=loadImage("./assets/cannonball.png");

                    //Adicionando ao mundo
                    World.add(world,this.body);
            
        }

    //Show
    show(){

        //Configuração personalizada bala
        push();
                imageMode(CENTER);
                image(this.balaimg,this.body.position.x,this.body.position.y,this.r,this.r)
        pop();
    }


    //Atirar
    atirar(){
        
        //Ângulo radiano
        var novo_angle=canhao.angle-28;
        novo_angle=novo_angle*(3.14/180);

            //Velocidade vetorial
            var velo_vetorial=p5.Vector.fromAngle(novo_angle);
            velo_vetorial.mult(0.38765109);

                //Definindo em movimento
                Matter.Body.setStatic(this.body,false);

                    //Definindo velocidade
                    Matter.Body.setVelocity(this.body,{x:velo_vetorial.x*180/3.14,y:velo_vetorial.y*180/3.14});
    }

    //Remover
    remove(index){

        //Ajustando velocidade
        Matter.Body.setVelocity(this.body,{x:0,y:0});


        //Apagando balas
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete m_balas[index];


        },1000);

    }



}



