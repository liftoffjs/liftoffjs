import { Transform } from 'class-transformer';

export const PkOnly = () => Transform(x => {
  if (!x?.value) {
    return null;
  }

  return {
    id: x.value.id
  }
});