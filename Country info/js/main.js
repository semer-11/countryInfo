var sampleEle = document.getElementById("cname");

sampleEle.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector("#search").click();
    }
});


function trigger() {

    var val = document.getElementById("cname").value;
    if (val == "") {
        document.getElementById("empty").style.display = "block";
        document.getElementById("container").style.display = "none";
        document.getElementById("intro").style.display = "block";
        document.getElementById("error").style.display = "none";
    } else if (val.toLowerCase() == "israel") {

        document.getElementById("error").style.display = "block";
        document.getElementById("empty").style.display = "none";
        document.getElementById("container").style.display = "none";
        document.getElementById("intro").style.display = "none";

        document.getElementById("errormessage").innerHTML = "There is No Country With the name Israel Search with <b> Palestine</b> instead";


    } else {
        document.getElementById("empty").style.display = "none";
        var url = "https://restcountries.com/v3.1/name/" + val + "?fullText=true";

        search(url);
    }
}

function search(url) {




    axios.get(url)
        .then(function(response) {
            document.getElementById("container").style.display = "block";
            document.getElementById("intro").style.display = "none";
            document.getElementById("error").style.display = "none";
            document.getElementById("flag").src = response.data[0].flags.png;
            document.getElementById("name").innerHTML = response.data[0].name.official;
            document.getElementById("continent").innerHTML = response.data[0].continents;
            document.getElementById("sub").innerHTML = response.data[0].subregion;
            document.getElementById("capital").innerHTML = response.data[0].capital;
            document.getElementById("area").innerHTML = response.data[0].area;

            document.getElementById("timeZone").innerHTML = response.data[0].timezones;
            document.getElementById("population").innerHTML = response.data[0].population;



        })
        .catch((error) => {
                document.getElementById("cname").value = "";
                document.getElementById("intro").style.display = "none";
                document.getElementById("container").style.display = "none";
                if (error.response.status == 404) {

                    document.getElementById("error").style.display = "block";
                    document.getElementById("errormessage").innerHTML = "Could not Found the country  Make sure there is no typing error";

                } else {

                    document.getElementById("error").style.display = "block";
                    document.getElementById("errormessage").innerHTML = "Unknown Error!";

                }
            }

        )

}