function getDataFromAPI(event, id) {
  const superHero_Url = `https://www.superheroapi.com/api.php/{userToken here}/${id}`;
  event.preventDefault();
  const displayImage = document.getElementById("image")
  const promise = fetch(superHero_Url);

  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      console.log("Response after .json()", processedResponse);

      //display Image
      displayImage.src = processedResponse.image.url;

      //setBiography
      setBioGraphyOnPage(processedResponse.biography)

      //setPowerstats
      setPowerstatsOnPage(processedResponse.powerstats)

      //setConnectionData
      setConnectionOnPage(processedResponse.connections)

      //setAppearance
      setAppearanceOnPage(processedResponse.appearance)

      document.getElementById("occupation").innerHTML =
        processedResponse.work.occupation;
      document.getElementById("base").innerHTML = processedResponse.work.base;
    })
    .catch(function (err) {
      console.log("error occured", err);
    });

  function setBioGraphyOnPage(biographyData) {
    document.getElementById("full_name").innerHTML =
      biographyData["full-name"];
    document.getElementById("alter_egos").innerHTML =
      biographyData["alter-egos"];
    document.getElementById(
      "aliases"
    ).innerHTML = biographyData.aliases.join(",");
    document.getElementById("birth_place").innerHTML =
      biographyData["place-of-birth"];
    document.getElementById("appearance").innerHTML =
      biographyData["first-appearance"];
    document.getElementById("publisher").innerHTML =
      biographyData["publisher"];
    document.getElementById("alignment").innerHTML =
      biographyData["alignment"];
  }

  function setPowerstatsOnPage(powerStartsData) {
    document.getElementById("strength").innerHTML =
      powerStartsData.strength;
    document.getElementById("intelligence").innerHTML =
      powerStartsData.intelligence;
    document.getElementById("speed").innerHTML =
      powerStartsData.speed;
    document.getElementById("durability").innerHTML =
      powerStartsData.durability;
    document.getElementById("power").innerHTML =
      powerStartsData.power;
    document.getElementById("combat").innerHTML =
      powerStartsData.combat;
  }

  function setConnectionOnPage(connectionData) {
    document.getElementById("relatives").innerHTML =
      connectionData.relatives;
    document.getElementById("affiliation").innerHTML =
      connectionData["group-affiliation"];
  }

  function setAppearanceOnPage(appearanceData) {
    document.getElementById("gender").innerHTML =
      appearanceData.gender;
    document.getElementById("race").innerHTML =
      appearanceData.race;
    document.getElementById(
      "height"
    ).innerHTML = appearanceData.height.join("  |  ");
    document.getElementById(
      "weight"
    ).innerHTML = appearanceData.weight.join("  |  ");
    document.getElementById("eye_color").innerHTML =
      appearanceData["eye-color"];
    document.getElementById("hair_color").innerHTML =
      appearanceData["hair-color"];
  }

  //tween animation on image
  popmotion
    .tween({
      from: {
        scale: 0.2,
        opacity: 0.2,
      },
      to: {
        scale: 1,
        opacity: 1,
      },
      duration: 1000,
    })
    .start(popmotion.styler(displayImage).set);
}

//this call when dom is loaded first time
window.onload = function () {
  document.getElementById("38").focus();
  getDataFromAPI(event, "38");
};
