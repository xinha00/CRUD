/**
 Custom module for you to write your own javascript functions
 **/
var Custom = function () {

    // private functions & variables

    var myFunc = function (text) {
        alert(text);
    }

    // public functions
    return {

        //main function
        init: function () {
            //initialize here something.            
        },

        //some helper function
        doSomeStuff: function () {
            myFunc();
        }

    };

}();

jQuery(document).ready(function () {
    Custom.init();
});

$(document).ready(function () {
    $("#uploadimage").on('submit', (function (e) {
        e.preventDefault();
        $("#message").empty();
        $('#loading').show();
        $.ajax({
            url: "http://localhost/innfoco/painelcliente/dados/fundo.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {
                $('#loading').hide();
                $("#message").html(data);
            }
        });
    }));

// Function to preview image after validation
    $(function () {
        $("#file").change(function () {
            $("#message").empty(); // To remove the previous error message
            var file = this.files[0];
            var imagefile = file.type;
            var match = ["image/jpeg", "image/png", "image/jpg"];
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2])))
            {
                $('#previewing').attr('src', 'noimage.png');
                $("#message").html("<p id='error'>Please Select A valid Image File</p>" + "<h4>Note</h4>" + "<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
                return false;
            } else
            {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    function imageIsLoaded(e) {
        $("#file").css("color", "green");
        $('#image_preview').css("display", "block");
        $('#previewing').attr('src', e.target.result);
        $('#previewing').attr('width', '250px');
        $('#previewing').attr('height', '230px');
    }
	
	 $('.delete').click(function () {
        var id = $(this).attr('id').replace('del_', '');
        var pag = $(this).attr('data-pag');
		if (confirm("Você tem certeza que deseja deletar?")) {
			$.ajax({
				type: 'POST',
				url: 'http://localhost/innfoco/painelcliente/dados/delete.php',
				data: {id: id, pag: pag},
				success: function (data) {
					if (data == "delete") {
						$('#conteudo_' + id).fadeOut().remove();
					} else {
						alert("Não foi possivel deletar essa linha!");
					}
				}
			});
		}
    });
});

/***
 Usage
 ***/
//Custom.doSomeStuff();