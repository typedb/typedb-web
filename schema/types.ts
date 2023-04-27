export type PropsOf<OBJECT> = { [KEY in keyof OBJECT]: OBJECT[KEY] }
