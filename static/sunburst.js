
    anychart.onDocumentReady(function(){
      var data = [
        {
          name: "Healthcare and Medical",
          children: [
            { name: "Nurse", link: "nurse.html" },
            { name: "Physician", link: "physician.html" },
            { name: "Pharmacist", link: "pharmacist.html" },
            { name: "Pediatric Nurse", link: "pediatric-nurse.html" },
            { name: "Dental Hygienist", link: "dental-hygienist.html" },
            { name: "Radiologic Technologist", link: "radiologic-technologist.html" },
            { name: "Chiropractor", link: "chiropractor.html" },
            { name: "Pediatrician", link: "pediatrician.html" },
            { name: "Speech Therapist", link: "speech-therapist.html" },
            { name: "Occupational Therapist", link: "occupational-therapist.html" },
            { name: "Rehabilitation Counselor", link: "rehabilitation-counselor.html" },
            { name: "Physical Therapist", link: "physical-therapist.html" }
          ]
        }
      ];

      var chart = anychart.sunburst(data, "as-tree");
      
      chart.background().enabled(true).fill("rgba(0, 0, 0, 0)");
      chart.container("sun_burst");

      chart.listen("pointClick", function(e) {
        if (e.point.get("link")) {
          window.location.href = e.point.get("link");
        }
      });

      chart.draw();
    });
