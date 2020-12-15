const defaultCountry = "";
getListCountry();
getWorldData();
//searchBar();

function searchBar(){
  const sc = document.getElementById("select-country");
  sc.addEventListener("keyup", function(event){
    if(event.key == 13){
      let sValue = document.getElementById("select-country").value;
      console.log(sValue);
      getLocalData(sValue);
    }
  });  
}

function getListCountry(){
  const listCountries = new XMLHttpRequest();
  listCountries.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      const cList = JSON.parse(this.responseText);
      const listContainer = document.getElementById('country-list');
      cList.forEach(element => {
        if(element.country != "Total:"){
          let listValue = document.createElement('option');
          listValue.value = element.country;
          //console.log(listValue);
          listContainer.appendChild(listValue);  
        }
      });
    }
  }
  listCountries.open("GET", "https://coronavirus-19-api.herokuapp.com/countries", true);
  listCountries.send();  
}

function getWorldData(){
  const worldData = new XMLHttpRequest();
  worldData.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const wData = JSON.parse(this.responseText);
      document.getElementById("tcases").innerHTML = wData.cases;
      document.getElementById("tdeaths").innerHTML = wData.deaths;
      document.getElementById("trecovered").innerHTML = wData.recovered;
    }
  };
  worldData.open("GET", "https://coronavirus-19-api.herokuapp.com/all", true);
  worldData.send();  
}

function getLocalData(input){
  const localData = new XMLHttpRequest();
  localData.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
          const lData = JSON.parse(this.responseText);
          //document.getElementById("country").innerHTML = lData.country;
          document.getElementById("lcases").innerHTML = lData.cases;
          document.getElementById("ncases").innerHTML = "+" + lData.todayCases;
          document.getElementById("ldeaths").innerHTML = lData.deaths;
          document.getElementById("lrecovered").innerHTML = lData.recovered;
      }
  };
  localData.open("GET", "https://coronavirus-19-api.herokuapp.com/countries/" + input, true);
  localData.send();
}