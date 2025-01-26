'use client';

import clsx from 'clsx';
import { type PropsWithChildren } from 'react';

/**
 * Container props.
 */
export type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

/**
 * Container component.
 */
export function Container(props: ContainerProps) {
  const { children, className } = props;

  const rootClasses = clsx('container', className);

  return <main className={rootClasses}>{children}</main>;
}
