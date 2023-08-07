import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Train } from "./store/trainTypes";
import { addTrains } from "./store/trainReducer";
import TrainTable from "./components/TrainTable";
import TrainCharacteristicsTable from "./components/TrainCharacteristicsTable";
import "./styles.css"; // Импорт CSS-файла

const App: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const trains = useSelector((state) => state.trains);
  const dispatch = useDispatch();

  const handleTrainClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleSubmit = () => {
    if (selectedTrain) {
      const sortedCharacteristics = selectedTrain.characteristics.sort(
        (a, b) => a.speed - b.speed
      );
      console.log(sortedCharacteristics);
    }
  };

  React.useEffect(() => {
    // Загрузка данных по ссылке
    fetch(
      "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTrains(data));
      });
  }, [dispatch]);

  return (
    <div>
      <h1>Список поездов</h1>
      <TrainTable trains={trains} onTrainClick={handleTrainClick} />
      {selectedTrain && (
        <div>
          <h2>Характеристики для {selectedTrain.name}</h2>
          <TrainCharacteristicsTable
            characteristics={selectedTrain.characteristics}
          />
          <button onClick={handleSubmit}>Отправить данные</button>
        </div>
      )}
    </div>
  );
};

export default App;
