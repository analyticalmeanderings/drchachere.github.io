// TODO: filter module, get filtered data() uses a module that uses filtered set ... applies current filters return filtered
// TODO: addEventListener

const dataRegistry = (function () {
  async function public_private() {
    try {
      const response = await fetch("PROP_risk.json");
      if (response.ok) {
        return 0;
      } else {
        return 1;
      }
    } catch {
      return 1;
    }
  }

  const dataRegistryUniverse = {
    risk: ["./PROP_risk.json", "./risk.json"],
    locations: ["./PROP_locations.json", "./locations.json"],
    products: ["./PROP_products.json", "./products.json"],
    scenario: ["./PROP_scenario.json", "./scenario.json"],
  };

  async function getDataRegistry() {
    const isPublicPrivate = await public_private();
    const realDataRegistry = {};

    for (const key in dataRegistryUniverse){
      realDataRegistry[key] = await fetch(dataRegistryUniverse[key][isPublicPrivate]);
    }

// refactor

    return realDataRegistry;
  }

  return getDataRegistry();
})();


(function () {
  window.onload = function () {
    dataRegistry.then((data_registry) => {
      for (const [key, value] of Object.entries(data_registry)) {
        build_table(value, key);
      }
    });

    // build_alerts();
    // TODO: build_map() modeled after https://www.kenan-flagler.unc.edu/programs/undergraduate-business/global-programs/
  };
  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  // TODO: rename myFunction to something meaningful
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // TODO: rename Function to something meaningful
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  // TODO: add functionality to sort table
  function filterTable(table_name, local_input) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(local_input);
    filter = input.value.toUpperCase();
    table = document.getElementById(table_name);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }



  function build_table(input_location, id_target) {
    // Builds all the tables, including scenario analysis

    // fetch(input_location)
    //   .then((response) => response.json())
    //   .then((data) => {
        cols = Object.keys(data[0]);

        var table = "<table><tr>";

        for (var i = 0; i < cols.length; i++) {
          if (!(cols[i].startsWith("lat") || cols[i].startsWith("long"))) {
            table += "<th>" + cols[i] + "</th>";
          }
        }
        for (var i = 0; i < data.length; i++) {
          table += "<tr>";

          for (var j = 0; j < cols.length; j++) {
            if (!(cols[j].startsWith("lat") || cols[j].startsWith("long"))) {
              table += "<td>" + data[i][cols[j]] + "</td>";
            }
          }
          table += "</tr>";
        }
        table += "</table>";

        var divContainer = document.getElementById(id_target);
        divContainer.innerHTML = table;

        if (id_target === "risk") {
          data = data.sort(function (a, b) {
            return a.Base - b.Base;
          });

          var table = "<table><tr><th>Top 10 At Risk Drug Products</th></tr>";

          for (var i = 0; i < 10; i++) {
            table += "<tr><td>" + data[i].Drug + "</td></tr>";
          }
          table += "</table>";

          var divContainer = document.getElementById("top10_list");
          divContainer.innerHTML = table;
        }
      };


  function sortTable(n, id_target) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;

    table = id_target;

    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          // if number ==
          //   then run
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function build_alerts() {
    // TODO: create a backend that caches alerts

    // TODO: leverage secrets
    var url =
      "http://api.mediastack.com/v1/news?access_key=89dcc6770900488a730bb00004d7596d&keywords=pharmaceutical&sources=-americanbankingnews";
    // var url = 'http://api.mediastack.com/v1/news?access_key=${{secret.API_MEDIASTACK}}&keywords=pharmaceutical&sources=-americanbankingnews';

    var req = new Request(url);

    fetch(req)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var article_data = data["data"];
        var article_titles = "<p>";
        for (let article = 0; article < 10; article++) {
          article_titles += article_data[article]["title"];
          article_titles += "         ";
        }
        article_titles += "</p>";
        document.getElementById("alert_content").innerHTML += article_titles;
      })
      .catch((err) => {
        console.error(err);
      });

    // fetch("https://api.newscatcherapi.com/v2/search", {
    //   "method": "GET",
    //   params: {q: 'pharmaceutical', lang: 'en', sort_by: 'date', page: '1'},
    //   "headers": {'x-api-key': 'lmuF_8rsnpOUx-jiITFC3jWBhmhXlSPtx4I4VbH_3bc'}
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(err => {
    //   console.error(err);
    // });
  }
})();


function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}



