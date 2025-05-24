
function getOrGenerateXID() {
  if (localStorage.polisUserXID) {
    console.log("Existing polisUserXID found:", localStorage.polisUserXID)
  } else {
    let userXID = uuidv4()
    console.log("Assigning new polisUserXID:", userXID)
    localStorage.polisUserXID = userXID
  }
  return localStorage.polisUserXID;
}

function uuidv4() {
  // It depends on the crypto API, which is supported by 97.4% of browsers
  if (window.crypto) {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  // fallback which uses timestamp and ms since browser opened to come up with a uuid
  } else {
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0){//Use timestamp until depleted
        r = (d + r)%16 | 0;
        d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r)%16 | 0;
        d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}

function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function embedPolisConversation(polisContainerAttributes) {
  const polisContainer = document.getElementById("polis-container")
  
  const polisConversation = document.createElement("div");
  setAttributes(polisConversation, polisContainerAttributes)
  polisContainer.appendChild(polisConversation)
  
  const embedScript = document.createElement("script");
  embedScript.setAttribute("src", "https://pol.is/embed.js")
  polisContainer.appendChild(embedScript)
}

const polisContainerAttributes = {
  'class': 'polis',
  'data-ucst': 'false',   // user can see title
  'data-ucsd': 'false',   // user can see description
  'data-ucsf': 'false',   // user can see footer
  'data-ucw': 'true',    // user can write
  'data-ucv': 'true',     // user can vote
  'data-conversation_id': '8bxccbnjbs',
  'data-xid': getOrGenerateXID(),
}
const bikelanesContainerAttributes = {
  'class': 'polis',
  'data-ucst': 'false',   // user can see title
  'data-ucsd': 'false',   // user can see description
  'data-ucsf': 'false',   // user can see footer
  'data-ucw': 'true',    // user can write
  'data-ucv': 'true',     // user can vote
  'data-conversation_id': '7btrabcujr',
  'data-xid': getOrGenerateXID(),
}

const titleElement = document.querySelector("title");
const text = titleElement ? titleElement.textContent : '';

if(text === "Housing Rights Hub - Public Square TO"){
  embedPolisConversation(polisContainerAttributes);
} else if (text === "Bike Lanes in Toronto - Public Square TO"){
  embedPolisConversation(bikelanesContainerAttributes);
} else {
  console.error("No conversation found.");
  document.getElementById("polis-container").innerHTML = "<p style='color:red'>Error:"
    + " No Conversation Found</p>";
}