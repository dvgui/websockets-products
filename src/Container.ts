import fs from 'fs';


const read = async (path: fs.PathLike | fs.promises.FileHandle) =>{
    try{
        const content = await fs.promises.readFile(path,"utf-8");
        return content
    }
    catch(err){
        throw new Error("Error de lectura " + err);
    }
}
const write = async (path: fs.PathLike | fs.promises.FileHandle, value: string) =>{
    try{
        const content = await fs.promises.writeFile(path, value);
        return content
    }
    catch(err){
        console.log("Error de escritura " + err)
    }
}

export default class Container{
    path: fs.PathLike | fs.promises.FileHandle;
    id: number;
    content: any[];
    constructor(path: fs.PathLike | fs.promises.FileHandle){
        this.path = path;
        this.id = 0;
        this.content = [];
        try{
            read(this.path).then(res =>{
                this.content = JSON.parse(res)
            })
            this.content.forEach(element => {
                if(element.id >= this.id){
                    this.id = element.id + 1;
                }
            });
        }catch(err){
            (async() => await write(this.path, "[]"))();
            throw new Error("Error " + err);
        }
    }
    
    save(object){
        object.id = this.id;
        this.content.push(object)
        this.id++;
        write(this.path,JSON.stringify(this.content)).catch(err=>{
            console.log("Error al escribir",err)
        })
        return this.id - 1;
    }
    getAll(){
        return this.content;
    }
    deleteById(id){
        this.content = this.content.filter(e => e.id !== Number(id));
        write(this.path,JSON.stringify(this.content)).catch(err =>{
            console.log("Error al escribir",err);
        })
    }
    deleteAll(){
        this.content = [];
        try{
            async()=> await write(this.path,"[]");
        }
        catch(err){
            console.log(err)
        }
    }
    update(id, product){
        let oldProduct = this.getById(id);
        if(!oldProduct){
            return null;
        }
        let newProduct = {...product, id};
        this.deleteById(id);
        this.content.push(newProduct);
        write(this.path,JSON.stringify(this.content)).catch(err =>{
            console.log("Error al escribir",err);
        })
        return newProduct;
    }
    getById(id){
        let value =  this.content.find(e => e.id === Number(id))
        if(!value){
            return null;
        }
        return value
    }
}