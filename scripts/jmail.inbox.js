(function(){
    
    this.loadPage = function(){
        $.post("/getLastestMails")
         .done(function(mails){
            if(mails.length === 0){
                $("#inboxEmptyTemplate")
                    .tmpl()
                    .appendTo("div#inbox > ul");
            }else{
                $("#inboxMailTemplate")
                    .tmpl(mails)
                    .appendTo("div#inbox > ul");
            }
         });
    };

}).bind(namespace("jmail.inbox"))();