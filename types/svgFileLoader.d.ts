declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGSVGElement> & {
    title?: string
  }>;
  const src: string;
  export default src;
}
