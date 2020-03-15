declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const _: FC<SVGProps<HTMLOrSVGElement> & { title?: string }>;
  export = _;
}
