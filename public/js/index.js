// Create and populate a data table.
// var f1 = function (x) {
//     return Math.sin(x);
// }
//
// var f2 = function (x, y) {
//     return Math.sin(x) + Math.cos(y);
// }
//
// var f3 = function (x, y) {
//     return 1 / (x + y);
// }

console.log("good");


math.config({
    number: 'number' // Default type of number: 
        // 'number' (default), 'bignumber', or 'fraction'
});


function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}



var grapher = document.getElementById('visualization');
var equation = "x + y";
var maxSteps = 80;
var xStart = -20;
var xEnd = 20;
var yStart = -20;
var yEnd = 20;
var steps = 20;
var graphWidth = (window.innerWidth * 0.4).toString() + 'px';
var graphHeight = (window.innerHeight * 1).toString() + 'px';

function calc1Var(equation, x) {
    equation = replaceAll(equation, "x", x);
    var result = math.eval(equation);
    console.log(equation + " = " + result);
    return result;
}

function calc2Var(equation, x, y) {
    equation = replaceAll(equation, "x", x);
    equation = replaceAll(equation, "y", y);
    var result = math.eval(equation);
//    console.log(equation + " = " + result);
    return result;
}

function graph2D(equation, startX, endX) {
    //    var data = new vis.DataSet();
    //    var steps = 20; // number of datapoints will be steps*steps
    //    var axisMax = endX;
    //    var axisStep = axisMax / steps;
    //    var x;
    //    var y;
    //    for (x = 0; x < axisMax; x += axisStep) {
    //        y = calc1Var(equation, x);
    //        if (y != Infinity && y != undefined) {
    //            data.add({
    //                x: x,
    //                y: y,
    //            });
    //
    //        }
    //    }
    //
    //    var options = {
    //        start: startX,
    //        end: endX
    //    };
    //    var graph2d = new vis.Graph2d(grapher, data, options);
}

function graph3D(equation) {
    var data = new vis.DataSet();
    var counter = 0;
    var axisMaxX = xEnd;
    var axisStepX = (xEnd - xStart) / steps;
    var axisMaxY = yEnd;
    var axisStepY = (yEnd - yStart) / steps;
    var x;
    var y;
    var z;
    for (x = xStart; x < axisMaxX; x += axisStepX) {
        for (y = yStart; y < axisMaxY; y += axisStepY) {
            z = calc2Var(equation, x, y);
            if (z != Infinity && z != undefined) {
                data.add({
                    id: counter++,
                    x: x,
                    y: y,
                    z: z,
                    style: z
                });
            }
        }
    }

    // specify options
    var options = {
        width: graphWidth,
        height: graphHeight,
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
    };

    // Instantiate our graph object.
    var graph3d = new vis.Graph3d(grapher, data, options);
}

// Choose graph2D or graph3D based on the equation given
function chooseGraphDimension(equation) {
    if (equation.includes('x') && equation.includes('y')) {
        console.log("Received input for f(x,y)");
        graph3D(equation);
    } else if (equation.includes('x') && !equation.includes('y')) {
        console.log("Received input for f(x)");
        graph2D(equation, 0, 100);
    }
}



function init() {
    $('#inputEquation3D').val(equation);
    $('#xStart').val(xStart);
    $('#xEnd').val(xEnd);
    $('#yStart').val(yStart);
    $('#yEnd').val(yEnd);
    $('#steps').val(steps);
}

// Press Calculate button  or Enter to get text value
$(document).ready(function () {
    init();

    // Detect Input for 3D graph input field
    $('#calculate3D').click(function () {
        graphButtonOnClick();
    });

    $('#inputEquation3D').bind("enterKey", function (e) {
        graphButtonOnClick();

    });

    $('#inputEquation3D').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });


    // Detect Input for 3D graph input field
    $('#calculate2D').click(function () {
        graphButtonOnClick();

    });

    $('#inputEquation2D').bind("enterKey", function (e) {
        graphButtonOnClick();

    });

    $('#inputEquation2D').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });



    $(window).resize(function () {
        resize();
    });
});


function graphButtonOnClick() {
    equation = $('#inputEquation3D').val();
    xStart = math.eval($('#xStart').val());
    xEnd = math.eval($('#xEnd').val());
    yStart = math.eval($('#yStart').val());
    yEnd = math.eval($('#yEnd').val());
    steps = math.eval($('#steps').val());
    if (steps > maxSteps) {
        steps = maxSteps; 
        $('#steps').val(maxSteps);
    }
    chooseGraphDimension(equation);
    $('#example').fadeOut('fast', function () {
        $(this).remove();
    });

}


function resize() {
    console.log("resized");
    graphWidth = (window.innerWidth * 0.4).toString() + 'px';
    graphHeight = (window.innerHeight * 1).toString() + 'px';
    chooseGraphDimension(equation);
}
resize();