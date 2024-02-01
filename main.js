let encrypt = document.getElementById("encrypt");
let unencrypt = document.getElementById("unencrypt");
let record = [];
let unencrypted = [];
const containerRight = document.querySelector(".container__right-wrapper");

encrypt.addEventListener("click", () => {
  let textToPass = document.getElementById("textToPass").value;
  if (textToPass) {
    let encryptedText = encryptText(textToPass);
    record.push(encryptedText);
    updateContainer();
  } else {
    alert("Ingrese un texto primero");
  }
});

unencrypt.addEventListener("click", () => {
  let textToPass = document.getElementById("textToPass").value;
  if (textToPass) {
    let decryptedText = decryptText(textToPass);
    unencrypted.push(decryptedText);
    updateContainer();
  } else {
    alert("Ingrese un texto primero");
  }
});

function updateContainer() {
  containerRight.innerHTML = "";

  if (record.length === 0 && unencrypted.length === 0) {
    containerRight.innerHTML = `
      <img class="container__right-image" src="./assets/Search.webp" alt="" />
      <div class="container__right-content">
        <h5 class="container__right-title">Ningun mensaje fue encontrado</h5>
        <p class="container__right-paragraph">
          Ingresa el texto que deseas encriptar o desencriptar
        </p>
      </div>
    `;
  } else {
    record.forEach((text, index) => {
      const newDiv = createTextDiv(index + 1, text, "encrypted");
      containerRight.appendChild(newDiv);
    });

    unencrypted.forEach((text, index) => {
      const newDiv = createTextDiv(index + 1, text, "decrypted");
      containerRight.appendChild(newDiv);
    });
  }
}

function createTextDiv(index, text, type) {
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<p>${index}. ${text}</p>`;
  newDiv.classList.add(type);
  return newDiv;
}

function processWords(words) {
  const replacements = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  words.forEach((word, index, array) => {
    for (let vowel in replacements) {
      if (word.includes(vowel)) {
        array[index] = word.replace(
          new RegExp(vowel, "g"),
          replacements[vowel]
        );
        break;
      }
    }
  });
}

function encryptText(inputText) {
  let splitedText = inputText.split(" ");
  processWords(splitedText);
  return splitedText.join(" ");
}

function decryptText(encryptedText) {
  const replacements = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };

  let splitedText = encryptedText.split(" ");
  let decryptedText = [];

  for (let i = 0; i < splitedText.length; i++) {
    let word = splitedText[i];

    for (let key in replacements) {
      if (replacements.hasOwnProperty(key)) {
        word = word.replace(new RegExp(key, "g"), replacements[key]);
      }
    }

    decryptedText.push(word);
  }

  return decryptedText.join(" ");
}
