
//Criando a classe
class c_barcos{

    //Constructor
    constructor(x,y,w,h,position,m_a_barcos){
   
        //Criando w,h,position
        this.w=w
        this.h=h
        this.boat_position=position

            //Variáveis canhão
            this.body=Bodies.rectangle(x,y,w,h,position)
            this.barcoimg=loadImage("./assets/navio.png");

                //Adicionando ao mundo
                World.add(world,this.body);

                    //Animação
                    this.animacao = m_a_barcos;
                    this.speed = 0.5;
        }

    //Show
    show(){

        var index = floor(this.speed % this.animacao.length);

        //Configuração personalizada barcos
        push();
            translate(this.body.position.x,this.body.position.y);
            rotate(this.body.angle);
                imageMode(CENTER);
                image(this.animacao[index],0,this.boat_position,this.w,this.h)
        pop();

    }

    //Remover
    remove(indice){

        //Apagando barcos
        setTimeout(()=>{
            Matter.World.remove(world,m_barcos[indice].body);
            delete m_barcos[indice];


        },50);

    }

    //Aceleração
    aceleracao(){
        
        this.speed = this.speed + 0.1
    }
}

