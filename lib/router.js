Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        this.render('loading')
    } else {
        this.next();
    }
});

BaseController = RouteController.extend({
    layoutTemplate : 'defaultLayout',
    loadingTemplate: 'loading_data'
});

AdminBaseController = RouteController.extend({
    layoutTemplate : 'adminLayout',
    loadingTemplate: 'loading_data'
});

HomeController = BaseController.extend({
    name : 'home',
    template : 'home',
    waitOn : function(){
        //return Meteor.subscribe('list_Surveys_on_Home')
    }
});

Challenge_CreateController = BaseController.extend({
    name : 'challenge.create',
    template : 'challenge_add'
})

Challenge_DetailController = BaseController.extend({
    name : 'challenge.detail',
    template : 'challenge_detail',
    path : '/challenge/:_id',
    waitOn : function(){
        Meteor.subscribe('challenge_by_id',this.params._id)
    },
    action : function(){
        this.state.set('challengeId',this.params._id);
        this.render()
    }
})

AboutUsController = BaseController.extend({
    name : 'about_us',
    template : 'about_us'
});

ContactController = BaseController.extend({
    name : 'contact',
    template : 'contact'
})

User_AdminController = AdminBaseController.extend({
    name : 'admin_user_list',
    template : 'admin_user_list',
    path : '/admin/user',
    waitOn : function(){
        return Meteor.subscribe('users_admin_list');
    },
    data : function(){
        return {
            users : Meteor.users.find()
        }
    }
});

Meteor.startup(function(){
    Router.route('/',{
        controller : HomeController
    });
    Router.route('/challenge/add',{
        name : 'challenge.create',
        controller : Challenge_CreateController
    });

    Router.route('/challenge/:_id',{
        controller : Challenge_DetailController
    })

    Router.route('/about-us',{
        controller : AboutUsController
    });

    Router.route('/contact',{
        controller : ContactController
    });

    Router.route('/admin/user',{
        controller : User_AdminController
    });

})
