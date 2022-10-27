import "./styles.css";

import { useState, useEffect } from "preact/hooks";
// import FOODNAMES from "./foodnames.json";
import { createCharacter } from "./Character";
import { Fightengine, IFightLogLine } from "./Fightengine";

const FIGHTSPEEDS = {
  slow: 0,
  fast: 1
};

// const getRandomItem = (arr: any[]): string =>
//   arr[Math.floor(Math.random() * arr.length)];

// const food1: string = getRandomItem(FOODNAMES.foods);
// const food2: string = getRandomItem(FOODNAMES.foods);

const makaronilaatikko = {
  id: 35644,
  name: {
    fi:
      "Makaronilaatikko, kala-makaronilaatikko, tonnikala, kevytmaito, gluteeniton",
    sv: "MakaronilÃ¥da, fisk-makaronilÃ¥da, tonfisk, lÃ¤ttmjÃ¶lk, glutenfri",
    en: "Macaroni And Tuna Casserole, Low-Fat Milk, Gluten-Free",
    la: ""
  },
  energyKcal: 112.60264674721175,
  fat: 3.86217157083858,
  energy: 471.332158754479,
  protein: 9.89025972236808,
  carbohydrate: 9.18033604065782,
  alcohol: 0,
  organicAcids: 0.0846471597277429,
  sugarAlcohol: 0,
  saturatedFat: 1.36955349215256,
  fiber: 0.392211322604003,
  sugar: 2.32540229515983,
  salt: 1090.14119106733
};

const energiajuoma = {
  id: 33304,
  name: {
    fi: "Urheilujuomatiiviste, hiilihydraattijuoma, dexal heavy, laimennettu",
    sv: "Sportdryck, koncentrat, dexal heavy, utspÃ¤dd",
    en: "Sport Beverage, Carbohydrate Drink, Dexal Heavy, Diluted",
    la: ""
  },
  energyKcal: 56.907638862577514,
  fat: 0,
  energy: 238.203994750977,
  protein: 0,
  carbohydrate: 14.011999954164,
  alcohol: 0,
  organicAcids: 0,
  sugarAlcohol: 0,
  saturatedFat: 0,
  fiber: 0,
  sugar: 8.25900006926059,
  salt: 129.949996948242
};
const paprika = {
  id: 33304,
  name: {
    fi: "Paprika",
    sv: "Sportdryck, koncentrat, dexal heavy, utspÃ¤dd",
    en: "Sport Beverage, Carbohydrate Drink, Dexal Heavy, Diluted",
    la: ""
  },
  energyKcal: 30,
  fat: 0.3,
  energy: 238.203994750977,
  protein: 1,
  carbohydrate: 6,
  alcohol: 0,
  organicAcids: 0,
  sugarAlcohol: 0,
  saturatedFat: 0,
  fiber: 0,
  sugar: 8.25900006926059,
  salt: 129.949996948242
};
const porkkana = {
  id: 33304,
  name: {
    fi: "Porkkana",
    sv: "Sportdryck, koncentrat, dexal heavy, utspÃ¤dd",
    en: "Sport Beverage, Carbohydrate Drink, Dexal Heavy, Diluted",
    la: ""
  },
  energyKcal: 33,
  fat: 0.2,
  energy: 238.203994750977,
  protein: 0.6,
  carbohydrate: 5.6,
  alcohol: 0,
  organicAcids: 0,
  sugarAlcohol: 0,
  saturatedFat: 0,
  fiber: 0,
  sugar: 8.25900006926059,
  salt: 129.949996948242
};

const char1 = createCharacter(porkkana);
const char2 = createCharacter(paprika);
// const state1 = Fightengine.init(char1, char2);
// console.log(state1);
// let nextState = Fightengine.getNextStep(state1);
// for (let i = 0; i < 7; i++) {
//   console.log(nextState);
//   nextState = Fightengine.getNextStep(nextState);
// }
// console.log(Fightengine.init(char1, char2).stepsList);
// console.log(Fightengine.getNextStep(state1));

export const App = () => {
  const [fightSpeed, setFightSpeed] = useState(FIGHTSPEEDS.fast);
  // const [tick, setTick] = useState(0);
  // const [resultTexts, setResultTexts] = useState([] as string[]);
  const [resultLog, setResultLog] = useState([] as IFightLogLine[]);
  // const [food1Data, setFood1Data] = useState(undefined);
  // const [food2Data, setFood2Data] = useState(undefined);

  useEffect(() => {
    const state1 = Fightengine.init(char1, char2);
    let nextState = Fightengine.getNextStep(state1);
    // const textResultsList: string[] = [];
    // textResultsList.push(nextState.textExplanationOfLastRound!);
    // setResultTexts(resultTexts.concat(nextState.textExplanationOfLastRound!));
    for (let i = 0; i < 15; i++) {
      // console.log(
      //   nextState.textExplanationOfLastRound,
      //   nextState.hp1,
      //   nextState.hp2
      // );
      nextState = Fightengine.getNextStep(nextState);
      if (nextState.fightEnded) break;

      // textResultsList.push(nextState.textExplanationOfLastRound!);
    }
    // setResultTexts(textResultsList);
    console.log(nextState.logs);
    setResultLog(nextState.logs);
    // setResultTexts(
    //   nextState.logs
    //     .slice(1)
    //     .map(
    //       (obj: IFightLogLine) =>
    //         obj.currTime +
    //         "s " +
    //         obj.whoHit.split(",")[0] +
    //         " löi " +
    //         obj.currHp1 +
    //         " " +
    //         obj.currHp2
    //     )
    // );
  }, [char1, char2]);

  return (
    <div class="consumptionForm">
      <h1>Ruoka Kombat 3</h1>
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
            <td>{char1.hp} kcal</td>
            <td>Energia</td>
            <td>{char2.hp} kcal</td>
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
            <td>{char1.hp}</td>
            <td>Health</td>
            <td>{char2.hp}</td>
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
      <fieldset class="tui-input-fieldset">
        <legend>Taistelunopeus</legend>
        <label class="tui-radio">
          &nbsp;&nbsp;&nbsp;Hidas
          <input
            disabled
            type="radio"
            name="radio"
            checked={fightSpeed === FIGHTSPEEDS.slow ? true : false}
            onChange={(_) => setFightSpeed(FIGHTSPEEDS.slow)}
          />
          <span></span>
        </label>
        <label class="tui-radio">
          &nbsp;&nbsp;&nbsp;Nopea
          <input
            disabled
            type="radio"
            name="radio"
            checked={fightSpeed === FIGHTSPEEDS.fast ? true : false}
            onChange={(_) => setFightSpeed(FIGHTSPEEDS.fast)}
          />
          <span></span>
        </label>
      </fieldset>
      <br />

      <br />
      <span class="tui-divider white-255-border"></span>
      <br />
      <br />
      <div class="cyan-168">
        <fieldset class="tui-input-fieldset">
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
                        : ". löi"
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
              {/* <tr>
                <td>{0}km/h</td>
                <td>{0}</td>
                <td>{0}l</td>
              </tr> */}
            </tbody>
          </table>
          <legend>Tulokset</legend>
          {/* {resultTexts.map((line) => (
            <div>{line}</div>
          ))} */}
          {/* {console.log(resultTexts.length)} */}
        </fieldset>
      </div>
    </div>
  );
};
