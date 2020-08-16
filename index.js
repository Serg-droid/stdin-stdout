process.stdin.setEncoding('utf8');

// читаем файл в поток ввода -- данные приходят в виде строки
process.stdin.on('data', function(chunk) {
  // разбиваем данные по строкам
  const lines = chunk.split('\n');

  // первая строка - количество ваканский
  const vacancyAmount = lines[0];

  // преобразовываем все строки к массиву чисел-интервалов
  const intervals = [];
  lines.slice(1).forEach(line => {
    for (let num of line.split(' ')) {
      intervals.push(parseInt(num));
    }
  });

  // сортировкой пузырьком расставляем все интервалы от меньшего к большему
  const bubbleSort = (j) => {
    let sorted = true;
    for(let i = 0; i < j; i++) {
      if(intervals[i] > intervals[i + 1]) {
        [intervals[i], intervals[i+1]] = [intervals[i+1], intervals[i]];
        sorted = false;
      }
    }
    if(sorted || j === 0) {
      return;
    }
    bubbleSort(j - 1);
  }
  bubbleSort(intervals.length);

  // теперь берем минимальный и мксимальный интервалы
  const max = intervals[intervals.length - 1], min = intervals[0];
  // вычитаем из большего меньшее
  const dif = max - min + 1;

  process.stdout.write(`${vacancyAmount} ${dif}\n`);
})
