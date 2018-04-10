// script para probar la clase

window.addEventListener("load", function() {
	var frm = new Form("frm-prueba");

	frm.dhControles.addEventListener("click", function() {
		if (frm.controlIsDisabled(frm.nombre))
			frm.enableDisableControl("nombre", false);
		else
			frm.enableDisableControl("nombre", true);
	});
});