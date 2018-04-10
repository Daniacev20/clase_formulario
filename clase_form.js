// clase para trabajar con formularios HTML

(function() {
	Form = function(idform) {
		var frm = document.getElementById(idform);

		// en las proximas 3 lineas se obtinen todos los controles del formulario
		var inputs = arrayficar(frm.getElementsByTagName("input"));
		inputs = inputs.concat(arrayficar(frm.getElementsByTagName("textarea")));
		inputs = inputs.concat(arrayficar(frm.getElementsByTagName("button")));

		// se separan los inputs-radio
		var radios = inputs.filter(function(elem) {
			return elem.type == "radio";
		});

		// se hace un array con todos los valores de los atributos name de los
		// inputs-radio para agruparlos
		var names = radios.reduce(function(a, elem) {
			if (a.indexOf(elem.name) < 0) a.push(elem.name);
			return a;
		}, []);

		// se separan los botones de cualquier tipo
		var buttons = inputs.filter(function(elem) {
			return elem.type == "button" || elem.type == "submit";
		});

		// se separan todos los controles que no sean botones ni input-radio
		var controles = inputs.filter(function(elem) {
			return elem.type != "radio" && elem.type != "button" && elem.type != "submit";
		});

		var prop; // variable para obtener los controles del formulario

		this.self = frm;

		// se crean las propiedades de la clase que contienen los controles
		// a partir de la camelizacion de sus atributos name
		for (var i = 0; i < controles.length; i++) {
			prop = camelizar(controles[i].name);
			this[prop] = controles[i];
		}
		
		// se crean propiedades de la clase formadas por la camelizacion del
		// prefijo "radio" y el atributo name del grupo
		for (var i = 0; i < names.length; i++) {
			prop = camelizar("radios-" + names[i]);
			this[prop] = arrayficar(document.getElementsByName(names[i]));
		}

		// se crean propiedades de la clase formadas por la camelizacion del
		// prefijo "btn" y el atributo name de cada boton
		for (var i = 0; i < buttons.length; i++) {
			prop = camelizar("btn-" + buttons[i].name);
			this[prop] = buttons[i];
		}
	}

	Form.prototype = { // aqui se agregan los metodos a la clase
		enableDisableControl: function(idctrl, state) {
			var ctrl = document.getElementById(idctrl) || this[idctrl];

			ctrl.disabled = !!state ? true : false;
		},
		controlIsDisabled: function(ctrl) {
			return typeof ctrl == "string" ? !!this[ctrl].disabled : !!ctrl.disabled;
		}
	}

	// tomado de la libreria Prototype.js
	// metodo para convertir iterables en Arrays
	// y metodo para formatear cadenas en estilo camel-case
	function arrayficar(o) {
		var len = o.length;
		var arr = new Array(len);

		while (len--) arr[len] = o[len];
		return arr;
	}

	function camelizar(s) {
		return s.replace(/-+(.)?/g, function(parte, caracter) {
			return caracter ? caracter.toUpperCase() : "";
		});
	}
})();