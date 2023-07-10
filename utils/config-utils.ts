import configJson from "../automation-config.json"


export class ConfigUtils{

    getEnv(){
        return configJson.env
    }
    getUsername(usertype){
        return configJson[this.getEnv()][usertype]["username"]
        
    }
    getPassword(usertype:string){
        return configJson[this.getEnv()][usertype]["password"]
    }
    
    getURL(){
        return configJson[this.getEnv()]["url"]
    }
    
}
