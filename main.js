(function () {
    $(function () {
        // define the area which I put the cards in
        let cardsArea = $(".cardsArea");

        // define the URL of the entire list button
        const URLentireList = "https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag";

        let showAllCountriesBTN = $("#showAllCountriesBTN");

        //I define the input field here for various use - see line 17
        let countryNameInput = $("#countryName");

        showAllCountriesBTN.click(function () {
            showAllCountriesBTN.val("YAY!");

            // INIT input field - if the user entered a value and clicked travel anywhere BTN
            //that is why line 11 exists
            countryNameInput.val("");

            getCountriesFromModel(URLentireList);
        })



        let searchCountryBTN = $("#searchCountryBTN");
        
        searchCountryBTN.click(function () {
            // I INIT free traveling BTN, if the user tried to enter a value after free traveling
            showAllCountriesBTN.val("Take me anywhere!");
            showAllCountriesBTN.attr("id", "showAllCountriesBTN");

            //define the input value, ONLY WHEN USER CLICKS
            let countryNameValue = countryNameInput.val();

            // INIT input field - in failure and success too
            // because I want the user to search again or travel anywhere
            // and forget about an unknown destination
            countryNameInput.val("");
            
            // define the URL of the search by name
            const URLlistByName = "https://restcountries.eu/rest/v2/name/" + countryNameValue + "?fields=name;topLevelDomain;capital;currencies;flag";

            getCountriesFromModel(URLlistByName);
        });

        // FUNCTIONS
        function getCountriesFromModel(URL){
            // I INIT the cards area in case of previous use
            initCardsArea();

            $.get(URL).then(
                function(countries){
                    showCardsOnUI(countries);
            })
            .catch(function (error){
                alert("Looks like you're looking for Lala-Land...We can't help!\nPlease try again or let us take you anywhere...");
                showAllCountriesBTN.attr("id", "callForActionBTN");
                console.log(error);
            });
        }

        function showCardsOnUI(countries){
                for(let country of countries){
                let cardBox = $("<div>");
                cardBox.addClass("card");
                cardsArea.append(cardBox);

                let flagImg = $("<img>");
                flagImg.addClass("card-img-top");
                flagImg.attr("src", country.flag);
                cardBox.append(flagImg);

                let cardBody = $("<div>");
                cardBody.addClass("card-body");
                cardBox.append(cardBody);

                let countryName = $("<h3>");
                countryName.addClass("card-title bold");
                countryName.html(country.name);
                cardBody.append(countryName);

                let countryCapital = $("<p>");
                countryCapital.addClass("card-text");
                countryCapital.html("<b>Capital: </b>" + country.capital);
                cardBody.append(countryCapital);

                let detailedList = $("<ul>");
                detailedList.addClass("list-group list-group-flush");
                cardBox.append(detailedList);

                let domainDetails = $("<li>");
                domainDetails.addClass("list-group-item");
                domainDetails.html("<b>Domain: </b>" + country.topLevelDomain);
                detailedList.append(domainDetails);

                let currencyDetails = $("<div>");
                currencyDetails.addClass("list-group list-group-flush overflow");
                cardBox.append(currencyDetails);

                //** sorry for the balagan, I was too tired and hungry. don't להוריד ניקוד !!!!! **
                for (let index = 0; index < country.currencies.length; index++) {
                    //I define the values here for better readability
                    let currencyCode = JSON.stringify(country.currencies[index].code);
                    let currencyName = JSON.stringify(country.currencies[index].name);
                    let currencySymbol = JSON.stringify(country.currencies[index].symbol);

                    currencyCode = checkIfAllCurrencyDetailIsAvailable(currencyCode);
                    currencyName = checkIfAllCurrencyDetailIsAvailable(currencyName);
                    currencySymbol = checkIfAllCurrencyDetailIsAvailable(currencySymbol);


                    let currencyDetailesForDisplay = "<b>Code: </b>" + currencyCode + "<br>" +
                                                    "<b>Name: </b>" + currencyName + "<br>" +
                                                    "<b>Symbol: </b>" + currencySymbol;
                    
                let currency = $("<li>");
                currency.addClass("list-group-item");
                currency.html("<b>Currency:</b><br>" + currencyDetailesForDisplay);
                currencyDetails.append(currency);
                }
            }
        }

        //validation
        function checkIfAllCurrencyDetailIsAvailable(currencyDetail){
            //i checked, and there is only UNDEFINED situation in the resource (no nulls, no NaNs...)
                if (currencyDetail == undefined){
                    currencyDetail = "no information";
                    return currencyDetail;
                }
                return currencyDetail;
            }

        // INIT the cards area
        let initCardsArea = () => cardsArea.empty();
    });
})();