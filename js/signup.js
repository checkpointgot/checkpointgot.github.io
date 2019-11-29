$(document).ready(function() {
    $("#signup-form").submit(function(e) {
        e.preventDefault();

        $("#signup-submit").addClass("spinner");
        $("#signup-submit").prop('disabled', true);

        var validForm = true;
        var inputArray = $(this).find("input.required");

        inputArray.each(function(item) {
            if ($(this).val() == "") {
                validForm = false;
                $("#signup-submit").removeClass("spinner");
                $("#signup-status").text("Please fill in your email.");
                $("#signup-status").addClass("error");
                $("#signup-submit").prop('disabled', false);
            }
        });


        if (validForm == true) {

            var formData = $(this).serialize();

            $.ajax({
                type: $(this).attr("method"),
                url: $(this).attr("action"),
                data: formData,
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                encode: true,
                error: function(err) {
                    console.log("Something went wrong:", err);
                },
                success: function(data) {

                    if (data) {
                        $("#signup-submit").removeClass("spinner");
                        $("#signup-status").addClass("active");

                        data = JSON.stringify(data);

                        if (data.includes("An email address must contain a single @") || data.includes("The domain portion of the email address is invalid")) {
                            $("#signup-status").text("Your email address is invalid.");
                            $("#signup-status").addClass("error");
                            $("#signup-submit").prop('disabled', false);
                        }

                        else if (data.includes("is already subscribed to list")) {
                            $("#signup-status").text("You were already subscribed!");
                            $("#signup-status").removeClass("error");
                            $("#signup-status").addClass("success");
                        }

                        else if (data.includes("Thank you for subscribing")) {
                            $("#signup-status").text("Thanks, you're subscribed!");
                            $("#signup-status").removeClass("error");
                            $("#signup-status").addClass("success");
                        }

                        else {
                            $("#signup-status").text("Sorry, unable to subscribe. Please try again later!");
                            $("#signup-status").addClass("error");
                        }
                    }

                    else {
                        $("#signup-submit").removeClass("spinner");
                        alert("Sorry, unable to subscribe. Please try again later!");
                    }
                },
            })
        }

        return;
    });
});