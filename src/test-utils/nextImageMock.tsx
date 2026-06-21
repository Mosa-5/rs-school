type ImageMockProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function Image({ src, alt, className }: ImageMockProps) {
  return <img src={src} alt={alt} className={className} />;
}
