function islogin()
{  var s=localStorage.getItem("sessionid")
   console.log("s:"+s);
  if(s==="null" || s==="undefined")
    return false;
  return true;
}

var Router = Backbone.Router.extend({
  initialize:function () 
  { 
   
  },
  routes:{
         "" :"login",
         "login": "login",
         "status":"status",
         "profile":"profile",
         "signup":"signup",
         "createtask":"createtask",
         "tasklist":"tasklist",
         "singletask":"singletask"
        
  },
  login: function () {
         var login=new app.loginpage();
            login.render();
  },
  status:function(){
  
    
        var statusRef=new app.statuspage();
        statusRef.render();
  },
  profile:function(){
    
       var profile=new app.profilepage();
       profile.render();
  },
  signup:function(){
    
      var signup=new app.signuppage();
      signup.render();
 
  },
  createtask:function()
  {
    var create=new app.createtask();
      create.render();
  },
  tasklist:function(){
    
      var tasklist=new app.tasklist();
      tasklist.render();
 
  },
    singletask:function(){
    
      var singletask=new app.singletask();
      singletask.render();
 
  }
});
var myrouter = new Router();
exports= myrouter;
 Backbone.history.start();



// <header id="subheaderid" class="obeo-subheader hide">
//       <div class="container">
//         <div class="row" style="margin:0">
//           <div class="col-md-12">
//             <div class="pull-right">
//               <ul class="nav navbar-nav obeo-ul">
//                 <!--li style="display:none;" id="selectplan"><a href="javascript:void(0);" class="obeo-myplanoutline"></a></li-->
//                 <li class="active" id="plancomp"><a href="javascript:void(0);" class="obeo-plancomparision"></a></li>
//                 <li id="expenses"><a href="javascript:void(0);" class="obeo-myexpenses"></a></li>
//                 <li id="alerts"><a href="javascript:void(0);" class="obeo-alert"><div style="display:none;" class="alertCircle" id="alertcount"></div><i id="noalertmark" class="fa fa-exclamation-circle"></i> Alerts</a></li>
//               </ul>
//             </div>
//             <div id="alertboxtooltip" style="z-Index:10000;position:absolute; display:none;"></div>
//           </div>
//         </div>
//       </div>

//     </header>
//         