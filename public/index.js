const getHedgehogs = () => {
  $('#hedgehog-info').html('');
// this is a get request for all the invited hedgehogs
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
  //this turns the response into json if it was successful and returns another promise
    .then(response => response.json())
    //if that was successful then hedgehogs are appended from the body of the response
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    // if the request above was not successful, this catch block will run and the error will be shown in the console
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

$(document).ready(function() {

})

const addNewHedgehog = (event) => {
  event.preventDefault();
  var nameHedgie = $("#name").val();
  var hogletsHedgie = $("#hoglets").val();
  var allergiesHedgie = $("#allergies").val();
  fetch("https://hedgehog-party.herokuapp.com/api/v1/invites", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify ({
      name: nameHedgie,
      hoglets: hogletsHedgie,
      allergies: allergiesHedgie
    })
  }).then(response => response.json())
  .catch(error => console.error({ error}))
};

const unInviteHedgehog = (event) => {
  event.preventDefault();
  var id = event.target.id
  fetch('https://hedgehog-party.herokuapp.com/api/v1/invites/' + id, {
    method: 'DELETE'
  }).then(response => console.log("DESTROYED"))
  .catch(error => console.error({ error }))
};

getHedgehogs();

$('#invite-btn').on('click', addNewHedgehog);

$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites
