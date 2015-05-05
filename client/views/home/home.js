Template.home.events({
    /*'click #btnGoToSurvey' : function(e,t){
        e.preventDefault();
        FlowRouter.go('/survey')
    }*/
});

Template.home.helpers({
    surveys_on_home : function(){
        try{
            var surveys = Surveys.find();
            return surveys;
        }catch(Ex){
            console.log(Ex)
        }
    }
})