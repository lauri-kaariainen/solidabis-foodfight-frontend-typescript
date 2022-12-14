import "./styles.css";

import { useState, useEffect } from "preact/hooks";
import { createCharacter, ICharacter } from "./Character";
import { Fightengine, IFightLogLine } from "./Fightengine";

const getRandom = (arr: any[]): number =>
  arr[Math.floor(arr.length * Math.random())];

export const App = () => {
  const [resultLog, setResultLog] = useState([] as IFightLogLine[]);
  const [idList, setIdList] = useState([] as number[]);
  const [char1, setChar1] = useState(null as ICharacter | null);
  const [char2, setChar2] = useState(null as ICharacter | null);

  useEffect(() => {
    fetch("https://3nkkif0kc7.execute-api.us-east-1.amazonaws.com/id")
      .then((e: any) => e.json())
      .then((ids: number[]) => {
        setIdList(ids);
        console.log(ids, getRandom(ids));
        fetch(
          "https://3nkkif0kc7.execute-api.us-east-1.amazonaws.com/id/" +
            getRandom(ids)
        )
          .then((res: any): any => res.json())
          .then((json: any): any => setChar1(createCharacter(json[0])));
        fetch(
          "https://3nkkif0kc7.execute-api.us-east-1.amazonaws.com/id/" +
            getRandom(ids)
        )
          .then((res: any): any => res.json())
          .then((json: any): any => setChar2(createCharacter(json[0])));
      });
  }, []);

  useEffect(() => {
    console.log("second useffect:", char1, char2);
    if (char1 === null || char2 === null) return;
    const state1 = Fightengine.init(char1, char2);

    let nextState = Fightengine.getNextStep(state1);
    //max 333 steps
    for (let i = 0; i < 1500; i++) {
      nextState = Fightengine.getNextStep(nextState);
      if (nextState.fightEnded) break;
    }
    console.log(nextState.logs);
    setResultLog(nextState.logs);
  }, [char1, char2]);

  console.log(idList, char1, char2);

  return (
    <div class="consumptionForm">
      <h1>Ruoka Kombat 3</h1>
      {/* debug:{idList.length},{char1 ? char1.name : null},
      {char2 ? char2.name : null} */}
      {!char1 || !char2 ? (
        <div>Ladataan...</div>
      ) : (
        <table class="tui-table" style="min-width: 100%">
          <thead>
            <tr>
              <th>
                {char1.name.split(",")[0]}
                <p class="additionalNameInfo">
                  {char1.name.split(",").slice(1).join(",")}
                </p>
              </th>
              <th>VS</th>
              <th>
                {char2.name.split(",")[0]}
                <p class="additionalNameInfo">
                  {char2.name.split(",").slice(1).join(",")}
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{char1.hp.toFixed(2)} kcal</td>
              <td>Energia</td>
              <td>{char2.hp.toFixed(2)} kcal</td>
            </tr>
            <tr>
              <td>{char1.attackPower} g</td>
              <td>Hiilihydraatit</td>
              <td>{char2.attackPower} g</td>
            </tr>
            <tr>
              <td>{char1.defencePower} g</td>
              <td>Proteiini</td>
              <td>{char2.defencePower} g</td>
            </tr>
            <tr>
              <td>{char1.fats} g</td>
              <td>Rasva</td>
              <td>{char2.fats} g</td>
            </tr>
            <br />
            <hr />
            <br />
            <tr>
              <td>{char1.hp.toFixed(0)}</td>
              <td>Health</td>
              <td>{char2.hp.toFixed(0)}</td>
            </tr>
            <tr>
              <td>{char1.attackPower}</td>
              <td>Attack</td>
              <td>{char2.attackPower}</td>
            </tr>
            <tr>
              <td>{char1.defencePower}</td>
              <td>Defence</td>
              <td>{char2.defencePower}</td>
            </tr>
            <tr>
              <td>{char1.delay} </td>
              <td>Delay</td>
              <td>{char2.delay}</td>
            </tr>
          </tbody>
        </table>
      )}

      <br />
      <br />
      <span class="tui-divider white-255-border"></span>
      <br />
      <br />
      <div class="cyan-168">
        <fieldset class="tui-input-fieldset">
          {!char1 || !char2 ? (
            <div>Ladataan...</div>
          ) : (
            <table class="tui-table" style="min-width: 100%">
              <thead>
                <tr>
                  <th>Tapahtuma</th>
                  <th>{char1.name.slice(0, 8)}</th>
                  <th>{char2.name.slice(0, 8)}</th>
                </tr>
              </thead>

              <tbody>
                {resultLog.map((logObj, i) => (
                  <tr>
                    <td>
                      {logObj.currTime.toFixed(2) +
                        "s " +
                        logObj.whoHit.slice(0, 12)}
                      {i > 0
                        ? i === resultLog.length - 1
                          ? ". voitti!"
                          : ". l??i"
                        : "Taistelu alkaa"}
                    </td>
                    <td>
                      {logObj.currHp1 <= 0 ? 0 : logObj.currHp1.toFixed(2)} hp
                    </td>
                    <td>
                      {logObj.currHp2 <= 0 ? 0 : logObj.currHp2.toFixed(2)} hp
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <legend>Tulokset</legend>
        </fieldset>
      </div>
    </div>
  );
};
