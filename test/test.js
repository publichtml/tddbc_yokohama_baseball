module("test Util");

test("Util オブジェクトが存在する", function() {
	ok(util);
	ok(util.round);
});


test("小数を小数第三位で四捨五入する", function() {
	var actual = util.round(1.2345);
	var expected =1.235;
	equal(actual, expected, "小数第四位が5以上だと切り上がる");

	actual = util.round(0.1234);
	expected =0.123;
	equal(actual, expected, "小数第四位が5未満だと切り捨て");

	actual = util.round(0.100000);
	expected =0.1;
	equal(actual, expected, "0.100000 は 0.1");
});


module("test Baseball");

test("Baseball オブジェクトが存在する", function() {
	ok(baseball);
	ok(baseball.calcDaritsu);
	ok(baseball.formatDaritsu);
	ok(baseball.dispDaritsu);
});


test("打席数と打数と安打数から打率が計算できる", function() {
	var fixture = {
		daseki: 592,
		dasuu: 530,
		anda: 134
	};
	var actual = baseball.calcDaritsu(fixture);
	var expected = 0.253;
	equal(actual, expected);

	var fixture = {
		daseki: 530,
		dasuu: 466,
		anda: 121
	};
	var actual = baseball.calcDaritsu(fixture);
	var expected = 0.260;
	equal(actual, expected);

	var fixture = {
		dasuu: 466,
		anda: 121
	};
	var actual = baseball.calcDaritsu(fixture);
	var expected = 0.260;
	equal(actual, expected);
});


test("打席数が0の場合打率を計算しない", function() {
	var fixture = {
		daseki: 0,
		dasuu: 530,
		anda: 134
	};
	var actual = baseball.calcDaritsu(fixture);
	var expected = null;
	strictEqual(actual, expected);
});


test("打席数が0でなく、打数が0の場合は 0 と計算する", function() {
	var fixture = {
		daseki: 592,
		dasuu: 0,
		anda: 134
	};
	var actual = baseball.calcDaritsu(fixture);
	var expected = 0;
	strictEqual(actual, expected);
});

module("test formatDaritsu", {
	setup: function() {
		this.formatDaritsuWrapper = function(actual, expected) {
			var actual = baseball.formatDaritsu(actual);
			strictEqual(actual, expected);
		}
	},
	teardown: function() {
		ok(true);
	}
});


test("打率を整形する", function() {
	this.formatDaritsuWrapper(0.253, '.253');
	this.formatDaritsuWrapper(0.123, '.123');
	this.formatDaritsuWrapper(0.26, '.260');
	this.formatDaritsuWrapper(0.100, '.100');
	this.formatDaritsuWrapper(0, '.000');
	this.formatDaritsuWrapper(1, '1.00');
	this.formatDaritsuWrapper(null, '----');
	
});


test("打率を表示用に整形したものが出力できる", function() {
	var dispDaritsuMacro = function(actual, expected) {
		var actual = baseball.dispDaritsu(actual);
		strictEqual(actual, expected);
	}

	var fixture = {
		daseki: 592,
		dasuu: 530,
		anda: 134
	};
	var expected = '.253';
	dispDaritsuMacro(fixture, expected);

	var fixture = {
		daseki: 469,
		dasuu: 403,
		anda: 107
	};
	var expected = '.266';
	dispDaritsuMacro(fixture, expected);


	var fixture = {
		daseki: 530,
		dasuu: 466,
		anda: 121
	};
	var expected = '.260';
	dispDaritsuMacro(fixture, expected);
});