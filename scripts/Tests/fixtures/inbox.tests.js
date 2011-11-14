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