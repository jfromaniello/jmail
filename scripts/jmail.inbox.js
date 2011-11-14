(function(){
    
    this.loadPage = function(){
        $.blockUI({message: "Loading mails, please wait."});
        var target = $("div#inbox > ul").html("");
        $.post("/getLastestMails")
         .done(function(mails){
            if(mails.length === 0){
                $("#inboxEmptyTemplate")
                    .tmpl()
                    .appendTo(target);
            }else{
                $("#inboxMailTemplate")
                    .tmpl(mails)
                    .appendTo(target);
            }
         }).always($.unblockUI);
    };

}).bind(namespace("jmail.inbox"))();