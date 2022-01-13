
async function getJSON(filename) {
  const response = await fetch(filename)
  return response.json()
}

google.charts.load('current', {
  'packages': ['corechart']
});
google.charts.setOnLoadCallback(loadAndDrawChart);

function loadAndDrawChart() {
  getJSON("./out_inspection_yearly.json")
  .then(drawChart)
}

function drawChart(rawData) {
  var data = google.visualization.arrayToDataTable([
    ['Inspection Classification', 'OAI', 'VAI', 'NAI', { role: 'annotation' } ],
    ...rawData.map(
      ({year, NAI, OAI, VAI, oai_ratio}) => {
        return [year, OAI, VAI, NAI, '']
      }
    )
  ]);

  var options = {
    width: 600,
    height: 400,
    // legend: { position: 'top', maxLines: 3 },
    // bar: { groupWidth: '75%' },
    isStacked: true,
    hAxis: { 
      format:'',
      showTextEvery: 1,
      slantedText: true,
      slantedTextAngle: 9,
    },
  };
  var view = new google.visualization.DataView(data);
  var chart = new google.visualization.ColumnChart(document.getElementById('inspections'));

  chart.draw(view, options);
}


// // import data from "../data/a.json" assert { type: "json" };

// // window.onload = function() {
 

// //   let text = "<table>";
// //   // console.log(data.length);
// //   // console.log(Object.keys(data[0]).length);
// //   for (const [i, value] of data.entries()) {

// //     text+="<tr>"

// //     for (const col of (Object.keys(value))) {

// //       if (i===0) {
// //         console.log(col);
// //         text+="<th>"+col+"</th>"

// //       }
// //     }
// //     text+="</tr>"

// // }

// //   text += "</table>";
// //   document.getElementById("shortage_model").innerHTML = text;
// //   console.log(text)

// // }