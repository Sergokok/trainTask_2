// TrainCharacteristicsTable.tsx
import React, { useState } from "react";
import { TrainCharacteristics } from "./store/trainTypes";

interface TrainCharacteristicsTableProps {
  characteristics: TrainCharacteristics[];
}

const TrainCharacteristicsTable: React.FC<TrainCharacteristicsTableProps> = ({
  characteristics
}) => {
  const [characteristicsData, setCharacteristicsData] = useState(
    characteristics
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setCharacteristicsData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Скорость (км/ч)</th>
          <th>Сила тяги (кН)</th>
          <th>Ток двигателя (А)</th>
        </tr>
      </thead>
      <tbody>
        {characteristicsData.map((char, index) => (
          <tr key={index}>
            <td>
              <input
                type="number"
                name="speed"
                value={char.speed}
                onChange={(e) => handleChange(e, index)}
              />
            </td>
            <td>
              <input
                type="number"
                name="force"
                value={char.force}
                onChange={(e) => handleChange(e, index)}
              />
            </td>
            <td>
              <input
                type="number"
                name="engineAmperage"
                value={char.engineAmperage}
                onChange={(e) => handleChange(e, index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrainCharacteristicsTable;
