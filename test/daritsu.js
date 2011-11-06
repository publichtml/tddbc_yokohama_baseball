var util = {
	round : function(number){
		var coef = 1000;
		number *= coef;
		number = Math.round(number);
		number /= coef;
		return number;
	}

};

var baseball = {
	calcDaritsu : function(data){	
		var daseki = data.daseki;

		if(daseki === 0) return null;

		var dasuu = data.dasuu;

		if(dasuu === 0) return 0;

		var anda = data.anda;
		var daritsu = anda / dasuu;
		daritsu = util.round(daritsu);
		return daritsu;
	},
	
	formatDaritsu: function(daritsu) {
		if(daritsu === 1) return '1.00';
		if(daritsu === 0) return '.000';
		if(daritsu === null) return '----';

		daritsu = daritsu.toString().slice(1);

		while(daritsu.length < 4){
			daritsu += '0';
		}
		
		return daritsu;
	
	},
	
	dispDaritsu: function(data) {
		return baseball.formatDaritsu(baseball.calcDaritsu(data));
	}
	
};
