var plot;

/* JAVASCRIPT CODE GOES HERE */
Plotly.d3.csv('./kitti/kitti.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var data = [{
        x: unpack(rows, 'x'),
        y: unpack(rows, 'y'),
        z: unpack(rows, 'z'),
        mode: 'markers',
        type: 'scatter3d',
        marker: {
            color: 'rgb(23, 190, 207)',
            size: 2
        }}];
    var layout = {
        autosize: true,
        height: 400,
        width:835,
        scene: {
            aspectratio: {
                x: 1,
                y: 1,
                z: 1
            },
            camera: {
                center: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                eye: {
                    x: 1.25,
                    y: 1.25,
                    z: 1.25
                },
                up: {
                    x: 0,
                    y: 0,
                    z: 1
                }
            },
            xaxis: {
                type: 'linear',
                zeroline: false
            },
            yaxis: {
                type: 'linear',
                zeroline: false
            },
            zaxis: {
                type: 'linear',
                zeroline: false
            }
        }
    };

   plot = Plotly.newPlot('myDiv', data, layout).then(heightHandler);


});

function heightHandler() {
    $('.sidebar').css('height', $(document).height());
}

//var myPlot = document.getElementById('myDiv');
// plot.on('plotly_afterplot', function(){
//     $('.sidebar').css('height', $(document).height());
// });