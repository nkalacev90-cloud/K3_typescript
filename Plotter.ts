type Point = number;
type Distance = number;
type Angle = number;
type Position = { x: Point; y: Point };
enum CarriageState {
    UP,
    DOWN
}
enum LineColor {
    BLACK = "чёрный",
    RED = "красный",
    GREEN = "зелёный"
    }
type PlotterState = {
    position: Position;
    angle: Angle;
    color: LineColor;
    carriageState: CarriageState;
};
type Printer = (s: string) => void;

export class Plotter{
    
    private CarriageState: CarriageState;
    private LineColor: LineColor;
    private Position: Position;
    private PlotterState: PlotterState;
    private Printer: Printer;

    constructor(){
       this.CarriageState = CarriageState.UP;
       this.Position = { x: 0, y: 0 };
       this.LineColor = LineColor.BLACK;
       this.PlotterState = ;
    }

    drawLine(prt: Printer, from: Position, to: Position, color: LineColor): void {
  prt(`...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${color} цвет.`);
}

/**
 * Вычисляет и возвращает новую позицию
 */
calcNewPosition(distance: Distance, angle: Angle, current: Position): Position {
  // Преобразуем градусы в радианы при 180.0 градусов = 1 pi радиан
  const angle_in_rads = angle * (Math.PI / 180.0) * 1.0;
  // новая позиция
  const x = current.x + distance * Math.cos(angle_in_rads);
  const y = current.y + distance * Math.sin(angle_in_rads);
  // возвращаем новую позицию
  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * Перемещает каретку на расстояние distance.
 * Возвращает новый PlotterState
 */
move(prt: Printer, distance: Distance, state: PlotterState): PlotterState {
  // вычисляем новую позицию
  let newPosition = calcNewPosition(distance, state.angle, state.position);
  // draw line if needed
  if (state.carriageState === CarriageState.DOWN) {
    // Здесь следует отрисовка линии
    drawLine(prt, state.position, newPosition, state.color);
  }else{
    prt(`Передвигаем на ${distance} от точки (${state.position.x}, ${state.position.y})`);
  }
  // изменяем состояние
  const retState = { ...state };
  retState.position = newPosition;
  return retState;
}

/**
 * Поворачивает каретку на угол angle
 * Возвращает новый PlotterState
 */
turn(prt: Printer, angle: Angle, state: PlotterState): PlotterState {
  prt(`Поворачиваем на ${angle} градусов`);
  // вычисляем новый угол
  const newAngle = (state.angle + angle) % 360.0;
  // изменяем состояние
  const retState = { ...state };
  retState.angle = newAngle;
  return retState;
}

/**
 * Поднимает каретку
 * Возвращает новый PlotterState
 */
carriageUp(prt: Printer, state: PlotterState): PlotterState {
  prt("Поднимаем каретку");
  // изменяем состояние
  const retState = { ...state };
  retState.carriageState = CarriageState.UP;
  return retState;
}

/**
 * Опускает каретку
 * Возвращает новый PlotterState
 */
carriageDown(prt: Printer, state: PlotterState): PlotterState {
  prt("Опускаем каретку");
  // изменяем состояние
  const retState = { ...state };
  retState.carriageState = CarriageState.DOWN;
  return retState;
}

/**
 * Устанавливает цвет печати в color
 * Возвращает новый PlotterState
 */
setColor(prt: Printer, color: LineColor, state: PlotterState): PlotterState {
  prt(`Устанавливаем ${color} цвет линии.`);
  // изменяем состояние
  const retState = { ...state };
  retState.color = color;
  return retState;
}

/**
 * Устанавливает позицию каретки в position
 * Возвращает новый PlotterState
 */
setPosition(prt: Printer, position: Position, state: PlotterState): PlotterState {
  prt(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
  // изменяем состояние
  const retState = { ...state };
  retState.position = position;
  return retState;
}

/**
 * Функции для черчения фигур
 */

/**
 * Чертит треугольник со сторонами size
 */
drawTriangle(prt: Printer, size: number, state: PlotterState): PlotterState {
  state = carriageDown(prt, state);
  for(let i=0; i<3; ++i){
    state = move(prt, size, state);
    state = turn(prt, 120.0, state);
  }
  return carriageUp(prt, state);
}

/**
 * Чертит квадрат со сторонами size
 */
 drawSquare(prt: Printer, size: number, state: PlotterState): PlotterState {
  state = carriageDown(prt, state);
  for(let i=0; i<4; ++i){
    state = move(prt, size, state);
    state = turn(prt, 90.0, state);
  }  
  return carriageUp(prt, state);
}

/**
 * Инициализация приложения
 */
const printer: Printer = console.log;

 initializePlotterState(position: Position, angle: Angle, color: LineColor, carriageState: CarriageState): PlotterState {
  return {
    position: position,
    angle: angle,
    color: color,
    carriageState: carriageState
  };
  
}
  
}


