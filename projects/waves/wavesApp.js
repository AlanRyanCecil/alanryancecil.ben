var wavesApp = angular.module('wavesApp', []);


///CONTROLLERS
wavesApp.controller('WavesController', ['$scope', '$log', function($scope, $log){
	$scope.project = "Waves of Sound and Light";
	$scope.fart = randommm("Gas");

	var context = new AudioContext();
	var Yval = 50;
	var oscillator = {};
	oscillator.osc1 = context.createOscillator();
	oscillator.osc1.type = "sine";
	oscillator.osc1.frequency.value = Yval;
	var mainGain = context.createGain();

	$scope.soundOn = function (event) {
		var osc = event.target.id;
		oscillator[osc] = context.createOscillator();
		mainGain.gain.value = .06;
		oscillator[osc].connect(mainGain);
		mainGain.connect(context.destination);
		oscillator[osc].start(0);
	};
	$scope.soundOff = function (event) {
		var osc = event.target.id;
		oscillator[osc].stop(0);
	};
	$scope.getXY = function (event) {
		var osc = event.target.id; 
		var Ypos = event.offsetY;
		var height = event.target.clientHeight;
		Yval = Math.floor(2050 - (Ypos / height) * 2000);
		Yval = Yval < 0 ? 0 : Yval;
		oscillator[osc].frequency.value = Yval;
	};
}]);