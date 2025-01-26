import type { ImageProps } from 'next/image';

function MockNextImage({ src, alt, ...props }: ImageProps): JSX.Element {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src as string} alt={alt} {...props} />;
}

export default MockNextImage;
