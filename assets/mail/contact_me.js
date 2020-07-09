$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            const data = {
                "blocks": [{
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": "*Team Name* - " + name}
                }, {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn", "text": "*Email* - " + email
                    }
                }, {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": "*Contact* - " + phone}
                }, {
                    "type": "section",
                    "text": {"type": "mrkdwn", "text": message}
                },
                ]
            };
            console.log("data"+data);
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "https://hooks.slack.com/services/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",
                type: "POST",
                data: JSON.stringify(data),
                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Your message has been sent. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Sorry " +
                                firstName +
                                ", it seems that my mail server is not responding. Please try again later!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});
