(function(){
    
    this.loadPage = function(){
        $.post("/getLastestMails")
         .done(function(mails){
            $("#inboxMailTemplate")
                .tmpl(mails)
                .appendTo("div#inbox > ul"); 
         });
    };

}).bind(namespace("jmail.inbox"))();