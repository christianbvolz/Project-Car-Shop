export interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  readOne(id_: string): Promise<T | null>,
  update(string: string, obj: T): Promise<T | null>,
  delete(string: string, obj: T): Promise<T | null>,
}
