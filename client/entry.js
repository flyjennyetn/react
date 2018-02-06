/**
 * Created by flyjennyetn on 2016-10-26.
 */
if(process.env.NODE_ENV){
    module.exports=require('./entry.prod')
}else{
    module.exports=require('./entry.dev')
}