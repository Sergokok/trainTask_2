import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Train, TrainCharacteristics, RootState } from "./store/trainTypes";
import { addTrains } from "./store/trainReducer";
import TrainTable from "./components/TrainTable";
import TrainCharacteristicsTable from "./components/TrainCharacteristicsTable";
import Modal from "react-modal";
import "./styles.css";

Modal.setAppElement("#root");

const App: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const dispatch = useDispatch();
  const trains = useSelector((state: RootState) => state.trains);

  const handleTrainClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const closeModal = () => {
    setSelectedTrain(null);
  };

  const handleSubmit = () => {
    closeModal();
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
      .then((data: TrainCharacteristics[]) => {
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
              disabled={selectedTrain.characteristics.some(
                (char) =>
                  isNaN(char.speed) ||
                  char.force <= 0 ||
                  isNaN(char.engineAmperage) ||
                  char.engineAmperage <= 0
              )}
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
