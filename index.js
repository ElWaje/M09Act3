$(document).ready(function () {
    // Punto 1.1
    $("#setGreenColor").on("mouseover", function () {
        $("#divTarget").toggleClass("green black");
    });

    // Punto 1.2
    $("#setRedColor").on("dblclick", function () {
        $(this).toggleClass("red lightgray");
    });

    // Extra 1
    $("#setYellowColor").on("dblclick", function () {
        $("#divTarget").toggleClass("yellow background-gray");
    });

    // Punto 1.3
    $("#toggleVisible").on("mouseleave", function () {
        $("#divTarget").toggle();
    });

    // Punto 1.4    
      function updateDivTargetPosition() {
        const divTarget = document.getElementById("divTarget");
        divTarget.style.left = "30px";
      }
      
      function updateHandPositions() {
        const divTarget = document.getElementById("divTarget");
        const leftHand = document.getElementById("leftHand");
        const rightHand = document.getElementById("rightHand");
      
        leftHand.style.display = "none";
        rightHand.style.display = "none";
      
        const targetLeft = parseFloat(divTarget.style.left);
        if (targetLeft <= 30) {
          leftHand.style.display = "block";
          leftHand.style.left = "0px";
        } else if (targetLeft >= window.innerWidth - divTarget.offsetWidth - rightHand.offsetWidth - 30) {
          rightHand.style.display = "block";
          rightHand.style.left = window.innerWidth - rightHand.offsetWidth + "px";
        }
      }
      
      window.addEventListener("resize", () => {
        updateDivTargetPosition();
        updateHandPositions();
      });
      
      updateDivTargetPosition();
      updateHandPositions();
      
      let direction = "right";
      let moving = false;
      let moveInterval;
      
      function moveDivTarget() {
        const divTarget = document.getElementById("divTarget");
        const leftHand = document.getElementById("leftHand");
        const rightHand = document.getElementById("rightHand");
      
        const currentLeft = parseFloat(divTarget.style.left);
      
        if (direction === "right") {
          divTarget.style.left = (currentLeft + 5) + "px";
          if (currentLeft >= window.innerWidth - divTarget.offsetWidth - 30) {
            direction = "left";
            rightHand.style.display = "none";
            if (currentLeft < window.innerWidth - divTarget.offsetWidth - leftHand.offsetWidth - 30) {
              leftHand.style.display = "block";
              leftHand.style.left = (currentLeft - leftHand.offsetWidth) + "px";
            }
          } else {
            updateHandPositions();
          }
        } else {
          divTarget.style.left = (currentLeft - 5) + "px";
          if (currentLeft <= 30) {
            direction = "right";
            leftHand.style.display = "none";
            if (currentLeft > leftHand.offsetWidth + 30) {
              rightHand.style.display = "block";
              rightHand.style.left = (currentLeft + divTarget.offsetWidth) + "px";
            }
          } else {
            updateHandPositions();
          }
        }
      }
      
      function startMovement() {
        moving = true;
        moveInterval = setInterval(moveDivTarget, 50);
      }
      
      function stopMovement() {
        clearInterval(moveInterval);
        moving = false;
        updateHandPositions();
      }
      
      function toggleMovement() {
        if (moving) {
          stopMovement();
        } else {
          direction = direction === "right" ? "left" : "right";
          startMovement();
        }
      }
      
      // Evento click para iniciar o detener el movimiento del divTarget
      const movContinuo = document.getElementById("movContinuo");
      movContinuo.addEventListener("click", toggleMovement);
      
      document.addEventListener("DOMContentLoaded", () => {
        updateDivTargetPosition();
        updateHandPositions();
      });

    // Extra 2
    $("#animacion").on("click", function () {
        $("#divTarget").toggleClass("rotate-animation");
    });
    // Punto 2.1
    $("#addDiv").on("click", function () {
        var text = $("#text").val();
        var newDiv = $("<div>").addClass("addDiv").text(text);
        $("#domNodes").append(newDiv);
    });

    // Extra 3
    $("#delText").on("dblclick", function () {
        $("#text").val("");
    });

    // Punto 2.2
    $("#addSetContent").on("click", function () {
        var setContentDiv = $("<div>").addClass("setContent").text("SET CONTENT");
        setContentDiv.on("click", function () {
            var newText = $("#text").val();
            $(this).prev().text(newText);
        });
        $("#domNodes").append(setContentDiv);
    });

    // Punto 2.3
    $("#addDelNodePrev").on("click", function () {
        var delNodeDiv = $("<div>").addClass("delNode").text("DEL NODE PREV");
        delNodeDiv.on("click", function () {
            $(this).prev().remove();
        });
        $("#domNodes").append(delNodeDiv);
    });

    //Extra 4
    var initialDomNodesContent = $("#domNodes").html();
    $("#clearDomNodes").on("click", function () {
        $("#domNodes").html(initialDomNodesContent);
    });

    // Punto 3
    var sliderSettings = {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 799,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              autoplay: false,
              dots: true,
            },
          },
        ],
      };
      
      if ($(window).width() >= 800) {
        sliderSettings.slidesToShow = 3;
        sliderSettings.slidesToScroll = 3;
        sliderSettings.autoplay = true;
        sliderSettings.dots = false;
        sliderSettings.infinite = true;
      }
      
      $("#slider").slick(sliderSettings);

      $(window).on('resize', function() {
        if ($(window).width() < 800) {
          $('.slider-controls').hide();
        } else {
          $('.slider-controls').show();
        }
      });
      
      $('.slider-prev').on('click', function() {
        $('#slider').slick('slickPrev');
      });
      
      $('.slider-next').on('click', function() {
        $('#slider').slick('slickNext');
      });
});
