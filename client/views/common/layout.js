Template.header.helpers({
    isActiveRoute : function(path){
        return (Session.get('currentPath') == path) ? 'active' : '';
    },
    fbMe : function(){
        var fbUser = Session.get('fbUser');
        if(fbUser && _.has(fbUser,'me') && Meteor.userId()){
            return fbUser.me;
        }
    }
});

Template.header.events({
    'click #btnSignOut' : function(e,t){
        e.preventDefault();
        Meteor.logout(function(err){
            Session.set('isLogout',true);
            FlowRouter.go('/sign-out');
        })
    }
})

Template.loading.created = function(){
    var self = this;
    var num = 20;
    Session.set('showRefreshButton',false);
    this.remaining = new ReactiveVar(num);
    this.interval = Meteor.setInterval(function(){
        var remaining = self.remaining.get();
        self.remaining.set(--remaining);
        if (remaining === 0){
            Meteor.clearInterval(self.interval);
            Session.set('showRefreshButton',true);
        }
    }, 1000);
}

Template.loading.helpers({
    ifInternetDown : function(){
        return Session.get('showRefreshButton')
    }
})

Template.loading.events({
    'click #btnRefreshPage' : function(e,t){
        e.preventDefault();
        location.reload();
    }
})

Template.footer.helpers({
    year : function(){
        var begin = 2015, year = new Date().getFullYear();
        return (begin <= year) ? begin : begin + ' - ' + year;
    }
})

Template.sign_out.events({
    'click #btnLoginAgain' : function(e,t){
        e.preventDefault();
        location.reload();
    }
})