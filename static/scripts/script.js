var canvas;
var ctx;
var images = [ // predefined array of used images
    '../images/pic1.jpg'];
var iActiveImage = 0;
$(function(){

    var rgbToHex = function (rgb) {
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
           hex = "0" + hex;
      }
      return hex;
    };

    var fullColorHex = function(r,g,b) {
      var red = rgbToHex(r);
      var green = rgbToHex(g);
      var blue = rgbToHex(b);
      return red+green+blue;
    };

    // drawing active image
    var image = new Image();
    image.src = $('#pls').attr('src');



      image.onload = function () {

    var hRatio = canvas.width / image.width    ;
    var vRatio = canvas.height / image.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    ctx.drawImage(image, 0,0, image.width, image.height, 0,0,image.width*ratio, image.height*ratio);
    }

    console.log(image.width);
    console.log(image.height);

    // creating canvas object
    canvas = document.getElementById('panel');
    ctx = canvas.getContext('2d');



    $('#panel').mousemove(function(e) { // mouse move handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        var pixelColor = "rgba("+pixel[0]+", "+pixel[1]+", "+pixel[2]+", "+pixel[3]+")";
        $('#preview').css('backgroundColor', pixelColor);
    });
    $('#panel').click(function(e) { // mouse click handler
        var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        // $('#rVal').val(pixel[0]);
        // $('#gVal').val(pixel[1]);
        // $('#bVal').val(pixel[2]);

        var color = fullColorHex(pixel[0], pixel[1], pixel[2])
        // $('#rgbVal').val(pixel[0]+','+pixel[1]+','+pixel[2]);
        // $('#rgbaVal').val(pixel[0]+','+pixel[1]+','+pixel[2]+','+pixel[3]);
        // var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
        // $('#hexVal').val( '#' + dColor.toString(16) );
        var help = $( "#selectColor" ).val();
        //console.log('#' + dColor.toString(16));

        $('#' + help).css('backgroundColor', '#' + color);
        $('#' + help + ' > p').text('#' + color);

    });

    $('#hexButton').click(function() {
        var help = $( "#selectColor" ).val();
        var x = $('#preview').css('backgroundColor');

        $(help).css('backgroundColor', x);
        console.log(help);

    });




});