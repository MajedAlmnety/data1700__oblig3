function submit() {
    let billett = {
        film: $("#filmer").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        tlf: $("#tel").val(),
        epost: $("#epost").val()
    };

    // Clear previous error messages
    $(".error").text("").css('color', '');

    const phonePattern = /^\d{8}$/;  // Assumes a Norwegian phone number format (8 digits)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (billett.fornavn === "") {
        $("#fornavnError").text("Må skrive noe inn i fornavn").css('color', 'red');
        hasError = true;
    }
    if (billett.etternavn === "") {
        $("#etternavnError").text("Må skrive noe i etternavn").css('color', 'red');
        hasError = true;
    }
    if (billett.tlf === "") {
        $("#talError").text("Må skrive noe i telefonnummer").css('color', 'red');
        hasError = true;
    } else if (!phonePattern.test(billett.tlf)) {
        $("#talError").text("Ugyldig telefonnummerformat").css('color', 'red');
        hasError = true;
    }
    if (billett.epost === "") {
        $("#epostError").text("Må skrive noe i epost").css('color', 'red');
        hasError = true;
    } else if (!emailPattern.test(billett.epost)) {
        $("#epostError").text("Ugyldig e-postadresseformat").css('color', 'red');
        hasError = true;
    }
    if (Number(billett.antall) === 0) {
        $("#antallError").text("Må være større enn null").css('color', 'red');
        hasError = true;
    }
    if (billett.film === "") {
        $("#filmError").text("Velg en film").css('color', 'red'); 
        hasError = true;
    }

    if (!hasError) {
        $.post("/save_data", billett, function () {
            listfilmer();  // Refresh the ticket list on success
            // Clear form
            $("#filmer").val("");
            $("#antall").val(1);  // Reset to default value
            $("#fornavn, #etternavn, #tel, #epost").val("");
        });
    }
}

function listfilmer() {
    $.get("/list_data", function(data) {
        formaterData(data);
    }).fail(function() {
        alert('Kunne ikke hente billetter fra serveren.');
    });
}

function formaterData(billetter) {
    let ut = "";
    for (let billett of billetter) {
        ut += `<tr>
                   <td>${billett.film}</td>
                   <td>${billett.antall}</td>
                   <td>${billett.fornavn}</td>
                   <td>${billett.etternavn}</td>
                   <td>${billett.tlf}</td>
                   <td>${billett.epost}</td>
               </tr>`;
    }
    $("#billetter").html(ut);
}
function slettAlleBilletter(){
    $.get("/delete_data", function () {

        listfilmer();
    });




}




$(document).ready(function() {
    listfilmer();
});
