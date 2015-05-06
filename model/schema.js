Schemas = {}

Challenges = new Meteor.Collection('challenges');

Schemas.Challenge = new SimpleSchema({
    title : {
        type : String,
        label : 'Mục tiêu'
    },
    description : {
        type : String,
        label : 'Miêu tả',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                settings: {
                    height: 300,                 // set editor height
                    focus: true                 // set focus to editable area after initializing summernote
                }
            }
        }
    },
    author : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    },
    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    }
});

Challenges.attachSchema(Schemas.Challenge);