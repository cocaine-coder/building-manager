import mitt from 'mitt';

type Events = {
  before: string[];
};

export const RouterEvent = mitt<Events>();