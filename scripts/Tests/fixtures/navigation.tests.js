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