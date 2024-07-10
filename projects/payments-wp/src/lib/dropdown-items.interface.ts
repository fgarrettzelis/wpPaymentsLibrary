interface DropDownItems {
    id: string | boolean;
    text: string;
}

interface DropDownItemsComplex {
  id: string | boolean;
  text: string;
  data: any;
}

export {
  DropDownItems,
  DropDownItemsComplex
}
