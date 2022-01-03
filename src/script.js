

  // Animation de Smooth Scroll sur les liens du menu
  const liens = document.querySelectorAll("nav ul li a");
  for (const lien of liens) {
      lien.addEventListener("click", clickHandler);
  }
  
  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }




// Grossissement des articles de la section Projets sur le hover des p et des articles
// et animation du clique pour afficher les images de design

const grilleProjets = document.getElementById("projets-grid");
const articlesProjets = grilleProjets.getElementsByTagName("article");
const p2Projets = grilleProjets.getElementsByTagName("p");
const closeModale = document.getElementById("projets-fermer-modale-design");
let articleClasse;
  Array.from(articlesProjets).forEach((item) => {
    if (window.matchMedia("(min-width: 600px)").matches) {
      item.addEventListener('mouseout', () => {
        GrossissementDisparitionInitial(item);
      });
      item.addEventListener('mouseover', () => {
        GrossissementDisparitionHover(item);
      });
    }
    item.addEventListener('click', () => {
      AffichageImageDesign(item);
    });
  });
  Array.from(p2Projets).forEach((item) => {
    if (window.matchMedia("(min-width: 600px)").matches) {
      item.addEventListener('mouseout', () => {
        GrossissementDisparitionInitial(item);
      });
      item.addEventListener('mouseover', () => {
        GrossissementDisparitionHover(item);
      });
    }
    item.addEventListener('click', () => {
      AffichageImageDesign(item);
    });
  });

function GrossissementDisparitionInitial(item) {
  if (!item.classList.contains("capture-scroll"))
  {
    // si l'item hover est un p
    item = item.previousElementSibling;
  }
  if (item.classList.contains("article-gauche")) {
    item.parentNode.classList.remove("li-gauche-hover");
  }else {
    item.parentNode.classList.remove("li-droite-hover");
  }
}

function GrossissementDisparitionHover(item) {
  if (!item.classList.contains("capture-scroll"))
  {
    // si l'item hover est un p
    item = item.previousElementSibling;
  }
  if (item.classList.contains("article-gauche"))
  {
    item.parentNode.classList.add("li-gauche-hover");
  }else
  {
    item.parentNode.classList.add("li-droite-hover");
  }
}
// Fonction d'affichage d'image de mes designs


function AffichageImageDesign(item){
  if (item.parentNode.parentNode.parentNode.id === "projets-design") {
    let imageDesign = document.getElementsByClassName("projets-image-design");
    // position de la categorie design
        item.parentNode.parentNode.style.transform ="translate(-30%,0)";
    // disparition des autres catégories
    // si l'affichage est supérieur a 980px
    if (window.matchMedia("(min-width: 980px)").matches) {
      //augmente la taille de la section projet
      let sectionProjet = document.getElementById("projets");
      sectionProjet.style.height = "200vh";
    }
      item.parentNode.parentNode.parentNode.nextElementSibling.style.clipPath="polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)";
      item.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.clipPath="polygon(0 0, 100% 0, 100% 0, 0 0)";
    if (item.classList.contains("capture-scroll"))
    {
      // si l'item hover est un article
      item = item.nextElementSibling;
    }
    if (!imageDesign[0].classList.contains(item.textContent)) {
      // si la div de l'image ne contient pas la même classe que celle de l'image du clique déjà executé precedement
      // Apparition du bouton de fermeture de modale
      closeModale.style.opacity = "1";
      tabClassImage = imageDesign[0].classList;
      // suppression de toutes les classes sauf celle initiale
      tabClassImage.forEach(element => {
        if (element != "projets-image-design") {
          imageDesign[0].classList.remove(element);
        }
      });
      imageDesign[0].id ="projets-image-design-cache";
      // changement de l'url en fonction du choix de l'utilisateur
      switch (item.textContent) {
        case "Maquette":
          imageDesign[0].style.backgroundImage = "url('./src/img/design-maquette.png')";
          break;
        case "Pochette":
          imageDesign[0].style.backgroundImage = "url('./src/img/design-pochette.jpg')";          
          break;
        case "Retouche":
          imageDesign[0].style.backgroundImage = "url('./src/img/design-retouche.jpg')";          
          break;
        default:
          imageDesign[0].style.backgroundImage = "url('./src/img/design-maquette.png')";
          break;
      }
      imageDesign[0].classList.add(item.textContent);
      imageDesign[0].id ="projets-image-design-visible";
    }else {
      // si l'ancien clique était le même choix alors fermer le panneau
      imageDesign[0].id ="projets-image-design-cache";
      imageDesign[0].classList.remove(item.textContent);
      // reposition de la categorie design
      item.parentNode.parentNode.style.transform ="translate(0,0)";
      // réapparition des autres catégories
      // si l'affichage est supérieur a 980px
    if (window.matchMedia("(min-width: 980px)").matches) {
      //diminue la taille de la section projet
      let sectionProjet = document.getElementById("projets");
      sectionProjet.style.height = "120vh";
    }
      item.parentNode.parentNode.parentNode.nextElementSibling.style.clipPath=item.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.clipPath="polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
      // Disparition du bouton de fermeture de modale
      closeModale.style.opacity = "0";
    }
  }
}
// Clique de la croix pour fermer la modale de Design
closeModale.addEventListener('click', () => {
  let imageDesign = document.getElementsByClassName("projets-image-design");
  let colDesign = document.getElementById("projets-design");
  let ulDesign = colDesign.getElementsByTagName("ul");
  imageDesign[0].id ="projets-image-design-cache";
  tabClassImage = imageDesign[0].classList;
  // suppression de toutes les classes sauf celle initiale
  tabClassImage.forEach(element => {
    if (element != "projets-image-design") {
      imageDesign[0].classList.remove(element);
    }
  });
  // reposition de la categorie design
  ulDesign[0].style.transform ="translate(0,0)";
  // réapparition des autres catégories
  // si l'affichage est supérieur a 980px
  if (window.matchMedia("(min-width: 980px)").matches) {
    //diminue la taille de la section projet
    let sectionProjet = document.getElementById("projets");
    sectionProjet.style.height = "120vh";
  }
  colDesign.nextElementSibling.style.clipPath=colDesign.nextElementSibling.nextElementSibling.style.clipPath="polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
  // Disparition du bouton de fermeture de modale
  closeModale.style.opacity = "0";
});

      // Animation au scroll
  const elementsCaptureScroll = document.querySelectorAll(".capture-scroll");
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    );
  };
  const displayScrollElement = (element) => {
    if (element.classList.contains("parcours-triangle-date")) {
      element.classList.add("scroll-apparition");
      element.previousElementSibling.classList.add("scroll-de-gauche");
      element.nextElementSibling.classList.add("scroll-de-droite");
      element.parentNode.classList.add("scroll-opacite-background");  
    }
    if (element.classList.contains("article-gauche")) {
      element.classList.add("scroll-article-gauche");
      const pArticle= element.parentNode.getElementsByTagName("p");
      pArticle[0].classList.add("scroll-opacite-article");
    }
    if (element.classList.contains("article-droite")) {
      element.classList.add("scroll-article-droite");
      const pArticle= element.parentNode.getElementsByTagName("p");
      pArticle[0].classList.add("scroll-opacite-article");
    };
  };
  const hideScrollElement = (element) => {
    if (element.classList.contains("parcours-triangle-date")) {
      element.classList.remove("scroll-apparition");
      element.previousElementSibling.classList.remove("scroll-de-gauche");
      element.nextElementSibling.classList.remove("scroll-de-droite");
      element.parentNode.classList.remove("scroll-opacite-background");
    }
    if (element.classList.contains("article-gauche")) {
      element.classList.remove("scroll-article-gauche");
      const pArticle= element.parentNode.getElementsByTagName("p");
      pArticle[0].classList.remove("scroll-opacite-article");
    };
    if (element.classList.contains("article-droite")) {
      element.classList.remove("scroll-article-droite");
      const pArticle= element.parentNode.getElementsByTagName("p");
      pArticle[0].classList.remove("scroll-opacite-article");
    };
  };
  const handleScrollAnimation = () => {
    elementsCaptureScroll.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      } else if (elementOutofView(el)) {
        hideScrollElement(el)
      }
    })
  }
  window.addEventListener("scroll", () => { 
    handleScrollAnimation();
  });
  
  // Coupe l'animation de scroll si le navigateur ne le suporte pas
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  window.addEventListener("scroll", () => {
    // Vérifie si la mediaquery existe et si le navigateur le prends en charge
    if (mediaQuery && !mediaQuery.matches) {
      handleScrollAnimation()
    }
  });


// Playeur Audio
var musiqueActuel;
function playPause(articleMusique){
  //Declare la variable du son actif lorsqu'aucune fonction n'est exécutée
  musiqueActuel = articleMusique.firstElementChild;;
  //Verifie si le son est en pause alors le mettre en lecture sinon le mettre en pause
  if (musiqueActuel.paused){
    pauseMusiques(articleMusique);
    musiqueActuel.play();
  } else{
    musiqueActuel.pause();
  }
}
// Fonction qui pause toutes les autres musique lorsque on en lance une autre
function pauseMusiques(articleMusique){
  ulMusique = articleMusique.parentNode.parentNode;
  tabMusiques = ulMusique.getElementsByTagName('audio');
  Array.prototype.forEach.call(tabMusiques, element => {
    element.pause();
  });
}


  // Actualise le temps actuel de la musique joué, a chaque nouvelle valeur du temps la position de la couleur du background est actualisé
function updateTime(musique){
  let articleMusique = musique.parentNode;
  //calcul du pourcentage de la track
  var pourcentageMusique = 100*(musique.currentTime/musique.duration);
  // si l'article est gauche la progression ira vers la droite et inversement pour les articles de droite
  if (articleMusique.classList.contains("article-gauche"))
  {
  //actualise la position de la deuxième couleur du dégradé lineaire
  articleMusique.style.background = "linear-gradient(90deg, #6dfbee "+pourcentageMusique+"%, #048C80 "+pourcentageMusique+"%, #048C80 100%)";
  }
  else {
     //actualise la position de la deuxième couleur du dégradé lineaire
  articleMusique.style.background = "linear-gradient(-90deg, #6dfbee "+pourcentageMusique+"%, #048C80 "+pourcentageMusique+"%, #048C80 100%)"; 
  }
  }
