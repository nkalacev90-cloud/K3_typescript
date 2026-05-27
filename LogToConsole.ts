import { Logger } from "./Logger"
export class LogToConsole implements Logger{
    log(message: string){
        console.log(message)
    }
    
}
