assertContains = function (array, fun, message) {
	var arrayToTest = array.subscribe == undefined ? array : array();
	var hasAny = $.grep(arrayToTest, fun).length > 0;
	ok(hasAny, message + "\n fun: " + fun);
};

assertNotContains = function (array, fun, message) {
	var arrayToTest = array.subscribe == undefined ? array : array();
	var hasAny = $.grep(arrayToTest, fun).length > 0;
	ok(!hasAny, message + "\n fun: " + fun);
};


(function( $ ){
  $.fn.assertContains = function(selector, message) {
    QUnit.push($(selector, this).length > 0, this.html(), "contains " + selector, message);
    return this;
  };

  $.fn.assertNotContains = function(selector, message) {
    QUnit.push($(selector, this).length === 0, this.html(), "not contains " + selector, message);
    return this;
  };

  $.fn.assertContainsText = function(text, message) {
    QUnit.push(this.is(":contains('" + text + "')"), this.html(), "contains text " + text, message);
    return this;
  };

  $.fn.assertNotContainsText = function(text, message) {
    QUnit.push(!this.is(":contains('" + text + "')"), this.html(), "not contains text " + text, message);
    return this;
  };
})( jQuery );


$.blockUI = function(){};
$.unblockUI = function(){};