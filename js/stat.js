'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var HISTOGRAM_HEIGHT = 150;
var BAR_WIDTH = 40;
var GAP = 50;
var INITIAL_X = 150;
var INITIAL_Y = 90;
var NAME_BAR_Y = 260;
var LINE_HEIGHT = 10;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxOfArray = function (arr) {
  return Math.max.apply(null, arr);
};

var getRandomNumber = function () {
  return Math.ceil(Math.random() * 10) / 10;
};

var getColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  return 'rgba(0, 0, 255, ' + getRandomNumber() + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 'rgba(255, 255, 255, 1)');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var step = HISTOGRAM_HEIGHT / getMaxOfArray(times);

  for (var i = 0; i < times.length; i++) {
    // Найдем высоту столбца
    var barHeight = times[i] * step;

    // Вычислим координату столбца по оси Y:
    // т.к. отрисовка происходит сверху вниз,
    // надо вычесть высоту столбца из высоты гистограммы
    // и опустить столбец вниз на initialY.
    var barInitialY = HISTOGRAM_HEIGHT - barHeight + INITIAL_Y;

    // Вычислим координату столбца по оси X
    var barInitialX = INITIAL_X + (GAP + BAR_WIDTH) * i;

    // Выводим время,
    // округляем с помощью toFixed,
    // берем координаты X и Y от столбца,
    // поднимаем на расстояние lineHeight.
    ctx.fillText(times[i].toFixed(), barInitialX, barInitialY - LINE_HEIGHT);

    // Задаем цвет столбцу
    ctx.fillStyle = getColor(names[i]);

    // Отрисовываем столбец
    ctx.fillRect(barInitialX, barInitialY, BAR_WIDTH, barHeight);

    // Задаем цвет имени
    ctx.fillStyle = '#000000';

    // Выводим имя
    ctx.fillText(names[i], barInitialX, NAME_BAR_Y);
  }
};
