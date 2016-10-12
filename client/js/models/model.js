var profileModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/profile'
});
var loginModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:5006/login'
});
var taskModel = Backbone.Model.extend({
   url: 'http://192.168.1.113:3005/task'
});
var logoutModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/logout'
});
var updateTaskModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/updatetask'
});
var signupModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:5006/signup'
});
var updateProfileModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/updateprofile'
});
var adminModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/admin'
});
var filterTaskModel = Backbone.Model.extend({
    url: 'http://192.168.1.113:3005/about'
});
var UserModel0 = Backbone.Model.extend({
    url: 'json/my.json'
});
var tasklist = Backbone.Model.extend({
    url: 'http://192.168.1.113:5005/tasklist'
});
var singletask = Backbone.Model.extend({
    url: 'http://192.168.1.113:5005/singletask'
});
var UserModel = Backbone.Model.extend({
    url: 'json/tasklist.json'
});var UserModel2 = Backbone.Model.extend({
    url: 'json/singletask.json'
});
task = new taskModel();