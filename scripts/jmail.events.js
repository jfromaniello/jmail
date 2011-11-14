$(document)
    .delegate("#compose", "click", function(e){
        e.preventDefault();

        $.bbq.pushState({
            target: "compose"
        });

        return false;
    })
    .delegate("#inbox", "click", function(e){
        e.preventDefault();

        $.bbq.pushState({
            target: "inbox"
        });
        
        return false;
    });