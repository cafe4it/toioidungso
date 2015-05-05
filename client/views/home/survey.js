Template.survey_detail.created = function(){
    Session.set('loadedCount',0);
}

Template.survey_detail.rendered = function(){
    $(document).ready(function(){
        $('#myIFrame').on('load',function(){
            var i = Session.get('loadedCount')+1;
            Session.set('loadedCount',i);
            i = Session.get('loadedCount'), currentRoute = Router.current().name;
            if(i >= 2 && currentRoute == 'survey_detail'){
                var lottoCode = Session.get('lottoCode'),survey = Session.get('currSurvey');
                var newResponse = {
                    userId : Meteor.userId(),
                    surveyId : survey._id,
                    lottoCode : (lottoCode) ? lottoCode : ''
                };
                Meteor.call('insertSurveyResponse',newResponse,function(res){
                    if(res){
                        survey = Session.get('currSurvey');
                        survey = _.extend(survey,{showThankYou : true,isShowForm : false});
                        Session.set('currSurvey',survey);
                        c.stop();
                    }
                })
            }
        })
    })
}

Tracker.autorun(function(c){

})

/*Tracker.autorun(function(c){
    if(FlowRouter.subsReady() && Session.get('surveyPath') == FlowRouter.current().path){
        var surveyId = FlowRouter.getParam('id'),userId = FlowRouter.getParam('user') || Meteor.userId();
        var survey = Surveys.findOne({_id : surveyId});
        var response = Responses.findOne({userId : userId ,surveyId : surveyId});
        var isShowForm = true,showThankYou = false;
        if(survey.hasLotto){
            if(response){
                Session.set('lottoCode',response.lottoCode);
                isShowForm = false , showThankYou = true;
            }
        }
        survey = _.extend(survey, {showThankYou : showThankYou,isShowForm : isShowForm});
        Session.set('currSurvey',survey);

        Session.set('currResponse',response);

        var i = Session.get('loadedCount');

        if(i >= 2){
            var lottoCode = Session.get('lottoCode'),survey = Session.get('currSurvey');
            var newResponse = {
                userId : Meteor.userId(),
                surveyId : survey._id,
                lottoCode : (lottoCode) ? lottoCode : ''
            };
            Meteor.call('insertSurveyResponse',newResponse,function(res){
                if(res){
                    survey = Session.get('currSurvey');
                    survey = _.extend(survey,{showThankYou : true,isShowForm : false});
                    Session.set('currSurvey',survey);
                    c.stop();
                }
            })
        }
    }

})*/

Template.survey_detail.helpers({
    lottoCode : function(){
        return Session.get('lottoCode');
    },
    survey : function(){
        var survey = Session.get('currSurvey');
        return survey
    }
})