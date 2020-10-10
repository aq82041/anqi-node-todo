const homedir = require('os').homedir();
const home=process.env.HOME || homedir //如果没有home变量，就用系统默认的home目录
const p=require('path')
const fs=require('fs')
const dbPath=p.join(home,'.todo')

const db={
    read(path=dbPath){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,{flag:'a+'},(err,data)=>{  // 异步操作，不能return，所以放在promise里
                if(err){return reject(err)}
                let list
                try{
                    list=JSON.parse(data.toString()) // 如果parse空字符串，会报错
                }catch(err2){
                    list=[] // 如果原本内容为空，就创建一个空数组
                }
                resolve(list)
            })
        })

    },
    write(list,path=dbPath){
        return new Promise((resolve,reject)=>{
            const string=JSON.stringify(list)
            fs.writeFile(path,string+'\n',(err3)=>{
                if(err3) return reject(err3)
                resolve()
            })
        })
    }
}

module.exports=db