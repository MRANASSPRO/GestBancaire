function setInputFilter(textbox, inputFilter) {
    $('button').attr("disabled", "disabled");
    //var solde = [[${soldeCompte}]];


    //$('button#go').css('background', 'green');

    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {

            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;

                soldeValid();

            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });

}

function soldeValid() {
    var solde = +document.getElementById("soldeDu").value;
    var message = '';
    //console.log(typeof solde + ": " + solde);
    //document.getElementById("error").innerText;

    if ($('#soldeDu').val().length > 0)
        message = 'Veuillez saisir un montant qui ne depasse pas votre solde: ' + solde;
    else
        message = 'Veuillez saisir un Compte';

    var validate;
    if ($('#montant').val() === '' || $('#montant').val() === '.')
        validate = 0;
    else
        validate = parseFloat($('#montant').val());

    //console.log(document.theForm.action.value);

    if (validate === 0 || (solde < validate)) {
        $('button').attr("disabled", "disabled");
        if (solde < validate) {
            document.getElementById("error").style.display = 'inline-block';
            document.getElementById("error").innerHTML = message;
            // $('label#error').css('background', 'red');
        }

    } else if (validate != 0 && solde >= validate ) {

        if ($('#soldeAu').val().length > 0){
            $('button').removeAttr("disabled");
            document.getElementById("error").style.display = 'none';

        }else {
            $('button').attr("disabled", "disabled");
            document.getElementById("error").innerHTML = 'Veuillez saisir un destinataire';
        }
    }
}
