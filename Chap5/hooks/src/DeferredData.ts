

export type DeferredMessage = {
  id: number;
  message: string;
};

const count = 30000;
export const deferredData: DeferredMessage[] = new Array(count);
for (let i = 0; i < count; i++) {
  let id = i + 1;
  deferredData[i] = { id: id, message: `My id is ${id}` };
}
