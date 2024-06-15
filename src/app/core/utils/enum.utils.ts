export type EnumObject = { [key: string]: number | string };
export type EnumObjectEnum<E extends EnumObject> = E extends { [key: string]: infer ET | string } ? ET : never;


export function enumTypeValues<E extends EnumObject>(enumObject: E): EnumObjectEnum<E>[] {
  return Object.keys(enumObject)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => enumObject[key] as EnumObjectEnum<E>);
}
