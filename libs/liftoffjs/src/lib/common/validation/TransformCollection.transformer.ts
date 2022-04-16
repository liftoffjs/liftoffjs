import { Transform } from 'class-transformer';

export const TransformCollection = () => Transform(x => {
  if (x.value.getSnapshot) {
    return x.value.getSnapshot();
  }
  return [];
});