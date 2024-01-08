
class http{

    static async get(url:string,header:any){
        const response = await fetch(url,
             {
                method:"GET",
                headers:{...header}
             });
        const result = await response.json();  
        return result;
    }

    static  async post(url:string,payload:any,header:any){

        const response = await fetch(url,
            {
               method:"POST",
               headers:{...header,"Content-Type": "application/json"},
               body:JSON.stringify(payload)
            });
       const result = await response.json();  
       return result;
    }

    static async put(url:string,payload:any,header:any){
        const response = await fetch(url,
            {
               method:"PUT",
               headers:{...header,"Content-Type": "application/json"},
               body:JSON.stringify(payload)
            });
       const result = await response.json();  
       return result;

    }

}

export default http;