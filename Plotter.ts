export class Plotter{
    private carriage_state: 'DOWN'|'UP';
    private color: 'BLACK' | 'RED' | 'GREEN' | undefined;
    private position:object;
    private degree:number

    constructor(){
       this.carriage_state = 'UP';
       this.position = { x: 0, y: 0 };
       this.degree = 0
    }

    get_color(){
        return this.color
    }

    get_carriage_state(){
        return this.carriage_state
    }

    get_carriage_position(){
        return this.position
    }

    get_degree(){
        return this.degree
    }


    change_carriageState(){
     if (this.carriage_state == 'UP'){
        this.carriage_state = 'DOWN';
        
     }
     else{
        this.carriage_state = 'UP';
     }
    }

    change_color(color:'BLACK' | 'RED' | 'GREEN'){
      this.color = color;
    }

    create_start_position(tochka:object){
     this.Position = tochka;
    }

    change_degree(x:number){
        this.degree+= x;
    }

    cahge_position(distance: number, angle: number, current: object){
     
        const angle_in_rads = angle * (Math.PI / 180.0) * 1.0;
        const x = current.x + distance * Math.cos(angle_in_rads);
        const y = current.y + distance * Math.sin(angle_in_rads);
         return { x: Math.round(x), y: Math.round(y) };
    }
  
}


