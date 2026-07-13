import { useInView } from 'react-intersection-observer';

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
