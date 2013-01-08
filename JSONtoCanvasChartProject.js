/* Simple tool to convert JSON expressions in Charts built with HTML5 canvas */


var JSONtoCanvasChart = function (widthCanvas, heightCanvas) {


    /* Definition of the properties */
    var canvas,
        context,
        dataCollection,
        widthChart = widthCanvas,
        heightChart = heightCanvas,
        widthGrid,
        heightGrid;


    function load() {
        /* Pseudo-contructor method.
        defines the size of the chart/canvas, variable context and 
        background color on our chart. */
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', widthChart);
        canvas.setAttribute('height', heightChart);
        context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, widthChart, heightChart);
    }


    /* Pseudo-contructor method call */
    load();


    function setGrid() {
        /* Method that defines the properties of internal grid on our chart. */
        var marginSize;
        if (widthChart < heightChart) {
            marginSize = Math.round(widthChart - (widthChart * 0.95));
        } else {
            marginSize = Math.round(heightChart - (heightChart * 0.95));
        }
        console.log(marginSize);
        widthGrid = widthChart - Math.round(marginSize * 2);
        heightGrid = heightChart - Math.round(marginSize * 2);
        context.fillStyle = '#999';
        context.fillRect(marginSize, marginSize, widthGrid, heightGrid);
    }


    return {


        Chart: {


            show: function (idContainer) {
                /*  */
                document.getElementById(idContainer).appendChild(canvas);
                setGrid();
            }


        },


        Legend: {


            show: function () {
                /*  */
                return;
            }


        },


        setColecaoDados: function (jsonDataCollection) {
            /*  */
            return;
        }
        

    };

};