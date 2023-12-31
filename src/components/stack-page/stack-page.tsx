import style from './stack-page.module.css';
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { INPUT_LENGTH } from "../../constants/InputLength";
import { stack } from "./Stack";

import { validate } from "../../utils/validate";


export const StackPage: FC = () => {

  const [ indexTop, setIndexTop ] = useState(0);
  const [ array, setArray ] = useState<Array<string>>([]);
  const { values, setValues, onChange } = useForm({ value: ''});
  const [ loader, setLoader ] = useState({ add: false, delete: false, clear: false, });

  const addElement = async () => {
    setLoader({ ...loader, add: true });

    setValues({ value: '' });
    stack.push(values.value);
    setArray([...stack.getArray()]);
    setIndexTop(stack.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setIndexTop(-1);

    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });

    setIndexTop(stack.index);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArray([...stack.getArray()]);
    setIndexTop(-1);
    
    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });

    await setDelay(SHORT_DELAY_IN_MS);
    stack.clear();    
    setArray([...stack.getArray()]);
    setIndexTop(0)

    setLoader({ ...loader, clear: false });
  };

  validate(values)


  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input 
          name='value'
          maxLength={INPUT_LENGTH}
          value={values.value}
          onChange={onChange}
          isLimitText={true} 
        />
        <Button 
          text='Добавить' 
          type='submit' 
          data='add-button'
          onClick={addElement} 
          isLoader={loader.add} 
          disabled={loader.delete || loader.clear || !values.value} 
        />
        <Button 
          text='Удалить' 
          type='button'
          data='delete-button'
          onClick={deleteElement} 
          isLoader={loader.delete} 
          disabled={loader.add || loader.clear || indexTop === 0}
        />
        <Button 
          text='Очистить' 
          type='reset' 
          data='clear-button'
          extraClass={style.reset} 
          onClick={clearElements}
          isLoader={loader.clear} 
          disabled={loader.add || loader.delete || indexTop === 0}
        />
      </form>
      <ul className={style.list}>
        {array.map((el, index) => {
          return (
            <li key={index} >
              <Circle
                index={index}
                letter={el}
                head={ index === array!.length - 1 ? "top" : undefined }
                state={ index === indexTop ? ElementStates.Changing : ElementStates.Default } 
              />
            </li>
          )
        }
        )}
      </ul>
    </SolutionLayout>
  );
};
