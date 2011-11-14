module("Inbox");

test("can load the inbox mails", function() {
    this.server.respondWith("/getLastestMails",
                            [200, { "Content-Type": "application/json" },
                                JSON.stringify([{
                                    mailId: 123, 
                                    subject: "greetings from China", 
                                    from: "mom@foo.bar"}
                                ])]);
    
    jmail.inbox.loadPage();

    this.server.respond();

    $("div#inbox")
        .assertContains("li.mail", "it should contains a li.mail");

    $("li.mail")
        .assertContainsText("greetings from China", "the mail item should show the subject somehow")
        .assertContainsText("mom@foo.bar", "the mail item should the mail somehow");
});     


test("when loading an empty inbox then show a message", function() {
    this.server.respondWith("/getLastestMails",
                            [200, { "Content-Type": "application/json" },
                                JSON.stringify([])]);
    
    jmail.inbox.loadPage();

    this.server.respond();

    $("div#inbox")
        .assertNotContains("li.mail", "it should contains a li.mail");

    $("div#inbox")
        .assertContainsText("The inbox is empty");
});

test("while loading the inbox it should show a loading message", function() {
    var blockUiStub = this.stub($, "blockUI");

    jmail.inbox.loadPage();

    ok(blockUiStub.called);
    equal(blockUiStub.args[0][0].message, "Loading mails, please wait.");
});

test("after loading the inbox it should unblock the ui", function(){
    this.server.respondWith("/getLastestMails",
                            [200, { "Content-Type": "application/json" },
                                JSON.stringify([])]);
    
    var blockUiStub = this.stub($, "unblockUI");
    
    jmail.inbox.loadPage();
    this.server.respond();
    ok(blockUiStub.called);
});