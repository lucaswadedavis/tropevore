var boum={};
boum.mem={};
boum.click=function(cssSelector,callback){
  if (this.mem["click-"+cssSelector]){return;}
  this.mem["click-"+cssSelector]=callback;
  var args=Array.prototype.slice.call(arguments,2);
  $("body").on("click",cssSelector,function(){
    callback.apply(null,args);
  });
};
