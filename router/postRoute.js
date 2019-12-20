var express = require('express');
 var router   =express.Router();
var urls=require("url");
var {Gallery} = require("../model/gallery");
var {Tag} = require("../model/tag");



router.get('/',async function(req,res){
    Tag.find({}).then((data)=>{
        res.render('form.ejs',{tags:data });
    }).catch((err)=>{
        console.log(err);
    })
    
})
router.post('/image',async function(req,res){
    
    // var url =urls.parse(req.body.url,true);
    try{
        
     
        var len = req.body.url.length;
    var image = req.body.url.substr(0,len-1);
    var url=image+'1';
        
   // console.log(str.split('/')[3]);
    
    var data = await Gallery.create({
        url:url,
        tag:req.body.tag,
        description:req.body.description
    })
    console.log(data);

    res.redirect('/post');
}catch(err){
    console.log(err);
    res.send("unable to create db");
}

})
router.post('/tag',async function(req,res){
    console.log(req.body);
    try{
    var tag_data=await Tag.create({
        tag:req.body.tag
    });
    console.log(tag_data);
    res.redirect('/post');
}catch(err){
    console.log(err);
    res.send("data should be unique");
}
})


module.exports=router;
