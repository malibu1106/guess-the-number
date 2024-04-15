// TIRAGE D'UN NOMBRE ALEATOIRE

function randomNumber() { // Tire un nombre aléatoire entre 1 et 100 
    return Math.floor(Math.random() * 100) + 1;
}

// AUTO SELECTION ET ECOUTE LA TOUCHE ENTREE SUR L'INPUT 

document.querySelector('#chosenNumberInput').focus(); // auto-selectionnes l'input pour rentrer le nombre choisi par l'utilisateur
document.querySelector('#chosenNumberInput').addEventListener('keypress', function (e) { // on écoute la pression de touche dans la zone de saisie du nombre 
    if (e.key === 'Enter') { // si le joueur appuie sur entrée
        round(); // alors on lance la fonction du gestion du tour
        document.getElementById('chosenNumberInput').value = ''; // et on vide la zone de saisie afin que le joueur puisse enchainer avec le suivant directement
    }
});

//VARIABLES

const numberToGuess = randomNumber(); // nombre random avec la fonction randomNumber
const numberTooHigh = " : Le nombre choisi est trop grand !"
const numberTooLow = " : Le nombre choisi est trop petit !"
const numberFound = " : Bravo ! Vous avez trouvé le bon nombre !"
let numberOfTrials = 10; // nombre d'essais

//FONCTION DE GESTION DU TOUR DE JEU

function round() { // Fonction qui gère le tour de jeu
    if (numberOfTrials > 0) { // Si il reste au moins un essai
        numberOfTrials--; // On décrémente le nombre d'essais
        document.getElementById('trials').innerHTML = "Essais restants : " + numberOfTrials;

        let chosenNumber = document.querySelector('#chosenNumberInput').value; // On récupère la valeur de l'input saisie par l'utilisateur
        compareNumber(chosenNumber); // on compare les nombres
        if (numberOfTrials == 0 & chosenNumber != numberToGuess) { // Si on a plus d'essai > c'était le dernier juste avant du coup ET que le dernier nombre choisi n'est pas bon
            document.getElementById('chosenNumberInput').style.visibility = "hidden"; // on masque l'input 
            document.body.style.color = "red"; // on passe le texte en rouge pour la défaite
            document.getElementById('fail').innerHTML = "Raté ! Vous n'avez pas trouvé le bon nombre !"; // Message fail
            finDuJeu(); // on déclenche la fin du jeu
        }

    }
}

// CREATION D'UN PARAGRAPHE POUR AFFICHER LE NOMBRE CHOISI PAR L'UTILISATEUR, ET L'INDICATION + haut + bas / gagné

function createParagraph(result, chosenNumber) { // Fonction pour créer un paragraphe
    let para = document.createElement("p"); // ajoute un p
    para.textContent = chosenNumber + result; // un p avec le nombre choisi par le joueur + result qui correspond à la phrase à afficher
    document.getElementById('main').appendChild(para); // on ajoute ce p à la div main
}

// COMPARAISON DU CHIFFRE DONNÉ PAR LE JOUEUR ET PUSH VERS LA FONCTION QUI CREE UN PARAGRAPHE

function compareNumber(chosenNumber) { // fonction pour comparer le nombre choisi par le joueur avec le nombre choisi par le RNG
    let result; // on initialise la variale result, qui contiendra la phrase à afficher au joueur, en fonction de ce nombre (+ grand / + petit / == )
    if (chosenNumber > numberToGuess) { // Si nombre joueur plus grand que nombre à deviner
        result = numberTooHigh; // phrase à afficher = phrase nombre trop grand 
    }
    else if (chosenNumber < numberToGuess) { // Et si nombre joueur plus petit que nombre à deviner
        result = numberTooLow; // Alors phrase à afficher = phrase nombre trop petit 
    }
    else { // Et sinon ça veut dire que le nombre à été deviné par le joueur 
        result = numberFound; // donc on affiche la phrase pour le nombre trouvé
        document.body.style.color = "green"; // On passe la couleur du texte en vert car le joueur a trouvé le bon nombre
        document.getElementById('chosenNumberInput').style.border = "solid green 9px"; // ainsi que la bordure de l'input 
        finDuJeu(); // on déclenche la fin du jeu
    }
    createParagraph(result, chosenNumber); // et dans TOUS les cas : on fait un paragraphe avec le nombre que le joueur a choisi, et la phrase qui correspond
}

// FIN DU JEU

function finDuJeu() { // fin du jeu
    setTimeout(() => window.location.reload(), 2500); // on attend 2.5s et on reload la page pour la partie suivante
}

