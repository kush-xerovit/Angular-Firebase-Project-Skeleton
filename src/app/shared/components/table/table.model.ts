export interface IColumn {
  name: string;
  prop: string;
  cssClass?: string;
}

export enum FieldType {
  string = 'string',
  array = 'array',
  arrayObject = 'arrayObject',
  Object = 'Object',
}

export interface IFilter {
  name: string;
  fieldName: string;
  fieldType: FieldType;
}
