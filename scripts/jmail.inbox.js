(function(){
    
    this.loadPage = function(){
        $.blockUI({message: "Loading mails, please wait."});
        
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
         }).always($.unblockUI);
    };

}).bind(namespace("jmail.inbox"))();