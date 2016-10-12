var app = {}
app.loginpage = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'submit #formlogin': 'signinn',
        'click #signup': 'signup',
        'focus .inf': 'hideerror'
    },
    render: function() {
        if (islogin())
            myrouter.navigate('status', {
                trigger: true
            });
        else {
            $(this.el).removeClass("col-sm-8").addClass("col-sm-12");
            $(this.el).empty();
            var data = $.ajax({
                'url': '/templates/loginpage.html',
                'async': false
            });
            if (data.responseText != undefined && data.responseText != '')
                var datac = Handlebars.compile(data.responseText);
            $(this.el).append(data.responseText);
            this.hideerror();


                                
                
            //return this;
        }
    },
    signinn: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var loginperson = {};
        loginperson.email = $('#inputEmail').val();
        loginperson.password = $('#inputPassword').val();
        var loginM = new loginModel();
        loginM.save(loginperson, {
            success: function(data) {
                console.log(data);
                data = data.toJSON();
                console.log(data);
                if (data.errorCode == 0) {
                    localStorage.setItem("sessionid", data.sessionId);
                    //localStorage.setItem("userid",data.u_id);
                    localStorage.setItem("statusProtype", "data.role");
                    myrouter.navigate('status', {
                        trigger: true
                    });
                } else if (data.errorCode == 2 || data.errorCode == 19) {
                    $('#le').show();
                    localStorage.setItem("sessionid", null);
                }
            },
            error: function(returndata) {
                console.log("error in login API");
            }
        });
    },
    signup: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        myrouter.navigate('signup', {
            trigger: true
        });
    },
    hideerror: function() {
        $('#le').hide();
    }
});
app.statuspage = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'submit #taskform': 'submitTask',
        'click #resetstatus': 'resetstatus',
        'click .actionbtn': 'editupdatedtask',
        'submit #userfilter': 'userfilter'
    },
    render: function() {
        if (islogin()) {
            $(this.el).removeClass("col-sm-12").addClass("col-sm-8");
            $('#left').show();
            scope = this;
             // var home = new homeModel()
             //    var p = {
             //        "sessionid": localStorage.getItem("sessionid")
             //    };
             //    home.save(p, {
             //        success: function(returndata) {
             //            returndata = returndata.toJSON();
             //              if(returndata.role=="admin")
             //            {
             //                    var data = $.ajax({
             //                        'url': '/templates/adminpage.html',
             //                        'async': false
             //                    });
             //                    if (data.responseText != undefined && data.responseText != '')
             //                        var datac = Handlebars.compile(data.responseText);
             //                    $(scope.el).html(datac(returndata));
             //                    $(".datepicker").datepicker();
             //           }
             //           else
             //           {
             //                var data = $.ajax({
             //                    'url': '/templates/dailytaskpage.html',
             //                    'async': false
             //                });
             //                if (data.responseText != undefined && data.responseText != '')
             //                    var datac = Handlebars.compile(data.responseText);
             //                $(this.el).html(datac);
             //                var table1 = new app.tableview();
             //                table1.render();
             //                $(".datepicker").datepicker();
             //           }
             //        },
             //        error: function(returndata) {
             //            console.log("error filter:" + returndata);
             //        }
             //    });
            if (localStorage.getItem("statusProtype") === "admin") {
                var admin = new adminModel()
                var p = {
                    "sessionid": localStorage.getItem("sessionid")
                };
                admin.save(p, {
                    success: function(returndata) {
                        returndata = returndata.toJSON();
                        var data = $.ajax({
                            'url': '/templates/adminpage.html',
                            'async': false
                        });
                        if (data.responseText != undefined && data.responseText != '')
                            var datac = Handlebars.compile(data.responseText);
                        $(scope.el).html(datac(returndata));
                        $(".datepicker").datepicker();
                    },
                    error: function(returndata) {
                        console.log("error filter:" + returndata);
                    }
                });
            } else {
                // $('#date').prop('type', 'date');
                //$("#date").prop('disabled', true);
                var data = $.ajax({
                    'url': '/templates/dailytaskpage.html',
                    'async': false
                });
                if (data.responseText != undefined && data.responseText != '')
                    var datac = Handlebars.compile(data.responseText);
                $(this.el).html(datac);
                
                var table1 = new app.tableview();
                table1.render();
            }
        } else{
            myrouter.navigate('login', {
                trigger: true
            });
        }
        $('#Esubmit').hide();
        console.log("i am here");
        return this;
    },
    dateformat: function(d) {
        d = new Date(d);
        //console.log("d1:"+d);
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yyyy = d.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        d = yyyy + '-' + mm + '-' + dd;
        //console.log("d2:"+d);
        return d;
    },
    userfilter: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        scope = this;
        n = $("#name").val();
        s = $('#ssdate').val();
        e = $('#eedate').val();
        var p = {
            "sessionid": localStorage.getItem("sessionid")
        };
        if (s !== "")
            s = this.dateformat(s);
        if (e !== "")
            e = this.dateformat(e);
        if (n != "A" && (s != "" || e != "")) {
            if (s == "") {
                s = "2000-01-01";
            } else if (e == "") {
                var e = new Date();
                e=this.dateformat(e);
              }
            p.userid = n;
            p.startdate = s;
            p.enddate = e;
        } else if (n == "A" && (s != "" || e != "")) {
            if (s == "") {
                s = "2000-01-01";
            } else if (e == "") {
                var e = new Date();
                e=this.dateformat(e);
            }
            p.startdate = s;
            p.enddate = e;
        } else if (n != "A") {
            p.userid = n;
        }
        if (Date.parse(s) > Date.parse(e)) {
            alert("choose valid date");
            document.getElementById("userfilter").reset();
        }else {
            var filter = new filtertaskModel()
            filter.save(p, {
                success: function(returndata) {
                    returndata = returndata.toJSON();
                    var data = $.ajax({
                        'url': '/templates/tasklistadmin.html',
                        'async': false
                    });
                    if (data.responseText != undefined && data.responseText != '')
                        var datac = Handlebars.compile(data.responseText);
                    $("#adminbox").html(datac(returndata));
                    $("#admintable").dataTable({
                        //"bFilter" : false,               
                        "bLengthChange": false,
                        "iDisplayLength": 5,
                        "aoColumnDefs": [{
                            'bSortable': false,
                            'aTargets': [1]
                        }, {
                            'bSortable': false,
                            'aTargets': [3]
                        }, {
                            'bSortable': false,
                            'aTargets': [4]
                        }, {
                            "sClass": "my_class",
                            "aTargets": [0, 1, 2, 3, 4, 5]
                        }]
                    });
                },
                error: function(returndata) {
                    console.log("error hh:" + returndata);
                }
            });
        }
    },
    submitTask: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        scope = this;
        var type = document.getElementById("submitTask").innerHTML;
        if (islogin()) {
            var newStatus = {};
            newStatus.sessionId = localStorage.getItem("sessionid");
            newStatus.type = type;
            newStatus.date = scope.dateformat(""+$('#date').val());
            newStatus.task = $('#task').val();
            newStatus.timeTaken = $('#time').val();
            newStatus.pendingTask = $('#P_task').val();
            console.log(newStatus);
            update = new updateTaskModel()
            update.save(newStatus, {
                success: function(returnData) {
                    var d = returnData.toJSON();
                    $("#date").prop('disabled', false);
                    document.getElementById("taskform").reset();
                    console.log("d.result1:" +d.result1);
                    if (type== "Submit") {
                        if (d.result === "success")
                            new app.tableview().render();
                        else {
                            $('#Esubmit').show();
                            new app.tableview().render();
                        }
                    } else {
                        new app.tableview().render();
                        document.getElementById("submitTask").innerHTML = "Submit";
                    }
                },
                error: function(returndata) {
                    console.log("error in UPDATE API");
                }
            });
        } else {
            myrouter.navigate('login', {
                trigger: true
            });
        }
    },
    resetstatus: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        document.getElementById("taskform").reset();
        $('#Esubmit').hide();
    },
    editupdatedtask: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (islogin()) {
            $("#date").prop('disabled', true);
            $('#Esubmit').hide();
            var i = event.target.id;
            console.log("edit clicked:" + i);
            $('#tsk' + i).attr('contentEditable', true);
            $('#tim' + i).attr('contentEditable', true);
            $('#ptask' + i).attr('contentEditable', true);
            var a = document.getElementById("dat" + i).innerHTML;
            var b = document.getElementById("tsk" + i).innerHTML;
            var c = document.getElementById("tim" + i).innerHTML;
            var d = document.getElementById("ptask" + i).innerHTML;
            document.getElementById("submitTask").innerHTML = "Update";
            document.getElementById("date").value = a;
            document.getElementById("task").value = b;
            document.getElementById("time").value = c;
            document.getElementById("P_task").value = d;
        } else {
            myrouter.navigate('login', {
                trigger: true
            });
        }
    }
});
//////////
app.tasklist = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'click .actionbtn': 'opentask'
    },
    render: function() {
        $('#left').show();
        $(this.el).removeClass("col-sm-12").addClass("col-sm-8");
        if (islogin()){
            var user = new UserModel();
            var scope = this;

            user.fetch({
                    success: function(returndata) {
                        var result = $.ajax({
                            'url': '/templates/tasklist.html',
                            'async': false
                        });
                        if (result.responseText != undefined && result.responseText != '')
                            var compiledresult = Handlebars.compile(result.responseText);
                        console.log("returndata:" + returndata.toJSON());
                        $(scope.el).html(compiledresult(returndata.toJSON()));
                    }
                })
               } else {
            myrouter.navigate('login', {
                trigger: true
            });
        }
        return this;
    },
    opentask: function(e) {
        var i = event.target.id;
        myrouter.navigate('singletask', {
            trigger: true
        });
    }
});
app.singletask = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {},
    render: function() {
        $(this.el).removeClass("col-sm-12").addClass("col-sm-8");
        $('#left').show();
        if (islogin()) {
            console.log("singletask");
            scope = this;
            $('#right').empty();
            var user = new UserModel2();
            var scope = this;
            user.fetch({
                success: function(returndata) {
                    var result = $.ajax({
                        'url': '/templates/singletask.html',
                        'async': false
                    });
                    if (result.responseText != undefined && result.responseText != '')
                        var compiledresult = Handlebars.compile(result.responseText);
                    console.log("returndata:", returndata.toJSON());
                    $(scope.el).html(compiledresult(returndata.toJSON()));
                }
            })
        } else {
            myrouter.navigate('login', {
                trigger: true
            });
        }
        return this;
    },
    opentask: function() {
        alert();
    }
});
/////////////////////////////////////
app.profilepage = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'dblclick .editP': 'updateprofileF',
        'click .update': 'updateprofileF2',
        'click .edit': 'updateprofileF'
    },
    render: function() {
        scope = this;
        console.log("in profile render");
        if (islogin()) {
            $('#left').show();
            $(this.el).removeClass("col-sm-12").addClass("col-sm-8");
            var profile = new profileModel();
            var p = {
                "sessionid": localStorage.getItem("sessionid")
            };
            profile.save(p, {
                success: function(returndata) {
                    console.log(returndata.toJSON());
                    var data = $.ajax({
                        'url': '/templates/profilepage.html',
                        'async': false
                    });
                    if (data.responseText != undefined && data.responseText != '')
                        var datac = Handlebars.compile(data.responseText);
                    console.log("returndata:" + returndata.toJSON());
                    $('#right').html(datac(returndata.toJSON()));
                    // $('#update').hide();
                },
                error: function(returndata) {
                    console.log("error:" + returndata);
                    myrouter.navigate('status', {
                        trigger: true
                    });
                }
            });
        } else
            myrouter.navigate('login', {
                trigger: true
            });
        return this;
    },
    updateprofileF: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var i = event.target.id;
        // console.log(i);
        $('.editP').prop('disabled', false).removeClass("inputfield");
        $('#update').html("Update");
        // console.log($('#update').innerHTML);
        //  document.getElementById("update").innerHTML = "Update";
        $('#update').addClass('update').removeClass('edit');
    },
    updateprofileF2: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        scope = this;
        var updateprofile = new updateprofileModel();
        var p = {
            "sessionid": localStorage.getItem("sessionid")
        };
        $('#update').innerHTML = "Update";
        p.firstname = $('#fn').val();
        p.lastname = $('#ln').val();
        p.email = $('#eml').val();
        p.alteremail = ($('#aeml').val() == undefined) ? "" : $('#aeml').val();
        p.empid = $('#emp').val();
        p.mobileno = $('#mn').val();
        p.username = $('#un').val();
        p.altermobileno = ($('#amn').val() == undefined) ? "" : $('#amn').val();
        if (validateEmail(p)) {
            console.log("here");
            updateprofile.save(p, {
                success: function(returndata) {
                    console.log(returndata);
                    scope.render();
                    $('#update').html("Edit");
                    $('#update').addClass('edit').removeClass('update');
                },
                error: function(returndata) {
                    console.log("error:" + returndata);
                    myrouter.navigate('status', {
                        trigger: true
                    });
                }
            });
        } else
            alert("invalid entry");
    }
});
///////////////////////////
app.tableview = Backbone.View.extend({
    el: $('#tablebox'),
    initialize: function() {
        //this.model.on('change', _.bind(this.render, this))
    },
    events: {},
    render: function() {
        scope = this;
        console.log("in table render");
        //task = new taskModel();
        if (islogin()) {
           //  setInterval(function(){
           // collection.fetch();
           //  },30000);
            task.save({
                "sessionid": localStorage.getItem("sessionid")
            }, {
                success: function(returndata) {
                    var tasklist = returndata.toJSON();
                    var data = $.ajax({
                        'url': '/templates/statuslist.html',
                        'async': false
                    });
                    if (data.responseText != undefined && data.responseText != '')
                        var datac = Handlebars.compile(data.responseText);
                    console.log("taskdata: " + tasklist);
                    $('#tablebox').html(datac(tasklist));
                },
                error: function(returndata) {
                    console.log("error:" + returndata);
                }
            });
        } else {
            myrouter.navigate('login', {
                trigger: true
            });
        }
        return this;
    }
});
app.createtask = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'focus .enddate': 'abc',
        'submit #taskform': 'assign'
    },
    render: function() {
        scope = this;
        console.log("in create render");
        task = new taskModel();
        if (islogin()) {
            $('#left').show();
            $(this.el).removeClass("col-sm-12").addClass("col-sm-8");
            var user = new UserModel0();
            user.fetch({
                success: function(returndata) {
                    console.log(returndata);
                    console.log(returndata.toJSON());
                    var data = $.ajax({
                        'url': '/templates/createtaskpage.html',
                        'async': false
                    });
                    if (data.responseText != undefined && data.responseText != '')
                        var datac = Handlebars.compile(data.responseText);
                    //console.log("taskdata: " + tasklist);
                    $(scope.el).html(datac(returndata.toJSON()));
                }
            })
        }
        return this;
    },
    assign: function() {
        console.log("assigned");
        var p = {
            "sessionid": localStorage.getItem("sessionid")
        };
        p.useId = $('#user').val();
        p.deadLine = new app.statuspage().dateformat($('#enddate').val());
        p.task = $('#ctask').val();
        p.comment = $('#ccomment').val();
        var today = new Date();
        p.assignDate = new app.statuspage().dateformat(today);
        console.log("a:" + p.deadLine);
        console.log("b:" + p.assignDate);
        console.log(p);
    },
    abc: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        $('#enddate').datepicker();
        console.log("date abc");
    }
});
/////////////////////////////////////////
app.signuppage = Backbone.View.extend({
    el: $('#right'),
    initialize: function() {},
    events: {
        'submit #frm': 'register',
        'focus .infs': 'hideerror'
    },
    render: function() {
        if (islogin())
            myrouter.navigate('status', {
                trigger: true
            });
        else {
            $(this.el).removeClass("col-sm-8").addClass("col-sm-12");
            $('#left').hide();
            var data = $.ajax({
                'url': '/templates/signuppage.html',
                'async': false
            });
            if (data.responseText != undefined && data.responseText != '')
                var datac = Handlebars.compile(data.responseText);
            $(this.el).html(datac);
            $('#sup').hide();
            $('#signup_cnf_pass-location').hide();
            //return this;
        }
    },
    register: function(e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        var pass1 = $('#pwd').val();
        var pass2 = $('#repwd').val();
        var status = true;
        if (pass1 != pass2) {
            $('#signup_cnf_pass-location').show();
            status = false;
        }
        if (status === true) {
            $('#signup_cnf_pass-location').hide();
            var newPerson = {};
            newPerson.firstName = $('#fname').val();
            newPerson.lastName = $('#lname').val();
            newPerson.email = $('#email').val();
            newPerson.alterEmail = $('#aemail').val();
            newPerson.uid = $('#empid').val();
            newPerson.password = $('#pwd').val();
            newPerson.mobileNum = $('#mobile').val();
            newPerson.alterMobileNum = $('#amobile').val();
            newModel = new signupModel();
            newModel.save(newPerson, {
                success: function(returnData) {
                    var data = returnData.toJSON()
                    if (data.errorCode == 0) {
                        alert("You are registered now Please Login");
                        myrouter.navigate('login', {
                            trigger: true
                        });
                    }else if(data.errorCode==1)
                    {
                        $('#sup').show();
                    }
                },
                error: function(data) {
                    console.log("error in signupAPI");
                }
            });
        }
    },
    hideerror: function() {
       $('#signup_cnf_pass-location').hide();
    }
});
/////////////////////////////////
app.notyboxView = Backbone.View.extend({
    el: $('#tt'),
    initialize: function() {
        //this.model.on('change', _.bind(this.render, this))
    },
    events: {
        "mouseover":'newnoty',
        "click .rowssr" : "notyclick",
         "mouseout":'removenewnoty',
         'click .notificationcount':'notyfunction'

    },
    render: function(id) {
        scope = this;
        console.log("in notyview render");
        var arr =["Apple","Apricot","Avocado","Goji berry","Grape","Raisin","Grapefruit"];  
        var data = $.ajax({
                        'url': '/templates/noty.html',
                        'async': false
                    });
                    if (data.responseText != undefined && data.responseText != '')
                        var datac = Handlebars.compile(data.responseText);
                    $(this.el).html(datac(arr));
                    this.pos(id);
        
        return this;
    },
    pos:function(i){
     var el1=document.getElementById(i);
     var el2=document.getElementById("tt");
     var X = el1.offsetLeft;
     var Y= el1.offsetTop;
     var w= el1.offsetWidth;
     var h= el1.offsetHeight;
      $('#tt').css( {
         'position': 'absolute',
         'right': 50,
         'top': Y+h+20,
         'width':100
       });
  },
  newnoty:function(e){
    $(e).addClass('newnoty');
  },
    removenewnoty:function(e){
    $(e).removeClass('newnoty');
  },
  notyfunction:function(){
      if($('#tt').css('display') == 'none')
{
    new app.notyboxView().render(id);
     $('#tt').show();
}
else
{
    $('#tt').hide();
 
}
}, 
  notyclick:function(e)
  {

      myrouter.navigate('singletask', {
                trigger: true
            });
  }
});
//////////////////////////
function logout5() {
    $('#left').hide();
    logoutM = new logoutModel();
    logoutM.save({"sessionid": localStorage.getItem("sessionid")},{
        success: function(data) {
            localStorage.setItem("sessionid", null);
            myrouter.navigate('login', {
                trigger: true
            });
        },
        error: function(returndata) {
            console.log("error not found:" + returndata);
        }
    });
}
function notyfunction(id) {

  if($('#tt').css('display') == 'none')
{
    new app.notyboxView().render(id);
     $('#tt').show();
}
else
{
    $('#tt').hide();
 
}
}
$('html').click(function() {
 $('#tt').hide();
});
function profile5() {
    $('#left').show();
    myrouter.navigate('profile', {
        trigger: true
    });
}
function home5() {
    myrouter.navigate('status', {
        trigger: true
    });
}
function createTask() {
    myrouter.navigate('createtask', {
        trigger: true
    });
}
function taskList() {
    myrouter.navigate('tasklist', {
        trigger: true
    });
}

function validateEmail(obj) {
    if (obj.mobileno.length < 10) {
        alert("mobile no. is invalid")
        return false;
    }
    if (obj.altermobileno.length < 10 && obj.altermobileno.length != 0) {
        alert("alternate mobile no. is invalid")
        return false;
    }
    var re_number = /^\d*$/;
    var re_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re_number.test(obj.mobileno) && re_email.test(obj.email) && re_number.test(obj.altermobileno) && re_email.test(obj.alteremail);
}

$(window).scroll(function() {
    var scrollTop = 70;
    if ($(window).width() > 768 && $(window).scrollTop() >= scrollTop) {
             $('#sidebar12').addClass('navbar1');
    }
    if ($(window).scrollTop() <= scrollTop) {
       $("#sidebar12").removeClass('navbar1');
    }
});
Handlebars.registerHelper("changeDate", function(date) {
    date = new Date(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    date = yyyy + '-' + mm + '-' + dd;
    return date;
})
window.onload = function (){
                   if(!!window.EventSource) {
                      var source = new EventSource('http://192.168.1.113:3005/events');
                      console.log("yes"+source);
                      source.onmessage =function(e)
                        {
                             console.log("yes in"+source);
                          //document.body.innerHTML += e.data + '<br>';
                        };
                    } else {
                      // Result to xhr polling :(
                      console.log("no");
                    }
}
exports = app;
