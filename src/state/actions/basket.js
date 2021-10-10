import { createAction } from 'redux-act';

export const ONCHANGE = createAction('ONCHANGE');


const defaultColorsSet = (mode) => {
  let root = document.documentElement;
  defaultColors.forEach(doc=>{
    root.style.setProperty(doc.name, doc.value);
  })
}
export { defaultColorsSet };
