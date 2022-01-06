import data from "../data/a.json" assert { type: "json" };

window.onload = function() {
 

  let text = "<table>";
  // console.log(data.length);
  // console.log(Object.keys(data[0]).length);
  for (const [i, value] of data.entries()) {

    text+="<tr>"

    for (const col of (Object.keys(value))) {

      if (i===0) {
        console.log(col);
        text+="<th>"+col+"</th>"

      }
    }
    text+="</tr>"

}

  text += "</table>";
  document.getElementById("shortage_model").innerHTML = text;
  console.log(text)

}