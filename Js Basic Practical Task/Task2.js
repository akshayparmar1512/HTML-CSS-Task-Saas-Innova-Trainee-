let inputtext = document.getElementById("inputtext");

inputtext.addEventListener("keyup", (e) => {
  let usertext = e.target.value;

  toCharacterCount(usertext);
  toWordCount(usertext);
  toCountWordFrequency(usertext);
});

// function to count and show character count
function toCharacterCount(text) {
  let result = text.replace(/\s+/g, "");
  let charactercount = document.getElementById("character-count-result");
  charactercount.textContent = result.length;
}

// function to count and show word count
function toWordCount(text) {
  let wordcount = document.getElementById("word-count-result");
  if (text.includes(" ")) {
    let arr = text.split(" ");
    let newarr = arr.filter((element) => {
      return element !== "";
    });
    wordcount.textContent = newarr.length;
  } else {
    wordcount.textContent = 1;
  }
}

// function to count frequency of each word
function toCountWordFrequency(text) {
  let wordfrequency = document.getElementById("word-frequency-result");

  console.log(wordfrequency);
  let words = text.split(/\s+/);

  let freqobj = {};
  for (const element of words) {
    if (freqobj[element] == undefined) {
      freqobj[element] = 1;
    } else {
      freqobj[element] = freqobj[element] + 1;
    }
    wordfrequency.textContent = freqobj[element];
  }
}
