function printpdf() {
    var content = document.getElementById("resume");
  
    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.classList.add("none");
    });
    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.classList.add("none");
    })
  
  allButtons.forEach(button => {
      button.classList.remove("none");
  })
  allInputCheckboxes.forEach(input => {
      input.classList.remove("none");
  })
  
    html2pdf(content, {
        html2canvas: { scale: 1, logging: true, dpi: 500 }
    });
  }
  
  function addedu() {
    const head = document.createElement('div');
    document.getElementById("education").appendChild(head);
    head.innerHTML = ('<div class="edublock"><span><i class="fas fa-chevron-circle-right"></i></span><span class="education-head titles-head" contenteditable="true"> Your Degree</span><div><span contenteditable="true" class="titles-desc">Institute name</span> - <span contenteditable="true" class="titles-desc">Passing Year</span></div></div>');
    saveresume();
  }
  function remedu() {
    var educationBlocks = document.querySelectorAll('.edublock');
    if (educationBlocks.length > 1) {
        var lastEducationBlock = educationBlocks[educationBlocks.length - 1];
        lastEducationBlock.remove();
    } else {
        console.log("You cannot remove the last education entry.");
    }
    saveresume();
  }
  
  
  function addskill() {
    const head = document.createElement('div');
    document.getElementById("skills").appendChild(head);
    head.innerHTML = ('<div class="skill"><span><i class="fas fa-chevron-circle-right"></i></span> <span contenteditable="true"> Skill </span></div>');
    saveresume();
  }
  function remskill() {
    var skills = document.querySelectorAll('.skill');
    if (skills.length > 1) {
        var lastSkill = skills[skills.length - 1];
        lastSkill.remove();
    } else {
        console.log("You cannot remove the last skill entry.");
    }
    saveresume();
}

  function addLang() {
    const head = document.createElement('div');
    document.getElementById("languages").appendChild(head);
    head.innerHTML = ('<div class="language"><span><i class="fas fa-chevron-circle-right"></i></span><span contenteditable="true"> Language Name</span><span contenteditable="true"></span></div>');
    saveresume();
  }
  function remLang() {
    var languages = document.querySelectorAll('.language');
    if (languages.length > 1) {
    var lastLanguage = languages[languages.length - 1];
    lastLanguage.remove();
} else {
    console.log("You cannot remove the last language entry.");
}
    saveresume();
  }
  
  
  function addAch() {
    const head = document.createElement('div');
    document.getElementById("achievement").appendChild(head);
    head.innerHTML = ('<div class="achieve" ><span><i class="fas fa-chevron-circle-right"></i></span><span contenteditable="true"> Achievement</span></div>');
    saveresume();
  }
  function remAch() {
    var achievements = document.querySelectorAll('.achieve');
    if (achievements.length > 1) {
        var lastAchievement = achievements[achievements.length - 1];
        lastAchievement.remove();
    } else {
        console.log("You cannot remove the last achievement entry.");
    }
    saveresume();
  }
  
  
  function addInt() {
    const head = document.createElement('div');
    document.getElementById("interest").appendChild(head);
    head.innerHTML = ('<div class="interest"><span><i class="fas fa-chevron-circle-right"></i></span><span contenteditable="true"> Interest</span></div>');
    saveresume();
  }
  function remInt() {
    var interests = document.querySelectorAll('.interest');
    if (interests.length > 1) {
        var lastInterest = interests[interests.length - 1];
        lastInterest.remove();
    } else {
        console.log("You cannot remove the last interest entry.");
    }
    saveresume();
  }
  
  function addexp() {
    const head = document.createElement('div');
    document.getElementById("exp").appendChild(head);
    head.innerHTML = ('<div class="expblock"><span><i class="fas fa-chevron-circle-right"></i></span><span class="exp-head titles-head" contenteditable="true"> Company Name</span> </span><div><span contenteditable="true" class="titles-desc">Description</span></div></div>');
    saveresume();
  }

  function remexp() {
    var experienceBlocks = document.querySelectorAll('.expblock');
    if (experienceBlocks.length > 1) {
        var lastExperienceBlock = experienceBlocks[experienceBlocks.length - 1];
        lastExperienceBlock.remove();
    } else {
        console.log("You cannot remove the last experience entry.");
    }
    saveresume();
}

  function addpro() {
    const head = document.createElement('div');
    document.getElementById("project").appendChild(head);
    head.innerHTML = ('<div class="problock"><span><i class="fas fa-chevron-circle-right"></i></span><span class="project-head titles-head" contenteditable="true">Project Name</span><div><span contenteditable="true" class="titles-desc">Description</span></div></div>');
    saveresume();
  }
  function rempro() {
    var projectBlocks = document.querySelectorAll('.problock');
    if (projectBlocks.length > 1) {
        var lastProjectBlock = projectBlocks[projectBlocks.length - 1];
        lastProjectBlock.remove();
    } else {
        console.log("You cannot remove the last project entry.");
    }
}

  function saveresume() {
    var sec = document.getElementById("print");
    value1 = sec.innerHTML;
    var info = document.getElementById("custinfo");
    info.value = value1;
  }