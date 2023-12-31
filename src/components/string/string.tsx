import style from "./string.module.css";
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementTypes, ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { DELAY_IN_MS } from "../../constants/delays";
import { swap } from "../../utils/swap";
import { INPUT_LENGTH_AS_STRING } from "../../constants/InputLength";

import { validate } from "../../utils/validate";


export const StringComponent: FC = () => {

  const [ array, setArray ] = useState<Array<ElementTypes>>();
  const { values, setValues, onChange } = useForm({ value: '' });
  const [ loader, setLoader ] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stringArray = values.value.split('').map((letter: string) => {
      return { letter, state: ElementStates.Default };
    });

    setArray(stringArray);
    setLoader(true);

    const end = stringArray.length - 1;
    const mid = Math.floor(stringArray.length / 2);

    for (let i = 0; i <= mid; i++) {

      let j = end - i;

      if (i !== j) {
        stringArray[i].state = ElementStates.Changing;
        stringArray[j].state = ElementStates.Changing;
        setArray([...stringArray]);
        await setDelay(DELAY_IN_MS);
      }

      swap(stringArray, i, j);

      stringArray[i].state = ElementStates.Modified;
      stringArray[j].state = ElementStates.Modified;

      setArray([...stringArray]);
    }

    setValues({ value: '' });
    setLoader(false);
  };

  validate(values)
  

  return (
    <SolutionLayout title="Строка">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          name="value"
          type="text"
          isLimitText
          maxLength={INPUT_LENGTH_AS_STRING}
          value={values.value}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
          disabled={ !values.value || values.value.length > INPUT_LENGTH_AS_STRING }
        />
      </form>
      <ul className={style.list}>
        {array?.map((item, index) => {
          return (
            <li key={index} >
              <Circle letter={item.letter} state={item.state} />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
