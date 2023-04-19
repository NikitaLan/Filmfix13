const text = [
  'Movie search',
  'Avatar: The Way of Water',
  'Movie search',
  'Evil Dead Rise',
  'M3GAN',
];

let line = 0;
let count = 0;
let result = '';
function typeLine() {
  let interval = setTimeout(() => {
    result += text[line][count];
    document.querySelector('.form-input').placeholder = result;

    count++;
    if (count >= text[line].length) {
      count = 0;
      line++;
      result = '';
      if (line == text.length) {
        clearTimeout(interval);
        document.querySelector('.form-input').placeholder = result;
        line = 0;
        count = 0;
        result = '';
        typeLine();
        return true;
      }
    }
    typeLine();
  }, 200);
}
typeLine();

//   function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }
