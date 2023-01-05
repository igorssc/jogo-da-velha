import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import styles from "./Records.module.css";

export const Records = () => {
  const { level, records } = useContext(GameContext);

  return (
    <>
      <div style={{ width: "100%", overflowX: "scroll", borderRadius: "5px" }}>
        {records && (
          <table className={styles.record}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Pontuação</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {records.map((value) => (
                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.score}</td>
                  <td>
                    {new Date(value.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
