
//Criando a classe
class c_canhao{

    //Constructor
    constructor(x,y,w,h,angle){
   
        //Criando x,y,w,h,angle
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.angle=angle

            //Variáveis canhão
            this.basecanhaoimg=loadImage("./assets/cannonBase.png");
            this.movelcanhaoimg=loadImage("./assets/canon.png");
        }

    //Show
    show(){

        //Movendo canhão
        if(keyIsDown(RIGHT_ARROW)&&this.angle<=50){
            this.angle=this.angle+1
        }
        if(keyIsDown(LEFT_ARROW)&&this.angle>=-55){
            this.angle=this.angle-1
        }

        //Configuração personalizada canhão móvel
        push();
            translate(this.x,this.y);
            rotate(this.angle);
                imageMode(CENTER);
                image(this.movelcanhaoimg,0,0,this.w,this.h)
        pop();

        //Imagem base canhão
        image(this.basecanhaoimg,70,20,200,200)


    }


}

