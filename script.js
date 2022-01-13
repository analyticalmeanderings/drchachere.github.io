
async function getJSON(filename) {
  const response = await fetch(filename)
  return response.json()
}

google.charts.load('current', {
  'packages': ['bar']
});
google.charts.setOnLoadCallback(loadAndDrawChart);

function loadAndDrawChart() {
  getJSON("./inspection_yearly.json")
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

  var dasdasdaata = google.visualization.arrayToDataTable([
    ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
     'Western', 'Literature', { role: 'annotation' } ],
    ['2010', 10, 24, 20, 32, 18, 5, ''],
    ['2020', 16, 22, 23, 30, 16, 9, ''],
    ['2030', 28, 19, 29, 30, 12, 13, '']
  ]);

  var options = {
    width: 600,
    height: 400,
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '75%' },
    isStacked: true
  };
  var chart = new google.charts.Bar(document.getElementById('inspections'));

  chart.draw(data, options);
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