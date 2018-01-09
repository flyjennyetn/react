/**
 * Created by flyjennyetn on 2016-10-26.
 */
if(process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'dev'){
    module.exports=require('./entry.dev')
}else{
    module.exports=require('./entry.prod')

}