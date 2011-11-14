module("Navigation tests");

test("when navigating to the compose screen then push target=compose", function() {
    //arrange
    var bbqStub = this.stub($.bbq, "pushState");
    
    //act
    $("a#compose").click();

    //assert
    ok(bbqStub.called);
    equal(bbqStub.args[0][0].target, "compose" );
});

test("when navigating to the inbox screen then push target=inbox", function() {
    //arrange
    var bbqStub = this.stub($.bbq, "pushState");
    
    //act
    $("a#inbox").click();

    //assert
    ok(bbqStub.called);
    equal(bbqStub.args[0][0].target, "inbox" );
});

test("when changing the hash to target=inbox then compose should be hide", function() {
    //arrange
    var getState = this.stub($.bbq, "getState");
    getState.withArgs("target").returns("inbox");
    $("div#compose").show();

    //act
    $(window).triggerHandler("hashchange");

    //assert
    var isComposeVisible = $("div#compose").is(":visible");
    ok(!isComposeVisible);
});

test("when changing the hash to target=compose then inbox should be hide", function() {
    //arrange
    var getState = this.stub($.bbq, "getState");
    getState.withArgs("target").returns("compose");
    $("div#inbox").show();

    //act
    $(window).triggerHandler("hashchange");

    //assert
    var isInboxVisible = $("div#inbox").is(":visible");
    ok(!isInboxVisible);
});

test("when changing the hash to target=inbox then call the inbox.loadPage", function() {
    //arrange
    var getState = this.stub($.bbq, "getState"),
        jmailLoadPage = this.stub(jmail.inbox, "loadPage");

    getState.withArgs("target").returns("inbox");

    //act
    $(window).triggerHandler("hashchange");

    //assert
    ok(jmailLoadPage.called);
});