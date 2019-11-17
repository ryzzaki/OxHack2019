$(document).ready(function() {


    $('#accident_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        fields: {
            latitude: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please enter the latitude'
                    }
                }
            },
             longitude: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter the longitude'
                    }
                }
            },
			 eta: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please enter your the ETA of the ambulance'
                    }
                }
            }
            }
        })

        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#accident_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            var request = new XMLHttpRequest();
            var url = "localhost:3000/api/notificator/call";
            request.open("POST", url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    var jsonData = JSON.parse(request.response);
                    console.log(jsonData);
                }
            };
            var longitude =  document.getElementById("longitude").value;
            var latitude = document.getElementById("latitude").value;
            var eta = document.getElementById("eta").value;
            var description = document.getElementById("description").value;

            var data = JSON.stringify({"longitude": longitude, "latitude": latitude, "eta": eta, "description": description});


            request.send(data);

        });
        
});
