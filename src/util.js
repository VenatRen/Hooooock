import { functionTypeAnnotation } from "@babel/types";

export async function login({username, password, secondPassword}){
    return new Promise( (resolve, reject)=>{
        setTimeout( ()=>{ 
            if( (username=="user") && (password=='pass') && (password==secondPassword) ){
                resolve();
            }
            if( (password!=secondPassword) ){
                reject("");
            }
            else{
                reject("wrong username or password");
            }
        }, 1000);
    }  )
}

