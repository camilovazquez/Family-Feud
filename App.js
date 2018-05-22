import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/1be21bf8577aa9f6c6fffd21c209031c2f907753/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        setSize(600,500);
function background(){
    var backGround = new Rectangle(getWidth(), getHeight());
    backGround.setColor("#FF8C00");
    add(backGround);
    }
function circle(){
    var outCircle = new Circle(201);
    outCircle.setPosition(getWidth()/2, getHeight()/2);
    add(outCircle);
    var cenCircle = new Circle(200);
    cenCircle.setPosition(getWidth()/2, getHeight()/2);
    cenCircle.setColor("#DAA520");
    add(cenCircle);
    var cenCircle2 = new Circle(190);
    cenCircle2.setPosition(getWidth()/2, getHeight()/2);
    cenCircle2.setColor(Color.blue);
    add(cenCircle2);
}
function square(){
    var outSquare1 = new Rectangle(53,82);
    outSquare1.setPosition(getWidth()/2 - 251, getHeight()/2 - 41);
    add(outSquare1);
    var outSquare2 = new Rectangle(54,80);
    outSquare2.setPosition(getWidth()/2 - 250, getHeight()/2 - 40);
    outSquare2.setColor("#DAA520");
    add(outSquare2);
    var outSquare3 = new Rectangle(90,60);
    outSquare3.setPosition(getWidth()/2 - 240, getHeight()/2 - 30);
    outSquare3.setColor(Color.blue);
    add(outSquare3);
}
function square2(){
    var outSquare1 = new Rectangle(63,82);
    outSquare1.setPosition(getWidth()/2 + 195, getHeight()/2 - 41);
    add(outSquare1);
    var outSquare2 = new Rectangle(63,80);
    outSquare2.setPosition(getWidth()/2 + 194, getHeight()/2 - 40);
    outSquare2.setColor("#DAA520");
    add(outSquare2);
    var outSquare3 = new Rectangle(90,60);
    outSquare3.setPosition(getWidth()/2 + 155, getHeight()/2 - 30);
    outSquare3.setColor(Color.blue);
    add(outSquare3);
}
function upperSquare(){
    var square1 = new Rectangle(60, 41);
    square1.setPosition(getWidth()/2 - 30, getHeight()/2 - 126);
    add(square1);
    var square2 = new Rectangle(52, 32);
    square2.setPosition(getWidth()/2 - 26, getHeight()/2 - 122);
    square2.setColor(Color.blue);
    add(square2);
    var logo = new WebImage("data:image/jpeg;base64,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");
    logo.setPosition(getWidth()/2 - 26, getHeight()/2 - 122);
    logo.setSize(52,32);
    add(logo);
}


var x = 0;

function Question1(){
var an1 = "english";
var an2 = "french";
var an3 = "italian";
var an4 = "spanish";
var an5 = "chinese";
var an6 = "arabic";
var an7 = "python";
var an8 = "swedish";
    var Square1 = new Rectangle(240,164);
    Square1.setPosition(getWidth()/2 - 120, getHeight()/2 - 76);
    Square1.setColor("#DAA520");
    add(Square1);
    var Square2 = new Rectangle(232,156);
    Square2.setPosition(getWidth()/2 - 116, getHeight()/2 - 72);
    add(Square2);
    var Square3 = new Rectangle(110,30);
    Square3.setPosition(getWidth()/2 - 114, getHeight()/2 - 70);
    Square3.setColor(Color.blue);
    add(Square3);
    var Square4 = new Rectangle(110,30);
    Square4.setPosition(getWidth()/2 - 114, getHeight()/2 - 30);
    Square4.setColor(Color.blue);
    add(Square4);
    var Square5 = new Rectangle(110,30);
    Square5.setPosition(getWidth()/2 - 114, getHeight()/2 + 12);
    Square5.setColor(Color.blue);
    add(Square5);
    var Square6 = new Rectangle(110,30);
    Square6.setPosition(getWidth()/2 - 114, getHeight()/2 + 52);
    Square6.setColor(Color.blue);
    add(Square6);
    var Square7 = new Rectangle(110,30);
    Square7.setPosition(getWidth()/2 + 2 , getHeight()/2 - 70);
    Square7.setColor(Color.blue);
    add(Square7);
    var Square8 = new Rectangle(110,30);
    Square8.setPosition(getWidth()/2 + 2 , getHeight()/2 - 30);
    Square8.setColor(Color.blue);
    add(Square8);
    var Square9 = new Rectangle(110,30);
    Square9.setPosition(getWidth()/2 + 2 , getHeight()/2 + 12);
    Square9.setColor(Color.blue);
    add(Square9);
    var Square10 = new Rectangle(110,30);
    Square10.setPosition(getWidth()/2 + 2 , getHeight()/2 + 52);
    Square10.setColor(Color.blue);
    add(Square10);
    var answer1 = new Text("English");
    answer1.setPosition(191,205);
    answer1.setColor(Color.white);
    add(answer1);
    var answer2 = new Text("French");
    answer2.setPosition(191,245);
    answer2.setColor(Color.white);
    add(answer2);
    var answer3 = new Text("Italian");
    answer3.setPosition(191,285);
    answer3.setColor(Color.white);
    add(answer3);
    var answer4 = new Text("Spanish");
    answer4.setPosition(191,325);
    answer4.setColor(Color.white);
    add(answer4);
    var answer5 = new Text("Chinese");
    answer5.setPosition(309,205);
    answer5.setColor(Color.white);
    add(answer5);
    var answer6 = new Text("Arabic");
    answer6.setPosition(309,245);
    answer6.setColor(Color.white);
    add(answer6);
    var answer7 = new Text("python");
    answer7.setPosition(309,285);
    answer7.setColor(Color.white);
    add(answer7);
    var answer8 = new Text("Swedish");
    answer8.setPosition(309,325);
    answer8.setColor(Color.white);
    add(answer8);
    var Square11 = new Rectangle(110,30);
    Square11.setPosition(getWidth()/2 - 114, getHeight()/2 - 70);
    Square11.setColor(Color.blue);
    add(Square11);
    var Square12 = new Rectangle(110,30);
    Square12.setPosition(getWidth()/2 - 114, getHeight()/2 - 30);
    Square12.setColor(Color.blue);
    add(Square12);
    var Square13 = new Rectangle(110,30);
    Square13.setPosition(getWidth()/2 - 114, getHeight()/2 + 12);
    Square13.setColor(Color.blue);
    add(Square13);
    var Square14 = new Rectangle(110,30);
    Square14.setPosition(getWidth()/2 - 114, getHeight()/2 + 52);
    Square14.setColor(Color.blue);
    add(Square14);
    var Square15 = new Rectangle(110,30);
    Square15.setPosition(getWidth()/2 + 2 , getHeight()/2 - 70);
    Square15.setColor(Color.blue);
    add(Square15);
    var Square16 = new Rectangle(110,30);
    Square16.setPosition(getWidth()/2 + 2 , getHeight()/2 - 30);
    Square16.setColor(Color.blue);
    add(Square16);
    var Square17 = new Rectangle(110,30);
    Square17.setPosition(getWidth()/2 + 2 , getHeight()/2 + 12);
    Square17.setColor(Color.blue);
    add(Square17);
    var Square18 = new Rectangle(110,30);
    Square18.setPosition(getWidth()/2 + 2 , getHeight()/2 + 52);
    Square18.setColor(Color.blue);
    add(Square18);
    var ups = 0; 
    window.setTimeout(update, 1000);
    function update(){
        var question1 = readLine("Name a Language That You Often See on Restaurant Menus: ");
        if(question1 == an1){
            remove(Square11);
        }else if(question1 == an2){
            remove(Square12);
        }else if(question1 == an3){
            remove(Square13);
        }else if(question1 == an4){
            remove(Square14);
        }else if(question1 == an5){
            remove(Square15);
        }else if(question1 == an6){
            remove(Square16);
        }else if(question1 == an7){
            remove(Square17);
        }else if(question1 == an8){
            remove(Square18);
        }
        else{
            x++;
            println("wrong");
        }
        upRelay();
    function upRelay(){
        ups++;
        if(ups < 8 && x < 3){
            window.setTimeout(update, 1000);
        }
    }
}
}



    background();
    circle();
    square();
    square2();
    /*innerSquare();*/
    upperSquare();
    Question1();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
