// App.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Train } from "./store/trainTypes";
import { addTrains } from "./store/trainReducer";
import TrainTable from "./components/TrainTable";
import TrainCharacteristicsTable from "./components/TrainCharacteristicsTable";
import Modal from "react-modal"; // Импорт компонента модального окна
import "./styles.css";

Modal.setAppElement("#root"); // Устанавливаем корневой элемент для доступности модального окна

const App: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const trains = useSelector((state) => state.trains);
  const dispatch = useDispatch();

  const handleTrainClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const closeModal = () => {
    setSelectedTrain(null);
  };
  
  const handleSubmit = () => {
    if (selectedTrain) {
      const sortedCharacteristics = selectedTrain.characteristics.sort(
        (a, b) => a.speed - b.speed
      );
      console.log(sortedCharacteristics);
    }
    closeModal(); // Закрытие модального ПОСЛЕ отправки данных
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
      <Modal
        isOpen={selectedTrain !== null}
        onRequestClose={closeModal}
        contentLabel="Характеристики для Поезда"
      >
        {selectedTrain && (
          <div>
            <h2>Характеристики для {selectedTrain.name}</h2>
            <TrainCharacteristicsTable
              characteristics={selectedTrain.characteristics}
            />
            <button
              onClick={handleSubmit}
              // disabled={/* Add your validation logic here */}
            >
              Отправить данные
            </button>
            <button onClick={closeModal}>Закрыть</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
