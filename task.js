$(document).ready(function () {
  const [allAgents, selectedAgent, all] = Array([], [], "All");

  function agentProfile(data, category = null) {
    if (data !== null) {
      const {
        name,
        mail,
        image,
        mobile,
        office,
        title
      } = data;
      return `<div class="contact">
    <div class="avatar"> 
    <img src=${image} /></div>
    <div class="contact-details">
    <h2 class="name">${name}</h2>
    <p>${title}</p> 
    <a href="#">${mobile}</a> <a href="#">${office}</a> 
    <a href="#" class="mail">${mail}</a></div>
    </div>`;
    } 
  }

  $.getJSON("./data/data.json", function (data) {
    allAgents.push(...data);
    selectedAgent.push(...allAgents);
    filterNode();
    renderFragment(selectedAgent);
    searchQuery(allAgents);
  });

  function renderFragment(data, cat = null) {
    $(".contact-list").empty();
    if (data.length > 0) {
      $.each(data, function (_, agent) {
        $(".contact-list").append(agentProfile(agent));
      });
    } else $(".contact-list").append(agentProfile(null, cat));
  }

  function filterData(item) {
    let data = [];
    const viewAll = all.toLocaleLowerCase();
    if (item === viewAll) {
      data = allAgents;
    } else {
      data = allAgents.filter(({
        name
      }) => name.toLowerCase().at() === item);
    }
    selectedAgent.length = 0;
    selectedAgent.push(...data);
  }

  function filterNode() {
    let alphabet = [...Array(26).keys()].map((char) =>
      String.fromCharCode(char + 65)
    );
    alphabet.unshift(all);
    $.each(alphabet, function (_, alpha) {
      $(".agent").append(
        `<li class="agent-list"><a href="javascript:void(0)">${alpha}</a></li>`
      );
    });

    //Alphabet Click

    $(".agent-list").on("click", function (e) {
      const selected = $(e.currentTarget).text().toLowerCase();
      filterData(selected);
      renderFragment(selectedAgent, selected);
    });
  }

  //SEARCH BOX

  function searchQuery(data) {
    const agents = [...data];
    $(".myinput").on("keyup", function (e) {
      const query = $(e.currentTarget).val().toLowerCase();
      const size = query.length;
      if (size >= 0) {
        const search = agents.filter((it) =>
          it.name.toLowerCase().includes(query)
        );
        selectedAgent.length = 0;
        selectedAgent.push(...search);
      } else {
        selectedAgent.length = 0;
        selectedAgent.push(...data);
      }
      renderFragment(selectedAgent, query);
    });
  }
});